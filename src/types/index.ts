export interface Decision {
  decision: string;
  options: string[];
  selected: string;
  reason: string;
  tradeoff: string;
}

export interface Metric {
  label: string;
  value: string;
  unit: string;
  context: string;
}

export interface TimelineEntry {
  version: string;
  label: string;
  description: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  tech: string[];
  results: string;
  github: string;
  status: "Deployed" | "Archived" | "In Progress";
  hotPath: string;
  postMortem: string;
  concepts: string[];
  relatedSlugs: string[];
  insights?: string[];
  decisions?: Decision[];
  metrics?: Metric[];
  timeline?: TimelineEntry[];
}
