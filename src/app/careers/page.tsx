import Link from "next/link";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { Badge } from "@/components/ui/badge";
import { createMetadata } from "@/lib/metadata";
import { careers } from "@/data/careers";

export const metadata = createMetadata({
  title: "Careers",
  description:
    "Explore career opportunities at Miraco Biocare Private Limited in healthcare, diagnostics, and life sciences.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Careers"
        subtitle="Join our team and help advance healthcare and scientific discovery"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers" },
        ]}
        image="/hero/banner-4.jpg"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            label="Open Positions"
            title="Current Opportunities"
            description="We offer rewarding careers in sales, technical support, service engineering, and scientific applications."
            align="center"
          />
         <div className="space-y-4">
  {careers.length === 0 ? (
    <div className="rounded-lg border border-brand-border bg-white p-10 text-center">
      <h3 className="text-2xl font-semibold text-brand-text">
        No Positions Available Right Now
      </h3>
      <p className="mt-3 text-muted-foreground">
        Thank you for your interest in Miraco Biocare. We currently do not have
        any open vacancies. Please check back later for future opportunities.
      </p>
    </div>
  ) : (
    careers.map((career) => (
      <Link
        key={career.slug}
        href={`/careers/${career.slug}`}
        className="group flex flex-col gap-3 rounded-lg border border-brand-border bg-white p-4 transition-shadow hover:shadow-md md:flex-row md:items-center md:justify-between md:p-6"
      >
        <div>
          <h3 className="text-base font-semibold text-brand-text group-hover:text-brand-primary md:text-lg">
            {career.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {career.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {career.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5" />
              {career.type}
            </span>
            <Badge variant="secondary">{career.department}</Badge>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center text-sm font-medium text-brand-primary">
          View Details
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    ))
  )}
</div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
