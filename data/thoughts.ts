import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "@/types";

const postsDirectory = path.join(process.cwd(), "content/thoughts");

export function getThoughtSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"));
}

export function getThoughtPosts(): BlogPost[] {
  const slugs = getThoughtSlugs();
  const posts = slugs
    .map((slug) => {
      const fullPath = path.join(postsDirectory, slug);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return {
        slug: slug.replace(/\.mdx$/, ""),
        title: data.title ?? "Untitled",
        excerpt: data.excerpt ?? "",
        date: data.date ?? new Date().toISOString().slice(0, 10),
        author: data.author,
        tags: data.tags ?? [],
      };
    })
    .sort((a, b) => (b.date > a.date ? 1 : -1));
  return posts;
}

export function getThoughtPostBySlug(slug: string): { data: BlogPost; content: string } | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    data: {
      slug,
      title: data.title ?? "Untitled",
      excerpt: data.excerpt ?? "",
      date: data.date ?? new Date().toISOString().slice(0, 10),
      author: data.author,
      tags: data.tags ?? [],
    },
    content,
  };
}
