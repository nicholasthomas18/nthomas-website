"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface HeroSectionProps {
  name: string;
  tagline: string;
  short: string;
}

export function HeroSection({ name, tagline, short }: HeroSectionProps) {
  const nameParts = name.trim().split(/\s+/);
  const lastName = nameParts.pop() ?? "";
  const firstPart = nameParts.join(" ");

  return (
    <section
      className="relative flex h-full flex-col justify-center py-4"
      aria-labelledby="hero-heading"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-[0.72rem] tracking-[0.15em] uppercase text-[var(--green)]"
      >
        {"// Portfolio · Data · ML"}
      </motion.p>
      <motion.h1
        id="hero-heading"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-4 font-serif text-4xl tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl"
      >
        {firstPart}
        {firstPart && " "}
        <span className="italic text-[var(--accent-muted)]">{lastName}</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-4 max-w-2xl text-lg text-[var(--muted)] sm:text-xl"
      >
        {tagline}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-4 max-w-2xl text-[var(--foreground)]/90"
      >
        {short}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-8 flex flex-wrap gap-4"
      >
        <Link
          href="/projects"
          className="inline-flex items-center rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          See My Work
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Get in Touch
        </Link>
      </motion.div>
    </section>
  );
}
