import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTooltip } from "./tooltip";

function mount(): { trigger: HTMLButtonElement; tooltip: HTMLDivElement } {
  const trigger = document.createElement("button");
  trigger.textContent = "Save";
  const tooltip = document.createElement("div");
  tooltip.textContent = "Save your changes";
  document.body.append(trigger, tooltip);
  return { trigger, tooltip };
}

function mouse(element: HTMLElement, type: "mouseenter" | "mouseleave"): void {
  element.dispatchEvent(new MouseEvent(type));
}

function press(key: string): KeyboardEvent {
  const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
  document.dispatchEvent(event);
  return event;
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("createTooltip: ARIA wiring", () => {
  it("gives the tooltip a role and an id, and describes the trigger with it", () => {
    const { trigger, tooltip } = mount();
    createTooltip({ trigger, tooltip });

    expect(tooltip.getAttribute("role")).toBe("tooltip");
    expect(tooltip.id).toMatch(/^mild-tooltip-\d+$/);
    expect(trigger.getAttribute("aria-describedby")).toBe(tooltip.id);
  });

  it("keeps an existing id and appends to an existing aria-describedby", () => {
    const { trigger, tooltip } = mount();
    tooltip.id = "tip";
    trigger.setAttribute("aria-describedby", "hint");
    createTooltip({ trigger, tooltip });

    expect(tooltip.id).toBe("tip");
    expect(trigger.getAttribute("aria-describedby")).toBe("hint tip");
  });

  it("does not add the id twice", () => {
    const { trigger, tooltip } = mount();
    tooltip.id = "tip";
    trigger.setAttribute("aria-describedby", "tip");
    createTooltip({ trigger, tooltip });

    expect(trigger.getAttribute("aria-describedby")).toBe("tip");
  });
});

describe("createTooltip: hover", () => {
  it("shows after the open delay and hides after the close delay", () => {
    const { trigger, tooltip } = mount();
    const onOpenChange = vi.fn();
    const instance = createTooltip({
      trigger,
      tooltip,
      openDelay: 300,
      closeDelay: 100,
      onOpenChange,
    });

    mouse(trigger, "mouseenter");
    expect(instance.isOpen()).toBe(false);
    vi.advanceTimersByTime(299);
    expect(onOpenChange).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(instance.isOpen()).toBe(true);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);

    mouse(trigger, "mouseleave");
    expect(instance.isOpen()).toBe(true);
    vi.advanceTimersByTime(100);
    expect(instance.isOpen()).toBe(false);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("does not show when the pointer leaves before the delay", () => {
    const { trigger, tooltip } = mount();
    const onOpenChange = vi.fn();
    createTooltip({ trigger, tooltip, onOpenChange });

    mouse(trigger, "mouseenter");
    vi.advanceTimersByTime(100);
    mouse(trigger, "mouseleave");
    vi.advanceTimersByTime(1000);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("stays open while the pointer moves onto the tooltip", () => {
    const { trigger, tooltip } = mount();
    const instance = createTooltip({ trigger, tooltip, openDelay: 0, closeDelay: 100 });

    mouse(trigger, "mouseenter");
    expect(instance.isOpen()).toBe(true);
    mouse(trigger, "mouseleave");
    mouse(tooltip, "mouseenter");
    vi.advanceTimersByTime(1000);
    expect(instance.isOpen()).toBe(true);

    mouse(tooltip, "mouseleave");
    vi.advanceTimersByTime(100);
    expect(instance.isOpen()).toBe(false);
  });

  it("shows immediately with a zero delay", () => {
    const { trigger, tooltip } = mount();
    const instance = createTooltip({ trigger, tooltip, openDelay: 0, closeDelay: 0 });

    mouse(trigger, "mouseenter");
    expect(instance.isOpen()).toBe(true);
    mouse(trigger, "mouseleave");
    expect(instance.isOpen()).toBe(false);
  });
});

describe("createTooltip: keyboard", () => {
  it("shows on focus without delay and hides on blur", () => {
    const { trigger, tooltip } = mount();
    const onOpenChange = vi.fn();
    const instance = createTooltip({ trigger, tooltip, onOpenChange });

    trigger.focus();
    expect(instance.isOpen()).toBe(true);
    expect(onOpenChange).toHaveBeenCalledWith(true);

    trigger.blur();
    expect(instance.isOpen()).toBe(false);
  });

  it("hides on Escape while open, and ignores Escape while closed", () => {
    const { trigger, tooltip } = mount();
    const instance = createTooltip({ trigger, tooltip });

    expect(press("Escape").defaultPrevented).toBe(false);
    trigger.focus();
    expect(press("Escape").defaultPrevented).toBe(true);
    expect(instance.isOpen()).toBe(false);
    expect(press("Enter").defaultPrevented).toBe(false);
  });

  it("does not report a change when focus follows a hover that already opened it", () => {
    const { trigger, tooltip } = mount();
    const onOpenChange = vi.fn();
    createTooltip({ trigger, tooltip, openDelay: 0, onOpenChange });

    mouse(trigger, "mouseenter");
    trigger.focus();
    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });
});

describe("createTooltip: imperative API", () => {
  it("setOpen syncs the state without calling onOpenChange and cancels pending timers", () => {
    const { trigger, tooltip } = mount();
    const onOpenChange = vi.fn();
    const instance = createTooltip({ trigger, tooltip, onOpenChange });

    mouse(trigger, "mouseenter");
    instance.setOpen(false);
    vi.advanceTimersByTime(1000);
    expect(instance.isOpen()).toBe(false);
    expect(onOpenChange).not.toHaveBeenCalled();

    instance.setOpen(true);
    expect(instance.isOpen()).toBe(true);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("destroy stops listening and cancels a pending show", () => {
    const { trigger, tooltip } = mount();
    const onOpenChange = vi.fn();
    const instance = createTooltip({ trigger, tooltip });
    const tracked = createTooltip({ trigger, tooltip, onOpenChange });
    instance.destroy();

    mouse(trigger, "mouseenter");
    tracked.destroy();
    vi.advanceTimersByTime(1000);
    trigger.focus();
    mouse(tooltip, "mouseenter");
    press("Escape");
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(trigger.getAttribute("aria-describedby")).toBe(tooltip.id);
  });
});
