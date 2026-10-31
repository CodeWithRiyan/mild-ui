/**
 * Headless radio group with roving tabindex.
 *
 * Follows the WAI-ARIA Authoring Practices radio group pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/radio/
 *
 * Roving tabindex means the group is a single tab stop: the checked radio has `tabindex="0"` and
 * every other radio has `tabindex="-1"`. When nothing is checked, the first enabled radio becomes
 * the tab stop. Arrow keys move focus *and* check, wrapping at both ends, as the pattern
 * prescribes for a group where selection follows focus.
 *
 * No framework, no dependencies: it drives DOM you already rendered. Radios are the descendants
 * of the container with `role="radio"`; each one's value comes from `data-value`, falling back to
 * its text content.
 */

export interface RadioGroupOptions {
  /** Container element. Gets `role="radiogroup"`. */
  element: HTMLElement;
  /** Initially checked value. Defaults to nothing checked. */
  value?: string | null;
  /** Called when the user checks a radio (not when `setValue` is called). */
  onChange?: (value: string) => void;
}

export interface RadioGroupInstance {
  readonly element: HTMLElement;
  /** Currently checked value, or `null`. */
  getValue: () => string | null;
  /** Checks the radio with this value without calling `onChange`. */
  setValue: (value: string | null) => void;
  /** Re-reads the radios from the DOM. Call after adding or removing radios. */
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

export function createRadioGroup(options: RadioGroupOptions): RadioGroupInstance {
  const { element, onChange } = options;
  let value: string | null = options.value ?? null;
  let radios: HTMLElement[] = [];

  element.setAttribute("role", "radiogroup");

  function readRadios(): void {
    radios = Array.from(element.querySelectorAll<HTMLElement>('[role="radio"]'));
  }

  function enabledRadios(): HTMLElement[] {
    return radios.filter((radio) => !isDisabled(radio));
  }

  function render(): void {
    // The tab stop is the checked radio, or the first enabled one when nothing is checked.
    const checked = radios.find((radio) => valueOf(radio) === value && !isDisabled(radio));
    const tabStop = checked ?? enabledRadios()[0];
    for (const radio of radios) {
      const isChecked = valueOf(radio) === value;
      radio.setAttribute("aria-checked", String(isChecked));
      radio.setAttribute("tabindex", radio === tabStop ? "0" : "-1");
    }
  }

  function select(radio: HTMLElement): void {
    if (isDisabled(radio)) return;
    value = valueOf(radio);
    render();
    radio.focus();
    onChange?.(value);
  }

  /** Moves `step` radios from the currently focused one, skipping disabled radios and wrapping. */
  function move(step: number): void {
    const focusable = enabledRadios();
    if (focusable.length === 0) return;
    const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
    // When focus is not on a radio yet, Arrow keys start from the first one.
    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + step + focusable.length) % focusable.length;
    select(focusable[nextIndex]);
  }

  function handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        move(1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        move(-1);
        break;
      case " ": {
        // Space checks the focused radio without moving focus.
        const radio = radios.find((candidate) => candidate === document.activeElement);
        if (!radio) return;
        event.preventDefault();
        select(radio);
        break;
      }
      default:
        break;
    }
  }

  function handleClick(event: MouseEvent): void {
    const radio = (event.target as HTMLElement).closest<HTMLElement>('[role="radio"]');
    if (!radio) return;
    select(radio);
  }

  element.addEventListener("keydown", handleKeyDown);
  element.addEventListener("click", handleClick);
  readRadios();
  render();

  return {
    element,
    getValue: () => value,
    setValue: (next: string | null) => {
      value = next;
      render();
    },
    refresh: () => {
      readRadios();
      render();
    },
    destroy: () => {
      element.removeEventListener("keydown", handleKeyDown);
      element.removeEventListener("click", handleClick);
    },
  };
}
