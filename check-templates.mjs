import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "onesitebuilder";

if (!uri) {
  throw new Error("Missing MONGODB_URI");
}

const client = new MongoClient(uri);

async function run() {
  await client.connect();
  const db = client.db(dbName);

  // Get all templates and log them
  const templates = await db
    .collection("templates")
    .find({ isActive: true })
    .toArray();

  console.log("\n=== Database Templates ===");
  templates.forEach((t) => {
    console.log(`key: ${t.key}, name: ${t.name}`);
  });

  // Check for duplicate keys
  const keys = templates.map((t) => t.key);
  const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);
  
  if (duplicates.length > 0) {
    console.log("\n⚠️  DUPLICATE KEYS FOUND:", [...new Set(duplicates)]);
    console.log("\nRemoving duplicates (keeping first occurrence)...");
    
    for (const key of [...new Set(duplicates)]) {
      const allWithKey = await db
        .collection("templates")
        .find({ key })
        .toArray();
      
      if (allWithKey.length > 1) {
        const idsToDelete = allWithKey.slice(1).map((t) => t._id);
        const result = await db
          .collection("templates")
          .deleteMany({ _id: { $in: idsToDelete } });
        console.log(`  ✓ Deleted ${result.deletedCount} duplicate(s) of "${key}"`);
      }
    }
  } else {
    console.log("\n✓ No duplicate keys found");
  }

  await client.close();
}

run().catch(async (error) => {
  console.error(error);
  await client.close();
  process.exit(1);
});
