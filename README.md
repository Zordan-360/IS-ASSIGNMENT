# WELCOME ITZ FIZZ — Scroll-Driven Hero Section

A single-page, premium hero experience where the central visual is **driven entirely by
scroll position** — not by a timer, not by a CSS keyframe loop.

Built with **Next.js (App Router)**, **Tailwind CSS**, **JavaScript** and **GSAP
ScrollTrigger**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

---

## Where everything lives

| Concern | File |
| --- | --- |
| **Hero UI** (headline, sub-copy, metrics, progress rail, layout) | `components/Hero.jsx` |
| **GSAP / ScrollTrigger logic** (intro timeline + 4-beat scrubbed scroll timeline) | `components/Hero.jsx` (all of it, in one `gsap.matchMedia()` block) |
| **The scroll-driven object** (vehicle, rings, streaks, glow, shadow) | `components/ScrollVisual.jsx` |
| **Impact metrics** | `components/Stats.jsx` |
| **Vehicle artwork** (hand-authored SVG, no external asset) | `components/CarTopView.jsx` → also exported to `public/assets/car-top-view.svg` |
| **Ambient background** (light pools, grid, dust, vignette) | `components/Backdrop.jsx` |
| **Pointer light** (desktop-only, `gsap.quickTo`) | `components/CursorGlow.jsx` |
| **Closing notes section** | `components/Notes.jsx` |
| **Styles** (tokens, `.env-grid`, pre-intro state, keyframes, reduced-motion) | `app/globals.css` |
| **Tailwind theme** (colours, type scale, height-aware breakpoints) | `tailwind.config.js` |
| **GSAP plugin registration** (single place) | `lib/gsap.js` |
| **SSR-safe layout effect** | `hooks/useIsomorphicLayoutEffect.js` |
| **Page composition / metadata / webfont** | `app/page.jsx`, `app/layout.jsx` |

---

## The scroll animation

One `gsap.timeline()` is bound to a pinned stage:

```js
scrollTrigger: {
  trigger: stage,
  start: "top top",
  end: () => `+=${window.innerHeight * 2.6}`,   // 2.05× on mobile
  scrub: 1,            // 1s of catch-up → smooth interpolation, never jittery
  pin: true,
  invalidateOnRefresh: true,
}
```

`scrub: 1` means the playhead eases toward the scroll position instead of being welded
to it, so the motion keeps its weight in both directions. Scroll up and every transform
re-traces its path exactly.

### Four beats

| Progress | Beat | What happens |
| --- | --- | --- |
| `0.00 → 0.26` | **ignition** | Vehicle lifts, scales up, tilts −6°. Headline characters spread apart from the centre. |
| `0.26 → 0.60` | **sweep** | Vehicle sweeps right (+30 vw) with `power1.inOut`, rotates to +15°, scales down. Motion streaks fade in and stretch. Metrics exit downward with a stagger. |
| `0.60 → 0.84` | **counter turn** | Vehicle crosses back to the left and rotates past zero to −13°; rings counter-rotate. |
| `0.84 → 1.00` | **arrive** | Vehicle parks centred at 1.12× scale, rotation 0; headline returns; the closing caption fades up. |

The dashed ring rotates `−20° → 322°` across the whole timeline, the ground shadow
parallaxes against the vehicle, and the progress rail (right edge on desktop, bottom
edge on mobile) is scrubbed by the same timeline.

---

## Implementation notes

**Performance**

- Only `transform` and `opacity` are animated — nothing triggers layout or paint.
- Every position value is a **function** (`x: () => window.innerWidth * 0.3`) combined
  with `invalidateOnRefresh: true`, so resizes re-measure instead of caching stale pixels.
- `ScrollTrigger.config({ ignoreMobileResize: true })` stops the pin from jumping when
  mobile URL bars hide.
- The vehicle is one inline SVG (≈11 KB) — no raster image, no network request.
- `gsap.matchMedia()` owns every branch; `mm.revert()` on unmount removes tweens,
  ScrollTriggers, pin spacers and inline styles. No leaks.

**Hydration**

- `hooks/useIsomorphicLayoutEffect.js` swaps `useLayoutEffect` → `useEffect` on the server.
- An inline script in `<head>` adds `.js` to `<html>`; `globals.css` then holds the
  pre-intro state (`.js [data-char] { opacity: 0 }`). The server HTML therefore paints
  already hidden, so there is no flash of finished layout before GSAP takes over — and
  with JavaScript disabled the class is never added and the hero stays fully readable.
- `<html suppressHydrationWarning>` is required for that class-based technique.
- The scrubbed timeline captures its "from" values on first render, which happens while
  the intro is still playing; `settleIntro()` re-invalidates it once the intro is done so
  scrolling back to the top always returns the true resting state.

**Accessibility**

- Semantic structure: `header` / `h1` / `p` / `ul` / `dl` / `footer`, one `h1`, one `h2`.
- The SVG carries `role="img"` and a descriptive `aria-label`; all decoration is
  `aria-hidden`.
- Skip link, visible `:focus-visible` ring, keyboard-reachable content.
- `prefers-reduced-motion: reduce` → no pin, no scrub, no parallax, no cursor glow. The
  hero renders as a single static screen with one short cross-fade (see the `reduced`
  branch in `Hero.jsx` and the media query at the end of `globals.css`).

**Responsive**

- Desktop ≥ 768 px: horizontal metrics row, vertical progress rail, 2.6 viewports of run.
- Mobile < 768 px: headline stacks into three lines, metrics stack with hairline rules,
  a bottom progress bar replaces the rail, and the run shortens to 2.05 viewports with a
  snappier `scrub: 0.65`.
- Height-aware Tailwind screens (`h-sm` / `h-md` / `h-lg`) compress the vertical rhythm
  and hide the scroll cue on short laptops so the hero always fits in one screen.
- The vehicle is sized as a percentage of the space it is given (`h-[92%]` of the flex
  region, capped), so it can never collide with the headline or the metrics.
- Verified at 1440×900, 1280×720, 820×1100 and 390×844: no horizontal overflow, no
  clipped content.

---

## Tech

`next` · `react` · `tailwindcss` · `gsap` (+ `ScrollTrigger`). That's the entire runtime
dependency list — no Lenis, no Framer Motion, no icon or component libraries.
