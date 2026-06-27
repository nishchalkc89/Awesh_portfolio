"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";
import { Briefcase, MapPin, Clock, CheckCircle2, ArrowRight, Download } from "lucide-react";
import { portfolioData } from "@/lib/data";

const { personal, expertise } = portfolioData;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-py relative overflow-hidden">
      {/* Bg accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none" />

      <div className="container" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-px bg-gradient-to-r from-accent-blue to-accent-purple" />
          <span className="text-xs font-semibold text-accent-blue uppercase tracking-widest">About Me</span>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
          {/* Left — Visual Card (shows after text on mobile via order) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            {/* Main card */}
            <div className="relative gradient-border rounded-3xl overflow-hidden">
              {/* Full-width photo at top */}
              <div className="relative w-full overflow-hidden rounded-t-3xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10" style={{ height: "300px" }}>
                <div className="absolute inset-0 flex items-center justify-center text-8xl font-heading font-bold gradient-text select-none opacity-20">AS</div>
                <Image
                  src="/1.png"
                  alt={personal.name}
                  fill
                  className="object-cover object-top"
                  loading="eager"
                  sizes="500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/70 via-transparent to-transparent" />
              </div>
              <div className="glass rounded-b-3xl p-8 lg:p-10">
                <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">
                  {personal.name}
                </h3>
                <p className="text-accent-blue font-medium mb-6">{personal.title}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <MapPin size={16} className="text-accent-blue flex-shrink-0" />
                    {personal.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <Briefcase size={16} className="text-accent-purple flex-shrink-0" />
                    {personal.yearsExperience}+ years of experience
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <Clock size={16} className="text-accent-cyan flex-shrink-0" />
                    Response time: Same day
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse flex-shrink-0" />
                    <span className="text-accent-emerald font-medium">{personal.availability}</span>
                  </div>
                </div>

                <div className="h-px bg-white/5 mb-6" />

                <div className="flex flex-wrap gap-2">
                  {expertise.slice(0, 6).map((exp) => (
                    <span
                      key={exp}
                      className="px-2.5 py-1 rounded-lg text-xs text-text-secondary glass border border-white/5"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-3 -right-0 sm:-right-4 glass rounded-2xl px-4 py-3 border border-accent-emerald/20"
            >
              <div className="text-xl font-bold gradient-text">{personal.projectsCompleted}+</div>
              <div className="text-xs text-text-muted">Projects Done</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-3 -left-0 sm:-left-4 glass rounded-2xl px-4 py-3 border border-accent-blue/20"
            >
              <div className="text-xl font-bold gradient-text">{personal.happyClients}+</div>
              <div className="text-xs text-text-muted">Happy Clients</div>
            </motion.div>
          </motion.div>

          {/* Right — Content (shows first on mobile) */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="order-1 lg:order-2"
          >
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6 leading-tight">
              Crafting Visual{" "}
              <span className="gradient-text">Experiences</span>{" "}
              That Endure
            </motion.h2>

            <motion.p variants={fadeUp} className="text-text-secondary text-lg leading-relaxed mb-4">
              {personal.bio}
            </motion.p>
            <motion.p variants={fadeUp} className="text-text-secondary leading-relaxed mb-8">
              {personal.longBio}
            </motion.p>

            {/* Key strengths */}
            <motion.div variants={fadeUp} className="space-y-3 mb-8">
              {[
                "End-to-end project delivery from concept to production",
                "Deep understanding of brand strategy and visual communication",
                "Production-ready files across print, digital, and motion",
                "Same-day response time and clear revision process",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 text-sm text-text-secondary">
                  <CheckCircle2 size={16} className="text-accent-emerald flex-shrink-0 mt-0.5" />
                  {point}
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <motion.button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm hover:shadow-glow-blue transition-all duration-300"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Let's Work Together
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10 text-text-secondary font-semibold text-sm hover:border-white/25 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.04, y: -1 }}
              >
                <Download size={14} />
                Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
