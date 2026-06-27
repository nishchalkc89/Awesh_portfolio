"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Award, MapPin, Calendar, ExternalLink } from "lucide-react";
import { portfolioData } from "@/lib/data";

const { education, certifications } = portfolioData;

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="section-py relative overflow-hidden bg-bg-secondary/30">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-emerald/5 blur-[120px] pointer-events-none" />

      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-accent-emerald" />
            <span className="text-xs font-semibold text-accent-emerald uppercase tracking-widest">Qualifications</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-accent-emerald" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Education &{" "}
            <span className="gradient-text">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading font-semibold text-lg text-text-secondary mb-6 flex items-center gap-2"
            >
              <GraduationCap size={20} className="text-accent-blue" />
              Education
            </motion.h3>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="glass rounded-2xl p-6 border border-white/5 hover:border-accent-blue/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap size={22} className="text-accent-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-semibold text-text-primary text-base">{edu.degree}</h4>
                      <p className="text-accent-blue text-sm font-medium mt-0.5">{edu.field}</p>
                      <p className="text-text-secondary text-sm mt-1">{edu.institution}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                          <Calendar size={11} /> {edu.year}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                          <MapPin size={11} /> {edu.location}
                        </div>
                        {edu.gpa && <div className="text-xs text-accent-emerald">GPA: {edu.gpa}</div>}
                      </div>
                      {edu.description && (
                        <p className="text-text-muted text-xs mt-2 leading-relaxed">{edu.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading font-semibold text-lg text-text-secondary mb-6 flex items-center gap-2"
            >
              <Award size={20} className="text-accent-purple" />
              Certifications
            </motion.h3>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="glass rounded-2xl p-5 border border-white/5 hover:border-accent-purple/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center flex-shrink-0">
                        <Award size={18} className="text-accent-purple" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary text-sm">{cert.name}</h4>
                        <p className="text-text-secondary text-xs mt-0.5">{cert.organization}</p>
                        <p className="text-text-muted text-xs mt-1">{cert.year}</p>
                      </div>
                    </div>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg glass flex items-center justify-center text-text-muted hover:text-white transition-colors"
                      aria-label={`View ${cert.name} credential`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
