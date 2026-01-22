"use client";

import { useEffect, useRef, useState } from "react";

function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
}

export default function ClientEffects() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  // Important: default to `false` so the first client render matches SSR output.
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    setEnabled(!reduced && !isCoarsePointer());
  }, []);

  useEffect(() => {
    // Section reveal
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "80px 0px -10% 0px" }
    );

    for (const el of els) io.observe(el);

    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const onMove = (ev: PointerEvent) => {
      tx = ev.clientX;
      ty = ev.clientY;

      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;

        // small smoothing for the glow
        x += (tx - x) * 0.18;
        y += (ty - y) * 0.18;

        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        }
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!mounted || !enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50">
      {/* glow */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-2xl"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(34,211,238,0.22), rgba(168,85,247,0.10), transparent 62%)",
          mixBlendMode: "screen",
        }}
      />
      {/* dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(34,211,238,0.95), rgba(168,85,247,0.95))",
          boxShadow: "0 0 18px rgba(34,211,238,0.45)",
        }}
      />
    </div>
  );
}
