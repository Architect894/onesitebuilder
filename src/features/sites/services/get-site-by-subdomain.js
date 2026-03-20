import { getCollection } from "@/lib/db";
import { serializeSite } from "@/lib/serializers/site";

export async function getSiteBySubdomain(subdomain) {
  try {
    const sites = await getCollection("sites");
    const site = await sites.findOne({ subdomain });
    return serializeSite(site);
  } catch {
    return null;
  }
}