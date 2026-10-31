import { afterEach, describe, expect, it, vi } from "vitest";
import { createSwitch } from "./switch";

function mount(): HTMLElement {
  const element = document.createElement("span");
  document.body.append(element);
  return element;
}

function press(element: HTMLElement, key: string): KeyboardEvent {
  const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
  element.dispatchEvent(event);
  return event;
}

function click(element: HTMLElement): void {
  element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("createSwitch: ARIA wiring", () => {
  it("marks the element as a focusable, off switch by default", () => {
    const toggle = createSwitch({ element: mount() });

    expect(toggle.element.getAttribute("role")).toBe("switch");
    expect(toggle.element.getAttribute("tabindex")).toBe("0");
    expect(toggle.element.getAttribute("aria-checked")).toBe("false");
    expect(toggle.element.hasAttribute("aria-disabled")).toBe(false);
    expect(toggle.getChecked()).toBe(false);
  });

  it("honours an initial checked state", () => {
    const toggle = createSwitch({ element: mount(), checked: true });

    expect(toggle.element.getAttribute("aria-checked")).toBe("true");
    expect(toggle.getChecked()).toBe(true);
  });

  it("stays focusable when disabled, and says so with aria-disabled", () => {
    const toggle = createSwitch({ element: mount(), disabled: true });

    expect(toggle.element.getAttribute("aria-disabled")).toBe("true");
    expect(toggle.element.getAttribute("tabindex")).toBe("0");
  });
});

describe("createSwitch: toggling", () => {
  it("toggles on click and reports each change", () => {
    const onChange = vi.fn();
    const toggle = createSwitch({ element: mount(), onChange });

    click(toggle.element);
    expect(toggle.getChecked()).toBe(true);
    expect(toggle.element.getAttribute("aria-checked")).toBe("true");
    expect(onChange).toHaveBeenNthCalledWith(1, true);

    click(toggle.element);
    expect(toggle.getChecked()).toBe(false);
    expect(onChange).toHaveBeenNthCalledWith(2, false);
  });

  it("toggles on Space, and prevents the default scroll", () => {
    const toggle = createSwitch({ element: mount() });

    const event = press(toggle.element, " ");

    expect(toggle.getChecked()).toBe(true);
    expect(event.defaultPrevented).toBe(true);
  });

  it("toggles on Enter too, which is what separates a switch from a checkbox", () => {
    const toggle = createSwitch({ element: mount() });

    const event = press(toggle.element, "Enter");

    expect(toggle.getChecked()).toBe(true);
    expect(event.defaultPrevented).toBe(true);
  });

  it("ignores other keys", () => {
    const toggle = createSwitch({ element: mount() });

    press(toggle.element, "a");

    expect(toggle.getChecked()).toBe(false);
  });

  it("works without an onChange callback", () => {
    const toggle = createSwitch({ element: mount() });

    expect(() => toggle.toggle()).not.toThrow();
    expect(toggle.getChecked()).toBe(true);
  });
});

describe("createSwitch: disabled", () => {
  it("ignores clicks and keys while disabled", () => {
    const onChange = vi.fn();
    const toggle = createSwitch({ element: mount(), disabled: true, onChange });

    click(toggle.element);
    press(toggle.element, " ");
    press(toggle.element, "Enter");

    expect(toggle.getChecked()).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("can be disabled and re-enabled after creation", () => {
    const toggle = createSwitch({ element: mount() });

    toggle.setDisabled(true);
    click(toggle.element);
    expect(toggle.getChecked()).toBe(false);
    expect(toggle.element.getAttribute("aria-disabled")).toBe("true");

    toggle.setDisabled(false);
    click(toggle.element);
    expect(toggle.getChecked()).toBe(true);
    expect(toggle.element.hasAttribute("aria-disabled")).toBe(false);
  });
});

describe("createSwitch: imperative API", () => {
  it("setChecked updates the DOM without calling onChange", () => {
    const onChange = vi.fn();
    const toggle = createSwitch({ element: mount(), onChange });

    toggle.setChecked(true);

    expect(toggle.getChecked()).toBe(true);
    expect(toggle.element.getAttribute("aria-checked")).toBe("true");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("destroy stops responding to events", () => {
    const onChange = vi.fn();
    const toggle = createSwitch({ element: mount(), onChange });

    toggle.destroy();
    click(toggle.element);
    press(toggle.element, "Enter");

    expect(toggle.getChecked()).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });
});
