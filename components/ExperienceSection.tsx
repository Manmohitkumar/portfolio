type TimelineItem = {
  title: string;
  org?: string;
  meta?: string;
  bullets: string[];
};

function TimelineBlock({
  heading,
  items,
}: {
  heading: string;
  items: TimelineItem[];
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-semibold text-white/90">{heading}</h3>
        <div className="h-2.5 w-2.5 rounded-full bg-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.55)]" />
      </div>

      <div className="mt-5 grid gap-5">
        {items.map((it) => (
          <div key={`${it.title}-${it.org ?? ""}`} className="relative pl-6">
            <div className="absolute left-2 top-0 h-full w-px bg-white/10" />
            <div className="absolute left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.55)]" />

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <div className="text-sm font-semibold text-white/90">
                {it.title}
              </div>
              {it.org ? (
                <div className="text-xs text-white/60">• {it.org}</div>
              ) : null}
              {it.meta ? (
                <div className="text-xs text-white/50">• {it.meta}</div>
              ) : null}
            </div>

            <ul className="mt-2 space-y-2">
              {it.bullets.map((b) => (
                <li key={b} className="text-sm leading-relaxed text-white/70">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const education: TimelineItem[] = [
    {
      title: "B.Tech in Computer Science",
      org: "Planned / Ongoing",
      meta: "Chandigarh University",
      bullets: [
        "Focus: AI & Software Development",
        "Building strong foundations in Computer Science & Software Engineering",
        "Focus on Data Structures, Algorithms, and problem-solving",
        "Hands-on experience through projects, hackathons, and internships",
      ],
    },
    {
      title: "Senior Secondary (Class 11–12)",
      org: "PCMB — Physics, Chemistry, Mathematics, Biology",
      bullets: [
        "Developed strong analytical and scientific thinking",
        "Balanced exposure to engineering and life sciences",
        "Strengthened logical reasoning and quantitative skills",
      ],
    },
    {
      title: "Secondary (Class 10)",
      org: "Science Stream",
      bullets: [
        "Built a solid academic foundation across core subjects",
        "Early exposure to logical thinking and technology",
        "Sparked long-term interest in computer science",
      ],
    },
  ];

  const experience: TimelineItem[] = [
    {
      title: "Social Internship",
      org: "Red Cross Society (Mohali)",
      bullets: [
        "Supported blood donation camps and on-ground coordination.",
        "Assisted Jan Aushadhi Kendra support initiatives.",
        "Participated in women SHG meetings and community work.",
        "Planning + coordination in real operational environments.",
      ],
    },
    {
      title: "Internship",
      org: "SMG Motors",
      bullets: [
        "Worked on gaming projects and related development tasks.",
        "Assisted with portal management and technical operations.",
        "Hands-on execution across tech + product needs.",
      ],
    },
  ];

  return (
    <section id="experience" className="section-divider scroll-mt-24 pt-16" data-reveal>
      <div aria-hidden="true" className="divider-line mb-10" />
      <div>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Education & Experience
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
          Proof of work and leadership — from community impact to shipping builds
          under real constraints.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <TimelineBlock heading="Education" items={education} />
        <TimelineBlock heading="Experience" items={experience} />
      </div>
    </section>
  );
}
