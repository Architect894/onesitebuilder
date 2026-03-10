import { cookies } from "next/headers";

export const SESSION_COOKIE = "osb_session";

export async function getSessionCookie() {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE)?.value || null;
  } catch (error) {
    console.error("[Cookie Error]", error);
    return null;
  }
}

export async function setSessionCookie(token) {
  try {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (error) {
    console.error("[Set Cookie Error]", error);
  }
}

export async function clearSessionCookie() {
  try {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
    });
  } catch (error) {
    console.error("[Clear Cookie Error]", error);
  }
}
