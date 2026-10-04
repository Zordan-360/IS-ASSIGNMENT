"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client (so GSAP can set initial states before paint),
 * useEffect on the server (avoids the SSR warning).
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
