import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createListbox } from "./listbox";

interface Option {
  label: string;
  value?: string;
  id?: string;
  disabled?: "attribute" | "aria";
}

function mount(options: Option[]): HTMLElement {
  const list = document.createElement("ul");
  for (const { label, value, id, disabled } of options) {
    const option = document.createElement("li");
    option.setAttribute("role", "option");
    option.textContent = label;
    if (value !== undefined) option.setAttribute("data-value", value);
    if (id !== undefined) option.id = id;
    if (disabled === "attribute") option.setAttribute("disabled", "");
    if (disabled === "aria") option.setAttribute("aria-disabled", "true");
    list.append(option);
  }
  document.body.append(list);
  return list;
}

function optionsOf(list: HTMLElement): HTMLElement[] {
  return Array.from(list.querySelectorAll<HTMLElement>('[role="option"]'));
}

function activeLabel(list: HTMLElement): string | null {
  const id = list.getAttribute("aria-activedescendant");
  return id ? (document.getElementById(id)?.textContent ?? null) : null;
}

function press(element: HTMLElement, key: string, init: KeyboardEventInit = {}): KeyboardEvent {
  const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...init });
  element.dispatchEvent(event);
  return event;
}

function type(element: HTMLElement, text: string): void {
  for (const character of text) press(element, character);
}

function click(element: HTMLElement): void {
  element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
}

const FRUIT: Option[] = [
  { label: "Apple" },
  { label: "Apricot" },
  { label: "Banana" },
  { label: "Cherry" },
];

afterEach(() => {
  document.body.innerHTML = "";
});

describe("createListbox: ARIA wiring", () => {
  it("marks the container as a focusable listbox and the options as unselected", () => {
    const list = mount(FRUIT);
    createListbox({ element: list });

    expect(list.getAttribute("role")).toBe("listbox");
    expect(list.getAttribute("tabindex")).toBe("0");
    expect(optionsOf(list).map((o) => o.getAttribute("aria-selected"))).toEqual([
      "false",
      "false",
      "false",
      "false",
    ]);
    expect(list.hasAttribute("aria-activedescendant")).toBe(false);
  });

  it("generates ids for options that lack one, and keeps existing ids", () => {
    const list = mount([{ label: "Apple", id: "mine" }, { label: "Banana" }]);
    createListbox({ element: list });

    const [first, second] = optionsOf(list);
    expect(first.id).toBe("mine");
    expect(second.id).toMatch(/^mild-listbox-option-\d+$/);
  });

  it("starts active on the selected option", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list, value: "Banana" });

    expect(list.getAttribute("aria-activedescendant")).toBe(optionsOf(list)[2].id);
    expect(optionsOf(list)[2].getAttribute("aria-selected")).toBe("true");
    expect(listbox.getValue()).toBe("Banana");
    expect(listbox.getActiveValue()).toBe("Banana");
  });

  it("uses data-value when present, and text content otherwise", () => {
    const list = mount([{ label: "Apple", value: "apple-1" }, { label: "Banana" }]);
    const listbox = createListbox({ element: list });

    click(optionsOf(list)[0]);
    expect(listbox.getValue()).toBe("apple-1");

    click(optionsOf(list)[1]);
    expect(listbox.getValue()).toBe("Banana");
  });
});

describe("createListbox: arrow keys", () => {
  it("Arrow Down moves to the first option, then onwards", () => {
    const list = mount(FRUIT);
    const onChange = vi.fn();
    const listbox = createListbox({ element: list, onChange });

    press(list, "ArrowDown");
    expect(activeLabel(list)).toBe("Apple");
    expect(listbox.getValue()).toBe("Apple");
    expect(onChange).toHaveBeenNthCalledWith(1, "Apple");

    press(list, "ArrowDown");
    expect(activeLabel(list)).toBe("Apricot");
  });

  it("Arrow Up from nothing active starts at the last option", () => {
    const list = mount(FRUIT);
    createListbox({ element: list });

    press(list, "ArrowUp");

    expect(activeLabel(list)).toBe("Cherry");
  });

  it("does not wrap at either end", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list, value: "Apple" });

    press(list, "ArrowUp");
    expect(listbox.getActiveValue()).toBe("Apple");

    press(list, "End");
    press(list, "ArrowDown");
    expect(listbox.getActiveValue()).toBe("Cherry");
  });

  it("skips disabled options", () => {
    const list = mount([
      { label: "Apple" },
      { label: "Apricot", disabled: "aria" },
      { label: "Banana" },
    ]);
    const listbox = createListbox({ element: list, value: "Apple" });

    press(list, "ArrowDown");

    expect(listbox.getActiveValue()).toBe("Banana");
  });

  it("prevents the default scroll", () => {
    const list = mount(FRUIT);
    createListbox({ element: list });

    expect(press(list, "ArrowDown").defaultPrevented).toBe(true);
    expect(press(list, "ArrowUp").defaultPrevented).toBe(true);
  });
});

describe("createListbox: Home and End", () => {
  it("Home jumps to the first option and End to the last", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list });

    press(list, "End");
    expect(listbox.getActiveValue()).toBe("Cherry");
    expect(listbox.getValue()).toBe("Cherry");

    press(list, "Home");
    expect(listbox.getActiveValue()).toBe("Apple");
  });

  it("skips disabled options at the edges", () => {
    const list = mount([
      { label: "Apple", disabled: "attribute" },
      { label: "Banana" },
      { label: "Cherry", disabled: "aria" },
    ]);
    const listbox = createListbox({ element: list });

    press(list, "Home");
    expect(listbox.getActiveValue()).toBe("Banana");

    press(list, "End");
    expect(listbox.getActiveValue()).toBe("Banana");
  });

  it("does nothing when every option is disabled", () => {
    const list = mount([{ label: "Apple", disabled: "aria" }]);
    const listbox = createListbox({ element: list });

    press(list, "Home");
    press(list, "End");

    expect(listbox.getActiveValue()).toBeNull();
    expect(listbox.getValue()).toBeNull();
  });

  it("prevents the default page jump", () => {
    const list = mount(FRUIT);
    createListbox({ element: list });

    expect(press(list, "Home").defaultPrevented).toBe(true);
    expect(press(list, "End").defaultPrevented).toBe(true);
  });
});

describe("createListbox: typeahead", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("jumps to the first option starting with the typed character", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list });

    type(list, "b");

    expect(listbox.getActiveValue()).toBe("Banana");
  });

  it("matches a multi-character prefix typed quickly", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list });

    type(list, "ap");
    expect(listbox.getActiveValue()).toBe("Apple");

    type(list, "r");
    expect(listbox.getActiveValue()).toBe("Apricot");
  });

  it("is case insensitive", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list });

    type(list, "CH");

    expect(listbox.getActiveValue()).toBe("Cherry");
  });

  it("starts a new search once the timeout has passed", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list });

    type(list, "b");
    expect(listbox.getActiveValue()).toBe("Banana");

    vi.advanceTimersByTime(600);
    type(list, "c");
    expect(listbox.getActiveValue()).toBe("Cherry");
  });

  it("honours a custom typeahead timeout", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list, typeaheadTimeout: 2000 });

    type(list, "a");
    vi.advanceTimersByTime(600);
    // Still within the custom window, so this continues the previous search.
    type(list, "p");

    expect(listbox.getActiveValue()).toBe("Apple");
  });

  it("cycles through options starting with the same repeated character", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list });

    type(list, "a");
    expect(listbox.getActiveValue()).toBe("Apple");

    type(list, "a");
    expect(listbox.getActiveValue()).toBe("Apricot");

    // Wraps back to the first match.
    type(list, "a");
    expect(listbox.getActiveValue()).toBe("Apple");
  });

  it("leaves the active option alone when nothing matches", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list, value: "Banana" });

    type(list, "z");

    expect(listbox.getActiveValue()).toBe("Banana");
  });

  it("skips disabled options", () => {
    const list = mount([{ label: "Banana", disabled: "aria" }, { label: "Blueberry" }]);
    const listbox = createListbox({ element: list });

    type(list, "b");

    expect(listbox.getActiveValue()).toBe("Blueberry");
  });

  it("ignores characters typed with a modifier held, and non-printable keys", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list });

    press(list, "b", { ctrlKey: true });
    press(list, "b", { metaKey: true });
    press(list, "b", { altKey: true });
    const tab = press(list, "Tab");

    expect(listbox.getActiveValue()).toBeNull();
    expect(tab.defaultPrevented).toBe(false);
  });

  it("prevents the default so typing does not scroll the page", () => {
    const list = mount(FRUIT);
    createListbox({ element: list });

    expect(press(list, "b").defaultPrevented).toBe(true);
  });
});

describe("createListbox: Escape", () => {
  it("calls onEscape and prevents the default", () => {
    const list = mount(FRUIT);
    const onEscape = vi.fn();
    createListbox({ element: list, onEscape });

    const event = press(list, "Escape");

    expect(onEscape).toHaveBeenCalledTimes(1);
    expect(event.defaultPrevented).toBe(true);
  });

  it("works without an onEscape callback", () => {
    const list = mount(FRUIT);
    createListbox({ element: list });

    expect(() => press(list, "Escape")).not.toThrow();
  });

  it("clears the typeahead buffer, so the next character starts a fresh search", () => {
    vi.useFakeTimers();
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list });

    type(list, "a");
    expect(listbox.getActiveValue()).toBe("Apple");

    press(list, "Escape");
    // Without the Escape, typing "p" here would extend "a" into "ap".
    type(list, "p");

    expect(listbox.getActiveValue()).toBe("Apple");
    vi.useRealTimers();
  });

  it("leaves the selection untouched", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list, value: "Banana" });

    press(list, "Escape");

    expect(listbox.getValue()).toBe("Banana");
  });
});

describe("createListbox: selection", () => {
  it("selects the active option on Enter and Space when selection does not follow focus", () => {
    const list = mount(FRUIT);
    const onChange = vi.fn();
    const listbox = createListbox({ element: list, selectionFollowsFocus: false, onChange });

    press(list, "ArrowDown");
    expect(listbox.getActiveValue()).toBe("Apple");
    expect(listbox.getValue()).toBeNull();
    expect(onChange).not.toHaveBeenCalled();

    const enter = press(list, "Enter");
    expect(listbox.getValue()).toBe("Apple");
    expect(enter.defaultPrevented).toBe(true);

    press(list, "ArrowDown");
    press(list, " ");
    expect(listbox.getValue()).toBe("Apricot");
    expect(onChange).toHaveBeenLastCalledWith("Apricot");
  });

  it("does nothing on Enter when no option is active", () => {
    const list = mount(FRUIT);
    const onChange = vi.fn();
    const listbox = createListbox({ element: list });

    press(list, "Enter");

    expect(listbox.getValue()).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("works without an onChange callback", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list });

    expect(() => press(list, "ArrowDown")).not.toThrow();
    expect(listbox.getValue()).toBe("Apple");
  });
});

describe("createListbox: onActiveChange", () => {
  it("reports the active option as it moves, before any selection callback", () => {
    const list = mount(FRUIT);
    const calls: string[] = [];
    createListbox({
      element: list,
      selectionFollowsFocus: false,
      onActiveChange: (value) => calls.push(`active:${value}`),
      onChange: (value) => calls.push(`change:${value}`),
    });

    press(list, "ArrowDown");
    press(list, "End");
    press(list, "Enter");

    expect(calls).toEqual(["active:Apple", "active:Cherry", "change:Cherry"]);
  });

  it("does not fire when a move is a no-op at the edge", () => {
    const list = mount(FRUIT);
    const onActiveChange = vi.fn();
    createListbox({ element: list, value: "Apple", onActiveChange });

    press(list, "ArrowUp");

    expect(onActiveChange).not.toHaveBeenCalled();
  });
});

describe("createListbox: pointer", () => {
  it("selects a clicked option", () => {
    const list = mount(FRUIT);
    const onChange = vi.fn();
    const listbox = createListbox({ element: list, onChange });

    click(optionsOf(list)[2]);

    expect(listbox.getValue()).toBe("Banana");
    expect(listbox.getActiveValue()).toBe("Banana");
    expect(onChange).toHaveBeenCalledWith("Banana");
  });

  it("selects the option when a child element inside it is clicked", () => {
    const list = mount(FRUIT);
    const inner = document.createElement("span");
    optionsOf(list)[1].append(inner);
    const listbox = createListbox({ element: list });

    click(inner);

    expect(listbox.getValue()).toBe("Apricot");
  });

  it("ignores clicks on disabled options and outside any option", () => {
    const list = mount([{ label: "Apple", disabled: "attribute" }, { label: "Banana" }]);
    const listbox = createListbox({ element: list });

    click(optionsOf(list)[0]);
    click(list);

    expect(listbox.getValue()).toBeNull();
  });
});

describe("createListbox: imperative API", () => {
  it("setValue selects without calling onChange", () => {
    const list = mount(FRUIT);
    const onChange = vi.fn();
    const listbox = createListbox({ element: list, onChange });

    listbox.setValue("Cherry");

    expect(listbox.getValue()).toBe("Cherry");
    expect(optionsOf(list)[3].getAttribute("aria-selected")).toBe("true");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("setValue(null) clears the selection", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list, value: "Apple" });

    listbox.setValue(null);

    expect(listbox.getValue()).toBeNull();
    expect(optionsOf(list).every((o) => o.getAttribute("aria-selected") === "false")).toBe(true);
  });

  it("refresh picks up options added after creation", () => {
    const list = mount([{ label: "Apple" }]);
    const listbox = createListbox({ element: list });

    const added = document.createElement("li");
    added.setAttribute("role", "option");
    added.textContent = "Banana";
    list.append(added);
    listbox.refresh();

    press(list, "End");

    expect(listbox.getActiveValue()).toBe("Banana");
  });

  it("refresh keeps the active option when it is still present", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list, value: "Apple", selectionFollowsFocus: false });

    press(list, "ArrowDown");
    expect(listbox.getActiveValue()).toBe("Apricot");

    listbox.refresh();

    expect(listbox.getActiveValue()).toBe("Apricot");
  });

  it("refresh falls back to the selected option when the active one was removed", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list, value: "Apple", selectionFollowsFocus: false });

    press(list, "ArrowDown");
    optionsOf(list)[1].remove();
    listbox.refresh();

    expect(listbox.getActiveValue()).toBe("Apple");
  });

  it("destroy stops responding to events", () => {
    const list = mount(FRUIT);
    const listbox = createListbox({ element: list });

    listbox.destroy();
    press(list, "ArrowDown");
    click(optionsOf(list)[0]);

    expect(listbox.getValue()).toBeNull();
    expect(listbox.getActiveValue()).toBeNull();
  });
});
