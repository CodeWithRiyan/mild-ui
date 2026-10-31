import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./Collapsible";

describe("Collapsible (WAI-ARIA disclosure pattern)", () => {
  it("renders a button with aria-expanded / aria-controls and hidden content", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>More</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = screen.getByRole("button", { name: "Details" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    const content = document.getElementById(trigger.getAttribute("aria-controls") as string);
    expect(content).toHaveAttribute("hidden");
    expect(content).toHaveClass("mild-collapsible-content");
    expect(trigger.querySelector(".mild-collapsible-trigger__icon")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("toggles on click (uncontrolled) and reports the state", () => {
    const onOpenChange = vi.fn();
    render(
      <Collapsible onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>More</CollapsibleContent>
      </Collapsible>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("More")).toBeVisible();

    fireEvent.click(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(screen.getByText("More")).not.toBeVisible();
  });

  it("follows a controlled value only", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Collapsible open={false} onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent forceMount={false}>More</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.queryByText("More")).toBeNull();
    fireEvent.click(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");

    rerender(
      <Collapsible open onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent forceMount={false}>More</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.getByText("More")).toBeVisible();
  });

  it("does nothing while disabled and lets onClick cancel the toggle", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Collapsible disabled onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>More</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.getByRole("button")).toBeDisabled();

    rerender(
      <Collapsible onOpenChange={onOpenChange}>
        <CollapsibleTrigger onClick={(event) => event.preventDefault()}>Details</CollapsibleTrigger>
        <CollapsibleContent>More</CollapsibleContent>
      </Collapsible>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("throws a helpful error when a part is used outside a Collapsible", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<CollapsibleTrigger>x</CollapsibleTrigger>)).toThrow(
      "inside <Collapsible>",
    );
    error.mockRestore();
  });
});
