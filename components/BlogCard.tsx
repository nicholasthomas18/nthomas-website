"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  basePath?: string;
}

export function BlogCard({ post, index = 0, basePath = "/thoughts" }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--accent)]/50 hover:shadow-[0_0_20px_rgba(65,105,225,0.08)]"
    >
      <Link href={`${basePath}/${post.slug}`} className="block">
        <time
          dateTime={post.date}
          className="font-mono text-[0.68rem] tracking-wider text-[var(--muted)]"
        >
          {formatDate(post.date)}
        </time>
        <h3 className="mt-2 font-serif text-lg text-[var(--foreground)] transition-colors group-hover:text-[var(--accent-muted)]">
          {post.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">
          {post.excerpt}
        </p>
        <span className="mt-3 inline-block font-mono text-xs font-medium tracking-wider text-[var(--accent)]">
          Read more →
        </span>
      </Link>
    </motion.article>
  );
}
