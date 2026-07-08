"use client";

import { motion } from "framer-motion";
import { 
  Clock, Navigation, Calendar, Mail, Phone, MapPin, Briefcase, 
  Handshake, Users, Lock, Send, ArrowRight, Download, ArrowUpRight
} from "lucide-react";
import { SiGithub, SiX, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

export default function CinematicContact() {
  return (
    <motion.div
      key="contact-view"
      initial={{ opacity: 0, x: 20, filter: "blur(2px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: 40, filter: "blur(4px)" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute inset-0 w-full overflow-y-auto overflow-x-hidden text-white pointer-events-auto"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col" style={{ paddingLeft: "44px", paddingRight: "44px" }}>
        
        {/* Readability Backdrop for right column to ensure text pops off the portrait */}
        <div 
          className="absolute inset-0 pointer-events-none z-0" 
          style={{
            background: "radial-gradient(circle at 75% center, rgba(0,0,0,0.6) 0%, transparent 60%)",
            margin: "-100px -40px",
            filter: "blur(40px)",
          }}
        />

        {/* ─── MAIN TWO-COLUMN SPLIT ────────────────────────────────────────────── */}
        <div className="flex flex-col xl:flex-row gap-16 lg:gap-24 relative z-10">
          
          {/* ─── LEFT COLUMN: INTRO & FORM ────────────────────────────────────────── */}
          <div className="xl:w-[55%] flex flex-col">
            <p style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#E53E3E", marginBottom: "16px",
            }}>
              CONTACT
            </p>
            <h2 style={{
              fontSize: "clamp(42px, 5vw, 64px)", fontWeight: 800,
              lineHeight: 1.05, letterSpacing: "-0.02em", color: "#ffffff",
              margin: "0 0 24px 0",
            }}>
              Let's Build<br />
              Something Impactful<span style={{ color: "#E53E3E" }}>.</span>
            </h2>
            <p style={{
              fontSize: "15px", fontWeight: 400, lineHeight: 1.65,
              color: "rgba(255,255,255,0.6)", maxWidth: "440px",
              marginBottom: "32px"
            }}>
              I'm always open to discussing new ideas, interesting projects, 
              or opportunities to be part of your vision.
            </p>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-4 mb-12">
              <div className="flex items-center gap-3 px-4 py-3 rounded border border-white/5 bg-white/[0.02]">
                <Clock size={14} className="text-white/40" />
                <div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>Response Time</div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Within 24 hours</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded border border-white/5 bg-white/[0.02]">
                <Navigation size={14} className="text-[#E53E3E]" />
                <div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>Availability</div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Open for opportunities</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded border border-white/5 bg-white/[0.02]">
                <Calendar size={14} className="text-white/40" />
                <div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>Let's Connect</div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Say hello!</div>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="border border-white/5 bg-black/40 backdrop-blur-md rounded-xl p-8 shadow-2xl">
              <form 
                className="flex flex-col gap-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name') as string;
                  const email = formData.get('email') as string;
                  const subject = formData.get('subject') as string;
                  const message = formData.get('message') as string;

                  const text = `Hi Garvit, I'm ${name} (${email}).\n\nSubject: ${subject}\n\n${message}`;
                  const encodedText = encodeURIComponent(text);
                  window.open(`https://wa.me/919979172273?text=${encodedText}`, '_blank');
                }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Your Name" 
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="Your Email" 
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <input 
                  type="text" 
                  name="subject"
                  required
                  placeholder="Subject" 
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
                <textarea 
                  name="message"
                  required
                  placeholder="Your Message" 
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                  <button 
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-white/10 bg-transparent hover:bg-white/5 hover:border-white/30 transition-all rounded text-[11px] font-bold tracking-[0.15em] text-white"
                  >
                    SEND WHATSAPP MESSAGE <ArrowUpRight size={14} className="text-[#E53E3E]" />
                  </button>
                  <div className="flex items-center gap-2 text-[10px] text-white/40">
                    <Lock size={12} />
                    Your information is secure and will never be shared.
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: INFO & CARDS ───────────────────────────────────────── */}
          <div className="xl:w-[45%] flex flex-col pt-2 xl:pt-16">
            
            <p style={{
              fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "24px",
            }}>
              GET IN TOUCH
            </p>

            {/* Info List */}
            <div className="flex flex-col gap-6 mb-12">
              <div className="flex items-start gap-4 pb-6 border-b border-white/5">
                <Mail size={18} className="text-[#E53E3E] mt-1" />
                <div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "2px" }}>Email</div>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#fff", marginBottom: "4px" }}>garvitsharma015@gmail.com</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>Best for detailed inquiries</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 pb-6 border-b border-white/5">
                <Phone size={18} className="text-[#E53E3E] mt-1" />
                <div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "2px" }}>Phone</div>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#fff", marginBottom: "4px" }}>+91 99791 72273</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>Mon - Sat, 10AM - 6PM IST</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 pb-6 border-b border-white/5">
                <MapPin size={18} className="text-[#E53E3E] mt-1" />
                <div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "2px" }}>Location</div>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#fff", marginBottom: "4px" }}>Surat, India</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>Available for remote work</div>
                </div>
              </div>
              
              <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/5 group cursor-pointer">
                <div className="flex items-start gap-4">
                  <Briefcase size={18} className="text-[#E53E3E] mt-1" />
                  <div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "2px" }}>Schedule a Call</div>
                    <div style={{ fontSize: "13px", fontWeight: 500, color: "#fff", marginBottom: "4px" }}>Book a 30min call with me</div>
                    <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>Let's discuss your project</div>
                  </div>
                </div>
                <ArrowRight size={16} className="text-white/20 group-hover:text-[#E53E3E] transition-colors mt-2" />
              </div>
            </div>

            {/* Action Cards */}
            <div className="flex flex-col gap-4">
              <div className="border border-white/5 bg-black/40 backdrop-blur-md rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Handshake size={16} className="text-[#E53E3E]" />
                  <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", color: "#fff" }}>LET'S WORK TOGETHER</span>
                </div>
                <p style={{ fontSize: "13px", lineHeight: 1.6, color: "rgba(255,255,255,0.5)", marginBottom: "16px" }}>
                  I'm currently open to full-time roles, freelance projects, and interesting collaborations.
                </p>
                <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.1em] text-[#E53E3E] cursor-pointer hover:text-white transition-colors">
                  VIEW AVAILABILITY <Download size={10} />
                </div>
              </div>

              <div className="border border-white/5 bg-black/40 backdrop-blur-md rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users size={16} className="text-[#E53E3E]" />
                  <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", color: "#fff" }}>PREFER SOCIAL?</span>
                </div>
                <p style={{ fontSize: "13px", lineHeight: 1.6, color: "rgba(255,255,255,0.5)", marginBottom: "16px" }}>
                  Feel free to reach out to me on any of these platforms.
                </p>
                <div className="flex items-center gap-6 text-white/40">
                  <SiGithub size={16} className="hover:text-white cursor-pointer transition-colors" />
                  <FaLinkedin size={16} className="hover:text-white cursor-pointer transition-colors" />
                  <SiX size={16} className="hover:text-white cursor-pointer transition-colors" />
                  <SiLeetcode size={16} className="hover:text-white cursor-pointer transition-colors" />
                  <Mail size={16} className="hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ─── BOTTOM BANNER ────────────────────────────────────────────────────── */}
        <div className="mt-16 w-full border border-white/5 bg-black/40 backdrop-blur-md rounded-xl p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10 shadow-2xl">
          <div className="flex items-center gap-4">
            <Send size={24} className="text-[#E53E3E]" />
            <div>
              <div style={{ fontSize: "13px", fontWeight: 500, color: "#fff", marginBottom: "2px" }}>Available for exciting opportunities</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Open to full-time, freelance & collaboration</div>
            </div>
          </div>
          <a 
            href="https://wa.me/919979172273"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[10px] font-bold tracking-[0.15em] text-white/70 hover:text-white cursor-pointer transition-colors"
          >
            LET'S CONNECT ON WHATSAPP <ArrowRight size={12} className="text-[#E53E3E]" />
          </a>
        </div>

      </div>
    </motion.div>
  );
}
