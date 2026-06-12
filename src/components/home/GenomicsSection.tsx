"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Dna, Check } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { genomicsApplications } from "@/data/divisions-content";
import { cn } from "@/lib/utils";

export function GenomicsSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-brand-primary">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-secondary blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-brand-accent blur-3xl" />
      </div>
      <div className="container-custom relative">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Dna className="h-6 w-6 text-brand-secondary" />
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-secondary">
                Genomics
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              Unlocking the Power of Genomic Science
            </h2>
            <p className="mt-4 text-sm text-white/85 md:text-base">
              Our solutions support both research and clinical laboratories seeking
              reliable, high-performance genomic workflows for precision medicine and
              scientific discovery.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {genomicsApplications.map((app) => (
                <li
                  key={app}
                  className="flex items-start gap-2 text-sm text-white/90"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  {app}
                </li>
              ))}
            </ul>
            <Link
              href="/genomics"
              className={cn(
                buttonVariants(),
                "mt-6 bg-white text-brand-primary hover:bg-white/90"
              )}
            >
              Explore Genomics Solutions
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-md justify-self-center lg:max-w-none"
          >
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1628595351029-2dd764c697d8?w=800&q=80"
                alt="Genomics and DNA sequencing"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -right-2 -top-2 rounded-full bg-brand-accent p-4 md:-right-4 md:-top-4">
              <Dna className="h-8 w-8 text-white md:h-10 md:w-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
