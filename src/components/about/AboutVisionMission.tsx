"use client";

import { CheckCircle2, Target, Eye } from "lucide-react";
import { company } from "@/data/company";
import { motion } from "framer-motion";

export function AboutVisionMission() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 16,
      },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    },
  };

  return (
    <section className="section-padding bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative vector background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(rgba(0,87,184,0.015)_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(rgba(16,185,129,0.015)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2"
        >
          {/* Mission Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.005 }}
            className="rounded-2xl border border-brand-border/50 dark:border-white/5 bg-brand-light dark:bg-card p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            {/* Corner glowing blur spot */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-primary/10 dark:bg-brand-primary/15 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-accent dark:bg-brand-accent/10">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-extrabold text-brand-primary dark:text-brand-accent">Our Mission</h3>
            </div>

            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 md:text-base">
              {company.mission}
            </p>

            <motion.ul
              variants={listVariants}
              className="mt-6 space-y-3 border-t border-brand-border/40 dark:border-white/5 pt-4"
            >
              {company.missionStatements.map((statement) => (
                <motion.li
                  key={statement}
                  variants={listItemVariants}
                  className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400 group/item"
                >
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-accent transition-transform duration-300 group-hover/item:scale-110" />
                  <span className="transition-colors duration-300 group-hover/item:text-slate-800 dark:group-hover/item:text-white">
                    {statement}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.005 }}
            className="rounded-2xl border border-brand-border/50 dark:border-white/5 bg-brand-light dark:bg-card p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
          >
            {/* Corner glowing blur spot */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-secondary/10 dark:bg-brand-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-secondary/10 text-brand-secondary dark:text-brand-accent dark:bg-brand-accent/10">
                  <Eye className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-extrabold text-brand-primary dark:text-brand-accent">Our Vision</h3>
              </div>

              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 md:text-base">
                {company.vision}
              </p>
            </div>

            {/* Glowing biotech lines visual element in vision card bottom */}
            <div className="mt-8 relative h-16 w-full rounded-xl bg-white/40 dark:bg-slate-900/40 border border-brand-border/20 dark:border-white/5 overflow-hidden p-3 flex items-center justify-center">
              <svg className="w-full h-full text-brand-secondary dark:text-brand-accent opacity-50" viewBox="0 0 100 20" fill="none">
                <motion.path
                  d="M0,10 Q15,0 30,10 T60,10 T90,10 L100,10"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  animate={{
                    d: [
                      "M0,10 Q15,0 30,10 T60,10 T90,10 L100,10",
                      "M0,10 Q15,20 30,10 T60,10 T90,10 L100,10",
                      "M0,10 Q15,0 30,10 T60,10 T90,10 L100,10"
                    ]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.path
                  d="M0,10 Q15,20 30,10 T60,10 T90,10 L100,10"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                  animate={{
                    d: [
                      "M0,10 Q15,20 30,10 T60,10 T90,10 L100,10",
                      "M0,10 Q15,0 30,10 T60,10 T90,10 L100,10",
                      "M0,10 Q15,20 30,10 T60,10 T90,10 L100,10"
                    ]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>
              <span className="absolute text-[8px] font-mono text-slate-400 select-none">VISION_ALIGNMENT_INDEX: OPTIMAL</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
