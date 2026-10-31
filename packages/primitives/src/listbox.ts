/**
 * Headless single-select listbox with typeahead.
 *
 * Follows the WAI-ARIA Authoring Practices listbox pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
 *
 * Keyboard support, per the pattern's "Keyboard Interaction" section:
 *   - Down/Up Arrow move the active option (no wrapping).
 *   - Home/End jump to the first/last enabled option.
 *   - Escape clears the typeahead buffer and calls `onEscape` (use it to close a popup listbox).
 *   - Printable characters type ahead to the next option starting with what you typed; repeating
 *     the same character cycles through the options starting with that character.
 *
 * The listbox itself holds DOM focus and points at the active option with `aria-activedescendant`,
 * which is the pattern's alternative to moving focus between options. Selection follows focus by
 * default; set `selectionFollowsFocus: false` to require Enter or Space instead.
 *
 * No framework, no dependencies: it drives DOM you already rendered. Options are the descendants
 * of the container with `role="option"`; each one's value comes from `data-value`, falling back to
 * its text content.
 */

export interface ListboxOptions {
  /** Container element. Gets `role="listbox"` and holds focus. */
  element: HTMLElement;
  /** Initially selected value. Defaults to nothing selected. */
  value?: string | null;
  /** Whether moving the active option also selects it. Defaults to `true`. */
  selectionFollowsFocus?: boolean;
  /** How long typed characters keep accumulating, in ms. Defaults to 500. */
  typeaheadTimeout?: number;
  /** Called when the user selects an option (not when `setValue` is called). */
  onChange?: (value: string) => void;
  /** Called when the user presses Escape. */
  onEscape?: () => void;
  /** Called when the active (`aria-activedescendant`) option changes, with its value. */
  onActiveChange?: (value: string) => void;
}

export interface ListboxInstance {
  readonly element: HTMLElement;
  /** Currently selected value, or `null`. */
  getValue: () => string | null;
  /** Selects this value without calling `onChange`. */
  setValue: (value: string | null) => void;
  /** Value of the active (`aria-activedescendant`) option, or `null`. */
  getActiveValue: () => string | null;
  /** Re-reads the options from the DOM. Call after adding or removing options. */
  refresh: () => void;
  /** Removes listeners. Leaves the DOM attributes in place. */
  destroy: () => void;
}

let idCounter = 0;

function isDisabled(element: HTMLElement): boolean {
  return element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
}

function valueOf(element: HTMLElement): string {
  const explicit = element.getAttribute("data-value");
  return explicit ?? (element.textContent ?? "").trim();
}

function labelOf(element: HTMLElement): string {
  return (element.textContent ?? "").trim().toLowerCase();
}

export function createListbox(options: ListboxOptions): ListboxInstance {
  const { element, onChange, onEscape, onActiveChange } = options;
  const selectionFollowsFocus = options.selectionFollowsFocus ?? true;
  const typeaheadTimeout = options.typeaheadTimeout ?? 500;

  let value: string | null = options.value ?? null;
  let items: HTMLElement[] = [];
  let activeIndex = -1;
  let search = "";
  let searchedAt = 0;

  element.setAttribute("role", "listbox");
  element.setAttribute("tabindex", "0");

  function readItems(): void {
    const previouslyActive = items[activeIndex];
    items = Array.from(element.querySelectorAll<HTMLElement>('[role="option"]'));
    for (const item of items) {
      if (!item.id) item.id = `mild-listbox-option-${++idCounter}`;
    }
    // Keep the active option across a refresh if it is still there; otherwise start out active
    // on the selected option, if there is one.
    const kept = previouslyActive ? items.indexOf(previouslyActive) : -1;
    activeIndex = kept === -1 ? items.findIndex((item) => valueOf(item) === value) : kept;
  }

  function render(): void {
    for (const item of items) {
      item.setAttribute("aria-selected", String(valueOf(item) === value));
    }
    const active = items[activeIndex];
    if (active) {
      element.setAttribute("aria-activedescendant", active.id);
    } else {
      element.removeAttribute("aria-activedescendant");
    }
  }

  function selectActive(): void {
    const active = items[activeIndex];
    if (!active) return;
    value = valueOf(active);
    render();
    onChange?.(value);
  }

  function setActive(index: number, select: boolean): void {
    if (index < 0 || index >= items.length) return;
    activeIndex = index;
    render();
    onActiveChange?.(valueOf(items[index]));
    if (select) selectActive();
  }

  /** First enabled index at or after `from`, walking by `step`. */
  function enabledIndex(from: number, step: number): number {
    for (let index = from; index >= 0 && index < items.length; index += step) {
      if (!isDisabled(items[index])) return index;
    }
    return -1;
  }

  function move(step: number): void {
    const from = activeIndex === -1 ? (step > 0 ? 0 : items.length - 1) : activeIndex + step;
    const next = enabledIndex(from, step);
    // No wrapping: at either end the active option simply stays put.
    if (next === -1) return;
    setActive(next, selectionFollowsFocus);
  }

  function typeahead(character: string): void {
    const now = Date.now();
    // A pause longer than the timeout starts a new search.
    search = now - searchedAt > typeaheadTimeout ? character : search + character;
    searchedAt = now;

    // Repeating one character cycles through options starting with it, rather than looking for a
    // run of that character.
    const repeated = search.length > 1 && search.split("").every((char) => char === search[0]);
    const query = repeated ? search[0] : search;
    // A fresh single-character search starts after the active option so repeats advance.
    const startAt = search.length === 1 || repeated ? activeIndex + 1 : activeIndex;

    for (let offset = 0; offset < items.length; offset += 1) {
      const index = (startAt + offset + items.length) % items.length;
      const item = items[index];
      if (isDisabled(item) || !labelOf(item).startsWith(query)) continue;
      setActive(index, selectionFollowsFocus);
      return;
    }
  }

  function handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        move(1);
        return;
      case "ArrowUp":
        event.preventDefault();
        move(-1);
        return;
      case "Home":
        event.preventDefault();
        setActive(enabledIndex(0, 1), selectionFollowsFocus);
        return;
      case "End":
        event.preventDefault();
        setActive(enabledIndex(items.length - 1, -1), selectionFollowsFocus);
        return;
      case "Escape":
        event.preventDefault();
        search = "";
        onEscape?.();
        return;
      case "Enter":
      case " ":
        event.preventDefault();
        selectActive();
        return;
      default:
        break;
    }
    // Printable characters (length 1, no modifier) feed the typeahead.
    if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return;
    event.preventDefault();
    typeahead(event.key.toLowerCase());
  }

  function handleClick(event: MouseEvent): void {
    const option = (event.target as HTMLElement).closest<HTMLElement>('[role="option"]');
    if (!option || isDisabled(option)) return;
    setActive(items.indexOf(option), true);
  }

  element.addEventListener("keydown", handleKeyDown);
  element.addEventListener("click", handleClick);
  readItems();
  render();

  return {
    element,
    getValue: () => value,
    setValue: (next: string | null) => {
      value = next;
      render();
    },
    getActiveValue: () => {
      const active = items[activeIndex];
      return active ? valueOf(active) : null;
    },
    refresh: () => {
      readItems();
      render();
    },
    destroy: () => {
      element.removeEventListener("keydown", handleKeyDown);
      element.removeEventListener("click", handleClick);
    },
  };
}
