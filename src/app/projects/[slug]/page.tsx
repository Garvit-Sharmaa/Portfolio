import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Code2, Activity, Zap, AlertTriangle, ShieldCheck, Lightbulb, GitBranch, BarChart2, CheckCircle2, XCircle } from "lucide-react";
import projectsData from "@/content/projects.json";
import RelatedProjects from "@/features/projects/RelatedProjects";

export function generateStaticParams() {
    return projectsData.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = projectsData.find((p) => p.slug === slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} | ${project.subtitle}`,
        description: project.problem,
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projectsData.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": project.title,
      "operatingSystem": "Any",
      "applicationCategory": "DeveloperApplication",
      "description": project.problem,
      "softwareVersion": project.timeline?.[0]?.version || "1.0.0",
      "author": {
        "@type": "Person",
        "name": "Project AURA Engineer"
      },
      "codeRepository": project.github,
      "featureList": project.solution
    };

    return (
        <main className="min-h-screen bg-background pt-24 pb-32 px-6">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="max-w-5xl mx-auto">
                {/* Navigation & Status */}
                <div className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-border-subtle pb-8">
                    <Link href="/#projects" className="interactive text-foreground/50 hover:text-teal transition-colors flex items-center gap-2 focus:ring-2 focus:ring-teal focus:outline-none rounded w-fit">
                        <ArrowLeft className="w-4 h-4" /> Back to systems
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-surface1 border border-border-subtle rounded-md font-mono text-xs text-foreground/70 flex items-center gap-2">
                            <Activity className="w-3 h-3 text-teal" />
                            Status: {project.status}
                        </span>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="interactive px-3 py-1 bg-surface2 hover:bg-surface1 border border-border-subtle rounded-md font-mono text-xs text-foreground flex items-center gap-2 focus:ring-2 focus:ring-teal focus:outline-none transition-colors">
                            <Code2 className="w-3 h-3" /> View Source
                        </a>
                    </div>
                </div>

                {/* Header */}
                <header className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-foreground">{project.title}</h1>
                    <p className="text-xl md:text-2xl text-teal font-mono tracking-tight">{project.subtitle}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                    {/* ── MAIN CONTENT ── */}
                    <div className="md:col-span-8 space-y-16">

                        {/* 1. Problem Statement */}
                        <section>
                            <h2 className="text-sm font-mono text-foreground/50 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-border-subtle pb-2">
                                <AlertTriangle className="w-4 h-4" /> Problem Statement
                            </h2>
                            <p className="text-lg text-foreground/80 leading-relaxed font-light">
                                {project.problem}
                            </p>
                        </section>

                        {/* 2. System Architecture */}
                        <section>
                            <h2 className="text-sm font-mono text-foreground/50 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-border-subtle pb-2">
                                <ShieldCheck className="w-4 h-4" /> System Architecture
                            </h2>
                            <p className="text-lg text-foreground/80 leading-relaxed font-light">
                                {project.solution}
                            </p>
                        </section>

                        {/* 3. Decision Log */}
                        {project.decisions && project.decisions.length > 0 && (
                            <section>
                                <h2 className="text-sm font-mono text-foreground/50 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-border-subtle pb-2">
                                    <GitBranch className="w-4 h-4 text-teal" /> Decision Log
                                </h2>
                                <p className="text-sm text-foreground/50 mb-6 font-mono">
                                    Architectural decisions with rejected alternatives. The reasoning behind each choice proves engineering judgment.
                                </p>
                                <div className="space-y-6">
                                    {project.decisions.map((d, i) => (
                                        <div key={i} className="bg-surface1 border border-border-subtle rounded-lg overflow-hidden">
                                            {/* Decision Header */}
                                            <div className="px-5 py-3 bg-surface2 border-b border-border-subtle flex items-center justify-between">
                                                <span className="font-mono text-sm font-bold text-foreground">{d.decision}</span>
                                                <span className="text-xs font-mono text-teal/80 px-2 py-0.5 border border-teal/20 bg-teal/5 rounded">
                                                    Selected: {d.selected.split(" ")[0]}
                                                </span>
                                            </div>
                                            <div className="p-5 space-y-4">
                                                {/* Options Considered */}
                                                <div>
                                                    <p className="text-xs font-mono text-foreground/40 uppercase tracking-widest mb-2">Options Evaluated</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {d.options.map((opt) => (
                                                            <span
                                                                key={opt}
                                                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border ${
                                                                    d.selected.includes(opt)
                                                                        ? "border-teal/30 bg-teal/10 text-teal"
                                                                        : "border-border-subtle bg-surface2 text-foreground/40 line-through"
                                                                }`}
                                                            >
                                                                {d.selected.includes(opt)
                                                                    ? <CheckCircle2 className="w-3 h-3 shrink-0" />
                                                                    : <XCircle className="w-3 h-3 shrink-0 text-error/50" />
                                                                }
                                                                {opt}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* Reason */}
                                                <div>
                                                    <p className="text-xs font-mono text-foreground/40 uppercase tracking-widest mb-2">Engineering Rationale</p>
                                                    <p className="text-sm text-foreground/80 leading-relaxed">{d.reason}</p>
                                                </div>
                                                {/* Trade-off */}
                                                <div className="pt-2 border-t border-border-subtle">
                                                    <p className="text-xs font-mono text-warning/70 uppercase tracking-widest mb-1">Trade-off Accepted</p>
                                                    <p className="text-xs font-mono text-foreground/50 leading-relaxed">{d.tradeoff}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 4. Hot Path */}
                        <section>
                            <h2 className="text-sm font-mono text-foreground/50 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-border-subtle pb-2">
                                <Zap className="w-4 h-4 text-teal" /> The Hot Path
                            </h2>
                            <div className="p-6 bg-surface1 border border-border-subtle rounded-lg">
                                <p className="text-foreground/90 leading-relaxed font-mono text-sm">
                                    {project.hotPath}
                                </p>
                            </div>
                        </section>

                        {/* 5. Post-Mortem */}
                        <section>
                            <h2 className="text-sm font-mono text-foreground/50 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-border-subtle pb-2">
                                <Activity className="w-4 h-4 text-error" /> Post-Mortem & Failures
                            </h2>
                            <div className="p-6 bg-error/5 border border-error/20 rounded-lg">
                                <p className="text-foreground/80 leading-relaxed font-mono text-sm">
                                    {project.postMortem}
                                </p>
                            </div>
                        </section>

                        {/* 6. Project Evolution Timeline */}
                        {project.timeline && project.timeline.length > 0 && (
                            <section>
                                <h2 className="text-sm font-mono text-foreground/50 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-border-subtle pb-2">
                                    <BarChart2 className="w-4 h-4 text-teal" /> Project Evolution
                                </h2>
                                <div className="relative">
                                    {/* Vertical spine */}
                                    <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border-subtle" />
                                    <div className="space-y-8">
                                        {project.timeline.map((entry, i) => {
                                            const isFuture = entry.version === "Future";
                                            return (
                                                <div key={i} className="flex gap-5 relative">
                                                    {/* Node */}
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 bg-background z-10 ${isFuture ? "border-teal/30 border-dashed" : "border-teal"}`}>
                                                        <div className={`w-2 h-2 rounded-full ${isFuture ? "bg-teal/30" : "bg-teal"}`} />
                                                    </div>
                                                    {/* Content */}
                                                    <div className="flex-1 pb-2">
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <span className={`font-mono text-xs px-2 py-0.5 rounded border ${isFuture ? "border-teal/20 bg-teal/5 text-teal/60" : "border-border-subtle bg-surface1 text-foreground/60"}`}>
                                                                {entry.version}
                                                            </span>
                                                            <span className="font-medium text-sm text-foreground">{entry.label}</span>
                                                        </div>
                                                        <p className="text-sm text-foreground/60 leading-relaxed font-light">{entry.description}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </section>
                        )}

                    </div>

                    {/* ── SIDEBAR ── */}
                    <aside className="md:col-span-4 space-y-10">

                        {/* Tech Stack */}
                        <div>
                            <h3 className="text-sm font-mono text-foreground/50 uppercase tracking-widest mb-4">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map(t => (
                                    <span key={t} className="px-3 py-1.5 text-xs font-mono bg-surface1 border border-border-subtle rounded-md text-foreground/70">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Metrics Dashboard */}
                        {project.metrics && project.metrics.length > 0 && (
                            <div>
                                <h3 className="text-sm font-mono text-foreground/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <BarChart2 className="w-3.5 h-3.5" />
                                    Engineering Metrics
                                </h3>
                                <div className="space-y-3">
                                    {project.metrics.map((metric, i) => (
                                        <div key={i} className="p-4 bg-surface1 border border-border-subtle rounded-lg border-l-2 border-l-teal">
                                            <p className="text-xs font-mono text-foreground/40 uppercase tracking-widest mb-1">{metric.label}</p>
                                            <p className="text-2xl font-bold font-mono text-foreground leading-none mb-1">
                                                {metric.value} <span className="text-sm font-normal text-teal">{metric.unit}</span>
                                            </p>
                                            <p className="text-xs text-foreground/40 leading-snug mt-2">{metric.context}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Engineering Insights */}
                        {project.insights && project.insights.length > 0 && (
                            <div>
                                <h3 className="text-sm font-mono text-foreground/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Lightbulb className="w-3.5 h-3.5 text-teal" />
                                    Engineering Insights
                                </h3>
                                <div className="space-y-3">
                                    {project.insights.map((insight, i) => (
                                        <div key={i} className="p-4 bg-surface1 border border-border-subtle rounded-lg">
                                            <p className="text-xs font-mono text-foreground/70 leading-relaxed">
                                                {insight}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Graph-based Related Projects */}
                        <RelatedProjects currentSlug={project.slug} />
                    </aside>
                </div>
            </article>
        </main>
    );
}
