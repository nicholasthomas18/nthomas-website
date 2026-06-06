import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-xs tracking-[0.15em] uppercase text-[var(--green)]">
        {"// 404"}
      </p>
      <h1 className="mt-2 font-serif text-5xl text-[var(--foreground)]">
        Page Not Found
      </h1>
      <p className="mt-4 text-[var(--muted)]">This page could not be found.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-[var(--accent)] px-5 py-2.5 font-mono text-sm font-medium tracking-wider text-white hover:opacity-90"
      >
        Back to Home
      </Link>
    </div>
  );
}
