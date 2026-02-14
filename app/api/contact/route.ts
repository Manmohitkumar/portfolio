import { NextResponse } from "next/server";
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
  // Prefer EmailJS if configured (service/template/public key)
  const emailjsService = process.env.EMAILJS_SERVICE_ID;
  const emailjsTemplate = process.env.EMAILJS_TEMPLATE_ID;
  const emailjsUser = process.env.EMAILJS_PUBLIC_KEY || process.env.EMAILJS_USER;

  if (emailjsService && emailjsTemplate && emailjsUser) {
    try {
      const payload = {
        service_id: emailjsService,
        template_id: emailjsTemplate,
        user_id: emailjsUser,
        template_params: {
          from_name: sanitizedName,
          from_email: email,
          message: sanitizedMessage,
          to_email: to || user || process.env.CONTACT_TO,
        },
      };

      const resp = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (resp.ok) {
        return NextResponse.json({ ok: true, message: "Message sent via EmailJS." });
      }

      const text = await resp.text();
      console.error("[Contact API] EmailJS send failed:", resp.status, text);
      // fall through to error response below
    } catch (err) {
      console.error("[Contact API] EmailJS error:", err);
    }
  }

  // If no server-side email provider is configured, in production we must
  // report that email delivery is not available. In development we save and
  // return success so devs can continue without real credentials.
  if (!sendgridKey && !(emailjsService && emailjsTemplate && emailjsUser) && (!host || !portRaw || !user || !pass || !to)) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Email delivery is not configured on the server.", code: "SMTP_NOT_CONFIGURED" },
        { status: 503 }
      );
    }

    console.log("[Contact API] No email provider configured; running in dev mode — email skipped.");
    return NextResponse.json({ ok: true, message: "Message saved to database. (Email disabled in this environment)" });
  }

  // If we reach here, one of the providers failed to send (SendGrid or EmailJS)
  console.error("[Contact API] Email delivery attempted but failed for all providers.");
  return NextResponse.json(
    { error: "Message saved to database, but email delivery failed.", code: "EMAIL_DELIVERY_FAILED" },
    { status: 502 }
  );
}
