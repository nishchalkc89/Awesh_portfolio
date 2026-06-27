"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2, ArrowRight, MessageSquare } from "lucide-react";
import { portfolioData } from "@/lib/data";

const { personal } = portfolioData;

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", budget: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          setForm({ name: "", email: "", subject: "", budget: "", message: "" });
        }, 4000);
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="section-py relative overflow-hidden bg-bg-secondary/30">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-accent-blue/6 blur-[120px] pointer-events-none" />

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
            <span className="text-xs font-semibold text-accent-blue uppercase tracking-widest">Contact</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-accent-blue" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Let's Work{" "}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something great.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info cards */}
            {[
              { icon: Mail, label: "Email", value: personal.email, color: "blue" },
              { icon: Phone, label: "Phone", value: personal.phone, color: "purple" },
              { icon: MapPin, label: "Location", value: personal.location, color: "cyan" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className={`glass rounded-2xl p-5 border border-white/5 hover:border-accent-${color}/20 transition-all duration-300`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl bg-accent-${color}/10 flex items-center justify-center`}>
                    <Icon size={20} className={`text-accent-${color}`} />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-0.5">{label}</div>
                    <div className="text-sm font-medium text-text-primary">{value}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Availability */}
            <div className="glass rounded-2xl p-5 border border-accent-emerald/20 bg-accent-emerald/5">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-emerald animate-pulse" />
                <span className="font-medium text-accent-emerald text-sm">Currently Available</span>
              </div>
              <p className="text-text-secondary text-sm">
                Booking new projects for <span className="text-text-primary font-medium">{personal.availableFrom}</span>.
                Response time: same day.
              </p>
            </div>

            {/* Quick links */}
            <div className="glass rounded-2xl p-5 border border-white/5">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-4">Quick Actions</p>
              <div className="space-y-2">
                <a
                  href={personal.resumeUrl}
                  download
                  className="flex items-center justify-between p-3 rounded-xl bg-white/3 hover:bg-white/6 transition-colors text-sm text-text-secondary hover:text-white"
                >
                  Download Resume
                  <ArrowRight size={14} />
                </a>
                {portfolioData.social.slice(0, 3).map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/3 hover:bg-white/6 transition-colors text-sm text-text-secondary hover:text-white"
                  >
                    {s.name}
                    <ArrowRight size={14} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="gradient-border rounded-3xl overflow-hidden">
              <div className="glass rounded-3xl p-5 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare size={20} className="text-accent-blue" />
                  <h3 className="font-heading font-semibold text-text-primary">Send a Message</h3>
                </div>

                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent-emerald/15 flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} className="text-accent-emerald" />
                    </div>
                    <h4 className="font-heading font-bold text-xl text-text-primary mb-2">Message Sent!</h4>
                    <p className="text-text-secondary text-sm">Thanks for reaching out. I'll get back to you within the same day.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { key: "name", label: "Your Name", placeholder: "Ram Bahadur Shrestha", type: "text" },
                        { key: "email", label: "Email Address", placeholder: "ram@example.com", type: "email" },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="block text-xs text-text-muted mb-1.5 font-medium">{field.label}</label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={form[field.key as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/8 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-accent-blue/50 focus:bg-white/6 transition-all duration-200"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-text-muted mb-1.5 font-medium">Subject</label>
                        <input
                          type="text"
                          placeholder="Brand Identity Project"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/8 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-accent-blue/50 focus:bg-white/6 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-text-muted mb-1.5 font-medium">Budget (NPR / USD)</label>
                        <input
                          type="text"
                          placeholder="e.g. NPR 15,000 or $200"
                          value={form.budget}
                          onChange={(e) => setForm({ ...form, budget: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/8 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-accent-blue/50 focus:bg-white/6 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-text-muted mb-1.5 font-medium">Message</label>
                      <textarea
                        placeholder="Tell me about your project — scope, timeline, budget, goals..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/8 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-accent-blue/50 focus:bg-white/6 transition-all duration-200 resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm hover:shadow-glow-blue transition-all duration-300 disabled:opacity-60"
                      whileHover={status !== "sending" ? { scale: 1.02, y: -1 } : {}}
                      whileTap={{ scale: 0.98 }}
                    >
                      {status === "sending" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Send Message
                        </>
                      )}
                    </motion.button>

                    <p className="text-xs text-text-muted text-center flex items-center justify-center gap-1.5">
                      <Clock size={11} />
                      I typically respond within the same business day.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
