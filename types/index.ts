export interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  featured?: boolean;
  link?: string;
  content?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author?: string;
  tags?: string[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  points: string[];
  tags: string[];
}

export interface SkillCategory {
  name: string;
  items: string[];
}
