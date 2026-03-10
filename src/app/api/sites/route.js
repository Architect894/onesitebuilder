import { ObjectId } from "mongodb";
import { requireUser } from "@/lib/auth/guards";
import { getCollection } from "@/lib/db";
import { siteCreateSchema } from "@/lib/validation/site";
import { serializeSite } from "@/lib/serializers/site";

export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;

  const sites = await getCollection("sites");
  const documents = await sites
    .find({ userId: user._id })
    .sort({ updatedAt: -1 })
    .toArray();

  return Response.json({ sites: documents.map(serializeSite) });
}

export async function POST(request) {
  const { user, error } = await requireUser();
  if (error) return error;

  try {
    const payload = siteCreateSchema.parse(await request.json());
    const sites = await getCollection("sites");

    const existingSubdomain = await sites.findOne({ subdomain: payload.subdomain });
    if (existingSubdomain) {
      return Response.json(
        { error: "That subdomain is already taken." },
        { status: 409 }
      );
    }

    const now = new Date();
    const result = await sites.insertOne({
      ...payload,
      userId: new ObjectId(user._id),
      templateVersion: payload.templateVersion || 1,
      createdAt: now,
      updatedAt: now,
    });

    const created = await sites.findOne({ _id: result.insertedId });
    return Response.json({ site: serializeSite(created) }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error?.issues?.[0]?.message || "Unable to create site." },
      { status: 400 }
    );
  }
}
