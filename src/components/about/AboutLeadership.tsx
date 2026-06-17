"use client";

import Image from "@/components/shared/SafeImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { leadership } from "@/data/team";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function AboutLeadership() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
        stiffness: 75,
        damping: 16,
      },
    },
  };

  return (
    <section className="section-padding bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background soft lighting blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Leadership"
          title="Our Leadership Team"
          description="Experienced professionals driving innovation, operations, and technical excellence in healthcare and life sciences."
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 justify-center"
        >
          {leadership.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-2xl border border-brand-border/50 dark:border-white/5 bg-brand-light dark:bg-card shadow-sm hover:shadow-lg transition-all duration-300 relative group max-w-sm mx-auto w-full"
            >
              <div className="relative h-60 overflow-hidden bg-slate-100 dark:bg-slate-900">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              <div className="p-5">
                <h3 className="font-extrabold text-slate-800 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-xs font-bold text-brand-secondary dark:text-brand-accent uppercase tracking-wider mt-0.5">
                  {member.role}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/leadership"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "rounded-full px-6 border-brand-border/60 hover:border-brand-primary hover:bg-brand-primary/5 dark:hover:bg-brand-accent/5 group transition-all duration-300"
            )}
          >
            <span>View Full Leadership Team</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
