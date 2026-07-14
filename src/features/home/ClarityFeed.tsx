"use client";

import { useState } from "react";

import { motion, Variants } from "framer-motion";
import projectsData from "@/content/projects.json";
import type { Project } from "@/types";
import { Terminal, Layers, Cpu, ArrowRight } from "lucide-react";
import ProjectOverlay from "@/features/canvas/ProjectOverlay";

export default function ClarityFeed({ onEnableGraph }: { onEnableGraph: () => void }) {

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Parse projects
  const projects = projectsData as Project[];

  // DNA: Editorial Rhythm (Staggered Pacing)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 20 }
    },
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-background text-foreground flex flex-col md:flex-row relative"
    >
      
      {/* Left Column: Immediate Identity (8-Second Rule) */}
      <div className="w-full md:w-[45%] lg:w-[40%] md:h-screen md:sticky top-0 p-8 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border-subtle bg-surface1">
        
        <div>
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-surface2 border border-border-subtle font-mono text-xs uppercase tracking-widest text-industrial-orange mb-8">
            <div className="w-2 h-2 rounded-full bg-industrial-orange animate-pulse" />
            System Online
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-4 leading-[0.85] text-white">
            Garvit<br />Bhardwaj
          </motion.h1>
          
          <motion.h2 variants={itemVariants} className="font-mono text-sm md:text-base text-foreground/70 uppercase tracking-widest mb-12">
            AI & Full-Stack Engineer
          </motion.h2>

          <motion.div variants={itemVariants} className="space-y-6 font-mono text-sm text-foreground/80 leading-relaxed max-w-sm">
            <p>
              I engineer production-grade software systems. 
            </p>
            <p className="text-foreground/50">
              No toy datasets. No tutorials. Just robust architecture, zero-latency algorithms, and ruthless execution.
            </p>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-16 md:mt-0 font-mono text-xs text-foreground/40 uppercase tracking-widest space-y-4">
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-industrial-orange transition-colors">[ GITHUB ]</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-industrial-orange transition-colors">[ LINKEDIN ]</a>
            <a href="mailto:garvit@example.com" className="hover:text-industrial-orange transition-colors">[ CONTACT ]</a>
          </div>
          <button 
            onClick={onEnableGraph}
            className="flex items-center gap-2 hover:text-industrial-orange transition-colors text-left"
          >
            <Terminal className="w-4 h-4" /> [ ENABLE_SYSTEMS_GRAPH ]
          </button>
        </motion.div>

      </div>

      {/* Right Column: Evidence / Projects (Dexter Sulit Asymmetry) */}
      <div className="w-full md:w-[55%] lg:w-[60%] p-8 md:p-16 md:py-32 overflow-y-auto bg-background">
        <motion.h3 variants={itemVariants} className="font-mono text-xs text-foreground/50 uppercase tracking-widest mb-12 flex items-center gap-2">
          <Layers className="w-4 h-4" /> Systems Engineered
        </motion.h3>

        <div className="space-y-32">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`group cursor-pointer relative p-8 md:p-12 border border-border-subtle bg-surface1 hover:border-industrial-orange/50 transition-all duration-300 ${idx % 2 === 0 ? "md:mr-16 lg:mr-32" : "md:ml-16 lg:ml-32"}`}
              style={{
                boxShadow: "0 0 0 rgba(255, 51, 0, 0)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-industrial-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-sm text-industrial-orange/50 group-hover:text-industrial-orange transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h4 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white group-hover:text-industrial-orange transition-colors">
                      {project.title}
                    </h4>
                  </div>
                {project.status === "Archived" && (
                  <span className="font-mono text-[10px] uppercase px-2 py-1 border border-border-subtle text-foreground/30">
                    Legacy
                  </span>
                )}
              </div>

              <p className="relative z-10 font-mono text-sm text-foreground/60 mb-8 max-w-md leading-relaxed">
                {project.subtitle}
              </p>

              <div className="relative z-10 p-4 bg-surface2 border border-border-subtle font-mono text-xs text-foreground/50 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-industrial-orange" />
                  <span className="truncate max-w-[200px] md:max-w-xs">{project.hotPath}</span>
                </div>
                
                <span className="flex items-center gap-2 text-industrial-orange opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  DIAGNOSTICS <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reused Diagnostic Overlay */}
      <ProjectOverlay project={selectedProject} onClose={() => setSelectedProject(null)} />
    </motion.div>
  );
}
