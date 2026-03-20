import { getCollection } from "@/lib/db";
import { signSessionToken } from "@/lib/auth/session";
import { setSessionCookie } from "@/lib/auth/cookies";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < 1) {
      return Response.json({ error: "Password is required" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const users = await getCollection("users");
    const user = await users.findOne({ email: normalizedEmail });

    if (!user) {
      return Response.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const isValid = await bcryptjs.compare(password, user.passwordHash);
    if (!isValid) {
      return Response.json({ error: "Invalid email or password." }, { status: 401 });
    }

    await users.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });

    const token = await signSessionToken({ sub: String(user._id), email: user.email, name: user.name || "" });
    await setSessionCookie(token);

    return Response.json({
      user: {
        id: String(user._id),
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("[Login Error]", error);
    return Response.json({ error: error?.message || "Unable to log in." }, { status: 500 });
  }
}

