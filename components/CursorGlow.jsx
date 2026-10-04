"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * CursorGlow — a very faint pool of light that trails the pointer.
 *
 * Deliberately gated: fine-pointer devices only, and never under
 * prefers-reduced-motion. Uses `gsap.quickTo` (a pre-compiled setter) so the
 * pointermove handler does almost no work.
 */
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    // Centring lives in GSAP's transform (xPercent/yPercent) so it composes
    // with the x/y the pointer drives, instead of being overwritten.
    gsap.set(el, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      gsap.to(el, { opacity: 1, duration: 0.5, overwrite: "auto" });
    };
    const onLeave = () => gsap.to(el, { opacity: 0, duration: 0.6, overwrite: "auto" });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[420px] w-[420px] rounded-full opacity-0 mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(203,255,77,0.055) 0%, rgba(126,150,255,0.04) 34%, rgba(0,0,0,0) 70%)",
        willChange: "transform",
      }}
    />
  );
}
