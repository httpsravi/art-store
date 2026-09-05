import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Custom hook to safely run GSAP animations inside React components
 * with automatic context cleanup on unmount/re-render.
 */
export function useGsapContext(
  effect: (ctx: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const scope = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context((self) => {
      effect(self);
    }, scope);

    return () => ctx.revert();
  }, deps);

  return scope;
}

/**
 * Utility to check if user is on mobile screen
 */
export function isMobileScreen(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export { gsap, ScrollTrigger };
