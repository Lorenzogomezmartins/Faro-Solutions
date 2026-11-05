import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { MARK_PATHS } from "@/components/brand/Logo";
import { siteConfig } from "@/content/site";

export const alt = "Faro Solutions — Desarrollo de software a medida";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen para compartir enlaces (Open Graph / redes), generada en el build. */
export default async function OpengraphImage() {
  const fontsDir = join(process.cwd(), "src/assets/fonts");
  const [sora400, sora600] = await Promise.all([
    readFile(join(fontsDir, "sora-400.woff")),
    readFile(join(fontsDir, "sora-600.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #1F2328 0%, #0B0D10 60%)",
          color: "#F8FAFC",
          fontFamily: "Sora",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="150" height="104" viewBox="50 55 860 590">
            <defs>
              <linearGradient id="m" x1="80" y1="120" x2="540" y2="640" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#F8FAFC" />
                <stop offset="0.5" stopColor="#C0C6D4" />
                <stop offset="1" stopColor="#8E96A6" />
              </linearGradient>
              <linearGradient id="b" x1="450" y1="0" x2="905" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#F8FAFC" stopOpacity="0.85" />
                <stop offset="1" stopColor="#F8FAFC" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={MARK_PATHS.beam} fill="url(#b)" />
            <path d={MARK_PATHS.cap} fill="url(#m)" />
            <path d={MARK_PATHS.bandTop} fill="url(#m)" />
            <path d={MARK_PATHS.bandBottom} fill="url(#m)" />
          </svg>
          <div style={{ width: 1, height: 84, background: "rgba(192,198,212,0.45)", margin: "0 32px 0 8px" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <svg width="300" height="57" viewBox="60 40 1150 190">
              <g fill="#F8FAFC">
                <path d="M70 48 H240 V72 H96 V126 H226 V150 H96 V222 H70 Z" />
                <path d="M330 222 L440 48 H464 L574 222 H546 L452 76 L358 222 Z" />
                <path d="M790 150 H822 L888 222 H856 Z" />
              </g>
              <path d="M703 222 V60.5 H820 A44.5 44.5 0 0 1 820 149.5 H703" fill="none" stroke="#F8FAFC" strokeWidth="25" />
              <circle cx="1095" cy="135" r="74.5" fill="none" stroke="#F8FAFC" strokeWidth="25" />
            </svg>
            <div style={{ marginTop: 14, fontSize: 24, letterSpacing: 15.5, color: "#C0C6D4" }}>SOLUTIONS</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.1, letterSpacing: -2, maxWidth: 900 }}>
            {siteConfig.tagline}
          </div>
          <div style={{ marginTop: 28, fontSize: 24, color: "#C0C6D4" }}>
            Software a medida · Webs · Sistemas de gestión · Apps · Integraciones
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Sora", data: sora400, weight: 400, style: "normal" },
        { name: "Sora", data: sora600, weight: 600, style: "normal" },
      ],
    },
  );
}
