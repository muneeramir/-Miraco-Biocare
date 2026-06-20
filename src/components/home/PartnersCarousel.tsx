"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PartnerLogoCard } from "@/components/partners/PartnerLogoCard";
import { partners } from "@/data/partners";

export function PartnersCarousel() {
  const marqueeList = [...partners, ...partners, ...partners];

  return (
    <section className="section-padding relative overflow-hidden border-t border-slate-100 bg-white dark:border-slate-900 dark:bg-background">
      <div className="pointer-events-none absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-brand-primary/5 blur-[120px]" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Strategic Alliances"
          title="Trusted Global Partners"
          description="Miraco Biocare collaborates with internationally recognized manufacturers and technology innovators to deliver world-class healthcare, diagnostics, and life science solutions."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-12 w-full overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] dark:[mask-image:linear-gradient(to_right,transparent,#090e1a_10%,#090e1a_90%,transparent)]"
        >
          <div
            className="animate-marquee flex gap-6 select-none md:gap-8"
            style={{ "--marquee-duration": "40s" } as React.CSSProperties}
          >
            {marqueeList.map((partner, index) => (
              <PartnerLogoCard
                key={`${partner.slug}-${index}`}
                partner={partner}
                sizes="(max-width: 768px) 160px, 200px"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
