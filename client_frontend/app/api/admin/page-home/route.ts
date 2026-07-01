import { NextResponse } from "next/server";
import { getAdminFromSession } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { getHomePageData } from "@/lib/settings-server";

export async function GET() {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await getHomePageData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching home page data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();

    await db.collection("settings").updateOne(
      { _id: "page_home" } as any,
      { $set: body },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving home page data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
