import { z } from "zod";

const hexColor = z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/);
const urlOrNull = z.string().url().nullable();

const galleryItemSchema = z.object({
  id: z.string().min(1),
  url: z.string().url(),
});

const siteContentSchema = z.object({
  hero: z.object({
    logo: z.string().min(1).nullable().optional(),
    eyebrow: z.string().min(1).max(120),
    headline: z.string().min(1).max(220),
    subheadline: z.string().min(1).max(400),
  }),
  about: z.object({
    title: z.string().min(1).max(120),
    body: z.string().min(1).max(1000),
  }),
  services: z.array(z.string().min(1).max(80)).max(12),
  gallery: z.array(galleryItemSchema).max(24),
  cta: z.object({
    label: z.string().min(1).max(40),
    href: z.string().url(),
  }),
});

export const siteCreateSchema = z.object({
  name: z.string().trim().min(2).max(100),
  subdomain: z.string().trim().toLowerCase().regex(/^[a-z0-9-]{3,40}$/),
  customDomain: urlOrNull.optional().default(null),
  templateKey: z.enum(["luxe-photo", "luxe-modern"]),
  status: z.enum(["draft", "published"]).optional().default("draft"),
  branding: z.object({
    primaryColor: hexColor,
    accentColor: hexColor,
    neutralColor: hexColor,
  }),
  content: siteContentSchema,
  links: z.object({
    instagram: z.string().url().optional().or(z.literal("")),
    facebook: z.string().url().optional().or(z.literal("")),
    tiktok: z.string().url().optional().or(z.literal("")),
  }).default({ instagram: "", facebook: "", tiktok: "" }),
});

export const siteUpdateSchema = siteCreateSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { message: "At least one field must be updated." }
);
