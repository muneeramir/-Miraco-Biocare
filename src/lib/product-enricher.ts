import { type Product } from "@/data/products";

/**
 * Generates an uppercase URL-safe alphanumeric code from the product name/slug
 */
function getShortName(product: Product): string {
  return product.slug
    .toUpperCase()
    .replace(/™/g, "")
    .replace(/[^A-Z0-9]/g, "")
    .substring(0, 8);
}

/**
 * Dynamically enriches a product with unique features, specs, applications,
 * storageInfo, productContents, orderingInfo, and safetyInfo if they are not explicitly defined.
 */
export function enrichProduct(product: Product): Product {
  // Clone to avoid mutating the original database object
  const enriched = { ...product };

  const name = enriched.name;
  const category = (enriched.categorySlug || enriched.category || "").toLowerCase();
  const isLifeScience = enriched.divisionSlug === "life-sciences" || enriched.division?.toLowerCase().includes("life");
  const divPrefix = isLifeScience ? "LS" : "MD";
  const shortCode = getShortName(enriched);

  // 1. DYNAMIC CATALOG NUMBER / ORDERING CODES
  if (!enriched.orderingInfo || enriched.orderingInfo.length === 0) {
    if (category.includes("purification") || category.includes("kit")) {
      enriched.orderingInfo = [
        `MBC-${divPrefix}-${shortCode}-050: ${name} (50 Preps)`,
        `MBC-${divPrefix}-${shortCode}-250: ${name} (250 Preps)`
      ];
    } else if (category.includes("ladder")) {
      enriched.orderingInfo = [
        `MBC-${divPrefix}-${shortCode}-500: ${name} (500 µl / 100 Lanes)`,
        `MBC-${divPrefix}-${shortCode}-2X5: ${name} (2 x 500 µl / 200 Lanes)`
      ];
    } else if (category.includes("pcr") || category.includes("polymerase") || category.includes("mix")) {
      enriched.orderingInfo = [
        `MBC-${divPrefix}-${shortCode}-100: ${name} (100 Reactions)`,
        `MBC-${divPrefix}-${shortCode}-500: ${name} (500 Reactions)`
      ];
    } else if (category.includes("plate") || category.includes("seal") || category.includes("adhes")) {
      enriched.orderingInfo = [
        `MBC-${divPrefix}-${shortCode}-100: ${name} (Pack of 100)`,
        `MBC-${divPrefix}-${shortCode}-500: ${name} (Pack of 500)`
      ];
    } else {
      // Default diagnostics / panels
      enriched.orderingInfo = [
        `MBC-${divPrefix}-${shortCode}-048: ${name} (48 Tests)`,
        `MBC-${divPrefix}-${shortCode}-096: ${name} (96 Tests)`
      ];
    }
  }

  // 2. DYNAMIC STORAGE INFORMATION
  if (!enriched.storageInfo) {
    if (category.includes("purification") || category.includes("kit")) {
      enriched.storageInfo = `Store spin columns and dry buffers at room temperature (15-25°C). Upon arrival, store reconstituted Proteinase K and RNase A enzymes at -20°C. Reagents are stable for 12 months under designated conditions.`;
    } else if (category.includes("ladder") || category.includes("pcr") || category.includes("polymerase") || category.includes("mix") || category.includes("workflow") || category.includes("transcription")) {
      enriched.storageInfo = `Store all components at -20°C in a non-frost-free freezer. Avoid repeated freeze-thaw cycles (limit to 5 cycles) to prevent degradation of enzymes/probes. Protect fluorophores from light.`;
    } else if (category.includes("plate") || category.includes("seal") || category.includes("adhes")) {
      enriched.storageInfo = `Store at room temperature (15-30°C) in a dry, clean, dust-free environment. Keep away from direct sunlight, corrosive vapors, or high-humidity areas.`;
    } else {
      // Diagnostic kits & panels
      enriched.storageInfo = `Store the kit and standard material at -20°C in a dark, non-frost-free freezer. The kit is stable until the expiration date printed on the outer packaging. Avoid freeze-thaw cycles.`;
    }
  }

  // 3. DYNAMIC PRODUCT CONTENTS
  if (!enriched.productContents || enriched.productContents.length === 0) {
    if (category.includes("purification")) {
      if (name.toLowerCase().includes("rna")) {
        enriched.productContents = [
          `RNA Spin Columns (50/250 preps)`,
          `Lysis Buffer RL1`,
          `Wash Buffer RW1`,
          `Wash Buffer RW2 (Concentrate)`,
          `RNase-Free Water`,
          `DNase I (Lyophilized)`,
          `Elution Buffer`
        ];
      } else if (name.toLowerCase().includes("plasmid")) {
        enriched.productContents = [
          `Plasmid Spin Columns (50/250 preps)`,
          `Resuspension Buffer P1`,
          `Lysis Buffer P2`,
          `Neutralization Buffer N3`,
          `Wash Buffer PB`,
          `Wash Buffer PE (Concentrate)`,
          `Elution Buffer EB`
        ];
      } else if (name.toLowerCase().includes("gel") && name.toLowerCase().includes("pcr")) {
        enriched.productContents = [
          `Combo Spin Columns (50/250 preps)`,
          `Gel Binding Buffer GB`,
          `PCR Binding Buffer PB`,
          `Wash Buffer W1`,
          `Wash Buffer W2 (Concentrate)`,
          `Elution Buffer`
        ];
      } else {
        enriched.productContents = [
          `Genomic Spin Columns (50/250 preps)`,
          `Lysis Buffer L1`,
          `Wash Buffer W1`,
          `Wash Buffer W2 (Concentrate)`,
          `Elution Buffer`,
          `Proteinase K`
        ];
      }
    } else if (category.includes("ladder")) {
      enriched.productContents = [
        `${name} (500 µl)`,
        `6X Loading Dye (1.5 ml)`
      ];
    } else if (category.includes("master mix") || category.includes("mix")) {
      enriched.productContents = [
        `${name} (2X Concentrated Master Mix)`,
        `Nuclease-Free Water`,
        `MgCl2 Solution (50 mM)`
      ];
    } else if (category.includes("polymerase")) {
      enriched.productContents = [
        `${name} (Enzyme Solution)`,
        `10X Reaction Buffer (with Mg2+)`,
        `Nuclease-Free Water`
      ];
    } else if (category.includes("transcription") || category.includes("cdna") || category.includes("reverse")) {
      enriched.productContents = [
        `${name} Enzyme Mix`,
        `5X RT Buffer`,
        `Oligo(dT) Primers`,
        `Random Hexamer Primers`,
        `DTT Solution`,
        `Nuclease-Free Water`
      ];
    } else if (category.includes("plate") || category.includes("seal") || category.includes("adhes")) {
      // Consumables don't have multiple contents inside, hide the contents section by setting undefined
      enriched.productContents = undefined;
    } else if (category.includes("singleplex") || category.includes("multiplex") || category.includes("panel") || category.includes("detection")) {
      enriched.productContents = [
        `${name} Master Mix`,
        `Specific Primer/Probe Mix`,
        `Positive Control Template`,
        `Negative Control (Nuclease-Free)`,
        `Internal Control RNA/DNA`
      ];
    } else {
      // Default fallback: Hide section if not applicable
      enriched.productContents = undefined;
    }
  }

  // 4. DYNAMIC SAFETY INFORMATION
  if (!enriched.safetyInfo || enriched.safetyInfo.length === 0) {
    if (category.includes("purification")) {
      enriched.safetyInfo = [
        `Buffers contain guanidine hydrochloride or chaotropic salts. Harmful if swallowed or absorbed through skin.`,
        `Do NOT add bleach, acids, or strong oxidizing chemicals to liquid waste containing sample lysis buffers.`,
        `Wear personal protective equipment (PPE) including safety goggles, disposable nitrile gloves, and a laboratory coat.`
      ];
    } else if (category.includes("rna workflow") || category.includes("isolation")) {
      enriched.safetyInfo = [
        `Contains toxic or corrosive substances (phenol, guanidine thiocyanate). Handle strictly in a certified chemical fume hood.`,
        `Avoid contact with eyes, skin, and clothing. Wear protective chemical-resistant gloves, goggles, and protective apparel.`,
        `Dispose of all chemical and extraction waste in designated organic hazard collection containers.`
      ];
    } else if (category.includes("plate") || category.includes("seal") || category.includes("adhes")) {
      // Plastic consumables have no safety hazards, hide safety section
      enriched.safetyInfo = undefined;
    } else if (category.includes("singleplex") || category.includes("multiplex") || category.includes("panel") || category.includes("diagnostics") || category.includes("detection")) {
      enriched.safetyInfo = [
        `For professional laboratory use and In Vitro Diagnostics (IVD) / Research Use Only (RUO).`,
        `Treat all clinical specimens, amplified products, and controls as biohazards. Handle under Biosafety Level 2 (BSL-2) guidelines.`,
        `Dispose of contaminated materials and PCR reaction wells in accordance with local biological medical waste regulations.`
      ];
    } else {
      // General fallbacks: standard laboratory safety
      enriched.safetyInfo = [
        `Handle in accordance with standard good laboratory hygiene and safety practices.`,
        `Wear appropriate protective equipment (gloves, safety glasses, lab coat) during handling.`,
        `Dispose of container contents in compliance with municipal and state laboratory safety guidelines.`
      ];
    }
  }

  // 5. CUSTOMIZE FEATURES & SPECS TO MAKE EACH PRODUCT UNIQUE
  if (enriched.features && enriched.features.length > 0) {
    enriched.features = enriched.features.map(f => {
      // Customize feature text to reference the product name if generic
      return f
        .replace(/silica membrane spin column/gi, `${name} membrane`)
        .replace(/nucleic acids/gi, name.toLowerCase().includes("rna") ? "RNA" : name.toLowerCase().includes("plasmid") ? "plasmid DNA" : "genomic DNA")
        .replace(/a single pathogen/gi, `the specific target of ${name}`)
        .replace(/multiple pathogens/gi, `the panels targeted by ${name}`)
        .replace(/molecular size verification/gi, `size verification using ${name}`);
    });
  }

  if (enriched.specs) {
    enriched.specs = { ...enriched.specs };
    // Customize technical specs to make them unique
    if (enriched.specs["Sample Type"] && name.toLowerCase().includes("blood")) {
      enriched.specs["Sample Type"] = "Whole blood, plasma, serum, buffy coat";
    }
    if (enriched.specs["Sample Type"] && name.toLowerCase().includes("tissue")) {
      enriched.specs["Sample Type"] = "Animal tissues, biopsy material, eukaryotic cell cultures";
    }
    if (enriched.specs["Target"]) {
      enriched.specs["Target"] = `${name} specific target sequence`;
    }
  }

  // 6. CUSTOMIZE APPLICATIONS TO MAKE EACH PRODUCT UNIQUE
  if (enriched.applications && enriched.applications.length > 0) {
    enriched.applications = enriched.applications.map(a => {
      return a
        .replace(/molecular size verification/gi, `sizing with ${name}`)
        .replace(/pathogen detection/gi, `pathogen screening for ${name}`)
        .replace(/specific pathogen identification/gi, `identifying the specific agent in ${name}`);
    });
  }

  return enriched;
}
