import { z } from "zod";

const hexColor = z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/);
const urlOrEmpty = z.string().url().or(z.literal(""));

export const siteCreateSchema = z.object({
  name: z.string().trim().min(2).max(100),
  subdomain: z.string().trim().toLowerCase().regex(/^[a-z0-9-]{3,40}$/),
  customDomain: z.string().url().nullable().optional().default(null),
  templateKey: z.enum(["luxe-photo", "luxe-modern", "luxe-classic", "luxe-minimal"]),
  status: z.enum(["draft", "published"]).optional().default("draft"),
  branding: z.object({
    primaryColor: hexColor,
    accentColor: hexColor,
    neutralColor: hexColor,
  }),
  content: z.record(z.string(), z.any()),
  links: z.object({
    instagram: urlOrEmpty.optional().default(""),
    facebook: urlOrEmpty.optional().default(""),
    tiktok: urlOrEmpty.optional().default(""),
  }).optional().default({ instagram: "", facebook: "", tiktok: "" }),
});

export const siteUpdateSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  subdomain: z.string().trim().toLowerCase().regex(/^[a-z0-9-]{3,40}$/).optional(),
  status: z.enum(["draft", "published"]).optional(),
  branding: z.object({
    primaryColor: hexColor,
    accentColor: hexColor,
    neutralColor: hexColor,
  }).optional(),
  content: z.record(z.string(), z.any()).optional(),
  links: z.object({
    instagram: urlOrEmpty.optional().default(""),
    facebook: urlOrEmpty.optional().default(""),
    tiktok: urlOrEmpty.optional().default(""),
  }).optional(),
}).refine(
  (value) => Object.keys(value).length > 0,
  { message: "At least one field must be updated." }
);
