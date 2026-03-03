import { notFound } from "next/navigation";
import { getSiteBySubdomain } from "@/features/sites/services/get-site-by-subdomain";
import { mapSiteToTemplateProps } from "@/features/sites/mappers/map-site-to-template-props";
import { templateRegistry } from "@/features/templates/registry";

export default async function TenantSitePage({ params }) {
    const { subdomain } = await params;
    const site = await getSiteBySubdomain(subdomain);

    if (!site || site.status !== "published") {
        notFound();
    }

    const templateEntry = templateRegistry[site.templateKey];

    if (!templateEntry) {
        notFound();
    }

    const TemplateComponent = templateEntry.component;
    const templateProps = mapSiteToTemplateProps(site);

    return <TemplateComponent {...templateProps} />;
}