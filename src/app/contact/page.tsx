import { Mail, Phone, Globe, MapPin } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { createMetadata } from "@/lib/metadata";
import { company } from "@/data/company";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Contact Miraco Biocare Private Limited for healthcare, diagnostics, and life science solutions.",
  path: "/contact",
});

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    values: company.email.split(";").map((e) => e.trim()),
    type: "email",
  },
  {
    icon: Phone,
    label: "Phone",
    values: company.phone.split(",").map((p) => p.trim()),
    type: "phone",
  },
  {
    icon: Globe,
    label: "Website",
    values: [company.website],
    type: "website",
  },
  {
    icon: MapPin,
    label: "Address",
    values: [company.address.full],
    type: "address",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's Advance Healthcare Together"
        subtitle={company.contactIntro}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        image="/hero/banner-1.jpg"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <SectionHeading
                label="Get in Touch"
                title="Contact Information"
                description={company.tagline}
              />
              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const getHref = (val: string) => {
                    if (info.type === "email") return `mailto:${val}`;
                    if (info.type === "phone") return `tel:${val}`;
                    if (info.type === "website") return `https://${val}`;
                    return `https://maps.google.com/?q=${encodeURIComponent(val)}`;
                  };

                  const isLinkCard = info.type === "address" || info.type === "website";

                  const cardContent = (
                    <>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                        <info.icon className="h-5 w-5 text-brand-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-brand-text">{info.label}</p>
                        <div className="flex flex-col gap-1 mt-0.5">
                          {info.values.map((val) =>
                            !isLinkCard ? (
                              <a
                                key={val}
                                href={getHref(val)}
                                className="text-sm text-muted-foreground hover:text-brand-primary transition-colors"
                              >
                                {val}
                              </a>
                            ) : (
                              <span key={val} className="text-sm text-muted-foreground">
                                {val}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  );

                  if (isLinkCard) {
                    return (
                      <a
                        key={info.label}
                        href={getHref(info.values[0])}
                        target={info.type === "address" ? "_blank" : undefined}
                        rel={info.type === "address" ? "noopener noreferrer" : undefined}
                        className="flex items-start gap-4 rounded-lg border border-brand-border p-4 transition-colors hover:border-brand-primary/30"
                      >
                        {cardContent}
                      </a>
                    );
                  }

                  return (
                    <div
                      key={info.label}
                      className="flex items-start gap-4 rounded-lg border border-brand-border p-4 transition-colors"
                    >
                      {cardContent}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 overflow-hidden rounded-lg border border-brand-border">
              <iframe
  title="Miraco Biocare Office Location"
  src={`https://maps.google.com/maps?q=${encodeURIComponent(company.address.full)}&z=15&output=embed`}
  className="h-48 w-full md:h-64"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
              </div>
            </div>

            <div className="rounded-lg border border-brand-border bg-brand-light p-4 md:p-6">
              <h3 className="mb-4 text-lg font-semibold text-brand-text">
                Send Us a Message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
