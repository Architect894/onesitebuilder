import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "onesitebuilder";

if (!uri) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}

const client = new MongoClient(uri);

async function test() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const templates = await db.collection("templates").find({ isActive: true }).toArray();
    console.log(`Found ${templates.length} active templates:`);
    templates.forEach((t) => console.log(`- ${t.name} (${t.key})`));
    await client.close();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

test();
