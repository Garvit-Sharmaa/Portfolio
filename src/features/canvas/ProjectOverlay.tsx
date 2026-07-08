"use client";

import { useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import FocusLock from "react-focus-lock";
import type { Project } from "@/types";
import { X, GitBranch, BarChart2, Lightbulb, Zap, ShieldCheck } from "lucide-react";
interface ProjectOverlayProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectOverlay({ project, onClose }: ProjectOverlayProps) {
  return (
    <AnimatePresence>
      {project && <OverlayContent project={project} onClose={onClose} />}
    </AnimatePresence>
  );
}

function OverlayContent({ project, onClose }: { project: Project; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  return (
    <FocusLock returnFocus>
      {/* Brutalist backdrop */}
      <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Overlay Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="overlay-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full md:w-[600px] h-full bg-surface1 border-l-2 border-surface2 z-50 overflow-y-auto flex flex-col font-sans"
            ref={scrollRef}
          >
            {/* Goal Gradient Effect: Progress Bar */}
            <motion.div
              style={{ scaleX }}
              className="sticky top-0 left-0 right-0 h-1 bg-industrial-orange origin-left z-20"
              aria-hidden="true"
            />
            
            {/* Header */}
            <div className="relative bg-surface1 border-b-2 border-surface2 p-6 pt-8 z-10">
              
              {/* Fitts' Law: Infinite width close button in exact corner */}
              <button 
                onClick={onClose}
                aria-label="Close project details"
                className="absolute top-0 right-0 p-4 text-foreground/30 hover:text-industrial-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-orange bg-surface2/50 hover:bg-surface2"
              >
                <X className="w-6 h-6" />
              </button>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs px-2 py-1 bg-surface2 text-industrial-orange border border-industrial-orange/30">
                    {project.status}
                  </span>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-foreground/50 hover:text-industrial-orange transition-colors"
                  >
                    [VIEW_SOURCE]
                  </a>
                </div>
                <h2 id="overlay-title" className="text-3xl font-bold tracking-tighter uppercase text-foreground">
                  {project.title}
                </h2>
                <p className="font-mono text-sm text-foreground/50 mt-1">{project.subtitle}</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-12">
              
              {/* Architecture & Problem */}
              <section>
                <h3 className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> System Architecture
                </h3>
                <div className="space-y-4 text-sm text-foreground/80 leading-relaxed font-mono">
                  <p><span className="text-industrial-orange">PROBLEM:</span> {project.problem}</p>
                  <p><span className="text-industrial-orange">SOLUTION:</span> {project.solution}</p>
                </div>
              </section>

              {/* The Hot Path */}
              <section>
                <h3 className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-industrial-orange" /> The Hot Path
                </h3>
                <div className="p-4 border-2 border-surface2 bg-background font-mono text-sm leading-relaxed text-foreground/70">
                  {project.hotPath}
                </div>
              </section>

              {/* Serial Position Effect: Tech Stack buried in the middle */}
              {project.tech && project.tech.length > 0 && (
                <section>
                  <h3 className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-2 py-1 bg-surface2 font-mono text-xs text-foreground/60 border border-border-subtle">
                        {t}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Decision Log */}
              {project.decisions && project.decisions.length > 0 && (
                <section>
                  <h3 className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <GitBranch className="w-4 h-4" /> Decision Log
                  </h3>
                  <div className="space-y-4">
                    {project.decisions.map((d, i) => (
                      <div key={i} className="border-l-2 border-industrial-orange pl-4">
                        <div className="font-bold text-sm uppercase tracking-wide mb-1 text-foreground">{d.decision}</div>
                        <div className="font-mono text-xs text-industrial-orange mb-2">SELECTED: {d.selected}</div>
                        <p className="text-sm text-foreground/70 mb-2 leading-relaxed">{d.reason}</p>
                        <div className="bg-surface2 p-3 font-mono text-xs text-foreground/50 border-t border-surface1">
                          TRADE-OFF: {d.tradeoff}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <section>
                  <h3 className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" /> Engineering Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="p-4 border-2 border-surface2">
                        <div className="text-3xl font-bold font-mono text-foreground tracking-tighter">
                          {metric.value} <span className="text-sm font-normal text-industrial-orange">{metric.unit}</span>
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mt-1">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
            </div>
      </motion.div>
    </FocusLock>
  );
}
