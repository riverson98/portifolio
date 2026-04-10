"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Shield, Crown } from "lucide-react";

const highlights = [
  {
    icon: Calendar,
    label: "4 anos de experiência",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: Shield,
    label: "Security First mindset",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: MapPin,
    label: "Itajaí, Santa Catarina",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Crown,
    label: "Estrategista & Xadrezista",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
];

export default function About() {
  return (
    <section id="sobre" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-violet-400 tracking-widest uppercase mb-3 block">
            Quem sou eu
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Sobre <span className="gradient-text">mim</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-slate-400 text-base leading-relaxed mb-5">
              Sou um{" "}
              <strong className="text-white">
                Engenheiro de Software Fullstack
              </strong>{" "}
              com sólida base no ecossistema <strong className="text-violet-300">.NET (C#)</strong>, atuando
              ativamente na manutenção e evolução de sistemas complexos.
            </p>
            <p className="text-slate-400 text-base leading-relaxed mb-5">
              Movido pela modernização, expandi meu domínio para o ecossistema{" "}
              <strong className="text-cyan-300">TypeScript</strong>, especializando-me em{" "}
              <strong className="text-white">NestJS</strong> para backends performáticos e{" "}
              <strong className="text-white">React/Angular</strong> para interfaces dinâmicas.
            </p>
            <p className="text-slate-400 text-base leading-relaxed mb-5">
              Atualmente lidero projetos críticos de{" "}
              <strong className="text-amber-300">modernização de sistemas legados</strong> e migração
              massiva de dados (ETL), garantindo a integridade da informação e a
              continuidade do negócio durante transições arquiteturais complexas.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed italic">
              "Não sou apenas um escritor de código — sou focado na longevidade do software."
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`gradient-border p-5 border card-hover cursor-default ${item.bg}`}
                style={{ borderWidth: "1px" }}
              >
                <item.icon className={`${item.color} mb-3`} size={24} />
                <p className="text-sm text-slate-300 font-medium leading-snug">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
