/**
 * Headless auto-dismiss timer for a toast (or any transient notification).
 *
 * Per the WAI-ARIA Authoring Practices guidance on alerts and live regions, a notification that
 * disappears on its own must give the user time to act on it:
 * https://www.w3.org/WAI/ARIA/apg/patterns/alert/
 * The timer therefore pauses while the pointer is over the toast or while anything inside it
 * has keyboard focus (the close button, a link, an action), and resumes with the remaining time
 * when the user leaves. Nothing expires while it is being read or operated.
 *
 * No framework, no dependencies: it watches the element you already rendered and calls
 * `onExpire` once. The caller removes the toast; `destroy()` cancels everything.
 */

export interface ToastTimerOptions {
  /** The toast element. Hover and focus inside it pause the timer. */
  element: HTMLElement;
  /** Milliseconds until `onExpire`. `null` (or `Infinity`) never expires. */
  duration: number | null;
  /** Called once when the time is up (never while paused, never after `destroy`). */
  onExpire?: () => void;
}

export interface ToastTimerInstance {
  readonly element: HTMLElement;
  /** Whether the countdown is currently running. */
  isRunning: () => boolean;
  /** Milliseconds left (`null` when the toast never expires). */
  getRemaining: () => number | null;
  /** Stops the countdown, keeping the remaining time. */
  pause: () => void;
  /** Continues the countdown, unless the toast is still hovered or focused. */
  resume: () => void;
  /** Cancels the countdown and removes the listeners. */
  destroy: () => void;
}

export function createToastTimer(options: ToastTimerOptions): ToastTimerInstance {
  const { element, onExpire } = options;
  const persistent = options.duration === null || !Number.isFinite(options.duration);
  let remaining = persistent ? null : (options.duration as number);
  let timer: ReturnType<typeof setTimeout> | null = null;
  let startedAt = 0;
  let hovered = false;
  let focused = false;
  let destroyed = false;

  function start(): void {
    if (destroyed || persistent || remaining === null || timer !== null) return;
    startedAt = Date.now();
    timer = setTimeout(() => {
      timer = null;
      remaining = 0;
      onExpire?.();
    }, remaining);
  }

  function pause(): void {
    if (timer === null || remaining === null) return;
    clearTimeout(timer);
    timer = null;
    remaining = Math.max(0, remaining - (Date.now() - startedAt));
  }

  function resume(): void {
    if (hovered || focused) return;
    start();
  }

  function handleMouseEnter(): void {
    hovered = true;
    pause();
  }

  function handleMouseLeave(): void {
    hovered = false;
    resume();
  }

  function handleFocusIn(): void {
    focused = true;
    pause();
  }

  function handleFocusOut(event: FocusEvent): void {
    // Focus moving between two elements inside the toast is not leaving it.
    const next = event.relatedTarget as Node | null;
    if (next && element.contains(next)) return;
    focused = false;
    resume();
  }

  element.addEventListener("mouseenter", handleMouseEnter);
  element.addEventListener("mouseleave", handleMouseLeave);
  element.addEventListener("focusin", handleFocusIn);
  element.addEventListener("focusout", handleFocusOut);
  // A toast rendered with focus already inside it (a focused close button) starts paused.
  if (element.contains(document.activeElement)) focused = true;
  resume();

  return {
    element,
    isRunning: () => timer !== null,
    getRemaining: () => {
      if (remaining === null) return null;
      return timer === null ? remaining : Math.max(0, remaining - (Date.now() - startedAt));
    },
    pause,
    resume,
    destroy: () => {
      destroyed = true;
      pause();
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("focusin", handleFocusIn);
      element.removeEventListener("focusout", handleFocusOut);
    },
  };
}
