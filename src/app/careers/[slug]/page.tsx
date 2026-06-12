import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Briefcase, ArrowLeft, Check } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { careers, getCareerBySlug } from "@/data/careers";

interface CareerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return careers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CareerPageProps) {
  const { slug } = await params;
  const career = getCareerBySlug(slug);
  if (!career) return {};
  return createMetadata({
    title: career.title,
    description: career.description,
    path: `/careers/${slug}`,
  });
}

export default async function CareerDetailPage({ params }: CareerPageProps) {
  const { slug } = await params;
  const career = getCareerBySlug(slug);
  if (!career) notFound();

  return (
    <>
      <PageHero
        title={career.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: career.title },
        ]}
        image="/hero/banner-4.jpg"
      />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <Link
            href="/careers"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-6")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Careers
          </Link>

          <div className="mb-6 flex flex-wrap gap-3">
            <Badge className="bg-brand-primary">{career.department}</Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {career.location}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              {career.type}
            </span>
          </div>

          <p className="text-sm text-muted-foreground md:text-base">
            {career.description}
          </p>

          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold text-brand-text">
              Responsibilities
            </h3>
            <ul className="space-y-2">
              {career.responsibilities.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold text-brand-text">
              Requirements
            </h3>
            <ul className="space-y-2">
              {career.requirements.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "mt-8")}
          >
            Apply Now
          </Link>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
