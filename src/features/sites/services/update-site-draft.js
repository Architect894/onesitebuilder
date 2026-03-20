export async function updateSiteDraft(siteId, draftSite) {
  const { name, subdomain, branding, content, links, status } = draftSite;

  // Strip null/undefined so Zod .partial() validation doesn't reject them
  const payload = Object.fromEntries(
    Object.entries({ name, subdomain, branding, content, links, status })
      .filter(([, v]) => v != null)
  );

  const res = await fetch(`/api/sites/${siteId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to save site.");
  }

  return res.json();
}