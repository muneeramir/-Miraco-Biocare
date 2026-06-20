/**
 * Batch-generate product catalog images via OpenAI Images API.
 *
 * Requires OPENAI_API_KEY in environment or .env.local
 *
 * Usage:
 *   npm run generate:product-images
 *   npm run generate:product-images -- --dry-run
 *   npm run generate:product-images -- --slug sciphi-rna-purification-kit
 */

import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

const projectRoot = process.cwd();
const promptsPath = join(projectRoot, "src/data/product-image-prompts.json");
const productsDir = join(projectRoot, "public/images/products");

interface PromptEntry {
  slug: string;
  name: string;
  imagePath: string;
  prompt: string;
  negativePrompt?: string;
}

function loadEnvLocal(): void {
  const envPath = join(projectRoot, ".env.local");
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

async function generateImage(
  apiKey: string,
  prompt: string
): Promise<Buffer> {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
      quality: "high",
      n: 1,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${errorText}`);
  }

  const data = (await response.json()) as {
    data: Array<{ b64_json?: string; url?: string }>;
  };

  const item = data.data[0];
  if (item.b64_json) {
    return Buffer.from(item.b64_json, "base64");
  }

  if (item.url) {
    const imageResponse = await fetch(item.url);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download generated image: ${imageResponse.status}`);
    }
    return Buffer.from(await imageResponse.arrayBuffer());
  }

  throw new Error("No image data returned from OpenAI API");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main(): Promise<void> {
  loadEnvLocal();

  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const slugFilter = args.includes("--slug")
    ? args[args.indexOf("--slug") + 1]
    : null;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey && !dryRun) {
    console.error(
      "OPENAI_API_KEY is not set. Add it to .env.local or use Cursor image generation + npm run sync:product-images"
    );
    process.exit(1);
  }

  const prompts = JSON.parse(readFileSync(promptsPath, "utf8")) as PromptEntry[];
  const entries = slugFilter
    ? prompts.filter((p) => p.slug === slugFilter)
    : prompts;

  if (entries.length === 0) {
    console.error(slugFilter ? `No prompt found for slug: ${slugFilter}` : "No prompts found");
    process.exit(1);
  }

  mkdirSync(productsDir, { recursive: true });

  console.log(`Generating ${entries.length} product image(s)...`);

  for (let i = 0; i < entries.length; i += 1) {
    const entry = entries[i];
    const filename = basename(entry.imagePath);
    const outputPath = join(productsDir, filename);
    const fullPrompt = `${entry.prompt} CRITICAL: Do not include SciPhi, SciPhi wordmark, SciPhi logo, or any brand logo text on packaging.`;

    console.log(`[${i + 1}/${entries.length}] ${entry.slug} → ${filename}`);

    if (dryRun) {
      console.log(`  prompt length: ${fullPrompt.length} chars`);
      continue;
    }

    try {
      const buffer = await generateImage(apiKey!, fullPrompt);
      writeFileSync(outputPath, buffer);
      console.log(`  ✓ saved ${outputPath}`);
    } catch (error) {
      console.error(`  ✗ failed: ${error instanceof Error ? error.message : error}`);
      process.exitCode = 1;
    }

    // Gentle rate limiting
    if (i < entries.length - 1) {
      await sleep(1500);
    }
  }

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
