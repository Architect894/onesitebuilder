export function mapSiteToTemplateProps(site) {
    return {
        site: {
            id: site.id,
            name: site.name,
            subdomain: site.subdomain,
            templateKey: site.templateKey,
            status: site.status,
        },
        branding: site.branding,
        content: site.content,
        links: site.links,
    };
}