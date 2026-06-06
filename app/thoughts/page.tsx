import { getThoughtPosts } from "@/data/thoughts";
import { BlogCard } from "@/components/BlogCard";

export const metadata = {
  title: "Thoughts",
  description: "Articles and notes on development and more.",
};

export default function ThoughtsPage() {
  const posts = getThoughtPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header>
        <h1 className="mt-2 font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
          Thoughts
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          Articles and notes on development, tools, and whatever I&apos;m thinking about.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-12 text-[var(--muted)]">
          No posts yet. Add MDX files in <code className="rounded border border-[var(--border)] bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-sm">content/thoughts</code> to see them here.
        </p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <BlogCard post={post} index={i} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
