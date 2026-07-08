"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skills = [
    { category: "AI & ML", items: ["Python", "PyTorch", "TensorFlow", "LangChain", "OpenAI", "HuggingFace"] },
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "GSAP"] },
    { category: "Backend & Infra", items: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "AWS"] },
];

export default function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;

        const categories = containerRef.current.querySelectorAll('.skill-category');

        categories.forEach((category) => {
            const items = category.querySelectorAll('.skill-item');
            gsap.fromTo(items,
                { opacity: 0, scale: 0.8, y: 20 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    stagger: 0.05,
                    duration: 0.6,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: category,
                        start: "top 85%",
                    }
                }
            );
        });
    }, []);

    return (
        <section id="skills" className="py-32 px-6 bg-background relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto" ref={containerRef}>
                <h2 className="text-sm tracking-widest uppercase text-neon-blue mb-16 font-mono">
          // Arsenal
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {skills.map((category) => (
                        <div key={category.category} className="skill-category">
                            <h3 className="text-xl font-display font-medium text-white mb-8 border-b border-white/10 pb-4">{category.category}</h3>
                            <div className="flex flex-wrap gap-3">
                                {category.items.map((item) => (
                                    <span
                                        key={item}
                                        className="skill-item px-4 py-2 bg-accent-base border border-white/10 rounded-full text-sm hover:border-neon-purple hover:bg-white/5 transition-all text-white/80 cursor-none interactive"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
