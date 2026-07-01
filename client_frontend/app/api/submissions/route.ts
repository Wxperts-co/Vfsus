import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getTransporter } from "@/lib/validations/mailer";
import { adminGenericFormEmail, userGenericFormEmail } from "@/lib/validations/emailTemplates";
import { verifyCaptcha } from "@/lib/validations/captcha";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: 'Form data is required' },
        { status: 400 }
      );
    }

    const captchaAnswerNum = parseInt(data.captchaAnswer, 10);
    if (isNaN(captchaAnswerNum) || !verifyCaptcha(data.captchaToken, captchaAnswerNum)) {
      return NextResponse.json(
        { error: "Captcha verification failed. Please try again.", issues: { captchaAnswer: ["Incorrect answer"] } },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    
    const submission = {
      ...data,
      status: 'Pending',
      createdAt: new Date(),
    };

    // Save to database first
    const result = await db.collection('submissions').insertOne(submission);

    // Send emails
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const bcc = [process.env.BCC_EMAIL_1, process.env.BCC_EMAIL_2].filter(Boolean) as string[];
      const fromAddress = process.env.SMTP_FROM || (process.env.SMTP_USER as string);

      const transporter = getTransporter();
      const adminMail = adminGenericFormEmail("Quote Request", data, "email");
      const userMail = userGenericFormEmail("Quote Request", data, "name");

      await Promise.all([
        // To admin
        transporter.sendMail({
          from: fromAddress,
          to: adminEmail,
          bcc,
          replyTo: data.email,
          subject: adminMail.subject,
          html: adminMail.html,
        }).catch(err => console.error("Error sending admin email:", err)),
        // To user
        ...(data.email ? [
          transporter.sendMail({
            from: fromAddress,
            to: data.email,
            bcc,
            subject: userMail.subject,
            html: userMail.html,
          }).catch(err => console.error("Error sending user email:", err))
        ] : [])
      ]);
    }

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: "Quote request submitted successfully"
    });
  } catch (error: any) {
    console.error('Error saving submission:', error);
    return NextResponse.json(
      { error: 'Failed to submit request' },
      { status: 500 }
    );
  }
}
