"use client";

import { motion } from "framer-motion";
import { Mail, ArrowDown, Code2 } from "lucide-react";

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.15) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-700/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
          Disponível para oportunidades
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-none"
        >
          Riverson{" "}
          <span className="gradient-text">Vicente</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 font-medium mb-6 max-w-2xl mx-auto"
        >
          Software Developer &middot;{" "}
          <span className="text-cyan-400">C# .NET</span> &amp;{" "}
          <span className="text-violet-400">TypeScript</span> &middot; React,
          NestJS &amp; Docker
        </motion.p>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-500 text-base max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Engenheiro de Software Fullstack com 4 anos de experiência focado em{" "}
          <strong className="text-slate-300">Clean Architecture</strong>, DDD e
          SOLID. Especialista em modernização de sistemas legados e migração
          massiva de dados.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <a
            href="#experiencia"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-violet-900/40"
          >
            <Code2 size={18} />
            Ver Experiência
          </a>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-violet-500/50 text-slate-300 hover:text-white font-semibold transition-all duration-200 hover:scale-105"
          >
            <Mail size={18} />
            Falar comigo
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-5"
        >
          <a
            href="https://github.com/riverson98"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-white/10 hover:border-violet-500/50 text-slate-400 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/riverson-vicente-196300218"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-white/10 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-all duration-200 hover:scale-110"
          >
            <LinkedInIcon size={20} />
          </a>
          <a
            href="mailto:riversonvicente@gmail.com"
            className="p-2.5 rounded-lg border border-white/10 hover:border-amber-500/50 text-slate-400 hover:text-amber-400 transition-all duration-200 hover:scale-110"
          >
            <Mail size={20} />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 float-anim"
        >
          <a href="#sobre" className="text-slate-600 hover:text-slate-400 transition-colors">
            <ArrowDown size={22} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
