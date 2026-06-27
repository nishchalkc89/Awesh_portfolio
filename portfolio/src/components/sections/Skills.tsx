"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/lib/data";

const { skills } = portfolioData;

const categories = [
  { key: "design", label: "Design", color: "#3B82F6" },
  { key: "tools", label: "Tools", color: "#8B5CF6" },
  { key: "digital", label: "Digital", color: "#06B6D4" },
  { key: "soft", label: "Soft Skills", color: "#10B981" },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-text-primary">{name}</span>
        <motion.span
          className="text-xs font-mono font-bold"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.4 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, ${color}99, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.2 }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState("design");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const activeCategory = categories.find((c) => c.key === active)!;
  const activeSkills = skills[active as keyof typeof skills];

  return (
    <section id="skills" className="section-py relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-accent-cyan/5 blur-[100px] pointer-events-none" />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-accent-purple" />
            <span className="text-xs font-semibold text-accent-purple uppercase tracking-widest">Expertise</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-accent-purple" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            A diverse toolkit built over years of professional practice across design disciplines.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === cat.key
                  ? "text-white shadow-lg"
                  : "glass text-text-secondary border border-white/5 hover:text-white hover:border-white/15"
              }`}
              style={active === cat.key ? { background: `linear-gradient(135deg, ${cat.color}cc, ${cat.color}88)`, boxShadow: `0 8px 25px ${cat.color}33` } : {}}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-3xl p-8 lg:p-10 border border-white/5">
            <div className="grid sm:grid-cols-2 gap-6">
              {activeSkills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={activeCategory.color}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Summary badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
          {["Adobe Suite", "Figma", "Typography", "Brand Design", "Packaging", "Motion", "3D Modeling", "Print Production"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full glass border border-white/5 text-sm text-text-secondary hover:text-white hover:border-accent-blue/30 transition-all duration-200 cursor-default"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
