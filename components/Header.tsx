"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md"
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[var(--foreground)]"
          aria-label="Home"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--green)] bg-[var(--surface)] font-mono text-sm font-bold tracking-tight text-[var(--green)]">
            NT
          </span>
          <span className="font-serif text-xl tracking-tight text-[var(--foreground)]">
            Nick Thomas
          </span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-[var(--green)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
