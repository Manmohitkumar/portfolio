type Stat = { label: string; value: string };
type Service = { emoji: string; title: string; description: string };

export default function AboutSection() {
  const stats: Stat[] = [
    { label: "University", value: "Chandigarh University" },
    { label: "Year", value: "2nd" },
    { label: "Hackathons", value: "3 (incl. SIH rounds)" },
    { label: "Winning", value: "2 (Hackathons)" },
    { label: "Internships", value: "2 (Game & Web development) (Social Internship)" },
  ];

  const services: Service[] = [
    {
      emoji: "💡",
      title: "End-to-End Development",
      description: "Design and development of modern, responsive websites • Frontend with React & Tailwind CSS • Backend & API with Node.js • Deployment-ready, performance-optimized applications",
    },
    {
      emoji: "🧩",
      title: "Problem-Solving & Logic",
      description: "Strong understanding of Data Structures & Algorithms • Breaking down complex problems into scalable solutions • Writing clean, readable, and maintainable code",
    },
    {
      emoji: "🤝",
      title: "Collaboration & Mentorship",
      description: "Team-based projects and hackathon experience • Helping peers with project guidance & debugging • Clear documentation and technical explanations",
    },
    {
      emoji: "🌱",
      title: "Growth & Innovation Mindset",
      description: "Quick learner of new tools and technologies • Passion for AI-driven applications • Consistent focus on improving skills and delivering quality results",
    },
  ];

  const strengths: string[] = [
    "Full-stack web development with React, Node.js, Tailwind CSS",
    "Real-world project experience in hackathons & internships",
    "Strong problem-solving with Data Structures & Algorithms",
    "Building scalable, user-friendly, responsive applications",
    "Clean code practices and performance optimization",
    "Quick learner adapting to new technologies and frameworks",
  ];

  const focusAreas: string[] = [
    "Modern responsive portfolio and business websites",
    "Full-stack applications combining design with efficiency",
    "AI-driven applications and automation solutions",
    "Technical mentorship and project guidance",
    "Emerging technologies and future-ready systems",
    "Learning by building practical solutions",
  ];

  return (
    <section id="about" className="section-divider scroll-mt-24 pt-16" data-reveal>
      <div aria-hidden="true" className="divider-line mb-10" />
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        About Me
      </h2>

      {/* Main About Box */}
      <div className="mt-6 rounded-[24px] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-8 backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-base leading-relaxed text-white/80">
              Hey, I'm <span className="font-semibold text-white/95">Manmohit Kumar</span> — a motivated and detail-oriented technology enthusiast with a strong foundation in web development, software engineering, and problem-solving.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              I enjoy building practical digital solutions that combine clean design with efficient functionality. I have worked on real-world projects, hackathons, and internships, where I contributed to developing responsive websites, full-stack applications, and innovative tech solutions.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              I'm always curious to explore emerging technologies like AI, automation, and modern frameworks, and I focus on <span className="font-semibold text-white/95">learning by building</span>.
            </p>
          </div>
          <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-xs text-white/70 backdrop-blur lg:block">
            <div className="font-semibold text-white/90 mb-3">✨ Why Me?</div>
            <p className="leading-relaxed">
              I don't just build projects<br />— I build solutions that<br />work, scale, and create<br />impact.
            </p>
          </div>
        </div>
      </div>

      {/* What I Offer Section */}
      <div className="mt-12">
        <h3 className="mb-6 text-lg font-semibold text-white/90">
          🛠️ What I Offer in the Technical Field
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="glass-panel rounded-[24px] border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 transition hover:border-cyan-300/20 hover:bg-white/[0.08]"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{service.emoji}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white/90">{service.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-white/65">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
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

          <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-6">
            <div className="text-sm text-white/70 leading-relaxed">
              <div className="text-lg font-bold text-white/95 mb-2">✨ Why Work With Me?</div>
              <p>I don't just build projects — I build solutions that work, scale, and create impact. I combine technical expertise with a collaborative mindset and a passion for continuous learning.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="glass-panel rounded-[24px] p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm font-semibold text-white/90">
                Core Skills
              </div>
              <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.6)]" />
            </div>

            <ul className="mt-4 space-y-2">
              {strengths.map((t) => (
                <li key={t} className="flex gap-2 text-xs text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/90 shadow-[0_0_14px_rgba(34,211,238,0.5)]" />
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
