import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const projectRoot = process.cwd();
const assetsDir = join(projectRoot, "assets");
const productsDir = join(projectRoot, "public/images/products");
const promptsPath = join(projectRoot, "src/data/product-image-prompts.json");

interface PromptEntry {
  slug: string;
  imagePath: string;
}

const prompts = JSON.parse(readFileSync(promptsPath, "utf8")) as PromptEntry[];

mkdirSync(productsDir, { recursive: true });
mkdirSync(assetsDir, { recursive: true });

let copied = 0;
let missing = 0;

for (const entry of prompts) {
  const filename = basename(entry.imagePath);
  const assetPath = join(assetsDir, filename);
  const destPath = join(productsDir, filename);

  if (!existsSync(assetPath)) {
    console.warn(`Missing asset: ${filename} (${entry.slug})`);
    missing += 1;
    continue;
  }

  copyFileSync(assetPath, destPath);
  copied += 1;
}

console.log(`Synced ${copied}/${prompts.length} images to public/images/products/`);
if (missing > 0) {
  console.log(`Missing ${missing} asset(s) in ${assetsDir}`);
  process.exit(1);
}

const catalogFiles = new Set(prompts.map((p) => basename(p.imagePath)));
const extras = readdirSync(assetsDir).filter(
  (f) => f.endsWith(".png") && !catalogFiles.has(f)
);
if (extras.length > 0) {
  console.log(`Note: ${extras.length} extra PNG(s) in assets/ not in catalog prompts`);
}
