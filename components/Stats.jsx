/**
 * Stats — the three impact metrics.
 *
 * Purely presentational: every element exposes a `data-*` hook so Hero.jsx can
 * drive the intro stagger and the scroll-driven exit without prop drilling or
 * ref plumbing.
 */

const STATS = [
  { value: 98, label: "Smooth Interaction" },
  { value: 87, label: "Scroll Engagement" },
  { value: 95, label: "Visual Impact" },
];

export default function Stats({ className = "" }) {
  return (
    <ul
      data-stats
      className={`grid w-full grid-cols-1 sm:grid-cols-3 sm:gap-0 ${className}`}
    >
      {STATS.map((stat, i) => (
        <li
          key={stat.label}
          data-stat
          className={`relative px-0 py-2.5 h-md:py-4 h-lg:py-5 ${
            i > 0 ? "sm:border-l sm:border-white/10 sm:pl-7" : ""
          } ${i > 0 ? "sm:ml-7" : ""}`}
        >
          {/* Hairline rule — animated (scaleX) rather than a static border */}
          <span
            data-stat-rule
            className="absolute inset-x-0 top-0 h-px origin-left bg-white/15"
          />

          <div className="flex items-baseline justify-between gap-6 sm:block">
            <span
              data-stat-value
              className="num block text-[clamp(2rem,3.6vw,3.3rem)] font-light leading-[0.9] tracking-tight text-bone"
            >
              {stat.value}
              <span className="ml-1 align-top text-[0.3em] font-normal tracking-normal text-muted">
                %
              </span>
            </span>

            <span data-stat-label className="eyebrow mt-0 block text-right sm:mt-4 sm:text-left">
              {stat.label}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
