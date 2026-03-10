import { getCollection } from "@/lib/db";
import CryptoJS from "crypto-js";

// Verify password using SHA256 with salt
function verifyPassword(password, hashedPassword) {
  const parts = hashedPassword.split(':');
  if (parts.length !== 2) return false;
  
  const salt = parts[0];
  const hash = parts[1];
  const computedHash = CryptoJS.SHA256(password + salt).toString();
  return computedHash === hash;
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("[Login] Received:", body);
    
    // Manual validation
    const { email, password } = body;
    
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }
    
    if (!password || typeof password !== 'string' || password.length < 1) {
      return Response.json({ error: "Password is required" }, { status: 400 });
    }
    
    const normalizedEmail = email.trim().toLowerCase();

    console.log("[Login] Validated");
    
    // Find user
    const users = await getCollection("users");
    const user = await users.findOne({ email: normalizedEmail });
    
    if (!user) {
      return Response.json({ error: "Invalid email or password." }, { status: 401 });
    }
    
    // Verify password using SHA256
    const isPasswordValid = verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return Response.json({ error: "Invalid email or password." }, { status: 401 });
    }
    
    // Update last login
    await users.updateOne(
      { _id: user._id },
      { $set: { lastLoginAt: new Date() } }
    );

    console.log("[Login] User authenticated:", user._id);
    
    return Response.json({ 
      user: { 
        id: String(user._id),
        email: user.email,
        name: user.name
      } 
    }, { status: 200 });
  } catch (error) {
    console.error("[Login Error]", error);
    return Response.json(
      { error: error?.message || "Unable to log in." },
      { status: 400 }
    );
  }
}
