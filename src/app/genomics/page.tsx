import Image from "next/image";
import Link from "next/link";
import { Dna, Check, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { Button, buttonVariants } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { genomicsApplications } from "@/data/divisions-content";

export const metadata = createMetadata({
  title: "Genomics",
  description:
    "Genomic solutions including NGS, whole genome sequencing, pharmacogenomics, and precision medicine.",
  path: "/genomics",
});

const genomicsSolutions = [
  {
    title: "Whole Genome Sequencing",
    description:
      "High-coverage whole genome sequencing platforms for comprehensive genetic analysis in research and clinical settings.",
  },
  {
    title: "Next Generation Sequencing (NGS)",
    description:
      "Scalable NGS systems enabling targeted panels, exome sequencing, and RNA-seq workflows with exceptional data quality.",
  },
  {
    title: "Pharmacogenomics",
    description:
      "Genetic testing solutions to guide drug selection and dosing for personalized therapeutic approaches.",
  },
  {
    title: "Clinical Genomics",
    description:
      "Validated genomic assays for inherited disease screening, oncology profiling, and infectious disease detection.",
  },
  {
    title: "Precision Medicine",
    description:
      "Integrated genomic workflows supporting biomarker discovery and patient stratification for targeted therapies.",
  },
];

export default function GenomicsPage() {
  return (
    <>
      <PageHero
        title="Genomics"
        subtitle="Unlocking the power of genomic science for research and clinical applications"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Genomics" },
        ]}
        image="/hero/banner-4.jpg"
      />

      <section className="section-padding relative overflow-hidden bg-white">
        <div className="absolute right-0 top-0 h-96 w-96 opacity-5">
          <Dna className="h-full w-full text-brand-primary" />
        </div>
        <div className="container-custom relative">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <SectionHeading
                label="Overview"
                title="Genomic Science Solutions"
                description="Our genomics portfolio supports both research and clinical laboratories seeking reliable, high-performance genomic workflows."
              />
              <p className="text-sm text-muted-foreground md:text-base">
                From sample preparation through sequencing and analysis, Miraco Biocare
                provides integrated genomic solutions that enable breakthrough discoveries
                in precision medicine, population genetics, and clinical diagnostics.
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {genomicsApplications.map((app) => (
                  <li
                    key={app}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                    {app}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1628595351029-2dd764c697d8?w=800&q=80"
                alt="Genomics laboratory"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-light">
        <div className="container-custom">
          <SectionHeading
            label="Solutions"
            title="Genomic Applications"
            align="center"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {genomicsSolutions.map((solution) => (
              <div
                key={solution.title}
                className="rounded-lg border border-brand-border bg-white p-5 md:p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10">
                  <Dna className="h-5 w-5 text-brand-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-brand-text">{solution.title}</h3>
                <p className="text-sm text-muted-foreground">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <Link
            href="/request-quotation"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Request Genomics Quotation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
