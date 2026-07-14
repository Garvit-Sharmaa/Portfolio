import Fuse, { type IFuseOptions } from "fuse.js";
import _projectsData from "@/content/projects.json";
import _knowledgeData from "@/content/knowledge.json";
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

// ---------------------------------------------------------------------------
// AI CHAT ENGINE (Client-Side Simulated RAG)
// ---------------------------------------------------------------------------

export interface AIResponse {
  text: string;
  projects?: Project[];
}

/**
 * Simulates a RAG pipeline by classifying intent, extracting entities,
 * and generating conversational responses backed by the project graph.
 */
export async function processQuery(query: string): Promise<AIResponse> {
  const q = query.toLowerCase();
  
  // Artificial delay for "thinking" effect
  await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));

  // 1. General Greeting / Identity
  if (q.match(/^(hi|hello|hey|greetings|howdy|sup|morning|evening|afternoon)\b/) || (q.match(/\b(who are you|what are you|what is this|are you a bot|are you ai)\b/) && !q.includes("garvit"))) {
    return {
      text: "Hello! I am the Garvit AI Intelligence Engine. I have deep knowledge of Garvit's entire architecture and engineering portfolio. You can ask me about specific technologies (e.g., 'What did you build with WebSockets?'), specific systems, or even questions about Garvit's background."
    };
  }

  // 1.1 Personal Background / About Garvit
  if (q.match(/\b(who is garvit|tell me about garvit|tell me about yourself|background|about garvit|who is he|who is this guy)\b/)) {
    return {
      text: "Garvit Bhardwaj (known as Garvit Sharmaa) is an AI & Full-Stack Engineer. He engineers production-grade systems, focusing on distributed architectures, real-time engines, and scalable machine learning integrations. He doesn't just build UI; he builds complex underlying infrastructure."
    };
  }

  // 1.2 Education Intent
  if (q.match(/\b(education|school|college|university|degree|study|studied|graduated|academic|btech|bachelor|grades)\b/)) {
    return {
      text: "Garvit has a strong academic foundation in Computer Science and Engineering. However, his true expertise comes from engineering complex, production-grade systems from scratch rather than just academic theory."
    };
  }

  // 1.3 Contact / Hire Intent
  if (q.match(/\b(contact|email|hire|resume|cv|reach him|phone|get in touch|message him|call him|talk to him|employ)\b/)) {
    return {
      text: "You can reach Garvit directly via email at **garvitsharmaa015@gmail.com**. He is always open to discussing complex engineering roles, AI infrastructure, or full-stack architectural challenges. You can also connect with him on his LinkedIn or GitHub profiles linked in the navigation bar."
    };
  }

  // 1.4 Chit-Chat Intents
  if (q.match(/\b(thank you|thanks|awesome|great|good job|nice|cool|wow|amazing|brilliant)\b/)) {
    return {
      text: "You're very welcome! If you have any more questions about Garvit's architecture, tech stack, or projects, just ask."
    };
  }
  
  if (q.match(/\b(how are you|how are you doing|what's up|whats up|how do you do)\b/)) {
    return {
      text: "I am operating at 100% capacity. My inference latency is near-zero because Garvit engineered me to run entirely on your local device. How can I assist you in exploring his work?"
    };
  }

  if (q.match(/\b(what can you do|help|commands|how to use|what do you know|capabilities)\b/)) {
    return {
      text: "I am a simulated AI Engine hooked directly into Garvit's portfolio knowledge graph. I can answer questions about:\n- Specific projects (e.g., 'Tell me about Ad Astra')\n- Technical implementations (e.g., 'What did you build with WebRTC?')\n- Garvit's background, education, and contact info.\n\nTry asking me anything!"
    };
  }

  // 1.5 Broad Capability / Skills Intent
  if (q.match(/\b(web|frontend|backend|full stack|full-stack|ai|artificial intelligence|machine learning|ml|development|software|engineering|skills|experience|tech|stack|technologies|tools|languages|frameworks|libraries|proficient|expert|good at|capable)\b/)) {
    if (q.match(/\b(know|does|can|experience|skills|good at|what|tell me|garvit's|his|your|proficient in|familiar with)\b/)) {
      return {
        text: "Garvit is a Senior-level Full-Stack & AI Engineer. He specializes in building highly scalable, production-grade applications. His core stack includes React, Next.js, TypeScript, Node.js, and Python. Here are a few systems that demonstrate his capabilities:",
        projects: projectsData.slice(0, 3)
      };
    }
  }

  // 2. Tech Search Intent
  const techMatch = q.match(/(?:with|using|in|about)\s+([a-zA-Z0-9.\-\+]+)/);
  if (techMatch || q.includes("react") || q.includes("typescript") || q.includes("python") || q.includes("go") || q.includes("node")) {
    const extractedTech = techMatch ? techMatch[1] : q.replace(/[^a-zA-Z0-9\s]/g, '').split(' ').find(w => ['react', 'typescript', 'python', 'go', 'node', 'nextjs', 'kubernetes', 'docker'].includes(w)) || q;
    
    // Clean and normalize
    const rawTech = extractedTech.trim();
    // Fuzzy search the tech against known tags
    const allTags = getAllTechTags().map(t => t.tag);
    const fuseTags = new Fuse(allTags, { threshold: 0.4 });
    const tagResults = fuseTags.search(rawTech);
    
    if (tagResults.length > 0) {
      const bestTech = tagResults[0].item;
      const projects = getByTech(bestTech);
      
      if (projects.length > 0) {
        return {
          text: `I found ${projects.length} system${projects.length > 1 ? 's' : ''} utilizing **${bestTech}**. Based on the graph, here are the technical implementations:`,
          projects: projects.slice(0, 2)
        };
      }
    }
  }

  // 3. Specific Project Search Intent
  // Strip out common conversational noise words and global stop words to isolate the likely entity
  const stopWords = /\b(the|a|an|is|are|was|were|am|be|been|being|of|and|in|to|for|with|on|at|from|by|about|as|into|like|through|after|over|between|out|against|during|without|before|under|around|among|please|just|could|can|would|should|might|may)\b/gi;
  
  const cleanQ = q
    .replace(/^(?:can you |could you |please |i want to know |do you know )?(?:what is|whats|what's|tell me about|tell about|tell us about|who is|show me|explain|give me details on|what do you know about|what about|about)\s+/i, '')
    .replace(stopWords, ' ')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const titleSearch = new Fuse(projectsData, { keys: ["title", "slug"], threshold: 0.4 });
  const projResults = titleSearch.search(cleanQ);
  
  if (projResults.length > 0 && projResults[0].score! < 0.45) {
    const project = projResults[0].item;
    const related = getRelated(project.slug, 1);
    
    return {
      text: `**${project.title}** is a ${project.subtitle}. The primary challenge was addressing how "${project.problem.substring(0, 50)}...". \n\nIf you are interested in this architecture, you might also want to look at similar systems I've built:`,
      projects: [project, ...related]
    };
  }

  // 4. JSON RAG Knowledge Base Search
  const knowledgeSearch = new Fuse(_knowledgeData, {
    keys: [
      { name: "keywords", weight: 2.0 },
      { name: "question", weight: 1.0 }
    ],
    threshold: 0.4,
    ignoreLocation: true
  });
  
  const ragResults = knowledgeSearch.search(cleanQ);
  if (ragResults.length > 0) {
    return {
      text: ragResults[0].item.answer
    };
  }

  // 5. Fallback Semantic Search (using the cleaned query)
  const fallbackResults = search(cleanQ);
  if (fallbackResults.length > 0) {
    return {
      text: "Based on my semantic analysis of the codebase and project documentation, these systems best match your query:",
      projects: fallbackResults.slice(0, 3)
    };
  }

  // 6. Deep Project Scan (Aggressive Ultimate Fallback)
  // If the query failed all heuristics, aggressively scan all project descriptions and tech stacks for ANY matching word.
  if (cleanQ.length > 3) {
    const deepSearch = new Fuse(projectsData, {
      keys: [
        { name: "title", weight: 3.0 },
        { name: "tech", weight: 2.0 },
        { name: "subtitle", weight: 1.0 },
        { name: "problem", weight: 1.0 }
      ],
      threshold: 0.5,
      ignoreLocation: true,
      useExtendedSearch: true
    });
    
    const deepResults = deepSearch.search(cleanQ);
    if (deepResults.length > 0) {
      return {
        text: `I couldn't confidently parse your exact intent, but I found some systems related to "${cleanQ}":`,
        projects: deepResults.slice(0, 2).map(r => r.item)
      };
    }
  }

  // 7. Unrecognized (Ultimate Fallback with Contact Info)
  return {
    text: "I couldn't find an exact match for that in the knowledge graph. For more information, please contact Garvit directly at **garvitsharmaa015@gmail.com** or call him at **+91 9979172273**."
  };
}
