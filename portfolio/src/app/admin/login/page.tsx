"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Sparkles } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080B14] relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-blue/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent-purple/8 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-4"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple mb-4 shadow-glow-blue">
            <Sparkles size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-text-primary">Portfolio CMS</h1>
          <p className="text-text-muted text-sm mt-1">Md. Awesh Shekh · Admin Panel</p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8 border border-white/8">
          <h2 className="text-lg font-heading font-semibold text-text-primary mb-6 flex items-center gap-2">
            <Lock size={18} className="text-accent-blue" />
            Admin Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm text-text-secondary mb-2">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue/50 focus:bg-white/8 transition-all duration-200 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm hover:shadow-glow-blue transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p className="text-center text-xs text-text-muted mt-6">
            Default password: <span className="text-accent-blue font-mono">awesh2025admin</span>
            <br />
            <span className="opacity-60">Set ADMIN_PASSWORD in .env.local to change</span>
          </p>
        </div>

        <p className="text-center text-xs text-text-muted mt-4">
          <a href="/" className="hover:text-text-secondary transition-colors">← Back to Portfolio</a>
        </p>
      </motion.div>
    </div>
  );
}
