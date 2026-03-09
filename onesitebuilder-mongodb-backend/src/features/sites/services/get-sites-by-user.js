import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/db";

export async function getSitesByUser(userId) {
  const sites = await getCollection("sites");
  return sites.find({ userId: new ObjectId(userId) }).sort({ updatedAt: -1 }).toArray();
}
