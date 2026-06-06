import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getThoughtPostBySlug, getThoughtSlugs } from "@/data/thoughts";
import { formatDate } from "@/lib/utils";

interface ThoughtPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getThoughtSlugs().map((slug) => ({ slug: slug.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({ params }: ThoughtPostPageProps) {
  const { slug } = await params;
  const post = getThoughtPostBySlug(slug);
  if (!post) return { title: "Post" };
  return {
    title: post.data.title,
    description: post.data.excerpt,
  };
}

export default async function ThoughtPostPage({ params }: ThoughtPostPageProps) {
  const { slug } = await params;
  const post = getThoughtPostBySlug(slug);
  if (!post) notFound();

  const { data, content } = post;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/thoughts"
        className="mb-8 inline-block font-mono text-xs font-medium tracking-wider text-[var(--muted)] hover:text-[var(--green)]"
      >
        ← Back to Thoughts
      </Link>

      <article>
        <header className="mb-10">
          <time
            dateTime={data.date}
            className="font-mono text-xs text-[var(--muted)]"
          >
            {formatDate(data.date)}
          </time>
          {data.author && (
            <span className="ml-2 text-sm text-[var(--muted)]">
              · {data.author}
            </span>
          )}
          <h1 className="mt-2 font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
            {data.title}
          </h1>
          {data.tags && data.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" role="list">
              {data.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-0.5 font-mono text-[0.68rem] text-[var(--muted)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={content} />
        </div>
      </article>
    </div>
  );
}
