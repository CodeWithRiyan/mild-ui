import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders a primary solid button by default", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });

    expect(button).toHaveAttribute("type", "button");
    // The stylesheet paints `.mild-button--solid.mild-button--primary`; without the style
    // class the button has no background and renders transparent.
    expect(button).toHaveClass("mild-button", "mild-button--primary", "mild-button--solid");
    expect(button).not.toHaveAttribute("aria-busy");
    expect(button).not.toHaveAttribute("aria-disabled");
    expect(button).toBeEnabled();
  });

  it.each([
    ["primary", ["mild-button--solid", "mild-button--primary"], ["mild-button--secondary"]],
    ["secondary", ["mild-button--solid", "mild-button--secondary"], ["mild-button--primary"]],
    ["destructive", ["mild-button--solid", "mild-button--danger"], ["mild-button--primary"]],
    ["outline", ["mild-button--outline", "mild-button--primary"], ["mild-button--solid"]],
    ["ghost", ["mild-button--ghost", "mild-button--primary"], ["mild-button--solid"]],
    ["link", ["mild-button--link", "mild-button--primary"], ["mild-button--solid"]],
  ] as const)("maps variant %s onto a style + color pair", (variant, present, absent) => {
    render(<Button variant={variant}>x</Button>);
    const button = screen.getByRole("button");
    for (const cls of present) expect(button).toHaveClass(cls);
    for (const cls of absent) expect(button).not.toHaveClass(cls);
  });

  it("lets colorScheme recolor the outline, ghost and link styles", () => {
    render(
      <Button variant="outline" colorScheme="danger">
        Delete
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("mild-button--outline", "mild-button--danger");
    expect(button).not.toHaveClass("mild-button--primary");
  });

  it("while loading: sets aria-busy, blocks clicks and stays focusable", () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Saving
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("data-loading");
    expect(button).toHaveClass("mild-button--loading");
    // Not the `disabled` attribute: that would throw focus away mid-submit.
    expect(button).not.toHaveAttribute("disabled");

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();

    button.focus();
    expect(document.activeElement).toBe(button);
  });

  it("shows the spinner instead of the label while loading", () => {
    const { container } = render(<Button loading>Saving</Button>);
    expect(container.querySelector(".mild-button__spinner")).toBeInTheDocument();
    expect(container.querySelector(".mild-button__content")).toBeNull();
  });

  it("while disabled: uses the disabled attribute and blocks clicks", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Nope
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveClass("mild-button--disabled");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("calls onClick when enabled and forwards the type", () => {
    const onClick = vi.fn();
    render(
      <Button type="submit" onClick={onClick}>
        Go
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
