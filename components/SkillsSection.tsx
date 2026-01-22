type SkillGroup = {
  title: string;
  subtitle: string;
  items: string[];
};

export default function SkillsSection() {
  const groups: SkillGroup[] = [
    {
      title: "Programming & Web",
      subtitle: "Modern web foundations + full-stack build speed",
      items: [
        "JavaScript",
        "HTML5",
        "CSS3",
        "JSON",
        "Node.js",
        "Express.js",
        "React.js",
        "Tailwind CSS",
      ],
    },
    {
      title: "AI & Advanced Tech",
      subtitle: "Building AI features that actually ship",
      items: [
        "Generative AI",
        "Prompt Engineering",
        "OpenAI API",
        "RAG (Retrieval-Augmented Generation)",
        "AI Automation (n8n concepts)",
        "Text-to-Image Systems",
      ],
    },
    {
      title: "Tools & Platforms",
      subtitle: "Deployment, integrations, and real-world tooling",
      items: [
        "Firebase Authentication",
        "Google Maps API",
        "Vercel Deployment",
        "Railway",
        "Git & GitHub",
        "Unity (basic)",
        "Blender (basic)",
        "Spline (3D assets)",
      ],
    },
    {
      title: "Soft Skills",
      subtitle: "Leading teams and winning under pressure",
      items: [
        "Leadership",
        "Hackathon Strategy",
        "Problem Solving",
        "Mentoring Team Members",
        "Rapid Learning",
      ],
    },
  ];

  return (
    <section id="skills" className="section-divider scroll-mt-24 pt-16" data-reveal>
      {/* NEW */}
      <div aria-hidden="true" className="divider-line mb-10" />

      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Skills
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
            A focused stack for building AI-powered products, scalable systems,
            and clean interfaces — fast.
          </p>
        </div>
        <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70 backdrop-blur md:block">
          Neon • Glass • Performance-first
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <div
            key={group.title}
            className="glass-panel rounded-[22px] p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-white/90">
                  {group.title}
                </h3>
                <p className="mt-1 text-xs text-white/60">{group.subtitle}</p>
              </div>
              <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.6)]" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="glass-chip rounded-xl px-3 py-2 text-xs text-white/80 transition hover:border-cyan-300/30 hover:bg-white/5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
