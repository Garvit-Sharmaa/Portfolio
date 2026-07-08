"use client";
import { motion } from "framer-motion";

const experiences = [
    {
        role: "Senior AI Engineer",
        company: "Acme AI",
        year: "2024 - Present",
        desc: "Led the migration to a microservices architecture, reducing AI inference latency by 40%. Delivered 3 flagship enterprise tools.",
    },
    {
        role: "Full Stack Developer",
        company: "TechNexus",
        year: "2021 - 2024",
        desc: "Built high-performance, SEO-optimized SSR applications reaching 2M+ monthly active users. Integrated machine learning models into web interfaces.",
    }
];

export default function Experience() {
    return (
        <section id="experience" className="py-32 px-6 bg-background relative z-10 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-sm tracking-widest uppercase text-neon-blue mb-16 font-mono">
          // Experience & Proof
                </h2>

                <div className="space-y-16 border-l border-white/10 ml-4 pl-8 md:pl-12">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            className="relative"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                        >
                            {/* Timeline dot */}
                            <div className="absolute w-4 h-4 bg-neon-purple rounded-full -left-[40px] md:-left-[56px] top-1.5 z-10 ring-8 ring-background" />

                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <h3 className="text-3xl font-display font-semibold text-white">{exp.role}</h3>
                                <span className="text-sm font-mono text-neon-blue mt-2 md:mt-0 px-3 py-1 bg-neon-blue/10 rounded-full">{exp.year}</span>
                            </div>
                            <div className="text-xl text-white/50 mb-4">{exp.company}</div>
                            <p className="text-white/70 leading-relaxed text-lg max-w-2xl">
                                {exp.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
