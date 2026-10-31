import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("toggles aria-pressed on click when uncontrolled", () => {
    const onPressedChange = vi.fn();
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Toggle ref={ref} onPressedChange={onPressedChange}>
        B
      </Toggle>,
    );
    const toggle = screen.getByRole("button");
    expect(ref.current).toBe(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle).toHaveAttribute("data-state", "on");
    expect(onPressedChange).toHaveBeenLastCalledWith(true);

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(onPressedChange).toHaveBeenLastCalledWith(false);
  });

  it("follows the controlled value only", () => {
    const onPressedChange = vi.fn();
    const { rerender } = render(<Toggle pressed={false} onPressedChange={onPressedChange} />);
    const toggle = screen.getByRole("button");
    fireEvent.click(toggle);
    expect(onPressedChange).toHaveBeenCalledWith(true);
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    rerender(<Toggle pressed onPressedChange={onPressedChange} />);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  it("does nothing while disabled", () => {
    const onPressedChange = vi.fn();
    render(<Toggle disabled onPressedChange={onPressedChange} />);
    const toggle = screen.getByRole("button");
    expect(toggle).toBeDisabled();
    fireEvent.click(toggle);
    expect(onPressedChange).not.toHaveBeenCalled();
  });

  it("lets onClick cancel the toggle", () => {
    const onPressedChange = vi.fn();
    render(
      <Toggle onClick={(event) => event.preventDefault()} onPressedChange={onPressedChange} />,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onPressedChange).not.toHaveBeenCalled();
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });
});
