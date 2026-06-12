"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

const highlights = [
  "Globally recognized manufacturer partnerships",
  "Integrated laboratory ecosystem solutions",
  "Hospitals, labs, universities & research institutes",
  "Quality, integrity & customer satisfaction",
];

export function AboutSection() {
  return (
    <section className="section-padding bg-brand-light">
      <div className="container-custom">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              label="About Miraco Biocare"
              title="Who We Are"
              description={company.welcomeText1}
            />
            <p className="mb-4 text-sm text-muted-foreground md:text-base">
              {company.welcomeText2}
            </p>
            <p className="mb-6 text-sm text-muted-foreground md:text-base">
              Our expertise spans the complete healthcare and laboratory ecosystem,
              enabling us to provide integrated solutions that support diagnosis,
              research, quality control, and scientific advancement.
            </p>
            <p className="mb-6 text-sm text-muted-foreground md:text-base">
              {company.welcomeMissionBridge}
            </p>
            <ul className="mb-6 space-y-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className={cn(buttonVariants())}
            >
              Learn More About Us
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1582719471137-c3967ffeb8cb?w=800&q=80"
                alt="Miraco Biocare laboratory solutions"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-lg bg-brand-primary p-4 text-white shadow-lg md:-bottom-6 md:-left-6 md:p-6">
              <p className="text-2xl font-bold md:text-3xl">15+</p>
              <p className="text-xs md:text-sm">Years of Excellence</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
