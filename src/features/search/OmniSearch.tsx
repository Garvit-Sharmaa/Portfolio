"use client";

import { useEffect, useState, useMemo } from "react";
import { Command } from "cmdk";
import { useRouter, usePathname } from "next/navigation";
import { Terminal, Search, FolderKanban, FileText, X, Clock, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { search, getAllTechTags } from "@/lib/intelligenceEngine";
import type { Project } from "@/types";

const MAX_RECENT = 5;

export default function OmniSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<{ label: string; href: string }[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  // Track recent pages in sessionStorage
  useEffect(() => {
    if (!pathname) return;
    const label = pathname === "/" ? "Home (Terminal)" : pathname.replace("/projects/", "").replace(/-/g, " ");
    const entry = { label, href: pathname };
    // Use a timeout to defer the setState call out of the effect body
    const timer = setTimeout(() => {
      setRecent((prev) => {
        const filtered = prev.filter((r) => r.href !== pathname);
        return [entry, ...filtered].slice(0, MAX_RECENT);
      });
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Keyboard & custom event handlers
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const handleCustomOpen = () => setOpen(true);

    document.addEventListener("keydown", down);
    window.addEventListener("open-omnisearch", handleCustomOpen);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-omnisearch", handleCustomOpen);
    };
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    setQuery("");
    command();
  };

  // Live Fuse.js search results — recomputed on every keystroke, client-side
  const searchResults: Project[] = useMemo(() => {
    if (!query.trim()) return [];
    return search(query).slice(0, 5);
  }, [query]);

  const techTags = useMemo(() => getAllTechTags().slice(0, 8), []);
  const hasResults = searchResults.length > 0;

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-background/80"
              onClick={() => { setOpen(false); setQuery(""); }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-surface1 border border-border-subtle rounded-xl shadow-2xl overflow-hidden flex flex-col"
            >
              <Command
                className="w-full bg-transparent flex flex-col"
                loop
                shouldFilter={false}
                onKeyDown={(e) => { if (e.key === "Escape") { setOpen(false); setQuery(""); } }}
              >
                {/* Search Input */}
                <div className="flex items-center border-b border-border-subtle px-4">
                  <Search className="w-5 h-5 text-foreground/50 mr-3 shrink-0" strokeWidth={1.5} />
                  <Command.Input
                    value={query}
                    onValueChange={setQuery}
                    className="flex-1 bg-transparent py-4 outline-none text-foreground placeholder:text-foreground/30 font-sans text-sm"
                    placeholder="Search projects, concepts, technologies..."
                    autoFocus
                  />
                  {query && (
                    <button onClick={() => setQuery("")} className="text-foreground/30 hover:text-foreground interactive p-1 rounded-md mr-1">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button onClick={() => { setOpen(false); setQuery(""); }} className="text-foreground/30 hover:text-foreground interactive p-1 rounded-md">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <Command.List className="max-h-[380px] overflow-y-auto p-2 scroll-py-2">
                  <Command.Empty className="py-6 text-center text-sm text-foreground/50 font-mono">
                    No systems found for &ldquo;{query}&rdquo;
                  </Command.Empty>

                  {/* Live Search Results */}
                  {hasResults && (
                    <Command.Group heading="Systems" className="text-xs font-mono text-foreground/50 uppercase tracking-widest px-2 py-3">
                      {searchResults.map((project) => (
                        <Command.Item
                          key={project.id}
                          value={project.slug}
                          onSelect={() => runCommand(() => router.push(`/projects/${project.slug}`))}
                          className="flex items-start gap-3 px-3 py-3 mt-1 text-sm text-foreground/90 rounded-md cursor-pointer aria-selected:bg-surface2 aria-selected:text-teal transition-colors"
                        >
                          <FolderKanban className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.5} />
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium">{project.title}</span>
                            <span className="text-xs text-foreground/40 font-mono truncate">{project.subtitle}</span>
                            <div className="flex gap-1 mt-1 flex-wrap">
                              {project.tech.slice(0, 3).map((t) => (
                                <span key={t} className="px-1.5 py-0.5 bg-teal/10 text-teal/80 rounded text-[10px] font-mono border border-teal/20">{t}</span>
                              ))}
                            </div>
                          </div>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  )}

                  {/* Recent Pages — shown when no query */}
                  {!query && recent.length > 0 && (
                    <Command.Group heading="Recent" className="text-xs font-mono text-foreground/50 uppercase tracking-widest px-2 py-3">
                      {recent.map((r) => (
                        <Command.Item
                          key={r.href}
                          value={`recent-${r.href}`}
                          onSelect={() => runCommand(() => router.push(r.href))}
                          className="flex items-center gap-2 px-3 py-2.5 mt-0.5 text-sm text-foreground/70 rounded-md cursor-pointer aria-selected:bg-surface2 aria-selected:text-teal transition-colors"
                        >
                          <Clock className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                          <span className="capitalize">{r.label}</span>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  )}

                  {/* Tech Tag Quick Filter — shown when no query */}
                  {!query && (
                    <Command.Group heading="Technologies" className="text-xs font-mono text-foreground/50 uppercase tracking-widest px-2 py-3 mt-1">
                      <div className="flex flex-wrap gap-2 px-3 py-2">
                        {techTags.map(({ tag }) => (
                          <button
                            key={tag}
                            onClick={() => setQuery(tag)}
                            className="px-2.5 py-1 text-xs font-mono bg-surface2 border border-border-subtle rounded-md text-foreground/60 hover:border-teal hover:text-teal transition-colors interactive flex items-center gap-1"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </button>
                        ))}
                      </div>
                    </Command.Group>
                  )}

                  {/* Routes — always visible */}
                  {!query && (
                    <Command.Group heading="Routes" className="text-xs font-mono text-foreground/50 uppercase tracking-widest px-2 py-3 mt-1">
                      <Command.Item
                        value="home"
                        onSelect={() => runCommand(() => router.push("/"))}
                        className="flex items-center gap-2 px-3 py-3 mt-1 text-sm text-foreground/90 rounded-md cursor-pointer aria-selected:bg-surface2 aria-selected:text-teal transition-colors"
                      >
                        <Terminal className="w-4 h-4" strokeWidth={1.5} />
                        Home (Terminal)
                      </Command.Item>
                      <Command.Item
                        value="contact"
                        onSelect={() => runCommand(() => router.push("/#contact"))}
                        className="flex items-center gap-2 px-3 py-3 text-sm text-foreground/90 rounded-md cursor-pointer aria-selected:bg-surface2 aria-selected:text-teal transition-colors"
                      >
                        <FileText className="w-4 h-4" strokeWidth={1.5} />
                        Contact & Interview
                      </Command.Item>
                    </Command.Group>
                  )}
                </Command.List>
              </Command>

              {/* Footer Hint Bar */}
              <div className="p-3 bg-surface2 border-t border-border-subtle flex items-center justify-between text-xs text-foreground/40 font-mono">
                <div className="flex gap-4">
                  <span><kbd className="font-sans px-1.5 py-0.5 rounded bg-surface1 border border-border-subtle">↑</kbd> <kbd className="font-sans px-1.5 py-0.5 rounded bg-surface1 border border-border-subtle">↓</kbd> to navigate</span>
                  <span><kbd className="font-sans px-1.5 py-0.5 rounded bg-surface1 border border-border-subtle">Enter</kbd> to select</span>
                </div>
                <span className="text-teal/60">IEE v1.0</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
