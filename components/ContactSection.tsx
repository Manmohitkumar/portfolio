"use client";

import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type ApiErrorCode = "SMTP_NOT_CONFIGURED";

type ApiErrorResponse = { error?: unknown; code?: unknown };

type Status =
  | { type: "idle" }
  | { type: "sending" }
  | { type: "success"; message: string }
  | {
    type: "error";
    message: string;
    actionHref?: string;
    actionLabel?: string;
  };

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!isValidEmail(form.email)) e.email = "Enter a valid email.";
    if (!form.message.trim()) e.message = "Message is required.";
    else if (form.message.trim().length < 10)
      e.message = "Message should be at least 10 characters.";
    return e;
  }, [form]);

  const canSubmit =
    status.type !== "sending" && Object.keys(errors).length === 0;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) {
      setStatus({ type: "error", message: "Please fix the form errors." });
      console.log("[Contact Form] Validation errors", errors);
      return;
    }

    setStatus({ type: "sending" });
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: any = await res.json().catch(() => ({}));

      if (!res.ok) {
        const d = (data ?? {}) as ApiErrorResponse;

        const msg =
          typeof d?.error === "string"
            ? d.error
            : "Something went wrong. Please try again.";

        const code = typeof d?.code === "string" ? d.code : undefined;

        if (code === ("SMTP_NOT_CONFIGURED" satisfies ApiErrorCode)) {
          const subject = `Portfolio inquiry from ${payload.name}`;
          const body = [`Name: ${payload.name}`, `Email: ${payload.email}`, "", payload.message].join(
            "\n"
          );

          setStatus({
            type: "error",
            message: msg,
            actionHref: `mailto:mohitchetiwal291@gmail.com?subject=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(body)}`,
            actionLabel: "Email me instead",
          });
          return;
        }

        setStatus({ type: "error", message: msg });
        return;
      }

      setStatus({
        type: "success",
        message: data.message || "Sent. I'll get back to you soon.",
      });
      setPreviewUrl(data?.previewUrl ?? null);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please try again in a moment.",
      });
    }
  }

  return (
    <section id="contact" className="section-divider scroll-mt-24 pt-16" data-reveal>
      <div aria-hidden="true" className="divider-line mb-10" />
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Let's Build Something Powerful
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
            Have an idea, role, or hackathon project that needs elite execution?
            Send a message — I respond fast.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <a
              href="https://github.com/Manmohitkumar"
              target="_blank"
              rel="noreferrer"
              className="glass-panel rounded-2xl px-4 py-3 text-sm text-white/85 transition hover:border-cyan-300/30"
              aria-label="GitHub"
            >
              <div className="text-xs text-white/60">GitHub</div>
              <div className="mt-1 font-semibold">@Manmohitkumar</div>
            </a>
            <a
              href="https://www.linkedin.com/in/manmohit-kumar/"
              target="_blank"
              rel="noreferrer"
              className="glass-panel rounded-2xl px-4 py-3 text-sm text-white/85 transition hover:border-cyan-300/30"
              aria-label="LinkedIn"
            >
              <div className="text-xs text-white/60">LinkedIn</div>
              <div className="mt-1 font-semibold">/in/manmohit-kumar</div>
            </a>
            <a
              href="mailto:mohitchetiwal291@gmail.com"
              className="glass-panel rounded-2xl px-4 py-3 text-sm text-white/85 transition hover:border-cyan-300/30 overflow-hidden"
              aria-label="Email"
            >
              <div className="text-xs text-white/60">Email</div>
              <div className="mt-1 font-semibold break-words whitespace-normal">mohitchetiwal291@gmail.com</div>
            </a>
          </div>
        </div>

        <div className="glass-panel rounded-[24px] p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-base font-semibold text-white/90">
              Contact Form
            </div>
            <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.6)]" />
          </div>

          <form className="mt-5 grid gap-4" onSubmit={onSubmit} noValidate>
            <label className="grid gap-2">
              <span className="text-xs font-medium text-white/70">Name</span>
              <input
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-cyan-300/40"
                placeholder="Your name"
                autoComplete="name"
              />
              {errors.name ? (
                <span className="text-xs text-rose-300">{errors.name}</span>
              ) : null}
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-medium text-white/70">Email</span>
              <input
                value={form.email}
                onChange={(e) =>
                  setForm((s) => ({ ...s, email: e.target.value }))
                }
                className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-cyan-300/40"
                placeholder="you@domain.com"
                autoComplete="email"
                inputMode="email"
              />
              {errors.email ? (
                <span className="text-xs text-rose-300">{errors.email}</span>
              ) : null}
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-medium text-white/70">Message</span>
              <textarea
                value={form.message}
                onChange={(e) =>
                  setForm((s) => ({ ...s, message: e.target.value }))
                }
                className="min-h-[130px] w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-cyan-300/40"
                placeholder="What are we building?"
              />
              {errors.message ? (
                <span className="text-xs text-rose-300">{errors.message}</span>
              ) : null}
            </label>

            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 px-5 py-3 text-sm font-semibold text-[#070A12] shadow-[0_18px_45px_rgba(34,211,238,0.18)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status.type === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status.type === "success" ? (
              <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
                <div>{status.message}</div>
                {previewUrl ? (
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-xs underline text-emerald-100"
                  >
                    Preview sent email (dev)
                  </a>
                ) : null}
              </div>
            ) : null}

            {status.type === "error" ? (
              <div className="rounded-2xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-100">
                <div>{status.message}</div>

                {status.actionHref && status.actionLabel ? (
                  <a
                    href={status.actionHref}
                    className="mt-3 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/10"
                  >
                    {status.actionLabel} {"->"}
                  </a>
                ) : null}
              </div>
            ) : null}

            <p className="text-xs text-white/50">
              Tip: Set SMTP env vars to enable email sending (see API route).
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
