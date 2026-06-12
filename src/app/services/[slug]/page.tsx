import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { IconResolver } from "@/components/shared/IconResolver";
import { Button, buttonVariants } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { services, getServiceBySlug } from "@/data/services";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return createMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        title={service.title}
        subtitle={service.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        image={service.image}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <Link
            href="/services"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-6")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary/10">
                <IconResolver name={service.icon} className="h-6 w-6 text-brand-primary" />
              </div>
              <h2 className="text-2xl font-bold text-brand-text">{service.title}</h2>
              <p className="mt-4 text-sm text-muted-foreground md:text-base">
                {service.description}
              </p>

              <div className="mt-6">
                <h3 className="mb-3 font-semibold">Service Features</h3>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="mb-3 font-semibold">Benefits</h3>
                <ul className="space-y-2">
                  {service.benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className={cn(buttonVariants(), "mt-8")}
              >
                Request This Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
