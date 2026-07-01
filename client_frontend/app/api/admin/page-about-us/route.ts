import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getAdminFromSession } from "@/lib/auth";
import { getAboutUsPageData } from "@/lib/settings-server";

export async function GET(req: Request) {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await getAboutUsPageData();
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("Error fetching about us data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { _id, ...updateData } = body;

    const client = await clientPromise;
    const db = client.db();

    await db.collection("settings").updateOne(
      { _id: "page_about_us" } as any,
      { $set: updateData },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "About Us page data updated successfully" });
  } catch (error: any) {
    console.error("Error updating about us data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
