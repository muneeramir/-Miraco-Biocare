"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SolutionSection {
  title: string;
  items: string[];
}

interface SolutionPreviewProps {
  label: string;
  title: string;
  description: string;
  sections: SolutionSection[];
  href: string;
  variant?: "default" | "alt";
}

export function SolutionPreview({
  label,
  title,
  description,
  sections,
  href,
  variant = "default",
}: SolutionPreviewProps) {
  return (
    <section
      className={`section-padding ${variant === "alt" ? "bg-brand-light" : "bg-white"}`}
    >
      <div className="container-custom">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end">
          <SectionHeading label={label} title={title} description={description} />
          <Link
            href={href}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "shrink-0"
            )}
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-lg border border-brand-border bg-white p-4 md:p-6"
            >
              <h3 className="mb-3 text-base font-semibold text-brand-primary md:text-lg">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-muted-foreground md:text-sm"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
