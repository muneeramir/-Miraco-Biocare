import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { products, getProductBySlug } from "@/data/products";

const divisionPaths: Record<string, string> = {
  "Clinical Diagnostics": "/clinical-diagnostics",
  "Life Sciences": "/life-sciences",
  Pharmaceuticals: "/pharmaceuticals",
  Genomics: "/genomics",
  Biotechnology: "/biotechnology",
};

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return createMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${slug}`,
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const divisionPath = divisionPaths[product.division] ?? "/";

  return (
    <>
      <PageHero
        title={product.name}
        subtitle={product.division}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: product.division, href: divisionPath },
          { label: product.name },
        ]}
        image={product.image}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <Link
            href={divisionPath}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-6")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {product.division}
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div>
              <Badge className="mb-3 capitalize bg-brand-primary">
                {product.category.replace("-", " ")}
              </Badge>
              <h2 className="text-2xl font-bold text-brand-text md:text-3xl">
                {product.name}
              </h2>
              <p className="mt-4 text-sm text-muted-foreground md:text-base">
                {product.description}
              </p>

              <div className="mt-6">
                <h3 className="mb-3 font-semibold text-brand-text">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((f) => (
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
                <h3 className="mb-3 font-semibold text-brand-text">Applications</h3>
                <ul className="space-y-2">
                  {product.applications.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/request-quotation"
                  className={cn(buttonVariants())}
                >
                  Request Quotation
                </Link>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
