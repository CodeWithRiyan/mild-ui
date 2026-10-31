import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

function renderAccordion(props: Partial<React.ComponentProps<typeof Accordion>> = {}) {
  return render(
    <Accordion {...(props as React.ComponentProps<typeof Accordion>)}>
      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>Ships in 2 days</AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>30 days</AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty" disabled>
        <AccordionTrigger>Warranty</AccordionTrigger>
        <AccordionContent>2 years</AccordionContent>
      </AccordionItem>
    </Accordion>,
  );
}

const header = (name: string) => screen.getByRole("button", { name });
const keyDown = (key: string) => fireEvent.keyDown(document.activeElement as Element, { key });

describe("Accordion (WAI-ARIA accordion pattern)", () => {
  it("renders headings wrapping buttons with aria-expanded / aria-controls, and regions", () => {
    renderAccordion({ defaultValue: "shipping" });
    const shipping = header("Shipping");
    expect(shipping.parentElement?.tagName).toBe("H3");
    expect(shipping.parentElement).toHaveClass("mild-accordion-header");
    expect(shipping).toHaveAttribute("aria-expanded", "true");

    const region = screen.getByRole("region", { name: "Shipping" });
    expect(shipping).toHaveAttribute("aria-controls", region.id);
    expect(region).toHaveAttribute("aria-labelledby", shipping.id);
    expect(region).toHaveTextContent("Ships in 2 days");
    expect(region).toHaveAttribute("data-state", "open");

    // Closed panels stay mounted but hidden.
    const returns = header("Returns");
    expect(returns).toHaveAttribute("aria-expanded", "false");
    expect(
      document.getElementById(returns.getAttribute("aria-controls") as string),
    ).toHaveAttribute("hidden");
    expect(header("Warranty")).toBeDisabled();
  });

  it("honours the heading level", () => {
    renderAccordion({ headingLevel: 4 });
    expect(header("Shipping").parentElement?.tagName).toBe("H4");
  });

  it("single: opens one panel at a time, closes it on a second press, reports string | null", () => {
    const onValueChange = vi.fn();
    renderAccordion({ onValueChange });
    fireEvent.click(header("Shipping"));
    expect(onValueChange).toHaveBeenLastCalledWith("shipping");
    expect(header("Shipping")).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(header("Returns"));
    expect(header("Shipping")).toHaveAttribute("aria-expanded", "false");
    expect(header("Returns")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: "Returns" })).toBeVisible();

    fireEvent.click(header("Returns"));
    expect(onValueChange).toHaveBeenLastCalledWith(null);
    expect(header("Returns")).toHaveAttribute("aria-expanded", "false");
  });

  it("single, not collapsible: the open panel cannot be closed", () => {
    const onValueChange = vi.fn();
    renderAccordion({ defaultValue: "shipping", collapsible: false, onValueChange });
    fireEvent.click(header("Shipping"));
    expect(header("Shipping")).toHaveAttribute("aria-expanded", "true");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("multiple: any number of panels open, reported as an array", () => {
    const onValueChange = vi.fn();
    renderAccordion({ type: "multiple", defaultValue: ["shipping"], onValueChange });
    fireEvent.click(header("Returns"));
    expect(onValueChange).toHaveBeenLastCalledWith(["shipping", "returns"]);
    expect(header("Shipping")).toHaveAttribute("aria-expanded", "true");
    expect(header("Returns")).toHaveAttribute("aria-expanded", "true");
  });

  it("Arrow Down/Up, Home and End move between the headers, skipping disabled ones", () => {
    renderAccordion();
    header("Shipping").focus();
    keyDown("ArrowDown");
    expect(header("Returns")).toHaveFocus();
    keyDown("ArrowDown");
    expect(header("Shipping")).toHaveFocus();
    keyDown("End");
    expect(header("Returns")).toHaveFocus();
    keyDown("Home");
    expect(header("Shipping")).toHaveFocus();
  });

  it("follows a controlled value", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <Accordion value="shipping" onValueChange={onValueChange}>
        <AccordionItem value="shipping">
          <AccordionTrigger>Shipping</AccordionTrigger>
          <AccordionContent>A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="returns">
          <AccordionTrigger>Returns</AccordionTrigger>
          <AccordionContent>B</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    fireEvent.click(header("Returns"));
    expect(onValueChange).toHaveBeenCalledWith("returns");
    expect(header("Returns")).toHaveAttribute("aria-expanded", "false");

    rerender(
      <Accordion value="returns" onValueChange={onValueChange}>
        <AccordionItem value="shipping">
          <AccordionTrigger>Shipping</AccordionTrigger>
          <AccordionContent>A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="returns">
          <AccordionTrigger>Returns</AccordionTrigger>
          <AccordionContent>B</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(header("Returns")).toHaveAttribute("aria-expanded", "true");
  });

  it("maps variant/size classes and a custom icon; disabled disables every header", () => {
    render(
      <Accordion variant="ghost" size="sm" disabled>
        <AccordionItem value="a">
          <AccordionTrigger icon={<svg data-testid="glyph" />}>A</AccordionTrigger>
          <AccordionContent forceMount={false}>Body</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const root = header("A").closest(".mild-accordion");
    expect(root).toHaveClass(
      "mild-accordion--ghost",
      "mild-accordion--sm",
      "mild-accordion--single",
    );
    expect(header("A")).toBeDisabled();
    expect(header("A")).toHaveClass("mild-accordion-trigger--sm");
    expect(screen.getByTestId("glyph").closest(".mild-accordion-trigger-icon")).toBeInTheDocument();
    expect(screen.queryByText("Body")).toBeNull();
  });

  it("throws a helpful error when a part is used outside an Accordion", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<AccordionItem value="x">x</AccordionItem>)).toThrow("inside <Accordion>");
    error.mockRestore();
  });
});
