import type { ExperienceItem, SkillCategory } from "@/types";

export const bio = {
  name: "Nick Thomas",
  tagline: "I do all things data",
  short:
    "Information Systems & Statistics graduate from BYU experienced in all things data from business analytics to data science processes to machine learning.",
  long: `I'm a recent graduate of the Information Systems and Statistics programs at Brigham Young University, with a particular interest in predictive analytics, data science, and machine learning.

Studying these two fields together taught me to work with data from end to end. Rather than being strong on just the technical side or just the analytical side, I can handle the full process: collecting and storing data, building models, and getting them into production.

What I enjoy most is applying that to real-world problems. I've designed forecasting models for businesses, built machine learning features into a live application, dug into strategy for an early-stage startup, developed websites, and contributed to research for the state of Utah. I'm always looking for the next problem worth solving.`,
  profileImage: "/images/photos/profile.jpg",
  badges: [
    { label: "3.64 GPA" },
    { label: "BYU Graduate" },
    { label: "Student Athlete" },
  ],
  hobbies: [
    "🎿 Skiing",
    "🏋️‍♂️ Olympic Weightlifting",
    "🤸 Gymnastics",
    "🌍 Traveling",
    "🇨🇿 Czech",
    "🏔️ Exploring Nature",
  ],
};

export const skills: SkillCategory[] = [
  {
    name: "Core stack",
    items: ["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "Git"],
  },
  {
    name: "Familiar tools",
    items: ["Python", "PostgreSQL", "AWS", "Docker", "Framer Motion", "MDX"],
  },
];

export const experience: ExperienceItem[] = [
  {
    title: "Teaching and Research Assistant",
    company: "BYU Department of Information Systems",
    location: "Provo, UT",
    period: "Sept 2025 – Present",
    points: [
      "Conduct research and statistical analysis on data privacy to support faculty publication.",
      "Teach undergraduate coursework in ML Pipelines in Python, Data Science Processes, ETL, and AI Prompting.",
    ],
    tags: ["Python", "ML", "ETL", "Research", "Data Privacy"],
  },
  {
    title: "Czech Language Instructor",
    company: "Missionary Training Center",
    location: "Provo, UT",
    period: "Aug 2022 – Sept 2025",
    points: [
      "Taught 75+ students Czech and attained 92% in target proficiency benchmarks prior to in-country placement.",
      "Leveraged Excel and Python tools to track language proficiency metrics and streamline progress reporting.",
    ],
    tags: ["Excel", "Python", "Teaching", "Data Tracking"],
  },
  {
    title: "Sales Representative",
    company: "MPWR",
    location: "Riverside, CA",
    period: "Apr 2022 – Aug 2022",
    points: [
      "Generated over 60 leads through door-to-door prospecting, resulting in 16 solar contracts.",
      "Presented customized proposals, resolved concerns in real time, and closed deals through clear communication.",
    ],
    tags: ["Sales", "Prospecting", "Client Communication"],
  },
  {
    title: "Volunteer Representative",
    company: "The Church of Jesus Christ of Latter-day Saints",
    location: "Prague, Czech Republic",
    period: "Aug 2019 – Sep 2021",
    points: [
      "Led 12+ community service projects and provided 700+ hours of humanitarian service and ESL classes.",
      "Developed professional working fluency in Czech used daily in teaching, outreach, and service coordination.",
    ],
    tags: ["Czech", "ESL", "Leadership", "Service"],
  },
];
