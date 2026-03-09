import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "onesitebuilder";

if (!uri) {
  throw new Error("Missing MONGODB_URI in environment variables.");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb() {
  const resolvedClient = await clientPromise;
  return resolvedClient.db(dbName);
}

export async function getCollection(name) {
  const db = await getDb();
  return db.collection(name);
}

export { clientPromise };
