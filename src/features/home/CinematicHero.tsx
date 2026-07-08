"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CinematicHero({ onNavigate }: { onNavigate?: (view: string) => void }) {
  return (
    <motion.div
      key="hero-view"
      initial={{ opacity: 0, x: -20, filter: "blur(2px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -40, filter: "blur(4px)" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute inset-0 z-10 flex flex-col justify-center pointer-events-none"
      style={{ paddingLeft: "44px", paddingBottom: "20px" }}
    >
      <div className="pointer-events-auto" style={{ maxWidth: "440px" }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "12px",
            lineHeight: 1,
          }}
        >
          Hi, I&apos;m <span style={{ color: "#E53E3E" }}>Garvit Sharma</span>
        </motion.p>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontSize: "clamp(56px, 7.2vw, 76px)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            margin: "0 0 16px 0",
            whiteSpace: "nowrap",
          }}
        >
          AI Engineer
          <br />
          &amp; Full Stack
          <br />
          Developer
        </motion.h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.16, ease: [0.25, 0.46, 0.45, 0.94] }}
          spellCheck={false}
          style={{
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.65)",
            maxWidth: "280px",
            margin: "0 0 32px 0",
            whiteSpace: "normal",
            userSelect: "none",
          }}
        >
          I build intelligent, scalable and impactful digital experiences with
          modern technologies and a focus on solving real-world problems.
        </motion.p>

        {/* CTA */}
        <motion.button
          onClick={() => onNavigate?.("projects")}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="group"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "16px",
            border: "1px solid rgba(255,255,255,0.28)",
            borderRadius: "0px",
            padding: "13px 22px",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.9)",
            textDecoration: "none",
            backgroundColor: "transparent",
            transition: "border-color 0.2s ease, background-color 0.2s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.55)";
            (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.28)";
            (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
          }}
        >
          View My Work
          <ArrowUpRight
            style={{ width: "14px", height: "14px", color: "#E53E3E" }}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
          />
        </motion.button>
      </div>
    </motion.div>
  );
}
