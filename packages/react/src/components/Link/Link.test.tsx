import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Link } from "./Link";

describe("Link", () => {
  it("renders an anchor with the href", () => {
    render(<Link href="/docs">Docs</Link>);
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveClass("mild-link", "mild-link--underline-hover");
  });

  it("adds a safe rel for external links", () => {
    render(
      <Link href="https://example.com" external>
        Example
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("lets the caller override target and rel", () => {
    render(
      <Link href="https://example.com" external target="_self" rel="nofollow">
        Example
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_self");
    expect(link).toHaveAttribute("rel", "nofollow");
  });

  it("swallows clicks and drops the href when disabled", () => {
    const onClick = vi.fn();
    render(
      <Link href="/docs" disabled onClick={onClick}>
        Docs
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("href");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");

    fireEvent.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("calls onClick when it is not disabled", () => {
    const onClick = vi.fn();
    render(
      <Link href="/docs" onClick={onClick}>
        Docs
      </Link>,
    );
    fireEvent.click(screen.getByRole("link"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders another component with `as` and forwards its props and ref", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Link as="button" ref={ref} type="button" underline="always">
        Act
      </Link>,
    );
    const button = screen.getByRole("button", { name: "Act" });
    expect(ref.current).toBe(button);
    expect(button).toHaveClass("mild-link", "mild-link--underline-always");
    expect(button).toHaveAttribute("type", "button");
  });
});
