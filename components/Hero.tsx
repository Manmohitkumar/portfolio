"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type NavItem = { label: string; href: string };

export default function Hero() {
  const roleTitles = useMemo(
    () => [
      "AI Developer",
      "Full-Stack Developer",
      "Hackathon Team Leader",
      "Tech Innovator",
      "Problem Solver",
    ],
    []
  );

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleKey, setRoleKey] = useState(0);

  // NEW: sticky nav shadow on scroll
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roleTitles.length);
      setRoleKey((k) => k + 1); // retrigger animation
    }, 2200);
    return () => window.clearInterval(id);
  }, [roleTitles.length]);

  return (
    <section className="relative overflow-hidden">
      {/* Background: simplified (avoid Tailwind arbitrary-value classes that can break SSR chunk parsing in some setups) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(900px circle at 20% 10%, rgba(34,211,238,0.22), transparent 55%), radial-gradient(900px circle at 80% 35%, rgba(168,85,247,0.18), transparent 52%), radial-gradient(700px circle at 50% 100%, rgba(59,130,246,0.12), transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* Top nav (NEW: fixed + premium shadow) */}
      <header className="fixed inset-x-0 top-4 z-40">
        <div className="mx-auto max-w-6xl px-5">
          <div
            className={[
              "glass-panel flex items-center justify-between rounded-2xl px-4 py-3 transition",
              scrolled
                ? "bg-white/10 shadow-[0_22px_70px_rgba(0,0,0,0.55)]"
                : "bg-white/6 shadow-[0_14px_45px_rgba(0,0,0,0.25)]",
            ].join(" ")}
          >
            <Link
              href="/"
              className="focus-ring group inline-flex items-center gap-2 font-semibold tracking-tight"
              aria-label="Home"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.85)]" />
              <span className="text-white/90">
                Manmohit<span className="text-white">.dev</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="focus-ring rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="focus-ring ml-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:border-cyan-300/40 hover:bg-white/15"
              >
                Let's Build
              </a>
            </nav>

            <button
              type="button"
              className="focus-ring inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/90 transition hover:bg-white/10 md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              Menu
            </button>
          </div>

          {mobileOpen ? (
            <div
              id="mobile-nav"
              className="glass-panel mt-3 rounded-2xl p-3 md:hidden"
            >
              <div className="grid gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="mt-1 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:border-cyan-300/40 hover:bg-white/15"
                  onClick={() => setMobileOpen(false)}
                >
                  Let's Build Something Powerful
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      {/* Hero (NEW: add top padding to account for fixed nav) */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-28 md:pb-28 md:pt-32">
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div data-reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-300 shadow-[0_0_14px_rgba(168,85,247,0.75)]" />
              Elite portfolio - dark-mode first - glass UI
            </div>

            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Manmohit{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Kumar
              </span>
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-sm text-white/70">I build:</span>
              <span
                key={roleKey}
                className="relative inline-flex animate-role-in items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white backdrop-blur transition duration-300 ease-out"
              >
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.75)]" />
                {roleTitles[roleIndex]}
              </span>
            </div>

            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/75 md:text-lg">
              A passionate developer focused on AI-powered products, full-stack
              systems, and real-world problem solving. Experienced in hackathons,
              internships, and building scalable applications using modern web
              technologies.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#projects"
                className="focus-ring group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 px-5 py-3 text-sm font-semibold text-[#070A12] shadow-[0_18px_45px_rgba(34,211,238,0.18)] transition hover:brightness-110"
              >
                View Featured Projects
                <span className="ml-2 opacity-70 transition group-hover:translate-x-0.5">
                  {"->"}
                </span>
              </a>
              <a
                href="#contact"
                className="focus-ring inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10 hover:text-white"
              >
                Let's Build Something Powerful
              </a>
            </div>

            {/* NEW: metrics row */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Hackathons", value: "3 (incl. SIH rounds)" },
                { label: "Focus", value: "AI + Full-Stack" },
                { label: "Strength", value: "Rapid execution" },
              ].map((m) => (
                <div key={m.label} className="glass-panel rounded-2xl px-4 py-3">
                  <div className="text-xs text-white/55">{m.label}</div>
                  <div className="mt-1 text-sm font-semibold text-white/90">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-white/60">
              <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                Futuristic • Brutalist-Luxury
              </span>
              <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                Neon accents • Clean motion
              </span>
              <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                Recruiter-ready • Hackathon-grade
              </span>
            </div>
          </div>

          {/* Right glass card (NEW: quick links + stronger hierarchy) */}
          <div data-reveal className="relative">
            <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-b from-cyan-300/20 via-purple-300/10 to-transparent blur-2xl" />
            <div className="glass-panel relative rounded-[28px] p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white/90">
                  Status Console
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.75)]" />
                  Online
                </div>
              </div>

              {/* NEW: quick links */}
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  className="glass-chip focus-ring rounded-xl px-3 py-2 text-xs text-white/80 transition hover:border-cyan-300/30 hover:bg-white/5"
                  href="https://github.com/Manmohitkumar"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub →
                </a>
                <a
                  className="glass-chip focus-ring rounded-xl px-3 py-2 text-xs text-white/80 transition hover:border-cyan-300/30 hover:bg-white/5"
                  href="https://www.linkedin.com/in/manmohit-kumar/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn →
                </a>
                <a
                  className="glass-chip focus-ring rounded-xl px-3 py-2 text-xs text-white/80 transition hover:border-cyan-300/30 hover:bg-white/5"
                  href="mailto:mohitchetiwal291@gmail.com"
                >
                  Email →
                </a>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-white/55">Focus</div>
                  <div className="mt-1 text-sm font-medium text-white/90">
                    AI + Full-Stack Systems
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-white/55">Strength</div>
                  <div className="mt-1 text-sm font-medium text-white/90">
                    Rapid prototyping under pressure
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-white/55">Signal</div>
                  <div className="mt-1 text-sm font-medium text-white/90">
                    Clean UI • Real-world impact • Scalable builds
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-4">
                <div className="text-xs text-white/60">
                  Next sections will include: skills, projects, experience, and
                  contact.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* removed styled-jsx keyframes (moved to globals.css) */}
      </div>
    </section>
  );
}
