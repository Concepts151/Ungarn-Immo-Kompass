// 5. For App Router (app/api/send-email/route.ts)
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../lib/email";
import { createWelcomeEmail } from "@/lib/email-templates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, message, name } = body;

    if (!to || !subject || !message) {
      return NextResponse.json(
        { message: "Missing required fields: to, subject, message" },
        { status: 400 }
      );
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">${subject}</h2>
        ${name ? `<p><strong>From:</strong> ${name}</p>` : ""}
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          ${message.replace(/\n/g, "<br>")}
        </div>
      </div>
    `;

    const templateMsg = createWelcomeEmail(name);

    const success = await sendEmail({
      to,
      subject: templateMsg.subject,
      text: message,
      html: templateMsg.html,
    });

    if (success) {
      return NextResponse.json({ message: "Email sent successfully" });
    } else {
      return NextResponse.json(
        { message: "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
