// Centralized Molecular Diagnostics & Life Sciences (MDLS) Products Database
// Spelled and structured exactly to the specified product hierarchy.

import { resolveCatalogImageUrl } from "@/lib/product-image-design-system";

export interface MDLSProduct {
  slug: string;
  name: string;
  division: "Life Sciences" | "Molecular Diagnostics";
  divisionSlug: "life-sciences" | "molecular-diagnostics";
  category: string;
  categorySlug: string;
  subCategory?: string;
  description: string;
  features: string[];
  applications: string[];
  benefits: string[];
  specs: Record<string, string>;
  image: string;
  brochureUrl?: string;

  // Technical datasheet fields
  storageInfo?: string;
  productContents?: string[];
  orderingInfo?: string[];
  safetyInfo?: string[];
}

// Utility to generate URL-safe slugs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/™/g, "")
    .replace(/–/g, "-")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ----------------------------------------------------
// LIFE SCIENCES TEMPLATES
// ----------------------------------------------------

const purificationKitsTemplate = {
  division: "Life Sciences" as const,
  divisionSlug: "life-sciences" as const,
  category: "Purification Kits",
  categorySlug: "purification-kits",
  features: [
    "High-affinity silica membrane spin column technology",
    "Rapid extraction protocol completed in under 20 minutes",
    "Eliminates the use of hazardous phenol or chloroform",
    "Excellent purity with A260/A280 ratio between 1.8 and 2.0",
    "Highly concentrated eluted nucleic acids ready for immediate use",
  ],
  applications: [
    "Polymerase Chain Reaction (PCR) & qPCR",
    "Next-Generation Sequencing (NGS) library preparation",
    "Cloning, restriction digestion, and ligation",
    "Southern blotting, Northern blotting, and microarrays",
  ],
  benefits: [
    "Consistent and reliable recovery rates exceeding 85%",
    "Complete removal of PCR/qPCR inhibitors (salts, proteins, solvents)",
    "Standardized workflows compatible with laboratory automation protocols",
  ],
  specs: {
    "Technology": "Spin Column (Silica Membrane)",
    "Sample Type": "Blood, tissue, cells, bacteria, agarose gel, PCR reaction mix",
    "Starting Volume/Mass": "Up to 200 µl liquid sample / 100 mg tissue / 100 mg gel slice",
    "Elution Volume": "30 µl - 50 µl (adjustable for higher concentration)",
    "Yield/Purity": "A260/A280: 1.8-2.0, Yield up to 20 µg depending on source",
    "Operation Time": "15 to 20 minutes (centrifugation-based)",
    "Storage Conditions": "Room temperature (15-25°C) for columns & buffers, RNase A / Proteinase K at -20°C",
  },
  image: "/images/products/purification-kits.png",
};

const laddersTemplate = {
  division: "Life Sciences" as const,
  divisionSlug: "life-sciences" as const,
  category: "Ladders",
  categorySlug: "ladders",
  features: [
    "Ready-to-use format pre-mixed with loading dyes and tracking agents",
    "Sharp, well-defined bands for accurate molecular size estimation",
    "Reference bands with increased intensity for easy orientation",
    "Stable at room temperature for temporary storage",
    "Clear sizing range covering micro-fragments to large plasmids",
  ],
  applications: [
    "Molecular size verification of DNA fragments in agarose gels",
    "Molecular weight determination of proteins in SDS-PAGE",
    "Estimation of DNA/protein concentration based on band intensity",
    "Gel electrophoresis quality control",
  ],
  benefits: [
    "Saves preparation time; direct gel loading with no dilution or heating required",
    "High-contrast dyes allow visualization of migration front during runs",
    "Batch-to-batch consistency ensures dependable lane alignments every time",
  ],
  specs: {
    "Format": "Ready-to-use liquid",
    "Concentration": "approx. 0.1 µg/µl (DNA) or 0.2-0.4 mg/ml (Protein)",
    "Recommended Load": "3 - 5 µl per gel lane",
    "Tracking Dyes": "Bromophenol Blue, Xylene Cyanol FF (for DNA) or Coomassie (Protein)",
    "Sizing Range": "DNA: 50 bp to 10 kb; Protein: 10 kDa to 250 kDa",
    "Storage Conditions": "-20°C long term, 4°C for short term stability (up to 3 months)",
  },
  image: "/images/products/ladders.png",
};

const pcrMixesTemplate = {
  division: "Life Sciences" as const,
  divisionSlug: "life-sciences" as const,
  category: "PCR Master Mixes",
  categorySlug: "pcr-master-mixes",
  features: [
    "Concentrated 2X master mix format containing Taq DNA Polymerase, dNTPs, and MgCl2",
    "Optimized buffer chemistry to maximize specificity and product yield",
    "Optional inert tracking dyes (Coloured Mix) for direct gel loading after PCR",
    "High sensitivity, capable of amplifying low copy number targets",
    "Suitable for high-throughput laboratory assay screening workflows",
  ],
  applications: [
    "Routine DNA amplification & endpoint PCR",
    "Quantitative real-time PCR (qPCR) using green dye or hydrolysis probes",
    "High-throughput screening and genotyping",
    "Genomic DNA and cDNA amplification",
  ],
  benefits: [
    "Minimizes pipetting steps, reducing laboratory cross-contamination risk",
    "Improves assay reproducibility by eliminating mix preparation variances",
    "Allows direct loading on agarose gels (Coloured PCR mix) without separate loading dye",
  ],
  specs: {
    "Concentration": "2X concentrated master mix",
    "Polymerase Type": "Recombinant Taq DNA Polymerase",
    "Inhibitor Resistance": "Moderate tolerance to humic acid, blood components, and salts",
    "Extension Rate": "1 kb per minute at 72°C",
    "qPCR Detection Method": "Sybr/Green fluorescent dye-based or probe-compatible",
    "Storage Conditions": "-20°C in a non-frost-free freezer",
  },
  image: "/images/products/pcr-master-mixes.png",
};

const polymerasesTemplate = {
  division: "Life Sciences" as const,
  divisionSlug: "life-sciences" as const,
  category: "Modified DNA Polymerases",
  categorySlug: "modified-dna-polymerases",
  features: [
    "High-fidelity enzymes with 3' to 5' proofreading exonuclease activity",
    "Hot-start chemical/antibody modification to prevent non-specific amplification at low temps",
    "Extremely low error rates (up to 50x lower than standard Taq)",
    "Robust performance with complex templates or GC-rich structures",
    "Supplied with optimized reaction buffers containing magnesium",
  ],
  applications: [
    "High-fidelity PCR for cloning and site-directed mutagenesis",
    "Next-generation sequencing (NGS) library amplification",
    "Long-range PCR amplification of genomic fragments",
    "Multiplex PCR requiring high specificity",
  ],
  benefits: [
    "Virtually error-free amplification for critical sequencing workflows",
    "Allows room temperature PCR reaction assembly without non-specific products",
    "Reduces optimization time for challenging, GC-rich or secondary structure templates",
  ],
  specs: {
    "Enzyme Concentration": "2 U/µl (High Fidelity) or 5 U/µl (Hot Start)",
    "Fidelity": "50x standard Taq (High Fidelity); standard Taq (Hot Start)",
    "Hot-Start Mechanism": "Chemical or antibody-mediated inhibition",
    "Extension Speed": "15-30 seconds per kb (High Fidelity); 1 minute per kb (Hot Start)",
    "Product Ends": "Blunt-ended (High Fidelity) or 3'-A overhangs (Hot Start)",
    "Storage Conditions": "-20°C in storage buffer containing 50% glycerol",
  },
  image: "/images/products/pcr-master-mixes.png",
};

const rnaWorkflowTemplate = {
  division: "Life Sciences" as const,
  divisionSlug: "life-sciences" as const,
  category: "RNA Workflow",
  categorySlug: "rna-workflow",
  features: [
    "High-efficiency reverse transcriptases for full-length cDNA synthesis",
    "Monophasic phenol-guanidine reagent for total RNA isolation from multiple sources",
    "Robust first-strand synthesis from low-copy and complex RNA templates",
    "Optimized thermal stability up to 50°C to overcome secondary structures",
    "Complete kits including oligo(dT), random hexamer primers, and RNase inhibitors",
  ],
  applications: [
    "First-strand cDNA synthesis for RT-qPCR",
    "Total RNA isolation from cells, tissue, blood, or plant material",
    "RNA transcript analysis and gene expression profiling",
    "cDNA library construction and cloning",
  ],
  benefits: [
    "Yields high-purity total RNA free of DNA contamination (when treated with DNase)",
    "Ensures unbiased representation of low-abundance transcripts during RT",
    "Protects template RNA integrity with included high-potency RNase inhibitors",
  ],
  specs: {
    "Enzyme": "Recombinant M-MuLV Reverse Transcriptase",
    "Synthesis Capacity": "Up to 9.5 kb cDNA transcripts",
    "Optimal Reaction Temp": "37°C to 45°C",
    "RNA Isolation Method": "Liquid-phase monophasic organic extraction (Reagent)",
    "Starting Material": "100 mg tissue / 10^7 cells / 1 ml biological liquid",
    "Storage Conditions": "-20°C for enzymes and synthesis kits, 2-8°C for Isolation Reagent (darkness)",
  },
  image: "/images/products/purification-kits.png",
};

const platesSealersTemplate = {
  division: "Life Sciences" as const,
  divisionSlug: "life-sciences" as const,
  category: "Plates & Sealers",
  categorySlug: "plates-sealers",
  features: [
    "Ultra-thin polypropylene wells for rapid and uniform heat transfer",
    "High optical transparency for optimized signal detection in real-time PCR",
    "Medical-grade optical adhesive film with low autofluorescence",
    "Certified DNase, RNase, and human DNA-free for sample integrity",
    "Alphanumeric grid reference for easy sample identification",
  ],
  applications: [
    "Quantitative real-time PCR (qPCR) diagnostic screening",
    "Standard PCR amplification and thermocycling",
    "Sample storage and laboratory liquid handling automation",
    "High-throughput screening assays",
  ],
  benefits: [
    "Prevents sample evaporation with high-performance optical adhesive films",
    "Ensures consistent well-to-well thermal conductivity for reliable data",
    "Highly compatible with major thermal cycler brands and qPCR platforms",
  ],
  specs: {
    "Material": "USP Grade VI Polypropylene (Plates), Polyester/Acrylic (Adhesive Film)",
    "Well Volume": "0.1 ml (low profile), 0.2 ml (regular profile)",
    "Format": "96-well non-skirted or semi-skirted plates, 8-strip tubes",
    "Sealing Compatibility": "Optical adhesive film, heat sealing, or strip caps",
    "Refractive Index": "Optimized for optical detection in qPCR (Film)",
    "Storage Conditions": "Room temperature (15-30°C) in dry environment",
  },
  image: "/images/products/plates-sealers.png",
};

// ----------------------------------------------------
// MOLECULAR DIAGNOSTICS TEMPLATES
// ----------------------------------------------------

const rtPcrSingleplexTemplate = {
  division: "Molecular Diagnostics" as const,
  divisionSlug: "molecular-diagnostics" as const,
  category: "RT-PCR Singleplex",
  categorySlug: "rt-pcr-singleplex",
  features: [
    "High specificity primers and probe chemistry targeting a single pathogen gene",
    "Quantitative assay format with pre-quantified standard controls",
    "Includes internal amplification control (IAC) to monitor PCR inhibition",
    "Universal clinical thermal cycling protocol for parallel assay execution",
    "Compatible with a wide range of open real-time PCR instruments",
  ],
  applications: [
    "Clinical diagnostics and monitoring of viral loads",
    "Screening of transplant patients for opportunistic infections",
    "Specific pathogen identification in research and reference labs",
    "Microbiome profiling and targeted bacteria detection",
  ],
  benefits: [
    "Enables precise patient viral load monitoring over time",
    "Extremely high sensitivity: detects low copies of viral/bacterial genomes",
    "Streamlined diagnostic workflow with ready-to-use master mixes and standards",
  ],
  specs: {
    "Technology": "TaqMan probe-based Real-Time PCR",
    "Target": "Pathogen-specific DNA or RNA segment",
    "Sensitivity (LOD)": "Down to 10-50 copies/reaction",
    "Analytical Specificity": "100% homology with target sequence, no cross-reactivity with related pathogens",
    "Controls": "Internal Control, Negative Control, Positive/Standard Quantitation Controls",
    "Run Time": "Approx. 75 to 90 minutes",
    "Storage Conditions": "-20°C in a non-frost-free freezer, protect from light",
  },
  image: "/images/products/molecular-diagnostics.png",
};

const rtPcrMultiplexTemplate = {
  division: "Molecular Diagnostics" as const,
  divisionSlug: "molecular-diagnostics" as const,
  category: "RT-PCR Multiplex",
  categorySlug: "rt-pcr-multiplex",
  features: [
    "Simultaneous detection of multiple pathogens in a single reaction well",
    "Multi-channel fluorescence targeting distinct pathogen-specific genes",
    "Includes a comprehensive extraction and internal control system",
    "Optimized primer-probe combinations to prevent competitive inhibition",
    "High sensitivity matching singleplex diagnostic assays",
  ],
  applications: [
    "Syndromic testing of complex clinical presentation (e.g. respiratory, gastrointestinal)",
    "Rapid epidemiological screening in outbreaks or hospital infection control",
    "Comprehensive screening for sexually transmitted infections (STIs)",
    "Systemic infection and meningitis diagnostics requiring rapid answers",
  ],
  benefits: [
    "Reduces testing costs and turnaround time compared to separate tests",
    "Conserves valuable clinical sample volume by running multiplex screens",
    "Assists in prompt, targeted therapeutic decision making for patient care",
  ],
  specs: {
    "Technology": "Multiplex TaqMan probe-based Real-Time RT-PCR",
    "Channels Used": "FAM, HEX/VIC, ROX, Cy5 (depending on instrument specifications)",
    "Clinical Sensitivity": ">95% compared to reference sequencing methodologies",
    "Controls": "Internal Control, Positive Control, Negative Control",
    "Workflow": "Nucleic acid extraction followed by multiplex real-time amplification",
    "Storage Conditions": "-20°C in a non-frost-free freezer, protect from light",
  },
  image: "/images/products/molecular-diagnostics.png",
};

// ----------------------------------------------------
// PRODUCT DEFINITIONS
// ----------------------------------------------------

const mdlsProductsData: MDLSProduct[] = [
  // ----------------------------------------------------
  // Life Sciences - Purification Kits
  // ----------------------------------------------------
  {
    ...purificationKitsTemplate,
    name: "Genomic DNA Purification Kit",
    slug: "sciphi-genomic-dna-purification-kit",
    description: "High-performance spin-column kit for the rapid extraction of high-molecular-weight genomic DNA from blood, tissues, and cell cultures.",
    storageInfo: "Store spin columns and buffers at room temperature (15-25°C). Store reconstituted Proteinase K and RNase A reagents at -20°C for long-term stability. The kit is stable for up to 12 months from the date of manufacture when stored under these conditions.",
    productContents: [
      "Genomic Spin Columns (50/250 preps)",
      "Lysis Buffer L1",
      "Wash Buffer W1 (Concentrate)",
      "Wash Buffer W2 (Concentrate)",
      "Elution Buffer (10 mM Tris-HCl, pH 8.5)",
      "Proteinase K (Lyophilized)",
      "RNase A (Lyophilized)",
      "Reconstitution Buffer"
    ],
    orderingInfo: [
      "MBC-LS-GDNA-050: Genomic DNA Purification Kit (50 Preps)",
      "MBC-LS-GDNA-250: Genomic DNA Purification Kit (250 Preps)"
    ],
    safetyInfo: [
      "Lysis Buffer L1 contains guanidine hydrochloride, which is harmful if swallowed or in contact with skin. Wear standard protective gloves and eyewear.",
      "Do not add bleach or acidic solutions directly to sample preparation waste containing guanidine salts, as hazardous gas may be generated.",
      "In case of exposure, flush the affected area with copious amounts of water and consult a physician."
    ],
  },
  {
    ...purificationKitsTemplate,
    name: "RNA Purification Kit",
    slug: "sciphi-rna-purification-kit",
    description: "Rapid silica membrane extraction kit optimized for the isolation of highly pure total RNA free of proteins and genomic DNA contamination.",
  },
  {
    ...purificationKitsTemplate,
    name: "Plasmid Miniprep Kit",
    slug: "sciphi-plasmid-miniprep-kit",
    description: "Reliable plasmid purification system yielding transfection-grade plasmid DNA from bacterial lysates in a convenient spin-column format.",
  },
  {
    ...purificationKitsTemplate,
    name: "Gel Extraction Kit",
    slug: "sciphi-gel-extraction-kit",
    description: "Efficient DNA recovery system for extracting DNA fragments from agarose gel slices with high elution concentration and recovery rates.",
  },
  {
    ...purificationKitsTemplate,
    name: "PCR Purification Kit",
    slug: "sciphi-pcr-purification-kit",
    description: "Rapid cleanup kit designed to remove primers, nucleotides, enzymes, and salts from completed PCR amplification reactions.",
  },
  {
    ...purificationKitsTemplate,
    name: "Gel Extraction and PCR Purification Combo Kit",
    slug: "sciphi-gel-extraction-and-pcr-purification-combo-kit",
    description: "Versatile, dual-purpose purification kit offering reagents and columns to perform both gel extraction and PCR amplification cleanup.",
  },

  // ----------------------------------------------------
  // Life Sciences - Ladders
  // ----------------------------------------------------
  {
    ...laddersTemplate,
    name: "1 kb DNA Ladder – Ready to Use",
    slug: "sciphi-1-kb-dna-ladder-ready-to-use",
    description: "Pre-mixed, ready-to-load DNA molecular weight marker containing 13 fragments ranging from 250 bp to 10,000 bp with bright reference bands.",
  },
  {
    ...laddersTemplate,
    name: "100 bp DNA Ladder – Ready to Use",
    slug: "sciphi-100-bp-dna-ladder-ready-to-use",
    description: "Convenient DNA sizing ladder covering the 100 bp to 1,500 bp range, optimized for analyzing PCR products and smaller fragments.",
  },
  {
    ...laddersTemplate,
    name: "50 bp DNA Ladder – Ready to Use",
    slug: "sciphi-50-bp-dna-ladder-ready-to-use",
    description: "High-resolution DNA ladder for the sizing of very small DNA fragments, ranging from 50 bp to 500 bp, ideal for short amplicon verification.",
  },
  {
    ...laddersTemplate,
    name: "Prestained Protein Ladder – Broad Range",
    slug: "sciphi-prestained-protein-ladder-broad-range",
    description: "Prestained multi-color protein ladder containing 10 recombinant proteins from 10 kDa to 180 kDa, suitable for Western blot and SDS-PAGE analysis.",
    specs: {
      ...laddersTemplate.specs,
      "Sizing Range": "10 kDa to 180 kDa",
      "Colors": "Blue with orange (70 kDa) and green (10 kDa) reference bands",
      "Application": "Protein molecular weight estimation in SDS-PAGE and Western blot validation",
    }
  },

  // ----------------------------------------------------
  // Life Sciences - PCR Master Mixes
  // ----------------------------------------------------
  {
    ...pcrMixesTemplate,
    name: "PCR Master Mix (2x)",
    slug: "sciphi-pcr-master-mix-2x",
    description: "Ready-to-use 2x master mix containing Taq DNA Polymerase, dNTPs, reaction buffers, and magnesium ions for routine PCR amplification.",
  },
  {
    ...pcrMixesTemplate,
    name: "qPCR Master Mix (2x)",
    slug: "sciphi-qpcr-master-mix-2x",
    description: "High-performance qPCR master mix containing a green dye for real-time quantitative PCR applications on open-system thermal cyclers.",
    specs: {
      ...pcrMixesTemplate.specs,
      "Fluorophore Type": "SYBR Green I equivalent dye",
      "Platform Compatibility": "Universal (with/without ROX reference dye depending on setup)",
    }
  },
  {
    ...pcrMixesTemplate,
    name: "Coloured PCR Master Mix (2x)",
    slug: "sciphi-coloured-pcr-master-mix-2x",
    description: "Convenient 2x PCR master mix pre-mixed with an inert tracking dye, allowing direct gel loading of PCR products without adding loading buffer.",
  },

  // ----------------------------------------------------
  // Life Sciences - Modified DNA Polymerases
  // ----------------------------------------------------
  {
    ...polymerasesTemplate,
    name: "High Fidelity DNA Polymerase (2U/µl)",
    slug: "sciphi-high-fidelity-dna-polymerase-2u-l",
    description: "Engineered DNA polymerase with superior proofreading capability, delivering maximum accuracy and high yields for critical cloning applications.",
  },
  {
    ...polymerasesTemplate,
    name: "Hot Start DNA Polymerase (5U/µl)",
    slug: "sciphi-hot-start-dna-polymerase-5u-l",
    description: "Antibody-mediated hot-start Taq polymerase that remains inactive at room temperature, eliminating non-specific amplification and primer-dimers.",
  },

  // ----------------------------------------------------
  // Life Sciences - RNA Workflow
  // ----------------------------------------------------
  {
    ...rnaWorkflowTemplate,
    name: "RNA Isolation Reagent",
    slug: "sciphi-rna-isolation-reagent",
    description: "A complete, monophasic solution of phenol and guanidine isothiocyanate designed for the isolation of high-quality total RNA from cells and tissue.",
  },
  {
    ...rnaWorkflowTemplate,
    name: "First Strand cDNA Synthesis Kit",
    slug: "sciphi-first-strand-cdna-synthesis-kit",
    description: "Comprehensive kit containing all essential components, primers, and enzymes for highly efficient first-strand cDNA synthesis from RNA templates.",
  },
  {
    ...rnaWorkflowTemplate,
    name: "Reverse Transcription cDNA Synthesis Kit",
    slug: "sciphi-reverse-transcription-cdna-synthesis-kit",
    description: "Optimized reverse transcription kit featuring a simplified protocol to convert RNA into cDNA, ideal for routine gene expression profiling.",
  },
  {
    ...rnaWorkflowTemplate,
    name: "M-MuLV Reverse Transcriptase",
    slug: "sciphi-m-mulv-reverse-transcriptase",
    description: "Purified recombinant Moloney Murine Leukemia Virus Reverse Transcriptase with lower RNase H activity, optimized for cDNA synthesis.",
  },

  // ----------------------------------------------------
  // Life Sciences - Plates & Sealers
  // ----------------------------------------------------
  {
    ...platesSealersTemplate,
    name: "96-Well PCR Strip Plate (Clear, White)",
    slug: "sciphi-96-well-pcr-strip-plate-clear-white",
    description: "Precision-molded 96-well plates designed to combine the flexibility of strip tubes with the rigid format of standard plates.",
  },
  {
    ...platesSealersTemplate,
    name: "Optical 96-Well Reaction Plate (0.1 ml)",
    slug: "sciphi-optical-96-well-reaction-plate-01-ml",
    description: "Low-profile 96-well reaction plate optimized for fast thermal cycling and small sample volume real-time PCR applications.",
  },
  {
    ...platesSealersTemplate,
    name: "Optical 96-Well Reaction Plate (0.2 ml)",
    slug: "sciphi-optical-96-well-reaction-plate-02-ml",
    description: "Standard-profile 96-well PCR reaction plate designed for universal thermal cycler block compatibility and optimal heat transfer.",
  },
  {
    ...platesSealersTemplate,
    name: "Optical Adhesive Film",
    slug: "sciphi-optical-adhesive-film",
    description: "High-transparency pressure-sensitive adhesive film designed specifically to seal PCR plates during quantitative real-time PCR runs.",
  },

  // ----------------------------------------------------
  // Molecular Diagnostics - RT-PCR Singleplex
  // ----------------------------------------------------
  {
    ...rtPcrSingleplexTemplate,
    name: "Cytomegalovirus (CMV) Quantitative",
    slug: "cytomegalovirus-cmv-quantitative",
    description: "Quantitative real-time PCR kit for the sensitive detection and viral load monitoring of Cytomegalovirus (CMV) DNA in clinical samples.",
  },
  {
    ...rtPcrSingleplexTemplate,
    name: "BK Virus (BKV)",
    slug: "bk-virus-bkv",
    description: "Clinical real-time PCR kit designed for the detection and quantification of BK Virus (BKV) DNA, critical for transplant patient monitoring.",
  },
  {
    ...rtPcrSingleplexTemplate,
    name: "Varicella-Zoster Virus (VZV)",
    slug: "varicella-zoster-virus-vzv",
    description: "Specific probe-based real-time PCR assay for the qualitative detection of Varicella-Zoster Virus (VZV) DNA from lesion swabs and biological fluids.",
  },
  {
    ...rtPcrSingleplexTemplate,
    name: "Epstein-Barr Virus (EBV)",
    slug: "epstein-barr-virus-ebv",
    description: "Quantitative real-time PCR diagnostic assay for detecting and monitoring Epstein-Barr Virus (EBV) viral loads in plasma and whole blood samples.",
  },
  {
    ...rtPcrSingleplexTemplate,
    name: "John Cunningham Virus (JCV)",
    slug: "john-cunningham-virus-jcv",
    description: "Sensitive diagnostic assay designed to detect and quantify JC Virus (JCV) DNA to assist in risk assessment for progressive multifocal leukoencephalopathy (PML).",
  },
  {
    ...rtPcrSingleplexTemplate,
    name: "Parvovirus B19",
    slug: "parvovirus-b19",
    description: "Real-time PCR assay optimized for the qualitative and quantitative detection of Human Parvovirus B19 DNA in clinical serum or plasma samples.",
  },
  {
    ...rtPcrSingleplexTemplate,
    name: "Human Herpesvirus 6 (HHV-6)",
    slug: "human-herpesvirus-6-hhv-6",
    description: "Highly specific probe-based real-time PCR assay for the identification of Human Herpesvirus 6 (HHV-6) DNA, differentiating between HHV-6A and HHV-6B.",
  },
  {
    ...rtPcrSingleplexTemplate,
    name: "Herpes Simplex Virus 1 & 2 (HSV-1/HSV-2)",
    slug: "herpes-simplex-virus-1-2-hsv-1-hsv-2",
    description: "Duplex real-time PCR kit for the simultaneous detection and differentiation of Herpes Simplex Virus Type 1 and Type 2 DNA in a single run.",
  },
  {
    ...rtPcrSingleplexTemplate,
    name: "Human Herpesvirus 8 (HHV-8)",
    slug: "human-herpesvirus-8-hhv-8",
    description: "Qualitative real-time PCR assay designed for the detection of Human Herpesvirus 8 (HHV-8) DNA associated with Kaposi's sarcoma.",
  },
  {
    ...rtPcrSingleplexTemplate,
    name: "Microbiome Analysis",
    slug: "microbiome-analysis",
    description: "Targeted singleplex real-time PCR screening tool designed to detect and quantify specific indicator organisms within human microbiome samples.",
  },
  {
    ...rtPcrSingleplexTemplate,
    name: "Leishmania Detection",
    slug: "leishmania-detection",
    description: "Highly sensitive real-time PCR diagnostic assay for the qualitative detection of Leishmania species DNA in clinical blood or tissue biopsy samples.",
  },
  {
    ...rtPcrSingleplexTemplate,
    name: "COVID-19 Detection Kit",
    slug: "covid-19-detection-kit",
    description: "Highly sensitive one-step real-time RT-PCR assay for the qualitative detection and screening of SARS-CoV-2 RNA in respiratory specimens.",
    storageInfo: "Store the entire kit at -20°C in a dark, non-frost-free freezer. Avoid repeated freeze-thaw cycles of the master mix and primer/probe reagents. The reagents are stable for 12 months when stored properly.",
    productContents: [
      "COVID-19 One-Step RT-PCR Master Mix",
      "COVID-19 Primer & Probe Mix (targeting ORF1ab and N genes)",
      "Positive Control Template",
      "Negative Control (Nuclease-Free Water)",
      "Internal Control RNA"
    ],
    orderingInfo: [
      "MBC-MD-COV19-096: COVID-19 Detection Kit (96 Tests)",
      "MBC-MD-COV19-480: COVID-19 Detection Kit (480 Tests)"
    ],
    safetyInfo: [
      "For In Vitro Diagnostics (IVD) use only by clinical laboratory professionals.",
      "Handle all clinical specimens and controls as Biosafety Level 2 (BSL-2) biological agents. Wear appropriate personal protective equipment (PPE).",
      "Ensure proper disposal of all biohazard waste and standard decontamination of PCR instruments and surfaces."
    ],
  },

  // ----------------------------------------------------
  // Molecular Diagnostics - RT-PCR Multiplex
  // ----------------------------------------------------
  // Respiratory Panels
  {
    ...rtPcrMultiplexTemplate,
    name: "Respiratory 19 Panel",
    slug: "respiratory-19-panel",
    categorySlug: "respiratory-panels",
    subCategory: "Respiratory Panels",
    description: "Multiplex real-time RT-PCR assay for the simultaneous screening of 19 viral and bacterial respiratory pathogens in a single clinical workflow.",
  },
  {
    ...rtPcrMultiplexTemplate,
    name: "Respiratory 24 Panel",
    slug: "respiratory-24-panel",
    categorySlug: "respiratory-panels",
    subCategory: "Respiratory Panels",
    description: "Expanded multiplex diagnostic panel for the simultaneous detection of 24 distinct respiratory pathogens, including major influenza strains.",
    storageInfo: "Store all kit reagents at -20°C in a non-frost-free freezer. Protect the fluorophore-labeled probe mix from direct light exposure. Avoid repeated freeze-thaw cycles (limit to 5 cycles) to maintain optimal analytical sensitivity.",
    productContents: [
      "Respiratory 24 RT-PCR Master Mix",
      "Enzyme Mix (Reverse Transcriptase / Taq Polymerase)",
      "Respiratory 24 Primer & Probe Mix",
      "Positive Control Template",
      "Negative Control (Nuclease-Free Water)",
      "Internal Control RNA"
    ],
    orderingInfo: [
      "MBC-MD-RESP24-048: Respiratory 24 Panel (48 Tests)",
      "MBC-MD-RESP24-096: Respiratory 24 Panel (96 Tests)"
    ],
    safetyInfo: [
      "This kit is designed for In Vitro Diagnostics (IVD) use and should only be handled by trained laboratory personnel.",
      "All clinical samples and positive control materials must be treated as potentially infectious and handled under Biosafety Level 2 (BSL-2) containment.",
      "Dispose of all biological wastes and discarded reagents in accordance with standard medical biohazard waste regulations."
    ],
  },
  {
    ...rtPcrMultiplexTemplate,
    name: "Respiratory 21 Virus Panel",
    slug: "respiratory-21-virus-panel",
    categorySlug: "respiratory-panels",
    subCategory: "Respiratory Panels",
    description: "Comprehensive multiplex screening panel targeting 21 distinct viral respiratory pathogens from nasopharyngeal swabs or aspirates.",
  },
  {
    ...rtPcrMultiplexTemplate,
    name: "Respiratory 7 Panel",
    slug: "respiratory-7-panel",
    categorySlug: "respiratory-panels",
    subCategory: "Respiratory Panels",
    description: "Focused multiplex RT-PCR assay targeting the 7 most common viral respiratory infections, including RSV, Influenza A/B, and Adenovirus.",
  },
  {
    ...rtPcrMultiplexTemplate,
    name: "Respiratory Multiplex RT-PCR Panel",
    slug: "respiratory-multiplex-rt-pcr-panel",
    categorySlug: "respiratory-panels",
    subCategory: "Respiratory Panels",
    description: "Syndromic multiplex real-time RT-PCR screening kit for clinical laboratories managing large batches of acute respiratory infection screens.",
  },

  // Neurological Infection Panels
  {
    ...rtPcrMultiplexTemplate,
    name: "Meningitis/Encephalitis Panel",
    slug: "meningitis-encephalitis-panel",
    categorySlug: "neurological-infection-panels",
    subCategory: "Neurological Infection Panels",
    description: "Multiplex PCR panel for the rapid detection of bacterial, viral, and yeast pathogens directly from cerebrospinal fluid (CSF) specimens.",
  },
  {
    ...rtPcrMultiplexTemplate,
    name: "Meningitis Multiplex RT-PCR Panel",
    slug: "meningitis-multiplex-rt-pcr-panel",
    categorySlug: "neurological-infection-panels",
    subCategory: "Neurological Infection Panels",
    description: "Comprehensive clinical diagnostic kit for the rapid identification of multiple meningitis causative agents in urgent care settings.",
  },

  // Gastrointestinal Infection Panels
  {
    ...rtPcrMultiplexTemplate,
    name: "Gastroenteritis Panel",
    slug: "gastroenteritis-panel",
    categorySlug: "gastrointestinal-infection-panels",
    subCategory: "Gastrointestinal Infection Panels",
    description: "Multiplex molecular test designed for the detection of viral, bacterial, and parasitic pathogens causing acute gastroenteritis.",
  },
  {
    ...rtPcrMultiplexTemplate,
    name: "Gastroenteritis Multiplex RT-PCR Panel",
    slug: "gastroenteritis-multiplex-rt-pcr-panel",
    categorySlug: "gastrointestinal-infection-panels",
    subCategory: "Gastrointestinal Infection Panels",
    description: "High-throughput real-time PCR panel for screening multiple gastrointestinal pathogens from stool samples.",
  },

  // Bloodstream Infection Panels
  {
    ...rtPcrMultiplexTemplate,
    name: "Sepsis Panel",
    slug: "sepsis-panel",
    categorySlug: "bloodstream-infection-panels",
    subCategory: "Bloodstream Infection Panels",
    description: "Urgent multiplex molecular diagnostic assay for the rapid detection of bloodstream pathogens and associated antibiotic resistance genes.",
  },

  // Sexually Transmitted Infection Panels
  {
    ...rtPcrMultiplexTemplate,
    name: "STI Panel",
    slug: "sti-panel",
    categorySlug: "sexually-transmitted-infection-panels",
    subCategory: "Sexually Transmitted Infection Panels",
    description: "Multiplex RT-PCR kit for the simultaneous qualitative detection of major sexually transmitted bacterial and viral pathogens.",
  },
  {
    ...rtPcrMultiplexTemplate,
    name: "STD 12 Multiplex RT-PCR Panel",
    slug: "std-12-multiplex-rt-pcr-panel",
    categorySlug: "sexually-transmitted-infection-panels",
    subCategory: "Sexually Transmitted Infection Panels",
    description: "Comprehensive multiplex screening assay detecting 12 bacterial, viral, and protozoan causative agents of sexually transmitted diseases.",
  },

  // Urinary Tract Infection Panels
  {
    ...rtPcrMultiplexTemplate,
    name: "UTI Panel",
    slug: "uti-panel",
    categorySlug: "urinary-tract-infection-panels",
    subCategory: "Urinary Tract Infection Panels",
    description: "Multiplex PCR diagnostic panel targeting common urinary tract pathogens and associated antimicrobial resistance markers.",
  },

  // Tropical Disease Panels
  {
    ...rtPcrMultiplexTemplate,
    name: "Tropical Fever Panel",
    slug: "tropical-fever-panel",
    categorySlug: "tropical-disease-panels",
    subCategory: "Tropical Disease Panels",
    description: "Multiplex RT-PCR assay for the differential diagnosis of malaria, dengue, chikungunya, Zika, and other tropical vector-borne infections.",
  },

  // Transplant Monitoring Panels
  {
    ...rtPcrMultiplexTemplate,
    name: "Transplant Multiplex Panel",
    slug: "transplant-multiplex-panel",
    categorySlug: "transplant-monitoring-panels",
    subCategory: "Transplant Monitoring Panels",
    description: "Multiplex quantitative assay for monitoring major opportunistic viral pathogens (CMV, EBV, BKV) post-organ transplantation.",
  },
  {
    ...rtPcrMultiplexTemplate,
    name: "Transplant Multiplex RT-PCR Panel",
    slug: "transplant-multiplex-rt-pcr-panel",
    categorySlug: "transplant-monitoring-panels",
    subCategory: "Transplant Monitoring Panels",
    description: "Real-time multiplex RT-PCR assay for the quick, concurrent viral screening of immunocompromised patients.",
  },

  // Tuberculosis & Mycobacterial Panels
  {
    ...rtPcrMultiplexTemplate,
    name: "MTB/NTM Duplex RT-PCR Panel",
    slug: "mtb-ntm-duplex-rt-pcr-panel",
    categorySlug: "tuberculosis-mycobacterial-panels",
    subCategory: "Tuberculosis & Mycobacterial Panels",
    description: "Duplex real-time PCR assay for the differential detection of Mycobacterium tuberculosis complex (MTB) and non-tuberculous mycobacteria (NTM).",
  },

  // Antimicrobial Resistance Panels
  {
    ...rtPcrMultiplexTemplate,
    name: "Helicobacter pylori & Clarithromycin-Resistant Mutation RT-PCR Panel",
    slug: "helicobacter-pylori-clarithromycin-resistant-mutation-rt-pcr-panel",
    categorySlug: "antimicrobial-resistance-panels",
    subCategory: "Antimicrobial Resistance Panels",
    description: "Multiplex real-time PCR panel for the detection of Helicobacter pylori and identification of 23S rRNA point mutations conferring clarithromycin resistance.",
  },
  {
    ...rtPcrMultiplexTemplate,
    name: "Vancomycin-Resistant Enterococcus (VRE) Panel",
    slug: "vancomycin-resistant-enterococcus-vre-panel",
    categorySlug: "antimicrobial-resistance-panels",
    subCategory: "Antimicrobial Resistance Panels",
    description: "Multiplex real-time PCR diagnostic assay designed to detect and differentiate vanA and vanB resistance genes in Enterococci.",
  },
];

export const mdlsProducts: MDLSProduct[] = mdlsProductsData.map((product) => ({
  ...product,
  image: resolveCatalogImageUrl(product.slug),
}));
