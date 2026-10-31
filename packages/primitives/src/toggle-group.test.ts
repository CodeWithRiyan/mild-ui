import { afterEach, describe, expect, it, vi } from "vitest";
import { createToggleGroup } from "./toggle-group";

interface Item {
  value?: string;
  text?: string;
  disabled?: "attribute" | "aria";
  tag?: "button" | "div";
}

function mount(items: Item[]): HTMLElement {
  const group = document.createElement("div");
  for (const { value, text, disabled, tag = "button" } of items) {
    const item = document.createElement(tag);
    item.setAttribute("aria-pressed", "false");
    if (tag === "div") item.setAttribute("role", "button");
    if (value !== undefined) item.setAttribute("data-value", value);
    item.textContent = text ?? value ?? "";
    if (disabled === "attribute") item.setAttribute("disabled", "");
    if (disabled === "aria") item.setAttribute("aria-disabled", "true");
    group.append(item);
  }
  document.body.append(group);
  return group;
}

function itemsOf(group: HTMLElement): HTMLElement[] {
  return Array.from(group.querySelectorAll<HTMLElement>("[aria-pressed]"));
}

function pressedStates(group: HTMLElement): string[] {
  return itemsOf(group).map((item) => item.getAttribute("aria-pressed") ?? "");
}

function tabIndexes(group: HTMLElement): string[] {
  return itemsOf(group).map((item) => item.getAttribute("tabindex") ?? "");
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

describe("createToggleGroup: ARIA wiring", () => {
  it("marks the container as a group and the items as not pressed", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    createToggleGroup({ element: group });

    expect(group.getAttribute("role")).toBe("group");
    expect(pressedStates(group)).toEqual(["false", "false"]);
  });

  it("keeps a role the container already has", () => {
    const group = mount([{ value: "a" }]);
    group.setAttribute("role", "toolbar");
    createToggleGroup({ element: group });

    expect(group.getAttribute("role")).toBe("toolbar");
  });

  it("presses the items matching the initial value", () => {
    const group = mount([{ value: "a" }, { value: "b" }, { value: "c" }]);
    const instance = createToggleGroup({ element: group, multiple: true, value: ["a", "c"] });

    expect(pressedStates(group)).toEqual(["true", "false", "true"]);
    expect(instance.getValue()).toEqual(["a", "c"]);
  });

  it("falls back to the text content when an item has no data-value", () => {
    const group = mount([{ text: "Bold" }, { text: "Italic" }]);
    const onChange = vi.fn();
    createToggleGroup({ element: group, onChange });

    click(itemsOf(group)[1]);
    expect(onChange).toHaveBeenCalledWith(["Italic"]);
  });
});

describe("createToggleGroup: roving tabindex", () => {
  it("makes the first pressed item the tab stop, else the first enabled item", () => {
    const group = mount([{ value: "a", disabled: "attribute" }, { value: "b" }, { value: "c" }]);
    const instance = createToggleGroup({ element: group, value: ["c"] });
    expect(tabIndexes(group)).toEqual(["-1", "-1", "0"]);

    instance.setValue([]);
    expect(tabIndexes(group)).toEqual(["-1", "0", "-1"]);
  });

  it("keeps the last focused item as the tab stop", () => {
    const group = mount([{ value: "a" }, { value: "b" }, { value: "c" }]);
    createToggleGroup({ element: group });

    itemsOf(group)[2].focus();
    expect(tabIndexes(group)).toEqual(["-1", "-1", "0"]);
  });

  it("ignores focus events from elements that are not items", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    const other = document.createElement("button");
    group.append(other);
    createToggleGroup({ element: group });

    other.focus();
    expect(tabIndexes(group)).toEqual(["0", "-1"]);
  });
});

describe("createToggleGroup: single mode", () => {
  it("presses one item at a time and clears it when pressed again", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    const onChange = vi.fn();
    const instance = createToggleGroup({ element: group, onChange });

    click(itemsOf(group)[0]);
    expect(pressedStates(group)).toEqual(["true", "false"]);
    expect(onChange).toHaveBeenLastCalledWith(["a"]);

    click(itemsOf(group)[1]);
    expect(pressedStates(group)).toEqual(["false", "true"]);
    expect(onChange).toHaveBeenLastCalledWith(["b"]);

    click(itemsOf(group)[1]);
    expect(pressedStates(group)).toEqual(["false", "false"]);
    expect(onChange).toHaveBeenLastCalledWith([]);
    expect(instance.getValue()).toEqual([]);
  });
});

describe("createToggleGroup: multiple mode", () => {
  it("toggles every item independently, keeping the press order", () => {
    const group = mount([{ value: "a" }, { value: "b" }, { value: "c" }]);
    const onChange = vi.fn();
    const instance = createToggleGroup({ element: group, multiple: true });
    const [a, b, c] = itemsOf(group);
    void onChange;

    click(c);
    click(a);
    expect(instance.getValue()).toEqual(["c", "a"]);
    expect(pressedStates(group)).toEqual(["true", "false", "true"]);

    click(c);
    expect(instance.getValue()).toEqual(["a"]);
    expect(b.getAttribute("aria-pressed")).toBe("false");
  });
});

describe("createToggleGroup: disabled items", () => {
  it.each(["attribute", "aria"] as const)("never presses an item disabled by %s", (how) => {
    const group = mount([{ value: "a", disabled: how }, { value: "b" }]);
    const onChange = vi.fn();
    createToggleGroup({ element: group, onChange });

    click(itemsOf(group)[0]);
    expect(pressedStates(group)).toEqual(["false", "false"]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("skips disabled items when moving focus", () => {
    const group = mount([{ value: "a" }, { value: "b", disabled: "attribute" }, { value: "c" }]);
    createToggleGroup({ element: group });
    const [a, , c] = itemsOf(group);

    a.focus();
    press(a, "ArrowRight");
    expect(document.activeElement).toBe(c);
  });

  it("ignores clicks outside the items", () => {
    const group = mount([{ value: "a" }]);
    const onChange = vi.fn();
    createToggleGroup({ element: group, onChange });

    click(group);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("createToggleGroup: keyboard", () => {
  it("moves focus with the Arrow keys without pressing, wrapping at both ends", () => {
    const group = mount([{ value: "a" }, { value: "b" }, { value: "c" }]);
    const onChange = vi.fn();
    createToggleGroup({ element: group, onChange });
    const [a, b, c] = itemsOf(group);

    a.focus();
    expect(press(a, "ArrowRight").defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(b);
    press(b, "ArrowDown");
    expect(document.activeElement).toBe(c);
    press(c, "ArrowRight");
    expect(document.activeElement).toBe(a);
    press(a, "ArrowLeft");
    expect(document.activeElement).toBe(c);
    press(c, "ArrowUp");
    expect(document.activeElement).toBe(b);

    expect(onChange).not.toHaveBeenCalled();
    expect(pressedStates(group)).toEqual(["false", "false", "false"]);
    expect(tabIndexes(group)).toEqual(["-1", "0", "-1"]);
  });

  it("stops at the ends when loop is off", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    createToggleGroup({ element: group, loop: false });
    const [a, b] = itemsOf(group);

    a.focus();
    press(a, "ArrowLeft");
    expect(document.activeElement).toBe(a);
    press(a, "ArrowRight");
    expect(document.activeElement).toBe(b);
    press(b, "ArrowRight");
    expect(document.activeElement).toBe(b);
  });

  it("starts from the first item when focus is on the group itself", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    group.tabIndex = -1;
    createToggleGroup({ element: group });

    group.focus();
    press(group, "ArrowRight");
    expect(document.activeElement).toBe(itemsOf(group)[0]);
  });

  it("does nothing when every item is disabled", () => {
    const group = mount([{ value: "a", disabled: "attribute" }]);
    group.tabIndex = -1;
    createToggleGroup({ element: group });

    group.focus();
    press(group, "ArrowRight");
    press(group, "Home");
    press(group, "End");
    expect(document.activeElement).toBe(group);
  });

  it("jumps to the first and last enabled item with Home and End", () => {
    const group = mount([{ value: "a" }, { value: "b" }, { value: "c", disabled: "aria" }]);
    createToggleGroup({ element: group });
    const [a, b] = itemsOf(group);

    b.focus();
    press(b, "Home");
    expect(document.activeElement).toBe(a);
    press(a, "End");
    expect(document.activeElement).toBe(b);
  });

  it("toggles non-native items with Space and Enter, leaving native buttons to the browser", () => {
    const group = mount([
      { value: "a", tag: "div" },
      { value: "b", tag: "button" },
    ]);
    const onChange = vi.fn();
    createToggleGroup({ element: group, multiple: true, onChange });
    const [a, b] = itemsOf(group);

    a.focus();
    expect(press(a, " ").defaultPrevented).toBe(true);
    expect(onChange).toHaveBeenLastCalledWith(["a"]);
    expect(press(a, "Enter").defaultPrevented).toBe(true);
    expect(onChange).toHaveBeenLastCalledWith([]);

    // A native button fires its own click for these keys, so the primitive must not double up.
    b.focus();
    expect(press(b, " ").defaultPrevented).toBe(false);
    expect(press(b, "Enter").defaultPrevented).toBe(false);
    expect(onChange).toHaveBeenCalledTimes(2);

    // Space from outside the items is ignored too.
    expect(press(group, " ").defaultPrevented).toBe(false);
  });

  it("leaves other keys alone", () => {
    const group = mount([{ value: "a" }]);
    createToggleGroup({ element: group });
    const [a] = itemsOf(group);

    a.focus();
    expect(press(a, "Tab").defaultPrevented).toBe(false);
  });
});

describe("createToggleGroup: imperative API", () => {
  it("setValue updates the DOM without calling onChange", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    const onChange = vi.fn();
    const instance = createToggleGroup({ element: group, multiple: true, onChange });

    instance.setValue(["a", "b"]);
    expect(pressedStates(group)).toEqual(["true", "true"]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("returns copies so callers cannot mutate the internal value", () => {
    const group = mount([{ value: "a" }]);
    const instance = createToggleGroup({ element: group, value: ["a"] });

    instance.getValue().push("zzz");
    expect(instance.getValue()).toEqual(["a"]);
  });

  it("refresh picks up items added later and forgets removed ones", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    const instance = createToggleGroup({ element: group });
    const [a, b] = itemsOf(group);

    b.focus();
    b.remove();
    const c = document.createElement("button");
    c.setAttribute("aria-pressed", "false");
    c.setAttribute("data-value", "c");
    group.append(c);
    instance.refresh();

    // The removed item is no longer the tab stop; the new one is wired.
    expect(tabIndexes(group)).toEqual(["0", "-1"]);
    click(c);
    expect(instance.getValue()).toEqual(["c"]);
    expect(a.getAttribute("aria-pressed")).toBe("false");
  });

  it("destroy removes the listeners but leaves the attributes", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    const onChange = vi.fn();
    const instance = createToggleGroup({ element: group, onChange });
    const [a, b] = itemsOf(group);

    instance.destroy();
    click(a);
    a.focus();
    press(a, "ArrowRight");
    b.focus();
    expect(onChange).not.toHaveBeenCalled();
    expect(pressedStates(group)).toEqual(["false", "false"]);
    expect(group.getAttribute("role")).toBe("group");
  });
});
