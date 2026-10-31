import * as React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { vi } from "vitest";
import { Tooltip } from "./Tooltip";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("Tooltip (WAI-ARIA tooltip pattern)", () => {
  it("describes the trigger with a hidden role=tooltip element", () => {
    render(
      <Tooltip label="Save your changes">
        <button type="button">Save</button>
      </Tooltip>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    const tooltip = screen.getByRole("tooltip", { hidden: true });
    expect(tooltip).toHaveAttribute("hidden");
    expect(tooltip).toHaveClass("mild-tooltip", "mild-tooltip--top");
    expect(button).toHaveAttribute("aria-describedby", tooltip.id);
    expect(button).toHaveAccessibleDescription("Save your changes");
  });

  it("shows on hover after the delay and hides after leaving", () => {
    render(
      <Tooltip label="Tip" openDelay={300} closeDelay={100}>
        <button type="button">Save</button>
      </Tooltip>,
    );
    const button = screen.getByRole("button");
    fireEvent.mouseEnter(button);
    act(() => vi.advanceTimersByTime(299));
    expect(screen.getByRole("tooltip", { hidden: true })).toHaveAttribute("hidden");
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("tooltip")).toBeVisible();
    expect(screen.getByRole("tooltip")).toHaveAttribute("data-state", "open");

    fireEvent.mouseLeave(button);
    act(() => vi.advanceTimersByTime(100));
    expect(screen.getByRole("tooltip", { hidden: true })).toHaveAttribute("hidden");
  });

  it("shows on keyboard focus at once and hides on Escape and on blur", () => {
    render(
      <Tooltip label="Tip">
        <button type="button">Save</button>
      </Tooltip>,
    );
    const button = screen.getByRole("button");
    act(() => button.focus());
    expect(screen.getByRole("tooltip")).toBeVisible();

    fireEvent.keyDown(button, { key: "Escape" });
    expect(screen.getByRole("tooltip", { hidden: true })).toHaveAttribute("hidden");

    act(() => button.blur());
    act(() => button.focus());
    expect(screen.getByRole("tooltip")).toBeVisible();
    act(() => button.blur());
    expect(screen.getByRole("tooltip", { hidden: true })).toHaveAttribute("hidden");
  });

  it("keeps the child's own ref and maps placement / multiline", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Tooltip label="Tip" placement="right" multiline>
        <button type="button" ref={ref}>
          Save
        </button>
      </Tooltip>,
    );
    expect(ref.current).toBe(screen.getByRole("button"));
    expect(screen.getByRole("tooltip", { hidden: true })).toHaveClass(
      "mild-tooltip--right",
      "mild-tooltip--multiline",
    );
  });

  it("renders only the child when disabled", () => {
    render(
      <Tooltip label="Tip" disabled>
        <button type="button">Save</button>
      </Tooltip>,
    );
    expect(screen.queryByRole("tooltip", { hidden: true })).toBeNull();
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-describedby");
    expect(document.querySelector(".mild-tooltip-anchor")).toBeNull();
  });
});
