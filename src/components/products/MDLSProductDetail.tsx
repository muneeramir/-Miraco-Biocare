import React from "react";
import Link from "next/link";
import {
  Check,
  ArrowLeft,
  Info,
  Settings,
  ListCollapse,
  Sparkles,
  FlaskConical,
  Activity,
  CheckCircle2,
} from "lucide-react";
import SafeImage from "@/components/shared/SafeImage";
import ProductBreadcrumb from "@/components/ProductBreadcrumb";
import RelatedProducts from "@/components/RelatedProducts";
import ProductActions from "@/components/ProductActions";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type Product } from "@/data/products";

const FEATURE_ICONS = [
  FlaskConical,
  Activity,
  Settings,
  Sparkles,
  CheckCircle2,
];

interface MDLSProductDetailProps {
  product: Product;
}

export default function MDLSProductDetail({ product }: MDLSProductDetailProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://www.miracobiocare.com${product.image}`,
    description: product.description,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "Miraco Biocare",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0.00",
      highPrice: "0.00",
      offerCount: "1",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-slate-50/50 pb-20 pt-0 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <div className="container-custom space-y-6">
          <div className="flex flex-col gap-4 border-b border-slate-200/60 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800/80">
            <ProductBreadcrumb
              items={[
                { label: "Products", href: "/products" },
                {
                  label: "Diagnostics & Life Sciences",
                  href: "/products/molecular-diagnostics-life-sciences",
                },
                { label: product.category },
                { label: product.name },
              ]}
            />
            <Link
              href="/products/molecular-diagnostics-life-sciences"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "w-fit self-start text-slate-500 hover:text-brand-primary sm:self-center"
              )}
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back to Catalog
            </Link>
          </div>

          <div className="mt-6 grid items-start gap-10 lg:grid-cols-12">
            <div className="space-y-6 lg:sticky lg:top-28 lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-md dark:border-slate-800/80 dark:bg-slate-900/60">
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-800/65 dark:bg-slate-900/40">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Product Actions
                </h4>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Generate technical documents or submit an RFQ quotation request for this product.
                </p>
                <ProductActions product={product} />
              </div>
            </div>

            <div className="space-y-8 lg:col-span-7">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-slate-900 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-white dark:bg-slate-800">
                    {product.division}
                  </Badge>
                  <Badge className="bg-brand-primary/10 px-2.5 py-0.5 text-xs font-semibold text-brand-primary hover:bg-brand-primary/10 dark:bg-brand-primary/20">
                    {product.category}
                  </Badge>
                  {product.subCategory && (
                    <Badge className="border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-normal text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                      {product.subCategory}
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl font-extrabold leading-tight text-slate-900 dark:text-slate-50 sm:text-3xl md:text-4xl">
                  {product.name}
                </h1>
                <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400 md:text-lg">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-brand-primary">
                  <Info className="h-4 w-4" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                    Key Features &amp; Capabilities
                  </h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {product.features?.map((feature, index) => {
                    const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
                    return (
                      <div
                        key={feature}
                        className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-855 dark:bg-slate-900/30"
                      >
                        <div className="shrink-0 rounded-lg bg-brand-primary/5 p-2 text-brand-primary dark:bg-brand-primary/10">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-350">
                          {feature}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {product.benefits && product.benefits.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-500">
                    <CheckCircle2 className="h-4 w-4" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                      Scientific &amp; Operational Benefits
                    </h3>
                  </div>
                  <div className="space-y-3.5 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-5">
                    {product.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <span className="text-sm leading-relaxed text-slate-650 dark:text-slate-350">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-brand-secondary">
                    <Settings className="h-4 w-4" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                      Technical Specifications
                    </h3>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-850 dark:bg-slate-900/20">
                    <table className="w-full border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60">
                          <th className="w-1/3 p-4 font-bold text-slate-800 dark:text-slate-200">
                            Parameter
                          </th>
                          <th className="p-4 font-bold text-slate-800 dark:text-slate-200">
                            Specification
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(product.specs).map(([key, value], idx) => (
                          <tr
                            key={key}
                            className={cn(
                              "border-b border-slate-200/60 last:border-none dark:border-slate-800/60",
                              idx % 2 === 1 ? "bg-slate-50/40 dark:bg-slate-900/10" : ""
                            )}
                          >
                            <td className="p-4 font-semibold text-slate-600 dark:text-slate-450">
                              {key}
                            </td>
                            <td className="p-4 leading-relaxed text-slate-700 dark:text-slate-300">
                              {value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {product.applications && product.applications.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-brand-primary">
                    <ListCollapse className="h-4 w-4" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                      Laboratory Use Cases &amp; Applications
                    </h3>
                  </div>
                  <div className="grid auto-rows-fr gap-3 sm:grid-cols-2">
                    {product.applications.map((app) => (
                      <div
                        key={app}
                        className="flex min-h-[3.25rem] items-start gap-3 rounded-lg border border-slate-200/50 bg-slate-100/50 px-4 py-3.5 dark:border-slate-850 dark:bg-slate-900/20"
                      >
                        <span
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-primary"
                          aria-hidden
                        />
                        <span className="min-w-0 flex-1 text-sm font-medium leading-relaxed text-slate-650 break-words dark:text-slate-350">
                          {app}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <RelatedProducts
            categorySlug={product.categorySlug || ""}
            currentProductSlug={product.slug}
          />
        </div>
      </div>
    </>
  );
}
