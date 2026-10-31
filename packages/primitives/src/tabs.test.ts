import { afterEach, describe, expect, it, vi } from "vitest";
import { createTabs } from "./tabs";

interface Tab {
  value?: string;
  text?: string;
  disabled?: "attribute" | "aria";
}

function mount(tabs: Tab[]): HTMLElement {
  const list = document.createElement("div");
  for (const { value, text, disabled } of tabs) {
    const tab = document.createElement("button");
    tab.setAttribute("role", "tab");
    if (value !== undefined) tab.setAttribute("data-value", value);
    tab.textContent = text ?? value ?? "";
    if (disabled === "attribute") tab.setAttribute("disabled", "");
    if (disabled === "aria") tab.setAttribute("aria-disabled", "true");
    list.append(tab);
  }
  document.body.append(list);
  return list;
}

function tabsOf(list: HTMLElement): HTMLElement[] {
  return Array.from(list.querySelectorAll<HTMLElement>('[role="tab"]'));
}

function selectedStates(list: HTMLElement): string[] {
  return tabsOf(list).map((tab) => tab.getAttribute("aria-selected") ?? "");
}

function tabIndexes(list: HTMLElement): string[] {
  return tabsOf(list).map((tab) => tab.getAttribute("tabindex") ?? "");
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

describe("createTabs: ARIA wiring", () => {
  it("marks the list and selects the initial value", () => {
    const list = mount([{ value: "a" }, { value: "b" }]);
    createTabs({ element: list, value: "b" });

    expect(list.getAttribute("role")).toBe("tablist");
    expect(list.getAttribute("aria-orientation")).toBe("horizontal");
    expect(selectedStates(list)).toEqual(["false", "true"]);
    expect(tabIndexes(list)).toEqual(["-1", "0"]);
  });

  it("makes the first enabled tab the tab stop when nothing is selected", () => {
    const list = mount([{ value: "a", disabled: "attribute" }, { value: "b" }]);
    const instance = createTabs({ element: list });

    expect(instance.getValue()).toBeNull();
    expect(tabIndexes(list)).toEqual(["-1", "0"]);
  });

  it("falls back to the text content for the value", () => {
    const list = mount([{ text: "One" }, { text: "Two" }]);
    const onChange = vi.fn();
    createTabs({ element: list, onChange });

    click(tabsOf(list)[1]);
    expect(onChange).toHaveBeenCalledWith("Two");
  });
});

describe("createTabs: pointer", () => {
  it("selects on click and reports once per change", () => {
    const list = mount([{ value: "a" }, { value: "b" }]);
    const onChange = vi.fn();
    createTabs({ element: list, value: "a", onChange });

    click(tabsOf(list)[1]);
    expect(selectedStates(list)).toEqual(["false", "true"]);
    expect(onChange).toHaveBeenCalledWith("b");

    click(tabsOf(list)[1]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it.each(["attribute", "aria"] as const)("ignores a tab disabled by %s", (how) => {
    const list = mount([{ value: "a" }, { value: "b", disabled: how }]);
    const onChange = vi.fn();
    createTabs({ element: list, value: "a", onChange });

    click(tabsOf(list)[1]);
    expect(onChange).not.toHaveBeenCalled();
    expect(selectedStates(list)).toEqual(["true", "false"]);
  });

  it("ignores clicks outside the tabs", () => {
    const list = mount([{ value: "a" }]);
    const onChange = vi.fn();
    createTabs({ element: list, onChange });

    click(list);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("createTabs: automatic activation", () => {
  it("Arrow keys move focus and select, wrapping at both ends", () => {
    const list = mount([{ value: "a" }, { value: "b" }, { value: "c" }]);
    const onChange = vi.fn();
    createTabs({ element: list, value: "a", onChange });
    const [a, b, c] = tabsOf(list);

    a.focus();
    expect(press(a, "ArrowRight").defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(b);
    expect(onChange).toHaveBeenLastCalledWith("b");
    press(b, "ArrowRight");
    press(c, "ArrowRight");
    expect(document.activeElement).toBe(a);
    press(a, "ArrowLeft");
    expect(document.activeElement).toBe(c);
    expect(selectedStates(list)).toEqual(["false", "false", "true"]);
    expect(tabIndexes(list)).toEqual(["-1", "-1", "0"]);
  });

  it("Home and End jump to the first and last enabled tab", () => {
    const list = mount([{ value: "a" }, { value: "b" }, { value: "c", disabled: "aria" }]);
    createTabs({ element: list, value: "b" });
    const [a, b] = tabsOf(list);

    b.focus();
    press(b, "Home");
    expect(document.activeElement).toBe(a);
    press(a, "End");
    expect(document.activeElement).toBe(b);
  });

  it("skips disabled tabs and starts from the first when focus is elsewhere", () => {
    const list = mount([{ value: "a" }, { value: "b", disabled: "attribute" }, { value: "c" }]);
    list.tabIndex = -1;
    createTabs({ element: list });
    const [a, , c] = tabsOf(list);

    list.focus();
    press(list, "ArrowRight");
    expect(document.activeElement).toBe(a);
    press(a, "ArrowRight");
    expect(document.activeElement).toBe(c);
  });

  it("does nothing when every tab is disabled", () => {
    const list = mount([{ value: "a", disabled: "attribute" }]);
    list.tabIndex = -1;
    createTabs({ element: list });

    list.focus();
    press(list, "ArrowRight");
    press(list, "Home");
    press(list, "End");
    expect(document.activeElement).toBe(list);
  });

  it("uses Up/Down in a vertical list and ignores Left/Right", () => {
    const list = mount([{ value: "a" }, { value: "b" }]);
    createTabs({ element: list, orientation: "vertical" });
    const [a, b] = tabsOf(list);

    expect(list.getAttribute("aria-orientation")).toBe("vertical");
    a.focus();
    expect(press(a, "ArrowRight").defaultPrevented).toBe(false);
    expect(document.activeElement).toBe(a);
    press(a, "ArrowDown");
    expect(document.activeElement).toBe(b);
    press(b, "ArrowUp");
    expect(document.activeElement).toBe(a);
  });

  it("leaves other keys alone", () => {
    const list = mount([{ value: "a" }]);
    createTabs({ element: list });
    const [a] = tabsOf(list);

    a.focus();
    expect(press(a, "Tab").defaultPrevented).toBe(false);
  });
});

describe("createTabs: manual activation", () => {
  it("Arrow keys only move focus; Enter or Space selects", () => {
    const list = mount([{ value: "a" }, { value: "b" }]);
    const onChange = vi.fn();
    createTabs({ element: list, value: "a", activation: "manual", onChange });
    const [a, b] = tabsOf(list);

    a.focus();
    press(a, "ArrowRight");
    expect(document.activeElement).toBe(b);
    expect(onChange).not.toHaveBeenCalled();
    expect(selectedStates(list)).toEqual(["true", "false"]);
    // The focused tab is the tab stop so Tab-ing away and back lands on it.
    expect(tabIndexes(list)).toEqual(["-1", "0"]);

    expect(press(b, "Enter").defaultPrevented).toBe(true);
    expect(onChange).toHaveBeenCalledWith("b");
    expect(selectedStates(list)).toEqual(["false", "true"]);

    press(b, "ArrowLeft");
    press(a, " ");
    expect(onChange).toHaveBeenLastCalledWith("a");
  });

  it("ignores Enter from outside the tabs", () => {
    const list = mount([{ value: "a" }]);
    list.tabIndex = -1;
    const onChange = vi.fn();
    createTabs({ element: list, activation: "manual", onChange });

    list.focus();
    expect(press(list, "Enter").defaultPrevented).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("createTabs: imperative API", () => {
  it("setValue updates the DOM without calling onChange", () => {
    const list = mount([{ value: "a" }, { value: "b" }]);
    const onChange = vi.fn();
    const instance = createTabs({ element: list, onChange });

    instance.setValue("b");
    expect(selectedStates(list)).toEqual(["false", "true"]);
    expect(instance.getValue()).toBe("b");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("refresh picks up tabs added later", () => {
    const list = mount([{ value: "a" }]);
    const instance = createTabs({ element: list });
    const tab = document.createElement("button");
    tab.setAttribute("role", "tab");
    tab.setAttribute("data-value", "b");
    list.append(tab);

    instance.refresh();
    expect(tabIndexes(list)).toEqual(["0", "-1"]);
    click(tab);
    expect(instance.getValue()).toBe("b");
  });

  it("destroy removes the listeners but leaves the attributes", () => {
    const list = mount([{ value: "a" }, { value: "b" }]);
    const onChange = vi.fn();
    const instance = createTabs({ element: list, onChange });
    const [a, b] = tabsOf(list);

    instance.destroy();
    click(b);
    a.focus();
    press(a, "ArrowRight");
    expect(onChange).not.toHaveBeenCalled();
    expect(list.getAttribute("role")).toBe("tablist");
  });
});
