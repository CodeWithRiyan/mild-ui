/**
 * Headless tri-state checkbox.
 *
 * Follows the WAI-ARIA Authoring Practices checkbox pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
 *
 * The mixed ("indeterminate") state follows the tri-state example, where activating a mixed
 * checkbox moves it to checked:
 * https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/
 *
 * No framework, no dependencies: it drives a DOM element you already rendered. Attach it to a
 * non-native element (a `span` or `div`); a native `<input type="checkbox">` has its own
 * behaviour and does not need this.
 */

/** `true` (checked), `false` (unchecked), or `"mixed"` (indeterminate). */
export type CheckboxState = boolean | "mixed";

export interface CheckboxOptions {
  /** Element to turn into a checkbox. Gets `role`, `tabindex` and `aria-checked`. */
  element: HTMLElement;
  /** Initial state. Defaults to `false`. */
  checked?: CheckboxState;
  /** Initial disabled state. Defaults to `false`. */
  disabled?: boolean;
  /** Called when the user toggles the checkbox (not when `setChecked` is called). */
  onChange?: (checked: CheckboxState) => void;
}

export interface CheckboxInstance {
  readonly element: HTMLElement;
  /** Current state. */
  getChecked: () => CheckboxState;
  /** Sets the state without calling `onChange`. */
  setChecked: (checked: CheckboxState) => void;
  /** Enables or disables the checkbox. */
  setDisabled: (disabled: boolean) => void;
  /** Advances the state (`mixed` -> `true`, `true` -> `false`, `false` -> `true`) and calls `onChange`. */
  toggle: () => void;
  /** Removes listeners. Leaves the DOM attributes in place. */
  destroy: () => void;
}

/** `aria-checked` takes "mixed" for the indeterminate state, otherwise "true"/"false". */
function ariaChecked(state: CheckboxState): string {
  return state === "mixed" ? "mixed" : String(state);
}

export function createCheckbox(options: CheckboxOptions): CheckboxInstance {
  const { element, onChange } = options;
  let checked: CheckboxState = options.checked ?? false;
  let disabled = options.disabled ?? false;

  element.setAttribute("role", "checkbox");
  element.setAttribute("tabindex", "0");

  function render(): void {
    element.setAttribute("aria-checked", ariaChecked(checked));
    // A disabled checkbox stays focusable so screen reader users can still reach it, so this is
    // aria-disabled rather than removing it from the tab order.
    if (disabled) {
      element.setAttribute("aria-disabled", "true");
    } else {
      element.removeAttribute("aria-disabled");
    }
  }

  function setChecked(next: CheckboxState): void {
    checked = next;
    render();
  }

  function toggle(): void {
    if (disabled) return;
    // Mixed resolves to checked, matching the APG tri-state example.
    checked = checked === "mixed" ? true : !checked;
    render();
    onChange?.(checked);
  }

  function handleClick(): void {
    toggle();
  }

  function handleKeyDown(event: KeyboardEvent): void {
    // Space activates a checkbox. Enter deliberately does nothing: the APG pattern reserves it
    // for submitting the surrounding form.
    if (event.key !== " ") return;
    event.preventDefault();
    toggle();
  }

  element.addEventListener("click", handleClick);
  element.addEventListener("keydown", handleKeyDown);
  render();

  return {
    element,
    getChecked: () => checked,
    setChecked,
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
