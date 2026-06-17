"use client";

import Link from "next/link";
import { ChevronRight, Wrench, ShieldCheck, Activity } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SafeImage from "@/components/shared/SafeImage";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface ServicesHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  image?: string;
}

export function ServicesHero({
  title,
  subtitle,
  breadcrumbs,
  image = "/hero/banner-2.jpg",
}: ServicesHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll inside the hero section for parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax offset
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Staggered contents
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
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

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, -1.5, 0],
      transition: {
        duration: 7,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-light dark:bg-slate-950 py-16 sm:py-20 md:py-24 lg:py-32 border-b border-brand-border/40 dark:border-white/5"
    >
      {/* Background Animated Image & Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          {/* Ken Burns zooming loop */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              x: [0, -5, 0],
              y: [0, -3, 0],
            }}
            transition={{
              duration: 25,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="relative w-full h-full opacity-35 dark:opacity-20"
          >
            <SafeImage
              src={image}
              alt="Miraco Biocare Diagnostics background"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        </motion.div>

        {/* Readability Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-light via-brand-light/95 to-brand-light/40 dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950/40 z-1" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-light dark:from-slate-950 to-transparent z-1" />

        {/* Glow dots */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-primary/15 dark:bg-brand-primary/20 blur-[80px] z-2"
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-secondary/10 dark:bg-brand-secondary/15 blur-[100px] z-2"
        />

        {/* Grid Pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,87,184,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,87,184,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-2" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Hero Content Left */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <motion.nav
                variants={itemVariants}
                className="mb-4 flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-secondary dark:text-brand-accent md:text-sm"
              >
                {breadcrumbs.map((crumb, i) => (
                  <span key={crumb.label} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" />}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="transition-colors hover:text-brand-primary dark:hover:text-white"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-slate-500 dark:text-slate-400">{crumb.label}</span>
                    )}
                  </span>
                ))}
              </motion.nav>
            )}

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl tracking-tight"
            >
              {title.split(" ").map((word, i) => {
                if (word === "Services" || word === "Our") {
                  return (
                    <span
                      key={i}
                      className="bg-gradient-to-r from-brand-primary to-brand-secondary dark:from-brand-primary dark:to-brand-accent bg-clip-text text-transparent inline-block mr-2"
                    >
                      {word}
                    </span>
                  );
                }
                return (
                  <span key={i} className="inline-block mr-2">
                    {word}
                  </span>
                );
              })}
            </motion.h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                variants={itemVariants}
                className="mt-6 text-sm leading-relaxed text-slate-700 dark:text-slate-200 sm:text-base md:text-lg max-w-xl"
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>

          {/* Hero Decorative Visual Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:col-span-5 lg:flex lg:justify-center relative"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-accent/20 rounded-full blur-[60px] w-80 h-80 mx-auto" />

            <motion.div
              variants={floatVariants}
              animate="animate"
              className="relative w-80 h-80 flex flex-col justify-between p-5 bg-white/45 dark:bg-slate-900/40 rounded-3xl border border-white/30 dark:border-white/5 backdrop-blur-xl shadow-2xl overflow-hidden font-mono text-[10px] text-slate-600 dark:text-slate-300"
            >
              {/* Header stats bar */}
              <div className="flex justify-between items-center border-b border-brand-border/40 dark:border-white/5 pb-3">
                <div className="flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-brand-primary dark:text-brand-accent animate-pulse" />
                  <span className="font-bold text-slate-800 dark:text-white text-xs">LAB_MONITOR</span>
                </div>
                <span className="text-brand-accent font-semibold">ONLINE</span>
              </div>

              {/* Central diagnostics charts */}
              <div className="flex-1 flex flex-col justify-center gap-3 py-3">
                {/* Channel 1 Calibration */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px]">
                    <span>SYS_CALIBRATION_X</span>
                    <span className="font-bold text-slate-900 dark:text-white">99.8%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "99.8%" }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="h-full bg-brand-primary dark:bg-brand-accent rounded-full"
                    />
                  </div>
                </div>

                {/* Channel 2 Fluidics */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px]">
                    <span>FLUIDIC_VALVES</span>
                    <span className="font-bold text-slate-900 dark:text-white">READY</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
                      className="h-full bg-brand-secondary rounded-full"
                    />
                  </div>
                </div>

                {/* Dynamic graph wave */}
                <div className="mt-1 h-10 w-full bg-slate-100 dark:bg-slate-950/60 rounded-xl border border-brand-border/10 dark:border-white/5 p-1 flex items-center overflow-hidden">
                  <svg className="w-full h-8 text-brand-primary dark:text-brand-accent" viewBox="0 0 100 20">
                    <path
                      d="M0,10 L10,10 L15,2 L20,18 L25,10 L50,10 L55,5 L60,15 L65,10 L100,10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Bottom active flags */}
              <div className="flex justify-between items-center border-t border-brand-border/40 dark:border-white/5 pt-3 text-[9px]">
                <div className="flex items-center gap-1">
                  <Wrench className="h-3 w-3 text-slate-400" />
                  <span>ENG_STATUS: OPTIMAL</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-brand-accent" />
                  <span>CE_CERT</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
