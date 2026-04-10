"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "Backend",
    color: "violet",
    borderColor: "border-violet-500/30",
    badgeColor: "bg-violet-500/15 text-violet-300 border border-violet-500/20",
    dotColor: "bg-violet-400",
    skills: ["C# / .NET 8", "Web API", "Entity Framework", "NestJS", "Node.js", "Clean Architecture", "DDD", "SOLID"],
  },
  {
    category: "Frontend",
    color: "cyan",
    borderColor: "border-cyan-500/30",
    badgeColor: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/20",
    dotColor: "bg-cyan-400",
    skills: ["React", "Angular", "TypeScript", "Tailwind CSS", "Sass / BEM"],
  },
  {
    category: "Banco de Dados",
    color: "amber",
    borderColor: "border-amber-500/30",
    badgeColor: "bg-amber-500/15 text-amber-300 border border-amber-500/20",
    dotColor: "bg-amber-400",
    skills: ["MySQL 8", "PostgreSQL", "SQL Server", "ETL / Migração"],
  },
  {
    category: "Infra & DevOps",
    color: "emerald",
    borderColor: "border-emerald-500/30",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20",
    dotColor: "bg-emerald-400",
    skills: ["Docker", "Linux", "Git"],
  },
  {
    category: "Segurança",
    color: "rose",
    borderColor: "border-rose-500/30",
    badgeColor: "bg-rose-500/15 text-rose-300 border border-rose-500/20",
    dotColor: "bg-rose-400",
    skills: ["Cibersegurança", "Segurança Defensiva", "Security First"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-[#0a0a14]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-cyan-400 tracking-widest uppercase mb-3 block">
            Tecnologias
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Minha caixa de <span className="gradient-text-cyan">ferramentas</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`gradient-border p-6 border card-hover ${group.borderColor}`}
              style={{ borderWidth: "1px" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2.5 h-2.5 rounded-full ${group.dotColor}`} />
                <h3 className="text-white font-semibold text-sm tracking-wide uppercase">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium ${group.badgeColor}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
