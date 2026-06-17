"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, motion } from "framer-motion";
import { company } from "@/data/company";
import { Award, Globe2, FlaskConical, HeartHandshake, type LucideIcon } from "lucide-react";

// Map labels to icons
const iconMap: Record<string, { icon: LucideIcon; color: string }> = {
  "Years of Excellence": { icon: Award, color: "from-blue-500 to-indigo-600 dark:from-brand-accent dark:to-brand-primary" },
  "Global Partners": { icon: Globe2, color: "from-emerald-500 to-teal-600 dark:from-teal-400 dark:to-brand-primary" },
  "Products & Solutions": { icon: FlaskConical, color: "from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500" },
  "Clients Served": { icon: HeartHandshake, color: "from-rose-500 to-red-600 dark:from-rose-400 dark:to-red-500" },
};

function Counter({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Extract numerical parts
  const numericMatch = value.match(/\d+/);
  const target = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/g, "");

  useEffect(() => {
    if (!isInView || target === 0) return;

    let start = 0;
    const end = target;
    const totalSteps = 60;
    const stepTime = Math.max((duration * 1000) / totalSteps, 16);
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      // Ease out quad
      const currentCount = Math.floor(end * (1 - (1 - progress) * (1 - progress)));

      if (currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(currentCount);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums font-extrabold">
      {target > 0 ? `${count}${suffix}` : value}
    </span>
  );
}

export function AboutStats() {
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

  return (
    <section className="section-padding bg-brand-light dark:bg-slate-900 border-y border-brand-border/40 dark:border-white/5 relative overflow-hidden">
      {/* Parallax soft blurred background blobs */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/5 dark:bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {company.stats.map((stat, i) => {
            const iconConfig = iconMap[stat.label] || { icon: Award, color: "from-blue-500 to-indigo-600" };
            const Icon = iconConfig.icon;

            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-card border border-brand-border/50 dark:border-white/5 shadow-md hover:shadow-xl dark:hover:shadow-brand-primary/5 transition-all duration-300 overflow-hidden"
              >
                {/* Diagonal highlight flare */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full pointer-events-none" />

                <div>
                  {/* Floating Icon badge */}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${iconConfig.color} text-white shadow-md mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Stat Label */}
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                    {stat.label}
                  </h3>

                  {/* Numerical Value Counter */}
                  <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                    <Counter value={stat.value} />
                  </p>
                </div>

                {/* Animated draw underline */}
                <div className="mt-6">
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: i * 0.12, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${iconConfig.color} rounded-full`}
                    />
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
