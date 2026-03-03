import sites from "@/data/mock/sites.json";

export async function getSiteBySubdomain(subdomain) {
    const site = sites.find((entry) => entry.subdomain === subdomain);
    return site ?? null;
}