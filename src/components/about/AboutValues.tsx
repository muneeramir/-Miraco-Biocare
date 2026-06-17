"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { company } from "@/data/company";
import { motion } from "framer-motion";
import { Scale, Award, Cpu, Heart, Trophy, Users, type LucideIcon } from "lucide-react";

// Map core values to icons and glow color presets
const valueMap: Record<string, { icon: LucideIcon; glow: string }> = {
  "Integrity": { icon: Scale, glow: "group-hover:border-blue-500/50 group-hover:shadow-blue-500/10" },
  "Quality": { icon: Award, glow: "group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/10" },
  "Innovation": { icon: Cpu, glow: "group-hover:border-purple-500/50 group-hover:shadow-purple-500/10" },
  "Customer Focus": { icon: Heart, glow: "group-hover:border-rose-500/50 group-hover:shadow-rose-500/10" },
  "Excellence": { icon: Trophy, glow: "group-hover:border-amber-500/50 group-hover:shadow-amber-500/10" },
  "Collaboration": { icon: Users, glow: "group-hover:border-indigo-500/50 group-hover:shadow-indigo-500/10" },
};

export function AboutValues() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
      },
    },
  };

  return (
    <section className="section-padding bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Dynamic blurred blobs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-secondary/5 dark:bg-brand-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Our Values"
          title="Core Values"
          description="The principles that guide everything we do in medical diagnostics, pharmaceutical supplies, and research."
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8"
        >
          {company.values.map((value) => {
            const config = valueMap[value.title] || { icon: Award, glow: "" };
            const Icon = config.icon;

            return (
              <motion.div
                key={value.title}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className={`premium-glow-card group rounded-2xl p-6 transition-all duration-300 ${config.glow}`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon Container */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-light dark:bg-slate-900 border border-brand-border/60 dark:border-white/5 text-brand-primary dark:text-brand-accent transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  {/* Value Text */}
                  <div>
                    <h3 className="mb-2 font-bold text-slate-800 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
