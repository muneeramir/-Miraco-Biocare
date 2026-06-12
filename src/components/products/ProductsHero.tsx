"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Dna, FlaskConical, ShieldCheck, Activity } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const heroFeatures = [
  "Clinical diagnostics excellence",
  "Life sciences research tools",
  "Genomics and precision medicine",
  "Enterprise-grade healthcare solutions",
];

export default function ProductsHero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-secondary/20 to-transparent" />
      <div className="container-custom relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-flex rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
              Products & Solutions
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl xl:text-6xl">
              Product Portfolio for Laboratories and Healthcare
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Explore Miraco Biocare's comprehensive product portfolio of state-of-the-art scientific instruments, diagnostic equipment, laboratory consumables, and research reagents designed for clinical laboratories, research centers, and biotechnology organizations.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#solutions"
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
              >
                Explore Solutions
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto"
                )}
              >
                Contact Us
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {heroFeatures.map((feature) => (
                <div key={feature} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-lg shadow-slate-900/5">
                  <p className="text-sm font-medium text-slate-900">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative mx-auto flex w-full max-w-md items-center justify-center"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-secondary/10 via-accent/10 to-slate-100 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
              <div className="absolute -left-8 top-8 h-24 w-24 rounded-full bg-gradient-to-br from-secondary to-accent opacity-70 blur-2xl" />
              <div className="absolute -right-10 bottom-10 h-20 w-20 rounded-full bg-gradient-to-br from-primary to-slate-900 opacity-70 blur-2xl" />
              <div className="flex items-center justify-between gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-950/95 p-6 text-white shadow-xl shadow-slate-950/20">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-secondary/90">Scientific overview</p>
                  <h2 className="mt-3 text-2xl font-semibold">Integrated DNA diagnostics</h2>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4 shadow-lg shadow-slate-950/30">
                  <Dna className="h-8 w-8 text-cyan-300" />
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5 shadow-xl shadow-slate-900/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-slate-900/10">
                    <FlaskConical className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-slate-950">Molecular assays</p>
                  <p className="mt-2 text-sm text-slate-600">Next generation diagnostics for clinical research.</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5 shadow-xl shadow-slate-900/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-accent to-cyan-500 text-white shadow-lg shadow-slate-900/10">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-slate-950">Quality first</p>
                  <p className="mt-2 text-sm text-slate-600">ISO-grade systems built for laboratory reliability.</p>
                </div>
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="mt-8 space-y-4"
              >
                <div className="rounded-3xl border border-slate-200 bg-slate-950/90 p-5 text-white">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Activity className="h-4 w-4 text-secondary" />
                    <span>High-performance instruments designed for research accuracy</span>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-950/90 p-5 text-white">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <ArrowRight className="h-4 w-4 text-cyan-300" />
                    <span>Premium consumables and reagents for daily lab operations</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
