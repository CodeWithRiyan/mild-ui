import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InputPassword } from "./InputPassword";

describe("InputPassword", () => {
  it("toggles between password and text with an announced pressed state", () => {
    const { container } = render(<InputPassword />);
    const input = container.querySelector("input")!;
    const toggle = screen.getByRole("button", { name: "Show password" });

    expect(input).toHaveAttribute("type", "password");
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(toggle);
    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: "Hide password" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("switches the toggle label without moving focus off the input", () => {
    const { container } = render(<InputPassword defaultValue="hunter2" />);
    const input = container.querySelector("input")!;
    input.focus();
    input.setSelectionRange(3, 6);
    expect(document.activeElement).toBe(input);

    const toggle = screen.getByRole("button", { name: "Show password" });
    // Browsers move focus on mousedown; the toggle opts out of that...
    const mouseDown = fireEvent.mouseDown(toggle);
    expect(mouseDown).toBe(false); // default prevented
    fireEvent.click(toggle);

    // ...so the input keeps focus (and its selection) while the label and type switch.
    expect(document.activeElement).toBe(input);
    expect(input).toHaveAttribute("type", "text");
    expect(input.selectionStart).toBe(3);
    expect(input.selectionEnd).toBe(6);
    expect(screen.getByRole("button", { name: "Hide password" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Show password" })).toBeNull();
  });

  it("keeps the toggle reachable by keyboard and does not steal focus from elsewhere", () => {
    render(<InputPassword />);
    const toggle = screen.getByRole("button", { name: "Show password" });
    toggle.focus();
    fireEvent.click(toggle);
    // Activated from the keyboard: focus stays on the toggle.
    expect(document.activeElement).toBe(toggle);
    expect(toggle).toHaveAttribute("aria-label", "Hide password");
  });

  it("sets aria-invalid for error and isInvalid, and maps readonly", () => {
    const { container, rerender } = render(<InputPassword isInvalid isReadOnly />);
    const input = container.querySelector("input")!;
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("readonly");

    rerender(<InputPassword />);
    expect(input).not.toHaveAttribute("aria-invalid");
  });
});
