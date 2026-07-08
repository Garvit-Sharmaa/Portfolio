"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";
import projectsData from "@/content/projects.json";
import type { Project } from "@/types";
import { getRelated } from "@/lib/intelligenceEngine";
import ProjectOverlay from "@/features/canvas/ProjectOverlay";

// Deterministic layout function to scatter projects radially
function calculateNodePositions(projects: Project[]) {
  const nodes = projects.map((project, index) => {
    // Math to spread them in a loose spiral/circular pattern
    const angle = index * (Math.PI * 2.39); // Golden ratio angle
    let radius = 250 + Math.sqrt(index) * 150;
    
    // Archive Perimeter Logic: Push legacy projects far outward
    if (project.status === "Archived") {
      radius += 400; 
    }

    return {
      ...project,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  });
  return nodes;
}

export default function SpatialCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSlug = searchParams.get("project");
  const [isMobile, setIsMobile] = useState(false);
  
  const nodes = useMemo(() => calculateNodePositions(projectsData as Project[]), []);
  const selectedProject = useMemo(() => nodes.find(n => n.slug === selectedSlug) || null, [nodes, selectedSlug]);

  const edges = useMemo(() => {
    const newEdges: { x1: number; y1: number; x2: number; y2: number }[] = [];
    nodes.forEach((node) => {
      const related = getRelated(node.slug);
      related.forEach((relProj) => {
        const targetNode = nodes.find((n) => n.slug === relProj.slug);
        if (targetNode) {
          const edgeExists = newEdges.some(
            (e) => (e.x1 === node.x && e.x2 === targetNode.x) || (e.x1 === targetNode.x && e.x2 === node.x)
          );
          if (!edgeExists) {
            newEdges.push({ x1: node.x, y1: node.y, x2: targetNode.x, y2: targetNode.y });
          }
        }
      });
    });
    return newEdges;
  }, [nodes]);

  // Smooth dragging constraints
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 100 });
  const springY = useSpring(y, { damping: 20, stiffness: 100 });

  useEffect(() => {
    // Graceful Degradation: Check for mobile/low-power viewport
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Center the canvas on mount
    if (typeof window !== "undefined") {
      x.set(window.innerWidth / 2);
      y.set(window.innerHeight / 2);
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, [x, y]);

  return (
    <div 
      className="absolute inset-0 overflow-hidden bg-background touch-none select-none cursor-grab active:cursor-grabbing"
      ref={containerRef}
    >
      {/* Background Grid for spatial reference */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.1}
        dragMomentum={false}
        style={{ x: springX, y: springY, willChange: "transform" }}
        className="absolute top-0 left-0 w-[5000px] h-[5000px] -ml-[2500px] -mt-[2500px]"
      >
        {/* Render Edges (SVG lines between nodes) - Disabled on Mobile for Performance */}
        {!isMobile && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <g transform="translate(2500, 2500)">
              {edges.map((edge, i) => (
                <line
                  key={i}
                  x1={edge.x1}
                  y1={edge.y1}
                  x2={edge.x2}
                  y2={edge.y2}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="2"
                />
              ))}
            </g>
          </svg>
        )}

        {/* Render Nodes */}
        <div className="absolute top-[2500px] left-[2500px]">
          {nodes.map((node) => (
            <motion.button
              key={node.slug}
              className="absolute group flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 p-6 -m-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{ left: node.x, top: node.y }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/?project=${node.slug}`, { scroll: false })}
              aria-label={`View project details for ${node.title}`}
              title={`View ${node.title}`}
            >
              {/* Node core */}
              <div className={`w-12 h-12 flex items-center justify-center font-mono text-xs transition-colors ${
                node.status === "Archived" 
                  ? "bg-transparent border-2 border-dashed border-surface2 text-foreground/30 group-hover:border-industrial-orange/50 group-hover:text-industrial-orange/50" 
                  : "bg-surface1 border-2 border-surface2 group-hover:border-industrial-orange text-foreground/50 group-hover:text-industrial-orange"
              }`}>
                {node.slug.substring(0, 2).toUpperCase()}
              </div>
              
              {/* Node label */}
              <div className={`mt-4 absolute top-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border px-3 py-1 text-xs font-mono ${
                node.status === "Archived"
                  ? "bg-background border-dashed border-surface2 text-foreground/40"
                  : "bg-surface1 border-border-subtle text-foreground"
              }`} aria-hidden="true">
                {node.title} {node.status === "Archived" && "(Legacy)"}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      {/* OS Static HUD */}
      <div className="absolute bottom-8 left-8 font-mono text-xs text-foreground/30 pointer-events-none uppercase tracking-widest z-10">
        <p>AURA_OS v11.0.4</p>
        <p>Drag to explore graph</p>
      </div>

      <ProjectOverlay project={selectedProject} onClose={() => router.push("/", { scroll: false })} />

      {/* Screen Reader Announcements */}
      <div className="sr-only" aria-live="polite">
        {selectedProject 
          ? `Selected project: ${selectedProject.title}. Press Esc to close.` 
          : `Spatial graph loaded with ${nodes.length} projects. Use Tab to navigate.`}
      </div>
    </div>
  );
}
