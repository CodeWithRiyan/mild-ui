/**
 * Headless accordion.
 *
 * Follows the WAI-ARIA Authoring Practices accordion pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 *
 *   - Each header is a button carrying `aria-expanded` (and, rendered by the caller,
 *     `aria-controls` pointing at its panel).
 *   - Enter, Space or a click toggles the focused header's panel. In single mode opening one
 *     panel closes the others; `collapsible` decides whether the open panel may be closed again.
 *   - Arrow Down/Up move focus between the headers and wrap; Home and End jump to the first and
 *     last header. Every header stays in the tab order, as the pattern prescribes.
 *
 * No framework, no dependencies: it drives DOM you already rendered. Headers are the
 * descendants of the container that carry `aria-expanded`; each one's value comes from
 * `data-value`, falling back to its text content.
 */

export interface AccordionOptions {
  /** Container element. */
  element: HTMLElement;
  /** Allow several panels open at once. Default `false`. */
  multiple?: boolean;
  /** In single mode, allow closing the open panel. Default `true`. */
  collapsible?: boolean;
  /** Initially open values. Default none. */
  value?: string[];
  /** Called when the user opens or closes a panel (not when `setValue` is called). */
  onChange?: (value: string[]) => void;
}

export interface AccordionInstance {
  readonly element: HTMLElement;
  /** Currently open values. */
  getValue: () => string[];
  /** Opens exactly these values without calling `onChange`. */
  setValue: (value: string[]) => void;
  /** Re-reads the headers from the DOM. Call after adding or removing items. */
  refresh: () => void;
  /** Removes listeners. Leaves the DOM attributes in place. */
  destroy: () => void;
}

function isDisabled(element: HTMLElement): boolean {
  return element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
}

function valueOf(element: HTMLElement): string {
  const explicit = element.getAttribute("data-value");
  return explicit ?? (element.textContent ?? "").trim();
}

export function createAccordion(options: AccordionOptions): AccordionInstance {
  const { element, multiple = false, collapsible = true, onChange } = options;
  let value: string[] = [...(options.value ?? [])];
  let headers: HTMLElement[] = [];

  function readHeaders(): void {
    headers = Array.from(element.querySelectorAll<HTMLElement>("[aria-expanded]"));
  }

  function enabledHeaders(): HTMLElement[] {
    return headers.filter((header) => !isDisabled(header));
  }

  function render(): void {
    for (const header of headers) {
      header.setAttribute("aria-expanded", String(value.includes(valueOf(header))));
    }
  }

  function toggle(header: HTMLElement): void {
    if (isDisabled(header)) return;
    const headerValue = valueOf(header);
    const open = value.includes(headerValue);
    if (open) {
      if (!multiple && !collapsible) return;
      value = value.filter((entry) => entry !== headerValue);
    } else {
      value = multiple ? [...value, headerValue] : [headerValue];
    }
    render();
    onChange?.([...value]);
  }

  function move(step: number): void {
    const focusable = enabledHeaders();
    if (focusable.length === 0) return;
    const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + step + focusable.length) % focusable.length;
    focusable[nextIndex].focus();
  }

  function handleKeyDown(event: KeyboardEvent): void {
    const header = headers.find((candidate) => candidate === event.target);
    // The keys below are for the headers only; a panel's own controls keep them.
    if (!header) return;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        move(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        move(-1);
        break;
      case "Home":
        event.preventDefault();
        enabledHeaders()[0]?.focus();
        break;
      case "End": {
        event.preventDefault();
        const enabled = enabledHeaders();
        enabled[enabled.length - 1]?.focus();
        break;
      }
      case "Enter":
      case " ":
        // Native buttons turn these into a click themselves; only other elements need help.
        if (header.tagName === "BUTTON") return;
        event.preventDefault();
        toggle(header);
        break;
      default:
        break;
    }
  }

  function handleClick(event: MouseEvent): void {
    const header = (event.target as HTMLElement).closest<HTMLElement>("[aria-expanded]");
    if (!header || !headers.includes(header)) return;
    toggle(header);
  }

  element.addEventListener("keydown", handleKeyDown);
  element.addEventListener("click", handleClick);
  readHeaders();
  render();

  return {
    element,
    getValue: () => [...value],
    setValue: (next: string[]) => {
      value = [...next];
      render();
    },
    refresh: () => {
      readHeaders();
      render();
    },
    destroy: () => {
      element.removeEventListener("keydown", handleKeyDown);
      element.removeEventListener("click", handleClick);
    },
  };
}
