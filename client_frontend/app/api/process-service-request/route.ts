import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getTransporter } from '@/lib/validations/mailer';
import { adminGenericFormEmail, userGenericFormEmail } from '@/lib/validations/emailTemplates';
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

    // 1. Send Email
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const bcc = [process.env.BCC_EMAIL_1, process.env.BCC_EMAIL_2].filter(Boolean) as string[];
      const fromAddress = process.env.SMTP_FROM || (process.env.SMTP_USER as string);
      const transporter = getTransporter();
      const admin = adminGenericFormEmail("Service Request", data, "fromemail");
      const userEmail = data.fromemail || data.email;
      
      const emailPromises = [
        transporter.sendMail({
          from: fromAddress,
          to: adminEmail,
          bcc,
          replyTo: admin.replyTo,
          subject: admin.subject,
          html: admin.html,
        })
      ];

      if (userEmail) {
        const user = userGenericFormEmail("Service Request", data, "requestor");
        emailPromises.push(
          transporter.sendMail({
            from: fromAddress,
            to: userEmail,
            bcc,
            subject: user.subject,
            html: user.html,
          })
        );
      }

      await Promise.all(emailPromises).catch(err => console.error("Error sending service request emails:", err));
    } else {
      console.error("ADMIN_EMAIL env var is not set, skipping email notification");
    }

    // 2. Save to DB
    const client = await clientPromise;
    const db = client.db();
    
    const submission = {
      ...data,
      status: 'Pending',
      createdAt: new Date(),
    };

    const result = await db.collection('service_requests').insertOne(submission);

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: "Service request submitted successfully",
    });
  } catch (error: any) {
    console.error('Error saving service request:', error);
    return NextResponse.json(
      { error: 'Failed to submit service request' },
      { status: 500 }
    );
  }
}
