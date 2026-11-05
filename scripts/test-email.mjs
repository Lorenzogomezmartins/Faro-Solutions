/**
 * Prueba de envío de correo con la configuración de Resend.
 * Uso: npm run email:test
 *
 * Lee RESEND_API_KEY, CONTACT_TO_EMAIL y CONTACT_FROM_EMAIL desde .env.local
 * (o desde las variables de entorno del sistema) y envía un correo de prueba.
 */
import { readFileSync, existsSync } from "node:fs";

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}

loadEnvFile(".env.local");

const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
const missing = Object.entries({ RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL })
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missing.length > 0) {
  console.error(`✖ Faltan variables: ${missing.join(", ")}. Completalas en .env.local.`);
  process.exit(1);
}

const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL.split(",").map((address) => address.trim()),
    subject: "Prueba de envío — Sitio web Faro Solutions",
    text: "Si recibiste este correo, el formulario de contacto del sitio está configurado correctamente.",
  }),
});

if (response.ok) {
  console.log(`✔ Correo de prueba enviado a ${CONTACT_TO_EMAIL}.`);
} else {
  console.error(`✖ Resend respondió ${response.status}: ${await response.text()}`);
  process.exit(1);
}
