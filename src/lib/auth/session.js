import { SignJWT, jwtVerify } from "jose";

const secretValue = process.env.JWT_SECRET;

if (!secretValue) {
  throw new Error("Missing JWT_SECRET in environment variables.");
}

const secret = new TextEncoder().encode(secretValue);

export async function signSessionToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySessionToken(token) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}
