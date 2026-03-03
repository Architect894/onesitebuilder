import sites from "@/data/mock/sites.json";

export async function getSiteById(siteId) {
    const site = sites.find((entry) => entry.id === siteId);
    return site ?? null;
}