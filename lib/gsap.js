"use client";

/**
 * Single place where GSAP + plugins are registered.
 *
 * Importing this module guarantees ScrollTrigger is registered exactly once,
 * no matter how many components use it, and keeps plugin wiring out of the UI.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  // Mobile browsers fire resize when the URL bar hides/shows; ignoring that
  // prevents the pinned section from jumping mid-scroll.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };
