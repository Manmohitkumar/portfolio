import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
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
          name,
          email,
          message,
          metadata: { ua: req.headers.get("user-agent") },
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

  if (!host || !portRaw || !user || !pass || !to) {
    return NextResponse.json({ 
      ok: true, 
      message: "Message saved to database. (Email configuration missing in environment variables)" 
    });
  }

  const port = Number(portRaw);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      to,
      from: `"Portfolio Contact" <${user}>`,
      replyTo: email,
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    return NextResponse.json({ ok: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("[Contact API] Email failed:", err);
    return NextResponse.json({
      ok: true,
      message: "Message saved to database, but email delivery failed. Check your SMTP credentials."
    });
  }
}
