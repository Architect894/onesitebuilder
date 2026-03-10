import { z } from "zod";

export const templateCreateSchema = z.object({
  key: z.string().trim().min(2).max(80).regex(/^[a-z0-9-]+$/),
  name: z.string().trim().min(2).max(100),
  description: z.string().trim().min(2).max(300),
  version: z.number().int().min(1).default(1),
  isActive: z.boolean().default(true),
  schema: z.record(z.any()).default({}),
  defaults: z.record(z.any()).default({}),
});

export const templateUpdateSchema = templateCreateSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { message: "At least one field must be updated." }
);
