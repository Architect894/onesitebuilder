import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "onesitebuilder";

const client = new MongoClient(uri);

async function run() {
  await client.connect();
  const db = client.db(dbName);

  console.log("\n=== Detailed Template Audit ===\n");

  // Get all templates including inactive ones
  const allTemplates = await db
    .collection("templates")
    .find({})
    .toArray();

  console.log(`Total templates in DB (all states): ${allTemplates.length}`);
  allTemplates.forEach((t) => {
    console.log(`  ${t.key} - ${t.name} [isActive: ${t.isActive}]`);
  });

  // Get only active templates
  const activeTemplates = await db
    .collection("templates")
    .find({ isActive: true })
    .toArray();

  console.log(`\nActive templates: ${activeTemplates.length}`);
  activeTemplates.forEach((t) => {
    console.log(`  ${t.key} - ${t.name}`);
  });

  // Check for duplicate keys
  const keys = activeTemplates.map((t) => t.key);
  const keyCount = {};
  keys.forEach((k) => {
    keyCount[k] = (keyCount[k] || 0) + 1;
  });

  console.log("\nKey counts:");
  Object.entries(keyCount).forEach(([key, count]) => {
    if (count > 1) {
      console.log(`  ⚠️  ${key}: ${count} copies`);
    } else {
      console.log(`  ✓ ${key}: 1 copy`);
    }
  });

  await client.close();
}

run().catch(console.error);
