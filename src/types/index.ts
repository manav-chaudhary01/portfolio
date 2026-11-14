export type ProjectSlug = 'meter-flow' | 'attendance-tracker' | 'leetcode-widget';

export type NavNodeId = 'work' | 'about' | 'playground' | 'contact';

export interface ProjectArchitectureLayer {
  layer: string;
  technology: string;
  description: string;
}

export interface ProjectCallout {
  title: string;
  note: string;
  arrowDirection?: 'up' | 'down' | 'left' | 'right';
}

export interface ProjectLink {
  label: string;
  url: string;
  type: 'github' | 'live' | 'case-study';
}

export interface Project {
  id: string;
  slug: ProjectSlug;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  accentColor: string;
  badgeText: string;
  technologies: string[];
  summary: string;
  description: string;
  highlights: string[];
  architecture: ProjectArchitectureLayer[];
  links: ProjectLink[];
  callouts?: ProjectCallout[];
}

export interface NavNodeItem {
  id: NavNodeId;
  label: string;
  sublabel: string;
  description: string;
  accentColor: string;
}

export interface SocialLink {
  id: string;
  label: string;
  sublabel?: string;
  href: string;
  icon: 'mail' | 'github' | 'linkedin' | 'file-text' | 'external';
  ariaLabel: string;
  isExternal?: boolean;
  download?: boolean;
}

export interface PlaygroundItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  componentName: string;
}
