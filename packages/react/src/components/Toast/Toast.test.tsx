import * as React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Toast, ToastProvider, useToast, type ToastContextValue } from "./Toast";
import type { ToastOptions } from "../../types";

/** Exposes the toast API to the test. */
let api: ToastContextValue;
function Capture() {
  api = useToast();
  return null;
}

function renderProvider(props: React.ComponentProps<typeof ToastProvider> = {}) {
  return render(
    <ToastProvider {...props}>
      <Capture />
      <button type="button">Page button</button>
    </ToastProvider>,
  );
}

const show = (options: ToastOptions) => {
  let id = "";
  act(() => {
    id = api.toast(options);
  });
  return id;
};

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("Toast (WAI-ARIA alert / live region guidance)", () => {
  it("renders toasts in a named region; status toasts are polite, errors are alerts", () => {
    renderProvider();
    show({ title: "Saved", description: "Your changes are safe.", status: "success" });
    show({ title: "Failed", status: "error" });

    const region = screen.getByRole("region", { name: "Notifications" });
    expect(region).toHaveClass("mild-toast-region", "mild-toast-region--bottom-right");
    expect(region.parentElement).toBe(document.body);

    const saved = within(region).getByRole("status");
    expect(saved).toHaveClass("mild-toast", "mild-toast--success");
    expect(within(saved).getByText("Saved")).toHaveClass("mild-toast__title");
    expect(within(saved).getByText("Your changes are safe.")).toHaveClass(
      "mild-toast__description",
    );
    expect(within(region).getByRole("alert")).toHaveClass("mild-toast--error");
  });

  it("stacks at least three toasts at once, oldest first, and returns their ids", () => {
    renderProvider();
    const ids = [show({ title: "First" }), show({ title: "Second" }), show({ title: "Third" })];
    expect(new Set(ids).size).toBe(3);

    const toasts = screen.getAllByRole("status");
    expect(toasts).toHaveLength(3);
    expect(toasts.map((toast) => toast.textContent)).toEqual([
      expect.stringContaining("First"),
      expect.stringContaining("Second"),
      expect.stringContaining("Third"),
    ]);
    expect(api.toasts.map((toast) => toast.id)).toEqual(ids);
  });

  it("drops the oldest toast beyond `max`, per placement", () => {
    renderProvider({ max: 3 });
    show({ title: "One" });
    show({ title: "Two" });
    show({ title: "Three" });
    show({ title: "Four" });
    show({ title: "Elsewhere", placement: "top" });

    const main = document.querySelector(".mild-toast-region--bottom-right") as HTMLElement;
    expect(within(main).getAllByRole("status")).toHaveLength(3);
    expect(within(main).queryByText("One")).toBeNull();
    expect(within(main).getByText("Four")).toBeInTheDocument();
    expect(screen.getAllByRole("region")).toHaveLength(2);
    expect(document.querySelector(".mild-toast-region--top")).toHaveTextContent("Elsewhere");
  });

  it("auto-dismisses after the duration and calls onClose", () => {
    const onClose = vi.fn();
    renderProvider({ duration: 1000 });
    show({ title: "Bye", onClose });

    act(() => vi.advanceTimersByTime(999));
    expect(screen.getByRole("status")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByRole("status")).toBeNull();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("pauses the auto-dismiss while hovered and resumes with the remaining time", () => {
    renderProvider({ duration: 1000 });
    show({ title: "Hover me" });
    const toast = screen.getByRole("status");

    act(() => vi.advanceTimersByTime(600));
    fireEvent.mouseEnter(toast);
    act(() => vi.advanceTimersByTime(10_000));
    expect(screen.getByRole("status")).toBeInTheDocument();

    fireEvent.mouseLeave(toast);
    act(() => vi.advanceTimersByTime(399));
    expect(screen.getByRole("status")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("pauses the auto-dismiss while the close button has keyboard focus", () => {
    renderProvider({ duration: 1000 });
    show({ title: "Focus me" });
    const close = screen.getByRole("button", { name: "Close" });

    act(() => close.focus());
    expect(close).toHaveFocus();
    act(() => vi.advanceTimersByTime(10_000));
    expect(screen.getByRole("status")).toBeInTheDocument();

    act(() => screen.getByRole("button", { name: "Page button" }).focus());
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("has a keyboard-reachable close button that dismisses the toast", () => {
    const onClose = vi.fn();
    renderProvider({ duration: null });
    show({ title: "Close me", onClose });
    const close = screen.getByRole("button", { name: "Close" });

    // A real button: in the tab order, with an accessible name.
    expect(close.tagName).toBe("BUTTON");
    expect(close).not.toHaveAttribute("tabindex", "-1");
    expect(close).toHaveClass("mild-close-button", "mild-toast__close");
    act(() => close.focus());
    expect(close).toHaveFocus();

    // Enter on a focused button is a click.
    fireEvent.click(close);
    expect(screen.queryByRole("status")).toBeNull();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("persistent toasts (duration null) stay until closed", () => {
    renderProvider();
    show({ title: "Stay", duration: null });
    act(() => vi.advanceTimersByTime(60_000));
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("update, dismiss and dismissAll drive the queue; closable=false hides the close button", () => {
    renderProvider({ duration: null });
    const id = show({ title: "Uploading", closable: false });
    show({ title: "Other" });
    expect(screen.getAllByRole("button", { name: "Close" })).toHaveLength(1);

    act(() => api.update(id, { title: "Uploaded", status: "success" }));
    expect(screen.getByText("Uploaded").closest(".mild-toast")).toHaveClass("mild-toast--success");

    act(() => api.dismiss(id));
    expect(screen.queryByText("Uploaded")).toBeNull();
    expect(screen.getByText("Other")).toBeInTheDocument();

    act(() => api.dismissAll());
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByRole("region")).toBeNull();
  });

  it("re-using an id replaces that toast instead of stacking another", () => {
    renderProvider({ duration: null });
    show({ id: "progress", title: "Step 1" });
    show({ id: "progress", title: "Step 2" });
    expect(screen.getAllByRole("status")).toHaveLength(1);
    expect(screen.getByText("Step 2")).toBeInTheDocument();
  });

  it("renders an action and a custom icon", () => {
    renderProvider({ duration: null });
    show({
      title: "Deleted",
      action: <button type="button">Undo</button>,
      icon: <svg data-testid="custom-icon" />,
    });
    expect(
      screen.getByRole("button", { name: "Undo" }).closest(".mild-toast__action"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("custom-icon").closest(".mild-toast__icon")).toBeInTheDocument();
  });

  it("useToast throws a helpful error outside the provider", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Capture />)).toThrow("useToast() must be used inside <ToastProvider>");
    error.mockRestore();
  });
});

describe("Toast (standalone)", () => {
  it("renders without a provider and forwards its ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    const onClose = vi.fn();
    render(
      <Toast ref={ref} title="Plain" description="No provider" duration={null} onClose={onClose} />,
    );
    const toast = screen.getByRole("status");
    expect(ref.current).toBe(toast);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
