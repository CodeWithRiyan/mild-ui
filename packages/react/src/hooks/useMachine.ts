// packages/react/src/hooks/useMachine.ts
import * as React from "react";

import { useIsomorphicLayoutEffect } from "./useHydrated";

/** The least a primitive instance must offer: a way to tear it down. */
export interface MachineInstance {
  destroy: () => void;
}

/** Builds a primitive instance on a mounted element. */
export type MachineFactory<
  Element extends HTMLElement,
  Options,
  Instance extends MachineInstance,
> = (element: Element, options: Options) => Instance;

export interface UseMachineResult<Element extends HTMLElement, Instance extends MachineInstance> {
  /** Put this on the element the primitive drives. Creates on mount, destroys on unmount. */
  ref: React.RefCallback<Element>;
  /** The live instance, or `null` before mount. Call its methods (`toggle`, `setValue`, ...) here. */
  instance: React.MutableRefObject<Instance | null>;
}

/**
 * Binds a framework-agnostic `@mild-ui/primitives` factory to a React element.
 *
 * The primitive owns the behaviour (roles, `aria-*`, keyboard handling); React owns rendering and
 * the props API. The split is:
 *
 *   - **create**: when the element mounts, `create(element, options)` runs once. Every
 *     function-valued option (callbacks such as `onChange`) is wrapped so the primitive always
 *     calls the *latest* render's callback, even though it only saw the first render's options.
 *   - **sync**: after each render where the instance exists, `sync(instance, options)` pushes
 *     the current options into it (`setChecked`, `setValue`, `setDisabled`, ...). It also runs
 *     right after any forwarded callback returns, so a controlled component whose parent ignores
 *     the change snaps back to the prop instead of drifting. Primitives' setters never call back
 *     into their `onChange`, so this cannot loop.
 *   - **deps**: if given, a change recreates the instance on the same element. Use it when the
 *     primitive reads something at creation time that can change later (for example, the label
 *     and message elements a field is wired to).
 *   - unmount (or a ref change to `null`) calls `destroy()`.
 */
export function useMachine<
  Element extends HTMLElement,
  Options extends object,
  Instance extends MachineInstance,
>(
  create: MachineFactory<Element, Options, Instance>,
  options: Options,
  sync?: (instance: Instance, options: Options) => void,
  deps: React.DependencyList = [],
): UseMachineResult<Element, Instance> {
  const instance = React.useRef<Instance | null>(null);
  const element = React.useRef<Element | null>(null);
  const latest = React.useRef({ create, options, sync });
  latest.current = { create, options, sync };

  const build = React.useCallback((target: Element) => {
    const { create: factory, options: current } = latest.current;
    // Forward callbacks through `latest` so the primitive never holds a stale closure.
    const forwarded = {} as Record<string, unknown>;
    for (const [key, value] of Object.entries(current)) {
      forwarded[key] =
        typeof value === "function"
          ? (...args: unknown[]) => {
              const fn = (latest.current.options as Record<string, unknown>)[key];
              const result = typeof fn === "function" ? fn(...args) : undefined;
              // React decides what the state is: push the current props back. If the parent
              // updated state in the callback, the following render's sync wins anyway.
              if (instance.current) latest.current.sync?.(instance.current, latest.current.options);
              return result;
            }
          : value;
    }
    instance.current = factory(target, forwarded as Options);
  }, []);

  const ref = React.useCallback<React.RefCallback<Element>>(
    (target) => {
      instance.current?.destroy();
      instance.current = null;
      element.current = target;
      if (target) build(target);
    },
    [build],
  );

  // Recreate on the same element when `deps` change (skipping the mount, where `ref` already built).
  const mounted = React.useRef(false);
  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (element.current) {
      instance.current?.destroy();
      build(element.current);
    }
  }, deps);

  // Layout effect so the primitive's DOM matches the props before the browser paints.
  useIsomorphicLayoutEffect(() => {
    if (instance.current) latest.current.sync?.(instance.current, latest.current.options);
  });

  // Stable result: consumers compose `ref` into their own ref callbacks, and a new object per
  // render would make React detach and re-attach it (destroying and recreating the primitive)
  // on every render.
  return React.useMemo(() => ({ ref, instance }), [ref]);
}
