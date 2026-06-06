import Link from "next/link";

export const metadata = {
  title: "Predictive Customer Intelligence Pipeline",
  description:
    "End-to-end pipeline for predictive customer intelligence: data ingestion, feature engineering, modeling, and actionable insights.",
};

export default function PredictiveCustomerIntelligencePage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-[0.72rem] tracking-[0.15em] uppercase text-[var(--green)]">
        {"// Predictive Customer Intelligence"}
      </p>
      <h1 className="mt-4 font-serif text-4xl text-[var(--foreground)] sm:text-5xl">
        Coming <em className="italic text-[var(--accent-muted)]">Soon</em>
      </h1>
      <p className="mt-4 max-w-md text-[var(--muted)]">
        This project showcase is currently being built. Check back soon for the full writeup.
      </p>
      <Link
        href="/projects"
        className="mt-8 inline-flex items-center rounded-lg bg-[var(--accent)] px-5 py-2.5 font-mono text-sm font-medium tracking-wider text-white transition-opacity hover:opacity-90"
      >
        ← Back to Projects
      </Link>
    </div>
  );
}
