export type Theme = 'light' | 'dark';

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
}