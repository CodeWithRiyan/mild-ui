/**
 * Headless modal dialog behaviour.
 *
 * Follows the WAI-ARIA Authoring Practices dialog (modal) pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 *
 *   - Focus moves into the dialog when it opens (the `initialFocus` element, else the first
 *     tabbable element, else the dialog itself) and is trapped: Tab and Shift+Tab cycle inside
 *     the dialog, and focus that lands outside (programmatically, or through the browser chrome)
 *     is brought back in.
 *   - Escape closes the dialog.
 *   - When the dialog closes, focus returns to the element that had it before the dialog opened
 *     (the trigger), unless `returnFocus` says otherwise.
 *   - While a modal dialog is open the page behind it does not scroll.
 *
 * Dialogs nest: every open dialog joins a stack, and only the topmost one handles Escape and
 * traps focus, so nested dialogs close one at a time, from the top down. The scroll lock is
 * shared by the stack and released when the last dialog closes.
 *
 * No framework, no dependencies: it drives DOM you already rendered. Closing is delegated to
 * `onClose`, so the caller (React state, a `hidden` attribute, ...) decides what closing means;
 * the instance only ever leaves the stack through `destroy()`.
 */

export interface DialogOptions {
  /** The dialog element (`role="dialog"` or `"alertdialog"`). Gets `aria-modal="true"`. */
  element: HTMLElement;
  /** Called when the user asks to close the dialog (Escape). */
  onClose?: () => void;
  /** Element to focus on open. Default: the first tabbable element, else the dialog itself. */
  initialFocus?: HTMLElement | null;
  /**
   * Where focus goes on `destroy()`: an element, `true` for the element that was focused when
   * the dialog was created, or `false` to leave focus alone. Default `true`.
   */
  returnFocus?: HTMLElement | boolean;
  /** Close on Escape. Default `true`. */
  closeOnEscape?: boolean;
  /** Trap focus and lock the page scroll. Default `true`. */
  modal?: boolean;
}

export interface DialogInstance {
  readonly element: HTMLElement;
  /** Whether this dialog is the topmost open one (the one handling Escape and the trap). */
  isTop: () => boolean;
  /** Moves focus to the initial element (or the first tabbable / the dialog). */
  focusInitial: () => void;
  /** Leaves the stack, unlocks the scroll if last, returns focus, removes listeners. */
  destroy: () => void;
}

const TABBABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), ' +
  'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), ' +
  '[contenteditable]:not([contenteditable="false"])';

const SCROLL_LOCK_CLASS = "mild-modal-open";

/** Open dialogs, bottom to top. Shared by every instance in this module. */
const stack: DialogInstance[] = [];
let lockedOverflow: string | null = null;

function isVisible(element: HTMLElement): boolean {
  // `hidden` ancestors and display:none are not tabbable; jsdom has no layout, so the
  // attribute is the signal that can be read in every environment.
  return !element.closest("[hidden]") && element.getAttribute("aria-hidden") !== "true";
}

function tabbableIn(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(TABBABLE)).filter(isVisible);
}

function lockScroll(): void {
  if (lockedOverflow !== null) return;
  lockedOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  document.body.classList.add(SCROLL_LOCK_CLASS);
}

function unlockScroll(): void {
  if (lockedOverflow === null) return;
  document.body.style.overflow = lockedOverflow;
  document.body.classList.remove(SCROLL_LOCK_CLASS);
  lockedOverflow = null;
}

export function createDialog(options: DialogOptions): DialogInstance {
  const { element, onClose, initialFocus, closeOnEscape = true, modal = true } = options;
  const returnFocus = options.returnFocus ?? true;
  const previouslyFocused = document.activeElement as HTMLElement | null;

  element.setAttribute("aria-modal", String(modal));
  if (!element.hasAttribute("tabindex")) element.setAttribute("tabindex", "-1");

  const instance: DialogInstance = {
    element,
    isTop: () => stack[stack.length - 1] === instance,
    focusInitial,
    destroy,
  };

  function focusInitial(): void {
    const target = initialFocus ?? tabbableIn(element)[0] ?? element;
    target.focus();
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if (!instance.isTop()) return;
    if (event.key === "Escape" && closeOnEscape) {
      event.preventDefault();
      event.stopPropagation();
      onClose?.();
      return;
    }
    if (event.key !== "Tab" || !modal) return;
    // Cycle inside the dialog: Tab on the last tabbable wraps to the first, and back.
    const tabbable = tabbableIn(element);
    if (tabbable.length === 0) {
      event.preventDefault();
      element.focus();
      return;
    }
    const first = tabbable[0];
    const last = tabbable[tabbable.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || active === element)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleFocusIn(event: FocusEvent): void {
    if (!modal || !instance.isTop()) return;
    const target = event.target as Node | null;
    if (target && element.contains(target)) return;
    // Focus escaped (browser chrome, a script): bring it back to the dialog.
    focusInitial();
  }

  function destroy(): void {
    document.removeEventListener("keydown", handleKeyDown, true);
    document.removeEventListener("focusin", handleFocusIn);
    const index = stack.indexOf(instance);
    if (index !== -1) stack.splice(index, 1);
    if (modal && !stack.some((open) => open.element.getAttribute("aria-modal") === "true")) {
      unlockScroll();
    }
    const target =
      returnFocus === true ? previouslyFocused : returnFocus === false ? null : returnFocus;
    if (target && target.isConnected) target.focus();
  }

  stack.push(instance);
  if (modal) lockScroll();
  // Capture phase: the dialog sees Escape before anything inside it (a listbox, an editor).
  document.addEventListener("keydown", handleKeyDown, true);
  document.addEventListener("focusin", handleFocusIn);
  focusInitial();

  return instance;
}
