import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Section {
  title: string;
  description: string;
  items: string[];
  applications?: string[];
}

interface DivisionPageTemplateProps {
  title: string;
  subtitle: string;
  breadcrumb: string;
  heroImage: string;
  overview: string;
  extraOverview?: string;
  sections: Section[];
  features?: string[];
  applications?: string[];
  ctaText?: string;
  additionalSections?: ReactNode;
}

export function DivisionPageTemplate({
  title,
  subtitle,
  breadcrumb,
  heroImage,
  overview,
  extraOverview,
  sections,
  features,
  applications,
  ctaText,
  additionalSections,
}: DivisionPageTemplateProps) {
  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: breadcrumb },
        ]}
        image={heroImage}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <SectionHeading label="Overview" title={`${title} Solutions`} />
              <p className="text-sm text-muted-foreground md:text-base">{overview}</p>
              {extraOverview && (
                <p className="mt-4 text-sm text-muted-foreground md:text-base">
                  {extraOverview}
                </p>
              )}
              {features && (
                <ul className="mt-6 space-y-2">
                  {features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              {applications && (
                <div className="mt-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Applications
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {applications.map((app) => (
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
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/request-quotation"
                  className={cn(buttonVariants())}
                >
                  Request Quotation
                </Link>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={heroImage}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-light">
        <div className="container-custom">
          <SectionHeading
            label="Solutions"
            title="Our Offerings"
            description={ctaText || `Comprehensive ${title.toLowerCase()} solutions for your laboratory needs.`}
            align="center"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-lg border border-brand-border bg-white p-5 md:p-6"
              >
                <h3 className="mb-2 text-lg font-semibold text-brand-primary">
                  {section.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {section.description}
                </p>
                <div className="mb-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Capabilities
                  </p>
                  <ul className="grid gap-1.5 sm:grid-cols-2">
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
                </div>
                {section.applications && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Applications
                    </p>
                    <ul className="space-y-1">
                      {section.applications.map((app) => (
                        <li
                          key={app}
                          className="text-xs text-muted-foreground md:text-sm"
                        >
                          • {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {additionalSections}

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold text-brand-text md:text-3xl">
            Need Expert Guidance?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Our application specialists are ready to help you select the right solutions
            for your laboratory requirements.
          </p>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "mt-6")}
          >
            Contact Our Experts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
