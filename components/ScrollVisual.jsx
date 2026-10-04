"use client";

import CarTopView from "./CarTopView";

/**
 * ScrollVisual — the object the scroll drives.
 *
 * Structure rule used throughout: every animated layer is wrapped in a
 * CSS-centred, transform-free container, and GSAP animates the INNER element.
 * That keeps Tailwind's `-translate-x-1/2` centring from being overwritten by
 * GSAP's inline transform, and the layout still looks right with JS disabled.
 *
 * Animated hooks (all consumed by Hero.jsx):
 *   [data-visual-car]      translateX / translateY / scale / rotate
 *   [data-visual-shadow]   counter-parallax ground shadow
 *   [data-visual-glow]     ambient bloom behind the vehicle
 *   [data-visual-ring]     thin solid ring, scales with the sweep
 *   [data-visual-ring-2]   dashed ring, rotates with scroll progress
 *   [data-visual-streaks]  motion streaks, fade + stretch during the sweep
 */
export default function ScrollVisual() {
  return (
    <div data-visual className="pointer-events-none relative h-full w-full">
      {/* ---------- ambient bloom ---------- */}
      <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2">
        <div
          data-visual-glow
          className="h-full w-full will-transform"
          style={{
            background:
              "radial-gradient(circle at center, rgba(203,255,77,0.13) 0%, rgba(120,160,255,0.07) 34%, rgba(7,8,10,0) 68%)",
          }}
        />
      </div>

      {/* ---------- rings ---------- */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          data-visual-ring
          className="aspect-square h-[min(118%,82vw)] rounded-full border border-white/[0.07] will-transform"
        />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          data-visual-ring-2
          className="aspect-square h-[min(86%,62vw)] rounded-full border border-dashed border-white/[0.12] will-transform"
        />
      </div>

      {/* ---------- motion streaks ---------- */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          data-visual-streaks
          className="flex w-[min(74vw,860px)] origin-center flex-col items-center gap-[3.2vh] will-transform"
        >
          {[
            { w: "100%", o: 0.5 },
            { w: "86%", o: 0.32 },
            { w: "64%", o: 0.22 },
            { w: "86%", o: 0.32 },
            { w: "100%", o: 0.5 },
          ].map((line, i) => (
            <span
              key={i}
              className="h-px"
              style={{
                width: line.w,
                opacity: line.o,
                background:
                  "linear-gradient(90deg, rgba(242,241,237,0) 0%, rgba(242,241,237,0.55) 50%, rgba(242,241,237,0) 100%)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ---------- ground shadow (counter-parallax) ---------- */}
      <div className="absolute left-1/2 top-[64%] -translate-x-1/2 -translate-y-1/2">
        <div
          data-visual-shadow
          className="h-[min(9%,3.2vh)] w-[min(52%,28vh)] rounded-[50%] bg-black/75 blur-[20px] will-transform"
        />
      </div>

      {/* ---------- the vehicle ---------- */}
      <div className="absolute left-1/2 top-1/2 h-[92%] max-h-[560px] -translate-x-1/2 -translate-y-1/2">
        <div data-visual-car className="h-full will-transform">
          <CarTopView className="h-full w-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.75)]" />
        </div>
      </div>
    </div>
  );
}
