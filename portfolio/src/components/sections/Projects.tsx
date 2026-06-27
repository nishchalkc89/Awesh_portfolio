"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, Calendar, User, Star } from "lucide-react";
import Image from "next/image";
import { usePortfolioData } from "@/lib/PortfolioContext";

const colorPalette = [
  "from-blue-500/20 to-blue-800/10",
  "from-purple-500/20 to-purple-800/10",
  "from-cyan-500/20 to-cyan-800/10",
  "from-emerald-500/20 to-emerald-800/10",
  "from-pink-500/20 to-pink-800/10",
  "from-orange-500/20 to-orange-800/10",
];

export default function Projects() {
  const { projects } = usePortfolioData();
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-py relative overflow-hidden bg-bg-secondary/30">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent-blue/4 blur-[120px] pointer-events-none" />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-accent-cyan" />
            <span className="text-xs font-semibold text-accent-cyan uppercase tracking-widest">Portfolio</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-accent-cyan" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Selected <span className="gradient-text">Work</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            A curated selection of projects across brand, editorial, packaging, and campaign design.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-glow-blue"
                  : "glass text-text-secondary border border-white/5 hover:text-white hover:border-white/15"
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative glass rounded-2xl overflow-hidden border border-white/5 hover:border-accent-blue/20 transition-all duration-400 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Image area */}
                <div className={`relative h-52 bg-gradient-to-br ${colorPalette[i % colorPalette.length]} overflow-hidden`}>
                  {/* Project image */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={project.image.startsWith("http")}
                  />
                  {/* Gradient overlay always */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-bg-primary/20 to-transparent" />

                  {project.featured && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-blue/80 border border-accent-blue/50 text-xs text-white font-medium backdrop-blur-sm z-10">
                      <Star size={10} className="fill-current" />
                      Featured
                    </div>
                  )}

                  {/* Hover overlay with buttons */}
                  <div className="absolute inset-0 bg-bg-primary/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-10">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-accent-blue text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-accent-blue/90 transition-colors"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={12} /> View Live
                      </motion.a>
                    )}
                    {project.caseStudyUrl && (
                      <motion.a
                        href={project.caseStudyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl glass border border-white/30 text-white text-xs font-semibold flex items-center gap-1.5"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Case Study →
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-accent-cyan font-medium px-2 py-0.5 rounded bg-accent-cyan/10">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-text-muted">
                      <Calendar size={11} />
                      {project.year}
                    </div>
                  </div>

                  <h3 className="font-heading font-semibold text-lg text-text-primary mb-1 group-hover:gradient-text transition-all duration-300">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-text-muted mb-3">
                    <User size={11} />
                    {project.role}
                    <span className="mx-1">·</span>
                    {project.duration}
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-xs text-text-muted bg-white/4 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-text-muted mb-5">Ready to start your project?</p>
          <motion.button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold hover:shadow-glow-blue transition-all duration-300"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Start Your Project
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
