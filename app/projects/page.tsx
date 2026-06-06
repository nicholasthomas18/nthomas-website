"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProjects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { cn } from "@/lib/utils";

const allTags = Array.from(
  new Set(getProjects().flatMap((p) => p.tags))
).sort();

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const projects = useMemo(() => {
    const list = getProjects();
    if (!filter) return list;
    return list.filter((p) => p.tags.includes(filter));
  }, [filter]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-mono text-[0.72rem] tracking-[0.15em] uppercase text-[var(--accent)]">
          {"// All Projects"}
        </p>
        <h1 className="mt-2 font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
          Projects
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          A selection of projects I&apos;ve worked on.
        </p>
      </motion.header>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by tag"
      >
        <button
          type="button"
          onClick={() => setFilter(null)}
          className={cn(
            "rounded-full px-4 py-2 font-mono text-xs font-medium tracking-wider transition-colors",
            filter === null
              ? "bg-[var(--accent)] text-white"
              : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)]/50 hover:text-[var(--foreground)]"
          )}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setFilter(tag)}
            className={cn(
              "rounded-full px-4 py-2 font-mono text-xs font-medium tracking-wider transition-colors",
              filter === tag
                ? "bg-[var(--accent)] text-white"
                : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)]/50 hover:text-[var(--foreground)]"
            )}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {projects.map((project, i) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {projects.length === 0 && (
        <p className="mt-10 text-center text-[var(--muted)]">
          No projects match this filter.
        </p>
      )}
    </div>
  );
}
