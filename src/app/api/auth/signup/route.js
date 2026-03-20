import { getCollection } from "@/lib/db";
import { signSessionToken } from "@/lib/auth/session";
import { setSessionCookie } from "@/lib/auth/cookies";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, template } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return Response.json({ error: "Name must be at least 2 characters" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < 8) {
      return Response.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim();
    const validTemplates = ["luxe-photo", "luxe-modern", "luxe-classic", "luxe-minimal"];
    const templateKey = validTemplates.includes(template) ? template : "luxe-photo";

    const users = await getCollection("users");
    const existingUser = await users.findOne({ email: normalizedEmail });
    if (existingUser) {
      return Response.json({ error: "Email is already in use." }, { status: 409 });
    }

    const passwordHash = await bcryptjs.hash(password, 12);
    const now = new Date();

    const userResult = await users.insertOne({
      name: normalizedName,
      email: normalizedEmail,
      passwordHash,
      role: "user",
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
    });

    const userId = userResult.insertedId;

    // Create the user's first site automatically
    const sites = await getCollection("sites");
    const subdomain =
      normalizedEmail.split("@")[0].replace(/[^a-z0-9]/g, "").slice(0, 20) +
      "-" +
      Date.now().toString(36);

    const siteResult = await sites.insertOne({
      userId,
      name: `${normalizedName}'s Site`,
      subdomain,
      customDomain: null,
      templateKey,
      templateVersion: 1,
      status: "draft",
      isPublished: false,
      branding: {
        primaryColor: "#d4a574",
        accentColor: "#f1c886",
        neutralColor: "#000000",
      },
      content: buildDefaultContent(normalizedName),
      links: { instagram: "", facebook: "", tiktok: "" },
      createdAt: now,
      updatedAt: now,
    });

    const token = await signSessionToken({ sub: String(userId), email: normalizedEmail });
    await setSessionCookie(token);

    return Response.json(
      {
        user: {
          id: String(userId),
          email: normalizedEmail,
          name: normalizedName,
          siteId: String(siteResult.insertedId),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Signup Error]", error);
    return Response.json({ error: error?.message || "Unable to create account." }, { status: 500 });
  }
}

function buildDefaultContent(name) {
  return {
    hero: {
      logo: null,
      eyebrow: "Welcome",
      headline: name,
      subheadline: "Create something amazing",
      textColor: "#ffffff",
    },
    about: {
      eyebrow: "About",
      title: "About Us",
      body: "Tell your story here.",
      headingColor: "#ffffff",
      bodyColor: "#d4d4d4",
    },
    features: { eyebrow: "WHY CHOOSE US", heading: "Key Features" },
    services: ["Service 1", "Service 2", "Service 3"],
    servicesSection: { eyebrow: "Expertise", heading: "Services" },
    portfolio: { eyebrow: "RECENT WORK", heading: "Our Portfolio" },
    gallery: [
      { id: "1", url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200" },
      { id: "2", url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200" },
    ],
    gallerySection: { title: "Featured Work", heading: "Work" },
    stats: [
      { value: "500+", label: "Projects Completed" },
      { value: "100+", label: "Happy Clients" },
      { value: "5+", label: "Years Experience" },
    ],
    credentials: {
      heading: "Awards & Recognition",
      items: [
        { title: "Industry Leader", desc: "Recognized for excellence" },
        { title: "Award Winner", desc: "International accolades" },
        { title: "Trusted Partner", desc: "500+ satisfied clients" },
      ],
    },
    featured: { caption: "Featured work" },
    cta: {
      eyebrow: "READY TO WORK TOGETHER?",
      heading: "Let's Create Something Amazing",
      body: "Let's create something amazing together",
      label: "Get Started",
      href: "https://example.com",
      color: "#d4a574",
      textColor: "#ffffff",
    },
    contact: { phone: "", email: "", location: "" },
    social: { instagram: "", tiktok: "", facebook: "", youtube: "" },
    footer: { description: "Modern solutions for modern problems" },
    sectionStyle: {
      hero: { bg: "#000000", accentColor: "#d4a574" },
      about: { bg: "#0a0a0a" },
      cta: { bg: "#0a0a0a" },
      footer: { bg: "#000000" },
    },
  };
}

