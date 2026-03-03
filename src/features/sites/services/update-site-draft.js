export async function updateSiteDraft(siteId, draftSite) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
        success: true,
        siteId,
        draftSite,
    };
}