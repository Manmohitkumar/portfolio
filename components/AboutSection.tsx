type Stat = { label: string; value: string };

export default function AboutSection() {
  const stats: Stat[] = [
    { label: "University", value: "Chandigarh University" },
    { label: "Semester", value: "4th" },
    { label: "Hackathons", value: "3 (incl. SIH rounds)" },
    { label: "Class 10", value: "80.9%" },
    { label: "Class 12 (PCMB)", value: "93.8%" },
  ];

  const strengths: string[] = [
    "Curious, self-driven problem solver; breaks complex systems into structured parts",
    "Calm under pressure; resilient with tight deadlines (hackathon execution)",
    "Leadership style: clarity + ownership, not authority; enables the team to perform",
    "Strong communication: explains complex ideas in simple terms",
    "Detail-oriented, feedback-positive, iterative improvement mindset",
  ];

  const focusAreas: string[] = [
    "Web development (frontend + backend fundamentals)",
    "System design approaches & workflow architecture",
    "AI / Generative AI concepts and API-based integrations",
    "Rapid prototyping (MVP), debugging, and technical presentation",
  ];

  return (
    <section id="about" className="section-divider scroll-mt-24 pt-16" data-reveal>
      <div aria-hidden="true" className="divider-line mb-10" />
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            About Me
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
            A disciplined and growth-oriented undergraduate with a strong PCMB
            foundation, national-level hackathon experience, and an execution-first
            mindset for building real-world solutions.
          </p>
        </div>
        <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70 backdrop-blur md:block">
          Discipline • Leadership • Rapid execution
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[24px] p-6">
          <div className="text-sm font-semibold text-white/90">
            Snapshot
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="text-xs text-white/55">{s.label}</div>
                <div className="mt-1 text-sm font-medium text-white/90">
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-4">
            <div className="text-xs text-white/60">
              Career objective: grow into a technology-driven role (Tech Lead /
              Product-minded engineer / Founder track) building impactful systems
              at the intersection of logic, creativity, and innovation.
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="glass-panel rounded-[24px] p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm font-semibold text-white/90">
                Strengths
              </div>
              <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.6)]" />
            </div>

            <ul className="mt-4 space-y-2">
              {strengths.map((t) => (
                <li key={t} className="flex gap-2 text-sm text-white/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/90 shadow-[0_0_14px_rgba(34,211,238,0.5)]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel rounded-[24px] p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm font-semibold text-white/90">
                Current Focus
              </div>
              <div className="h-2.5 w-2.5 rounded-full bg-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.55)]" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {focusAreas.map((item) => (
                <span
                  key={item}
                  className="glass-chip rounded-xl px-3 py-2 text-xs text-white/80 transition hover:border-cyan-300/30 hover:bg-white/5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
