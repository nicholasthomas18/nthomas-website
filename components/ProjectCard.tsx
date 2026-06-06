"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index?: number;
  variant?: "default" | "compact";
}

export function ProjectCard({
  project,
  index = 0,
  variant = "default",
}: ProjectCardProps) {
  const href = `/projects/${project.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-all hover:border-[var(--accent)]/50 hover:shadow-[0_0_20px_rgba(65,105,225,0.08)]",
        variant === "compact" ? "p-4" : "p-0"
      )}
    >
      <Link href={href} className="block">
        {variant === "default" && (
          <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface-muted)]">
            {project.image ? (
              <Image
                src={project.image}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div
                className="h-full w-full bg-gradient-to-br from-[var(--accent)]/10 to-[var(--surface-muted)]"
                aria-hidden="true"
              />
            )}
          </div>
        )}
        <div className={variant === "default" ? "p-5" : ""}>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.68rem] tracking-wider text-[var(--muted)]">
              {formatDate(project.date)}
            </span>
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded border border-[var(--border)] bg-[var(--surface-muted)] px-2 py-0.5 font-mono text-[0.68rem] text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-serif text-lg text-[var(--foreground)] transition-colors group-hover:text-[var(--accent-muted)]">
            {project.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">
            {project.description}
          </p>
          <span className="mt-3 inline-block font-mono text-xs font-medium tracking-wider text-[var(--accent)]">
            View details →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
