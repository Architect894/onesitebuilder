import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "onesitebuilder";

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!uri) {
    throw new Error("MongoDB URI not configured");
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    cachedClient = client;
    return client;
  } catch (error) {
    console.error("[DB Connection Error]", error);
    throw error;
  }
}

export async function getDb() {
  const client = await connectToDatabase();
  return client.db(dbName);
}

export async function getCollection(name) {
  const db = await getDb();
  return db.collection(name);
}
