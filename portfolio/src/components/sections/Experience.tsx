"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";
import { portfolioData } from "@/lib/data";

const { experience } = portfolioData;
const colorAccent: Record<string, string> = {
  blue: "border-blue-500/30 bg-blue-500/5",
  purple: "border-purple-500/30 bg-purple-500/5",
  cyan: "border-cyan-500/30 bg-cyan-500/5",
};
const dotColor: Record<string, string> = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  cyan: "bg-cyan-500",
};

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="section-py relative overflow-hidden">
      <div className="absolute left-0 top-1/3 w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-[100px] pointer-events-none" />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-accent-blue" />
            <span className="text-xs font-semibold text-accent-blue uppercase tracking-widest">Career</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-accent-blue" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            A journey through creative roles that shaped my approach to design and client collaboration.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/50 via-accent-purple/30 to-transparent hidden sm:block" />

          <div className="space-y-6">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="sm:pl-16 relative"
              >
                {/* Timeline dot */}
                <div className={`absolute left-4 top-6 w-4 h-4 rounded-full ${dotColor[exp.color]} border-4 border-bg-primary hidden sm:block shadow-lg`} />

                {/* Card */}
                <div
                  className={`glass rounded-2xl border transition-all duration-300 ${colorAccent[exp.color]} cursor-pointer`}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${dotColor[exp.color]} bg-opacity-15`}>
                          <Briefcase size={18} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading font-semibold text-text-primary text-lg">{exp.role}</h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                            <span className="text-accent-blue font-medium text-sm">{exp.company}</span>
                            <span className="w-1 h-1 rounded-full bg-text-muted hidden sm:block" />
                            <div className="flex items-center gap-1 text-xs text-text-muted">
                              <MapPin size={11} />
                              {exp.location}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="px-3 py-1 rounded-full text-xs font-medium glass border border-white/5 text-text-secondary hidden sm:block">
                          {exp.duration}
                        </span>
                        <motion.div
                          animate={{ rotate: expanded === i ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={18} className="text-text-muted" />
                        </motion.div>
                      </div>
                    </div>
                    <p className="text-sm text-text-muted mt-1 sm:hidden">{exp.duration}</p>
                    <p className="text-text-secondary text-sm mt-3 leading-relaxed">{exp.description}</p>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 border-t border-white/5 pt-4">
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-3">Key Achievements</p>
                          <ul className="space-y-2">
                            {exp.highlights.map((h) => (
                              <li key={h} className="flex items-start gap-2.5 text-sm text-text-secondary">
                                <CheckCircle2 size={14} className="text-accent-emerald flex-shrink-0 mt-0.5" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-14"
        >
          <motion.button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-white/10 text-text-primary font-semibold text-sm hover:border-accent-blue/30 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.04, y: -1 }}
          >
            Work With Me
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
