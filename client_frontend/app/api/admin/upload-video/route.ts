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
    const file = (formData.get("video") || formData.get("file")) as File | null;
    if (!file || typeof file === "string" || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file uploaded or invalid file format" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || ".mp4";
    const filename = `video-${Date.now()}${ext}`;
    
    const folder = (formData.get("folder") as string) || "videos";
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filepath = path.join(uploadDir, filename);
    await fs.writeFile(filepath, buffer);

    const videoUrl = `/uploads/${folder}/${filename}`;
    return NextResponse.json({ url: videoUrl });
  } catch (error: any) {
    console.error("Error uploading video:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
