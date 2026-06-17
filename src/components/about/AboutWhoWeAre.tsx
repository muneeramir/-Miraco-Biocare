"use client";

import Image from "@/components/shared/SafeImage";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export function AboutWhoWeAre() {
  const [expanded, setExpanded] = useState(false);

  // Content entrance variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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

  return (
    <section className="section-padding bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative background dot grid */}
      <div className="absolute right-0 top-1/4 w-48 h-48 bg-[radial-gradient(#0057b8_1px,transparent_1px)] dark:bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          {/* Text Content Block */}
          <div className="flex flex-col justify-center">
            <motion.div variants={itemVariants} className="mb-6 max-w-3xl">
              <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-secondary dark:text-brand-accent">
                Who We Are
              </span>
              <h2 className="text-3xl font-extrabold md:text-4xl text-brand-text">
                Company Overview
              </h2>
            </motion.div>

            {/* Content Text with Framer Motion Collapser for Mobile */}
            <motion.div variants={itemVariants} className="relative">
              {/* Desktop view (always visible) */}
              <div className="hidden md:block space-y-4">
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
                  {company.welcomeText1}
                </p>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
                  {company.welcomeText2}
                </p>
              </div>

              {/* Mobile View with Animated Collapser */}
              <div className="block md:hidden">
                <motion.div
                  id="who-we-are-text-mobile"
                  animate={{ height: expanded ? "auto" : "110px" }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="relative overflow-hidden space-y-4"
                >
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {company.welcomeText1}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {company.welcomeText2}
                  </p>
                  
                  {/* Subtle fade overlay when collapsed */}
                  {!expanded && (
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none" />
                  )}
                </motion.div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-3 px-0 text-xs font-bold text-brand-primary dark:text-brand-accent hover:bg-transparent"
                  onClick={() => setExpanded((prev) => !prev)}
                  aria-expanded={expanded}
                  aria-controls="who-we-are-text-mobile"
                >
                  {expanded ? (
                    <span className="flex items-center gap-1">Read Less <ChevronUp className="h-3.5 w-3.5" /></span>
                  ) : (
                    <span className="flex items-center gap-1">Read More <ChevronDown className="h-3.5 w-3.5" /></span>
                  )}
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Interactive Image Block */}
          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center"
          >
            {/* Glowing borders framing the image */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-brand-primary to-brand-secondary dark:from-brand-primary dark:to-brand-accent rounded-2xl blur-[12px] opacity-10 dark:opacity-25" />
            
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-brand-border/40 dark:border-white/5 shadow-xl group">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
                alt="Miraco Biocare team"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Glass sheen reflection effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
