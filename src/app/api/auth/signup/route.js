import { getCollection } from "@/lib/db";
import CryptoJS from "crypto-js";

// Hash password using SHA256 with salt
function hashPassword(password) {
  // Generate a random salt
  const salt = CryptoJS.lib.WordArray.random(16).toString();
  // Hash password + salt
  const hash = CryptoJS.SHA256(password + salt).toString();
  return `${salt}:${hash}`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("[Signup] Received:", body);
    
    // Manual validation (simpler and works with Turbopack)
    const { name, email, password } = body;
    
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return Response.json({ error: "Name must be at least 2 characters" }, { status: 400 });
    }
    
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }
    
    if (!password || typeof password !== 'string' || password.length < 8) {
      return Response.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }
    
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim();

    console.log("[Signup] Validated");
    
    // Check if user exists
    const users = await getCollection("users");
    const existingUser = await users.findOne({ email: normalizedEmail });
    
    if (existingUser) {
      return Response.json({ error: "Email is already in use." }, { status: 409 });
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Insert user
    const now = new Date();
    const result = await users.insertOne({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
    });

    console.log("[Signup] User inserted:", result.insertedId);
    
    return Response.json({ 
      user: { 
        id: String(result.insertedId),
        email: normalizedEmail,
        name: normalizedName
      } 
    }, { status: 201 });
  } catch (error) {
    console.error("[Signup Error]", error);
    return Response.json(
      { error: error?.message || "Unable to create account." },
      { status: 400 }
    );
  }
}
