import { NextResponse } from "next/server";
import { generateCaptcha } from "@/lib/validations/captcha";

export const dynamic = "force-dynamic";

export async function GET() {
  const { question, token } = generateCaptcha();
  return NextResponse.json({ question, token });
}