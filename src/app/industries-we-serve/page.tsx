import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button, buttonVariants } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { industriesWeServe } from "@/data/industries";
import { MobileCarousel } from "@/components/shared/MobileCarousel";
import {
  Pill,
  Dna,
  GraduationCap,
  BookOpen,
  Microscope,
  FlaskConical,
  Activity,
  Globe,
  Heart,
  ShieldCheck,
  Wrench,
  Headphones,
  Settings,
  Users,
  ArrowRight,
} from "lucide-react";

export const metadata = createMetadata({
  title: "Industries We Serve",
  description:
    "Miraco Biocare delivers advanced laboratory equipment, biotechnology solutions, scientific instruments, clinical diagnostics, and research infrastructure to pharmaceutical companies, research labs, hospitals, and universities.",
  path: "/industries-we-serve",
});

const getIndustryIcon = (title: string) => {
  switch (title) {
    case "Pharmaceutical Companies":
      return Pill;
    case "Biotechnology Organizations":
      return Dna;
    case "Academic Institutions":
      return GraduationCap;
    case "Universities":
      return BookOpen;
    case "Research Laboratories":
      return Microscope;
    case "Clinical Laboratories":
      return FlaskConical;
    case "Hospitals":
      return Activity;
    case "Government Research Organizations":
      return Globe;
    case "Healthcare Institutions":
      return Heart;
    default:
      return Microscope;
  }
};

const getIndustryLink = (title: string) => {
  switch (title) {
    case "Pharmaceutical Companies":
      return "/pharmaceuticals";
    case "Biotechnology Organizations":
      return "/biotechnology";
    case "Clinical Laboratories":
      return "/clinical-diagnostics";
    case "Hospitals":
      return "/clinical-diagnostics";
    case "Healthcare Institutions":
      return "/clinical-diagnostics";
    case "Academic Institutions":
      return "/life-sciences";
    case "Universities":
      return "/life-sciences";
    case "Research Laboratories":
      return "/life-sciences";
    case "Government Research Organizations":
      return "/life-sciences";
    default:
      return "/products";
  }
};

const choicePoints = [
  {
    title: "Trusted Global Partnerships",
    description: "Partnering with world-leading manufacturers to supply state-of-the-art scientific instruments and clinical diagnostics technologies.",
    icon: Globe,
  },
  {
    title: "Quality Products & Solutions",
    description: "Delivering certified laboratory equipment and high-performance laboratory consumables that meet stringent quality and regulatory standards.",
    icon: ShieldCheck,
  },
  {
    title: "Technical Expertise",
    description: "Supported by a team of certified engineers and application specialists with deep knowledge in biotechnology solutions and clinical workflows.",
    icon: Wrench,
  },
  {
    title: "Reliable Support",
    description: "Comprehensive end-to-end services, including prompt maintenance, regular calibration, and technical support to ensure minimal downtime.",
    icon: Headphones,
  },
  {
    title: "Customized Solutions",
    description: "Tailoring our research infrastructure and diagnostic setups to match the specific workflow needs of your organization.",
    icon: Settings,
  },
  {
    title: "Strong Customer Focus",
    description: "Dedicated to cultivating long-term relationships through responsiveness, integrity, and shared commitment to healthcare advancement.",
    icon: Users,
  },
];

export default function IndustriesWeServePage() {
  return (
    <>
      <PageHero
        title="Industries We Serve"
        subtitle="Empowering scientific innovation and healthcare excellence across diverse industries through advanced technologies, laboratory solutions, and diagnostic systems."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries We Serve" },
        ]}
        image="/hero/banner-2.jpg"
      />

      {/* Introduction Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-block rounded-full bg-brand-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary">
              Who We Support
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-text sm:text-4xl">
              Partnering for Scientific and Clinical Excellence
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Miraco Biocare partners with organizations across the pharmaceutical,
              biotechnology, healthcare, diagnostics, and research sectors. Our solutions
              support scientific discovery, quality assurance, clinical excellence, and
              innovation by providing access to advanced instruments, laboratory equipment,
              diagnostics, consumables, and technical expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid Section */}
      <section className="section-padding bg-brand-light">
        <div className="container-custom">
          <SectionHeading
            label="Sectors & Organizations"
            title="Industries We Support"
            description="We deliver specialized technologies, laboratory equipment, and clinical diagnostics tailored to the unique requirements of each sector."
            align="center"
          />

          <MobileCarousel className="sm:grid-cols-2 lg:grid-cols-3" breakpoint="sm">
            {industriesWeServe.map((industry) => {
              const IconComponent = getIndustryIcon(industry.title);
              const href = getIndustryLink(industry.title);
              return (
                <Link
                  key={industry.title}
                  href={href}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-brand-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-md"
                >
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-text transition-colors duration-300 group-hover:text-brand-primary md:text-xl">
                      {industry.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {industry.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-brand-border/40 flex items-center justify-between text-xs font-semibold text-brand-secondary transition-colors duration-300 group-hover:text-brand-primary">
                    <span>Explore Solutions</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </MobileCarousel>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            label="Our Value Proposition"
            title="Why Organizations Choose Miraco Biocare"
            description="We combine world-class laboratory consumables, scientific instruments, and healthcare technologies with robust service support."
            align="center"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {choicePoints.map((point) => {
              const IconComponent = point.icon;
              return (
                <div
                  key={point.title}
                  className="flex gap-4 rounded-xl border border-brand-border bg-brand-light p-6 transition-all duration-300 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-text md:text-lg">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-primary to-brand-secondary py-16 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="container-custom relative text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Partner With Miraco Biocare
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/90 md:text-lg">
            Discover how our scientific, diagnostic, and healthcare solutions can support your
            organization’s goals and innovation initiatives.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full sm:w-auto bg-white text-brand-primary hover:bg-white/95 hover:text-brand-primary shadow-lg transition-transform active:scale-95"
              )}
            >
              Contact Us
            </Link>
            <Link
              href="/contact?subject=consultation"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "w-full sm:w-auto border-white text-white hover:bg-white/10 hover:text-white shadow-lg transition-transform active:scale-95"
              )}
            >
              Request Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
