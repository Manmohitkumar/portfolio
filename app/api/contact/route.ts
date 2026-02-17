import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: ContactPayload = {};
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = asString(body.name).trim();
  const email = asString(body.email).trim();
  const message = asString(body.message).trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Message must be at least 10 characters." },
      { status: 400 }
    );
  }

  // Sanitize inputs
  const sanitizedName = name.replace(/[<>\"']/g, "");
  const sanitizedMessage = message.replace(/[<>\"']/g, "");

  if (!sanitizedName || !sanitizedMessage) {
    return NextResponse.json({ error: "Invalid input detected." }, { status: 400 });
  }

  // EmailJS credentials
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const contactTo = process.env.CONTACT_TO;

  if (!serviceId || !templateId || !publicKey || !contactTo) {
    console.error("[Contact API] Missing EmailJS config");
    return NextResponse.json(
      { error: "Email service is not configured on the server." },
      { status: 500 }
    );
  }

  try {
    console.log("[Contact API] Sending via EmailJS REST API");
    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: sanitizedName,
        from_email: email,
        message: sanitizedMessage,
        to_email: contactTo,
      },
    };

    const resp = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("[Contact API] EmailJS error:", resp.status, text);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 502 }
      );
    }

    console.log("[Contact API] Email sent successfully");
    return NextResponse.json({ ok: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
