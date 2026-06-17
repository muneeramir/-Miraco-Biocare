"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { company } from "@/data/company";
import {
  FileText,
  HelpCircle,
  FlaskConical,
  Wrench,
  GraduationCap,
  Settings,
  HeartHandshake,
  type LucideIcon
} from "lucide-react";

// Map support items to dedicated icons and color highlights
const iconMap: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  "Product Consultation": { icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
  "Technical Guidance": { icon: HelpCircle, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  "Application Support": { icon: FlaskConical, color: "text-pink-500", bg: "bg-pink-500/10" },
  "Installation Coordination": { icon: Wrench, color: "text-amber-500", bg: "bg-amber-500/10" },
  "Product Training": { icon: GraduationCap, color: "text-purple-500", bg: "bg-purple-500/10" },
  "Preventive Maintenance Support": { icon: Settings, color: "text-teal-500", bg: "bg-teal-500/10" },
  "After-Sales Service Coordination": { icon: HeartHandshake, color: "text-rose-500", bg: "bg-rose-500/10" },
};

export function ServicesSupport() {
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
    hidden: { opacity: 0, y: 25 },
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
      {/* Background soft blurs */}
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-brand-secondary/5 dark:bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Technical Support"
          title="Technical Support & Services"
          description={company.technicalSupportIntro}
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-8"
        >
          {company.technicalSupportItems.map((item) => {
            const config = iconMap[item] || { icon: HeartHandshake, color: "text-brand-accent", bg: "bg-brand-accent/10" };
            const Icon = config.icon;

            return (
              <motion.div
                key={item}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.01 }}
                className="flex flex-col gap-4 rounded-2xl border border-brand-border/60 dark:border-white/5 bg-white dark:bg-card p-5 shadow-sm hover:shadow-md transition-all duration-300 group select-none"
              >
                {/* Icon Badge */}
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg} ${config.color} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-5 w-5" />
                </div>

                {/* Support Title */}
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors duration-300">
                    {item}
                  </h4>
                  <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Reliable engineering guidance to sustain workflows, validate results, and maintain device longevity.
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
