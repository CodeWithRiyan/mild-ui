import { afterEach, describe, expect, it, vi } from "vitest";
import { createAccordion } from "./accordion";

interface Item {
  value?: string;
  text?: string;
  disabled?: "attribute" | "aria";
  tag?: "button" | "div";
}

function mount(items: Item[]): HTMLElement {
  const accordion = document.createElement("div");
  for (const { value, text, disabled, tag = "button" } of items) {
    const header = document.createElement(tag);
    header.setAttribute("aria-expanded", "false");
    if (tag === "div") {
      header.setAttribute("role", "button");
      header.tabIndex = 0;
    }
    if (value !== undefined) header.setAttribute("data-value", value);
    header.textContent = text ?? value ?? "";
    if (disabled === "attribute") header.setAttribute("disabled", "");
    if (disabled === "aria") header.setAttribute("aria-disabled", "true");
    const panel = document.createElement("div");
    panel.innerHTML = "<button>inside</button>";
    accordion.append(header, panel);
  }
  document.body.append(accordion);
  return accordion;
}

function headersOf(accordion: HTMLElement): HTMLElement[] {
  return Array.from(accordion.querySelectorAll<HTMLElement>("[aria-expanded]"));
}

function expandedStates(accordion: HTMLElement): string[] {
  return headersOf(accordion).map((header) => header.getAttribute("aria-expanded") ?? "");
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

describe("createAccordion: ARIA wiring", () => {
  it("expands the headers matching the initial value", () => {
    const accordion = mount([{ value: "a" }, { value: "b" }]);
    const instance = createAccordion({ element: accordion, value: ["b"] });

    expect(expandedStates(accordion)).toEqual(["false", "true"]);
    expect(instance.getValue()).toEqual(["b"]);
  });

  it("falls back to the text content for the value", () => {
    const accordion = mount([{ text: "Shipping" }]);
    const onChange = vi.fn();
    createAccordion({ element: accordion, onChange });

    click(headersOf(accordion)[0]);
    expect(onChange).toHaveBeenCalledWith(["Shipping"]);
  });
});

describe("createAccordion: single mode", () => {
  it("opens one panel at a time and closes it again when collapsible", () => {
    const accordion = mount([{ value: "a" }, { value: "b" }]);
    const onChange = vi.fn();
    createAccordion({ element: accordion, onChange });
    const [a, b] = headersOf(accordion);

    click(a);
    expect(expandedStates(accordion)).toEqual(["true", "false"]);
    click(b);
    expect(expandedStates(accordion)).toEqual(["false", "true"]);
    expect(onChange).toHaveBeenLastCalledWith(["b"]);
    click(b);
    expect(expandedStates(accordion)).toEqual(["false", "false"]);
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it("keeps the open panel open when not collapsible", () => {
    const accordion = mount([{ value: "a" }, { value: "b" }]);
    const onChange = vi.fn();
    createAccordion({ element: accordion, value: ["a"], collapsible: false, onChange });

    click(headersOf(accordion)[0]);
    expect(expandedStates(accordion)).toEqual(["true", "false"]);
    expect(onChange).not.toHaveBeenCalled();
    click(headersOf(accordion)[1]);
    expect(expandedStates(accordion)).toEqual(["false", "true"]);
  });
});

describe("createAccordion: multiple mode", () => {
  it("toggles panels independently", () => {
    const accordion = mount([{ value: "a" }, { value: "b" }]);
    const instance = createAccordion({ element: accordion, multiple: true });
    const [a, b] = headersOf(accordion);

    click(a);
    click(b);
    expect(expandedStates(accordion)).toEqual(["true", "true"]);
    click(a);
    expect(instance.getValue()).toEqual(["b"]);
  });
});

describe("createAccordion: disabled headers and stray clicks", () => {
  it.each(["attribute", "aria"] as const)("never toggles a header disabled by %s", (how) => {
    const accordion = mount([{ value: "a", disabled: how }]);
    const onChange = vi.fn();
    createAccordion({ element: accordion, onChange });

    click(headersOf(accordion)[0]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("ignores clicks inside the panels", () => {
    const accordion = mount([{ value: "a" }]);
    const onChange = vi.fn();
    createAccordion({ element: accordion, onChange });

    click(accordion.querySelector(":scope > div > button") as HTMLElement);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("createAccordion: keyboard", () => {
  it("moves between headers with Arrow Down/Up, wrapping, and skips disabled ones", () => {
    const accordion = mount([
      { value: "a" },
      { value: "b", disabled: "attribute" },
      { value: "c" },
    ]);
    const onChange = vi.fn();
    createAccordion({ element: accordion, onChange });
    const [a, , c] = headersOf(accordion);

    a.focus();
    expect(press(a, "ArrowDown").defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(c);
    press(c, "ArrowDown");
    expect(document.activeElement).toBe(a);
    press(a, "ArrowUp");
    expect(document.activeElement).toBe(c);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("jumps to the first and last header with Home and End", () => {
    const accordion = mount([{ value: "a" }, { value: "b" }, { value: "c", disabled: "aria" }]);
    createAccordion({ element: accordion });
    const [a, b] = headersOf(accordion);

    b.focus();
    press(b, "Home");
    expect(document.activeElement).toBe(a);
    press(a, "End");
    expect(document.activeElement).toBe(b);
  });

  it("leaves the keys alone inside the panels and for other keys", () => {
    const accordion = mount([{ value: "a" }, { value: "b" }]);
    createAccordion({ element: accordion });
    const inside = accordion.querySelector(":scope > div > button") as HTMLElement;
    const [a] = headersOf(accordion);

    inside.focus();
    expect(press(inside, "ArrowDown").defaultPrevented).toBe(false);
    expect(document.activeElement).toBe(inside);
    a.focus();
    expect(press(a, "Tab").defaultPrevented).toBe(false);
  });

  it("does nothing when every header is disabled", () => {
    const accordion = mount([{ value: "a", disabled: "aria" }]);
    createAccordion({ element: accordion });
    const [a] = headersOf(accordion);

    a.focus();
    press(a, "ArrowDown");
    press(a, "Home");
    press(a, "End");
    expect(document.activeElement).toBe(a);
  });

  it("toggles non-native headers with Enter and Space, leaving native buttons to the browser", () => {
    const accordion = mount([
      { value: "a", tag: "div" },
      { value: "b", tag: "button" },
    ]);
    const onChange = vi.fn();
    createAccordion({ element: accordion, multiple: true, onChange });
    const [a, b] = headersOf(accordion);

    a.focus();
    expect(press(a, "Enter").defaultPrevented).toBe(true);
    expect(onChange).toHaveBeenLastCalledWith(["a"]);
    expect(press(a, " ").defaultPrevented).toBe(true);
    expect(onChange).toHaveBeenLastCalledWith([]);

    b.focus();
    expect(press(b, "Enter").defaultPrevented).toBe(false);
    expect(press(b, " ").defaultPrevented).toBe(false);
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});

describe("createAccordion: imperative API", () => {
  it("setValue updates the DOM without calling onChange", () => {
    const accordion = mount([{ value: "a" }, { value: "b" }]);
    const onChange = vi.fn();
    const instance = createAccordion({ element: accordion, multiple: true, onChange });

    instance.setValue(["a", "b"]);
    expect(expandedStates(accordion)).toEqual(["true", "true"]);
    expect(onChange).not.toHaveBeenCalled();
    instance.getValue().push("zzz");
    expect(instance.getValue()).toEqual(["a", "b"]);
  });

  it("refresh picks up headers added later", () => {
    const accordion = mount([{ value: "a" }]);
    const instance = createAccordion({ element: accordion });
    const header = document.createElement("button");
    header.setAttribute("aria-expanded", "false");
    header.setAttribute("data-value", "b");
    accordion.append(header);

    instance.refresh();
    click(header);
    expect(instance.getValue()).toEqual(["b"]);
  });

  it("destroy removes the listeners but leaves the attributes", () => {
    const accordion = mount([{ value: "a" }, { value: "b" }]);
    const onChange = vi.fn();
    const instance = createAccordion({ element: accordion, value: ["a"], onChange });
    const [a] = headersOf(accordion);

    instance.destroy();
    click(a);
    a.focus();
    press(a, "ArrowDown");
    expect(onChange).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(a);
    expect(expandedStates(accordion)).toEqual(["true", "false"]);
  });
});
