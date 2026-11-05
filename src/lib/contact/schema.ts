import { z } from "zod";
import { projectTypes } from "@/content/company";

/**
 * Esquema único del formulario de contacto.
 * Se usa en el navegador (feedback inmediato) y en el servidor (validación real).
 */

// Caracteres de control: se rechazan (en el mensaje se permiten saltos de línea y tabulaciones).
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/;
const CONTROL_CHARS_EXCEPT_NEWLINES = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
const INVALID_CHARS = "Contiene caracteres no permitidos.";

const singleLine = (schema: z.ZodString) => schema.refine((value) => !CONTROL_CHARS.test(value), INVALID_CHARS);

export const contactSchema = z.object({
  name: singleLine(
    z.string().trim().min(2, "Ingresá tu nombre y apellido.").max(80, "El nombre es demasiado largo."),
  ),
  company: singleLine(z.string().trim().max(100, "El nombre de la empresa es demasiado largo.")).optional(),
  email: z
    .string()
    .trim()
    .min(1, "Ingresá tu correo electrónico.")
    .max(254, "El correo es demasiado largo.")
    .pipe(z.email("Ingresá un correo electrónico válido.")),
  phone: z
    .string()
    .trim()
    .max(30, "El teléfono es demasiado largo.")
    .regex(/^[\d\s+()\-.]*$/, "Ingresá un teléfono válido (solo números, espacios, + y -).")
    .optional(),
  projectType: z.enum(projectTypes, { message: "Elegí el tipo de proyecto." }),
  message: z
    .string()
    .trim()
    .min(20, "Contanos un poco más sobre tu proyecto (mínimo 20 caracteres).")
    .max(4000, "El mensaje es demasiado largo (máximo 4000 caracteres).")
    .refine((value) => !CONTROL_CHARS_EXCEPT_NEWLINES.test(value), INVALID_CHARS),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

/** Campos anti-spam que viajan junto al formulario (no forman parte del mensaje). */
export const antiSpamSchema = z.object({
  // Honeypot: campo invisible para personas; si viene con contenido, es un bot.
  website: z.string().max(200).optional(),
  // Momento en que se mostró el formulario (ms). Envíos instantáneos = bots.
  startedAt: z.number().int().positive(),
});

export const MIN_FILL_TIME_MS = 3000;

export type ContactResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<ContactField, string>> };

export function flattenErrors(error: z.ZodError): Partial<Record<ContactField, string>> {
  const result: Partial<Record<ContactField, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (key && !result[key]) result[key] = issue.message;
  }
  return result;
}
