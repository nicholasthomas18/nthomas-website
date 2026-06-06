import Link from "next/link";

export const metadata = {
  title: "Resume",
  description: "Experience and education overview.",
};

const education = {
  degree: "Bachelor of Science Information Systems",
  date: "Apr 2026",
  emphasis: "Data Science Emphasis | Minor in Statistics | STEM-Designated Technical Program",
  school: "Brigham Young University - Marriott School of Business, Provo UT",
  bullets: [
    "GPA 3.74",
    "Member of Association for Information Systems",
    "Specialized Courses: Predictive Analytics, Machine Learning Algorithms, Database Systems, Applied R Programming, Spreadsheets & Business Analysis, Data Science for Organizations, Business Strategy",
    "Student Athlete on BYU Dunk Team – 300+ hours of community service through CougarBuilt Initiative",
  ],
};

const technicalSkills = [
  { category: "Data & BI", items: "Tableau, Power BI, PostgreSQL, EDA in Python, Dashboards, DataRobot" },
  { category: "Programming", items: "Python, R, SQL, C#, HTML, CSS, JavaScript, VBA" },
  { category: "Other Technology", items: "AWS (EC2, S3, RDS), Full Stack Programming using ASP.NET" },
  { category: "Certifications", items: "Power BI" },
];

const projectExperience = [
  "Developed a Python package with API-based data collection, Streamlit app, and Quarto documentation (2025)",
  "Built and tuned end to end machine learning models across multiple Kaggle competitions (2025)",
  "Built a Machine Learning Pipeline (Python, C#, React) for data-driven recommendation app (2024)",
];

const experience = [
  {
    company: "BYU Department of Information Systems",
    location: "Provo, UT",
    title: "Teaching and Research Assistant",
    period: "Sept 2025 – Present",
    points: [
      "Conduct research and statistical analysis on data privacy to support faculty publication",
      "Teach undergraduate coursework in ML Pipelines in Python, Data Science Processes, ETL, and AI Prompting",
    ],
  },
  {
    company: "Missionary Training Center",
    location: "Provo, UT",
    title: "Czech Language Instructor",
    period: "Aug 2022 – Sept 2025",
    points: [
      "Taught 75+ students Czech and attained 92% in target proficiency benchmarks prior to in-country placement",
      "Leveraged Excel and Python tools to track language proficiency metrics and streamline progress reporting",
    ],
  },
  {
    company: "MPWR",
    location: "Riverside, CA",
    title: "Sales Representative",
    period: "Apr 2022 – Aug 2022",
    points: [
      "Generated over 60 leads through door-to-door prospecting, resulting in 16 solar contracts",
      "Presented customized proposals, resolved concerns in real time, and closed deals through clear communication",
    ],
  },
  {
    company: "The Church of Jesus Christ of Latter-day Saints",
    location: "Prague, Czech Republic",
    title: "Volunteer Representative",
    period: "Aug 2019 – Sep 2021",
    points: [
      "Led 12+ community service projects and provided 700+ hours of humanitarian service and ESL classes",
      "Developed professional working fluency in Czech used daily in teaching, outreach, and service coordination",
    ],
  },
];

const otherAchievements = [
  "Eagle Scout, Boy Scouts of America",
  "Represented and performed as Cosmo the Cougar, BYU's official mascot, at major athletic and public events",
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
            Data Analytics specialist with a strong foundation in business analytics,
            data science processes, and machine learning. Brings the technical skills of
            Information Systems together with the mathematical background of Statistics to
            turn data into deployable solutions.
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
            <p className="mt-0.5 text-sm text-[var(--muted)]">
              {education.school}
            </p>
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
                    {job.company}
                  </p>
                  <span className="text-sm text-[var(--muted)]">
                    {job.location}
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm italic text-[var(--accent-muted)]">
                    {job.title}
                  </p>
                  <span className="font-mono text-xs text-[var(--muted)]">
                    {job.period}
                  </span>
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
