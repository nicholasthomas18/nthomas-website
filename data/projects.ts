import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "bikeshare-bart-r",
    title: "Bikeshare: Bayesian Additive Regression Trees in R",
    description:
      "Applied BART (Bayesian Additive Regression Trees) in R to help a company predict how many bikeshare rides they will have on a given day.",
    date: "2025-11-04",
    tags: ["R", "BART", "Statistics", "Regression"],
    featured: true,
    image: "/images/projects/bikeshare.jpg",
  },
  {
    slug: "predictive-customer-intelligence",
    title: "Predictive Customer Intelligence Pipeline",
    description:
      "End-to-end pipeline for predictive customer intelligence: data ingestion, feature engineering, modeling, and actionable insights.",
    date: "2024-04-22",
    tags: ["ML", "Data Pipeline", "Python"],
    featured: true,
    image: "/images/projects/crispdm.png",
  },
  {
    slug: "march-madness-ml",
    title: "March Madness Machine Learning",
    description:
      "Machine learning models for NCAA March Madness: bracket prediction, team performance forecasting, and tournament outcome analysis.",
    date: "2024-11-01",
    tags: ["ML/AI", "Sports Analytics", "Python"],
    featured: true,
    image: "/march-madness-assets/MarchMadnessLogo.jpg",
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
