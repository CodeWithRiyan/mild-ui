/**
 * Headless switch (on/off toggle).
 *
 * Follows the WAI-ARIA Authoring Practices switch pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/switch/
 *
 * A switch is like a checkbox with no mixed state, and unlike a checkbox it responds to Enter as
 * well as Space, so keep it out of forms where Enter should submit.
 *
 * No framework, no dependencies: it drives a DOM element you already rendered.
 */

export interface SwitchOptions {
  /** Element to turn into a switch. Gets `role`, `tabindex` and `aria-checked`. */
  element: HTMLElement;
  /** Initial state. Defaults to `false`. */
  checked?: boolean;
  /** Initial disabled state. Defaults to `false`. */
  disabled?: boolean;
  /** Called when the user toggles the switch (not when `setChecked` is called). */
  onChange?: (checked: boolean) => void;
}

export interface SwitchInstance {
  readonly element: HTMLElement;
  /** Current state. */
  getChecked: () => boolean;
  /** Sets the state without calling `onChange`. */
  setChecked: (checked: boolean) => void;
  /** Enables or disables the switch. */
  setDisabled: (disabled: boolean) => void;
  /** Flips the state and calls `onChange`. */
  toggle: () => void;
  /** Removes listeners. Leaves the DOM attributes in place. */
  destroy: () => void;
}

export function createSwitch(options: SwitchOptions): SwitchInstance {
  const { element, onChange } = options;
  let checked = options.checked ?? false;
  let disabled = options.disabled ?? false;

  element.setAttribute("role", "switch");
  element.setAttribute("tabindex", "0");

  function render(): void {
    element.setAttribute("aria-checked", String(checked));
    // Stays focusable when disabled so screen reader users can still reach it.
    if (disabled) {
      element.setAttribute("aria-disabled", "true");
    } else {
      element.removeAttribute("aria-disabled");
    }
  }

  function toggle(): void {
    if (disabled) return;
    checked = !checked;
    render();
    onChange?.(checked);
  }

  function handleClick(): void {
    toggle();
  }

  function handleKeyDown(event: KeyboardEvent): void {
    // The switch pattern lists both Space and Enter as activation keys.
    if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    toggle();
  }

  element.addEventListener("click", handleClick);
  element.addEventListener("keydown", handleKeyDown);
  render();

  return {
    element,
    getChecked: () => checked,
    setChecked: (next: boolean) => {
      checked = next;
      render();
    },
    setDisabled: (next: boolean) => {
      disabled = next;
      render();
    },
    toggle,
    destroy: () => {
      element.removeEventListener("click", handleClick);
      element.removeEventListener("keydown", handleKeyDown);
    },
  };
}
