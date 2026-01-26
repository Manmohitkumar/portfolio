import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
import { createClient } from "@supabase/supabase-js";

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

  // Sanitize inputs to prevent XSS/injection attacks
  const sanitizedName = name.replace(/[<>\"']/g, "");
  const sanitizedMessage = message.replace(/[<>\"']/g, "");

  if (!sanitizedName || !sanitizedMessage) {
    console.log("[Contact API] Validation failed: potential injection detected");
    return NextResponse.json({ error: "Invalid input detected." }, { status: 400 });
  }

  // --- NEW: Robust Supabase Insert ---
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);

      // We don't 'await' this or we wrap it in a way that doesn't block the email
      // if the network/DNS is failing for Supabase.
      supabase.from("contact_submissions").insert([
        {
          name: sanitizedName,
          email,
          message: sanitizedMessage,
          metadata: { ua: req.headers.get("user-agent"), ip: req.headers.get("x-forwarded-for") || "unknown" },
        },
      ]).then(({ error }) => {
        if (error) console.error("[Contact API] Supabase background insert failed:", error.message);
        else console.log("[Contact API] Saved to Supabase");
      });
    }
  } catch (err) {
    console.error("[Contact API] Supabase setup error:", err);
  }

  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  // Clean the password: remove spaces and dashes to match Gmail's internal format
  const pass = process.env.SMTP_PASS?.replace(/[\s-]/g, "");
  const to = process.env.CONTACT_TO;

  console.log("[Contact API] SMTP Config Check:", {
    host,
    port: portRaw,
    user,
    hasPass: !!pass,
    to
  });

  // Prefer SendGrid API on serverless platforms when configured.
  const sendgridKey = process.env.SENDGRID_API_KEY;
  if (sendgridKey) {
    try {
      sgMail.setApiKey(sendgridKey);
      const sgMsg = {
        to: process.env.CONTACT_TO || user,
        from: user || process.env.SMTP_USER || "no-reply@example.com",
        replyTo: email,
        subject: `New Message from ${sanitizedName}`,
        text: `Name: ${sanitizedName}\nEmail: ${email}\n\nMessage:\n${sanitizedMessage}`,
      };
      await sgMail.send(sgMsg as any);
      return NextResponse.json({ ok: true, message: "Message sent via SendGrid." });
    } catch (err) {
      console.error("[Contact API] SendGrid send failed:", err);
      // fall through to SMTP/Ethereal fallback
    }
  }
  // If SMTP config is missing, in production we should not attempt to send.
  // In development, create a Nodemailer test account (Ethereal) so local testing works without real creds.
  let transporter: nodemailer.Transporter | null = null;

  if (!host || !portRaw || !user || !pass || !to) {
    if (process.env.NODE_ENV === "production") {
      // In production, indicate that SMTP isn't configured so the frontend
      // can present a mailto fallback (actionHref) to the user.
      return NextResponse.json(
        { error: "Email delivery is not configured on the server.", code: "SMTP_NOT_CONFIGURED" },
        { status: 503 }
      );
    }

    try {
      console.log("[Contact API] SMTP missing — creating Nodemailer test account for development");
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      // override `to` to the test account mailbox for inspection
      // but keep original `to` if provided
      if (!to) {
        // Ethereal shows received messages in preview URL; set `to` to testAccount.user
        // so it appears in the test inbox
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        process.env.CONTACT_TO = testAccount.user;
      }
    } catch (err) {
      console.error("[Contact API] Failed to create test SMTP account:", err);
      return NextResponse.json({ ok: true, message: "Message saved to database. (Email disabled)" });
    }
  } else {
    const port = Number(portRaw);
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  try {
    const sendTo = to || process.env.CONTACT_TO;
    const safeFromName = sanitizedName.slice(0, 50);
    const info = await transporter.sendMail({
      to: sendTo,
      from: `"Portfolio Contact" <${user || process.env.SMTP_USER || "no-reply@example.com"}>`,
      replyTo: email,
      subject: `New Message from ${safeFromName}`,
      text: `Name: ${sanitizedName}\nEmail: ${email}\n\nMessage:\n${sanitizedMessage}`,
    });

    // If using Ethereal in dev, return the preview URL so developer can inspect the email.
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log("[Contact API] Preview URL:", previewUrl);
      return NextResponse.json({ ok: true, message: "Message sent (dev test account)", previewUrl });
    }

    return NextResponse.json({ ok: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("[Contact API] Email failed:", err);
    return NextResponse.json(
      { error: "Message saved to database, but email delivery failed. Check your SMTP credentials.", code: "EMAIL_DELIVERY_FAILED" },
      { status: 502 }
    );
  }
}
