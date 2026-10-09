import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import clientPromise from "@/lib/mongodb";
import { getTransporter } from "@/lib/validations/mailer";
import { adminEmploymentApplicationEmail, userEmploymentApplicationEmail } from "@/lib/validations/emailTemplates";
import { verifyCaptcha } from "@/lib/validations/captcha";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB per file

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Parse main text & JSON fields
    const rawDataStr = formData.get("data")?.toString();
    let data: Record<string, any> = {};

    if (rawDataStr) {
      try {
        data = JSON.parse(rawDataStr);
      } catch (e) {
        console.error("Error parsing JSON data string from formData:", e);
      }
    }

    // Also collect any direct top-level formData entries if data wasn't JSON-packed
    for (const [key, value] of formData.entries()) {
      if (key !== "data" && typeof value === "string") {
        if (!data[key]) {
          try {
            data[key] = JSON.parse(value);
          } catch {
            data[key] = value;
          }
        }
      }
    }

    // Captcha validation
    const captchaToken = data.captchaToken || formData.get("captchaToken")?.toString() || "";
    const captchaAnswer = data.captchaAnswer || formData.get("captchaAnswer")?.toString() || "";
    const captchaAnswerNum = parseInt(captchaAnswer, 10);

    if (isNaN(captchaAnswerNum) || !verifyCaptcha(captchaToken, captchaAnswerNum)) {
      return NextResponse.json(
        {
          error: "Captcha verification failed. Please answer the security question correctly.",
          issues: { captchaAnswer: ["Incorrect answer"] },
        },
        { status: 400 }
      );
    }

    // Required fields validation
    if (!data.firstName || !data.lastName || !data.email) {
      return NextResponse.json(
        { error: "First Name, Last Name, and Email are required fields." },
        { status: 400 }
      );
    }

    // Process file uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads", "applications");
    await fs.mkdir(uploadDir, { recursive: true });

    const attachedFiles: {
      fieldName: string;
      originalName: string;
      filename: string;
      url: string;
      size: number;
      mimeType: string;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    }[] = [];

    const emailAttachments: {
      filename: string;
      content: Buffer;
      contentType?: string;
    }[] = [];

    const fileEntries = Array.from(formData.entries()).filter(
      ([, value]) => value instanceof File && value.size > 0
    );

    for (const [key, val] of fileEntries) {
      const file = val as File;
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds the maximum size limit of 15MB.` },
          { status: 400 }
        );
      }

      const timestamp = Date.now();
      const sanitizedOriginal = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filename = `doc-${timestamp}-${Math.random().toString(36).substring(2, 7)}-${sanitizedOriginal}`;
      const filePath = path.join(uploadDir, filename);

      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      const friendlyFieldName =
        key === "resume"
          ? "Resume / CV"
          : key === "driversLicense"
          ? "Driver’s License"
          : key === "socialSecurityCard"
          ? "Social Security Card"
          : key === "guardLicense"
          ? "Security Credential (ID / License / Registration / Certification)"
          : key === "certifications"
          ? "Certifications / Training"
          : key === "otherDocs"
          ? "Additional Document"
          : key;

      attachedFiles.push({
        fieldName: friendlyFieldName,
        originalName: file.name,
        filename,
        url: `/uploads/applications/${filename}`,
        size: file.size,
        mimeType: file.type || "application/octet-stream",
      });

      emailAttachments.push({
        filename: `${friendlyFieldName.replace(/[^a-zA-Z0-9]/g, "_")}_${sanitizedOriginal}`,
        content: buffer,
        contentType: file.type || "application/octet-stream",
      });
    }

    // 1. Send Email Notifications
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const bcc = [process.env.BCC_EMAIL_1, process.env.BCC_EMAIL_2].filter(Boolean) as string[];
      const fromAddress = process.env.SMTP_FROM || (process.env.SMTP_USER as string);
      const transporter = getTransporter();

      const adminEmailData = adminEmploymentApplicationEmail(data, attachedFiles);
      const userEmail = data.email;

      const emailPromises = [
        transporter.sendMail({
          from: fromAddress,
          to: adminEmail,
          bcc,
          replyTo: adminEmailData.replyTo,
          subject: adminEmailData.subject,
          html: adminEmailData.html,
          attachments: emailAttachments,
        }),
      ];

      if (userEmail) {
        const userEmailData = userEmploymentApplicationEmail(data);
        emailPromises.push(
          transporter.sendMail({
            from: fromAddress,
            to: userEmail,
            bcc,
            subject: userEmailData.subject,
            html: userEmailData.html,
          })
        );
      }

      await Promise.all(emailPromises).catch((err) =>
        console.error("Error sending employment application emails:", err)
      );
    } else {
      console.warn("ADMIN_EMAIL is not set, skipping email sending.");
    }

    // 2. Save Application Record in Database
    const client = await clientPromise;
    const db = client.db();

    const applicationRecord = {
      ...data,
      documents: attachedFiles,
      status: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("employment_applications").insertOne(applicationRecord);

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: "Employment Application submitted successfully.",
    });
  } catch (error: any) {
    console.error("Error processing employment application:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit employment application. Please try again." },
      { status: 500 }
    );
  }
}
