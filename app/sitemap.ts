import { MetadataRoute } from "next";
import { getProjects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const staticPages = ["", "/projects", "/about", "/resume", "/contact"].map(
    (path) => ({
      url: `${base}${path || "/"}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const projectSlugs = getProjects().map((p) => p.slug);
  const projectPages = projectSlugs.map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages];
}
