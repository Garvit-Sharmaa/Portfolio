import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-error/5 via-background to-background pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-surface1 border border-border-subtle rounded-lg overflow-hidden shadow-2xl flex flex-col">
          {/* Terminal Header */}
          <div className="w-full h-10 bg-surface2 border-b border-border-subtle flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-error/80" />
            <div className="w-3 h-3 rounded-full bg-warning/80" />
            <div className="w-3 h-3 rounded-full bg-success/80" />
            <div className="ml-4 text-xs font-mono text-foreground/40 flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              error — 404
            </div>
          </div>
          
          {/* Terminal Body */}
          <div className="p-8 font-mono text-sm leading-relaxed whitespace-pre-wrap">
            <p className="text-error mb-4">
              <span className="font-bold">[404] Node not found.</span>
            </p>
            <p className="text-foreground/70 mb-8">
              The requested route has been deprecated or moved.<br />
              Please check the path or return to root.
            </p>
            
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-teal hover:text-white transition-colors focus:ring-2 focus:ring-teal focus:outline-none rounded interactive"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> 
              return to /home;
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
