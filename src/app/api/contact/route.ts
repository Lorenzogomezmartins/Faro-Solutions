import { NextResponse, type NextRequest } from "next/server";
import {
  antiSpamSchema,
  contactSchema,
  flattenErrors,
  MIN_FILL_TIME_MS,
  type ContactResponse,
} from "@/lib/contact/schema";
import { rateLimit } from "@/lib/contact/rate-limit";
import { EmailConfigError, sendContactEmail } from "@/lib/email/send-contact-email";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;
const GENERIC_ERROR =
  "No pudimos enviar tu consulta en este momento. Intentá nuevamente en unos minutos o escribinos por correo.";

function json(body: ContactResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function clientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/** Solo acepta envíos desde el propio sitio (mitiga CSRF y uso del endpoint desde otros dominios). */
function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return json({ ok: false, error: "Origen no permitido." }, 403);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, error: "Formato de solicitud inválido." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: "La consulta es demasiado extensa." }, 413);
  }

  const limit = rateLimit(clientIp(request));
  if (!limit.allowed) {
    return json(
      { ok: false, error: "Recibimos varias consultas seguidas desde tu conexión. Esperá unos minutos e intentá de nuevo." },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  let payload: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return json({ ok: false, error: "La consulta es demasiado extensa." }, 413);
    }
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "Formato de solicitud inválido." }, 400);
  }

  const spam = antiSpamSchema.safeParse(payload);
  if (!spam.success) {
    return json({ ok: false, error: "Formato de solicitud inválido." }, 400);
  }
  // Bots: honeypot completo o envío inmediato. Respondemos "ok" para no darles pistas.
  if (spam.data.website || Date.now() - spam.data.startedAt < MIN_FILL_TIME_MS) {
    return json({ ok: true }, 200);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      { ok: false, error: "Revisá los campos marcados.", fieldErrors: flattenErrors(parsed.error) },
      422,
    );
  }

  try {
    await sendContactEmail(parsed.data);
    return json({ ok: true }, 200);
  } catch (error) {
    // El detalle queda en los logs del servidor; al usuario solo un mensaje genérico.
    if (error instanceof EmailConfigError) {
      console.error("[contact] Configuración de correo incompleta:", error.message);
    } else {
      console.error("[contact] Error al enviar el correo:", error);
    }
    return json({ ok: false, error: GENERIC_ERROR }, 502);
  }
}
