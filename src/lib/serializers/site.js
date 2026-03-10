export function serializeSite(site) {
  if (!site) return null;
  return {
    ...site,
    id: String(site._id),
    _id: undefined,
    userId: site.userId ? String(site.userId) : null,
  };
}

export function serializeTemplate(template) {
  if (!template) return null;
  return {
    ...template,
    id: String(template._id),
    _id: undefined,
  };
}

export function serializeUser(user) {
  if (!user) return null;
  return {
    ...user,
    id: String(user._id),
    _id: undefined,
  };
}
