import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import clientPromise from "@/lib/mongodb";
import { getAdminFromSession } from "@/lib/auth";
import { getServicesPageData, invalidateSettingsCache } from "@/lib/settings-server";

export async function GET(req: Request) {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await getServicesPageData();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching services data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const client = await clientPromise;
    const db = client.db();

    await db.collection("settings").updateOne(
      { _id: "page_services" } as any,
      { $set: data },
      { upsert: true }
    );

    try {
      invalidateSettingsCache("page_services");
      revalidatePath("/services");
      revalidatePath("/services/[slug]", "page");
      revalidatePath("/");
    } catch (revalidateErr) {
      console.warn("Revalidation warning:", revalidateErr);
    }

    return NextResponse.json({ success: true, message: "Services page data updated successfully" });
  } catch (error: any) {
    console.error("Error updating services data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export const PUT = POST;
