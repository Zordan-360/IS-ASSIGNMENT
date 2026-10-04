/**
 * Backdrop — a fixed, non-interactive atmosphere layer.
 *
 * Deliberately quiet: two radial light pools, a masked technical grid,
 * a vignette and a handful of drifting dust motes. It never competes with
 * the headline or the vehicle.
 *
 * The mote positions come from a seeded PRNG computed at module scope, so the
 * server and the client render identical markup (no hydration mismatch).
 */

const mulberry32 = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const MOTES = (() => {
  const rand = mulberry32(20240617);
  return Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${(rand() * 100).toFixed(3)}%`,
    top: `${(rand() * 100).toFixed(3)}%`,
    size: (1 + rand() * 1.8).toFixed(2),
    opacity: (0.06 + rand() * 0.16).toFixed(3),
    duration: (14 + rand() * 18).toFixed(1),
    delay: (-rand() * 22).toFixed(1),
  }));
})();

export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Two soft light pools */}
      <div
        className="absolute -left-[18%] -top-[22%] h-[70vmax] w-[70vmax] rounded-full opacity-70 blur-[2px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(72,92,140,0.20) 0%, rgba(72,92,140,0.06) 38%, rgba(7,8,10,0) 68%)",
        }}
      />
      <div
        className="absolute -bottom-[26%] -right-[14%] h-[62vmax] w-[62vmax] rounded-full opacity-80"
        style={{
          background:
            "radial-gradient(circle at center, rgba(203,255,77,0.09) 0%, rgba(203,255,77,0.03) 34%, rgba(7,8,10,0) 66%)",
        }}
      />

      {/* Technical grid */}
      <div className="env-grid absolute inset-0" />

      {/* Dust motes */}
      {MOTES.map((m) => (
        <span
          key={m.id}
          className="absolute rounded-full bg-bone"
          style={{
            left: m.left,
            top: m.top,
            width: `${m.size}px`,
            height: `${m.size}px`,
            opacity: m.opacity,
            animation: `drift ${m.duration}s ease-in-out ${m.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 78% 62% at 50% 46%, rgba(7,8,10,0) 42%, rgba(7,8,10,0.72) 100%)",
        }}
      />
    </div>
  );
}
