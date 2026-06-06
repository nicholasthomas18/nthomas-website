"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { bio } from "@/data/about";

const toolLogos = [
  { name: "Python", src: "/images/logos/python.png", href: "https://www.python.org" },
  { name: "R", src: "/images/logos/r.png", href: "https://www.r-project.org" },
  { name: "SQL", src: "/images/logos/sql.png", href: "https://en.wikipedia.org/wiki/SQL" },
  { name: "VBA", src: "/images/logos/vba.png", href: "https://learn.microsoft.com/en-us/office/vba/api/overview/" },
  { name: "NumPy", src: "/images/logos/numpy.png", href: "https://numpy.org" },
  { name: "Scikit-Learn", src: "/images/logos/scikit-learn.png", href: "https://scikit-learn.org" },
  { name: "Pandas", src: "/images/logos/pandas.png", href: "https://pandas.pydata.org" },
  { name: "Power BI", src: "/images/logos/powerbi.png", href: "https://powerbi.microsoft.com" },
] as const;

const MARQUEE_CYCLE_SEC = 18;
const MARQUEE_HOVER_CYCLE_SEC = 42;
const MARQUEE_PERCENT_PER_CYCLE = 50;

export function AboutContent() {
  const positionRef = useRef(0);
  const hoveredRef = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    lastTimeRef.current = performance.now();
    const tick = (time: number) => {
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
      const speed =
        MARQUEE_PERCENT_PER_CYCLE /
        (hoveredRef.current ? MARQUEE_HOVER_CYCLE_SEC : MARQUEE_CYCLE_SEC);
      positionRef.current += speed * delta;
      if (positionRef.current >= MARQUEE_PERCENT_PER_CYCLE)
        positionRef.current -= MARQUEE_PERCENT_PER_CYCLE;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${positionRef.current}%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Top row: profile card + about text card */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
          aria-label="Profile and interests"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[var(--surface-muted)]">
            <Image
              src={bio.profileImage ?? "/ProfilePic.jpg"}
              alt=""
              fill
              className="object-cover object-[center_25%]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {bio.badges?.map((badge) => (
              <span
                key={badge.label}
                className="rounded border border-[var(--green)]/30 bg-[rgba(61,255,192,0.06)] px-3 py-1.5 font-mono text-xs font-medium text-[var(--green)]"
              >
                {badge.label}
              </span>
            ))}
          </div>
          <h3 className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.15em] text-[var(--accent)]">
            When I&apos;m not coding...
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2" role="list">
            {bio.hobbies?.map((hobby) => (
              <li
                key={hobby}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-sm text-[var(--foreground)]"
              >
                {hobby}
              </li>
            ))}
          </ul>
        </motion.aside>

        {/* Right container: about me text — free floating */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex flex-col justify-start pt-0"
          aria-labelledby="about-heading"
        >
          <p className="font-mono text-[0.72rem] tracking-[0.15em] uppercase text-[var(--green)]">
            {"// About"}
          </p>
          <h2
            id="about-heading"
            className="mt-3 font-serif text-3xl text-[var(--foreground)] sm:text-4xl"
          >
            A Bit About <em className="italic text-[var(--accent-muted)]">Myself</em>
          </h2>
          <div className="mt-5 text-[var(--muted)]">
            <p className="whitespace-pre-wrap text-[1.05rem] leading-[1.85]">
              {bio.long}
            </p>
          </div>
          
          <p className="mt-6">
            <Link
              href="/contact"
              className="font-mono text-xs font-medium tracking-wider text-[var(--accent)] hover:underline"
            >
              Get in touch →
            </Link>
          </p>
        </motion.article>
      </div>

      {/* Second row: program cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--accent)]/50 sm:p-8"
        >
          <div className="relative h-40 w-full overflow-hidden rounded-xl bg-[var(--surface-muted)]">
            <Image
              src="/images/photos/is-program.jpg"
              alt="Information Systems"
              fill
              className="object-cover object-[center_47%]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </div>
          <h3 className="mt-4 font-serif text-lg text-[var(--foreground)]">
            Information Systems
          </h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Using technology to solve business problems. Learned to design and manage systems, work with data and databases, understand core business functions in finance and operations, and lead projects that turn business needs into working solutions.
          </p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--accent)]/50 sm:p-8"
        >
          <div className="relative h-40 w-full overflow-hidden rounded-xl bg-[var(--surface-muted)]">
            <div
              className="h-full w-full bg-gradient-to-br from-[var(--accent)]/10 to-[var(--surface-muted)]"
              aria-hidden="true"
            />
          </div>
          <h3 className="mt-4 font-serif text-lg text-[var(--foreground)]">
            Statistics
          </h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
          Using data to answer questions and support better decisions.
          Learned to clean and analyze large datasets, design experiments, build predictive models, and translate statistical results into clear insights that organizations can act on.
          </p>
        </motion.article>
      </div>

      {/* Skills */}
      <section
        className="mt-16"
        aria-labelledby="skills-heading"
      >
        <p className="font-mono text-[0.72rem] tracking-[0.15em] uppercase text-[var(--accent)]">
          {"// Tools"}
        </p>
        <h2 id="skills-heading" className="mt-2 font-serif text-xl text-[var(--foreground)]">
          Skills & <em className="italic text-[var(--accent-muted)]">Technologies</em>
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          The tools I build with most, plus others I&apos;ve used enough to be productive quickly.
        </p>

        {/* Scrolling tools ribbon */}
        <div
          className="logo-ribbon-wrapper mt-10 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]"
          onMouseEnter={() => (hoveredRef.current = true)}
          onMouseLeave={() => (hoveredRef.current = false)}
        >
          <div className="pointer-events-none relative flex items-center">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--surface)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--surface)] to-transparent" />

            <div
              ref={trackRef}
              className="pointer-events-auto flex w-max items-center gap-20 py-6 pl-16 pr-16 will-change-transform"
            >
              {[...toolLogos, ...toolLogos].map((tool, index) => (
                <a
                  key={`${tool.name}-${index}`}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg transition-opacity hover:opacity-90 focus:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  aria-label={`${tool.name} (opens in new tab)`}
                >
                  <div className="relative h-20 w-20 overflow-hidden">
                    <Image
                      src={tool.src}
                      alt=""
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                  <span className="text-center font-mono text-xs text-[var(--foreground)] opacity-0 transition-opacity group-hover:opacity-100">
                    {tool.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom row: Dunk Team & Adventuring cards */}
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--accent)]/50 sm:p-8"
        >
          <div className="relative h-56 w-full overflow-hidden rounded-xl bg-[var(--surface-muted)]">
            <Image
              src="/images/photos/dunk-team.jpg"
              alt="Dunk Team"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <h3 className="mt-4 font-serif text-lg text-[var(--foreground)]">
            Dunk Team
          </h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            I love being part of high-energy environments. Dunk team has pushed me to
            stay active, work with a team, and keep having fun while learning new skills.
          </p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--accent)]/50 sm:p-8"
        >
          <div className="relative h-64 w-full overflow-hidden rounded-xl bg-[var(--surface-muted)]">
            <Image
              src="/images/photos/adventure.jpg"
              alt="Adventuring"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <h3 className="mt-4 font-serif text-lg text-[var(--foreground)]">
            Adventuring
          </h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Whether it&apos;s snowboarding, bushwacking, or just exploring,
            I enjoy getting outside of my comfort zone and seeing more of the world.
          </p>
        </motion.article>
      </div>
    </div>
  );
}
