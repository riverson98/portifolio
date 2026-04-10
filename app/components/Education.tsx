"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    institution: "EBAC – Escola Britânica de Artes Criativas e Tecnologia",
    degree: "Bacharelado, Java Back End",
    period: "Mai 2022 – Jan 2024",
  },
  {
    institution: "Digital Innovation One Inc.",
    degree: "Tecnologia da Informação",
    period: "Set 2021",
  },
  {
    institution: "EBAC – Escola Britânica de Artes Criativas e Tecnologia",
    degree: "Back End Java",
    period: "",
  },
];

const certifications = [
  {
    title: "Reactive Microservices with Spring WebFlux",
    issuer: "Certificação",
  },
  {
    title: "FullStack JS – EDUZZ DIO",
    issuer: "Digital Innovation One",
  },
];

export default function Education() {
  return (
    <section id="formacao" className="py-24 bg-[#0a0a14]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-3 block">
            Formação
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Educação &{" "}
            <span className="gradient-text">Certificações</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="text-cyan-400" size={22} />
              <h3 className="text-white font-bold text-xl">
                Formação Acadêmica
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              {education.map((ed, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="gradient-border p-5 border card-hover"
                  style={{
                    borderColor: "rgba(6,182,212,0.2)",
                    borderWidth: "1px",
                  }}
                >
                  <p className="text-white font-semibold text-sm mb-1">
                    {ed.degree}
                  </p>
                  <p className="text-cyan-400 text-sm mb-1">{ed.institution}</p>
                  {ed.period && (
                    <p className="text-slate-500 text-xs">{ed.period}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Award className="text-amber-400" size={22} />
              <h3 className="text-white font-bold text-xl">Certificações</h3>
            </div>
            <div className="flex flex-col gap-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="gradient-border p-5 border card-hover"
                  style={{
                    borderColor: "rgba(245,158,11,0.2)",
                    borderWidth: "1px",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Award size={16} className="text-amber-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">
                        {cert.title}
                      </p>
                      <p className="text-amber-400/70 text-xs">{cert.issuer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
