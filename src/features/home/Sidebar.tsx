"use client";

import Image from "next/image";
import { Home, FolderGit2, User, Globe, GitBranch, Mail, FileText, Send, Rss } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-[280px] h-screen sticky top-0 p-6 flex flex-col justify-between overflow-y-auto hidden md:flex border-r border-border-subtle bg-background">
      <div className="space-y-10">
        
        {/* Identity */}
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-sm border border-border-subtle flex-shrink-0">
            <Image 
              src="/avatar.jpg" 
              alt="Garvit Bhardwaj" 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="font-semibold text-[17px] leading-tight text-foreground">Garvit Bhardwaj</h1>
            <p className="text-[13px] text-foreground/60 leading-snug">AI & Full-Stack<br/>Engineer</p>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-border-subtle/50 text-foreground font-medium text-[14px] rounded-lg">
            <Home className="w-[18px] h-[18px] opacity-80" strokeWidth={2.5} />
            Home
          </a>
          <a href="#projects" className="flex items-center gap-3 px-3 py-2.5 text-foreground/70 hover:bg-border-subtle/30 font-medium text-[14px] rounded-lg transition-colors">
            <FolderGit2 className="w-[18px] h-[18px] opacity-80" strokeWidth={2.5} />
            Projects
          </a>
          <a href="#about" className="flex items-center gap-3 px-3 py-2.5 text-foreground/70 hover:bg-border-subtle/30 font-medium text-[14px] rounded-lg transition-colors">
            <User className="w-[18px] h-[18px] opacity-80" strokeWidth={2.5} />
            About me
          </a>
        </nav>

        {/* Social Navigation */}
        <div>
          <h3 className="px-3 text-[11px] uppercase tracking-wider font-semibold text-foreground/40 mb-3">Social</h3>
          <nav className="space-y-1">
            <a href="https://www.linkedin.com/in/garvit--bhardwaj" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 text-foreground/70 hover:bg-border-subtle/30 font-medium text-[14px] rounded-lg transition-colors">
              <Globe className="w-[18px] h-[18px] opacity-80" strokeWidth={2.5} />
              LinkedIn
            </a>
            <a href="https://github.com/Garvit-Sharmaa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 text-foreground/70 hover:bg-border-subtle/30 font-medium text-[14px] rounded-lg transition-colors">
              <GitBranch className="w-[18px] h-[18px] opacity-80" strokeWidth={2.5} />
              GitHub
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-foreground/70 hover:bg-border-subtle/30 font-medium text-[14px] rounded-lg transition-colors">
              <Rss className="w-[18px] h-[18px] opacity-80" strokeWidth={2.5} />
              Substack
            </a>
            <a href="mailto:garvitsharmaa015@gmail.com" className="flex items-center gap-3 px-3 py-2 text-foreground/70 hover:bg-border-subtle/30 font-medium text-[14px] rounded-lg transition-colors">
              <Send className="w-[18px] h-[18px] opacity-80" strokeWidth={2.5} />
              Email me!
            </a>
          </nav>
        </div>

      </div>

      {/* Bottom Actions */}
      <div className="space-y-1 pt-6">
        <a href="/resume.pdf" target="_blank" className="flex items-center gap-3 px-3 py-2 text-foreground/70 hover:bg-border-subtle/30 font-medium text-[14px] rounded-lg transition-colors">
          <FileText className="w-[18px] h-[18px] opacity-80" strokeWidth={2.5} />
          Read my CV
        </a>
        <a href="mailto:garvitsharmaa015@gmail.com" className="flex items-center gap-3 px-3 py-2 text-foreground/70 hover:bg-border-subtle/30 font-medium text-[14px] rounded-lg transition-colors">
          <Mail className="w-[18px] h-[18px] opacity-80" strokeWidth={2.5} />
          Contact me
        </a>
      </div>
    </aside>
  );
}
