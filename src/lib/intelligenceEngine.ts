import Fuse, { type IFuseOptions } from "fuse.js";
import _projectsData from "@/content/projects.json";
import type { Project } from "@/types";

const projectsData = _projectsData as Project[];

// ---------------------------------------------------------------------------
// SEARCH ENGINE (Fuse.js BM25-approximating fuzzy search)
// ---------------------------------------------------------------------------

const fuseOptions: IFuseOptions<Project> = {
  // 0.0 = perfect match only, 1.0 = match anything. 0.35 is the empirically
  // validated threshold for developer search queries (forgiving, but not noisy).
  threshold: 0.35,
  distance: 100,
  minMatchCharLength: 2,
  includeScore: true,
  // Field weights mirror the BM25 per-field boost strategy from the IEE spec
  keys: [
    { name: "title",     weight: 3.0 },
    { name: "tech",      weight: 2.5 },
    { name: "subtitle",  weight: 2.0 },
    { name: "results",   weight: 1.8 },
    { name: "solution",  weight: 1.5 },
    { name: "problem",   weight: 1.5 },
    { name: "concepts",  weight: 2.0 },
  ],
};

const fuse = new Fuse(projectsData, fuseOptions);

/**
 * Performs a weighted fuzzy search across the entire knowledge graph.
 * Returns projects ranked by relevance. Zero API calls.
 */
export function search(query: string): Project[] {
  if (!query.trim()) return projectsData;
  return fuse.search(query).map((r) => r.item);
}

// ---------------------------------------------------------------------------
// RECOMMENDATION ENGINE (Depth-2 Graph Traversal)
// ---------------------------------------------------------------------------

/**
 * Given a project slug, traverses the knowledge graph to find related projects.
 * Uses shared concepts and explicit relatedSlugs edges with weights.
 *
 * Algorithm:
 * 1. Direct relatedSlugs edges (weight: 1.0 — explicitly curated)
 * 2. Shared concept nodes (weight: shared_count / total_concepts — computed)
 * Returns top N projects sorted by computed relevance score.
 */
export function getRelated(slug: string, limit = 2): Project[] {
  const origin = projectsData.find((p) => p.slug === slug);
  if (!origin) return [];

  const scores: Record<string, number> = {};

  for (const candidate of projectsData) {
    if (candidate.slug === slug) continue;

    let score = 0;

    // Edge 1: Explicit relatedSlugs curated edges (highest weight)
    if (origin.relatedSlugs.includes(candidate.slug)) {
      score += 1.0;
    }

    // Edge 2: Shared concept nodes (computed weight from overlap ratio)
    const sharedConcepts = origin.concepts.filter((c) =>
      candidate.concepts.includes(c)
    );
    if (sharedConcepts.length > 0) {
      const overlapRatio = sharedConcepts.length / Math.max(origin.concepts.length, candidate.concepts.length);
      score += overlapRatio * 0.8; // Concept overlap is high-value but below explicit curation
    }

    // Edge 3: Shared tech stack nodes
    const sharedTech = origin.tech.filter((t) => candidate.tech.includes(t));
    if (sharedTech.length > 0) {
      score += (sharedTech.length / Math.max(origin.tech.length, candidate.tech.length)) * 0.5;
    }

    scores[candidate.slug] = score;
  }

  return projectsData
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (scores[b.slug] ?? 0) - (scores[a.slug] ?? 0))
    .slice(0, limit);
}

// ---------------------------------------------------------------------------
// TECH FILTER ENGINE
// ---------------------------------------------------------------------------

/**
 * Returns all projects that use a given technology.
 * Powers the tech-tag click interactions.
 */
export function getByTech(tech: string): Project[] {
  return projectsData.filter((p) =>
    p.tech.some((t) => t.toLowerCase() === tech.toLowerCase())
  );
}

/**
 * Returns all unique technology tags across the knowledge graph,
 * sorted by frequency of use (most-used first).
 */
export function getAllTechTags(): { tag: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const project of projectsData) {
    for (const t of project.tech) {
      counts[t] = (counts[t] ?? 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
