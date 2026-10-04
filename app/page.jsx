import Backdrop from "@/components/Backdrop";
import CursorGlow from "@/components/CursorGlow";
import Hero from "@/components/Hero";
import Notes from "@/components/Notes";

export default function Home() {
  return (
    <>
      <a
        href="#hero-title"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-fizz focus:px-4 focus:py-2 focus:text-[11px] focus:uppercase focus:tracking-[0.24em] focus:text-ink"
      >
        Skip to content
      </a>

      <Backdrop />
      <CursorGlow />

      <main className="relative z-10">
        {/* Pinned, scroll-driven hero — the subject of the assignment */}
        <Hero />

        {/* Short documentation section that follows the pinned stage */}
        <Notes />
      </main>
    </>
  );
}
