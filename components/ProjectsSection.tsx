type Project = {
  name: string;
  category: string;
  description: string;
  tech: string[];
  highlights: string[];
  role: string[];
  link?: string;
  // NEW (optional)
  repo?: string;
};

function Pill({ children }: { children: string }) {
  return (
    <span className="glass-chip rounded-xl px-2.5 py-1.5 text-[11px] text-white/75">
      {children}
    </span>
  );
}

export default function ProjectsSection() {
  const projects: Project[] = [
    {
      name: "ProofPort",
      category: "SIH Hackathon / Web Application",
      link: "https://proof-port-39.base44.app/",
      description:
        "A Smart India Hackathon solution to showcase verified proofs of work, achievements, certificates, and real-world contributions with a structured verification workflow.",
      tech: ["HTML", "CSS", "JavaScript", "Responsive UI", "Base44"],
      highlights: [
        "Proof submission + categorization",
        "Verification workflow for judges/evaluators",
        "Dashboard with status tags",
        "Recruiter/judge-friendly responsive UI",
      ],
      role: [
        "Built the full frontend UI (responsive)",
        "Created proof submission + dashboard pages",
        "Optimized navigation for judges/evaluators",
        "UI testing and visual polish",
      ],
    },
    {
      name: "Metaverse Project",
      category: "Web / Immersive Experience",
      link: "https://proof-port-jrtw.vercel.app/",
      description:
        "A browser-based interactive 3D environment where users explore and interact with virtual space elements, demonstrating immersive web UX and navigation.",
      tech: ["React", "Three.js (or 3D web libs)", "Vercel"],
      highlights: [
        "Interactive 3D environment in-browser",
        "Clickable objects + exploratory layout",
        "Smooth movement/camera navigation",
        "Responsive across devices",
      ],
      role: [
        "Built the 3D canvas + environment logic",
        "Integrated interaction mechanics",
        "Designed exploration/navigation flow",
        "Cross-device testing",
      ],
    },
    {
      name: "Text-to-Image Generator",
      category: "AI / Generative Tool",
      link: "https://zingy-sunburst-b29ed1.netlify.app/",
      description:
        "An AI-driven text-to-image generator that converts prompts into images using an external model API, with gallery + history for rapid iteration.",
      tech: ["React", "Tailwind CSS", "Node.js", "Clipdrop Text-to-Image API", "Netlify"],
      highlights: [
        "Prompt → image generation flow",
        "Optional style selection",
        "Gallery output + history panel",
        "Async processing for fast UX",
      ],
      role: [
        "Designed the UI (prompt + gallery)",
        "Integrated the text-to-image API",
        "Built history + random prompt features",
        "Tested for smooth UX",
      ],
    },
    {
      name: "Money Mate",
      category: "AI / Personal Finance",
      link: "https://money-mate.base44.app/",
      description:
        "An AI assistant for personal finance that provides budgeting suggestions and money insights through a conversational chat UI.",
      tech: ["HTML", "CSS", "JavaScript", "OpenAI API", "Base44"],
      highlights: [
        "AI advice for income/expense questions",
        "Personalized budgeting suggestions",
        "Conversational chat interface",
        "Responsive UI",
      ],
      role: [
        "Built AI logic for financial guidance",
        "Implemented interactive chat UI",
        "Connected backend processing",
        "UX optimization and testing",
      ],
    },
    {
      name: "AI-Powered Personal Assistant",
      category: "AI / Conversational Assistant",
      description:
        "A conversational AI assistant web interface designed for helpful, structured answers and follow-up context handling.",
      tech: ["React", "Node.js", "OpenAI API"],
      highlights: [
        "Conversational UI with clean input flow",
        "Handles follow-up questions (context-aware)",
        "Dynamic AI responses designed for clarity",
      ],
      role: [
        "Designed conversational flows",
        "Built the chat UI",
        "Integrated backend AI responses",
        "Tested logical handling and edge cases",
      ],
    },
    {
      name: "CivicEye",
      category: "Tech / Social Impact",
      description:
        "A civic issue reporting platform that lets citizens report local problems and track updates with map-based visualization and dashboards.",
      tech: ["JavaScript", "HTML/CSS", "Node.js", "Firebase Auth", "Google Maps API", "Vercel"],
      highlights: [
        "Issue reporting + tracking flow",
        "Location mapping and visualization",
        "User dashboard + status updates",
        "Built for civic engagement/accountability",
      ],
      role: [
        "Designed frontend UX",
        "Integrated maps/location APIs",
        "Built authentication + dashboard pages",
        "Supported team coordination",
      ],
    },
    {
      name: "SMG Motor Runner",
      category: "Internship Project / 3D Game (SMG Motors)",
      description:
        "A 3D endless runner inspired by Subway Surfers, built around electric scooter gameplay with optimized controls and infinite road spawning.",
      tech: ["Unity", "C#", "3D Assets & Animations"],
      highlights: [
        "Three-lane endless runner system",
        "Scooter-based mechanics",
        "Infinite modular environment spawning",
        "Performance-optimized gameplay loop",
      ],
      role: [
        "Implemented gameplay systems during internship",
        "Worked with assets/animations and scene setup",
        "Focused on smooth controls + performance",
      ],
    },
  ];

  // NEW: "case-study" banner gradients (no images needed)
  const banners = [
    "linear-gradient(135deg, rgba(34,211,238,0.22), rgba(168,85,247,0.14), rgba(0,0,0,0))",
    "linear-gradient(135deg, rgba(59,130,246,0.20), rgba(34,211,238,0.12), rgba(0,0,0,0))",
    "linear-gradient(135deg, rgba(168,85,247,0.20), rgba(59,130,246,0.12), rgba(0,0,0,0))",
  ] as const;

  return (
    <section id="projects" className="section-divider scroll-mt-24 pt-16" data-reveal>
      {/* NEW */}
      <div aria-hidden="true" className="divider-line mb-10" />

      <div>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Featured Projects
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
          Detailed, high-signal builds across hackathons, AI tools, immersive 3D,
          and real-world platforms.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {projects.map((p, idx) => (
          <article
            key={p.name}
            className="glass-panel group relative overflow-hidden rounded-[24px] transition hover:-translate-y-0.5 hover:border-cyan-300/30"
          >
            {/* NEW: case-study header banner */}
            <div className="relative h-28 overflow-hidden border-b border-white/10">
              <div
                className="absolute inset-0"
                style={{ backgroundImage: banners[idx % banners.length] }}
              />
              <div
                className="absolute inset-0 opacity-[0.16]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
                  backgroundSize: "54px 54px",
                }}
              />
              <div className="relative flex h-full items-end justify-between p-5">
                <div>
                  <div className="text-[11px] text-white/60">{p.category}</div>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-white/92">
                    {p.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/85 transition hover:border-cyan-300/40 hover:bg-white/10"
                    >
                      Live →
                    </a>
                  ) : (
                    <span className="rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-xs text-white/60">
                      Live soon
                    </span>
                  )}

                  {p.repo ? (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/85 transition hover:border-purple-300/40 hover:bg-white/10"
                    >
                      Code →
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm leading-relaxed text-white/70">
                {p.description}
              </p>

              <div className="mt-4">
                <div className="text-xs font-medium text-white/75">
                  Tech Stack
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div>
                  <div className="text-xs font-medium text-white/75">
                    Key Features
                  </div>
                  <ul className="mt-2 space-y-2">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-white/70">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/90 shadow-[0_0_14px_rgba(34,211,238,0.5)]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs font-medium text-white/75">My Role</div>
                  <ul className="mt-2 space-y-2">
                    {p.role.map((r) => (
                      <li key={r} className="flex gap-2 text-sm text-white/70">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-300/90 shadow-[0_0_14px_rgba(168,85,247,0.45)]" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* NEW: subtle hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -inset-10 bg-gradient-to-b from-cyan-300/10 via-purple-300/5 to-transparent blur-2xl" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
