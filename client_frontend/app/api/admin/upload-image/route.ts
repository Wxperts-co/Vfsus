import { NextResponse } from "next/server";
import { getAdminFromSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = (formData.get("file") || formData.get("image")) as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const mimeType = file.type || "image/jpeg";
    const imageUrl = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({ url: imageUrl });
  } catch (error: any) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
