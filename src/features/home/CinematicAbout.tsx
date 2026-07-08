"use client";

import { motion } from "framer-motion";
import { 
  User, Calendar, MapPin, Mail, Download, 
  Lightbulb, Rocket, Code, Users,
  BookOpen, Headphones, Camera, Tent, Dumbbell, BrainCircuit, Link2
} from "lucide-react";
import {
  SiPython, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiNestjs,
  SiPostgresql, SiMongodb, SiTailwindcss, SiRedis, SiDocker,
  SiGit, SiFigma
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

export default function CinematicAbout() {
  return (
    <motion.div
      key="about-view"
      initial={{ opacity: 0, x: -20, filter: "blur(2px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -40, filter: "blur(4px)" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute inset-0 z-10 w-full overflow-y-auto overflow-x-hidden pointer-events-auto text-white"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col" style={{ paddingLeft: "44px", paddingRight: "44px" }}>
        
        {/* Readability Backdrop to ensure cards stay readable over the portrait */}
        <div 
          className="absolute inset-0 pointer-events-none z-0" 
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
            margin: "200px -40px -120px -40px",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10">
          {/* ─── TOP LEFT INTRO ─────────────────────────────────────────────────── */}
          <div style={{ maxWidth: "560px" }}>
            <p style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#E53E3E", marginBottom: "16px",
            }}>
              ABOUT ME
            </p>
            <h1 style={{
              fontSize: "clamp(36px, 4.5vw, 48px)", fontWeight: 800,
              lineHeight: 1.1, letterSpacing: "-0.02em", color: "#ffffff",
              margin: "0 0 24px 0",
            }}>
              Building intelligent solutions that solve real-world problems<span style={{ color: "#E53E3E" }}>.</span>
            </h1>
            <p style={{
              fontSize: "15px", fontWeight: 400, lineHeight: 1.65,
              color: "rgba(255,255,255,0.65)",
            }}>
              I'm Garvit Sharma (legal name Garvit Bhardwaj), an AI Engineer & Full Stack Developer who 
              loves turning ideas into impactful digital experiences. I enjoy 
              working at the intersection of AI, modern web technologies, 
              and product design.
            </p>
          </div>

          {/* ─── DETAILS BANNER ─────────────────────────────────────────────────── */}
          <div className="mt-12 mb-8 bg-black/40 backdrop-blur-md border border-white/5 rounded-lg p-6 lg:p-8 w-full xl:w-[80%] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <User size={18} className="text-[#E53E3E]" />
              <div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>Name</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>
                  Garvit Sharma <span className="text-white/40 font-normal text-[11px]">(Garvit Bhardwaj)</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/5"></div>
            
            <div className="flex items-center gap-4">
              <Calendar size={18} className="text-[#E53E3E]" />
              <div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>Age</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>21</div>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/5"></div>

            <div className="flex items-center gap-4">
              <MapPin size={18} className="text-[#E53E3E]" />
              <div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>Location</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>Surat, India</div>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/5"></div>

            <div className="flex items-center gap-4">
              <Mail size={18} className="text-[#E53E3E]" />
              <div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>Email</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>garvitsharmaa015@gmail.com</div>
              </div>
            </div>
          </div>

          {/* ─── THREE COLUMN MATRIX ────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* COLUMN 1: My Story */}
            <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-lg p-8 flex flex-col shadow-2xl">
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#fff", marginBottom: "8px" }}>My Story</h3>
              <div style={{ width: "32px", height: "1px", backgroundColor: "#E53E3E", marginBottom: "24px" }} />
              
              <div style={{ fontSize: "12px", lineHeight: 1.8, color: "rgba(255,255,255,0.55)" }} className="flex flex-col gap-6 flex-grow">
                <p>
                  My journey started with curiosity—wondering how things work and 
                  how technology can make life better. That curiosity turned into 
                  a passion for building. Over the years, I've explored AI, full stack 
                  development, and product design, constantly learning and shipping 
                  projects that create real impact.
                </p>
                <p>
                  I believe in writing clean code, designing intuitive experiences, and 
                  solving problems that matter.
                </p>
              </div>

              <button 
                className="mt-8 self-start flex items-center gap-3 px-6 py-3 border border-white/10 hover:border-white/30 hover:bg-white/5 rounded transition-all"
                style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}
              >
                DOWNLOAD RESUME <Download size={12} className="text-[#E53E3E]" />
              </button>
            </div>

            {/* COLUMN 2: What Drives Me */}
            <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-lg p-8 shadow-2xl">
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#fff", marginBottom: "8px" }}>What Drives Me</h3>
              <div style={{ width: "32px", height: "1px", backgroundColor: "#E53E3E", marginBottom: "32px" }} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center">
                    <Lightbulb size={16} className="text-[#E53E3E]" />
                  </div>
                  <h4 style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>Solve Real Problems</h4>
                  <p style={{ fontSize: "11px", lineHeight: 1.6, color: "rgba(255,255,255,0.4)" }}>I focus on building solutions that create real value and make a difference.</p>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center">
                    <Rocket size={16} className="text-[#E53E3E]" />
                  </div>
                  <h4 style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>Ship & Iterate</h4>
                  <p style={{ fontSize: "11px", lineHeight: 1.6, color: "rgba(255,255,255,0.4)" }}>I believe in shipping, learning from feedback, and improving continuously.</p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center">
                    <Code size={16} className="text-[#E53E3E]" />
                  </div>
                  <h4 style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>Clean & Scalable Code</h4>
                  <p style={{ fontSize: "11px", lineHeight: 1.6, color: "rgba(255,255,255,0.4)" }}>I care about writing maintainable, performant, and scalable applications.</p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center">
                    <Users size={16} className="text-[#E53E3E]" />
                  </div>
                  <h4 style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>User First</h4>
                  <p style={{ fontSize: "11px", lineHeight: 1.6, color: "rgba(255,255,255,0.4)" }}>I design and build experiences that are intuitive, accessible, and user-centric.</p>
                </div>
              </div>
            </div>

            {/* COLUMN 3: Tech & Beyond */}
            <div className="flex flex-col gap-6">
              
              {/* Tech Card */}
              <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-lg p-8 shadow-2xl flex-grow">
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#fff", marginBottom: "8px" }}>Tech I Love Working With</h3>
                <div style={{ width: "32px", height: "1px", backgroundColor: "#E53E3E", marginBottom: "24px" }} />
                
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Python", Icon: SiPython },
                    { name: "TypeScript", Icon: SiTypescript },
                    { name: "React", Icon: SiReact },
                    { name: "Next.js", Icon: SiNextdotjs },
                    { name: "Node.js", Icon: SiNodedotjs },
                    { name: "NestJS", Icon: SiNestjs },
                    { name: "PostgreSQL", Icon: SiPostgresql },
                    { name: "MongoDB", Icon: SiMongodb },
                    { name: "Tailwind CSS", Icon: SiTailwindcss },
                    { name: "Redis", Icon: SiRedis },
                    { name: "Docker", Icon: SiDocker },
                    { name: "AWS", Icon: FaAws },
                    { name: "OpenAI", Icon: BrainCircuit },
                    { name: "LangChain", Icon: Link2 },
                    { name: "Git", Icon: SiGit },
                    { name: "Figma", Icon: SiFigma },
                  ].map(tech => (
                    <span 
                      key={tech.name} 
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02]"
                      style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)" }}
                    >
                      <tech.Icon size={10} className="text-[#E53E3E] opacity-70" />
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Beyond Code Card */}
              <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-lg p-8 shadow-2xl">
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#fff", marginBottom: "8px" }}>Beyond Code</h3>
                <div style={{ width: "32px", height: "1px", backgroundColor: "#E53E3E", marginBottom: "24px" }} />
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center gap-2">
                    <BookOpen size={18} className="text-[#E53E3E]" />
                    <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)" }}>Reading</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Headphones size={18} className="text-[#E53E3E]" />
                    <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)" }}>Music</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Camera size={18} className="text-[#E53E3E]" />
                    <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)" }}>Photography</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Tent size={18} className="text-[#E53E3E]" />
                    <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)" }}>Travel</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Dumbbell size={18} className="text-[#E53E3E]" />
                    <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)" }}>Fitness</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
