import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from "./IconButton";
import { ButtonGroup } from "../ButtonGroup";

describe("IconButton", () => {
  it("names the button with the label and hides the glyph", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<IconButton ref={ref} label="Search" icon={<svg data-testid="glyph" />} />);
    const button = screen.getByRole("button", { name: "Search" });
    expect(ref.current).toBe(button);
    expect(button).toHaveAttribute("aria-label", "Search");
    expect(screen.getByTestId("glyph").closest("[aria-hidden='true']")).toBeInTheDocument();
    expect(button.querySelector(".mild-button__content")).toBeInTheDocument();
  });

  it("behaves like a Button: type, click, loading", () => {
    const onClick = vi.fn();
    const { rerender } = render(<IconButton label="Save" icon={<svg />} onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(<IconButton label="Save" icon={<svg />} onClick={onClick} loading />);
    expect(button).toHaveAttribute("aria-busy", "true");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("takes its size from an enclosing ButtonGroup", () => {
    render(
      <ButtonGroup size="lg" variant="outline">
        <IconButton label="Bold" icon={<svg />} />
        <IconButton label="Italic" icon={<svg />} size="xs" />
      </ButtonGroup>,
    );
    expect(screen.getByRole("button", { name: "Bold" })).toHaveClass(
      "mild-icon-button--lg",
      "mild-button--lg",
      "mild-button--outline",
    );
    expect(screen.getByRole("button", { name: "Italic" })).toHaveClass("mild-icon-button--xs");
  });
});
