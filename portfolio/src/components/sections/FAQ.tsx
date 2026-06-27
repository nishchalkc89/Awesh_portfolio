"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { portfolioData } from "@/lib/data";

const { faq } = portfolioData;

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-py relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-blue/5 blur-[100px] pointer-events-none" />

      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-accent-blue" />
            <span className="text-xs font-semibold text-accent-blue uppercase tracking-widest">FAQ</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-accent-blue" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Everything you need to know before we work together.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faq.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`glass rounded-2xl border transition-all duration-300 overflow-hidden ${
                open === i ? "border-accent-blue/30" : "border-white/5 hover:border-white/10"
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle size={16} className={`flex-shrink-0 transition-colors ${open === i ? "text-accent-blue" : "text-text-muted"}`} />
                  <span className={`font-medium text-sm transition-colors ${open === i ? "text-text-primary" : "text-text-secondary"}`}>
                    {item.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={16} className="text-text-muted" />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-5 pb-5 text-sm text-text-secondary leading-relaxed border-t border-white/5 pt-3">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
