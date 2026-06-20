/**
 * Copy all catalog product images from Cursor assets to public/images/products.
 */

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join, basename } from "node:path";

const projectRoot = process.cwd();
const cursorAssets = join(
  process.env.CURSOR_ASSETS_DIR ??
    "C:/Users/admin/.cursor/projects/d-miracopvt/assets"
);
const productsDir = join(projectRoot, "public/images/products");
const promptsPath = join(projectRoot, "src/data/product-image-prompts.json");

interface PromptEntry {
  slug: string;
  imagePath: string;
}

const prompts = JSON.parse(readFileSync(promptsPath, "utf8")) as PromptEntry[];

mkdirSync(productsDir, { recursive: true });

let copied = 0;
let missing = 0;

for (const entry of prompts) {
  const filename = basename(entry.imagePath);
  const src = join(cursorAssets, filename);
  const dest = join(productsDir, filename);

  if (!existsSync(src)) {
    console.warn(`Missing: ${filename} (${entry.slug})`);
    missing += 1;
    continue;
  }

  copyFileSync(src, dest);
  copied += 1;
}

console.log(`Copied ${copied}/${prompts.length} images from ${cursorAssets}`);
if (missing > 0) process.exit(1);
