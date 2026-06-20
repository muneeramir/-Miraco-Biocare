import { products, type Product } from "@/data/products";

/**
 * Returns all products belonging to the Molecular Diagnostics & Life Sciences divisions.
 */
export function getMDLSProducts(): Product[] {
  return products.filter(
    (p) => p.divisionSlug === "life-sciences" || p.divisionSlug === "molecular-diagnostics"
  );
}

/**
 * Finds a specific Molecular Diagnostics & Life Sciences product by division, category, and slug.
 */
export function getMDLSProductBySlug(
  divisionSlug: string,
  categorySlug: string,
  slug: string
): Product | undefined {
  return products.find(
    (p) =>
      p.divisionSlug === divisionSlug &&
      p.categorySlug === categorySlug &&
      p.slug === slug
  );
}

/**
 * Canonical detail URL for catalog (MDLS) products.
 */
export function getProductDetailHref(product: Product): string {
  if (product.divisionSlug && product.categorySlug) {
    return `/products/${product.divisionSlug}/${product.categorySlug}/${product.slug}`;
  }

  return `/products/${product.slug}`;
}

/**
 * Gets related products in the same category, excluding the current product.
 * Returns up to 4 products.
 */
export function getRelatedMDLSProducts(
  categorySlug: string,
  excludeSlug: string
): Product[] {
  return products
    .filter((p) => p.categorySlug === categorySlug && p.slug !== excludeSlug)
    .slice(0, 4);
}
