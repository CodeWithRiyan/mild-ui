import { afterEach, describe, expect, it, vi } from "vitest";
import { createCheckbox } from "./checkbox";

function mount(): HTMLElement {
  const element = document.createElement("span");
  document.body.append(element);
  return element;
}

function press(element: HTMLElement, key: string): void {
  element.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
}

function click(element: HTMLElement): void {
  element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("createCheckbox: ARIA wiring", () => {
  it("marks the element as a focusable, unchecked checkbox by default", () => {
    const checkbox = createCheckbox({ element: mount() });

    expect(checkbox.element.getAttribute("role")).toBe("checkbox");
    expect(checkbox.element.getAttribute("tabindex")).toBe("0");
    expect(checkbox.element.getAttribute("aria-checked")).toBe("false");
    expect(checkbox.element.hasAttribute("aria-disabled")).toBe(false);
    expect(checkbox.getChecked()).toBe(false);
  });

  it("honours an initial checked state", () => {
    const checkbox = createCheckbox({ element: mount(), checked: true });

    expect(checkbox.element.getAttribute("aria-checked")).toBe("true");
    expect(checkbox.getChecked()).toBe(true);
  });

  it('renders the indeterminate state as aria-checked="mixed"', () => {
    const checkbox = createCheckbox({ element: mount(), checked: "mixed" });

    expect(checkbox.element.getAttribute("aria-checked")).toBe("mixed");
    expect(checkbox.getChecked()).toBe("mixed");
  });

  it("stays focusable when disabled, and says so with aria-disabled", () => {
    const checkbox = createCheckbox({ element: mount(), disabled: true });

    expect(checkbox.element.getAttribute("aria-disabled")).toBe("true");
    expect(checkbox.element.getAttribute("tabindex")).toBe("0");
  });
});

describe("createCheckbox: toggling", () => {
  it("toggles on click and reports each change", () => {
    const onChange = vi.fn();
    const checkbox = createCheckbox({ element: mount(), onChange });

    click(checkbox.element);
    expect(checkbox.getChecked()).toBe(true);
    expect(checkbox.element.getAttribute("aria-checked")).toBe("true");
    expect(onChange).toHaveBeenNthCalledWith(1, true);

    click(checkbox.element);
    expect(checkbox.getChecked()).toBe(false);
    expect(onChange).toHaveBeenNthCalledWith(2, false);
  });

  it("toggles on Space and prevents the page from scrolling", () => {
    const element = mount();
    const checkbox = createCheckbox({ element });
    const event = new KeyboardEvent("keydown", { key: " ", bubbles: true, cancelable: true });

    element.dispatchEvent(event);

    expect(checkbox.getChecked()).toBe(true);
    expect(event.defaultPrevented).toBe(true);
  });

  it("ignores Enter, which the APG reserves for submitting the form", () => {
    const checkbox = createCheckbox({ element: mount() });

    press(checkbox.element, "Enter");

    expect(checkbox.getChecked()).toBe(false);
  });

  it("resolves the mixed state to checked, per the APG tri-state example", () => {
    const onChange = vi.fn();
    const checkbox = createCheckbox({ element: mount(), checked: "mixed", onChange });

    checkbox.toggle();

    expect(checkbox.getChecked()).toBe(true);
    expect(checkbox.element.getAttribute("aria-checked")).toBe("true");
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("works without an onChange callback", () => {
    const checkbox = createCheckbox({ element: mount() });

    expect(() => click(checkbox.element)).not.toThrow();
    expect(checkbox.getChecked()).toBe(true);
  });
});

describe("createCheckbox: disabled", () => {
  it("ignores clicks and Space while disabled", () => {
    const onChange = vi.fn();
    const checkbox = createCheckbox({ element: mount(), disabled: true, onChange });

    click(checkbox.element);
    press(checkbox.element, " ");

    expect(checkbox.getChecked()).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("can be disabled and re-enabled after creation", () => {
    const checkbox = createCheckbox({ element: mount() });

    checkbox.setDisabled(true);
    click(checkbox.element);
    expect(checkbox.getChecked()).toBe(false);
    expect(checkbox.element.getAttribute("aria-disabled")).toBe("true");

    checkbox.setDisabled(false);
    click(checkbox.element);
    expect(checkbox.getChecked()).toBe(true);
    expect(checkbox.element.hasAttribute("aria-disabled")).toBe(false);
  });
});

describe("createCheckbox: imperative API", () => {
  it("setChecked updates the DOM without calling onChange", () => {
    const onChange = vi.fn();
    const checkbox = createCheckbox({ element: mount(), onChange });

    checkbox.setChecked("mixed");

    expect(checkbox.getChecked()).toBe("mixed");
    expect(checkbox.element.getAttribute("aria-checked")).toBe("mixed");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("destroy stops responding to events", () => {
    const onChange = vi.fn();
    const checkbox = createCheckbox({ element: mount(), onChange });

    checkbox.destroy();
    click(checkbox.element);
    press(checkbox.element, " ");

    expect(checkbox.getChecked()).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });
});
