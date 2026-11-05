import "server-only";
import { escapeHtml } from "@/lib/utils";
import type { ContactInput } from "@/lib/contact/schema";

/**
 * Envío del formulario mediante la API REST de Resend (https://resend.com).
 * Las credenciales se leen de variables de entorno del servidor y nunca
 * llegan al navegador. Ver README → "Configurar el envío de correos".
 */

// RESEND_API_URL solo se usa para pruebas locales; en producción se usa la API oficial.
const RESEND_ENDPOINT = process.env.RESEND_API_URL || "https://api.resend.com/emails";

export class EmailConfigError extends Error {}
export class EmailDeliveryError extends Error {}

function getConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    throw new EmailConfigError(
      "Faltan variables de entorno: RESEND_API_KEY, CONTACT_TO_EMAIL o CONTACT_FROM_EMAIL.",
    );
  }
  const recipients = to
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  return { apiKey, to: recipients, from };
}

function row(label: string, value: string) {
  return `<tr><td style="padding:8px 16px 8px 0;color:#4B5563;font-size:13px;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:8px 0;color:#0B0D10;font-size:14px">${value}</td></tr>`;
}

function receivedAt() {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date());
}

function buildEmail(data: ContactInput) {
  const date = receivedAt();
  const safe = {
    name: escapeHtml(data.name),
    company: data.company ? escapeHtml(data.company) : "—",
    email: escapeHtml(data.email),
    phone: data.phone ? escapeHtml(data.phone) : "—",
    projectType: escapeHtml(data.projectType),
    message: escapeHtml(data.message).replace(/\n/g, "<br>"),
  };

  const html = `<!doctype html><html lang="es"><body style="margin:0;background:#F8FAFC;font-family:Inter,Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:32px 24px">
  <p style="margin:0 0 4px;color:#4B5563;font-size:12px;letter-spacing:.2em;text-transform:uppercase">Faro Solutions · Sitio web</p>
  <h1 style="margin:0 0 24px;color:#0B0D10;font-size:20px">Nueva consulta de ${safe.name}</h1>
  <table style="border-collapse:collapse;width:100%">
    ${row("Nombre", safe.name)}
    ${row("Empresa", safe.company)}
    ${row("Correo", `<a href="mailto:${safe.email}" style="color:#0B0D10">${safe.email}</a>`)}
    ${row("Teléfono", safe.phone)}
    ${row("Tipo de proyecto", safe.projectType)}
    ${row("Recibido", escapeHtml(date))}
  </table>
  <div style="margin-top:24px;padding:20px;background:#fff;border:1px solid #C0C6D4;border-radius:12px;color:#1F2328;font-size:14px;line-height:1.6">${safe.message}</div>
  <p style="margin-top:24px;color:#4B5563;font-size:12px">Respondé este correo para contestarle directamente a ${safe.email}.</p>
</div></body></html>`;

  const text = [
    "Nueva consulta desde el sitio web",
    "",
    `Nombre: ${data.name}`,
    `Empresa: ${data.company || "—"}`,
    `Correo: ${data.email}`,
    `Teléfono: ${data.phone || "—"}`,
    `Tipo de proyecto: ${data.projectType}`,
    `Recibido: ${date}`,
    "",
    "Mensaje:",
    data.message,
  ].join("\n");

  return { html, text };
}

export async function sendContactEmail(data: ContactInput) {
  const config = getConfig();
  const { html, text } = buildEmail(data);

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: config.to,
      reply_to: data.email,
      // El esquema ya rechaza saltos de línea en el nombre (sin inyección de cabeceras).
      subject: `Nueva consulta web: ${data.projectType} — ${data.name}`,
      html,
      text,
    }),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new EmailDeliveryError(`Resend respondió ${response.status}: ${detail.slice(0, 300)}`);
  }
}
