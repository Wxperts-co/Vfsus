import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getTransporter } from '@/lib/validations/mailer';
import { adminGenericFormEmail } from '@/lib/validations/emailTemplates';
import { paymentFormSchema } from '@/lib/validations/payment';
import { verifyCaptcha } from '@/lib/validations/captcha';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const rawData = await req.json();

    // Honeypot check: automated spam bots fill invisible fields
    if (rawData.hp_website && rawData.hp_website.trim().length > 0) {
      console.warn("Spam bot detected via honeypot field in payment intent");
      return NextResponse.json(
        { error: "Invalid submission detected" },
        { status: 400 }
      );
    }

    // Schema validation
    const parsed = paymentFormSchema.safeParse(rawData);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed. Please check your details.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Verify Captcha token and answer
    if (!verifyCaptcha(data.captchaToken, data.captchaAnswer)) {
      return NextResponse.json(
        {
          error: "Captcha verification failed. Please solve the math question again.",
          issues: { captchaAnswer: ["Incorrect captcha answer"] },
        },
        { status: 400 }
      );
    }

    // Additional bot entropy check on names (e.g. CamelCase strings without vowels or with abnormal length)
    const isBotName = (name: string) => {
      // If a single word has >15 chars without space and multiple alternating cases
      if (name.length > 15 && !name.includes(" ") && /[A-Z].*[a-z].*[A-Z]/.test(name)) {
        return true;
      }
      return false;
    };

    if (isBotName(data.first_name) || isBotName(data.last_name)) {
      return NextResponse.json(
        { error: "Please provide a valid name" },
        { status: 400 }
      );
    }

    const amountFormatted = data.amount.toFixed(2);

    // 1. Send Email alert to Admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const bcc = [process.env.BCC_EMAIL_1, process.env.BCC_EMAIL_2].filter(Boolean) as string[];
      const fromAddress = process.env.SMTP_FROM || (process.env.SMTP_USER as string);
      const transporter = getTransporter();
      
      const admin = adminGenericFormEmail("Payment Intent Attempt", {
        "First Name": data.first_name,
        "Last Name": data.last_name,
        "Email": data.email,
        "Amount (USD)": `$${amountFormatted}`,
      }, "email");
      
      await transporter.sendMail({
        from: fromAddress,
        to: adminEmail,
        bcc,
        replyTo: data.email,
        subject: admin.subject,
        html: admin.html,
      }).catch(err => console.error("Error sending payment alert email:", err));
    }

    // 2. Save legitimate payment intent to DB
    const client = await clientPromise;
    const db = client.db();
    
    const paymentRecord = {
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      amount: amountFormatted,
      status: 'Pending', // Initial status when redirecting to PayPal
      createdAt: new Date(),
    };

    const result = await db.collection('payments').insertOne(paymentRecord);

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: "Payment intent saved successfully",
    });
  } catch (error: any) {
    console.error('Error saving payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to initialize payment tracking' },
      { status: 500 }
    );
  }
}
