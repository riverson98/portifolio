"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";

function GithubIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const contacts = [
  {
    icon: Mail,
    label: "E-mail",
    value: "riversonvicente@gmail.com",
    href: "mailto:riversonvicente@gmail.com",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    hoverBorder: "hover:border-violet-500/50",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/riverson98",
    href: "https://github.com/riverson98",
    color: "text-slate-300",
    bg: "bg-slate-500/10 border-slate-500/20",
    hoverBorder: "hover:border-slate-400/50",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "riverson-vicente-196300218",
    href: "https://www.linkedin.com/in/riverson-vicente-196300218",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    hoverBorder: "hover:border-cyan-500/50",
  },
];

export default function Contact() {
  return (
    <section id="contato" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-violet-400 tracking-widest uppercase mb-3 block">
            Vamos conversar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Entre em <span className="gradient-text">contato</span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Estou sempre aberto a novas oportunidades e projetos interessantes.
            Vamos construir algo incrível juntos?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`gradient-border p-6 border text-center card-hover block ${c.hoverBorder}`}
              style={{ borderColor: "rgba(255,255,255,0.08)", borderWidth: "1px" }}
            >
              <div
                className={`w-12 h-12 rounded-xl border ${c.bg} flex items-center justify-center mx-auto mb-4`}
              >
                <c.icon className={c.color} size={22} />
              </div>
              <p className="text-white font-semibold text-sm mb-1">{c.label}</p>
              <p className="text-slate-500 text-xs break-all">{c.value}</p>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <a
            href="mailto:riversonvicente@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)",
              boxShadow: "0 10px 40px rgba(124,58,237,0.4)",
            }}
          >
            <Send size={18} />
            Enviar mensagem
          </a>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mt-10 text-slate-500 text-sm"
        >
          <MapPin size={14} />
          <span>Itajaí, Santa Catarina, Brasil</span>
        </motion.div>
      </div>
    </section>
  );
}
