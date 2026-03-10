import { SignJWT, jwtVerify } from "jose";

const secretValue = process.env.JWT_SECRET || "fallback-secret-key-change-in-production";

const secret = new TextEncoder().encode(secretValue);

export async function signSessionToken(payload) {
  try {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);
  } catch (error) {
    console.error("[Sign Token Error]", error);
    throw error;
  }
}

export async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("[Verify Token Error]", error);
    throw error;
  }
}
