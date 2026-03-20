import { ObjectId } from "mongodb";
import { requireUser } from "@/lib/auth/guards";
import { getCollection } from "@/lib/db";
import { siteUpdateSchema } from "@/lib/validation/site";
import { serializeSite } from "@/lib/serializers/site";

function isValidObjectId(value) {
  return ObjectId.isValid(value);
}

export async function GET(_request, { params }) {
  const { user, error } = await requireUser();
  if (error) return error;

  const { id } = await params;
  if (!isValidObjectId(id)) {
    return Response.json({ error: "Invalid site id." }, { status: 400 });
  }

  const sites = await getCollection("sites");
  const site = await sites.findOne({ _id: new ObjectId(id), userId: user._id });

  if (!site) {
    return Response.json({ error: "Site not found." }, { status: 404 });
  }

  return Response.json({ site: serializeSite(site) });
}

export async function PATCH(request, { params }) {
  const { user, error } = await requireUser();
  if (error) return error;

  const { id } = await params;
  if (!isValidObjectId(id)) {
    return Response.json({ error: "Invalid site id." }, { status: 400 });
  }

  try {
    const payload = siteUpdateSchema.parse(await request.json());
    const sites = await getCollection("sites");

    if (payload.subdomain) {
      const duplicate = await sites.findOne({
        subdomain: payload.subdomain,
        _id: { $ne: new ObjectId(id) },
      });

      if (duplicate) {
        return Response.json(
          { error: "That subdomain is already taken." },
          { status: 409 }
        );
      }
    }

    const result = await sites.findOneAndUpdate(
      { _id: new ObjectId(id), userId: user._id },
      { $set: { ...payload, updatedAt: new Date() } },
      { returnDocument: "after" }
    );

    if (!result) {
      return Response.json({ error: "Site not found." }, { status: 404 });
    }

    return Response.json({ site: serializeSite(result) });
  } catch (error) {
    let message;
    if (error?.issues?.length) {
      const issue = error.issues[0];
      const field = issue.path?.join('.') || 'unknown field';
      message = `${field}: ${issue.message}`;
    } else {
      message = error?.message || 'Unable to update site.';
    }
    console.error('[PATCH /api/sites/:id]', error);
    return Response.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request, { params }) {
  const { user, error } = await requireUser();
  if (error) return error;

  const { id } = await params;
  if (!isValidObjectId(id)) {
    return Response.json({ error: "Invalid site id." }, { status: 400 });
  }

  const sites = await getCollection("sites");
  const result = await sites.deleteOne({ _id: new ObjectId(id), userId: user._id });

  if (result.deletedCount === 0) {
    return Response.json({ error: "Site not found." }, { status: 404 });
  }

  return Response.json({ success: true });
}
