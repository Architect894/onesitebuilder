import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/db";
import { serializeSite } from "@/lib/serializers/site";

export async function getSitesByUser(userId) {
  const sites = await getCollection("sites");
  const docs = await sites.find({ userId: new ObjectId(userId) }).sort({ updatedAt: -1 }).toArray();
  return docs.map(serializeSite);
}
