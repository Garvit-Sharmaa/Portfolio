"use client";

import { motion } from "framer-motion";
import projectsData from "@/content/projects.json";
import type { Project } from "@/types";
import { ArrowUpRight, Mail } from "lucide-react";
import Image from "next/image";

export default function BentoGrid() {
  const projects = projectsData as Project[];

  return (
    <main className="flex-1 p-4 md:p-6 bg-background min-h-screen overflow-y-auto">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 auto-rows-min">
        
        {/* HERO CARD (Col Span 2, Row Span 2) */}
        <div className="md:col-span-2 xl:col-span-2 xl:row-span-2 bg-surface1 p-8 md:p-10 rounded-3xl border border-border-subtle shadow-glow flex flex-col justify-between">
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-3 py-1 bg-background text-foreground/70 text-xs font-medium rounded-full border border-border-subtle flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-industrial-orange"></span>
              Available
            </span>
            <span className="px-3 py-1 bg-background text-foreground/70 text-xs font-medium rounded-full border border-border-subtle">
              Production Engineer
            </span>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-tight mb-6">
              An engineer specialising in solving complex systems, end to end.
            </h2>
            <div className="space-y-4 text-foreground/70 text-[15px] leading-relaxed">
              <p>
                I engineer production-grade software systems. <strong className="text-foreground font-medium">I drive architecture across the whole stack</strong>; I lead infrastructure, define algorithms, collaborate with product, and measure impact.
              </p>
              <p>
                No toy datasets. No tutorials. Just robust architecture, zero-latency algorithms, and ruthless execution. <strong className="text-foreground font-medium">I engineer for scale, not just aesthetics.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* VISUAL / GRAPHIC CARD (Col Span 1, Row 1) */}
        <div className="xl:col-span-1 bg-surface1 rounded-3xl border border-border-subtle shadow-glow overflow-hidden relative min-h-[250px] xl:min-h-0">
           {/* Abstract aesthetic placeholder instead of the dog image */}
           <div className="absolute inset-0 bg-gradient-to-br from-industrial-orange/20 to-blue-500/20" />
           <div className="absolute inset-0 backdrop-blur-3xl" />
           <div className="absolute inset-0 flex items-center justify-center p-8">
             <div className="w-full h-full border border-foreground/10 rounded-2xl flex items-center justify-center">
               <span className="font-mono text-xs text-foreground/30">SYSTEM.ONLINE</span>
             </div>
           </div>
        </div>

        {/* CONTACT CARD (Col Span 1, Row 2) */}
        <a href="mailto:garvitsharmaa015@gmail.com" className="xl:col-span-1 bg-surface1 rounded-3xl border border-border-subtle shadow-glow flex flex-col items-center justify-center p-8 text-center hover:bg-surface2 transition-colors cursor-pointer min-h-[200px] xl:min-h-0 block">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
            <Mail className="w-8 h-8 text-industrial-orange" />
          </div>
          <h3 className="text-industrial-orange font-medium text-lg">Want to contact me?</h3>
        </a>

        {/* PROJECT 1 (Full Width) */}
        <div id="projects" className="scroll-mt-8 md:col-span-2 xl:col-span-3 bg-surface1 rounded-3xl border border-border-subtle shadow-glow p-8 md:p-10 cursor-pointer group flex flex-col xl:flex-row gap-10 hover:border-border-focus transition-colors">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] text-foreground/60">{projects[0].hotPath}</span>
                <ArrowUpRight className="w-5 h-5 text-foreground/30 group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="text-2xl font-semibold mb-8 text-foreground group-hover:text-industrial-orange transition-colors">{projects[0].title}</h3>
              
              <div className="inline-block px-3 py-1 bg-industrial-orange text-white text-[11px] font-bold uppercase tracking-wider rounded-full">
                New
              </div>
            </div>
            {/* Visual representation of project */}
            <div className="w-full md:w-[60%] h-[300px] bg-background rounded-2xl border border-border-subtle flex items-center justify-center overflow-hidden relative">
               <div className="font-mono text-xs text-foreground/30">{projects[0].subtitle}</div>
            </div>
          </div>

        {/* PROJECT 2 & 3 */}
        {projects.slice(1, 3).map((project, idx) => (
          <div key={project.id} className={`${idx === 0 ? 'xl:col-span-2' : 'xl:col-span-1'} md:col-span-1 bg-surface1 rounded-3xl border border-border-subtle shadow-glow p-8 md:p-10 cursor-pointer group flex flex-col justify-between hover:border-border-focus transition-colors min-h-[400px]`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] text-foreground/60">{project.hotPath}</span>
                <ArrowUpRight className="w-5 h-5 text-foreground/30 group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-industrial-orange transition-colors">{project.title}</h3>
              <p className="text-[14px] text-foreground/60 leading-relaxed mb-8">{project.subtitle}</p>
            </div>
            
            <div className="w-full h-[200px] bg-background rounded-2xl border border-border-subtle flex items-center justify-center relative overflow-hidden">
               <div className="font-mono text-xs text-foreground/20">DIAGNOSTICS</div>
            </div>
          </div>
        ))}
        
      </div>
    </main>
  );
}
