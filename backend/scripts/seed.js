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
    description: "Photo-booth and events focused landing page.",
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
    description: "Clean modern landing page for event businesses.",
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
    description: "Elegant timeless template with premium animations.",
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
