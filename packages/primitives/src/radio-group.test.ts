import { afterEach, describe, expect, it, vi } from "vitest";
import { createRadioGroup } from "./radio-group";

interface Radio {
  value?: string;
  text?: string;
  disabled?: "attribute" | "aria";
}

function mount(radios: Radio[]): HTMLElement {
  const group = document.createElement("div");
  for (const { value, text, disabled } of radios) {
    const radio = document.createElement("div");
    radio.setAttribute("role", "radio");
    if (value !== undefined) radio.setAttribute("data-value", value);
    radio.textContent = text ?? value ?? "";
    if (disabled === "attribute") radio.setAttribute("disabled", "");
    if (disabled === "aria") radio.setAttribute("aria-disabled", "true");
    group.append(radio);
  }
  document.body.append(group);
  return group;
}

function radiosOf(group: HTMLElement): HTMLElement[] {
  return Array.from(group.querySelectorAll<HTMLElement>('[role="radio"]'));
}

function tabIndexes(group: HTMLElement): string[] {
  return radiosOf(group).map((radio) => radio.getAttribute("tabindex") ?? "");
}

function checkedStates(group: HTMLElement): string[] {
  return radiosOf(group).map((radio) => radio.getAttribute("aria-checked") ?? "");
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

describe("createRadioGroup: ARIA wiring", () => {
  it("marks the container as a radiogroup and the radios as unchecked", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    createRadioGroup({ element: group });

    expect(group.getAttribute("role")).toBe("radiogroup");
    expect(checkedStates(group)).toEqual(["false", "false"]);
  });

  it("checks the radio matching the initial value", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    const radioGroup = createRadioGroup({ element: group, value: "b" });

    expect(checkedStates(group)).toEqual(["false", "true"]);
    expect(radioGroup.getValue()).toBe("b");
  });

  it("falls back to the radio's text content when it has no data-value", () => {
    const group = mount([{ text: "  Email  " }, { text: "Phone" }]);
    const radioGroup = createRadioGroup({ element: group });

    click(radiosOf(group)[0]);

    expect(radioGroup.getValue()).toBe("Email");
  });
});

describe("createRadioGroup: roving tabindex", () => {
  it("makes the first enabled radio the only tab stop when nothing is checked", () => {
    const group = mount([{ value: "a" }, { value: "b" }, { value: "c" }]);
    createRadioGroup({ element: group });

    expect(tabIndexes(group)).toEqual(["0", "-1", "-1"]);
  });

  it("skips a disabled first radio when choosing the tab stop", () => {
    const group = mount([{ value: "a", disabled: "attribute" }, { value: "b" }, { value: "c" }]);
    createRadioGroup({ element: group });

    expect(tabIndexes(group)).toEqual(["-1", "0", "-1"]);
  });

  it("moves the tab stop to the checked radio", () => {
    const group = mount([{ value: "a" }, { value: "b" }, { value: "c" }]);
    createRadioGroup({ element: group, value: "c" });

    expect(tabIndexes(group)).toEqual(["-1", "-1", "0"]);
  });

  it("keeps every radio out of the tab order when they are all disabled", () => {
    const group = mount([
      { value: "a", disabled: "attribute" },
      { value: "b", disabled: "aria" },
    ]);
    createRadioGroup({ element: group });

    expect(tabIndexes(group)).toEqual(["-1", "-1"]);
  });

  it("ignores a checked-but-disabled radio when choosing the tab stop", () => {
    const group = mount([{ value: "a" }, { value: "b", disabled: "aria" }]);
    createRadioGroup({ element: group, value: "b" });

    // Still reported as checked, but the tab stop falls back to the first enabled radio.
    expect(checkedStates(group)).toEqual(["false", "true"]);
    expect(tabIndexes(group)).toEqual(["0", "-1"]);
  });
});

describe("createRadioGroup: keyboard", () => {
  it("Arrow Down/Right moves to the next radio, checking as it goes", () => {
    const group = mount([{ value: "a" }, { value: "b" }, { value: "c" }]);
    const onChange = vi.fn();
    const radioGroup = createRadioGroup({ element: group, onChange });

    radiosOf(group)[0].focus();
    press(group, "ArrowDown");

    expect(radioGroup.getValue()).toBe("b");
    expect(document.activeElement).toBe(radiosOf(group)[1]);
    expect(tabIndexes(group)).toEqual(["-1", "0", "-1"]);
    expect(onChange).toHaveBeenNthCalledWith(1, "b");

    press(group, "ArrowRight");
    expect(radioGroup.getValue()).toBe("c");
    expect(onChange).toHaveBeenNthCalledWith(2, "c");
  });

  it("Arrow Up/Left moves to the previous radio", () => {
    const group = mount([{ value: "a" }, { value: "b" }, { value: "c" }]);
    const radioGroup = createRadioGroup({ element: group, value: "c" });

    radiosOf(group)[2].focus();
    press(group, "ArrowUp");
    expect(radioGroup.getValue()).toBe("b");

    press(group, "ArrowLeft");
    expect(radioGroup.getValue()).toBe("a");
  });

  it("wraps around at both ends", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    const radioGroup = createRadioGroup({ element: group, value: "b" });

    radiosOf(group)[1].focus();
    press(group, "ArrowDown");
    expect(radioGroup.getValue()).toBe("a");

    press(group, "ArrowUp");
    expect(radioGroup.getValue()).toBe("b");
  });

  it("skips disabled radios while moving", () => {
    const group = mount([{ value: "a" }, { value: "b", disabled: "aria" }, { value: "c" }]);
    const radioGroup = createRadioGroup({ element: group });

    radiosOf(group)[0].focus();
    press(group, "ArrowDown");

    expect(radioGroup.getValue()).toBe("c");
  });

  it("starts from the first radio when focus is not on one yet", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    const radioGroup = createRadioGroup({ element: group });

    group.focus();
    press(group, "ArrowDown");

    expect(radioGroup.getValue()).toBe("a");
  });

  it("does nothing when every radio is disabled", () => {
    const group = mount([{ value: "a", disabled: "aria" }]);
    const onChange = vi.fn();
    const radioGroup = createRadioGroup({ element: group, onChange });

    press(group, "ArrowDown");

    expect(radioGroup.getValue()).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("Space checks the focused radio without moving focus", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    const radioGroup = createRadioGroup({ element: group });

    radiosOf(group)[1].focus();
    const event = press(group, " ");

    expect(radioGroup.getValue()).toBe("b");
    expect(document.activeElement).toBe(radiosOf(group)[1]);
    expect(event.defaultPrevented).toBe(true);
  });

  it("ignores Space when focus is not on a radio", () => {
    const group = mount([{ value: "a" }]);
    const radioGroup = createRadioGroup({ element: group });

    group.focus();
    const event = press(group, " ");

    expect(radioGroup.getValue()).toBeNull();
    expect(event.defaultPrevented).toBe(false);
  });

  it("ignores unrelated keys", () => {
    const group = mount([{ value: "a" }]);
    const radioGroup = createRadioGroup({ element: group });

    const event = press(group, "x");

    expect(radioGroup.getValue()).toBeNull();
    expect(event.defaultPrevented).toBe(false);
  });

  it("prevents the default scroll on arrow keys", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    createRadioGroup({ element: group });

    expect(press(group, "ArrowDown").defaultPrevented).toBe(true);
    expect(press(group, "ArrowUp").defaultPrevented).toBe(true);
  });
});

describe("createRadioGroup: pointer", () => {
  it("checks a clicked radio", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    const onChange = vi.fn();
    const radioGroup = createRadioGroup({ element: group, onChange });

    click(radiosOf(group)[1]);

    expect(radioGroup.getValue()).toBe("b");
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("checks the radio when a child element inside it is clicked", () => {
    const group = mount([{ value: "a" }]);
    const inner = document.createElement("span");
    radiosOf(group)[0].append(inner);
    const radioGroup = createRadioGroup({ element: group });

    click(inner);

    expect(radioGroup.getValue()).toBe("a");
  });

  it("ignores clicks on a disabled radio", () => {
    const group = mount([{ value: "a", disabled: "attribute" }]);
    const onChange = vi.fn();
    const radioGroup = createRadioGroup({ element: group, onChange });

    click(radiosOf(group)[0]);

    expect(radioGroup.getValue()).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("ignores clicks outside any radio", () => {
    const group = mount([{ value: "a" }]);
    const radioGroup = createRadioGroup({ element: group });

    click(group);

    expect(radioGroup.getValue()).toBeNull();
  });
});

describe("createRadioGroup: imperative API", () => {
  it("setValue checks a radio without calling onChange", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    const onChange = vi.fn();
    const radioGroup = createRadioGroup({ element: group, onChange });

    radioGroup.setValue("b");

    expect(checkedStates(group)).toEqual(["false", "true"]);
    expect(tabIndexes(group)).toEqual(["-1", "0"]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("setValue(null) clears the selection and resets the tab stop", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    const radioGroup = createRadioGroup({ element: group, value: "b" });

    radioGroup.setValue(null);

    expect(radioGroup.getValue()).toBeNull();
    expect(checkedStates(group)).toEqual(["false", "false"]);
    expect(tabIndexes(group)).toEqual(["0", "-1"]);
  });

  it("refresh picks up radios added after creation", () => {
    const group = mount([{ value: "a" }]);
    const radioGroup = createRadioGroup({ element: group });

    const added = document.createElement("div");
    added.setAttribute("role", "radio");
    added.setAttribute("data-value", "b");
    group.append(added);
    radioGroup.refresh();

    click(added);

    expect(radioGroup.getValue()).toBe("b");
    expect(tabIndexes(group)).toEqual(["-1", "0"]);
  });

  it("destroy stops responding to events", () => {
    const group = mount([{ value: "a" }, { value: "b" }]);
    const radioGroup = createRadioGroup({ element: group });

    radioGroup.destroy();
    click(radiosOf(group)[1]);
    press(group, "ArrowDown");

    expect(radioGroup.getValue()).toBeNull();
  });
});
