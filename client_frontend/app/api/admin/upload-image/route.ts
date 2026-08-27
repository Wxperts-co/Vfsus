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
    const file = (formData.get("file") || formData.get("image")) as File | null;
    if (!file || typeof file === "string" || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file uploaded or invalid file format" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let ext = path.extname(file.name || "");
    if (!ext) {
      const mime = file.type || "image/jpeg";
      ext = mime.includes("png") ? ".png" : mime.includes("webp") ? ".webp" : mime.includes("svg") ? ".svg" : ".jpg";
    }
    const filename = `img-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    
    const folder = (formData.get("folder") as string) || "images";
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filepath = path.join(uploadDir, filename);
    await fs.writeFile(filepath, buffer);

    const imageUrl = `/uploads/${folder}/${filename}`;
    return NextResponse.json({ url: imageUrl });
  } catch (error: any) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
