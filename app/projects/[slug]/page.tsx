import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import { formatDate } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/projects"
        className="mb-8 inline-block font-mono text-xs font-medium tracking-wider text-[var(--muted)] hover:text-[var(--green)]"
      >
        ← Back to Projects
      </Link>

      <article>
        <header>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <time
              dateTime={project.date}
              className="font-mono text-[0.68rem] tracking-wider text-[var(--muted)]"
            >
              {formatDate(project.date)}
            </time>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-0.5 font-mono text-[0.68rem] text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-[var(--muted)]">
            {project.description}
          </p>
        </header>

        {project.image && (
          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]">
            <Image
              src={project.image}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        )}

        {project.content && (
          <div className="prose prose-neutral mt-10 dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-[var(--foreground)]/90">
              {project.content}
            </div>
          </div>
        )}

        {project.link && (
          <p className="mt-10">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm font-medium tracking-wider text-[var(--accent)] hover:underline"
            >
              View project →
            </a>
          </p>
        )}
      </article>
    </div>
  );
}
