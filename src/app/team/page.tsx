import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { createMetadata } from "@/lib/metadata";
import { leadership } from "@/data/team";
import { MobileCarousel } from "@/components/shared/MobileCarousel";

export const metadata = createMetadata({
  title: "Our Team",
  description:
    "Meet the leadership team at Miraco Biocare Private Limited driving innovation in healthcare and life sciences.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Our Team"
        subtitle="Experienced professionals dedicated to advancing healthcare and life sciences"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Team" },
        ]}
        image="/hero/banner-3.jpg"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            label="Leadership"
            title="Meet Our Leadership"
            description="Our leadership team brings decades of combined experience in healthcare, diagnostics, life sciences, and business management."
            align="center"
          />
          <MobileCarousel className="sm:grid-cols-2 lg:grid-cols-4" breakpoint="sm">
            {leadership.map((member) => (
              <div
                key={member.name}
                className="overflow-hidden rounded-lg border border-brand-border bg-white transition-shadow hover:shadow-md"
              >
                <div className="relative h-56">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-semibold text-brand-text">{member.name}</h3>
                  <p className="text-sm text-brand-secondary">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </MobileCarousel>
        </div>
      </section>

      <section className="section-padding bg-brand-light">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-brand-text">Join Our Team</h2>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              We are always looking for talented professionals passionate about healthcare
              and life sciences. Explore career opportunities at Miraco Biocare.
            </p>
            <Link
              href="/careers"
              className="mt-6 inline-flex items-center rounded-md bg-brand-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-primary/90"
            >
              View Careers
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
