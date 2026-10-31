/**
 * Headless tabs with roving tabindex.
 *
 * Follows the WAI-ARIA Authoring Practices tabs pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 *
 *   - The tab list is one tab stop: the selected tab has `tabindex="0"`, the others `-1`.
 *   - Arrow keys move between tabs and wrap (Left/Right for a horizontal list, Up/Down for a
 *     vertical one); Home and End jump to the first and last tab.
 *   - With automatic activation (the default) moving focus selects the tab; with manual
 *     activation the focused tab is selected with Enter or Space.
 *   - Each tab carries `aria-selected`; the caller renders the panels (`role="tabpanel"`,
 *     `hidden` when not selected) from the value it receives.
 *
 * No framework, no dependencies: it drives DOM you already rendered. Tabs are the descendants
 * of the list with `role="tab"`; each one's value comes from `data-value`, falling back to its
 * text content.
 */

export interface TabsOptions {
  /** The tab list element. Gets `role="tablist"` and `aria-orientation`. */
  element: HTMLElement;
  /** Initially selected value. Defaults to nothing selected. */
  value?: string | null;
  /** Default `"horizontal"`. */
  orientation?: "horizontal" | "vertical";
  /** `"automatic"` selects on focus (default); `"manual"` selects with Enter / Space. */
  activation?: "automatic" | "manual";
  /** Called when the user selects a tab (not when `setValue` is called). */
  onChange?: (value: string) => void;
}

export interface TabsInstance {
  readonly element: HTMLElement;
  getValue: () => string | null;
  /** Selects the tab with this value without calling `onChange`. */
  setValue: (value: string | null) => void;
  /** Re-reads the tabs from the DOM. Call after adding or removing tabs. */
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

export function createTabs(options: TabsOptions): TabsInstance {
  const { element, orientation = "horizontal", activation = "automatic", onChange } = options;
  let value: string | null = options.value ?? null;
  let tabs: HTMLElement[] = [];

  element.setAttribute("role", "tablist");
  element.setAttribute("aria-orientation", orientation);

  function readTabs(): void {
    tabs = Array.from(element.querySelectorAll<HTMLElement>('[role="tab"]'));
  }

  function enabledTabs(): HTMLElement[] {
    return tabs.filter((tab) => !isDisabled(tab));
  }

  function render(): void {
    const selected = tabs.find((tab) => valueOf(tab) === value && !isDisabled(tab));
    const focused = tabs.find((tab) => tab === document.activeElement);
    // One tab stop: the focused tab while navigating manually, else the selected tab, else
    // the first enabled one.
    const tabStop = focused ?? selected ?? enabledTabs()[0];
    for (const tab of tabs) {
      tab.setAttribute("aria-selected", String(valueOf(tab) === value));
      tab.setAttribute("tabindex", tab === tabStop ? "0" : "-1");
    }
  }

  function select(tab: HTMLElement): void {
    if (isDisabled(tab)) return;
    const next = valueOf(tab);
    if (next === value) {
      render();
      return;
    }
    value = next;
    render();
    onChange?.(value);
  }

  function focusTab(tab: HTMLElement | undefined): void {
    if (!tab) return;
    tab.focus();
    if (activation === "automatic") select(tab);
    else render();
  }

  function move(step: number): void {
    const focusable = enabledTabs();
    if (focusable.length === 0) return;
    const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + step + focusable.length) % focusable.length;
    focusTab(focusable[nextIndex]);
  }

  function handleKeyDown(event: KeyboardEvent): void {
    const horizontal = orientation === "horizontal";
    const previous = horizontal ? "ArrowLeft" : "ArrowUp";
    const next = horizontal ? "ArrowRight" : "ArrowDown";
    switch (event.key) {
      case next:
        event.preventDefault();
        move(1);
        break;
      case previous:
        event.preventDefault();
        move(-1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(enabledTabs()[0]);
        break;
      case "End": {
        event.preventDefault();
        const enabled = enabledTabs();
        focusTab(enabled[enabled.length - 1]);
        break;
      }
      case "Enter":
      case " ": {
        const tab = tabs.find((candidate) => candidate === event.target);
        if (!tab) return;
        event.preventDefault();
        select(tab);
        break;
      }
      default:
        break;
    }
  }

  function handleClick(event: MouseEvent): void {
    const tab = (event.target as HTMLElement).closest<HTMLElement>('[role="tab"]');
    if (!tab || !tabs.includes(tab)) return;
    select(tab);
  }

  element.addEventListener("keydown", handleKeyDown);
  element.addEventListener("click", handleClick);
  readTabs();
  render();

  return {
    element,
    getValue: () => value,
    setValue: (next: string | null) => {
      value = next;
      render();
    },
    refresh: () => {
      readTabs();
      render();
    },
    destroy: () => {
      element.removeEventListener("keydown", handleKeyDown);
      element.removeEventListener("click", handleClick);
    },
  };
}
