"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { SiGithub } from "react-icons/si";
import projectsData from "@/content/projects.json";

type FilterKey = "ALL" | "AI/ML" | "FULL STACK" | "DESIGN";

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16) || 229;
  const g = parseInt(hex.slice(3, 5), 16) || 62;
  const b = parseInt(hex.slice(5, 7), 16) || 62;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const PROJECT_CATEGORIES: Record<number, { label: string; filter: FilterKey; color: string }> = {
  1: { label: "AI / ML", filter: "AI/ML", color: "#E53E3E" },
  2: { label: "Full Stack", filter: "FULL STACK", color: "#E53E3E" },
  3: { label: "AI / ML", filter: "AI/ML", color: "#E53E3E" },
  4: { label: "Enterprise SaaS", filter: "FULL STACK", color: "#E53E3E" },
  5: { label: "Real-Time / WebRTC", filter: "FULL STACK", color: "#E53E3E" },
};

// Styled CSS mockup previews — one per project
function AdAstraMockup() {
  return (
    <div className="w-full h-full bg-[#0d0d0d] flex flex-col overflow-hidden" style={{ fontFamily: "monospace" }}>
      {/* Fake browser bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#1a1a1a] border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-[#E53E3E]/60" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="flex-1 mx-3 bg-white/5 rounded text-[7px] text-white/30 px-2 py-0.5">ad-astra.app</div>
        <div className="text-[7px] text-[#E53E3E] font-bold px-2 py-0.5 bg-[#E53E3E]/10 rounded">OFFLINE</div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Chat */}
        <div className="w-1/2 flex flex-col p-3 gap-2 border-r border-white/5">
          <div className="text-[7px] text-white/40 uppercase tracking-widest mb-1">Triage Session</div>
          <div className="bg-white/5 rounded p-2 text-[7px] text-white/60 leading-relaxed">Patient reports skin lesion, 3 weeks duration...</div>
          <div className="bg-[#E53E3E]/10 border border-[#E53E3E]/20 rounded p-2 text-[7px] text-[#E53E3E]/80 leading-relaxed">AI: Confidence 87% — Dermatitis pattern detected</div>
          <div className="bg-white/5 rounded p-2 text-[7px] text-white/40">Lang: हिन्दी ↓</div>
          <div className="mt-auto flex gap-1">
            <div className="flex-1 bg-white/5 rounded h-5" />
            <div className="bg-[#E53E3E] rounded px-2 h-5 flex items-center text-[7px] text-white font-bold">Send</div>
          </div>
        </div>
        {/* Right: Stats */}
        <div className="w-1/2 flex flex-col p-3 gap-2">
          <div className="text-[7px] text-white/40 uppercase tracking-widest mb-1">Queue Status</div>
          <div className="grid grid-cols-2 gap-1.5">
            {[["9", "Languages"], ["100%", "Delivery"], ["60%", "Mem↓"]].map(([v, l]) => (
              <div key={l} className="bg-white/5 rounded p-1.5">
                <div className="text-[10px] font-bold text-white">{v}</div>
                <div className="text-[6px] text-white/40">{l}</div>
              </div>
            ))}
            <div className="bg-[#E53E3E]/10 border border-[#E53E3E]/20 rounded p-1.5">
              <div className="text-[10px] font-bold text-[#E53E3E]">PWA</div>
              <div className="text-[6px] text-[#E53E3E]/60">Offline-First</div>
            </div>
          </div>
          <div className="mt-auto text-[6px] text-white/20">Service Worker Active ●</div>
        </div>
      </div>
    </div>
  );
}

function TypeForgeMockup() {
  return (
    <div className="w-full h-full bg-[#0d0d0d] flex flex-col overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#1a1a1a] border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-[#E53E3E]/60" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="flex-1 mx-3 bg-white/5 rounded text-[7px] text-white/30 px-2 py-0.5">typeforge.dev</div>
        <div className="text-[7px] text-green-400 font-bold">&lt;5ms</div>
      </div>
      <div className="flex flex-col p-4 gap-3 flex-1">
        {/* Stats row */}
        <div className="flex gap-3">
          {[["94", "WPM"], ["98%", "ACC"], ["0", "ERR"]].map(([v, l]) => (
            <div key={l} className="flex-1 text-center">
              <div className="text-lg font-bold text-white leading-none">{v}</div>
              <div className="text-[7px] text-white/30 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
        {/* Typing area */}
        <div className="flex-1 bg-white/[0.03] rounded p-3 font-mono text-[8px] leading-relaxed">
          <span className="text-white/70">the quick brown fox jumps </span>
          <span className="text-[#E53E3E]">|</span>
          <span className="text-white/20">over the lazy dog and then some more words</span>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-white/5 rounded-full h-1">
          <div className="bg-[#E53E3E] h-1 rounded-full" style={{ width: "62%" }} />
        </div>
        {/* Leaderboard stub */}
        <div className="text-[7px] text-white/30">
          {["#1 Alex — 112 WPM", "#2 Sam — 98 WPM", "#3 You — 94 WPM"].map((r) => (
            <div key={r} className="py-0.5 border-b border-white/5">{r}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PromptKitMockup() {
  return (
    <div className="w-full h-full bg-[#0d0d0d] flex flex-col overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#1a1a1a] border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-[#E53E3E]/60" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="flex-1 mx-3 bg-white/5 rounded text-[7px] text-white/30 px-2 py-0.5">promptkit / benchmark</div>
        <div className="text-[7px] text-white/30">98% ✓</div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Left: strategies */}
        <div className="w-2/5 border-r border-white/5 p-3 flex flex-col gap-1">
          <div className="text-[7px] text-white/40 uppercase tracking-widest mb-1">Strategies</div>
          {["Zero-shot", "Few-shot 3x", "Chain-of-Thought", "Tree-of-Thought", "Role Prompt"].map((s, i) => (
            <div key={s} className={`text-[7px] px-2 py-1 rounded flex justify-between ${i === 2 ? "bg-[#E53E3E]/10 text-[#E53E3E]" : "text-white/40"}`}>
              <span>{s}</span>
              {i === 2 && <span>+38%</span>}
            </div>
          ))}
        </div>
        {/* Right: results */}
        <div className="flex-1 p-3 flex flex-col gap-2">
          <div className="text-[7px] text-white/40 uppercase tracking-widest mb-1">Gemini vs GPT-4o</div>
          {[["CoT — Gemini", "87%", true], ["CoT — GPT-4o", "51%", false], ["Direct — Gemini", "63%", false]].map(([label, pct, highlight]) => (
            <div key={String(label)} className="flex items-center gap-2">
              <div className="text-[6px] text-white/30 w-20 shrink-0">{label}</div>
              <div className="flex-1 bg-white/5 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: String(pct), backgroundColor: highlight ? "#E53E3E" : "rgba(255,255,255,0.15)" }}
                />
              </div>
              <div className="text-[6px] text-white/40">{pct}</div>
            </div>
          ))}
          <div className="mt-auto text-[6px] text-white/20 font-mono">p-limit(3) + jitter ✓</div>
        </div>
      </div>
    </div>
  );
}

function NexuraMockup() {
  return (
    <div className="w-full h-full bg-[#0d0d0d] flex flex-col overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#1a1a1a] border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-[#E53E3E]/60" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="flex-1 mx-3 bg-white/5 rounded text-[7px] text-white/30 px-2 py-0.5">nexura.app / dashboard</div>
        <div className="text-[7px] text-[#E53E3E] font-bold">PRO TIER</div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 border-r border-white/5 p-3 flex flex-col gap-2 bg-black/20">
          <div className="text-[7px] text-white/40 uppercase tracking-widest mb-1">Menu</div>
          {["Dashboard", "Tenants", "Integrations", "Billing"].map((s, i) => (
            <div key={s} className={`text-[7px] px-2 py-1 rounded ${i === 2 ? "bg-[#E53E3E]/10 text-[#E53E3E]" : "text-white/40"}`}>
              {s}
            </div>
          ))}
        </div>
        {/* Main */}
        <div className="flex-1 p-3 flex flex-col gap-3">
          <div className="flex justify-between items-end">
            <div className="text-[7px] text-white/40 uppercase tracking-widest">Active Syncs</div>
            <div className="text-[6px] text-green-400">● Live Socket</div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 rounded p-2">
              <div className="text-[10px] font-bold text-white">Google Sheets</div>
              <div className="text-[6px] text-white/40 mt-1">Syncing 4,200 rows...</div>
              <div className="w-full bg-black/50 rounded-full h-1 mt-2">
                <div className="bg-[#E53E3E] h-1 rounded-full" style={{ width: "45%" }} />
              </div>
            </div>
            <div className="bg-white/5 rounded p-2">
              <div className="text-[10px] font-bold text-white">Stripe MRR</div>
              <div className="text-[12px] text-[#E53E3E] font-mono mt-0.5">$12.4k</div>
            </div>
          </div>
          
          <div className="mt-auto bg-[#E53E3E]/5 border border-[#E53E3E]/20 rounded p-2 flex justify-between items-center">
             <div className="text-[7px] text-white/60">BullMQ: Processing Jobs</div>
             <div className="text-[7px] text-[#E53E3E] font-mono">14 active</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudySyncMockup() {
  return (
    <div className="w-full h-full bg-[#0d0d0d] flex flex-col overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#1a1a1a] border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-[#E53E3E]/60" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="flex-1 mx-3 bg-white/5 rounded text-[7px] text-white/30 px-2 py-0.5">studysync.app / room-191</div>
        <div className="text-[7px] text-[#E53E3E] font-bold">● REC</div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Editor */}
        <div className="flex-1 p-3 flex flex-col gap-2 border-r border-white/5">
          <div className="text-[7px] text-white/40 uppercase tracking-widest mb-1 flex justify-between">
            <span>Collaborative Notes</span>
            <span className="text-green-400">E2E Encrypted</span>
          </div>
          <div className="flex-1 bg-white/[0.02] rounded p-2 text-[6px] text-white/60 leading-relaxed font-mono">
            <span className="text-[#E53E3E]"># System Architecture</span><br/><br/>
            The core engine uses <span className="bg-[#E53E3E]/20 text-white px-1">Yjs CRDTs</span> for real-time document syncing. 
            <br/><br/>
            We are also using <span className="relative">LiveKit SFU<span className="absolute -top-3 -right-2 bg-blue-500 text-white px-1 py-0.5 rounded text-[4px]">Alex</span></span> for WebRTC video routing to support up to 100 users.
          </div>
        </div>
        {/* Sidebar / Video / Timer */}
        <div className="w-1/3 flex flex-col gap-2 p-2 bg-black/20">
          <div className="bg-white/5 rounded flex flex-col items-center justify-center p-2 border border-white/5">
            <div className="text-[12px] font-mono text-white font-bold tracking-widest">24:59</div>
            <div className="text-[5px] text-[#E53E3E] uppercase mt-1">Pomodoro Sync</div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
             <div className="flex-1 bg-[#1a1a1a] rounded border border-white/10 relative overflow-hidden">
               <div className="absolute bottom-1 left-1 bg-black/60 text-[5px] text-white px-1 rounded">Garvit</div>
               <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-green-500"></div>
             </div>
             <div className="flex-1 bg-[#1a1a1a] rounded border border-white/10 relative overflow-hidden flex items-center justify-center">
               <span className="text-[8px] text-white/30">Alex (Muted)</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MOCKUPS = [AdAstraMockup, TypeForgeMockup, PromptKitMockup, NexuraMockup, StudySyncMockup];

const FILTERS: FilterKey[] = ["ALL", "AI/ML", "FULL STACK"];

export default function CinematicProjectFeed() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL");
  const [page, setPage] = useState(1);

  const filtered = activeFilter === "ALL"
    ? projectsData
    : projectsData.filter((p) => PROJECT_CATEGORIES[p.id]?.filter === activeFilter);

  const totalPages = 3;

  return (
    <motion.div
      key="projects-view"
      initial={{ opacity: 0, x: 20, filter: "blur(2px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: 40, filter: "blur(4px)" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute inset-0 w-full overflow-y-auto overflow-x-hidden text-white pointer-events-auto"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto" style={{ paddingLeft: "44px", paddingRight: "44px" }}>

        {/* ─── SECTION HEADER ─────────────────────────────────────────────── */}
        <div className="mb-16" style={{ maxWidth: "520px" }}>
          <p style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#E53E3E", marginBottom: "16px",
          }}>
            My Work
          </p>
          <h2 style={{
            fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 800,
            lineHeight: 1.0, letterSpacing: "-0.02em", color: "#ffffff",
            margin: "0 0 20px 0",
          }}>
            Ideas. Code.<br />
            Impact<span style={{ color: "#E53E3E" }}>.</span>
          </h2>
          <p style={{
            fontSize: "15px", fontWeight: 400, lineHeight: 1.6,
            color: "rgba(255,255,255,0.55)", maxWidth: "300px", marginBottom: "28px",
          }}>
            A selection of projects where I&apos;ve turned ideas into powerful digital experiences.
          </p>
          <a
            href="https://github.com/Garvit-Sharmaa"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3"
            style={{
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.8)",
              textDecoration: "none",
            }}
          >
            View All Projects
            <ArrowUpRight size={14} style={{ color: "#E53E3E" }}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>

        {/* ─── FILTER TABS + SORT ──────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
          <div className="flex items-center gap-6">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: activeFilter === f ? "#E53E3E" : "rgba(255,255,255,0.45)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== f) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)";
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== f) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2"
            style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
            Sort by
            <span style={{ color: "rgba(255,255,255,0.6)" }}>Latest</span>
            <ChevronDown size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
          </div>
        </div>

        {/* ─── PROJECT CARDS GRID ──────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {filtered.map((project, idx) => {
              const MockupComponent = MOCKUPS[project.id - 1] ?? MOCKUPS[0];
              const category = PROJECT_CATEGORIES[project.id];

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="group relative flex flex-col"
                  style={{
                    backgroundColor: "#111111",
                    border: "1px solid rgba(255,255,255,0.07)",
                    cursor: "pointer",
                    transition: "border-color 0.25s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor = hexToRgba(project.brandColor || "#E53E3E", 0.3))
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)")
                  }
                >
                  {/* Mockup Preview */}
                  <div style={{ height: "200px", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <MockupComponent />
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <p style={{
                      fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em",
                      textTransform: "uppercase", color: project.brandColor || category?.color || "#E53E3E",
                      marginBottom: "8px",
                    }}>
                      {category?.label ?? "Project"}
                    </p>
                    <h3 style={{
                      fontSize: "20px", fontWeight: 700, letterSpacing: "-0.01em",
                      color: "#ffffff", marginBottom: "10px", lineHeight: 1.2,
                    }}>
                      {project.title}
                    </h3>
                    <p style={{
                      fontSize: "13px", lineHeight: 1.6,
                      color: "rgba(255,255,255,0.5)", marginBottom: "16px", flexGrow: 1,
                    }}>
                      {project.solution.slice(0, 110)}...
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 4).map((t) => (
                        <span key={t} style={{
                          fontSize: "9px", fontWeight: 600, letterSpacing: "0.08em",
                          textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
                          fontFamily: "monospace",
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <span style={{
                        fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em",
                        color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
                      }}>
                        {project.status}
                      </span>
                      <div className="flex items-center gap-4">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="group flex items-center gap-1"
                            style={{
                              color: project.brandColor || "#E53E3E",
                              transition: "color 0.2s",
                              fontSize: "10px",
                              fontWeight: 600,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase"
                            }}
                          >
                            Live
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                          </a>
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            color: "rgba(255,255,255,0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.color = "#ffffff")
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)")
                          }
                        >
                          <SiGithub size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ─── PAGINATION ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            style={{
              width: "28px", height: "28px", border: "1px solid rgba(255,255,255,0.15)",
              background: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <ChevronLeft size={14} />
          </button>

          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              style={{
                fontSize: "12px", fontWeight: 600,
                color: page === n ? "#E53E3E" : "rgba(255,255,255,0.3)",
                background: "none", border: "none", cursor: "pointer",
                minWidth: "24px", textAlign: "center",
                transition: "color 0.2s",
              }}
            >
              {String(n).padStart(2, "0")}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            style={{
              width: "28px", height: "28px", border: "1px solid rgba(255,255,255,0.15)",
              background: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <ChevronRight size={14} />
          </button>
        </div>

      </div>
    </motion.div>
  );
}
