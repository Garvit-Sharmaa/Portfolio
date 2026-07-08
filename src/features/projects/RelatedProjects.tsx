import Link from "next/link";
import { ArrowRight, Cpu } from "lucide-react";
import { getRelated } from "@/lib/intelligenceEngine";

interface RelatedProjectsProps {
  currentSlug: string;
}

export default function RelatedProjects({ currentSlug }: RelatedProjectsProps) {
  const related = getRelated(currentSlug, 2);

  if (related.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-mono text-foreground/50 uppercase tracking-widest mb-4 flex items-center gap-2">
        <Cpu className="w-3.5 h-3.5" />
        Related Systems
      </h3>
      <div className="space-y-3">
        {related.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block p-4 bg-surface1 border border-border-subtle rounded-lg hover:border-teal transition-colors interactive focus:ring-2 focus:ring-teal focus:outline-none"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-teal transition-colors">
                  {project.title}
                </p>
                <p className="text-xs font-mono text-foreground/40 mt-0.5">
                  {project.subtitle}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-foreground/30 group-hover:text-teal group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" strokeWidth={1.5} />
            </div>
            {/* Shared concepts as micro-tags */}
            <div className="flex flex-wrap gap-1 mt-3">
              {project.concepts.slice(0, 3).map((concept) => (
                <span key={concept} className="px-1.5 py-0.5 text-[10px] font-mono bg-teal/5 border border-teal/15 rounded text-teal/70">
                  {concept}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
