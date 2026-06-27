"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Star, Briefcase, Camera, Video, Box } from "lucide-react";
import { portfolioData } from "@/lib/data";

const { achievements } = portfolioData;

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy size={22} />,
  Star: <Star size={22} />,
  Briefcase: <Briefcase size={22} />,
  Camera: <Camera size={22} />,
  Video: <Video size={22} />,
  Box: <Box size={22} />,
};

const colors = [
  { bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-400" },
  { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
  { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400" },
  { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400" },
  { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
  { bg: "bg-pink-500/10", border: "border-pink-500/20", text: "text-pink-400" },
];

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="achievements" className="section-py relative overflow-hidden bg-bg-secondary/30">
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-yellow-500/4 blur-[120px] pointer-events-none" />

      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-yellow-500/60" />
            <span className="text-xs font-semibold text-yellow-500 uppercase tracking-widest">Milestones</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-yellow-500/60" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Achievements &{" "}
            <span className="gradient-text-warm">Awards</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Recognition and milestones from years of dedication to the craft.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((item, i) => {
            const color = colors[i % colors.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass rounded-2xl p-6 border ${color.border} ${color.bg} hover:-translate-y-2 hover:shadow-lg transition-all duration-300`}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-11 h-11 rounded-xl glass border ${color.border} flex items-center justify-center mb-4 ${color.text}`}>
                  {iconMap[item.icon] || <Trophy size={22} />}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full glass border ${color.border} ${color.text}`}>
                    {item.year}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-text-primary text-base mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
