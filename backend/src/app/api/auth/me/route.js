import { requireUser } from "@/lib/auth/guards";
import { serializeUser } from "@/lib/serializers/site";

export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;
  return Response.json({ user: serializeUser(user) });
}
