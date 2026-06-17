"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SafeImage from "@/components/shared/SafeImage";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface AboutHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  image?: string;
}

export function AboutHero({
  title,
  subtitle,
  breadcrumbs,
  image = "/hero/banner-3.jpg",
}: AboutHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll inside the hero section for parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background parallax offset: translates from 0% to 15% downwards
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Container animation with staggered children
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
      y: [0, -12, 0],
      rotate: [0, 2, 0],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 8,
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
        {/* Parallax Background Image Wrapper */}
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          {/* Ken Burns zooming & shifting loop */}
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              x: [0, -8, 0],
              y: [0, -4, 0],
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
              alt="Miraco Biocare Biotechnology background"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        </motion.div>

        {/* Readability Gradients (Ensuring contrast for light/dark themes) */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-light via-brand-light/95 to-brand-light/40 dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950/40 z-1" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-light dark:from-slate-950 to-transparent z-1" />

        {/* Soft glowing blobs */}
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-primary/15 dark:bg-brand-primary/20 blur-[80px] z-2"
        />
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-secondary/10 dark:bg-brand-secondary/15 blur-[100px] z-2"
        />

        {/* Grid pattern overlay */}
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
              className="text-3xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl tracking-tight animate-fade-in"
            >
              {title.split(" ").map((word, i) => {
                if (word === "Miraco" || word === "Biocare") {
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

          {/* Hero Decorative Biotech Visual Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:col-span-5 lg:flex lg:justify-center relative"
          >
            {/* Soft backdrop glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-accent/20 rounded-full blur-[60px] w-80 h-80 mx-auto" />

            <motion.div
              variants={floatVariants}
              animate="animate"
              className="relative w-80 h-80 flex items-center justify-center bg-white/45 dark:bg-slate-900/40 rounded-3xl border border-white/30 dark:border-white/5 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              {/* Spinning DNA / Biotech Graphic */}
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                className="text-brand-primary dark:text-brand-accent"
              >
                {/* Outer molecular bonds */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                  className="origin-center"
                >
                  <circle cx="100" cy="30" r="6" fill="currentColor" className="opacity-80" />
                  <circle cx="100" cy="170" r="6" fill="currentColor" className="opacity-80" />
                  <circle cx="30" cy="100" r="6" fill="currentColor" className="opacity-80" />
                  <circle cx="170" cy="100" r="6" fill="currentColor" className="opacity-80" />
                  <circle cx="50" cy="50" r="4" fill="currentColor" className="opacity-60" />
                  <circle cx="150" cy="150" r="4" fill="currentColor" className="opacity-60" />
                  <circle cx="50" cy="150" r="4" fill="currentColor" className="opacity-60" />
                  <circle cx="150" cy="50" r="4" fill="currentColor" className="opacity-60" />

                  <line x1="100" y1="30" x2="150" y2="50" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                  <line x1="150" y1="50" x2="170" y2="100" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                  <line x1="170" y1="100" x2="150" y2="150" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                  <line x1="150" y1="150" x2="100" y2="170" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                  <line x1="100" y1="170" x2="50" y2="150" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                  <line x1="50" y1="150" x2="30" y2="100" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                  <line x1="30" y1="100" x2="50" y2="50" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                  <line x1="50" y1="50" x2="100" y2="30" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                </motion.g>

                {/* Vertical DNA Strand Helix */}
                <g className="origin-center">
                  {[...Array(10)].map((_, index) => {
                    const y = 50 + index * 12;
                    const delay = index * 0.25;
                    return (
                      <g key={index}>
                        {/* Connecting base pair strand */}
                        <motion.line
                          x1="65"
                          y1={y}
                          x2="135"
                          y2={y}
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="opacity-20"
                          animate={{
                            strokeWidth: [1, 2, 1],
                            opacity: [0.15, 0.4, 0.15],
                          }}
                          transition={{
                            duration: 3,
                            delay,
                            repeat: Infinity,
                          }}
                        />
                        {/* Node 1 (left side of helix) */}
                        <motion.circle
                          cx="65"
                          cy={y}
                          r="3.5"
                          fill="currentColor"
                          animate={{
                            cx: [65, 135, 65],
                            r: [3, 4.5, 3],
                            fill: ["#0057b8", "#00b67a", "#0057b8"],
                          }}
                          transition={{
                            duration: 4,
                            delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        {/* Node 2 (right side of helix) */}
                        <motion.circle
                          cx="135"
                          cy={y}
                          r="3.5"
                          fill="currentColor"
                          animate={{
                            cx: [135, 65, 135],
                            r: [4.5, 3, 4.5],
                            fill: ["#00b67a", "#0057b8", "#00b67a"],
                          }}
                          transition={{
                            duration: 4,
                            delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </g>
                    );
                  })}
                </g>
              </svg>

              {/* Glowing dashboard status inside glass card */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/10 dark:bg-slate-950/20 backdrop-blur-md rounded-xl p-2.5 border border-white/10 dark:border-white/5 flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
                  <span>BIOCARE CORE</span>
                </div>
                <span>v3.0_ACT</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
