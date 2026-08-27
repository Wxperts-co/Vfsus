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
    if (!file || typeof file === "string" || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file uploaded or invalid file format" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let ext = path.extname(file.name || "");
    if (!ext) {
      const mime = file.type || "image/png";
      ext = mime.includes("jpeg") || mime.includes("jpg") ? ".jpg" : mime.includes("webp") ? ".webp" : mime.includes("svg") ? ".svg" : ".png";
    }
    const filename = `logo-${Date.now()}${ext}`;
    
    const uploadDir = path.join(process.cwd(), "public", "uploads", "logos");
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filepath = path.join(uploadDir, filename);
    await fs.writeFile(filepath, buffer);

    const logoUrl = `/uploads/logos/${filename}`;
    return NextResponse.json({ url: logoUrl });
  } catch (error: any) {
    console.error("Error uploading logo:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
