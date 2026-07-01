import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getTransporter } from '@/lib/validations/mailer';
import { adminGenericFormEmail } from '@/lib/validations/emailTemplates';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data || !data.first_name || !data.last_name || !data.email || !data.amount) {
      return NextResponse.json(
        { error: 'All payment fields are required' },
        { status: 400 }
      );
    }

    // 1. Optional: Send Email alert to Admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const bcc = [process.env.BCC_EMAIL_1, process.env.BCC_EMAIL_2].filter(Boolean) as string[];
      const fromAddress = process.env.SMTP_FROM || (process.env.SMTP_USER as string);
      const transporter = getTransporter();
      
      const admin = adminGenericFormEmail("Payment Attempt", data, "email");
      
      await transporter.sendMail({
          from: fromAddress,
          to: adminEmail,
          bcc,
          replyTo: admin.replyTo,
          subject: admin.subject,
          html: admin.html,
      }).catch(err => console.error("Error sending payment alert email:", err));
    }

    // 2. Save to DB
    const client = await clientPromise;
    const db = client.db();
    
    const paymentRecord = {
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      amount: data.amount,
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
