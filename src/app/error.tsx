'use client';

import { useEffect } from 'next';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry or Vercel
    console.error('Runtime exception caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(229,62,62,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(229,62,62,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center z-10 p-8 border border-red-500/10 bg-red-950/5 rounded-xl backdrop-blur-sm"
      >
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
          <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
          System Failure Detected
        </h2>
        <p className="text-white/40 text-sm max-w-md text-center font-mono mb-8">
          A runtime exception occurred in the application layer. The error has been logged for analysis.
        </p>
        
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded text-xs font-semibold tracking-[0.2em] uppercase transition-colors border border-red-500/20"
        >
          Attempt Recovery
        </button>
      </motion.div>
    </div>
  );
}
