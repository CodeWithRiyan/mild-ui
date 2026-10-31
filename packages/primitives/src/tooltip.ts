/**
 * Headless tooltip behaviour.
 *
 * Follows the WAI-ARIA Authoring Practices tooltip pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
 *
 *   - The tooltip element gets `role="tooltip"` and the trigger points at it with
 *     `aria-describedby`, so its text is read as the trigger's description whether or not it is
 *     showing.
 *   - It shows on pointer hover and on keyboard focus of the trigger (after `openDelay`), and
 *     hides when the pointer leaves or focus moves away (after `closeDelay`). Moving the pointer
 *     onto the tooltip itself keeps it open.
 *   - Escape hides it while it is showing.
 *
 * No framework, no dependencies: it drives elements you already rendered and reports
 * visibility through `onOpenChange`; the caller renders the open/closed state (a `hidden`
 * attribute, a class, ...). `setOpen` syncs state the caller owns without calling back.
 */

export interface TooltipOptions {
  /** The element the tooltip describes. */
  trigger: HTMLElement;
  /** The tooltip element. Gets `role="tooltip"` and an id if it has none. */
  tooltip: HTMLElement;
  /** Milliseconds of hover/focus before showing. Default `300`. */
  openDelay?: number;
  /** Milliseconds after leaving before hiding. Default `100`. */
  closeDelay?: number;
  /** Called when the tooltip should show or hide. */
  onOpenChange?: (open: boolean) => void;
}

export interface TooltipInstance {
  readonly trigger: HTMLElement;
  readonly tooltip: HTMLElement;
  isOpen: () => boolean;
  /** Shows or hides immediately, without calling `onOpenChange`. */
  setOpen: (open: boolean) => void;
  /** Cancels pending timers and removes the listeners. Leaves the ARIA attributes in place. */
  destroy: () => void;
}

let nextId = 0;

export function createTooltip(options: TooltipOptions): TooltipInstance {
  const { trigger, tooltip, openDelay = 300, closeDelay = 100, onOpenChange } = options;
  let open = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  if (!tooltip.id) tooltip.id = `mild-tooltip-${++nextId}`;
  tooltip.setAttribute("role", "tooltip");
  const describedBy = (trigger.getAttribute("aria-describedby") ?? "").split(/\s+/).filter(Boolean);
  if (!describedBy.includes(tooltip.id)) {
    trigger.setAttribute("aria-describedby", [...describedBy, tooltip.id].join(" "));
  }

  function cancel(): void {
    if (timer !== null) clearTimeout(timer);
    timer = null;
  }

  function set(next: boolean): void {
    cancel();
    if (next === open) return;
    open = next;
    onOpenChange?.(open);
  }

  function schedule(next: boolean, delay: number): void {
    cancel();
    if (next === open) return;
    if (delay <= 0) {
      set(next);
      return;
    }
    timer = setTimeout(() => {
      timer = null;
      set(next);
    }, delay);
  }

  const show = () => schedule(true, openDelay);
  const hide = () => schedule(false, closeDelay);
  // Focus shows without delay: keyboard users should not wait for a hover heuristic.
  const showNow = () => set(true);
  const hideNow = () => set(false);

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key !== "Escape" || !open) return;
    event.preventDefault();
    hideNow();
  }

  trigger.addEventListener("mouseenter", show);
  trigger.addEventListener("mouseleave", hide);
  trigger.addEventListener("focus", showNow);
  trigger.addEventListener("blur", hideNow);
  tooltip.addEventListener("mouseenter", show);
  tooltip.addEventListener("mouseleave", hide);
  document.addEventListener("keydown", handleKeyDown);

  return {
    trigger,
    tooltip,
    isOpen: () => open,
    setOpen: (next: boolean) => {
      cancel();
      open = next;
    },
    destroy: () => {
      cancel();
      trigger.removeEventListener("mouseenter", show);
      trigger.removeEventListener("mouseleave", hide);
      trigger.removeEventListener("focus", showNow);
      trigger.removeEventListener("blur", hideNow);
      tooltip.removeEventListener("mouseenter", show);
      tooltip.removeEventListener("mouseleave", hide);
      document.removeEventListener("keydown", handleKeyDown);
    },
  };
}
