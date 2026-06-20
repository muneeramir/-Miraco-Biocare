/**
 * Verify all catalog product images exist and report coverage.
 */

import { existsSync, readFileSync } from "node:fs";
import { join, basename } from "node:path";
import { PRODUCT_IMAGE_ALIASES } from "../src/lib/product-image-design-system";

const projectRoot = process.cwd();
const productsDir = join(projectRoot, "public/images/products");
const promptsPath = join(projectRoot, "src/data/product-image-prompts.json");

interface PromptEntry {
  slug: string;
  name: string;
  imagePath: string;
}

const prompts = JSON.parse(readFileSync(promptsPath, "utf8")) as PromptEntry[];

let found = 0;
const missing: string[] = [];

for (const entry of prompts) {
  const filename = basename(entry.imagePath);
  const path = join(productsDir, filename);

  if (existsSync(path)) {
    found += 1;
  } else {
    missing.push(`${entry.slug} → ${filename}`);
  }
}

console.log(`Catalog images: ${found}/${prompts.length} present in public/images/products/`);

if (missing.length > 0) {
  console.log("\nMissing:");
  for (const line of missing) {
    console.log(`  - ${line}`);
  }
  process.exit(1);
}

console.log("All catalog product images are present.");
console.log(
  `Alias mappings: ${Object.keys(PRODUCT_IMAGE_ALIASES).length} slug overrides configured.`
);
