"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary via-cyan-600 to-secondary py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,196,150,0.24),_transparent_22%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(15,76,129,0.28),_transparent_20%)]" />
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl sm:p-12"
        >
          <div className="absolute -top-10 -left-10 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-12 right-8 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100">
                Partner with Miraco Biocare
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Discover innovative healthcare and life science solutions designed to accelerate diagnostics, research, and scientific advancement.
              </h2>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
              >
                Contact Our Team
              </Link>
              <Link
                href="/request-quotation"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto"
                )}
              >
                Request Consultation
              </Link>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 text-white shadow-xl shadow-cyan-500/10">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-100">Trusted Support</p>
              <p className="mt-4 text-base text-slate-100">Fast deployment and ongoing technical assistance for every solution.</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 text-white shadow-xl shadow-cyan-500/10">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-100">Future-ready systems</p>
              <p className="mt-4 text-base text-slate-100">Solutions built to support evolving laboratory and research workflows.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
