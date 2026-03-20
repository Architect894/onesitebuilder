import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { MongoClient } from "mongodb";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Import the functions
const { getCollection } = await import("./src/lib/db.js");
const { serializeTemplate } = await import("./src/lib/serializers/site.js");
const { getAllTemplates } = await import("./src/features/templates/registry.js");

async function run() {
  console.log("\n=== API Diagnostic ===\n");

  // 1. Get database templates
  const templatesCollection = await getCollection("templates");
  const dbTemplates = await templatesCollection
    .find({ isActive: true })
    .sort({ name: 1 })
    .toArray();

  console.log(`📊 Database templates: ${dbTemplates.length}`);
  dbTemplates.forEach((t, i) => {
    console.log(`  ${i + 1}. ${t.key} - ${t.name}`);
  });

  // 2. Get registry templates
  const registryTemplates = getAllTemplates();
  console.log(`\n📦 Registry templates: ${registryTemplates.length}`);
  registryTemplates.forEach((t, i) => {
    console.log(`  ${i + 1}. ${t.key} - ${t.name} (factory: ${t.isFactory})`);
  });

  // 3. Serialize and merge
  const registryKeys = new Set(registryTemplates.map((t) => t.key));
  const serializedDbTemplates = dbTemplates
    .map(serializeTemplate)
    .filter((t) => !registryKeys.has(t.key));

  console.log(`\n🔄 Serialized DB templates (after filtering): ${serializedDbTemplates.length}`);
  serializedDbTemplates.forEach((t, i) => {
    console.log(`  ${i + 1}. ${t.key || "NO KEY"} - ${t.name}`);
  });

  // 4. Deduplication
  const seenKeys = new Set(registryKeys);
  const deduplicatedDbTemplates = [];
  
  for (const template of serializedDbTemplates) {
    if (!seenKeys.has(template.key)) {
      seenKeys.add(template.key);
      deduplicatedDbTemplates.push(template);
    }
  }

  console.log(`\n✨ Deduplicated DB templates: ${deduplicatedDbTemplates.length}`);
  deduplicatedDbTemplates.forEach((t, i) => {
    console.log(`  ${i + 1}. ${t.key} - ${t.name}`);
  });

  // 5. Final merge
  const allTemplates = [...deduplicatedDbTemplates, ...registryTemplates];

  console.log(`\n🎉 Final merged list: ${allTemplates.length}`);
  allTemplates.forEach((t, i) => {
    console.log(`  ${i + 1}. ${t.key} - ${t.name}`);
  });

  // Check for duplicates
  const keys = allTemplates.map((t) => t.key);
  const duplicateKeys = keys.filter((k, i) => keys.indexOf(k) !== i);
  if (duplicateKeys.length > 0) {
    console.log(`\n⚠️  DUPLICATE KEYS IN FINAL LIST:`, [...new Set(duplicateKeys)]);
  } else {
    console.log(`\n✓ No duplicate keys in final list`);
  }
}

run().catch(console.error);
