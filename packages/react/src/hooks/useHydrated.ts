// packages/react/src/hooks/useHydrated.ts
import * as React from "react";

const subscribe = () => () => {};

/**
 * `false` on the server and during hydration's first client render, `true` once the component
 * is running in the browser for real. Backed by `useSyncExternalStore`, so the server HTML and
 * the hydrating render always agree (no "text content did not match" warnings); the client then
 * re-renders with `true` and mounts browser-only UI such as portals.
 *
 * Prefer this to `typeof window !== "undefined"`, which is already `true` while hydrating.
 */
export function useHydrated(): boolean {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/**
 * `useLayoutEffect` in the browser, `useEffect` on the server (where layout effects warn).
 * Decided per call rather than at module load, so a module shared by a server render and a
 * browser (tests, some SSR setups) still picks the right one each time.
 */
export function useIsomorphicLayoutEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
): void {
  const useEffectImpl = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;
  useEffectImpl(effect, deps);
}
