import { clearSessionCookie } from "@/lib/auth/cookies";

export async function POST() {
  await clearSessionCookie();
  return Response.json({ success: true });
}
