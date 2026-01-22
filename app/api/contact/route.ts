import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
    console.log("[Contact API] Parsed request body");
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = asString(body.name).trim();
  const email = asString(body.email).trim();
  const message = asString(body.message).trim();

  if (!name || !email || !message) {
    console.log("[Contact API] Validation failed: missing fields");
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    console.log("[Contact API] Validation failed: invalid email");
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  if (message.length < 10) {
    console.log("[Contact API] Validation failed: message too short");
    return NextResponse.json(
      { error: "Message must be at least 10 characters." },
      { status: 400 }
    );
  }

  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO ?? user;

  console.log("[Contact API] SMTP config", {
    hasHost: Boolean(host),
    hasPort: Boolean(portRaw),
    hasUser: Boolean(user),
    hasPass: Boolean(pass),
    hasTo: Boolean(to),
  });

  if (!host || !portRaw || !user || !pass || !to) {
    return NextResponse.json(
      {
        error:
          "Email not configured on the server yet. Please use the email link below to contact.",
        code: "SMTP_NOT_CONFIGURED",
      },
      { status: 500 }
    );
  }

  const port = Number(portRaw);
  if (!Number.isFinite(port)) {
    return NextResponse.json({ error: "Invalid SMTP_PORT." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },

    // Prevent long hangs -> fewer aborted/ECONNRESET issues in dev/prod
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  console.log("[Contact API] Created nodemailer transporter");

  const subject = `Portfolio inquiry from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message,
    "",
    "— Sent from Manmohit's portfolio contact form",
  ].join("\n");

  try {
    await transporter.sendMail({
      to,
      from: `Portfolio Contact <${user}>`,
      replyTo: email,
      subject,
      text,
    });
    console.log("[Contact API] Sent email");
  } catch (err) {
    console.error("[Contact API] sendMail failed", err);

    const code =
      typeof err === "object" && err !== null && "code" in err
        ? String((err as { code?: unknown }).code)
        : undefined;

    const friendly =
      code === "ECONNRESET" || code === "ETIMEDOUT"
        ? "SMTP connection failed (ECONNRESET/timeout). Check SMTP_HOST/PORT and provider settings."
        : "Failed to send email. Try again later.";

    return NextResponse.json({ error: friendly }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
