"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We start with a deep-dive conversation about your brand, goals, audience, and competitive landscape. This shapes everything that follows.",
    details: ["Brand audit", "Competitor research", "Goal alignment", "Creative brief"],
    color: "accent-blue",
  },
  {
    number: "02",
    title: "Explore",
    description:
      "I explore multiple creative directions — moodboards, sketches, and concepts — to find the visual language that fits your brand best.",
    details: ["Moodboarding", "Concept sketches", "Direction reviews", "Style exploration"],
    color: "accent-purple",
  },
  {
    number: "03",
    title: "Refine",
    description:
      "The strongest concept is developed into polished, production-ready designs through focused rounds of feedback and iteration.",
    details: ["Design development", "Revision rounds", "Feedback integration", "Final polish"],
    color: "accent-cyan",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "You receive organised, ready-to-use files with a handoff guide — everything you need to launch with confidence across every platform.",
    details: ["File packaging", "Usage guidelines", "Format exports", "Launch support"],
    color: "accent-emerald",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="section-py relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none" />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-accent-purple" />
            <span className="text-xs font-semibold text-accent-purple uppercase tracking-widest">How I Work</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-accent-purple" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            The <span className="gradient-text">Process</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A clear, collaborative workflow designed to deliver great work on time — from the first brief to the final handoff.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, type: "spring", stiffness: 100 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="relative group cursor-default"
            >
              {/* Animated connector (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(100%+4px)] right-0 h-px z-10" style={{ width: "calc(100% - 8px)" }}>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                    style={{ transformOrigin: "left" }}
                    className="h-full bg-gradient-to-r from-white/20 to-white/5"
                  />
                </div>
              )}

              <div className={`glass rounded-2xl p-6 border border-white/6 group-hover:border-${step.color}/30 transition-all duration-300 h-full flex flex-col group-hover:shadow-lg`}>
                {/* Animated number badge */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-${step.color}/10 border border-${step.color}/20 mb-5 group-hover:bg-${step.color}/20 transition-colors duration-300`}
                >
                  <span className={`text-lg font-heading font-bold text-${step.color}`}>{step.number}</span>
                </motion.div>

                <h3 className="text-xl font-heading font-bold text-text-primary mb-3 group-hover:gradient-text transition-all">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">{step.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {step.details.map((d) => (
                    <motion.span
                      key={d}
                      whileHover={{ scale: 1.05 }}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white/4 border border-white/6 text-text-muted hover:text-text-secondary hover:border-white/12 transition-all duration-200"
                    >
                      {d}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
