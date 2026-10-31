import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createToastTimer } from "./toast";

function mount(): { toast: HTMLDivElement; close: HTMLButtonElement } {
  const toast = document.createElement("div");
  const close = document.createElement("button");
  close.textContent = "Close";
  toast.append(close);
  document.body.append(toast);
  return { toast, close };
}

function mouse(element: HTMLElement, type: "mouseenter" | "mouseleave"): void {
  element.dispatchEvent(new MouseEvent(type, { bubbles: false }));
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("createToastTimer: countdown", () => {
  it("expires once after the duration", () => {
    const { toast } = mount();
    const onExpire = vi.fn();
    const timer = createToastTimer({ element: toast, duration: 1000, onExpire });

    expect(timer.isRunning()).toBe(true);
    vi.advanceTimersByTime(999);
    expect(onExpire).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(onExpire).toHaveBeenCalledTimes(1);
    expect(timer.isRunning()).toBe(false);
    expect(timer.getRemaining()).toBe(0);

    vi.advanceTimersByTime(5000);
    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  it("reports the remaining time while running", () => {
    const { toast } = mount();
    const timer = createToastTimer({ element: toast, duration: 1000 });

    vi.advanceTimersByTime(300);
    expect(timer.getRemaining()).toBe(700);
  });

  it.each([null, Infinity])("never expires with duration %s", (duration) => {
    const { toast } = mount();
    const onExpire = vi.fn();
    const timer = createToastTimer({ element: toast, duration, onExpire });

    expect(timer.isRunning()).toBe(false);
    expect(timer.getRemaining()).toBeNull();
    vi.advanceTimersByTime(60_000);
    expect(onExpire).not.toHaveBeenCalled();
    timer.pause();
    timer.resume();
    expect(timer.isRunning()).toBe(false);
  });
});

describe("createToastTimer: pause on hover", () => {
  it("pauses while the pointer is over the toast and resumes with the remaining time", () => {
    const { toast } = mount();
    const onExpire = vi.fn();
    const timer = createToastTimer({ element: toast, duration: 1000, onExpire });

    vi.advanceTimersByTime(400);
    mouse(toast, "mouseenter");
    expect(timer.isRunning()).toBe(false);
    expect(timer.getRemaining()).toBe(600);

    vi.advanceTimersByTime(10_000);
    expect(onExpire).not.toHaveBeenCalled();

    mouse(toast, "mouseleave");
    expect(timer.isRunning()).toBe(true);
    vi.advanceTimersByTime(599);
    expect(onExpire).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(onExpire).toHaveBeenCalledTimes(1);
  });
});

describe("createToastTimer: pause on focus", () => {
  it("pauses while something inside has focus and resumes when focus leaves", () => {
    const { toast, close } = mount();
    const onExpire = vi.fn();
    const timer = createToastTimer({ element: toast, duration: 1000, onExpire });

    close.focus();
    expect(timer.isRunning()).toBe(false);
    vi.advanceTimersByTime(10_000);
    expect(onExpire).not.toHaveBeenCalled();

    close.blur();
    expect(timer.isRunning()).toBe(true);
    vi.advanceTimersByTime(1000);
    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  it("stays paused while focus moves between elements inside the toast", () => {
    const { toast, close } = mount();
    const action = document.createElement("button");
    toast.append(action);
    const timer = createToastTimer({ element: toast, duration: 1000 });

    close.focus();
    action.focus();
    expect(timer.isRunning()).toBe(false);

    action.blur();
    expect(timer.isRunning()).toBe(true);
  });

  it("stays paused while hovered even after focus leaves, and vice versa", () => {
    const { toast, close } = mount();
    const timer = createToastTimer({ element: toast, duration: 1000 });

    mouse(toast, "mouseenter");
    close.focus();
    close.blur();
    expect(timer.isRunning()).toBe(false);
    mouse(toast, "mouseleave");
    expect(timer.isRunning()).toBe(true);

    close.focus();
    mouse(toast, "mouseenter");
    mouse(toast, "mouseleave");
    expect(timer.isRunning()).toBe(false);
    close.blur();
    expect(timer.isRunning()).toBe(true);
  });

  it("starts paused when focus is already inside the toast", () => {
    const { toast, close } = mount();
    close.focus();
    const timer = createToastTimer({ element: toast, duration: 1000 });

    expect(timer.isRunning()).toBe(false);
    close.blur();
    expect(timer.isRunning()).toBe(true);
  });
});

describe("createToastTimer: imperative API", () => {
  it("pause and resume can be driven by the caller", () => {
    const { toast } = mount();
    const onExpire = vi.fn();
    const timer = createToastTimer({ element: toast, duration: 1000, onExpire });

    timer.pause();
    timer.pause();
    expect(timer.isRunning()).toBe(false);
    vi.advanceTimersByTime(5000);
    timer.resume();
    timer.resume();
    vi.advanceTimersByTime(1000);
    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  it("destroy cancels the countdown and stops listening", () => {
    const { toast, close } = mount();
    const onExpire = vi.fn();
    const timer = createToastTimer({ element: toast, duration: 1000, onExpire });

    timer.destroy();
    vi.advanceTimersByTime(5000);
    expect(onExpire).not.toHaveBeenCalled();
    timer.resume();
    expect(timer.isRunning()).toBe(false);

    mouse(toast, "mouseenter");
    mouse(toast, "mouseleave");
    close.focus();
    close.blur();
    vi.advanceTimersByTime(5000);
    expect(onExpire).not.toHaveBeenCalled();
  });
});
