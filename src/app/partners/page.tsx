import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { PartnerLogoCard } from "@/components/partners/PartnerLogoCard";
import { createMetadata } from "@/lib/metadata";
import { partners } from "@/data/partners";

export const metadata = createMetadata({
  title: "Partners",
  description:
    "Miraco Biocare partners with globally recognized manufacturers and technology innovators in healthcare and life sciences.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero
        title="Trusted Global Partners"
        subtitle="Collaborating with leaders in healthcare, diagnostics, and life sciences"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Partners" },
        ]}
        image="/hero/banner-4.jpg"
      />

      <section className="section-padding bg-white dark:bg-background">
        <div className="container-custom">
          <SectionHeading
            label="Strategic Alliances"
            title="Our Strategic Partners"
            description="Miraco Biocare partners with internationally recognized manufacturers and technology innovators to deliver world-class solutions. Our collaborations ensure access to advanced technologies, robust product portfolios, and comprehensive technical support."
            align="center"
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
            {partners.map((partner) => (
              <PartnerLogoCard
                key={partner.slug}
                partner={partner}
                className="h-36 w-full max-w-none shrink md:h-40 md:w-auto"
                sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 200px"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-light dark:bg-slate-950/40">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-brand-text md:text-3xl">
              Partnership Benefits
            </h2>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              Through our strategic partnerships, we provide customers with access to
              cutting-edge technologies, genuine products, comprehensive warranties, and
              factory-trained technical support. Our partner network spans diagnostics,
              life sciences, genomics, and pharmaceutical sectors — including globally
              recognized brands such as Carl Zeiss, IKA, Haier Biomedical, and HACH.
            </p>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
