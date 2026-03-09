import { ObjectId } from "mongodb";
import { getSessionCookie } from "@/lib/auth/cookies";
import { verifySessionToken } from "@/lib/auth/session";
import { getCollection } from "@/lib/db";

export async function getCurrentSession() {
  const token = await getSessionCookie();
  if (!token) return null;

  try {
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function requireUser() {
  const session = await getCurrentSession();
  if (!session?.sub) {
    return { error: Response.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const users = await getCollection("users");
  const user = await users.findOne(
    { _id: new ObjectId(session.sub) },
    { projection: { passwordHash: 0 } }
  );

  if (!user) {
    return { error: Response.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  return { user };
}

export async function requireAdmin() {
  const result = await requireUser();
  if (result.error) return result;
  if (result.user.role !== "admin") {
    return { error: Response.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return result;
}
