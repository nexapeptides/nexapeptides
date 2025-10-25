import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await resend.emails.send({
      from: "NexaPeptides <onboarding@resend.dev>",
      to: "nexapeptides@gmail.com",
      subject: `New Ambassador Application — ${data.name}`,
      text: `
New Ambassador Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Instagram: ${data.instagram}
TikTok: ${data.tiktok}
Preferred Code: ${data.code}

Terms:
They agree to promote NexaPeptidesRX and earn 10% per referral.
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error });
  }
}