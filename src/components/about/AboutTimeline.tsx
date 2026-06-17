"use client";

import { useRef } from "react";
import { useScroll, useSpring, motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Calendar, Check } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    year: "2011",
    title: "Founded in Srinagar",
    description: "Miraco Biocare founded with a clear vision to supply world-class laboratory consumables and reagents to research departments.",
  },
  {
    year: "2015",
    title: "Diagnostics Expansion",
    description: "Expanded operations into Clinical Diagnostics & Laboratory Medicine, providing top-tier instrumentation to hospitals and labs.",
  },
  {
    year: "2018",
    title: "Global Partner Ecosystem",
    description: "Formed strategic partnerships with leading global healthcare and pharmaceutical manufacturers to broaden our solutions portfolio.",
  },
  {
    year: "2021",
    title: "Genomics Division Launch",
    description: "Established a specialized Genomics & Molecular Biology division, supporting clinical trials and genetic research labs.",
  },
  {
    year: "2024",
    title: "Logistics Upgrade",
    description: "Upgraded warehouse operations and local delivery networks, ensuring safe and prompt temperature-controlled supply chains.",
  },
  {
    year: "2026",
    title: "Innovating Diagnostics",
    description: "Serving over 1000+ laboratories and universities across the region, driving diagnostic accuracy and scientific progress.",
  },
];

export function AboutTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth scroll line width drawing
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="section-padding bg-brand-light dark:bg-slate-900 border-b border-brand-border/40 dark:border-white/5 relative overflow-hidden">
      {/* Decorative side blurs */}
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/3 w-96 h-96 bg-brand-secondary/5 dark:bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Our Journey"
          title="Milestones of Growth"
          description="A history of commitment, innovation, and trusted support for scientific and medical diagnostic advancement."
          align="center"
        />

        {/* Timeline Container */}
        <div className="relative mt-12 mx-auto max-w-5xl">
          {/* Central Vertical Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 rounded-full" />
          
          {/* Animated fill-in foreground line */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-brand-primary dark:bg-brand-accent -translate-x-1/2 rounded-full z-20"
          />

          {/* Timeline Milestones list */}
          <div className="space-y-8">
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={milestone.year}
                  className="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-12 relative z-30"
                >
                  {/* Left Column (Desktop) */}
                  <div className={`flex justify-end order-3 md:order-1 ${isEven ? "md:block" : "md:invisible h-0 pointer-events-none"}`}>
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ type: "spring", stiffness: 80, damping: 18 }}
                        className="w-full rounded-2xl border border-brand-border/50 dark:border-white/5 bg-white dark:bg-card p-6 shadow-md hover:shadow-lg transition-all duration-300 relative"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="h-4.5 w-4.5 text-brand-primary dark:text-brand-accent" />
                          <span className="text-lg font-black text-brand-primary dark:text-brand-accent">{milestone.year}</span>
                        </div>
                        <h4 className="text-base font-extrabold text-slate-800 dark:text-white mb-2">{milestone.title}</h4>
                        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{milestone.description}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Central Node Indicator */}
                  <div className="flex justify-start pl-1.5 md:pl-0 md:justify-center order-1 md:order-2">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.1 }}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-brand-primary dark:border-brand-accent shadow-md z-30 relative"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="h-1.5 w-1.5 rounded-full bg-brand-primary dark:bg-brand-accent"
                      />
                    </motion.div>
                  </div>

                  {/* Right Column (Desktop) */}
                  <div className={`flex justify-start order-3 md:order-3 ${!isEven ? "md:block" : "md:invisible h-0 pointer-events-none"}`}>
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ type: "spring", stiffness: 80, damping: 18 }}
                        className="w-full rounded-2xl border border-brand-border/50 dark:border-white/5 bg-white dark:bg-card p-6 shadow-md hover:shadow-lg transition-all duration-300 relative"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="h-4.5 w-4.5 text-brand-primary dark:text-brand-accent" />
                          <span className="text-lg font-black text-brand-primary dark:text-brand-accent">{milestone.year}</span>
                        </div>
                        <h4 className="text-base font-extrabold text-slate-800 dark:text-white mb-2">{milestone.title}</h4>
                        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{milestone.description}</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
