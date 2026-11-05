import type { MetadataRoute } from "next";
import { getProjects } from "@/content/projects";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteConfig.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/proyectos`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...getProjects()
      .filter((project) => !project.draft)
      .map((project) => ({
        url: `${siteConfig.url}/proyectos/${project.slug}`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.7,
      })),
  ];
}
