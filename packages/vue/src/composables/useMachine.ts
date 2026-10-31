// packages/vue/src/composables/useMachine.ts
import {
  onBeforeUnmount,
  onMounted,
  onUpdated,
  shallowRef,
  watch,
  watchEffect,
  type Ref,
  type ShallowRef,
} from "vue";

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

export interface UseMachineResult<Instance extends MachineInstance> {
  /** The live instance, or `null` before mount. Call its methods (`toggle`, `setValue`, ...) here. */
  instance: ShallowRef<Instance | null>;
}

/**
 * Binds a framework-agnostic `@mild-ui/primitives` factory to a Vue template ref.
 *
 * The primitive owns the behaviour (roles, `aria-*`, keyboard handling); Vue owns rendering and
 * the props API. The split is:
 *
 *   - **create**: once the element is mounted, `create(element, options())` runs. Every
 *     function-valued option (callbacks such as `onChange`) is wrapped so the primitive always
 *     calls the *latest* option, even though it only saw the options of creation time.
 *   - **sync**: whenever the reactive `options()` change, and after every re-render of the
 *     component, `sync(instance, options())` pushes the current options into it (`setChecked`,
 *     `setValue`, `refresh`, ...). It also runs right after any forwarded callback returns, so a
 *     controlled component whose parent ignores the change snaps back to the prop instead of
 *     drifting. Primitives' setters never call back into their `onChange`, so this cannot loop.
 *   - **deps**: if given, a change of what it returns recreates the instance on the same element.
 *     Use it when the primitive reads something at creation time that can change later (for
 *     example, the label and message elements a field is wired to).
 *   - unmount (or the ref turning `null`) calls `destroy()`.
 */
export function useMachine<
  Element extends HTMLElement,
  Options extends object,
  Instance extends MachineInstance,
>(
  target: Ref<Element | null | undefined>,
  create: MachineFactory<Element, Options, Instance>,
  options: () => Options,
  sync?: (instance: Instance, options: Options) => void,
  deps?: () => unknown,
): UseMachineResult<Instance> {
  const instance: ShallowRef<Instance | null> = shallowRef(null);
  let element: Element | null = null;

  function syncNow(): void {
    if (instance.value) sync?.(instance.value, options());
  }

  function build(el: Element): void {
    const current = options();
    // Forward callbacks through `options()` so the primitive never holds a stale closure.
    const forwarded: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(current)) {
      forwarded[key] =
        typeof value === "function"
          ? (...args: unknown[]) => {
              const latest = (options() as Record<string, unknown>)[key];
              const result = typeof latest === "function" ? latest(...args) : undefined;
              // The component decides what the state is: push the current props back. If the
              // parent updates state in the callback, the following sync wins anyway.
              syncNow();
              return result;
            }
          : value;
    }
    instance.value = create(el, forwarded as Options);
  }

  function attach(el: Element | null): void {
    if (el === element) return;
    instance.value?.destroy();
    instance.value = null;
    element = el;
    if (el) build(el);
  }

  // Template refs are assigned before `mounted`, so the primitive exists synchronously once the
  // component is mounted. The watcher covers a ref that changes later (v-if, keyed re-render).
  onMounted(() => attach(target.value ?? null));
  watch(target, (el) => attach(el ?? null), { flush: "post" });
  onBeforeUnmount(() => attach(null));

  // Reactive option changes (props, internal state) are pushed into the instance after the DOM
  // has been patched; so is every re-render, which is when rendered children may have changed.
  watchEffect(syncNow, { flush: "post" });
  onUpdated(syncNow);

  if (deps) {
    watch(deps, () => {
      if (!element) return;
      instance.value?.destroy();
      build(element);
    });
  }

  return { instance };
}
