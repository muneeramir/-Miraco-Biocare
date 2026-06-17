"use client";

import Link from "next/link";
import Image from "@/components/shared/SafeImage";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { IconResolver } from "@/components/shared/IconResolver";
import { MobileCarousel } from "@/components/shared/MobileCarousel";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { services } from "@/data/services";

export function ServicesList() {
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
        damping: 16,
      },
    },
  };

  return (
    <section className="section-padding bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative side blur spot */}
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Support Services"
          title="End-to-End Laboratory Support"
          description="From installation to ongoing maintenance, our expert certified engineers ensure your diagnostics and instrumentation run at peak accuracy."
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8"
        >
          <MobileCarousel className="md:grid-cols-2 lg:grid-cols-3 lg:gap-6" breakpoint="md">
            {services.map((service) => (
              <motion.div
                key={service.slug}
                variants={cardVariants}
                className="h-full"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="premium-glow-card group flex flex-col h-full overflow-hidden rounded-2xl border border-brand-border/60 dark:border-white/5 bg-white dark:bg-card shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Image container with zoom on hover */}
                  <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Shadow overlay overlaying bottom of card image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    {/* Floating service icon */}
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-accent dark:bg-brand-accent/10 transition-transform duration-300 group-hover:scale-110">
                      <IconResolver
                        name={service.icon}
                        className="h-5 w-5"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-extrabold text-slate-800 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-accent md:text-lg transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 flex-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Learn more CTA button */}
                    <span className="mt-5 inline-flex items-center text-xs font-bold text-brand-primary dark:text-brand-accent group-hover:underline">
                      <span>Learn More</span>
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </MobileCarousel>
        </motion.div>
      </div>
    </section>
  );
}
