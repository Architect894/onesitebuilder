import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "onesitebuilder";

if (!uri) {
  throw new Error("Missing MONGODB_URI");
}

const client = new MongoClient(uri);

const templateDocuments = [
  {
    key: "luxe-photo",
    name: "Luxe Photo",
    style: "photo",
    industries: ["photo-booth", "wedding-photographer", "videographer"],
    tags: ["photo", "gallery", "full-screen", "masonry", "dark", "luxury"],
    description: "Photography-focused template with full-screen hero, masonry gallery, and modern design",
    version: 1,
    isActive: true,
    schema: {},
    defaults: {
      branding: {
        primaryColor: "#9c8762",
        accentColor: "#c6a16e",
        neutralColor: "#000000",
      },
    },
  },
  {
    key: "luxe-modern",
    name: "Luxe Modern",
    style: "modern",
    industries: ["photo-booth", "wedding-dj", "event-venue", "party-rentals"],
    tags: ["modern", "bold", "dark", "split-layout", "accent"],
    description: "Clean, bold split-layout template for event and entertainment businesses",
    version: 1,
    isActive: true,
    schema: {},
    defaults: {
      branding: {
        primaryColor: "#9c8762",
        accentColor: "#e6b17e",
        neutralColor: "#000000",
      },
    },
  },
  {
    key: "luxe-classic",
    name: "Luxe Classic",
    style: "classic",
    industries: ["wedding-planner", "event-venue", "wedding-dj", "catering"],
    tags: ["classic", "elegant", "serif", "premium", "centered"],
    description: "Elegant, serif-driven template for upscale event and hospitality businesses",
    version: 1,
    isActive: true,
    schema: {},
    defaults: {
      branding: {
        primaryColor: "#d4a574",
        accentColor: "#f1c886",
        neutralColor: "#000000",
      },
    },
  },
  {
    key: "luxe-minimal",
    name: "Luxe Minimal",
    style: "minimal",
    industries: ["wedding-photographer", "wedding-planner", "catering"],
    tags: ["minimal", "clean", "light", "whitespace", "modern"],
    description: "Ultra-clean, whitespace-driven template for simple, elegant presentation",
    version: 1,
    isActive: true,
    schema: {},
    defaults: {
      branding: {
        primaryColor: "#000000",
        accentColor: "#666666",
        neutralColor: "#000000",
      },
    },
  },
];

async function run() {
  await client.connect();
  const db = client.db(dbName);

  await db.collection("users").createIndex({ email: 1 }, { unique: true });
  await db.collection("sites").createIndex({ subdomain: 1 }, { unique: true });
  await db.collection("sites").createIndex({ userId: 1, updatedAt: -1 });
  await db.collection("templates").createIndex({ key: 1 }, { unique: true });

  for (const document of templateDocuments) {
    await db.collection("templates").updateOne(
      { key: document.key },
      {
        $set: {
          ...document,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );
  }

  console.log("Seed completed.");
  await client.close();
}

run().catch(async (error) => {
  console.error(error);
  await client.close();
  process.exit(1);
});
