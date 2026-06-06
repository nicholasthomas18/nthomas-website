import { MetadataRoute } from "next";
import { getProjects } from "@/data/projects";
import { getThoughtSlugs } from "@/data/thoughts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const staticPages = ["", "/projects", "/about", "/thoughts", "/resume", "/contact"].map(
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

  const thoughtSlugs = getThoughtSlugs().map((s) => s.replace(/\.mdx$/, ""));
  const thoughtPages = thoughtSlugs.map((slug) => ({
    url: `${base}/thoughts/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...thoughtPages];
}
