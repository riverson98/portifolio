"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    company: "Qualyteam Gestão da Qualidade",
    role: "Desenvolvedor de Software",
    period: "Jul 2023 – Presente",
    duration: "2 anos 10 meses",
    location: "Balneário Camboriú, SC",
    current: true,
    tags: ["C# .NET", "React", "TypeScript", "Clean Arch", "Docker"],
    description:
      "Atuação no desenvolvimento e manutenção de sistemas de gestão da qualidade. Liderança em projetos de modernização de sistemas legados e migração massiva de dados (ETL), garantindo integridade e continuidade do negócio.",
  },
  {
    company: "Boa Vista",
    role: "Software Engineer",
    period: "Fev 2022 – Ago 2023",
    duration: "1 ano 7 meses",
    location: "Barueri, SP",
    current: false,
    tags: ["Backend", "APIs", "Microsserviços", "SQL"],
    description:
      "Desenvolvimento de soluções de software em uma das maiores empresas de análise de crédito e risco do Brasil. Trabalho com sistemas de alta disponibilidade e performance.",
  },
];

export default function Experience() {
  return (
    <section id="experiencia" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-violet-400 tracking-widest uppercase mb-3 block">
            Trajetória
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Experiência <span className="gradient-text">profissional</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-cyan-500/30 to-transparent hidden md:block" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="md:pl-20 relative"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-5 top-6 w-6 h-6 rounded-full bg-[#07070e] border-2 border-violet-500 items-center justify-center">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      exp.current ? "bg-emerald-400 pulse-dot" : "bg-violet-500"
                    }`}
                  />
                </div>

                <div
                  className="gradient-border p-6 border card-hover"
                  style={{
                    borderColor: "rgba(124,58,237,0.2)",
                    borderWidth: "1px",
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase size={14} className="text-violet-400" />
                        <h3 className="text-white font-bold text-lg">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                            Atual
                          </span>
                        )}
                      </div>
                      <p className="text-violet-300 font-semibold text-sm">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-slate-400 text-sm">{exp.period}</p>
                      <p className="text-slate-600 text-xs">{exp.duration}</p>
                      <p className="text-slate-600 text-xs">{exp.location}</p>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-violet-500/10 text-violet-300 text-xs font-medium border border-violet-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
