import { getCollection } from "@/lib/db";
import { serializeTemplate } from "@/lib/serializers/site";

export async function GET() {
  const templates = await getCollection("templates");
  const documents = await templates.find({ isActive: true }).sort({ name: 1 }).toArray();
  return Response.json({ templates: documents.map(serializeTemplate) });
}
