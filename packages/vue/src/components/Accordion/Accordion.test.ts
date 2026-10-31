import { defineComponent, h, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { accordionCases } from "@mild-ui/test-cases/accordion";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./index";

runComponentCases(accordionCases, (c) =>
  h(Accordion, caseProps(c), () => [
    h(AccordionItem, { value: "a" }, () => [
      h(AccordionTrigger, () => "Item A"),
      h(AccordionContent, () => "Body A"),
    ]),
    h(AccordionItem, { value: "b" }, () => [
      h(AccordionTrigger, () => "Item B"),
      h(AccordionContent, () => "Body B"),
    ]),
  ]),
);

function renderAccordion(props: Record<string, unknown> = {}) {
  return render(
    asComponent(() =>
      h(Accordion, props, () => [
        h(AccordionItem, { value: "shipping" }, () => [
          h(AccordionTrigger, () => "Shipping"),
          h(AccordionContent, () => "Ships in 2 days"),
        ]),
        h(AccordionItem, { value: "returns" }, () => [
          h(AccordionTrigger, () => "Returns"),
          h(AccordionContent, () => "30 days"),
        ]),
        h(AccordionItem, { value: "warranty", disabled: true }, () => [
          h(AccordionTrigger, () => "Warranty"),
          h(AccordionContent, () => "2 years"),
        ]),
      ]),
    ),
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
    expect(region.closest(".mild-accordion-item")).toHaveAttribute("data-state", "open");

    // Closed panels stay mounted but hidden.
    const returns = header("Returns");
    expect(returns).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById(returns.getAttribute("aria-controls")!)).toHaveAttribute(
      "hidden",
    );
    expect(header("Warranty")).toBeDisabled();
    expect(header("Warranty").closest(".mild-accordion-item")).toHaveAttribute("data-disabled", "");
  });

  it("honours the heading level", () => {
    renderAccordion({ headingLevel: 4 });
    expect(header("Shipping").parentElement?.tagName).toBe("H4");
  });

  it("single: opens one panel at a time, closes it on a second press, reports string | null", async () => {
    const onChange = vi.fn();
    renderAccordion({ onChange });
    await fireEvent.click(header("Shipping"));
    expect(onChange).toHaveBeenLastCalledWith("shipping");
    expect(header("Shipping")).toHaveAttribute("aria-expanded", "true");

    await fireEvent.click(header("Returns"));
    expect(header("Shipping")).toHaveAttribute("aria-expanded", "false");
    expect(header("Returns")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: "Returns" })).toBeVisible();

    await fireEvent.click(header("Returns"));
    expect(onChange).toHaveBeenLastCalledWith(null);
    expect(header("Returns")).toHaveAttribute("aria-expanded", "false");
  });

  it("single, not collapsible: the open panel cannot be closed", async () => {
    const onChange = vi.fn();
    renderAccordion({ defaultValue: "shipping", collapsible: false, onChange });
    await fireEvent.click(header("Shipping"));
    expect(header("Shipping")).toHaveAttribute("aria-expanded", "true");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("multiple: any number of panels open, reported as an array", async () => {
    const onChange = vi.fn();
    renderAccordion({ type: "multiple", defaultValue: ["shipping"], onChange, collapsible: false });
    await fireEvent.click(header("Returns"));
    expect(onChange).toHaveBeenLastCalledWith(["shipping", "returns"]);
    expect(header("Shipping")).toHaveAttribute("aria-expanded", "true");
    expect(header("Returns")).toHaveAttribute("aria-expanded", "true");
    // Multiple is always collapsible.
    await fireEvent.click(header("Returns"));
    expect(onChange).toHaveBeenLastCalledWith(["shipping"]);
  });

  it("Arrow Down/Up, Home and End move between the headers, skipping disabled ones", async () => {
    renderAccordion();
    header("Shipping").focus();
    await keyDown("ArrowDown");
    expect(header("Returns")).toHaveFocus();
    await keyDown("ArrowDown");
    expect(header("Shipping")).toHaveFocus();
    await keyDown("End");
    expect(header("Returns")).toHaveFocus();
    await keyDown("Home");
    expect(header("Shipping")).toHaveFocus();
  });

  it("follows a controlled value and works with v-model", async () => {
    const onChange = vi.fn();
    const value = ref<string | null>("shipping");
    render(
      asComponent(() =>
        h(Accordion, { modelValue: value.value, onChange }, () => [
          h(AccordionItem, { value: "shipping" }, () => [
            h(AccordionTrigger, () => "Shipping"),
            h(AccordionContent, () => "A"),
          ]),
          h(AccordionItem, { value: "returns" }, () => [
            h(AccordionTrigger, () => "Returns"),
            h(AccordionContent, () => "B"),
          ]),
        ]),
      ),
    );
    await fireEvent.click(header("Returns"));
    expect(onChange).toHaveBeenCalledWith("returns");
    expect(header("Returns")).toHaveAttribute("aria-expanded", "false");

    value.value = "returns";
    await fireEvent.click(document.body);
    expect(header("Returns")).toHaveAttribute("aria-expanded", "true");

    const Harness = defineComponent({
      setup() {
        const open = ref<string[]>([]);
        return () => [
          h(
            Accordion,
            {
              type: "multiple",
              modelValue: open.value,
              "onUpdate:modelValue": (v) => (open.value = v as string[]),
            },
            () => [
              h(AccordionItem, { value: "x" }, () => [
                h(AccordionTrigger, () => "X"),
                h(AccordionContent, () => "x"),
              ]),
              h(AccordionItem, { value: "y" }, () => [
                h(AccordionTrigger, () => "Y"),
                h(AccordionContent, () => "y"),
              ]),
            ],
          ),
          h("output", open.value.join(",")),
        ];
      },
    });
    render(Harness);
    await fireEvent.click(header("X"));
    await fireEvent.click(header("Y"));
    expect(screen.getByRole("status")).toHaveTextContent("x,y");
  });

  it("maps variant/size classes and a custom icon; disabled disables every header", () => {
    render(
      asComponent(() =>
        h(Accordion, { variant: "ghost", size: "sm", disabled: true }, () => [
          h(AccordionItem, { value: "a" }, () => [
            h(
              AccordionTrigger,
              { class: "custom-trigger" },
              { default: () => "A", icon: () => h("svg", { "data-testid": "glyph" }) },
            ),
            h(AccordionContent, { forceMount: false }, () => "Body"),
          ]),
          h(AccordionItem, { value: "b" }, () => [
            h(AccordionTrigger, { noIcon: true }, () => "B"),
            h(AccordionContent, () => "b"),
          ]),
        ]),
      ),
    );
    const root = header("A").closest(".mild-accordion");
    expect(root).toHaveClass(
      "mild-accordion--ghost",
      "mild-accordion--sm",
      "mild-accordion--single",
    );
    expect(header("A")).toBeDisabled();
    expect(header("A")).toHaveClass(
      "mild-accordion-trigger--sm",
      "mild-accordion-trigger--disabled",
      "custom-trigger",
    );
    expect(header("A").parentElement).not.toHaveClass("custom-trigger");
    expect(screen.getByTestId("glyph").closest(".mild-accordion-trigger-icon")).toBeInTheDocument();
    expect(screen.queryByText("Body")).toBeNull();
    expect(header("B").querySelector(".mild-accordion-trigger-icon")).toBeNull();
    expect(document.querySelector(".mild-accordion-content-inner")).toHaveClass(
      "mild-accordion-content-inner--sm",
    );
  });

  it("throws a helpful error when a part is used outside an Accordion", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(() => render(h(AccordionItem, { value: "x" }, () => "x"))).toThrow("inside <Accordion>");
    expect(() =>
      render(asComponent(() => h(Accordion, () => h(AccordionTrigger, () => "x")))),
    ).toThrow("inside <AccordionItem>");
    expect(() =>
      render(asComponent(() => h(Accordion, () => h(AccordionContent, () => "x")))),
    ).toThrow("inside <AccordionItem>");
    warn.mockRestore();
  });
});

itHasNoSeriousAxeViolations("Accordion", () =>
  h(Accordion, { defaultValue: "a" }, () => [
    h(AccordionItem, { value: "a" }, () => [
      h(AccordionTrigger, () => "Item A"),
      h(AccordionContent, () => "Body A"),
    ]),
    h(AccordionItem, { value: "b", disabled: true }, () => [
      h(AccordionTrigger, () => "Item B"),
      h(AccordionContent, () => "Body B"),
    ]),
  ]),
);
