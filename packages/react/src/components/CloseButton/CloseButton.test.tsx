import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CloseButton } from "./CloseButton";

describe("CloseButton", () => {
  it("is a ghost icon button named Close with an X glyph", () => {
    const ref = React.createRef<HTMLButtonElement>();
    const onClick = vi.fn();
    render(<CloseButton ref={ref} onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Close" });
    expect(ref.current).toBe(button);
    expect(button).toHaveClass("mild-close-button", "mild-icon-button", "mild-button--ghost");
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("accepts another glyph, label and variant", () => {
    render(<CloseButton label="Dismiss" icon={<span data-testid="custom" />} variant="outline" />);
    const button = screen.getByRole("button", { name: "Dismiss" });
    expect(screen.getByTestId("custom")).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeNull();
    expect(button).toHaveClass("mild-button--outline");
  });
});
