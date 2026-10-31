/**
 * Headless form field: wires a control to its label, description and error message.
 *
 * Follows the WAI-ARIA Authoring Practices guidance on accessible names and descriptions:
 * https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/
 *
 * What it does:
 *   - Gives the control an `id` if it has none.
 *   - A `<label>` is wired with `for` when the control is a native form control. Custom controls
 *     (`span[role="checkbox"]`, ...) are not labelable, so those and non-`<label>` elements are
 *     wired with `aria-labelledby` instead, and clicking a `<label>` focuses the control (and
 *     activates it for checkbox/radio/switch roles) as a native label would.
 *   - The description and the error message are both referenced from `aria-describedby`, in that
 *     order, so the error is announced last.
 *   - While invalid, the control gets `aria-invalid="true"` and the error id joins
 *     `aria-describedby`; while valid, both are dropped, so a hidden error element is never
 *     referenced.
 *
 * No framework, no dependencies: it drives DOM you already rendered.
 */

export interface FieldOptions {
  /** The form control: `input`, `select`, `textarea`, or any element with a widget role. */
  control: HTMLElement;
  /** Label element. A `<label>` gets `for`; anything else is referenced by `aria-labelledby`. */
  label?: HTMLElement | null;
  /** Hint/description element, referenced by `aria-describedby`. */
  description?: HTMLElement | null;
  /** Error message element, referenced by `aria-describedby` only while invalid. */
  error?: HTMLElement | null;
  /** Base used for generated ids. Defaults to the control's id, or a generated one. */
  id?: string;
  /** Whether the field starts invalid. Defaults to `false`. */
  invalid?: boolean;
}

export interface FieldIds {
  control: string;
  label?: string;
  description?: string;
  error?: string;
}

export interface FieldInstance {
  readonly control: HTMLElement;
  /** Ids assigned to each part, so you can reuse them elsewhere. */
  readonly ids: FieldIds;
  /** Whether the field is currently invalid. */
  getInvalid: () => boolean;
  /** Marks the field valid or invalid, updating `aria-invalid` and `aria-describedby`. */
  setInvalid: (invalid: boolean) => void;
  /** Removes the attributes this field wired up. */
  destroy: () => void;
}

let idCounter = 0;

function ensureId(element: HTMLElement, fallback: string): string {
  if (!element.id) element.id = fallback;
  return element.id;
}

/** Elements a `<label for>` can name and activate (HTML "labelable elements"). */
const LABELABLE = ["BUTTON", "INPUT", "METER", "OUTPUT", "PROGRESS", "SELECT", "TEXTAREA"];
const ACTIVATED_BY_LABEL = ["checkbox", "radio", "switch"];

export function createField(options: FieldOptions): FieldInstance {
  const { control, label, description, error } = options;
  let invalid = options.invalid ?? false;

  const base = options.id ?? control.id;
  const prefix = base === "" ? `mild-field-${++idCounter}` : base;
  const controlId = ensureId(control, prefix);

  const ids: FieldIds = { control: controlId };

  const nativeLabel = Boolean(
    label && label.tagName === "LABEL" && LABELABLE.includes(control.tagName),
  );
  const delegatedLabel = Boolean(label && label.tagName === "LABEL" && !nativeLabel);

  function handleLabelClick(event: MouseEvent): void {
    event.preventDefault();
    control.focus();
    if (ACTIVATED_BY_LABEL.includes(control.getAttribute("role") ?? "")) control.click();
  }

  if (label) {
    ids.label = ensureId(label, `${prefix}-label`);
    if (nativeLabel) {
      // A <label for> names and activates a native control by itself.
      label.setAttribute("for", controlId);
    } else {
      control.setAttribute("aria-labelledby", ids.label);
    }
    if (delegatedLabel) label.addEventListener("click", handleLabelClick);
  }

  if (description) ids.description = ensureId(description, `${prefix}-description`);
  if (error) ids.error = ensureId(error, `${prefix}-error`);

  function render(): void {
    // Description first, then the error, so the error is the last thing announced.
    const describedBy = [ids.description, invalid ? ids.error : undefined].filter(
      (id): id is string => typeof id === "string",
    );

    if (describedBy.length > 0) {
      control.setAttribute("aria-describedby", describedBy.join(" "));
    } else {
      control.removeAttribute("aria-describedby");
    }

    if (invalid) {
      control.setAttribute("aria-invalid", "true");
    } else {
      control.removeAttribute("aria-invalid");
    }
  }

  render();

  return {
    control,
    ids,
    getInvalid: () => invalid,
    setInvalid: (next: boolean) => {
      invalid = next;
      render();
    },
    destroy: () => {
      control.removeAttribute("aria-describedby");
      control.removeAttribute("aria-invalid");
      control.removeAttribute("aria-labelledby");
      if (nativeLabel) label?.removeAttribute("for");
      if (delegatedLabel) label?.removeEventListener("click", handleLabelClick);
    },
  };
}
