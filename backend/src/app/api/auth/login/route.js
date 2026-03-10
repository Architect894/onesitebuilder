import { getCollection } from "@/lib/db";
import { loginSchema } from "@/lib/validation/auth";
import { verifyPassword } from "@/lib/auth/password";
import { signSessionToken } from "@/lib/auth/session";
import { setSessionCookie } from "@/lib/auth/cookies";
import { serializeUser } from "@/lib/serializers/site";

export async function POST(request) {
  try {
    const payload = loginSchema.parse(await request.json());
    const users = await getCollection("users");

    const user = await users.findOne({ email: payload.email });
    if (!user) {
      return Response.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const isValid = await verifyPassword(payload.password, user.passwordHash);
    if (!isValid) {
      return Response.json({ error: "Invalid credentials." }, { status: 401 });
    }

    await users.updateOne(
      { _id: user._id },
      { $set: { lastLoginAt: new Date(), updatedAt: new Date() } }
    );

    const token = await signSessionToken({
      sub: String(user._id),
      email: user.email,
      role: user.role,
    });

    await setSessionCookie(token);

    return Response.json({
      user: serializeUser({
        ...user,
        passwordHash: undefined,
      }),
    });
  } catch (error) {
    return Response.json(
      { error: error?.issues?.[0]?.message || "Unable to log in." },
      { status: 400 }
    );
  }
}
