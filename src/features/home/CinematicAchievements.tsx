"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Trophy, Star, BrainCircuit } from "lucide-react";
import { useState } from "react";

import { ArrowUpRight } from "lucide-react";

type AchievementProps = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  link?: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  anyHovered: boolean;
};

function AchievementCard({ id, title, issuer, date, description, icon, image, link, isHovered, onHover, onLeave, anyHovered }: AchievementProps) {
  const opacity = anyHovered && !isHovered ? 0.3 : 1;

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="flex flex-col relative"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        paddingTop: "24px",
        paddingBottom: "24px",
        opacity,
        transition: "opacity 0.4s ease, transform 0.4s ease",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "4px",
            backgroundColor: isHovered ? "rgba(229,62,62,0.1)" : "rgba(255,255,255,0.03)",
            color: isHovered ? "#E53E3E" : "rgba(255,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: isHovered ? "#ffffff" : "rgba(255,255,255,0.9)",
                transition: "color 0.3s",
              }}
            >
              {title}
            </h3>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "10px",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              {date}
            </span>
          </div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#E53E3E",
              marginBottom: "12px",
            }}
          >
            {issuer}
          </div>
          <p
            style={{
              fontSize: "13px",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {description}
          </p>

          {/* Render Certificate Image if provided */}
          {image && (
            <div className="mt-6 border border-white/10 rounded-md overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none" />
              <img 
                src={image} 
                alt={`${title} Certificate`} 
                className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-[1.02]" 
              />
            </div>
          )}

          {/* Render Verify Link if provided */}
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 mt-5 text-[10px] text-[#E53E3E] font-bold tracking-widest hover:text-white transition-colors"
            >
              VERIFY CREDENTIAL <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CinematicAchievements() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const achievements = [
    {
      id: "cert-ml-spec",
      title: "Machine Learning Specialization",
      issuer: "DeepLearning.AI & Stanford Online",
      date: "Jun 2026",
      description: "Completed the comprehensive 3-course specialization covering supervised learning, unsupervised learning, recommender systems, and reinforcement learning.",
      icon: <Award size={20} />,
      image: "/certificates/ml-specialization.png",
      link: "https://coursera.org/verify/specialization/EECFJSXMMPH9"
    },
    {
      id: "cert-ml-1",
      title: "Supervised Machine Learning: Regression and Classification",
      issuer: "DeepLearning.AI & Stanford Online",
      date: "Jun 2026",
      description: "Mastered foundational machine learning algorithms including linear regression, logistic regression, and neural networks for classification tasks.",
      icon: <BrainCircuit size={20} />,
      image: "/certificates/supervised-ml.png",
      link: "https://coursera.org/verify/P5FUXMSGMF4G"
    },
    {
      id: "cert-ml-2",
      title: "Advanced Learning Algorithms",
      issuer: "DeepLearning.AI & Stanford Online",
      date: "Jun 2026",
      description: "Deepened knowledge in building and training neural networks, decision trees, random forests, and XGBoost models.",
      icon: <BrainCircuit size={20} />,
      image: "/certificates/advanced-learning.png",
      link: "https://coursera.org/verify/B52RTVG87AAN"
    },
    {
      id: "cert-ml-3",
      title: "Unsupervised Learning, Recommenders, Reinforcement Learning",
      issuer: "DeepLearning.AI & Stanford Online",
      date: "Jun 2026",
      description: "Applied clustering, anomaly detection, deep recommender systems, and reinforcement learning to complex real-world datasets.",
      icon: <BrainCircuit size={20} />,
      image: "/certificates/unsupervised-learning.png",
      link: "https://coursera.org/verify/L05JSIPJ7JLF"
    },
    {
      id: "cert-hackathon",
      title: "Hackathon Winner: Global AI Initiative",
      issuer: "OpenAI & Devpost",
      date: "2023",
      description: "Secured 1st place among 400+ teams by engineering Ad-Astra, a low-latency medical triage system utilizing local LLM inference.",
      icon: <Trophy size={20} />
    }
  ];

  return (
    <motion.div
      key="achievements-view"
      initial={{ opacity: 0, x: 20, filter: "blur(2px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: 40, filter: "blur(4px)" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute inset-0 w-full overflow-y-auto overflow-x-hidden text-white pointer-events-auto"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24" style={{ paddingLeft: "44px", paddingRight: "44px" }}>
        
        {/* ─── LEFT PANE: EDITORIAL INTRO ────────────────────────────────────────── */}
        <div className="lg:w-1/3 lg:sticky lg:top-[120px] lg:self-start">
          <p style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#E53E3E", marginBottom: "16px",
          }}>
            Certifications & Milestones
          </p>
          <h2 style={{
            fontSize: "clamp(42px, 5vw, 56px)", fontWeight: 800,
            lineHeight: 1.05, letterSpacing: "-0.02em", color: "#ffffff",
            margin: "0 0 24px 0",
          }}>
            Continuous<br />
            Validation<span style={{ color: "#E53E3E" }}>.</span>
          </h2>
          <p style={{
            fontSize: "15px", fontWeight: 400, lineHeight: 1.65,
            color: "rgba(255,255,255,0.6)", maxWidth: "320px",
          }}>
            Beyond shipping production code, I actively pursue industry certifications and competitive milestones to rigorously validate architectural knowledge and stay at the absolute edge of modern software engineering.
          </p>
          
          {/* Visual embellishment: blueprint crosshair */}
          <div className="hidden lg:block mt-24" style={{ width: "40px", height: "40px", position: "relative", opacity: 0.2 }}>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white" />
            <div className="absolute top-1/2 left-1/2 w-4 h-4 border border-white transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
          </div>
        </div>

        {/* ─── RIGHT PANE: ACHIEVEMENTS MATRIX ───────────────────────────────────── */}
        <div className="lg:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {achievements.map((item) => (
              <AchievementCard
                key={item.id}
                id={item.id}
                title={item.title}
                issuer={item.issuer}
                date={item.date}
                description={item.description}
                icon={item.icon}
                image={(item as any).image}
                link={(item as any).link}
                isHovered={hoveredId === item.id}
                onHover={() => setHoveredId(item.id)}
                onLeave={() => setHoveredId(null)}
                anyHovered={hoveredId !== null}
              />
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
