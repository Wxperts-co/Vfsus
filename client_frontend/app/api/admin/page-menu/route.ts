import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminFromSession } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { getMenuPageData, invalidateSettingsCache } from "@/lib/settings-server";

export async function GET() {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await getMenuPageData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching menu page data:", error);
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
      { _id: "page_menu" } as any,
      { $set: body },
      { upsert: true }
    );

    try {
      invalidateSettingsCache("page_menu");
      revalidatePath("/menu");
      revalidatePath("/menu/[slug]", "page");
      revalidatePath("/");
    } catch (revalidateErr) {
      console.warn("Revalidation warning:", revalidateErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving menu page data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
