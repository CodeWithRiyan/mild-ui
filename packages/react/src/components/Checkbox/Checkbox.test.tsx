import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox (driven by @mild-ui/primitives/checkbox)", () => {
  it("renders an unchecked, focusable checkbox with its label", () => {
    render(<Checkbox id="terms" label="Accept terms" />);
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });

    expect(checkbox).toHaveAttribute("aria-checked", "false");
    expect(checkbox).toHaveAttribute("tabindex", "0");
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
  });

  it("toggles on click and on Space, and reports the change", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(checkbox).toHaveAttribute("data-state", "checked");
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);

    fireEvent.keyDown(checkbox, { key: " " });
    expect(checkbox).toHaveAttribute("aria-checked", "false");
    expect(onCheckedChange).toHaveBeenLastCalledWith(false);
  });

  it("does not toggle on Enter", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.keyDown(checkbox, { key: "Enter" });

    expect(checkbox).toHaveAttribute("aria-checked", "false");
  });

  it("renders the indeterminate state and resolves it to checked on activation", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox defaultChecked="indeterminate" onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    expect(checkbox).toHaveAttribute("data-state", "indeterminate");

    fireEvent.click(checkbox);

    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("treats the indeterminate prop as the mixed state, and reports the resolved value", () => {
    const onCheckedChange = vi.fn();
    const { rerender } = render(
      <Checkbox checked={false} indeterminate onCheckedChange={onCheckedChange} />,
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");

    fireEvent.click(checkbox);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    // Still indeterminate until the parent says otherwise.
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");

    rerender(<Checkbox checked indeterminate={false} onCheckedChange={onCheckedChange} />);
    expect(checkbox).toHaveAttribute("aria-checked", "true");
  });

  it("stays where the parent puts it when controlled", () => {
    const onCheckedChange = vi.fn();
    const { rerender } = render(<Checkbox checked={false} onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    // The parent did not update the prop, so the DOM is synced back to unchecked.
    expect(checkbox).toHaveAttribute("aria-checked", "false");

    rerender(<Checkbox checked="indeterminate" onCheckedChange={onCheckedChange} />);
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
  });

  it("ignores interaction while disabled and reflects it with aria-disabled", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox disabled onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(checkbox);

    expect(checkbox).toHaveAttribute("aria-checked", "false");
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("shows the default check mark, or the icon passed in", () => {
    const { container, rerender } = render(<Checkbox defaultChecked />);
    expect(container.querySelector("[data-indicator] svg")).not.toBeNull();

    rerender(<Checkbox defaultChecked icon={<span data-testid="custom">✓</span>} />);
    expect(screen.getByTestId("custom")).toBeInTheDocument();
    expect(container.querySelector("[data-indicator] svg")).toBeNull();
  });

  it("submits through a hidden input when given a name", () => {
    const { container } = render(<Checkbox name="terms" value="yes" defaultChecked />);
    const input = container.querySelector<HTMLInputElement>('input[name="terms"]');

    expect(input).not.toBeNull();
    expect(input?.checked).toBe(true);
    expect(input?.value).toBe("yes");
  });
});
