import { requireAdmin } from "@/lib/auth/guards";
import { getCollection } from "@/lib/db";
import { templateCreateSchema } from "@/lib/validation/template";
import { serializeTemplate } from "@/lib/serializers/site";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const templates = await getCollection("templates");
  const documents = await templates.find({}).sort({ createdAt: -1 }).toArray();
  return Response.json({ templates: documents.map(serializeTemplate) });
}

export async function POST(request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const payload = templateCreateSchema.parse(await request.json());
    const templates = await getCollection("templates");

    const existing = await templates.findOne({ key: payload.key });
    if (existing) {
      return Response.json({ error: "Template key already exists." }, { status: 409 });
    }

    const now = new Date();
    const result = await templates.insertOne({
      ...payload,
      createdAt: now,
      updatedAt: now,
    });

    const template = await templates.findOne({ _id: result.insertedId });
    return Response.json({ template: serializeTemplate(template) }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error?.issues?.[0]?.message || "Unable to create template." },
      { status: 400 }
    );
  }
}
