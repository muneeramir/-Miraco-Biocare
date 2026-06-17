"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { company } from "@/data/company";
import { motion } from "framer-motion";
import {
  HeartHandshake,
  Layers,
  Award,
  Headphones,
  Truck,
  FlaskConical,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";

// Map why choose us items to custom icons and colors
const iconMap: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  "Trusted Industry Partnerships": { icon: HeartHandshake, color: "text-blue-500", bg: "bg-blue-500/10" },
  "Comprehensive Product Portfolio": { icon: Layers, color: "text-purple-500", bg: "bg-purple-500/10" },
  "Technical Expertise and Consultation": { icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
  "Prompt Customer Support": { icon: Headphones, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  "Reliable Supply Chain Management": { icon: Truck, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  "Customized Solutions for Research and Diagnostics": { icon: FlaskConical, color: "text-pink-500", bg: "bg-pink-500/10" },
  "Commitment to Quality and Compliance": { icon: ShieldCheck, color: "text-rose-500", bg: "bg-rose-500/10" },
};

export function AboutWhyChoose() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 85,
        damping: 18,
      },
    },
  };

  return (
    <section className="section-padding bg-brand-light dark:bg-slate-900 border-b border-brand-border/40 dark:border-white/5 relative overflow-hidden">
      {/* Decorative floating grids */}
      <div className="absolute left-0 bottom-1/4 w-36 h-36 bg-[radial-gradient(#009fe3_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Why Choose Us"
          title="Why Choose Miraco Biocare?"
          description="Trusted partnerships, comprehensive portfolios, and dedicated support for laboratories and healthcare institutions."
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8"
        >
          {company.whyChooseUsPoints.map((point, index) => {
            const config = iconMap[point] || { icon: ShieldCheck, color: "text-brand-accent", bg: "bg-brand-accent/10" };
            const Icon = config.icon;

            return (
              <motion.div
                key={point}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  scale: 1.015,
                  rotateX: 1,
                  rotateY: -1,
                }}
                className="flex flex-col gap-4 rounded-2xl border border-brand-border/50 dark:border-white/5 bg-white dark:bg-card p-5 shadow-sm hover:shadow-lg dark:hover:shadow-brand-accent/5 transition-all duration-300 transform-3d select-none group"
              >
                {/* Header with Icon */}
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg} ${config.color} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-800 dark:text-white leading-tight group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors duration-300">
                    {point}
                  </h4>
                </div>
                
                {/* Description - matching the enterprise-grade design detail */}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Providing state-of-the-art logistics, expert guidance, and reliable resources to support diagnostic accuracy and scientific breakthroughs.
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
