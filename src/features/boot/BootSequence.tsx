"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const BOOT_LOGS = [
  "INIT_KERNEL_V_4.2.0...",
  "ALLOCATING_MEMORY_BLOCKS...",
  "MOUNTING_VIRTUAL_FILESYSTEM... OK",
  "LOADING_PROJECT_AURA_DAEMON...",
  "CONNECTING_TO_GRAPH_DB... SUCCESS",
  "INDEXING_VECTORS... 439 NODES FOUND",
  "ESTABLISHING_NEURAL_LINK...",
  "BYPASSING_SECURITY_PROTOCOLS... OVERRIDE",
  "ACCESS_GRANTED. BOOT_COMPLETE."
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsBooting(false);
      return;
    }

    if (currentLine < BOOT_LOGS.length) {
      // Very fast, intense typing speed (Accelerated for 90-Second Rule)
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, Math.random() * 40 + 15);
      return () => clearTimeout(timer);
    } else {
      // Hold on the final line for a beat, then complete
      const finishTimer = setTimeout(() => {
        setIsBooting(false);
      }, 200);
      return () => clearTimeout(finishTimer);
    }
  }, [currentLine]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isBooting && (
        <motion.div
          key="boot-sequence"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: "blur(10px)",
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-50 bg-background flex flex-col justify-end p-8 md:p-16 overflow-hidden pointer-events-none"
        >
          {/* Subtle grid lines in background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

          <div className="relative z-10 space-y-1 font-mono text-xs md:text-sm tracking-widest uppercase">
            {BOOT_LOGS.slice(0, currentLine).map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1 }}
                className={`${i === BOOT_LOGS.length - 1 ? "text-industrial-orange font-bold" : "text-foreground/70"}`}
              >
                {">"} {log}
              </motion.div>
            ))}
            {currentLine < BOOT_LOGS.length && (
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.4 }}
                className="w-3 h-4 bg-industrial-orange mt-1"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
