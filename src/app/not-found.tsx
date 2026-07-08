'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center z-10"
      >
        <div className="text-[120px] md:text-[200px] font-bold font-sans text-white/5 leading-none tracking-tighter select-none">
          404
        </div>
        <div className="text-center -mt-8 md:-mt-12 space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            System Route Not Found
          </h1>
          <p className="text-white/40 text-sm md:text-base max-w-md mx-auto font-mono">
            The requested module could not be located in the production environment.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded text-xs font-semibold tracking-[0.2em] uppercase transition-colors border border-white/10"
          >
            Initialize Reboot
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
