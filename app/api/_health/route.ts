import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
    // Do not expose secrets. Only report whether key env vars are present.
    const hasSendGrid = !!process.env.SENDGRID_API_KEY;
    const hasSmtp = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.CONTACT_TO);
    const hasSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY));

    return NextResponse.json({
        ok: true,
        services: {
            sendgrid: hasSendGrid,
            smtp: hasSmtp,
            supabase: hasSupabase,
        },
        note: "This endpoint reports availability of configured services (does not reveal secrets).",
    });
}
