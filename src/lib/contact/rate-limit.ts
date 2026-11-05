/**
 * Límite de envíos por IP (ventana deslizante en memoria).
 *
 * Suficiente para un sitio institucional: frena ráfagas y abusos simples.
 * En plataformas serverless cada instancia tiene su propia memoria, por lo
 * que el límite es "por instancia". Si el volumen de spam lo justificara,
 * reemplazar por un almacén compartido (ej. Upstash Redis).
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS = 5;
const MAX_TRACKED_KEYS = 5000;

const hits = new Map<string, number[]>();

export function rateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return { allowed: false, retryAfterSeconds: Math.ceil((WINDOW_MS - (now - recent[0])) / 1000) };
  }

  recent.push(now);
  hits.set(key, recent);

  // Evita el crecimiento indefinido de memoria.
  if (hits.size > MAX_TRACKED_KEYS) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
    if (hits.size > MAX_TRACKED_KEYS) hits.clear();
  }

  return { allowed: true, retryAfterSeconds: 0 };
}
