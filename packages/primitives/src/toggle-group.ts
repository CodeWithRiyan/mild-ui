/**
 * Headless group of toggle buttons with roving tabindex.
 *
 * Each item is a toggle button per the WAI-ARIA Authoring Practices button pattern
 * (`aria-pressed`): https://www.w3.org/WAI/ARIA/apg/patterns/button/
 * The group is one tab stop, navigated with the Arrow keys, Home and End, the way the toolbar
 * pattern prescribes: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/
 *
 * Unlike a radio group, moving focus does not press anything: Space, Enter or a click toggles
 * the focused item. In single mode at most one item is pressed and pressing it again clears the
 * selection; in multiple mode every item toggles on its own.
 *
 * No framework, no dependencies: it drives DOM you already rendered. Items are the descendants
 * of the container that carry `aria-pressed`; each one's value comes from `data-value`, falling
 * back to its text content.
 */

export interface ToggleGroupOptions {
  /** Container element. Gets `role="group"` unless it already has a role. */
  element: HTMLElement;
  /** Allow several items to be pressed at once. Default `false`. */
  multiple?: boolean;
  /** Initially pressed values. Default none. */
  value?: string[];
  /** Wrap from the last item to the first (and back) with the Arrow keys. Default `true`. */
  loop?: boolean;
  /** Called when the user toggles an item (not when `setValue` is called). */
  onChange?: (value: string[]) => void;
}

export interface ToggleGroupInstance {
  readonly element: HTMLElement;
  /** Currently pressed values, in the order they were pressed. */
  getValue: () => string[];
  /** Presses exactly these values without calling `onChange`. */
  setValue: (value: string[]) => void;
  /** Re-reads the items from the DOM. Call after adding or removing items. */
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

export function createToggleGroup(options: ToggleGroupOptions): ToggleGroupInstance {
  const { element, multiple = false, loop = true, onChange } = options;
  let value: string[] = [...(options.value ?? [])];
  let items: HTMLElement[] = [];
  /** The item that last had focus: it stays the tab stop so Tab returns to it. */
  let active: HTMLElement | null = null;

  if (!element.hasAttribute("role")) element.setAttribute("role", "group");

  function readItems(): void {
    items = Array.from(element.querySelectorAll<HTMLElement>("[aria-pressed]"));
    if (active && !items.includes(active)) active = null;
  }

  function enabledItems(): HTMLElement[] {
    return items.filter((item) => !isDisabled(item));
  }

  function render(): void {
    const enabled = enabledItems();
    // One tab stop: the last focused item, else the first pressed one, else the first enabled.
    const tabStop =
      (active && !isDisabled(active) ? active : null) ??
      enabled.find((item) => value.includes(valueOf(item))) ??
      enabled[0];
    for (const item of items) {
      item.setAttribute("aria-pressed", String(value.includes(valueOf(item))));
      item.setAttribute("tabindex", item === tabStop ? "0" : "-1");
    }
  }

  function toggle(item: HTMLElement): void {
    if (isDisabled(item)) return;
    const itemValue = valueOf(item);
    const pressed = value.includes(itemValue);
    if (multiple) {
      value = pressed ? value.filter((entry) => entry !== itemValue) : [...value, itemValue];
    } else {
      value = pressed ? [] : [itemValue];
    }
    active = item;
    render();
    onChange?.([...value]);
  }

  function focusItem(item: HTMLElement | undefined): void {
    if (!item) return;
    active = item;
    render();
    item.focus();
  }

  /** Moves `step` items from the focused one, skipping disabled items. */
  function move(step: number): void {
    const focusable = enabledItems();
    if (focusable.length === 0) return;
    const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
    if (currentIndex === -1) {
      focusItem(focusable[0]);
      return;
    }
    let nextIndex = currentIndex + step;
    if (nextIndex < 0 || nextIndex >= focusable.length) {
      if (!loop) return;
      nextIndex = (nextIndex + focusable.length) % focusable.length;
    }
    focusItem(focusable[nextIndex]);
  }

  function handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        move(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        move(-1);
        break;
      case "Home":
        event.preventDefault();
        focusItem(enabledItems()[0]);
        break;
      case "End": {
        event.preventDefault();
        const enabled = enabledItems();
        focusItem(enabled[enabled.length - 1]);
        break;
      }
      case " ":
      case "Enter": {
        // Native buttons turn these into a click themselves; only other elements need help.
        const item = items.find((candidate) => candidate === event.target);
        if (!item || item.tagName === "BUTTON") return;
        event.preventDefault();
        toggle(item);
        break;
      }
      default:
        break;
    }
  }

  function handleClick(event: MouseEvent): void {
    const item = (event.target as HTMLElement).closest<HTMLElement>("[aria-pressed]");
    if (!item || !items.includes(item)) return;
    toggle(item);
  }

  function handleFocusIn(event: FocusEvent): void {
    const item = items.find((candidate) => candidate === event.target);
    if (!item) return;
    active = item;
    render();
  }

  element.addEventListener("keydown", handleKeyDown);
  element.addEventListener("click", handleClick);
  element.addEventListener("focusin", handleFocusIn);
  readItems();
  render();

  return {
    element,
    getValue: () => [...value],
    setValue: (next: string[]) => {
      value = [...next];
      render();
    },
    refresh: () => {
      readItems();
      render();
    },
    destroy: () => {
      element.removeEventListener("keydown", handleKeyDown);
      element.removeEventListener("click", handleClick);
      element.removeEventListener("focusin", handleFocusIn);
    },
  };
}
