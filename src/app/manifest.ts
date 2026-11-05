import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Faro",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0B0D10",
    theme_color: "#0B0D10",
    icons: [
      { src: "/brand/faro-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/faro-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
