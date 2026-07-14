"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { Project } from "@/types";
import Image from "next/image";

interface CinematicProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function CinematicProjectModal({ project, onClose }: CinematicProjectModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = project.images || [];
  const [mounted, setMounted] = useState(false);
  
  const handleNext = useCallback(() => {
    if (images.length > 0) {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  }, [images.length]);

  const handlePrev = useCallback(() => {
    if (images.length > 0) {
      setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  }, [images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  const activeImage = images[activeIndex];
  const brandColor = project.brandColor || "#E53E3E";

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        backdropFilter: "blur(24px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        pointerEvents: "auto"
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-50 p-2"
      >
        <X size={32} />
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          width: "100%",
          maxWidth: "1600px",
          height: "100%",
          maxHeight: "900px",
          display: "flex",
          backgroundColor: "#0a0a0a",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "1rem",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          position: "relative"
        }}
        className="flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT: IMAGE CAROUSEL (65%) */}
        <div className="relative w-full lg:w-[65%] h-[50vh] lg:h-full bg-black flex items-center justify-center group border-b lg:border-b-0 lg:border-r border-white/5">
          {images.length > 0 ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full p-4 md:p-8 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={activeImage.src}
                      alt={`${project.title} screenshot ${activeIndex + 1}`}
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Carousel Controls */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 hover:border-white/30 backdrop-blur-md transition-all lg:opacity-0 lg:group-hover:opacity-100"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 hover:border-white/30 backdrop-blur-md transition-all lg:opacity-0 lg:group-hover:opacity-100"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-bold tracking-widest text-white/70 uppercase">
                {activeIndex + 1} / {images.length}
              </div>
            </>
          ) : (
            <div className="text-white/30 text-sm font-mono uppercase tracking-widest flex flex-col items-center gap-4">
              <Maximize2 size={32} className="opacity-20" />
              No images available
            </div>
          )}
        </div>

        {/* RIGHT: PROJECT INFO & EXPLANATION (35%) */}
        <div className="w-full lg:w-[35%] h-full flex flex-col bg-[#0f0f0f] relative">
          <div className="p-8 lg:p-12 overflow-y-auto flex-1 custom-scrollbar">
            
            {/* Header */}
            <div className="mb-12">
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.slice(0, 3).map((t) => (
                  <span 
                    key={t}
                    className="px-2 py-1 rounded text-[9px] font-bold tracking-[0.15em] uppercase border border-white/10 text-white/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
                {project.title}
              </h2>
              <p style={{ color: brandColor }} className="text-xs font-bold tracking-widest uppercase mb-6">
                {project.subtitle}
              </p>
              <div className="w-8 h-px bg-white/20"></div>
            </div>

            {/* Dynamic Explanation Area */}
            <div className="relative min-h-[300px]">
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: brandColor }}></span>
                Architectural Analysis
              </h3>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="prose prose-invert prose-sm"
                >
                  {activeImage ? (
                    <p className="text-sm md:text-[15px] leading-relaxed text-white/70 font-light">
                      {activeImage.explanation}
                    </p>
                  ) : (
                    <p className="text-sm leading-relaxed text-white/30 font-mono">
                      Visual diagnostic data not found for this segment.
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer / CTA */}
          {project.link && (
            <div className="p-8 lg:p-12 border-t border-white/5 bg-black/20 mt-auto">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between w-full p-4 border border-white/10 rounded hover:bg-white/5 transition-colors"
              >
                <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">
                  Launch Application
                </span>
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${brandColor}20`, color: brandColor }}
                >
                  <Maximize2 size={14} />
                </div>
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}
