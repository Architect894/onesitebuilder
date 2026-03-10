import { getCollection } from "@/lib/db";
import { signupSchema } from "@/lib/validation/auth";
import { hashPassword } from "@/lib/auth/password";
import { signSessionToken } from "@/lib/auth/session";
import { setSessionCookie } from "@/lib/auth/cookies";
import { serializeUser } from "@/lib/serializers/site";

export async function POST(request) {
  try {
    const payload = signupSchema.parse(await request.json());
    const users = await getCollection("users");

    const existingUser = await users.findOne({ email: payload.email });
    if (existingUser) {
      return Response.json({ error: "Email is already in use." }, { status: 409 });
    }

    const now = new Date();
    const passwordHash = await hashPassword(payload.password);

    const result = await users.insertOne({
      name: payload.name,
      email: payload.email,
      passwordHash,
      role: "user",
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
    });

    const user = await users.findOne(
      { _id: result.insertedId },
      { projection: { passwordHash: 0 } }
    );

    const token = await signSessionToken({
      sub: String(result.insertedId),
      email: payload.email,
      role: "user",
    });

    await setSessionCookie(token);

    return Response.json({ user: serializeUser(user) }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error?.issues?.[0]?.message || "Unable to create account." },
      { status: 400 }
    );
  }
}
