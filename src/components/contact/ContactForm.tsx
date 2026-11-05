"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { projectTypes } from "@/content/company";
import {
  contactSchema,
  flattenErrors,
  type ContactField,
  type ContactResponse,
} from "@/lib/contact/schema";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<ContactField, string>>;

const inputBase =
  "block w-full rounded-xl border bg-obsidian/60 px-4 py-3 text-[0.95rem] text-pearl placeholder:text-mist/70 transition-[border-color,box-shadow] duration-300 outline-none focus:border-silver/60 focus:shadow-[0_0_0_4px_rgb(192_198_212/0.08)]";

function Field({
  id,
  label,
  optional,
  error,
  className,
  children,
}: {
  id: ContactField;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-silver">
        {label}
        {optional && <span className="text-xs font-normal text-mist">Opcional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-[#f3b4b4]">
          <Icon name="alert" className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function readForm(form: HTMLFormElement) {
  const data = new FormData(form);
  const get = (key: string) => String(data.get(key) ?? "");
  return {
    values: {
      name: get("name"),
      company: get("company"),
      email: get("email"),
      phone: get("phone"),
      projectType: get("projectType"),
      message: get("message"),
    },
    website: get("website"),
  };
}

export function ContactForm() {
  // Momento de inicio, para el control anti-bots en el servidor.
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const fieldProps = (id: ContactField, extraClassName?: string) => ({
    id,
    name: id,
    "aria-invalid": errors[id] ? true : undefined,
    "aria-describedby": errors[id] ? `${id}-error` : undefined,
    className: cn(inputBase, errors[id] ? "border-[#f3b4b4]/60" : "border-line", extraClassName),
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      // Si el campo tenía un error, se revalida mientras se corrige (el mensaje desaparece al quedar válido).
      const form = event.currentTarget.form;
      if (!errors[id] || !form) return;
      const result = contactSchema.safeParse(readForm(form).values);
      const next = result.success ? {} : flattenErrors(result.error);
      setErrors((prev) => ({ ...prev, [id]: next[id] }));
    },
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    const form = event.currentTarget;
    const { values, website } = readForm(form);

    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = flattenErrors(result.error);
      setErrors(fieldErrors);
      setFormError("Revisá los campos marcados.");
      const firstInvalid = Object.keys(fieldErrors)[0];
      if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setErrors({});
    setFormError(null);
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, website, startedAt }),
      });
      const body = (await response.json().catch(() => null)) as ContactResponse | null;

      if (response.ok && body?.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      if (body && !body.ok) {
        setErrors(body.fieldErrors ?? {});
        setFormError(body.error);
      } else {
        setFormError("No pudimos enviar tu consulta. Intentá nuevamente en unos minutos.");
      }
      setStatus("error");
    } catch {
      setFormError("No pudimos conectarnos. Revisá tu conexión a internet e intentá nuevamente.");
      setStatus("error");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-[32rem] flex-col items-center justify-center px-4 text-center"
          >
            <span className="inline-flex size-16 items-center justify-center rounded-full border border-silver/30 bg-graphite/60 text-pearl">
              <Icon name="checkCircle" className="size-8" />
            </span>
            <h3 className="mt-8 text-2xl font-semibold">¡Gracias! Recibimos tu consulta.</h3>
            <p className="mt-3 max-w-sm leading-relaxed text-silver/75">
              La vamos a revisar y te vamos a responder al correo que nos indicaste a la brevedad.
            </p>
            <Button variant="secondary" className="mt-8" onClick={() => setStatus("idle")}>
              Enviar otra consulta
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-5 sm:grid-cols-2"
            aria-describedby={formError ? "form-error" : undefined}
          >
            <Field id="name" label="Nombre y apellido" error={errors.name}>
              <input {...fieldProps("name")} type="text" autoComplete="name" maxLength={80} required />
            </Field>
            <Field id="company" label="Empresa" optional error={errors.company}>
              <input {...fieldProps("company")} type="text" autoComplete="organization" maxLength={100} />
            </Field>
            <Field id="email" label="Correo electrónico" error={errors.email}>
              <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" maxLength={254} required />
            </Field>
            <Field id="phone" label="Teléfono" optional error={errors.phone}>
              <input {...fieldProps("phone")} type="tel" autoComplete="tel" inputMode="tel" maxLength={30} />
            </Field>
            <Field id="projectType" label="Tipo de proyecto" error={errors.projectType} className="sm:col-span-2">
              <div className="relative">
                <select {...fieldProps("projectType", "appearance-none pr-10")} defaultValue="" required>
                  <option value="" disabled>
                    Elegí una opción
                  </option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <Icon name="chevronDown" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-mist" />
              </div>
            </Field>
            <Field id="message" label="Contanos tu necesidad" error={errors.message} className="sm:col-span-2">
              <textarea
                {...fieldProps("message", "min-h-36 resize-y")}
                rows={6}
                maxLength={4000}
                required
                placeholder="¿Qué problema querés resolver o qué idea tenés? No hace falta que sepas qué tecnología necesitás."
              />
            </Field>

            {/* Honeypot anti-spam: oculto para personas y lectores de pantalla. */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">No completar este campo</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-mist">
                Usamos tus datos solo para responder tu consulta. No los compartimos con terceros.
              </p>
              <Button type="submit" size="lg" icon={status === "submitting" ? undefined : "arrowRight"} disabled={status === "submitting"} className="shrink-0">
                {status === "submitting" ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-obsidian/30 border-t-obsidian" aria-hidden />
                    Enviando…
                  </span>
                ) : (
                  "Enviar consulta"
                )}
              </Button>
            </div>

            <div aria-live="polite" className="sm:col-span-2">
              {formError && (
                <p id="form-error" role="alert" className="flex items-start gap-2 rounded-xl border border-[#f3b4b4]/30 bg-[#f3b4b4]/5 px-4 py-3 text-sm text-[#f3d0d0]">
                  <Icon name="alert" className="mt-0.5 size-4 shrink-0" />
                  {formError}
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
