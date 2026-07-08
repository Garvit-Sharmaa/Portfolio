"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import BootSequence from "@/features/boot/BootSequence";
import SpatialCanvas from "@/features/canvas/SpatialCanvas";
import CinematicHero from "@/features/home/CinematicHero";
import CinematicAbout from "@/features/home/CinematicAbout";
import CinematicProjectFeed from "@/features/home/CinematicProjectFeed";
import CinematicCapabilities from "@/features/home/CinematicCapabilities";
import CinematicAchievements from "@/features/home/CinematicAchievements";
import CinematicContact from "@/features/home/CinematicContact";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { SiLeetcode } from "react-icons/si";

export type ActiveView = "hero" | "about" | "projects" | "capabilities" | "achievements" | "contact";

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main 
      className="fixed inset-0 w-full h-full overflow-hidden text-white"
      style={{ backgroundColor: "#000000", fontFamily: "var(--font-space-grotesk), Inter, sans-serif" }}
    >
      <ErrorBoundary>
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
        
        {booted && (
          <>
            {/* ─── PERSISTENT ENVIRONMENT ───────────────────────────────────────────── */}
            {/* Ambient Lighting */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 60% 50% at 72% 30%, rgba(255,255,255,0.025) 0%, transparent 100%)"
              }}
            />

            {/* ─── VIRTUAL CAMERA RIG (PORTRAIT) ────────────────────────────────────── */}
            {/* The parent container holds the mask statically so edges don't move */}
            <div
              aria-hidden="true"
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, transparent 25%, rgba(0,0,0,0.4) 45%, black 65%, black 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, transparent 25%, rgba(0,0,0,0.4) 45%, black 65%, black 100%)",
              }}
            >
              {/* The camera lens (motion.div) animates underneath the mask */}
              <motion.div
                variants={{
                  hero: { scale: 1.0, x: "0%", y: "0%" },
                  about: { scale: 0.97, x: "-1.5%", y: "1.5%" },
                  projects: { scale: 0.94, x: "-3%", y: "3%" },
                  capabilities: { scale: 0.90, x: "-5%", y: "5%" },
                  achievements: { scale: 0.94, x: "-3%", y: "3%" },
                  contact: { scale: 1.0, x: "0%", y: "0%" },
                }}
                initial="hero"
                animate={activeView}
                transition={{ type: "spring", stiffness: 45, damping: 25, mass: 1.5 }}
                className="absolute inset-0 origin-bottom-right"
                style={{
                  backgroundImage: "url('/avatar_clean.png')",
                  // Fit perfectly to height. The top of the image is black, so scaling down exposes black background smoothly.
                  backgroundSize: "auto 100%", 
                  backgroundPosition: "right bottom",
                  backgroundRepeat: "no-repeat",
                  filter: "brightness(1.08) contrast(1.05)",
                }}
              />
              
              {/* Edge Feathering: Blends the hard edges of the scaled portrait into the black void */}
              <div 
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
                style={{ height: "15vh", background: "linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.8) 30%, transparent 100%)" }}
              />
              <div 
                aria-hidden="true"
                className="absolute top-0 right-0 bottom-0 z-10 pointer-events-none"
                style={{ width: "15vw", background: "linear-gradient(to left, #000000 0%, rgba(0,0,0,0.8) 30%, transparent 100%)" }}
              />
            </div>
            {/* Persistent Bottom Fade */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none"
              style={{ height: "240px", background: "linear-gradient(to top, #0a0a0a 0%, transparent 100%)" }}
            />

            {/* ─── GLOBAL HEADER ────────────────────────────────────────────────────── */}
            <header
              className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between pointer-events-auto px-6 py-5 md:px-11 md:py-7"
            >
              <button
                onClick={() => setActiveView("hero")}
                className="hover:opacity-80 transition-opacity"
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: "#ffffff",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0
                }}
              >
                GS<span style={{ color: "#E53E3E" }}>.</span>
              </button>

              <nav className="hidden md:flex items-center" style={{ gap: "32px" }}>
                {[
                  { label: "About", id: "about" as ActiveView },
                  { label: "Work", id: "projects" as ActiveView },
                  { label: "Capabilities", id: "capabilities" as ActiveView },
                  { label: "Achievements", id: "achievements" as ActiveView },
                  { label: "Contact", id: "contact" as ActiveView },
                ].map(({ label, id }) => (
                  <button
                    key={label}
                    onClick={() => setActiveView(id)}
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.13em",
                      textTransform: "uppercase",
                      color: activeView === id ? "#ffffff" : "rgba(255,255,255,0.65)",
                      textDecoration: "none",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "color 0.2s"
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "#ffffff")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = activeView === id ? "#ffffff" : "rgba(255,255,255,0.65)")
                    }
                  >
                    {label}
                  </button>
                ))}
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#E53E3E",
                      boxShadow: "0 0 6px rgba(229,62,62,0.6)",
                    }}
                  />
                </div>
              </nav>

              <button 
                className="md:hidden text-white hover:text-[#E53E3E] transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </header>

            {/* ─── MOBILE MENU OVERLAY ──────────────────────────────────────────────── */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center pointer-events-auto"
                >
                  <button 
                    className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X size={32} />
                  </button>
                  <div className="flex flex-col items-center gap-10">
                    {[
                      { label: "About", id: "about" as ActiveView },
                      { label: "Work", id: "projects" as ActiveView },
                      { label: "Capabilities", id: "capabilities" as ActiveView },
                      { label: "Achievements", id: "achievements" as ActiveView },
                      { label: "Contact", id: "contact" as ActiveView },
                    ].map(({ label, id }) => (
                      <button
                        key={label}
                        onClick={() => {
                          setActiveView(id);
                          setIsMobileMenuOpen(false);
                        }}
                        style={{
                          fontSize: "28px",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: activeView === id ? "#ffffff" : "rgba(255,255,255,0.4)",
                          background: "none",
                          border: "none",
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── GLOBAL FOOTER ────────────────────────────────────────────────────── */}
            <div
              className="absolute z-50 pointer-events-auto bottom-6 left-6 md:bottom-11 md:left-11"
            >
              <div
                className="flex items-center"
                style={{
                  gap: "12px",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "12px",
                }}
              >
                Connect
                <div style={{ width: "64px", height: "1px", backgroundColor: "rgba(255,255,255,0.25)" }} />
              </div>

              <div className="flex items-center" style={{ gap: "24px" }}>
                {/* GitHub */}
                <a href="https://github.com/Garvit-Sharmaa" target="_blank" rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s", lineHeight: 0 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub">
                    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/garvit--bhardwaj" target="_blank" rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s", lineHeight: 0 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                {/* X / Twitter */}
                <a href="#"
                  style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s", lineHeight: 0 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-label="X / Twitter">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                  </svg>
                </a>
                {/* LeetCode */}
                <a href="https://leetcode.com/garvitsharma" target="_blank" rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s", lineHeight: 0 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
                >
                  <SiLeetcode size={17} aria-label="LeetCode" />
                </a>
                {/* Mail */}
                <a href="mailto:garvitsharmaa015@gmail.com"
                  style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s", lineHeight: 0 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-label="Email">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* ─── GLOBAL SCROLL INDICATOR ─────────────────────────────────────────── */}
            <div
              className="absolute z-50 hidden md:flex flex-col items-center pointer-events-none right-6 md:right-11"
              style={{ top: "55%", transform: "translateY(-50%)" }}
            >
              <span
                style={{
                  fontSize: "8px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  writingMode: "vertical-rl",
                  marginBottom: "12px",
                }}
              >
                Scroll
              </span>
              <div
                style={{
                  width: "1px",
                  height: "72px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  animate={{ y: [0, 72] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "1px",
                    height: "26px",
                    backgroundColor: "#E53E3E",
                  }}
                />
              </div>
            </div>

            {/* ─── TRANSIENT INFORMATION LAYER ──────────────────────────────────────── */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <AnimatePresence mode="wait">
                {activeView === "hero" && <CinematicHero key="hero" onNavigate={(view) => setActiveView(view as ActiveView)} />}
                {activeView === "about" && <CinematicAbout key="about" />}
                {activeView === "projects" && <CinematicProjectFeed key="projects" />}
                {activeView === "capabilities" && <CinematicCapabilities key="capabilities" />}
                {activeView === "achievements" && <CinematicAchievements key="achievements" />}
                {activeView === "contact" && <CinematicContact key="contact" />}
              </AnimatePresence>
            </div>
          </>
        )}

        {booted && showGraph && (
          <Suspense fallback={<div className="text-industrial-orange font-mono p-8">MOUNTING_CANVAS...</div>}>
            <button 
              onClick={() => setShowGraph(false)}
              className="absolute top-8 right-8 z-50 font-mono text-xs text-foreground/50 hover:text-industrial-orange uppercase border border-border-subtle bg-surface1 px-4 py-2 pointer-events-auto"
            >
              [ RETURN_TO_FEED ]
            </button>
            <SpatialCanvas />
          </Suspense>
        )}
      </ErrorBoundary>
    </main>
  );
}
