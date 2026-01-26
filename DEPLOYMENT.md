# Deployment & Production Environment Setup

This file lists the production environment variables and steps to deploy the `PORTTT` project safely.

## Required env vars (choose one method)

1) Preferred — SendGrid (API-based sending)

- `SENDGRID_API_KEY` — Your SendGrid API key (store as secret)
- `CONTACT_TO` — Destination email for contact form messages
- `SENDGRID_FROM` (optional) — Sender email address shown in outgoing messages

1) Or — SMTP

- `SMTP_HOST` — SMTP server (e.g., smtp.sendgrid.net)
- `SMTP_PORT` — Port (587 or 465)
- `SMTP_USER` — SMTP username
- `SMTP_PASS` — SMTP password (supply exact credential; spaces/dashes are stripped by code)
- `CONTACT_TO` — Destination email

## Optional (Supabase logging)

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — Service role key for server writes (store as secret)

## Where to set them

- Vercel (Production): Project → Settings → Environment Variables → Add New → set `Name` and `Value` → select `Production` → Save → Redeploy.
- GitHub Actions (CI secrets): Repo → Settings → Secrets and variables → Actions → New repository secret.

## Test locally

- Add values to `.env.local` in the repo root (do NOT commit this file).

SendGrid test:

```bash
cd PORTTT
node scripts/send_test_sendgrid.js
```

SMTP test:

```bash
cd PORTTT
node scripts/send_test_email.js
```

Run dev server:

```bash
cd PORTTT
npm run dev
# Open http://localhost:3000 and submit the contact form
```

## Health endpoint

After deployment, verify configuration at:

```
https://<your-deploy-url>/api/_health

# Example response
# { ok: true, services: { sendgrid: true, smtp: false, supabase: false }, note: "..." }
```

## CI

- The repository includes a GitHub Actions workflow `.github/workflows/ci.yml` which will:
  - Install dependencies
  - Conditionally check env vars (runs the check only if email-related secrets are present)
  - Run `npm run build`

If you want stricter CI (always require envs), update the workflow or set repository secrets before merging.

## Security

- Never commit secrets. Use Vercel env vars and GitHub Actions secrets.
- Use the Supabase service role key only on server code.

---
If you want, I can also create a Vercel CLI script or GitHub Actions instruction snippet to automate adding these environment variables.
