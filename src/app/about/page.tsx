import { createMetadata } from "@/lib/metadata";
import { PageEntrance } from "@/components/about/PageEntrance";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutWhoWeAre } from "@/components/about/AboutWhoWeAre";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutVisionMission } from "@/components/about/AboutVisionMission";
import { AboutWhyChoose } from "@/components/about/AboutWhyChoose";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { AboutLeadership } from "@/components/about/AboutLeadership";
import { AboutExpertise } from "@/components/about/AboutExpertise";
import { ContactCTA } from "@/components/shared/ContactCTA";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about Miraco Biocare Private Limited – our mission, vision, values, and expertise in pharmaceutical solutions, biotechnology, clinical diagnostics, and life sciences.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageEntrance>
      <AboutHero
        title="About Miraco Biocare"
        subtitle="Your trusted partner in healthcare, diagnostics, and life sciences"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      <AboutWhoWeAre />

      <AboutStats />

      <AboutVisionMission />

      <AboutWhyChoose />

      <AboutValues />

      <AboutTimeline />

      <AboutLeadership />

      <AboutExpertise />

      <ContactCTA />
    </PageEntrance>
  );
}

