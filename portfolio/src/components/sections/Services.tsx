"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Palette, BookOpen, Package, Megaphone, Layers, Camera,
  Clock, ArrowRight, CheckCircle2
} from "lucide-react";
import { usePortfolioData } from "@/lib/PortfolioContext";

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette size={24} />,
  BookOpen: <BookOpen size={24} />,
  Package: <Package size={24} />,
  Megaphone: <Megaphone size={24} />,
  Layers: <Layers size={24} />,
  Camera: <Camera size={24} />,
};

const colorMap: Record<string, string> = {
  blue: "from-blue-500/20 to-blue-600/10 border-blue-500/20 group-hover:border-blue-500/40",
  purple: "from-purple-500/20 to-purple-600/10 border-purple-500/20 group-hover:border-purple-500/40",
  cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/20 group-hover:border-cyan-500/40",
  emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/20 group-hover:border-emerald-500/40",
  pink: "from-pink-500/20 to-pink-600/10 border-pink-500/20 group-hover:border-pink-500/40",
  orange: "from-orange-500/20 to-orange-600/10 border-orange-500/20 group-hover:border-orange-500/40",
};

const iconColorMap: Record<string, string> = {
  blue: "text-blue-400 bg-blue-500/10",
  purple: "text-purple-400 bg-purple-500/10",
  cyan: "text-cyan-400 bg-cyan-500/10",
  emerald: "text-emerald-400 bg-emerald-500/10",
  pink: "text-pink-400 bg-pink-500/10",
  orange: "text-orange-400 bg-orange-500/10",
};

export default function Services() {
  const { services } = usePortfolioData();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section-py relative overflow-hidden bg-bg-secondary/30">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-blue/5 blur-[120px] pointer-events-none" />

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
            <span className="text-xs font-semibold text-accent-blue uppercase tracking-widest">What I Do</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-accent-blue" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Services I <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            From brand systems to packaging to campaign visuals — end-to-end creative services with professional delivery.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className={`group relative rounded-2xl p-6 glass bg-gradient-to-br border transition-colors duration-300 cursor-default ${colorMap[service.color]}`}
            >
              {/* Shimmer overlay on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-shimmer" />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                transition={{ duration: 0.4 }}
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${iconColorMap[service.color]}`}
              >
                {iconMap[service.icon]}
              </motion.div>

              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                {service.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-1.5 mb-6">
                {service.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-text-muted">
                    <CheckCircle2 size={12} className="text-accent-emerald flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div>
                  <div className="text-sm font-semibold text-text-primary">{service.price}</div>
                  <div className="flex items-center gap-1 text-xs text-text-muted mt-0.5">
                    <Clock size={11} />
                    {service.duration}
                  </div>
                </div>
                <motion.button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-text-muted group-hover:text-white group-hover:bg-accent-blue/20 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Enquire about ${service.title}`}
                >
                  <ArrowRight size={15} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-text-muted mb-4">Have a custom project in mind?</p>
          <motion.button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold hover:shadow-glow-blue transition-all duration-300"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Let's Build Something Great
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
