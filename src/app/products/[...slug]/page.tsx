import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import LegacyProductDetail from "@/components/products/LegacyProductDetail";
import MDLSProductDetail from "@/components/products/MDLSProductDetail";
import { createMetadata } from "@/lib/metadata";
import { enrichProduct } from "@/lib/product-enricher";
import {
  getMDLSProductBySlug,
  getMDLSProducts,
  getProductDetailHref,
} from "@/lib/product-utils";
import { getProductBySlug, products } from "@/data/products";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

function getLegacyProducts() {
  return products.filter((product) => !product.divisionSlug || !product.categorySlug);
}

export async function generateStaticParams() {
  const legacyParams = getLegacyProducts().map((product) => ({
    slug: [product.slug],
  }));

  const mdlsParams = getMDLSProducts().map((product) => ({
    slug: [product.divisionSlug!, product.categorySlug!, product.slug],
  }));

  return [...legacyParams, ...mdlsParams];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: segments } = await params;

  if (segments.length === 3) {
    const [divisionSlug, categorySlug, productSlug] = segments;
    const product = getMDLSProductBySlug(divisionSlug, categorySlug, productSlug);
    if (!product) return {};

    return createMetadata({
      title: `${product.name} | ${product.category}`,
      description: product.description,
      path: `/products/${divisionSlug}/${categorySlug}/${productSlug}`,
    });
  }

  if (segments.length === 1) {
    const product = getProductBySlug(segments[0]);
    if (!product) return {};

    return createMetadata({
      title: product.name,
      description: product.description,
      path: `/products/${segments[0]}`,
    });
  }

  return {};
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug: segments } = await params;

  if (segments.length === 3) {
    const [divisionSlug, categorySlug, productSlug] = segments;
    const rawProduct = getMDLSProductBySlug(divisionSlug, categorySlug, productSlug);
    if (!rawProduct) notFound();

    return <MDLSProductDetail product={enrichProduct(rawProduct)} />;
  }

  if (segments.length === 2) {
    const [divisionSlug, categorySlug] = segments;
    permanentRedirect(
      `/products/molecular-diagnostics-life-sciences?division=${divisionSlug}&category=${categorySlug}`
    );
  }

  if (segments.length === 1) {
    if (segments[0] === "life-sciences" || segments[0] === "molecular-diagnostics") {
      permanentRedirect(
        `/products/molecular-diagnostics-life-sciences?division=${segments[0]}`
      );
    }

    const rawProduct = getProductBySlug(segments[0]);
    if (!rawProduct) notFound();

    if (rawProduct.divisionSlug && rawProduct.categorySlug) {
      permanentRedirect(getProductDetailHref(rawProduct));
    }

    return <LegacyProductDetail product={enrichProduct(rawProduct)} />;
  }

  notFound();
}
