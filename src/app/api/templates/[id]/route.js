import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/db";
import { serializeTemplate } from "@/lib/serializers/site";

export async function GET(_request, { params }) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid template id." }, { status: 400 });
  }

  const templates = await getCollection("templates");
  const template = await templates.findOne({ _id: new ObjectId(id), isActive: true });

  if (!template) {
    return Response.json({ error: "Template not found." }, { status: 404 });
  }

  return Response.json({ template: serializeTemplate(template) });
}
