import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hashPassword, signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const adminsCollection = db.collection("admins");

    // Auto-seeding: Check if there are any admins in the system
    const adminCount = await adminsCollection.countDocuments();
    if (adminCount === 0) {
      const defaultEmail = process.env.ADMIN_EMAIL || "johnabdus2025@gmail.com"; 
      // Seed the default admin
      await adminsCollection.insertOne({                                                                                                                             
        email: defaultEmail.toLowerCase().trim(),
        password: hashPassword("VfsusAdmin2026!"),
        createdAt: new Date(),
        name: "Super Admin",
      });
      console.log("Seeded default admin account:", defaultEmail);
    }

    // Find the admin
    const admin = await adminsCollection.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Verify password
    const hashedPasswordInput = hashPassword(password);
    if (admin.password !== hashedPasswordInput) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Generate JWT token
    const token = signToken({ email: admin.email });

    // Set cookie
    const response = NextResponse.json({
      success: true,
      admin: {
        email: admin.email,
        name: admin.name || "Admin",
      },
    });

    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 1 day
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
