import { getCollection } from "@/lib/db";
import { serializeTemplate } from "@/lib/serializers/site";
import { getAllTemplates } from "@/features/templates/registry";

export async function GET() {
  // Get database templates (legacy templates)
  const templatesCollection = await getCollection("templates");
  const dbTemplates = await templatesCollection
    .find({ isActive: true })
    .sort({ name: 1 })
    .toArray();

  console.log(`[API] Database templates: ${dbTemplates.length}`, dbTemplates.map(t => t.key));

  // Get code-based templates from registry (factory-based templates)
  const registryTemplates = getAllTemplates();
  
  console.log(`[API] Registry templates: ${registryTemplates.length}`, registryTemplates.map(t => t.key));

  // Build a Set of registry keys to deduplicate
  const registryKeys = new Set(registryTemplates.map((t) => t.key));

  // Serialize and deduplicate database templates
  const serializedDbTemplates = dbTemplates
    .map(serializeTemplate)
    .filter((t) => !registryKeys.has(t.key)); // Skip db templates with conflicting keys

  console.log(`[API] Serialized + filtered DB: ${serializedDbTemplates.length}`);

  // Further deduplication: keep only the first occurrence of each key
  const seenKeys = new Set(registryKeys);
  const deduplicatedDbTemplates = [];
  
  for (const template of serializedDbTemplates) {
    if (!seenKeys.has(template.key)) {
      seenKeys.add(template.key);
      deduplicatedDbTemplates.push(template);
    }
  }

  console.log(`[API] Deduplicated DB: ${deduplicatedDbTemplates.length}`, deduplicatedDbTemplates.map(t => t.key));

  // Merge: deduplicated database templates, then registry templates
  const allTemplates = [...deduplicatedDbTemplates, ...registryTemplates];

  console.log(`[API] FINAL: ${allTemplates.length}`, allTemplates.map(t => t.key));

  return Response.json({ templates: allTemplates });
}
