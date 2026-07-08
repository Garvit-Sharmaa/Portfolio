"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BrainCircuit, Bot, TerminalSquare, Settings2, Network, Server, Accessibility } from "lucide-react";
import { useState } from "react";
import { 
  SiPython, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, 
  SiNodedotjs, SiNestjs, SiExpress, SiPostgresql, SiMongodb, SiPrisma, 
  SiRedis, SiDocker, SiVercel, SiGit, SiFigma, 
  SiOpencv, SiPytorch, SiLinux
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const getTechIcon = (tech: string) => {
  switch (tech) {
    case "Python": return <SiPython size={11} color="#3776AB" />;
    case "OpenCV": return <SiOpencv size={11} color="#5C3EE8" />;
    case "PyTorch": return <SiPytorch size={11} color="#EE4C2C" />;
    case "React": return <SiReact size={11} color="#61DAFB" />;
    case "Next.js": return <SiNextdotjs size={11} color="#FFFFFF" />;
    case "TypeScript": return <SiTypescript size={11} color="#3178C6" />;
    case "TailwindCSS": return <SiTailwindcss size={11} color="#06B6D4" />;
    case "Framer Motion": return <SiFramer size={11} color="#0055FF" />;
    case "Node.js": return <SiNodedotjs size={11} color="#339933" />;
    case "NestJS": return <SiNestjs size={11} color="#E0234E" />;
    case "Express": return <SiExpress size={11} color="#FFFFFF" />;
    case "PostgreSQL": return <SiPostgresql size={11} color="#4169E1" />;
    case "MongoDB": return <SiMongodb size={11} color="#47A248" />;
    case "Prisma": return <SiPrisma size={11} color="#FFFFFF" />;
    case "Redis": return <SiRedis size={11} color="#DC382D" />;
    case "Docker": return <SiDocker size={11} color="#2496ED" />;
    case "AWS": return <FaAws size={11} color="#FF9900" />;
    case "Vercel": return <SiVercel size={11} color="#FFFFFF" />;
    case "Git": return <SiGit size={11} color="#F05032" />;
    case "Linux": return <SiLinux size={11} color="#FCC624" />;
    case "Figma": return <SiFigma size={11} color="#F24E1E" />;
    
    // Generics mapped to Lucide (using slightly dimmed white to fit aesthetic)
    case "Machine Learning": return <BrainCircuit size={11} color="#a1a1aa" />;
    case "NLP": return <Bot size={11} color="#a1a1aa" />;
    case "Prompt Engineering": return <TerminalSquare size={11} color="#a1a1aa" />;
    case "SSR": return <Settings2 size={11} color="#a1a1aa" />;
    case "REST": return <Network size={11} color="#a1a1aa" />;
    case "WebSockets": return <Network size={11} color="#a1a1aa" />;
    case "Queue Systems": return <Server size={11} color="#a1a1aa" />;
    case "Normalization": return <Settings2 size={11} color="#a1a1aa" />;
    case "Indexing": return <Settings2 size={11} color="#a1a1aa" />;
    case "CI/CD": return <Settings2 size={11} color="#a1a1aa" />;
    case "UX Thinking": return <BrainCircuit size={11} color="#a1a1aa" />;
    case "Design Systems": return <Network size={11} color="#a1a1aa" />;
    case "Motion Design": return <SiFramer size={11} color="#0055FF" />;
    case "Accessibility": return <Accessibility size={11} color="#a1a1aa" />;
    default: return <Settings2 size={11} color="#a1a1aa" />;
  }
};

type ModuleProps = {
  number: string;
  title: string;
  evidence: { text: string; project?: string }[];
  tech: string[];
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  anyHovered: boolean;
};

function CapabilityModule({ number, title, evidence, tech, isHovered, onHover, onLeave, anyHovered }: ModuleProps) {
  // If another module is hovered, dim this one slightly
  const opacity = anyHovered && !isHovered ? 0.3 : 1;

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="flex flex-col relative"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        paddingTop: "24px",
        paddingBottom: "16px",
        opacity,
        transition: "opacity 0.4s ease, transform 0.4s ease",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div className="flex justify-between items-baseline mb-6">
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: isHovered ? "#ffffff" : "rgba(255,255,255,0.9)",
            transition: "color 0.3s",
          }}
        >
          {title}
        </h3>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "10px",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          MOD_{number}
        </span>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        {evidence.map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <div style={{ color: "#E53E3E", fontSize: "12px", marginTop: "4px" }}>▹</div>
            <div>
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {item.text}
              </p>
              {item.project && (
                <div
                  className="mt-2"
                  style={{
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: isHovered ? "#E53E3E" : "rgba(255,255,255,0.25)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    transition: "color 0.3s",
                  }}
                >
                  [ VIEW PROJECT: {item.project} ] <ArrowUpRight size={10} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 flex flex-wrap gap-2" style={{ borderTop: "1px dashed rgba(255,255,255,0.05)" }}>
        {tech.map((t) => (
          <span
            key={t}
            className="flex items-center gap-1.5"
            style={{
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: isHovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)",
              fontFamily: "monospace",
              background: isHovered ? "rgba(255,255,255,0.05)" : "transparent",
              padding: "4px 8px",
              borderRadius: "4px",
              transition: "all 0.3s",
            }}
          >
            {getTechIcon(t)}
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CinematicCapabilities() {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const modules = [
    {
      id: "01",
      title: "AI Engineering",
      evidence: [
        { text: "Implemented on-device diagnostic inference using local ML models for offline medical triage.", project: "AD ASTRA" },
        { text: "Architected automated LLM evaluation pipelines with multi-shot prompting strategies and strict latency budgets.", project: "PROMPTKIT" }
      ],
      tech: ["Python", "Machine Learning", "NLP", "Prompt Engineering", "OpenCV", "PyTorch"]
    },
    {
      id: "02",
      title: "Frontend Engineering",
      evidence: [
        { text: "Engineered ultra-low latency typing interface achieving <5ms input delay by optimizing React render cycles.", project: "TYPEFORGE" },
        { text: "Developed cinematic Virtual Camera architecture with hardware-accelerated Framer Motion transitions.", project: "PROJECT AURA" },
        { text: "Integrated real-time Yjs CRDT collaborative editing and LiveKit WebRTC video routing for 100+ concurrent users.", project: "STUDYSYNC" }
      ],
      tech: ["React", "Next.js", "TypeScript", "Framer Motion", "WebRTC", "CRDTs"]
    },
    {
      id: "03",
      title: "Backend Engineering",
      evidence: [
        { text: "Designed robust queueing systems and edge functions to handle highly concurrent API benchmark requests.", project: "PROMPTKIT" },
        { text: "Architected secure multi-tenant SaaS backend with strict Row-Level Security and BullMQ worker queues.", project: "NEXURA SOLUTIONS" }
      ],
      tech: ["Node.js", "NestJS", "Express", "REST", "WebSockets", "Queue Systems"]
    },
    {
      id: "04",
      title: "Databases",
      evidence: [
        { text: "Optimized complex query performance and implemented robust data normalization schemas." },
        { text: "Utilized in-memory data stores for sub-millisecond caching of real-time leaderboard statistics.", project: "TYPEFORGE" }
      ],
      tech: ["PostgreSQL", "MongoDB", "Prisma", "Redis", "Normalization", "Indexing"]
    },
    {
      id: "05",
      title: "Cloud & DevOps",
      evidence: [
        { text: "Containerized distributed services using Docker for predictable and isolated deployment pipelines." },
        { text: "Configured edge deployments for globally distributed, low-latency API routes." }
      ],
      tech: ["Docker", "CI/CD", "AWS", "Vercel", "Git", "Linux"]
    },
    {
      id: "06",
      title: "Design & Product",
      evidence: [
        { text: "Architected end-to-end UX for medical professionals focusing on high-contrast accessibility in adverse conditions.", project: "AD ASTRA" },
        { text: "Designed premium, editorial UI systems focusing on kinetic typography and micro-interactions.", project: "PROJECT AURA" }
      ],
      tech: ["Figma", "UX Thinking", "Design Systems", "Motion Design", "Accessibility"]
    }
  ];

  return (
    <motion.div
      key="capabilities-view"
      initial={{ opacity: 0, x: 20, filter: "blur(2px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: 40, filter: "blur(4px)" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute inset-0 w-full overflow-y-auto overflow-x-hidden text-white pointer-events-auto"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24" style={{ paddingLeft: "44px", paddingRight: "44px" }}>
        
        {/* ─── LEFT PANE: EDITORIAL INTRO ────────────────────────────────────────── */}
        <div className="lg:w-1/3">
          <p style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#E53E3E", marginBottom: "16px",
          }}>
            Engineering Capabilities
          </p>
          <h2 style={{
            fontSize: "clamp(42px, 5vw, 56px)", fontWeight: 800,
            lineHeight: 1.05, letterSpacing: "-0.02em", color: "#ffffff",
            margin: "0 0 24px 0",
          }}>
            Engineering Systems<br />
            Across the<br />
            Modern Stack<span style={{ color: "#E53E3E" }}>.</span>
          </h2>
          <p style={{
            fontSize: "15px", fontWeight: 400, lineHeight: 1.65,
            color: "rgba(255,255,255,0.6)", maxWidth: "320px",
          }}>
            I build intelligent software from research to deployment, combining AI inference, highly concurrent backend systems, resilient cloud infrastructure, and uncompromising frontend engineering.
          </p>
          
          {/* Visual embellishment: blueprint crosshair */}
          <div className="hidden lg:block mt-24" style={{ width: "40px", height: "40px", position: "relative", opacity: 0.2 }}>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white" />
            <div className="absolute top-1/2 left-1/2 w-4 h-4 border border-white transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
          </div>
        </div>

        {/* ─── RIGHT PANE: CAPABILITY MATRIX ─────────────────────────────────────── */}
        <div className="lg:w-2/3 relative">
          
          {/* Readability Backdrop: A very subtle dark gradient that ensures text contrast against the portrait */}
          <div 
            className="absolute inset-0 pointer-events-none z-0" 
            style={{
              background: "radial-gradient(circle at center, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.6) 50%, transparent 100%)",
              margin: "-60px -80px", // Expand beyond the grid to soften edges
              filter: "blur(20px)",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 relative z-10">
            {modules.map((mod) => (
              <CapabilityModule
                key={mod.id}
                number={mod.id}
                title={mod.title}
                evidence={mod.evidence}
                tech={mod.tech}
                isHovered={hoveredModule === mod.id}
                onHover={() => setHoveredModule(mod.id)}
                onLeave={() => setHoveredModule(null)}
                anyHovered={hoveredModule !== null}
              />
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
