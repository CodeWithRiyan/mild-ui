// packages/core/src/utils/focus-trap.ts
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = container.querySelectorAll(
    'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
  );
  return Array.from(elements) as HTMLElement[];
}

export function trapFocus(container: HTMLElement, event: KeyboardEvent): void {
  if (event.key !== "Tab") return;

  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    lastElement.focus();
    event.preventDefault();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    firstElement.focus();
    event.preventDefault();
  }
}
