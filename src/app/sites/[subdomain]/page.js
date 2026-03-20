import { notFound } from "next/navigation";
import { getSiteBySubdomain } from "@/features/sites/services/get-site-by-subdomain";
import { mapSiteToTemplateProps } from "@/features/sites/mappers/map-site-to-template-props";
import { templateRegistry } from "@/features/templates/registry";

export default async function TenantSitePage({ params }) {
    const { subdomain } = await params;
    const site = await getSiteBySubdomain(subdomain);

    if (!site) {
        notFound();
    }

    const templateEntry = templateRegistry[site.templateKey];

    if (!templateEntry) {
        notFound();
    }

    const TemplateComponent = templateEntry.component;
    const templateProps = mapSiteToTemplateProps(site);

    return (
        <>
            {site.status !== "published" && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9999,
                    background: "rgba(15,10,8,0.92)",
                    backdropFilter: "blur(8px)",
                    borderBottom: "1px solid rgba(212,160,120,0.25)",
                    padding: "8px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    fontFamily: "system-ui, sans-serif",
                }}>
                    <span style={{ color: "rgba(212,160,120,0.9)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                        ⚬ Draft Preview
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.35)" }}>
                        Not publicly visible · <a href="/app" style={{ color: "rgba(212,160,120,0.7)", textDecoration: "none" }}>Back to editor</a>
                    </span>
                </div>
            )}
            <TemplateComponent {...templateProps} />
        </>
    );
}