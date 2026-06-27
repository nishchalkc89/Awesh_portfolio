"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { usePortfolioData } from "@/lib/PortfolioContext";

export default function Testimonials() {
  const { testimonials } = usePortfolioData();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section id="testimonials" className="section-py relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-accent-purple/6 blur-[120px] pointer-events-none" />

      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-accent-purple" />
            <span className="text-xs font-semibold text-accent-purple uppercase tracking-widest">Client Words</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-accent-purple" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            What Clients <span className="gradient-text">Say</span>
          </h2>
        </motion.div>

        {/* Featured testimonial carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative gradient-border rounded-3xl overflow-hidden">
            <div className="glass rounded-3xl p-8 lg:p-12">
              <Quote size={40} className="text-accent-purple/30 mb-6" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-xl text-text-primary leading-relaxed mb-8 italic">
                    "{testimonials[current].text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold text-lg">
                      {testimonials[current].name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary">{testimonials[current].name}</div>
                      <div className="text-sm text-text-secondary">{testimonials[current].role}, {testimonials[current].company}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(testimonials[current].rating)].map((_, i) => (
                          <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-xs text-text-muted">Project</div>
                      <div className="text-sm text-accent-blue">{testimonials[current].project}</div>
                      <div className="text-xs text-text-muted">{testimonials[current].duration}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.button
              onClick={prev}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-text-secondary hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    current === i
                      ? "w-6 h-2 bg-accent-blue"
                      : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <motion.button
              onClick={next}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-text-secondary hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Mini cards row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className={`p-4 rounded-2xl glass text-left border transition-all duration-300 ${
                current === i ? "border-accent-blue/30 bg-accent-blue/5" : "border-white/5 hover:border-white/15"
              }`}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white text-xs font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-xs font-medium text-text-primary">{t.name}</div>
                  <div className="text-xs text-text-muted">{t.company}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={10} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">"{t.text}"</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
