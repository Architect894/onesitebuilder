import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth/guards";
import { serializeSite } from "@/lib/serializers/site";

export async function getSiteById(siteId) {
  const session = await getCurrentSession();
  if (!session?.sub) return null;

  try {
    const sites = await getCollection("sites");
    const site = await sites.findOne({
      _id: new ObjectId(siteId),
      userId: new ObjectId(session.sub),
    });
    return serializeSite(site);
  } catch {
    return null;
  }
}