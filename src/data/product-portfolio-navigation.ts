import { mdlsProducts } from "@/data/mdls-products";

export interface PortfolioNavLink {
  title: string;
  href: string;
}

export interface PortfolioNavCategory {
  id: string;
  title: string;
  href?: string;
  /** Direct product links when this category has no subcategories */
  products?: PortfolioNavLink[];
  /** Nested categories (e.g. Life Sciences → Purification Kits) */
  subcategories?: PortfolioNavCategory[];
}

export interface ProductPortfolioNavSection {
  title: string;
  href: string;
  description?: string;
  categories: PortfolioNavCategory[];
}

export const MDLS_CATALOG_HREF = "/products/molecular-diagnostics-life-sciences";

function productHref(divisionSlug: string, categorySlug: string, slug: string): string {
  return `/products/${divisionSlug}/${categorySlug}/${slug}`;
}

function toNavLink(product: (typeof mdlsProducts)[number]): PortfolioNavLink {
  return {
    title: product.name.replace(/™/g, "").trim(),
    href: productHref(product.divisionSlug, product.categorySlug, product.slug),
  };
}

function productsByCategory(divisionSlug: string, categorySlug: string): PortfolioNavLink[] {
  return mdlsProducts
    .filter((p) => p.divisionSlug === divisionSlug && p.categorySlug === categorySlug)
    .map(toNavLink);
}

function productsByCategories(divisionSlug: string, categorySlugs: string[]): PortfolioNavLink[] {
  return mdlsProducts
    .filter((p) => p.divisionSlug === divisionSlug && categorySlugs.includes(p.categorySlug))
    .map(toNavLink);
}

function productsBySlugs(slugs: string[]): PortfolioNavLink[] {
  const order = new Map(slugs.map((slug, index) => [slug, index]));
  return mdlsProducts
    .filter((p) => slugs.includes(p.slug))
    .sort((a, b) => (order.get(a.slug) ?? 999) - (order.get(b.slug) ?? 999))
    .map((product) => ({
      title:
        NAV_PRODUCT_TITLE_OVERRIDES[product.slug] ??
        product.name.replace(/™/g, "").trim(),
      href: productHref(product.divisionSlug, product.categorySlug, product.slug),
    }));
}

const NAV_PRODUCT_TITLE_OVERRIDES: Record<string, string> = {
  "sti-panel": "STI Multiplex Panel",
  "gastroenteritis-panel": "Gastrointestinal Pathogen Panel",
};

/** Featured multiplex panels shown first in navigation (remaining panels follow). */
const FEATURED_MULTIPLEX_SLUGS = [
  "respiratory-19-panel",
  "respiratory-24-panel",
  "sti-panel",
  "gastroenteritis-panel",
  "tropical-fever-panel",
];

function multiplexNavProducts(): PortfolioNavLink[] {
  return productsBySlugs(FEATURED_MULTIPLEX_SLUGS);
}

export const productPortfolioNavigation: ProductPortfolioNavSection = {
  title: "Molecular Diagnostics & Life Sciences",
  href: MDLS_CATALOG_HREF,
  description: "Life sciences reagents, kits, and molecular diagnostic assays.",
  categories: [
    {
      id: "life-sciences",
      title: "Life Sciences",
      href: `${MDLS_CATALOG_HREF}?division=life-sciences`,
      subcategories: [
        {
          id: "purification-kits",
          title: "Purification Kits",
          href: `${MDLS_CATALOG_HREF}?division=life-sciences&category=purification-kits`,
          products: productsBySlugs([
            "sciphi-genomic-dna-purification-kit",
            "sciphi-rna-purification-kit",
            "sciphi-plasmid-miniprep-kit",
            "sciphi-gel-extraction-kit",
            "sciphi-pcr-purification-kit",
          ]),
        },
        {
          id: "pcr-molecular-biology",
          title: "PCR & Molecular Biology",
          href: `${MDLS_CATALOG_HREF}?division=life-sciences&category=pcr-master-mixes`,
          products: productsByCategories("life-sciences", [
            "pcr-master-mixes",
            "modified-dna-polymerases",
          ]),
        },
        {
          id: "ngs",
          title: "NGS",
          href: `${MDLS_CATALOG_HREF}?division=life-sciences`,
          products: productsBySlugs([
            "ngs-library-preparation-kit",
            "ngs-dna-extraction-kit",
            "ngs-rna-extraction-kit",
          ]),
        },
      ],
    },
    {
      id: "rt-pcr-singleplex",
      title: "RT-PCR Singleplex",
      href: `${MDLS_CATALOG_HREF}?division=molecular-diagnostics&category=rt-pcr-singleplex`,
      products: productsBySlugs([
        "covid-19-detection-kit",
        "hbv-detection-kit",
        "hcv-detection-kit",
        "hiv-detection-kit",
        "hpv-detection-kit",
      ]).concat(
        productsByCategory("molecular-diagnostics", "rt-pcr-singleplex").filter(
          (link) => {
            const slug = link.href.split("/").pop() ?? "";
            return ![
              "covid-19-detection-kit",
              "hbv-detection-kit",
              "hcv-detection-kit",
              "hiv-detection-kit",
              "hpv-detection-kit",
            ].includes(slug);
          }
        )
      ),
    },
    {
      id: "rt-pcr-multiplex",
      title: "RT-PCR Multiplex",
      href: `${MDLS_CATALOG_HREF}?division=molecular-diagnostics`,
      products: multiplexNavProducts(),
    },
  ],
};

export function isProductPortfolioPath(pathname: string): boolean {
  return (
    pathname === "/products" ||
    pathname.startsWith("/products/molecular-diagnostics-life-sciences") ||
    pathname.startsWith("/products/life-sciences") ||
    pathname.startsWith("/products/molecular-diagnostics")
  );
}
