import { NextResponse } from "next/server";
import { getAdminFromSession } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("logo") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || ".png";
    const filename = `logo-${Date.now()}${ext}`;
    
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filepath = path.join(uploadDir, filename);
    await fs.writeFile(filepath, buffer);

    const logoUrl = `/uploads/${filename}`;
    return NextResponse.json({ url: logoUrl });
  } catch (error: any) {
    console.error("Error uploading logo:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
