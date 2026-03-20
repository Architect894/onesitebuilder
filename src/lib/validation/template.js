import { z } from "zod";

export const templateCreateSchema = z.object({
  key: z.string().trim().min(2).max(80).regex(/^[a-z0-9-]+$/),
  name: z.string().trim().min(2).max(100),
  description: z.string().trim().min(2).max(300),
  version: z.number().int().min(1).default(1),
  isActive: z.boolean().default(true),
  schema: z.record(z.string(), z.any()).default({}),
  defaults: z.record(z.string(), z.any()).default({}),
});

export const templateUpdateSchema = z.object({
  key: z.string().trim().min(2).max(80).regex(/^[a-z0-9-]+$/).optional(),
  name: z.string().trim().min(2).max(100).optional(),
  description: z.string().trim().min(2).max(300).optional(),
  version: z.number().int().min(1).optional(),
  isActive: z.boolean().optional(),
  schema: z.record(z.string(), z.any()).optional(),
  defaults: z.record(z.string(), z.any()).optional(),
}).refine(
  (value) => Object.keys(value).length > 0,
  { message: "At least one field must be updated." }
);
