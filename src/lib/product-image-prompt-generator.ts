import { mdlsProducts, type MDLSProduct } from "@/data/mdls-products";
import {
  buildCatalogImagePrompt,
  resolveCatalogImagePath,
  type CatalogProductImageConfig,
  UNIVERSAL_NEGATIVE_PROMPT,
} from "@/lib/product-image-design-system";

export { resolveCatalogImagePath, PRODUCT_IMAGE_ALIASES } from "@/lib/product-image-design-system";

export interface ProductImagePromptEntry {
  slug: string;
  name: string;
  displayName: string;
  division: MDLSProduct["division"];
  category: string;
  categorySlug: string;
  categoryLabel: string;
  illustration: string;
  filename: string;
  imagePath: string;
  prompt: string;
  negativePrompt: string;
}

interface IllustrationRule {
  /** When set, only match against product name + slug (not description). */
  nameOnly?: boolean;
  match: (product: MDLSProduct, text: string) => boolean;
  illustration: string;
}

const ILLUSTRATION_RULES: IllustrationRule[] = [
  {
    nameOnly: true,
    match: (_, text) => /genomic\s+dna|gdna/.test(text),
    illustration:
      "elegant double-helix DNA strand graphic with base-pair rungs in blue and cyan gradient line art",
  },
  {
    nameOnly: true,
    match: (_, text) =>
      /gel extraction.*pcr|pcr purification.*gel|combo kit/.test(text),
    illustration:
      "combined gel extraction and PCR cleanup diagram with agarose band and purified amplicon in blue and cyan line art",
  },
  {
    nameOnly: true,
    match: (_, text) => /rna purification|rna spin|total rna kit/.test(text),
    illustration:
      "single-stranded RNA strand with loop structures and nucleotide nodes in blue and cyan gradient line art",
  },
  {
    nameOnly: true,
    match: (_, text) => /plasmid/.test(text),
    illustration:
      "circular plasmid DNA ring with orientation arrow and restriction site markers in blue and cyan line art",
  },
  {
    match: (_, text) => /gel extraction/.test(text),
    illustration:
      "agarose gel rectangle with bright DNA band being extracted in blue and cyan line art",
  },
  {
    match: (_, text) => /pcr purification/.test(text),
    illustration:
      "PCR amplicon cleanup diagram with primer removal arrows and purified DNA fragment in blue and cyan line art",
  },
  {
    match: (_, text) => /purification kit|spin column|extraction kit/.test(text),
    illustration:
      "nucleic acid purification workflow with silica spin column and eluted DNA helix in blue and cyan line art",
  },
  {
    match: (_, text) => /protein ladder|prestained.*ladder/.test(text),
    illustration:
      "SDS-PAGE protein ladder bands with multicolor reference markers in blue and cyan line art",
  },
  {
    match: (_, text) => /dna ladder|\d+\s*kb|\d+\s*bp.*ladder/.test(text),
    illustration:
      "agarose gel DNA ladder bands with molecular weight markers in blue and cyan line art",
  },
  {
    match: (_, text) => /ladder/.test(text),
    illustration:
      "molecular weight ladder bands for gel electrophoresis in blue and cyan line art",
  },
  {
    match: (_, text) => /qpcr|real-time pcr|sybr/.test(text),
    illustration:
      "real-time PCR amplification curve with fluorescence signal peaks in blue and cyan line art",
  },
  {
    match: (_, text) => /colou?red pcr|tracking dye/.test(text),
    illustration:
      "PCR master mix with inert tracking dye and direct gel-loading workflow in blue and cyan line art",
  },
  {
    match: (_, text) => /pcr master mix|2x.*master mix/.test(text),
    illustration:
      "PCR amplification diagram with exponential curve and DNA duplex in blue and cyan line art",
  },
  {
    match: (_, text) => /hot start/.test(text),
    illustration:
      "hot-start lock shield icon over DNA polymerase with activation arrow in blue and cyan line art",
  },
  {
    match: (_, text) => /high fidelity|proofreading/.test(text),
    illustration:
      "high-fidelity DNA polymerase with proofreading exonuclease and accurate DNA synthesis in blue and cyan line art",
  },
  {
    match: (_, text) => /polymerase|taq/.test(text),
    illustration:
      "DNA polymerase enzyme icon synthesizing DNA strand with directional arrow in blue and cyan line art",
  },
  {
    match: (_, text) => /reverse transcriptase|m-mulv/.test(text),
    illustration:
      "reverse transcriptase enzyme converting RNA template to cDNA strand in blue and cyan line art",
  },
  {
    match: (_, text) => /cdna|first strand|reverse transcription kit/.test(text),
    illustration:
      "RNA-to-cDNA synthesis workflow with RNA strand, primer, and cDNA output in blue and cyan line art",
  },
  {
    match: (_, text) => /rna isolation reagent|tri.?reagent|phenol.*guanidine/.test(text),
    illustration:
      "total RNA isolation reagent workflow with lysed cells and purified RNA strand in blue and cyan line art",
  },
  {
    match: (_, text) => /rt-pcr kit|rt pcr kit/.test(text),
    illustration:
      "two-step workflow showing RNA strand converting to cDNA then PCR amplification in blue and cyan line art",
  },
  {
    match: (_, text) => /ngs library|library prep/.test(text),
    illustration:
      "sequencing library prep flow with DNA fragments, adapters, and flowcell lanes in blue and cyan line art",
  },
  {
    match: (_, text) => /ngs.*dna|dna.*ngs/.test(text),
    illustration:
      "high-purity fragmented genomic DNA helix segments ready for sequencing in blue and cyan line art",
  },
  {
    match: (_, text) => /ngs.*rna|rna.*ngs/.test(text),
    illustration:
      "total RNA strands with mRNA highlight and sequencing read arrows in blue and cyan line art",
  },
  {
    match: (_, text) => /adhesive film|optical film|sealer/.test(text),
    illustration:
      "optical adhesive sealing film applied to 96-well PCR plate in blue and cyan line art",
  },
  {
    match: (_, text) => /96-well|well plate|strip plate|reaction plate/.test(text),
    illustration:
      "precision 96-well PCR plate grid with optical wells in blue and cyan line art",
  },
  {
    match: (_, text) => /covid|sars-cov/.test(text),
    illustration:
      "coronavirus spike particle with crown-like surface proteins in refined blue and cyan line art",
  },
  {
    match: (_, text) => /cytomegalovirus|\bcmv\b/.test(text),
    illustration:
      "cytomegalovirus envelope particle with dsDNA genome schematic in blue and cyan line art",
  },
  {
    match: (_, text) => /bk virus|\bbkv\b/.test(text),
    illustration:
      "BK polyomavirus icosahedral particle in blue and cyan line art",
  },
  {
    match: (_, text) => /varicella|zoster|\bvzv\b/.test(text),
    illustration:
      "varicella-zoster virus envelope virion in blue and cyan line art",
  },
  {
    match: (_, text) => /epstein.?barr|\bebv\b/.test(text),
    illustration:
      "Epstein-Barr virus envelope particle in blue and cyan line art",
  },
  {
    match: (_, text) => /john cunningham|\bjcv\b/.test(text),
    illustration:
      "JC polyomavirus particle with circular DNA genome in blue and cyan line art",
  },
  {
    match: (_, text) => /parvovirus/.test(text),
    illustration:
      "parvovirus B19 icosahedral capsid in blue and cyan line art",
  },
  {
    match: (_, text) => /herpesvirus 6|\bhhv-6\b/.test(text),
    illustration:
      "Human Herpesvirus 6 envelope virion in blue and cyan line art",
  },
  {
    match: (_, text) => /herpes simplex|\bhsv\b/.test(text),
    illustration:
      "herpes simplex virus envelope with dsDNA genome in blue and cyan line art",
  },
  {
    match: (_, text) => /herpesvirus 8|\bhhv-8\b/.test(text),
    illustration:
      "Human Herpesvirus 8 envelope virion in blue and cyan line art",
  },
  {
    match: (_, text) => /hepatitis b|\bhbv\b/.test(text),
    illustration:
      "hepatitis B virus spherical virion with surface antigen markers in blue and cyan line art",
  },
  {
    match: (_, text) => /hepatitis c|\bhcv\b/.test(text),
    illustration:
      "hepatitis C virus envelope particle with RNA genome schematic in blue and cyan line art",
  },
  {
    match: (_, text) => /\bhiv\b/.test(text),
    illustration:
      "retrovirus particle with conical core and RNA genome in blue and cyan line art",
  },
  {
    match: (_, text) => /human papillomavirus|\bhpv\b|papillomavirus/.test(text),
    illustration:
      "human papillomavirus icosahedral capsid particle in blue and cyan line art",
  },
  {
    match: (_, text) => /leishmania/.test(text),
    illustration:
      "Leishmania parasite flagellate morphology in blue and cyan line art",
  },
  {
    match: (_, text) => /microbiome/.test(text),
    illustration:
      "microbiome analysis graphic with diverse bacterial icons and target amplicon in blue and cyan line art",
  },
  {
    match: (_, text) => /respiratory/.test(text),
    illustration:
      "respiratory syndromic panel graphic with lung outline, airway branches, and multiple virus icons in blue and cyan line art",
  },
  {
    match: (_, text) => /meningitis|encephalitis/.test(text),
    illustration:
      "neurological infection panel graphic with brain outline and multiplex pathogen targets in blue and cyan line art",
  },
  {
    match: (_, text) => /gastroenteritis|gastrointestinal/.test(text),
    illustration:
      "GI pathogen multiplex graphic with intestine outline and bacterial and viral icons in blue and cyan line art",
  },
  {
    match: (_, text) => /sepsis|bloodstream/.test(text),
    illustration:
      "bloodstream infection panel graphic with bloodstream pathway and bacterial targets in blue and cyan line art",
  },
  {
    match: (_, text) => /\bsti\b|std|sexually transmitted/.test(text),
    illustration:
      "multiplex STI pathogen detection graphic with multiple target markers in blue and cyan line art",
  },
  {
    match: (_, text) => /\buti\b|urinary tract/.test(text),
    illustration:
      "urinary tract infection panel graphic with bladder outline and uropathogen icons in blue and cyan line art",
  },
  {
    match: (_, text) => /tropical fever|tropical disease|dengue|malaria|chikungunya|zika/.test(text),
    illustration:
      "tropical fever syndromic panel with mosquito-borne pathogen icons and fever waveform in blue and cyan line art",
  },
  {
    match: (_, text) => /transplant/.test(text),
    illustration:
      "transplant monitoring panel graphic with multiplex viral load targets in blue and cyan line art",
  },
  {
    match: (_, text) => /mtb|ntm|mycobacterial|tuberculosis/.test(text),
    illustration:
      "mycobacterium rod-shaped bacilli with duplex detection schematic in blue and cyan line art",
  },
  {
    match: (_, text) => /helicobacter|h\.?\s*pylori/.test(text),
    illustration:
      "Helicobacter pylori spiral bacterium with resistance mutation marker in blue and cyan line art",
  },
  {
    match: (_, text) => /vancomycin|\bvre\b|antimicrobial resistance/.test(text),
    illustration:
      "antimicrobial resistance gene detection graphic with resistance marker icons in blue and cyan line art",
  },
  {
    match: (_, text) => /multiplex|panel|duplex/.test(text),
    illustration:
      "multiplex TaqMan panel graphic with multi-channel fluorescence target dots in blue and cyan line art",
  },
  {
    match: (_, text) => /detection kit|quantitative|real-time|rt-pcr|diagnostic/.test(text),
    illustration:
      "molecular diagnostic target detection graphic with probe hybridization and amplification in blue and cyan line art",
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  "purification-kits": "PURIFICATION KITS",
  ladders: "MOLECULAR LADDERS",
  "pcr-master-mixes": "PCR & MOLECULAR BIOLOGY",
  "modified-dna-polymerases": "PCR & MOLECULAR BIOLOGY",
  "rna-workflow": "RNA WORKFLOW",
  "plates-sealers": "LAB CONSUMABLES",
  "rt-pcr-singleplex": "MOLECULAR DIAGNOSTICS",
  "rt-pcr-multiplex": "MOLECULAR DIAGNOSTICS",
  "respiratory-panels": "MOLECULAR DIAGNOSTICS",
  "neurological-infection-panels": "MOLECULAR DIAGNOSTICS",
  "gastrointestinal-infection-panels": "MOLECULAR DIAGNOSTICS",
  "bloodstream-infection-panels": "MOLECULAR DIAGNOSTICS",
  "sexually-transmitted-infection-panels": "MOLECULAR DIAGNOSTICS",
  "urinary-tract-infection-panels": "MOLECULAR DIAGNOSTICS",
  "tropical-disease-panels": "MOLECULAR DIAGNOSTICS",
  "transplant-monitoring-panels": "MOLECULAR DIAGNOSTICS",
  "tuberculosis-mycobacterial-panels": "MOLECULAR DIAGNOSTICS",
  "antimicrobial-resistance-panels": "MOLECULAR DIAGNOSTICS",
};

function productNameText(product: MDLSProduct): string {
  return [product.name, product.slug, product.category, product.categorySlug]
    .join(" ")
    .toLowerCase()
    .replace(/™/g, "")
    .replace(/–/g, "-");
}

function normalizeSearchText(product: MDLSProduct): string {
  return [
    product.name,
    product.slug,
    product.category,
    product.categorySlug,
    product.subCategory ?? "",
    product.description,
  ]
    .join(" ")
    .toLowerCase()
    .replace(/™/g, "")
    .replace(/–/g, "-");
}

export function formatDisplayName(name: string): string {
  return name
    .replace(/™/g, "")
    .replace(/^SciPhi\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function resolveCategoryLabel(product: MDLSProduct): string {
  if (CATEGORY_LABELS[product.categorySlug]) {
    return CATEGORY_LABELS[product.categorySlug];
  }

  if (product.divisionSlug === "molecular-diagnostics") {
    return "MOLECULAR DIAGNOSTICS";
  }

  return product.category
    .replace(/&/g, "AND")
    .replace(/[^\w\s-]/g, "")
    .toUpperCase();
}

export function resolveIllustration(product: MDLSProduct): string {
  const nameText = productNameText(product);
  const fullText = normalizeSearchText(product);

  for (const rule of ILLUSTRATION_RULES) {
    const text = rule.nameOnly ? nameText : fullText;
    if (rule.match(product, text)) {
      return rule.illustration;
    }
  }

  if (product.divisionSlug === "molecular-diagnostics") {
    return "clinical molecular diagnostic assay graphic with probe-based target detection in blue and cyan line art";
  }

  return "life-sciences product icon with DNA helix and molecular workflow motif in blue and cyan line art";
}

export function buildCatalogConfigFromProduct(
  product: MDLSProduct
): CatalogProductImageConfig {
  const displayName = formatDisplayName(product.name);

  return {
    slug: product.slug,
    name: displayName,
    categoryLabel: resolveCategoryLabel(product),
    illustration: resolveIllustration(product),
    filename: `${product.slug}.png`,
  };
}

export function buildCatalogImagePromptFromProduct(product: MDLSProduct): string {
  return buildCatalogImagePrompt(buildCatalogConfigFromProduct(product));
}

export function generateProductImagePromptEntry(
  product: MDLSProduct
): ProductImagePromptEntry {
  const config = buildCatalogConfigFromProduct(product);

  return {
    slug: product.slug,
    name: product.name,
    displayName: config.name,
    division: product.division,
    category: product.category,
    categorySlug: product.categorySlug,
    categoryLabel: config.categoryLabel,
    illustration: config.illustration,
    filename: config.filename,
    imagePath: resolveCatalogImagePath(product.slug),
    prompt: buildCatalogImagePrompt(config),
    negativePrompt: UNIVERSAL_NEGATIVE_PROMPT,
  };
}

export function generateAllCatalogImagePrompts(
  products: MDLSProduct[] = mdlsProducts
): ProductImagePromptEntry[] {
  return products.map(generateProductImagePromptEntry);
}
