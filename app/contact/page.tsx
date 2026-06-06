"use client";

import { motion } from "framer-motion";

const LINKEDIN_URL = "https://www.linkedin.com/in/nicholas18thomas/";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-2xl flex-col justify-center px-4 py-12 sm:px-6 sm:py-16">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
        aria-labelledby="contact-heading"
      >
        <p className="font-mono text-[0.72rem] tracking-[0.15em] uppercase text-[var(--green)]">
          {"// Contact"}
        </p>
        <h1
          id="contact-heading"
          className="mt-2 font-serif text-3xl text-[var(--foreground)] sm:text-4xl"
        >
          Get in <em className="italic text-[var(--accent-muted)]">Touch</em>
        </h1>
        <p className="mt-4 text-[var(--muted)] sm:text-lg">
        I’m always open to new opportunities and collaborations—feel free to reach out to me on LinkedIn.        </p>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-12"
      >
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_0_30px_4px_rgba(65,105,225,0.08)] sm:p-8">
          <div className="flex flex-col items-center text-center">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-white transition-opacity hover:opacity-90 sm:h-20 sm:w-20"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon className="h-8 w-8 sm:h-10 sm:w-10" />
            </a>
            <p className="mt-6 text-[var(--muted)]">
              If you&apos;re reaching out about internships, jobs, research
              collaborations, or Data Analytics/Science/ML roles, shoot me a message on LinkedIn.
            </p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-mono text-sm font-medium tracking-wider text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--surface)]"
            >
              Message me on LinkedIn
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
