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

export interface EngineeringDecision {
  title: string;
  decision: string;
  reason: string;
  implementation: string;
  tradeoff: string;
}

export interface FeatureShowcaseItem {
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
    caption?: string;
  };
  keyTakeaways: string[];
}

export interface ArchitectureDataFlowStep {
  step: string;
  title: string;
  component: string;
  detail: string;
}

export interface TestingReport {
  framework: string;
  testCount?: number;
  suiteCount?: number;
  description: string;
  verifiedTraits: string[];
}

export interface CaseStudyData {
  problem: {
    overview: string;
    painPoints: string[];
    technicalChallenge: string;
  };
  approach: {
    summary: string;
    coreTenets: string[];
  };
  architectureFlow: {
    title: string;
    subtitle: string;
    steps: ArchitectureDataFlowStep[];
  };
  engineeringDecisions: EngineeringDecision[];
  featureShowcases: FeatureShowcaseItem[];
  testing: TestingReport;
  reflection: {
    learnings: string[];
    tradeoffs: string[];
    futureRoadmap: string[];
  };
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
  caseStudy?: CaseStudyData;
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

export type ExperimentStatus = 'live' | 'in-progress' | 'concept';
export type CardLayoutSpan = 'normal' | 'wide' | 'tall';

export interface PlaygroundExperiment {
  slug: string;
  title: string;
  description: string;
  category: string;
  status: ExperimentStatus;
  date: string;
  badge: string;
  layoutSpan?: CardLayoutSpan;
  accentColor: string;
  route?: string;
  externalUrl?: string;
  interactiveType?: 'spring-physics' | 'magnetic-dots' | 'audio-clicks' | 'recovery-curve' | 'shell-hierarchy';
}

export interface PersonalDetailItem {
  label: string;
  value: string;
  note?: string;
}
