/**
 * Genera favicon, íconos de app y logo raster a partir del isotipo vectorial.
 * Uso: npm run brand:assets   (requiere sharp, incluido en devDependencies)
 *
 * Las rutas del isotipo deben coincidir con MARK_PATHS en src/components/brand/Logo.tsx.
 */
import { writeFile, mkdir } from "node:fs/promises";
import sharp from "sharp";

const MARK = {
  cap: "M185 218 L338 118 L470 212 Q330 190 185 218 Z",
  bandTop: "M240 265 Q326 244 412 252 L438 325 C335 332 232 372 160 432 Z",
  bandBottom:
    "M133 482 C228 422 340 384 457 378 L538 605 C470 560 405 514 342 515 C262 517 150 588 58 635 Z",
};

const metal = `<linearGradient id="m" x1="80" y1="120" x2="540" y2="640" gradientUnits="userSpaceOnUse">
  <stop offset="0" stop-color="#F8FAFC"/><stop offset="0.5" stop-color="#C0C6D4"/><stop offset="1" stop-color="#8E96A6"/>
</linearGradient>`;

const markPaths = (fill) =>
  `<g fill="${fill}"><path d="${MARK.cap}"/><path d="${MARK.bandTop}"/><path d="${MARK.bandBottom}"/></g>`;

/** Ícono de app: cuadrado Obsidian con el isotipo metálico (versión "app" del brand board). */
const appIconSvg = (rounded = true) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>${metal}
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1F2328"/><stop offset="1" stop-color="#0B0D10"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="${rounded ? 112 : 0}" fill="url(#bg)"/>
  <g transform="translate(256 266) scale(0.62) translate(-298 -376)">${markPaths("url(#m)")}</g>
</svg>`;

/** Isotipo suelto sobre transparente. */
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="45 105 505 540"><defs>${metal}</defs>${markPaths("url(#m)")}</svg>`;

/** ICO contenedor de PNGs (formato soportado por todos los navegadores modernos). */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + 16 * pngs.length;
  const entries = pngs.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

await mkdir("public/brand", { recursive: true });

await writeFile("src/app/icon.svg", appIconSvg());
await writeFile("src/app/apple-icon.png", await png(appIconSvg(false), 180));
await writeFile(
  "src/app/favicon.ico",
  buildIco([
    { size: 16, data: await png(appIconSvg(), 16) },
    { size: 32, data: await png(appIconSvg(), 32) },
    { size: 48, data: await png(appIconSvg(), 48) },
  ]),
);
await writeFile("public/brand/faro-icon-192.png", await png(appIconSvg(), 192));
await writeFile("public/brand/faro-icon-512.png", await png(appIconSvg(), 512));
await writeFile("public/brand/faro-mark.svg", markSvg);
await writeFile(
  "public/brand/faro-mark.png",
  await sharp(Buffer.from(markSvg)).resize(512).png({ compressionLevel: 9 }).toBuffer(),
);

console.log("✔ Recursos de marca generados.");
