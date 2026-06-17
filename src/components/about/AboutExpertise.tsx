"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const expertise = [
  "Clinical Diagnostics & Laboratory Medicine",
  "Life Sciences & Research Instrumentation",
  "Genomics & Molecular Biology",
  "Pharmaceutical Products & Solutions",
  "Biotechnology & Cell Biology",
  "Laboratory Automation & Informatics",
];

export function AboutExpertise() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <section className="section-padding bg-brand-light dark:bg-slate-900 border-b border-brand-border/40 dark:border-white/5 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-brand-secondary/5 dark:bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-12 lg:grid-cols-2"
        >
          {/* Industry Expertise Column */}
          <motion.div
            variants={columnVariants}
            className="p-6 md:p-8 rounded-2xl bg-white dark:bg-card border border-brand-border/50 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <SectionHeading
              label="Expertise"
              title="Industry Expertise"
              description="Deep domain knowledge across the complete healthcare, research, and laboratory ecosystem."
            />
            <motion.ul
              variants={listVariants}
              className="space-y-3 mt-6 border-t border-brand-border/30 dark:border-white/5 pt-4"
            >
              {expertise.map((item) => (
                <motion.li
                  key={item}
                  variants={listItemVariants}
                  className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 group"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent transition-transform duration-300 group-hover:scale-110">
                    <CheckCircle2 className="h-4.5 w-4.5" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors duration-300">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Customer Commitment Column */}
          <motion.div
            variants={columnVariants}
            className="p-6 md:p-8 rounded-2xl bg-white dark:bg-card border border-brand-border/50 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <SectionHeading
                label="Commitment"
                title="Customer Commitment"
                description="Building long-term partnerships through reliable service and responsive support."
              />
              <p className="mt-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
                We are dedicated to understanding our customers&apos; unique needs and
                delivering tailored solutions that drive success. From initial consultation
                through installation, training, and ongoing support, our team is committed
                to your complete satisfaction and laboratory excellence.
              </p>
            </div>
            
            <div className="mt-8">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "h-10 text-xs md:h-12 md:text-sm shadow-md transition-all duration-300 hover:shadow-lg hover:bg-brand-primary/95 active:scale-95 group rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary dark:from-brand-primary dark:to-brand-accent text-white font-medium border-0 px-6 py-2 flex items-center justify-center w-fit"
                )}
              >
                <span>Get in Touch</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
