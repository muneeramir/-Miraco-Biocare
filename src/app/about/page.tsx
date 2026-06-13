import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { Button, buttonVariants } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { company } from "@/data/company";
import { leadership } from "@/data/team";
import { AboutWhoWeAre } from "@/components/about/AboutWhoWeAre";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about Miraco Biocare Private Limited – our mission, vision, values, and expertise in pharmaceutical solutions, biotechnology, clinical diagnostics, and life sciences.",
  path: "/about",
});

const expertise = [
  "Clinical Diagnostics & Laboratory Medicine",
  "Life Sciences & Research Instrumentation",
  "Genomics & Molecular Biology",
  "Pharmaceutical Products & Solutions",
  "Biotechnology & Cell Biology",
  "Laboratory Automation & Informatics",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Miraco Biocare"
        subtitle="Your trusted partner in healthcare, diagnostics, and life sciences"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
        image="/hero/banner-1.jpg"
      />

      <AboutWhoWeAre />

      <section className="section-padding bg-brand-light">
        <div className="container-custom">
          <SectionHeading
            label="About Us"
            title={company.aboutHeading}
            description={company.aboutIntroExtra}
          />
          <div className="mx-auto max-w-3xl space-y-4">
            <p className="text-sm text-muted-foreground md:text-base">
              {company.aboutIntroPartner}
            </p>
            <p className="text-sm text-muted-foreground md:text-base">
              {company.aboutIntroPartnerships}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-brand-border bg-brand-light p-6 md:p-8">
              <h3 className="mb-3 text-xl font-bold text-brand-primary">Our Mission</h3>
              <p className="text-sm text-muted-foreground md:text-base">
                {company.mission}
              </p>
              <ul className="mt-4 space-y-2">
                {company.missionStatements.map((statement) => (
                  <li
                    key={statement}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                    {statement}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-brand-border bg-brand-light p-6 md:p-8">
              <h3 className="mb-3 text-xl font-bold text-brand-primary">Our Vision</h3>
              <p className="text-sm text-muted-foreground md:text-base">
                {company.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-light">
        <div className="container-custom">
          <SectionHeading
            label="Why Choose Us"
            title="Why Choose Miraco Biocare?"
            description="Trusted partnerships, comprehensive portfolios, and dedicated support for laboratories and healthcare institutions."
            align="center"
          />
          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {company.whyChooseUsPoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-2 rounded-lg border border-brand-border bg-white p-4"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                <span className="text-sm text-muted-foreground">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            label="Our Values"
            title="Core Values"
            description="The principles that guide everything we do."
            align="center"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {company.values.map((value) => (
              <div
                key={value.title}
                className="rounded-lg border border-brand-border p-5 md:p-6"
              >
                <h3 className="mb-2 font-semibold text-brand-primary">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-light">
        <div className="container-custom">
          <SectionHeading
            label="Leadership"
            title="Our Leadership Team"
            description="Experienced professionals driving innovation in healthcare and life sciences."
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((member) => (
              <div
                key={member.name}
                className="overflow-hidden rounded-lg border border-brand-border bg-white"
              >
                <div className="relative h-48">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-brand-text">{member.name}</h3>
                  <p className="text-sm text-brand-secondary">{member.role}</p>
                  <p className="mt-2 text-xs text-muted-foreground md:text-sm">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/leadership"
              className={cn(buttonVariants({ variant: "outline", size: "default" }))}
            >
              View Full Leadership
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <SectionHeading
                label="Expertise"
                title="Industry Expertise"
                description="Deep domain knowledge across the complete healthcare and laboratory ecosystem."
              />
              <ul className="space-y-2">
                {expertise.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading
                label="Commitment"
                title="Customer Commitment"
                description="Building long-term partnerships through reliable service and responsive support."
              />
              <p className="mb-4 text-sm text-muted-foreground md:text-base">
                We are dedicated to understanding our customers&apos; unique needs and
                delivering tailored solutions that drive success. From initial consultation
                through installation, training, and ongoing support, our team is committed
                to your satisfaction.
              </p>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "default", size: "default" }))}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
