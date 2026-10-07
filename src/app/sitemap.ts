import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { getSiteUrl } from "@/content/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];
  return [
    { url: siteUrl },
    ...projects.map((project) => ({ url: `${siteUrl}/projects/${project.slug}` })),
  ];
}
