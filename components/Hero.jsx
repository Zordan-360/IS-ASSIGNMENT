"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import Stats from "./Stats";
import ScrollVisual from "./ScrollVisual";

const WORDS = ["WELCOME", "ITZ", "FIZZ"];

/* Labels for the progress rail — one per beat of the scroll timeline. */
const PHASES = ["ignition", "sweep", "counter turn", "arrive"];
const PHASE_STOPS = [0.26, 0.6, 0.84, 1.01];

/**
 * Hero
 * -----------------------------------------------------------------------------
 * Everything that moves lives here:
 *
 *  1. an intro timeline (page load) — staggered character reveal, then the
 *     supporting copy, then the statistics;
 *  2. a scrubbed ScrollTrigger timeline (page scroll) — a four-beat sequence
 *     that drives the vehicle's translate / scale / rotate, plus the reaction
 *     of the headline, statistics, rings, streaks and glow.
 *
 * Notes for review
 *  - Only `transform` and `opacity` are animated. No layout-affecting props.
 *  - Position values are functions (not constants) and are combined with
 *    `invalidateOnRefresh: true`, so a resize re-measures everything cleanly.
 *  - `scrub: 1` gives the 1-second catch-up interpolation that makes the
 *    motion feel weighted instead of glued to the wheel.
 *  - `gsap.matchMedia()` owns both the responsive branches AND the
 *    prefers-reduced-motion branch, and `mm.revert()` tears the whole thing
 *    down (tweens, ScrollTriggers, pin spacers, inline styles) on unmount.
 */
export default function Hero() {
  const root = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const q = gsap.utils.selector(root);

    // --- element handles -----------------------------------------------------
    const chars = q("[data-char]");
    const sub = q("[data-hero-sub]");
    const statRules = q("[data-stat-rule]");
    const statValues = q("[data-stat-value]");
    const statLabels = q("[data-stat-label]");

    const car = q("[data-visual-car]");
    const glow = q("[data-visual-glow]");
    const shadow = q("[data-visual-shadow]");
    const ring = q("[data-visual-ring]");
    const ring2 = q("[data-visual-ring-2]");
    const streaks = q("[data-visual-streaks]");

    const caption = q("[data-hero-caption]");
    const cue = q("[data-scroll-cue]");
    const rail = q("[data-rail]");
    const railFill = q("[data-rail-fill]");
    const railBar = q("[data-rail-bar]");
    const railValue = q("[data-rail-value]");
    const railPhase = q("[data-rail-phase]");

    const everything = [
      ...chars,
      ...sub,
      ...statRules,
      ...statValues,
      ...statLabels,
      ...car,
      ...glow,
      ...shadow,
      ...ring,
      ...ring2,
      ...streaks,
      ...caption,
      ...cue,
      ...rail,
    ];

    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 768px)",
        mobile: "(max-width: 767px)",
      },
      (ctx) => {
        const { reduced, desktop } = ctx.conditions;
        const wide = !!desktop;

        /* ==================================================================
           Reduced motion — simplify to a single calm fade. No pin, no scrub.
           ================================================================== */
        if (reduced) {
          // Undo the CSS pre-intro state, then a single short fade.
          gsap.set(everything, { clearProps: "all" });
          gsap.set(everything, { opacity: 1 });

          gsap
            .timeline({ defaults: { ease: "none" } })
            .from([...chars], { opacity: 0, duration: 0.45, stagger: 0.012 })
            .from([...sub, ...statValues, ...statLabels], { opacity: 0, duration: 0.45 }, 0.1)
            .from([...car, ...glow, ...ring, ...ring2], { opacity: 0, duration: 0.5 }, 0);

          gsap.set([...cue, ...rail, ...streaks], { opacity: 0 });
          return;
        }

        /* ==================================================================
           Responsive motion constants (re-evaluated on every refresh)
           ================================================================== */
        const sweepX = () => window.innerWidth * (wide ? 0.3 : 0.17);
        const liftY = () => window.innerHeight * (wide ? 0.05 : 0.032);
        const spread = (i, t, a) => (i - (a.length - 1) / 2) * (wide ? 9 : 4);

        /* ==================================================================
           1 · Initial states — set before first paint (useLayoutEffect)
           ================================================================== */
        gsap.set(chars, { yPercent: 70, opacity: 0 });
        gsap.set(sub, { y: 14, opacity: 0 });
        gsap.set(statRules, { scaleX: 0 });
        gsap.set(statValues, { y: 18, opacity: 0 });
        gsap.set(statLabels, { opacity: 0 });
        gsap.set(car, { opacity: 0, scale: 0.94, yPercent: 5 });
        gsap.set([...ring, ...ring2], { opacity: 0, scale: 0.92 });
        gsap.set(ring2, { rotate: -20 });
        gsap.set(glow, { opacity: 0, scale: 0.88 });
        gsap.set(shadow, { opacity: 0, scale: 0.9 });
        gsap.set(streaks, { opacity: 0, scaleX: 0.15 });
        gsap.set(caption, { opacity: 0, y: 18 });
        gsap.set([...rail, ...cue], { opacity: 0 });

        /* ==================================================================
           2 · Page-load intro (elegant, no bounce)
           ================================================================== */
        const introTl = gsap
          .timeline({ defaults: { ease: "power3.out" }, delay: 0.08 })
          .to(chars, { yPercent: 0, opacity: 1, duration: 1.15, stagger: 0.028 }, 0)
          .to(car, { opacity: 1, scale: 1, yPercent: 0, duration: 1.9, ease: "expo.out" }, 0.12)
          .to(glow, { opacity: 1, scale: 1, duration: 1.8, ease: "expo.out" }, 0.2)
          .to(shadow, { opacity: 0.6, scale: 1, duration: 1.6, ease: "expo.out" }, 0.2)
          .to([...ring, ...ring2], { opacity: 1, scale: 1, duration: 1.7, ease: "expo.out" }, 0.24)
          .to(sub, { y: 0, opacity: 1, duration: 0.95 }, 0.5)
          .to(statRules, { scaleX: 1, duration: 0.95, ease: "power2.inOut", stagger: 0.09 }, 0.62)
          .to(statValues, { y: 0, opacity: 1, duration: 0.95, stagger: 0.1 }, 0.72)
          .to(statLabels, { opacity: 1, duration: 0.75, stagger: 0.1 }, 0.84)
          .to([...rail, ...cue], { opacity: 1, duration: 0.9 }, 1.05);

        /* ==================================================================
           3 · Scroll-driven sequence — pinned stage, scrubbed timeline
           ================================================================== */
        let lastPhase = -1;
        let introSettled = false;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * (wide ? 2.6 : 2.05))}`,
            scrub: wide ? 1 : 0.65, // 1s of catch-up = smooth interpolation
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;

              // If the visitor scrolls while the intro is still playing, settle
              // it instantly so the two timelines never fight over a property.
              if (p > 0.002) settleIntro();

              if (railValue[0]) {
                railValue[0].textContent = String(Math.round(p * 100)).padStart(2, "0");
              }
              if (railPhase[0]) {
                const idx = PHASE_STOPS.findIndex((stop) => p < stop);
                if (idx !== -1 && idx !== lastPhase) {
                  lastPhase = idx;
                  railPhase[0].textContent = PHASES[idx];
                }
              }
            },
          },
        });

        // Progress read-outs ride the same scrubbed timeline.
        tl.to(railFill, { scaleY: 1, duration: 1, ease: "none" }, 0).to(
          railBar,
          { scaleX: 1, duration: 1, ease: "none" },
          0
        );

        /* ---- beat 1 · 0.00 → 0.26 · IGNITION ------------------------------ */
        tl.to(car, { scale: 1.06, y: () => -liftY() * 0.6, rotate: -6, ease: "power2.inOut", duration: 0.26 }, 0)
          .to(glow, { scale: 1.12, duration: 0.26, ease: "power2.inOut" }, 0)
          .to(ring, { scale: 1.06, duration: 0.26, ease: "power2.inOut" }, 0)
          .to(ring2, { rotate: 60, duration: 0.26, ease: "power1.inOut" }, 0)
          .to(shadow, { scale: 1.05, opacity: 0.5, duration: 0.26 }, 0)
          .to(chars, { x: spread, duration: 0.26, ease: "power2.inOut" }, 0)
          .to(sub, { opacity: 0.3, y: -8, duration: 0.26, ease: "power2.inOut" }, 0)
          .to(cue, { opacity: 0, duration: 0.12 }, 0.1);

        /* ---- beat 2 · 0.26 → 0.60 · SWEEP -------------------------------- */
        tl.to(car, { x: sweepX, y: liftY, rotate: 15, scale: 0.92, ease: "power1.inOut", duration: 0.34 }, 0.26)
          .to(glow, { x: () => sweepX() * 0.55, scale: 1.24, ease: "power1.inOut", duration: 0.34 }, 0.26)
          .to(shadow, { x: () => -sweepX() * 0.16, scale: 1.12, opacity: 0.42, ease: "power1.inOut", duration: 0.34 }, 0.26)
          .to(ring, { scale: 1.16, opacity: 0.5, ease: "power1.inOut", duration: 0.34 }, 0.26)
          .to(ring2, { rotate: 165, scale: 1.08, ease: "power1.inOut", duration: 0.34 }, 0.26)
          .to(streaks, { opacity: 0.7, scaleX: 1, ease: "power2.out", duration: 0.24 }, 0.26)
          .to(chars, { x: 0, y: -12, opacity: 0.4, ease: "power1.inOut", duration: 0.34 }, 0.26)
          .to(sub, { opacity: 0, duration: 0.2 }, 0.26)
          .to(statValues, { y: -16, opacity: 0, ease: "power2.in", duration: 0.18, stagger: 0.05 }, 0.28)
          .to(statLabels, { opacity: 0, duration: 0.16, stagger: 0.05 }, 0.28)
          .to(statRules, { scaleX: 0, ease: "power2.in", duration: 0.2, stagger: 0.05 }, 0.32);

        /* ---- beat 3 · 0.60 → 0.84 · COUNTER TURN ------------------------- */
        tl.to(car, { x: () => -sweepX() * 0.92, y: () => -liftY() * 0.35, rotate: -13, scale: 1.0, ease: "power1.inOut", duration: 0.24 }, 0.6)
          .to(glow, { x: () => -sweepX() * 0.5, scale: 1.16, ease: "power1.inOut", duration: 0.24 }, 0.6)
          .to(shadow, { x: () => sweepX() * 0.14, scale: 1.0, opacity: 0.6, ease: "power1.inOut", duration: 0.24 }, 0.6)
          .to(ring, { scale: 1.02, opacity: 0.75, ease: "power1.inOut", duration: 0.24 }, 0.6)
          .to(ring2, { rotate: 250, scale: 0.98, ease: "power1.inOut", duration: 0.24 }, 0.6)
          .to(streaks, { opacity: 0.24, scaleX: 0.55, ease: "power1.inOut", duration: 0.24 }, 0.6)
          .to(chars, { x: (i, t, a) => -spread(i, t, a) * 0.7, y: -6, opacity: 0.55, ease: "power1.inOut", duration: 0.24 }, 0.6);

        /* ---- beat 4 · 0.84 → 1.00 · ARRIVE ------------------------------- */
        tl.to(car, { x: 0, y: 0, rotate: 0, scale: 1.12, ease: "power2.out", duration: 0.16 }, 0.84)
          .to(glow, { x: 0, scale: 1.34, ease: "power2.out", duration: 0.16 }, 0.84)
          .to(shadow, { x: 0, scale: 1.16, opacity: 0.75, ease: "power2.out", duration: 0.16 }, 0.84)
          .to(ring, { scale: 1.28, opacity: 0.28, ease: "power2.out", duration: 0.16 }, 0.84)
          .to(ring2, { rotate: 322, scale: 1.12, ease: "power2.out", duration: 0.16 }, 0.84)
          .to(streaks, { opacity: 0, scaleX: 0.3, duration: 0.14 }, 0.84)
          .to(chars, { x: 0, y: 0, opacity: 1, ease: "power2.out", duration: 0.16 }, 0.84)
          .to(caption, { opacity: 1, y: 0, ease: "power2.out", duration: 0.14 }, 0.86);

        /**
         * The scrubbed timeline captures its "from" values the first time it
         * renders — which happens while the intro is still mid-flight. Settle
         * the intro and invalidate once it is done, so scrolling back to the
         * top returns every element to its true resting state.
         */
        function settleIntro() {
          if (introSettled) return;
          introSettled = true;
          introTl.totalProgress(1);
          tl.invalidate();
        }
        introTl.eventCallback("onComplete", settleIntro);

        // Webfonts can change text metrics after the pin distance was measured.
        if (document.fonts?.ready) {
          document.fonts.ready.then(() => ScrollTrigger.refresh());
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      aria-labelledby="hero-title"
      className="stage-h relative w-full overflow-hidden"
    >
      <div className="relative z-10 mx-auto flex h-full max-w-stage flex-col px-5 sm:px-8 lg:px-12">
        {/* ---------------- brand row ---------------- */}
        <header className="flex items-center justify-between pt-6 sm:pt-8">
          <div className="flex items-center gap-2.5">
            <span className="h-[6px] w-[6px] rounded-full bg-fizz" />
            <span className="eyebrow !text-bone">ITZ&nbsp;FIZZ</span>
          </div>
          <p className="eyebrow hidden sm:block">Motion Study — 01</p>
          <p className="eyebrow sm:hidden">01</p>
        </header>

        {/* ---------------- headline ---------------- */}
        <div className="mt-5 h-sm:mt-8 h-md:mt-10 h-lg:mt-12">
          <h1
            id="hero-title"
            className="flex flex-col items-center gap-y-1 text-[clamp(1.9rem,10.4vw,3.1rem)] font-semibold leading-[1.12] tracking-[0.22em] text-bone sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-[0.55em] sm:gap-y-2 sm:text-[clamp(2.4rem,6.1vw,5.4rem)]"
          >
            {WORDS.map((word) => (
              <span key={word} className="-mr-[0.22em] inline-flex items-baseline">
                {word.split("").map((ch, i) => (
                  <span
                    key={`${word}-${i}`}
                    className="inline-block overflow-hidden pb-[0.08em]"
                  >
                    <span data-char className="inline-block will-transform">
                      {ch}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p
            data-hero-sub
            className="mx-auto mt-4 max-w-[22rem] text-center text-[13px] font-light leading-relaxed text-muted h-md:mt-5 h-lg:mt-6 sm:max-w-md sm:text-[15px]"
          >
            Experience motion designed around every scroll.
          </p>

          {/* scroll cue */}
          <div
            data-scroll-cue
            className="mt-6 hidden flex-col items-center gap-2 h-md:flex h-lg:mt-9"
            aria-hidden="true"
          >
            <span className="text-[9px] uppercase tracking-[0.4em] text-muted">scroll</span>
            <span className="relative block h-8 w-px overflow-hidden bg-white/10">
              <span className="cue-dot absolute left-0 top-0 block h-4 w-px bg-fizz" />
            </span>
          </div>
        </div>

        {/* ---------------- the scroll-driven object ---------------- */}
        <div className="relative mt-2 min-h-0 flex-1">
          <ScrollVisual />
        </div>

        {/* ---------------- impact metrics ---------------- */}
        <div className="relative pb-5 pt-1 h-md:pb-7 h-md:pt-2 h-lg:pb-9">
          <Stats />
          <div
            data-hero-caption
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-5"
          >
            <div className="max-w-md text-center">
              <span className="mx-auto mb-3 block h-px w-16 bg-fizz/50" />
              <p className="text-[12px] font-light leading-relaxed text-muted sm:text-[13px]">
                Position, scale and rotation are all interpolated from one scrubbed
                ScrollTrigger timeline — reversible at any point.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- progress rail (desktop / tablet) ---------------- */}
      <div
        data-rail
        className="pointer-events-none absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 sm:flex"
        aria-hidden="true"
      >
        <span data-rail-value className="num text-[10px] tracking-[0.18em] text-muted">
          00
        </span>
        <span className="relative block h-28 w-px bg-white/12">
          <span
            data-rail-fill
            className="absolute inset-x-0 top-0 block h-full origin-top scale-y-0 bg-fizz"
          />
        </span>
        <span
          data-rail-phase
          className="text-[9px] uppercase tracking-[0.32em] text-muted [writing-mode:vertical-rl]"
        >
          ignition
        </span>
      </div>

      {/* ---------------- progress bar (mobile) ---------------- */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-white/10 sm:hidden">
        <span data-rail-bar className="block h-full w-full origin-left scale-x-0 bg-fizz/70" />
      </div>
    </section>
  );
}
