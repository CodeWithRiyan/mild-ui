import { defineComponent, h, nextTick } from "vue";
import { render, screen } from "@testing-library/vue";
// The synchronous DOM Testing Library events: the Vue wrapper's async `fireEvent` awaits
// `waitFor`, which under vitest fake timers mixes real and fake timers and cancels the
// component's own countdown.
import { fireEvent as dtl } from "@testing-library/dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { tooltipCases } from "@mild-ui/test-cases/tooltip";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Tooltip } from "./index";
import { Button } from "../Button";

runComponentCases(tooltipCases, (c) =>
  h(Tooltip, caseProps(c), () => h("button", { type: "button" }, "Save")),
);

describe("Tooltip (WAI-ARIA tooltip pattern)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  const tick = async (ms: number) => {
    vi.advanceTimersByTime(ms);
    await nextTick();
  };

  it("describes the trigger with a hidden role=tooltip element", () => {
    render(
      h(Tooltip, { label: "Save your changes" }, () => h("button", { type: "button" }, "Save")),
    );
    const button = screen.getByRole("button", { name: "Save" });
    const tooltip = screen.getByRole("tooltip", { hidden: true });
    expect(tooltip).toHaveAttribute("hidden");
    expect(tooltip).toHaveClass("mild-tooltip", "mild-tooltip--top");
    expect(button).toHaveAttribute("aria-describedby", tooltip.id);
    expect(button).toHaveAccessibleDescription("Save your changes");
  });

  it("shows on hover after the delay and hides after leaving", async () => {
    render(
      h(Tooltip, { label: "Tip", openDelay: 300, closeDelay: 100 }, () =>
        h("button", { type: "button" }, "Save"),
      ),
    );
    const button = screen.getByRole("button");
    dtl.mouseEnter(button);
    await nextTick();
    await tick(299);
    expect(screen.getByRole("tooltip", { hidden: true })).toHaveAttribute("hidden");
    await tick(1);
    expect(screen.getByRole("tooltip")).toBeVisible();
    expect(screen.getByRole("tooltip")).toHaveAttribute("data-state", "open");

    dtl.mouseLeave(button);
    await nextTick();
    await tick(100);
    expect(screen.getByRole("tooltip", { hidden: true })).toHaveAttribute("hidden");
  });

  it("shows on keyboard focus at once and hides on Escape and on blur", async () => {
    render(h(Tooltip, { label: "Tip" }, () => h("button", { type: "button" }, "Save")));
    const button = screen.getByRole("button");
    dtl.focus(button);
    await nextTick();
    await tick(0);
    expect(screen.getByRole("tooltip")).toBeVisible();

    dtl.keyDown(button, { key: "Escape" });
    await nextTick();
    expect(screen.getByRole("tooltip", { hidden: true })).toHaveAttribute("hidden");

    dtl.blur(button);
    await nextTick();
    dtl.focus(button);
    await nextTick();
    await tick(0);
    expect(screen.getByRole("tooltip")).toBeVisible();
    dtl.blur(button);
    await nextTick();
    await tick(0);
    expect(screen.getByRole("tooltip", { hidden: true })).toHaveAttribute("hidden");
  });

  it("wraps a component trigger, maps placement / multiline and takes a rich label", () => {
    render(
      h(
        Tooltip,
        { placement: "right", multiline: true, id: "tip" },
        { default: () => h(Button, () => "Save"), label: () => h("em", "Rich tip") },
      ),
    );
    const button = screen.getByRole("button", { name: "Save" });
    const tooltip = screen.getByRole("tooltip", { hidden: true });
    expect(tooltip).toHaveAttribute("id", "tip");
    expect(tooltip).toHaveClass("mild-tooltip--right", "mild-tooltip--multiline");
    expect(tooltip.querySelector("em")).toHaveTextContent("Rich tip");
    expect(button).toHaveAttribute("aria-describedby", "tip");
  });

  it("renders only the child when disabled", () => {
    render(
      h(Tooltip, { label: "Tip", disabled: true }, () => h("button", { type: "button" }, "Save")),
    );
    expect(screen.queryByRole("tooltip", { hidden: true })).toBeNull();
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-describedby");
    expect(document.querySelector(".mild-tooltip-anchor")).toBeNull();
  });

  it("skips comments, whitespace and fragments around the single child", () => {
    render(
      asComponent(() =>
        h(Tooltip, { label: "Tip" }, () => [null, " ", [h("button", { type: "button" }, "Only")]]),
      ),
    );
    expect(screen.getByRole("button", { name: "Only" })).toHaveAttribute("aria-describedby");
  });

  it("describes itself when the child has no element to attach to", () => {
    const Empty = defineComponent({ setup: () => () => null });
    render(h(Tooltip, { label: "Tip" }, () => h(Empty)));
    const tooltip = screen.getByRole("tooltip", { hidden: true });
    expect(tooltip).toHaveAttribute("aria-describedby", tooltip.id);
  });

  it("requires exactly one child", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(() =>
      render(asComponent(() => h(Tooltip, { label: "Tip" }, () => [h("b", "a"), h("b", "b")]))),
    ).toThrow("exactly one child");
    warn.mockRestore();
  });
});

itHasNoSeriousAxeViolations("Tooltip", () =>
  h("div", [
    h(Tooltip, { label: "Save your changes" }, () => h("button", { type: "button" }, "Save")),
    h(Tooltip, { label: "Delete", placement: "bottom" }, () =>
      h(Button, { variant: "destructive" }, () => "Delete"),
    ),
  ]),
);
