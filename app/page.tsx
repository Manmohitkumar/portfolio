import Hero from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ClientEffects from "@/components/ClientEffects";
import ContactSection from "@/components/ContactSection";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <main className="site-bg min-h-screen text-white">
      <div id="top" />
      <ClientEffects />
      <Hero />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-24">
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </div>

      {/* NEW: Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="divider-line" />
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-white/70">
              © {new Date().getFullYear()} Manmohit Kumar • Built with Next.js
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                className="glass-chip focus-ring rounded-xl px-3 py-2 text-xs text-white/80 transition hover:border-cyan-300/30 hover:bg-white/5"
                href="https://github.com/Manmohitkumar"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="glass-chip focus-ring rounded-xl px-3 py-2 text-xs text-white/80 transition hover:border-cyan-300/30 hover:bg-white/5"
                href="https://www.linkedin.com/in/manmohit-kumar/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="glass-chip focus-ring rounded-xl px-3 py-2 text-xs text-white/80 transition hover:border-cyan-300/30 hover:bg-white/5"
                href="#top"
              >
                Back to top ↑
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
