import { defineComponent, h, nextTick } from "vue";
import { render, screen, within } from "@testing-library/vue";
// The synchronous DOM Testing Library events: the Vue wrapper's async `fireEvent` awaits
// `waitFor`, which under vitest fake timers mixes real and fake timers and cancels the
// component's own countdown.
import { fireEvent as dtl } from "@testing-library/dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { toastCases } from "@mild-ui/test-cases/toast";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Toast, ToastProvider, ToastRegion, useToast, type ToastContextValue } from "./index";
import type { ToastOptions } from "../../types/toast";

runComponentCases(toastCases, (c) => h(Toast, caseProps(c), () => c.children));

/** Exposes the toast API to the test. */
let api: ToastContextValue;
const Capture = defineComponent({
  setup() {
    api = useToast();
    return () => null;
  },
});

function renderProvider(props: Record<string, unknown> = {}) {
  return render(
    defineComponent({
      setup: () => () =>
        h(ToastProvider, props, () => [h(Capture), h("button", { type: "button" }, "Page button")]),
    }),
  );
}

const show = async (options: ToastOptions) => {
  const id = api.toast(options);
  await nextTick();
  return id;
};

const tick = async (ms: number) => {
  vi.advanceTimersByTime(ms);
  await nextTick();
};

// Fake timers per describe, not per file: the axe run at the bottom needs real ones.
const useFakeTimers = () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
};

describe("Toast (WAI-ARIA alert / live region guidance)", () => {
  useFakeTimers();

  it("renders toasts in a named region; status toasts are polite, errors are alerts", async () => {
    renderProvider();
    await show({ title: "Saved", description: "Your changes are safe.", status: "success" });
    await show({ title: "Failed", status: "error" });

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

  it("stacks at least three toasts at once, oldest first, and returns their ids", async () => {
    renderProvider();
    const ids = [
      await show({ title: "First" }),
      await show({ title: "Second" }),
      await show({ title: "Third" }),
    ];
    expect(new Set(ids).size).toBe(3);

    const toasts = screen.getAllByRole("status");
    expect(toasts).toHaveLength(3);
    expect(toasts.map((toast) => toast.textContent)).toEqual([
      expect.stringContaining("First"),
      expect.stringContaining("Second"),
      expect.stringContaining("Third"),
    ]);
    expect(api.toasts.value.map((toast) => toast.id)).toEqual(ids);
  });

  it("drops the oldest toast beyond `max`, per placement", async () => {
    renderProvider({ max: 3 });
    await show({ title: "One" });
    await show({ title: "Two" });
    await show({ title: "Three" });
    await show({ title: "Four" });
    await show({ title: "Elsewhere", placement: "top" });

    const main = document.querySelector(".mild-toast-region--bottom-right") as HTMLElement;
    expect(within(main).getAllByRole("status")).toHaveLength(3);
    expect(within(main).queryByText("One")).toBeNull();
    expect(within(main).getByText("Four")).toBeInTheDocument();
    expect(screen.getAllByRole("region")).toHaveLength(2);
    expect(document.querySelector(".mild-toast-region--top")).toHaveTextContent("Elsewhere");
  });

  it("auto-dismisses after the duration and calls onClose", async () => {
    const onClose = vi.fn();
    renderProvider({ duration: 1000 });
    await show({ title: "Bye", onClose });

    await tick(999);
    expect(screen.getByRole("status")).toBeInTheDocument();
    await tick(1);
    expect(screen.queryByRole("status")).toBeNull();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("pauses the auto-dismiss while hovered and resumes with the remaining time", async () => {
    renderProvider({ duration: 1000 });
    await show({ title: "Hover me" });
    const toast = screen.getByRole("status");

    await tick(600);
    dtl.mouseEnter(toast);
    await nextTick();
    await tick(10_000);
    expect(screen.getByRole("status")).toBeInTheDocument();

    dtl.mouseLeave(toast);
    await nextTick();
    await tick(399);
    expect(screen.getByRole("status")).toBeInTheDocument();
    await tick(1);
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("pauses the auto-dismiss while the close button has keyboard focus", async () => {
    renderProvider({ duration: 1000 });
    await show({ title: "Focus me" });
    const close = screen.getByRole("button", { name: "Close" });

    close.focus();
    expect(close).toHaveFocus();
    await tick(10_000);
    expect(screen.getByRole("status")).toBeInTheDocument();

    screen.getByRole("button", { name: "Page button" }).focus();
    await tick(1000);
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("has a keyboard-reachable close button that dismisses the toast", async () => {
    const onClose = vi.fn();
    renderProvider({ duration: null });
    await show({ title: "Close me", onClose });
    const close = screen.getByRole("button", { name: "Close" });

    // A real button: in the tab order, with an accessible name.
    expect(close.tagName).toBe("BUTTON");
    expect(close).not.toHaveAttribute("tabindex", "-1");
    expect(close).toHaveClass("mild-close-button", "mild-toast__close");
    close.focus();
    expect(close).toHaveFocus();

    dtl.click(close);
    await nextTick();
    expect(screen.queryByRole("status")).toBeNull();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("persistent toasts (duration null) stay until closed", async () => {
    renderProvider();
    await show({ title: "Stay", duration: null });
    await tick(60_000);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("update, dismiss and dismissAll drive the queue; closable=false hides the close button", async () => {
    renderProvider({ duration: null });
    const id = await show({ title: "Uploading", closable: false });
    await show({ title: "Other" });
    expect(screen.getAllByRole("button", { name: "Close" })).toHaveLength(1);

    api.update(id, { title: "Uploaded", status: "success" });
    await nextTick();
    expect(screen.getByText("Uploaded").closest(".mild-toast")).toHaveClass("mild-toast--success");

    api.dismiss(id);
    await nextTick();
    expect(screen.queryByText("Uploaded")).toBeNull();
    expect(screen.getByText("Other")).toBeInTheDocument();

    api.dismissAll();
    await nextTick();
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByRole("region")).toBeNull();
  });

  it("re-using an id replaces that toast instead of stacking another", async () => {
    renderProvider({ duration: null });
    await show({ id: "progress", title: "Step 1" });
    await show({ id: "progress", title: "Step 2" });
    expect(screen.getAllByRole("status")).toHaveLength(1);
    expect(screen.getByText("Step 2")).toBeInTheDocument();
  });

  it("renders an action and a custom icon", async () => {
    renderProvider({ duration: null });
    await show({
      title: "Deleted",
      action: () => h("button", { type: "button" }, "Undo"),
      icon: () => h("svg", { "data-testid": "custom-icon" }),
    });
    expect(
      screen.getByRole("button", { name: "Undo" }).closest(".mild-toast__action"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("custom-icon").closest(".mild-toast__icon")).toBeInTheDocument();
  });

  it("useToast throws a helpful error outside the provider", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(() => render(Capture)).toThrow("useToast() must be used inside <ToastProvider>");
    warn.mockRestore();
  });
});

describe("Toast on its own", () => {
  useFakeTimers();

  it("renders the slots, restarts the countdown on a new duration and emits close", async () => {
    const onClose = vi.fn();
    const { rerender } = render(
      h(
        Toast,
        { duration: 1000, status: "warning", noIcon: true, onClose },
        {
          default: () => h("p", "Body"),
          title: () => h("em", "Rich"),
          description: () => h("i", "desc"),
          action: () => h("a", { href: "#" }, "Act"),
        },
      ),
    );
    const toast = screen.getByRole("alert");
    expect(toast.querySelector(".mild-toast__icon")).toBeNull();
    expect(toast.querySelector(".mild-toast__title em")).toHaveTextContent("Rich");
    expect(toast.querySelector(".mild-toast__description i")).toHaveTextContent("desc");
    expect(toast.querySelector(".mild-toast__action a")).toHaveTextContent("Act");
    expect(screen.getByText("Body")).toBeInTheDocument();

    await tick(500);
    await rerender({ duration: 2000 });
    await tick(1999);
    expect(onClose).not.toHaveBeenCalled();
    await tick(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders a region on its own", () => {
    render(h(ToastRegion, { placement: "top-left", label: "Alerts" }, () => "x"));
    expect(screen.getByRole("region", { name: "Alerts" })).toHaveClass(
      "mild-toast-region--top-left",
    );
  });
});

itHasNoSeriousAxeViolations("Toast", () =>
  h("div", [
    h(Toast, { title: "Saved", description: "All good.", duration: null }),
    h(Toast, { title: "Failed", status: "error", duration: null, closable: false }),
  ]),
);
