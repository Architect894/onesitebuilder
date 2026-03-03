import { notFound } from "next/navigation";
import { getSiteById } from "@/features/sites/services/get-site-by-id";
import { templateRegistry } from "@/features/templates/registry";
import SiteEditorClient from "@/components/editor/SiteEditorClient";

export default async function SiteEditorPage({ params }) {
    const { siteId } = await params;
    const site = await getSiteById(siteId);

    if (!site) {
        notFound();
    }

    const templateEntry = templateRegistry[site.templateKey];

    if (!templateEntry) {
        notFound();
    }

    return (
        <SiteEditorClient
            site={site}
            schema={templateEntry.schema}
            templateKey={site.templateKey}
        />
    );
}