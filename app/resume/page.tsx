import Link from "next/link";
import { CountUp } from "@/components/CountUp";

export const metadata = {
  title: "Resume",
  description: "Experience and education overview.",
};

const summary =
  "Data Scientist with experience building machine learning pipelines, ETL infrastructure, and statistical modeling for business decisions. Owns projects end-to-end, from raw data to executive-ready insights, while working effectively across technical and non-technical teams.";

const education = {
  degree: "Bachelor of Science Information Systems",
  date: "Apr 2026",
  emphasis: "Data Science Emphasis | Minor in Statistics | STEM-Designated Technical Program",
  school: "Brigham Young University - Marriott School of Business, Provo UT",
  bullets: [
    "Student Athlete on BYU Dunk Team – 300+ hours of community service through CougarBuilt Initiative",
    "Member of Association for Information Systems",
    "Coursework: Machine Learning in Python, Predictive Analytics, Database Systems, Statistical Modeling, Applied R Programming, Strategy and Economics",
  ],
};

const technicalSkills = [
  {
    category: "Programming",
    items: "Python, R, SQL, Git, Jupyter Notebooks, Pandas, NumPy, Scikit-learn, Matplotlib, Streamlit",
  },
  {
    category: "Data & Analytics",
    items: "Power BI, Tableau, PostgreSQL, Excel, DataRobot",
  },
  {
    category: "Other Technology",
    items: "AWS (EC2, S3, RDS), Docker, Supabase",
  },
];

const projectExperience = [
  "Deployed an ML recommendation pipeline using collaborative and content-based filtering across 50+ products",
  "Developed a Python package with API-based data collection, Streamlit app, and Quarto documentation",
  "Tuned XGBoost, K-Means, and SVM models across multiple Kaggle competitions, ranking top 5% in each",
];

const experience = [
  {
    company: "United Way",
    location: "Provo, UT",
    title: "Data Analyst",
    period: "Apr 2026 – Present",
    points: [
      "Engineered an ETL pipeline integrating 18+ data sources into a unified Power BI model, standardizing messy, inconsistent data across previously siloed systems",
      "Built dashboards used by 20+ staff for budget decisions, program tracking, and funding presentations",
      "Delivered a production-ready Power BI system in under a month, from stakeholder requirements to deployment",
    ],
  },
  {
    company: "Creeda",
    location: "Provo, UT",
    title: "Data Science Consultant (Contract)",
    period: "Mar 2026 – Apr 2026",
    points: [
      "Built a classification model on QuickBooks API data, which categorized P&L transactions across 40+ categories at ~90% accuracy",
      "Architected a replicable pipeline now live as the foundation of Creeda's product",
      "Delivered a Data Science project lifecycle from EDA through model deployment in under a month",
    ],
  },
  {
    company: "BYU Department of Information Systems",
    location: "Provo, UT",
    title: "Teaching and Research Assistant (Machine Learning)",
    period: "Sep 2025 – Apr 2026",
    points: [
      "Conducted comprehensive research and statistical analysis of privacy data in Python for faculty publication",
      "Contributed to publication Privacy in Google Play Apps (AMCIS 2025 – Emergent Research Forum)",
      "Taught coursework in Machine Learning Pipelines in Python, Data Science Processes, ETL, and AI Prompting",
    ],
  },
  {
    company: "Missionary Training Center",
    location: "Provo, UT",
    title: "Czech Language Instructor",
    period: "Aug 2022 – Sep 2025",
    points: [
      "Taught 75+ students Czech and achieved a 92% target proficiency rate prior to in-country placement",
      "Designed curriculum to teach the Czech language with cultural and historical context, adopted program wide",
    ],
  },
];

const otherAchievements = [
  "Cosmo the Cougar, BYU's Mascot – 4 years, 2 Fox Big Noon Kickoff appearances, 200+ community events",
  "Eagle Scout – Boy Scouts of America",
  "D2D Solar Sales Rep – 60+ leads, 16 closes",
  "Volunteer Mission, Czech Republic – led 70+ missionaries, professional Czech fluency (2019-2021)",
];

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="text-center">
        <h1 className="mt-2 font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
          Resume
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          An overview of my skills, experience, and education.
        </p>
        <p className="mt-4">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-[var(--accent)] px-5 py-2.5 font-mono text-sm font-medium tracking-wider text-white transition-opacity hover:opacity-90"
          >
            Download Resume (PDF)
          </a>
        </p>
      </header>

      {/* ── Resume replica ── */}
      <div className="resume-doc mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10">

        {/* Name & contact */}
        <div className="text-center">
          <h2 className="font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
            Nicholas A. Thomas
          </h2>
          <p className="mt-2 font-mono text-xs tracking-wider text-[var(--muted)]">
            (469) 465-9656 &nbsp;|&nbsp; nicholas18thomas@gmail.com &nbsp;|&nbsp;{" "}
            <a
              href="https://www.linkedin.com/in/nicholas18thomas/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              linkedin.com/in/nicholas18thomas
            </a>
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--muted)]">
            {summary}
          </p>
        </div>

        <hr className="my-8 border-[var(--border)]" />

        {/* Education */}
        <section>
          <h3 className="section-heading">Education</h3>
          <div className="mt-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold text-[var(--foreground)]">
                {education.degree}
              </p>
              <span className="font-mono text-xs text-[var(--green)]">
                {education.date}
              </span>
            </div>
            <p className="mt-0.5 text-sm italic text-[var(--accent-muted)]">
              {education.emphasis}
            </p>
            <div className="mt-0.5 flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm text-[var(--muted)]">
                {education.school}
              </p>
              <span className="font-mono text-xs italic text-[var(--muted)]">
                <CountUp to={3.64} decimals={2} /> GPA
              </span>
            </div>
            <ul className="mt-3 space-y-1.5 pl-4 text-sm text-[var(--foreground)]/90">
              {education.bullets.map((b) => (
                <li key={b} className="relative pl-4 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--green)]">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <hr className="my-8 border-[var(--border)]" />

        {/* Technical Skills */}
        <section>
          <h3 className="section-heading">Technical Skills</h3>
          <dl className="mt-4 space-y-2">
            {technicalSkills.map((s) => (
              <div key={s.category} className="flex flex-wrap gap-x-2 text-sm">
                <dt className="font-semibold text-[var(--foreground)]">{s.category}:</dt>
                <dd className="text-[var(--muted)]">{s.items}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5">
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Project Experience:
            </p>
            <ul className="mt-2 space-y-1.5 pl-4 text-sm text-[var(--foreground)]/90">
              {projectExperience.map((p) => (
                <li key={p} className="relative pl-4 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--green)]">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <hr className="my-8 border-[var(--border)]" />

        {/* Experience */}
        <section>
          <h3 className="section-heading">Experience</h3>
          <div className="mt-4 space-y-7">
            {experience.map((job) => (
              <div key={`${job.company}-${job.title}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-[var(--foreground)]">
                    {job.title}
                  </p>
                  <span className="font-mono text-xs text-[var(--green)]">
                    {job.period}
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm italic text-[var(--accent-muted)]">
                    {job.company}, {job.location}
                  </p>
                </div>
                <ul className="mt-2 space-y-1.5 pl-4 text-sm text-[var(--foreground)]/90">
                  {job.points.map((pt) => (
                    <li key={pt} className="relative pl-4 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--green)]">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <hr className="my-8 border-[var(--border)]" />

        {/* Other Achievements */}
        <section>
          <h3 className="section-heading">Other Achievements</h3>
          <ul className="mt-4 space-y-1.5 pl-4 text-sm text-[var(--foreground)]/90">
            {otherAchievements.map((a) => (
              <li key={a} className="relative pl-4 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--green)]">
                {a}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="mt-12">
        <Link
          href="/about"
          className="font-mono text-xs font-medium tracking-wider text-[var(--accent)] hover:underline"
        >
          View full About page →
        </Link>
      </p>

      <style>{`
        .section-heading {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 1.25rem;
          color: var(--foreground);
          padding-bottom: 0.4rem;
          border-bottom: 2px solid var(--accent);
          display: inline-block;
        }
      `}</style>
    </div>
  );
}
