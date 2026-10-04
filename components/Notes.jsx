"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

const NOTES = [
  {
    n: "01",
    title: "Scroll, not time",
    body: "The stage is pinned for roughly 2.6 viewports of scroll and the timeline playhead IS the scroll position — nothing runs on a timer.",
  },
  {
    n: "02",
    title: "Scrub + easing",
    body: "scrub: 1 adds a second of catch-up so the motion is interpolated rather than welded to the wheel. Each beat carries its own ease.",
  },
  {
    n: "03",
    title: "Transform only",
    body: "Position, scale and rotation are the only animated properties, so scrolling never triggers layout or paint — only compositing.",
  },
];

/**
 * Notes — a quiet closing section that documents the technique.
 * Kept deliberately small so the hero stays the subject of the page.
 */
export default function Notes() {
  const root = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);
      gsap.from(q("[data-reveal]"), {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="notes" className="relative border-t border-white/[0.08] bg-ink">
      <div className="mx-auto max-w-stage px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <p data-reveal className="eyebrow">
          Notes on the motion
        </p>

        <h2
          data-reveal
          className="mt-5 max-w-2xl text-[clamp(1.6rem,3.6vw,2.9rem)] font-light leading-[1.1] tracking-tight text-bone"
        >
          One scrubbed timeline. Four beats. Fully reversible.
        </h2>

        <dl className="mt-12 grid grid-cols-1 gap-px sm:mt-16 sm:grid-cols-3">
          {NOTES.map((note) => (
            <div key={note.n} data-reveal className="border-t border-white/10 py-6 sm:pr-8">
              <dt className="flex items-baseline gap-3">
                <span className="num text-[11px] tracking-[0.2em] text-fizz">{note.n}</span>
                <span className="text-[15px] font-medium tracking-tight text-bone">
                  {note.title}
                </span>
              </dt>
              <dd className="mt-3 max-w-sm text-[13px] font-light leading-relaxed text-muted">
                {note.body}
              </dd>
            </div>
          ))}
        </dl>

        <footer
          data-reveal
          className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.24em] text-muted sm:mt-20 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>Welcome Itz Fizz — Motion Study 01</span>
          <span>Next.js · Tailwind CSS · GSAP ScrollTrigger</span>
        </footer>
      </div>
    </section>
  );
}
