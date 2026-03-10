import { getCollection } from "@/lib/db";

export async function getSiteBySubdomain(subdomain) {
  const sites = await getCollection("sites");
  return sites.findOne({ subdomain, status: "published" });
}
