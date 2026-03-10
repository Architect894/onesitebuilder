import { ObjectId } from "mongodb";
import { requireAdmin } from "@/lib/auth/guards";
import { getCollection } from "@/lib/db";
import { templateUpdateSchema } from "@/lib/validation/template";
import { serializeTemplate } from "@/lib/serializers/site";

export async function PATCH(request, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid template id." }, { status: 400 });
  }

  try {
    const payload = templateUpdateSchema.parse(await request.json());
    const templates = await getCollection("templates");

    if (payload.key) {
      const duplicate = await templates.findOne({
        key: payload.key,
        _id: { $ne: new ObjectId(id) },
      });

      if (duplicate) {
        return Response.json({ error: "Template key already exists." }, { status: 409 });
      }
    }

    const updated = await templates.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...payload, updatedAt: new Date() } },
      { returnDocument: "after" }
    );

    if (!updated) {
      return Response.json({ error: "Template not found." }, { status: 404 });
    }

    return Response.json({ template: serializeTemplate(updated) });
  } catch (error) {
    return Response.json(
      { error: error?.issues?.[0]?.message || "Unable to update template." },
      { status: 400 }
    );
  }
}

export async function DELETE(_request, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid template id." }, { status: 400 });
  }

  const templates = await getCollection("templates");
  const result = await templates.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return Response.json({ error: "Template not found." }, { status: 404 });
  }

  return Response.json({ success: true });
}
