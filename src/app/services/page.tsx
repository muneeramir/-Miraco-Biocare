import { createMetadata } from "@/lib/metadata";
import { PageEntrance } from "@/components/about/PageEntrance";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesList } from "@/components/services/ServicesList";
import { ServicesSupport } from "@/components/services/ServicesSupport";
import { ContactCTA } from "@/components/shared/ContactCTA";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Professional installation, training, maintenance, and application support services for laboratory equipment.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <PageEntrance>
      <ServicesHero
        title="Our Services"
        subtitle="Comprehensive support services for your laboratory success"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      <ServicesList />

      <ServicesSupport />

      <ContactCTA />
    </PageEntrance>
  );
}

