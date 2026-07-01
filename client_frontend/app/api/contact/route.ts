import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { verifyCaptcha } from "@/lib/validations/captcha";
import { getTransporter } from "@/lib/validations/mailer";
import { adminNotificationEmail, userConfirmationEmail } from "@/lib/validations/emailTemplates";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const raw = {
      name: form.get("name")?.toString() ?? "",
      address: form.get("address")?.toString() ?? "",
      citytown: form.get("citytown")?.toString() ?? "",
      province: form.get("province")?.toString() ?? "",
      postalcode: form.get("postalcode")?.toString() ?? "",
      email: form.get("email")?.toString() ?? "",
      phone: form.get("phone")?.toString() ?? "",
      comments: form.get("comments")?.toString() ?? "",
      captchaAnswer: form.get("captchaAnswer")?.toString() ?? "",
      captchaToken: form.get("captchaToken")?.toString() ?? "",
    };

    const parsed = contactFormSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const data = parsed.data;

    if (!verifyCaptcha(data.captchaToken, data.captchaAnswer)) {
      return NextResponse.json(
        { error: "Captcha verification failed. Please try again.", issues: { captchaAnswer: ["Incorrect answer"] } },
        { status: 400 }
      );
    }

    // Optional file attachment
    const file = form.get("file");
    const attachments: { filename: string; content: Buffer; contentType?: string }[] = [];

    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "Attached file exceeds the 5MB limit" }, { status: 400 });
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({ filename: file.name, content: buffer, contentType: file.type });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      console.error("ADMIN_EMAIL env var is not set");
      return NextResponse.json({ error: "Server email is not configured" }, { status: 500 });
    }

    const bcc = [process.env.BCC_EMAIL_1, process.env.BCC_EMAIL_2].filter(Boolean) as string[];
    const fromAddress = process.env.SMTP_FROM || (process.env.SMTP_USER as string);

    const transporter = getTransporter();
    const admin = adminNotificationEmail(data);
    const user = userConfirmationEmail(data);

    // Save to database
    try {
      const client = await clientPromise;
      const db = client.db();
      
      const submission = {
        ...data,
        status: 'Pending',
        createdAt: new Date(),
      };
      await db.collection('contacts').insertOne(submission);
    } catch (dbError) {
      console.error("Error saving contact to DB:", dbError);
      // We continue to send the email even if DB save fails
    }

    await Promise.all([
      // To admin (with the 2 BCCs and the attachment, reply-to the sender)
      transporter.sendMail({
        from: fromAddress,
        to: adminEmail,
        bcc,
        replyTo: data.email,
        subject: admin.subject,
        html: admin.html,
        attachments,
      }),
      // Confirmation to the user (also bcc'd, per request)
      transporter.sendMail({
        from: fromAddress,
        to: data.email,
        bcc,
        subject: user.subject,
        html: user.html,
      }),
    ]);

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}