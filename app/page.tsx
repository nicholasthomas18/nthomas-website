import Link from "next/link";
import { getFeaturedProjects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { HeroSection } from "@/components/HeroSection";
import { bio } from "@/data/about";

export const metadata = {
  title: "Home",
  description:
    "Personal portfolio. Developer focused on clean architecture and modern frontend.",
};

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <HeroSection
        name={bio.name}
        tagline={bio.tagline}
        short={bio.short}
      />

      {/* Featured projects */}
      <section
        className="mt-20"
        aria-labelledby="featured-heading"
      >
        <div className="flex items-center justify-between">
          <h2
            id="featured-heading"
            className="font-serif text-2xl text-[var(--foreground)] sm:text-3xl"
          >
            Featured <em className="italic text-[var(--accent-muted)]">Work</em>
          </h2>
          <Link
            href="/projects"
            className="font-mono text-xs font-medium tracking-wider text-[var(--accent)] hover:underline"
          >
            View all →
          </Link>
        </div>
        <p className="mt-2 text-[var(--muted)]">
          Some of my recent work that I&apos;m proud of.
        </p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 3).map((project, i) => (
            <li key={project.slug}>
              <ProjectCard project={project} index={i} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
