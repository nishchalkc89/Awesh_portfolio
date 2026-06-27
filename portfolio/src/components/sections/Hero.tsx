"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, ArrowRight, Sparkles, MapPin } from "lucide-react";
import { portfolioData } from "@/lib/data";
import { useCounter } from "@/hooks/useCounter";
import Marquee from "@/components/ui/Marquee";

const { personal, social, stats, expertise } = portfolioData;

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  facebook: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  youtube: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  github: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  ),
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const scrollTo = (id: string) =>
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

function StatCard({ stat }: { stat: { label: string; value: number; suffix: string } }) {
  const { count, ref } = useCounter(stat.value, 1600);
  return (
    <div
      ref={ref}
      className="glass rounded-xl p-3 sm:p-4 border border-white/5 text-center hover:border-accent-blue/20 transition-all duration-300 group"
    >
      <div className="text-xl sm:text-2xl font-heading font-bold gradient-text-animated">
        {count}{stat.suffix}
      </div>
      <div className="text-xs text-text-muted mt-0.5 leading-tight">{stat.label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" aria-label="Hero">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container relative z-10 pt-24 pb-20 sm:pt-28 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: Text */}
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            {/* Availability badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-emerald/25 text-sm"
                whileHover={{ scale: 1.03 }}
              >
                <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                <span className="text-accent-emerald font-semibold">Available for projects</span>
                <span className="text-text-muted hidden sm:inline">· Booking from {personal.availableFrom}</span>
              </motion.div>
            </motion.div>

            {/* Location */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
              <MapPin size={14} className="text-text-muted" />
              <span className="text-text-muted text-sm">{personal.location}</span>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants} className="mb-5">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold leading-none tracking-tight mb-1">
                <span className="text-text-primary">Md. </span>
                <span className="gradient-text-animated">Awesh</span>
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold leading-none tracking-tight">
                <span className="text-text-secondary">Shekh</span>
                <span className="text-accent-blue">.</span>
              </h1>
            </motion.div>

            {/* Tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-4">
              {expertise.slice(0, 5).map((exp, i) => (
                <motion.span
                  key={exp}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.07, type: "spring", stiffness: 200 }}
                  className="px-3 py-1 rounded-full text-xs font-medium glass text-text-secondary border border-white/8 hover:border-accent-blue/30 hover:text-accent-blue transition-all duration-200"
                >
                  {exp}
                </motion.span>
              ))}
            </motion.div>

            {/* Tagline */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-text-secondary leading-relaxed mb-7 max-w-xl">
              <span className="text-text-primary font-medium italic">"{personal.tagline}"</span>{" "}
              {personal.bio.split(".")[0]}.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-8">
              <motion.button
                onClick={() => scrollTo("#contact")}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm shadow-glow-blue hover:shadow-glow-purple transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Sparkles size={14} />
                Hire Me
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={() => scrollTo("#projects")}
                className="flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10 text-text-primary font-semibold text-sm hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                View Work <ArrowRight size={13} />
              </motion.button>
              <motion.a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/8 text-text-muted font-semibold text-sm hover:text-white hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={13} />
                Resume
              </motion.a>
            </motion.div>

            {/* Stats with counter animation */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </motion.div>

            {/* Social */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 mt-6">
              <span className="text-xs text-text-muted uppercase tracking-widest hidden sm:block">Connect</span>
              <div className="hidden sm:block w-8 h-px bg-white/10" />
              <div className="flex gap-2">
                {social.map((s) => (
                  <motion.a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-9 h-9 rounded-xl glass flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent-blue/15 transition-all duration-200"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {socialIcons[s.icon]}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Profile Photo — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex justify-center items-center"
          >
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 blur-3xl pointer-events-none rounded-3xl"
            />

            <motion.div
              whileHover={{ scale: 1.02, rotateY: 3 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-full max-w-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-border-glow bg-gradient-to-br from-accent-blue/10 via-bg-secondary to-accent-purple/10"
              style={{ height: "520px" }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-9xl font-heading font-bold gradient-text select-none opacity-20">AS</div>
              <Image
                src="/1.png"
                alt="Md. Awesh Shekh — Creative Designer"
                fill
                className="object-cover object-top"
                priority
                loading="eager"
                sizes="420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl px-4 py-3 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-heading font-bold text-text-primary">{personal.name}</div>
                    <div className="text-xs text-accent-blue">{personal.title}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                    <span className="text-xs text-accent-emerald font-medium">Available</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-3 glass rounded-2xl px-4 py-3 border border-accent-blue/20 shadow-glow-blue"
            >
              <div className="text-2xl font-heading font-bold gradient-text">{personal.projectsCompleted}+</div>
              <div className="text-xs text-text-muted">Projects Done</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-3 -left-3 glass rounded-2xl px-4 py-3 border border-accent-purple/20 shadow-glow-purple"
            >
              <div className="text-2xl font-heading font-bold gradient-text">{personal.happyClients}+</div>
              <div className="text-xs text-text-muted">Happy Clients</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile photo — shown BELOW text on small screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex lg:hidden justify-center mt-8"
        >
          <div
            className="relative w-full max-w-[280px] sm:max-w-[320px] rounded-3xl overflow-hidden border border-white/10 shadow-xl bg-gradient-to-br from-accent-blue/10 via-bg-secondary to-accent-purple/10"
            style={{ height: "340px" }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-7xl font-heading font-bold gradient-text select-none opacity-20">AS</div>
            <Image
              src="/1.png"
              alt="Md. Awesh Shekh"
              fill
              className="object-cover object-top"
              priority
              loading="eager"
              sizes="(max-width: 640px) 280px, 320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 glass rounded-xl px-3 py-2 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-text-primary">{personal.name}</span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
                  <span className="text-xs text-accent-emerald">Available</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Skills marquee strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-gradient-to-r from-bg-primary via-bg-secondary/60 to-bg-primary py-3">
        <Marquee
          items={[...portfolioData.expertise, "Adobe Suite", "Figma", "Blender", "After Effects", "Typography", "Brand Strategy"]}
          speed={40}
          className="opacity-60 hover:opacity-100 transition-opacity duration-500"
        />
      </div>
    </section>
  );
}
