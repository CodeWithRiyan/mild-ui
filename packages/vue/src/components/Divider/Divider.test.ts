import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { dividerCases } from "@mild-ui/test-cases/divider";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { asComponent } from "../../test-utils/render";
import { Divider } from "./index";

runComponentCases(dividerCases, (c) => h(Divider, caseProps(c)));

describe("Divider", () => {
  it("renders a horizontal separator div by default", () => {
    render(h(Divider));
    const divider = screen.getByRole("separator");
    expect(divider.tagName).toBe("DIV");
    expect(divider).toHaveClass(
      "mild-divider",
      "mild-divider--horizontal",
      "mild-divider--solid",
      "mild-divider--sm",
    );
    expect(divider).toHaveAttribute("aria-orientation", "horizontal");
    expect(divider).toBeEmptyDOMElement();
    expect(divider.getAttribute("style")).toBeNull();
  });

  it("renders the element given with `as` and forwards its attributes", () => {
    render(asComponent(() => h("ul", [h(Divider, { as: "li", "data-testid": "divider" })])));
    const divider = screen.getByTestId("divider");
    expect(divider.tagName).toBe("LI");
    expect(divider).toHaveAttribute("role", "separator");
  });

  it("renders a void hr with no children at all", () => {
    const { container } = render(h(Divider, { as: "hr" }));
    const hr = container.querySelector("hr")!;
    expect(hr.childNodes).toHaveLength(0);
    expect(hr).toHaveAttribute("role", "separator");
  });

  it("announces the vertical orientation", () => {
    render(h(Divider, { orientation: "vertical", variant: "dotted", size: "lg" }));
    const divider = screen.getByRole("separator");
    expect(divider).toHaveAttribute("aria-orientation", "vertical");
    expect(divider).toHaveClass(
      "mild-divider--vertical",
      "mild-divider--dotted",
      "mild-divider--lg",
    );
  });

  it("writes the color token to the line's custom property only, and merges a style", () => {
    render(h(Divider, { color: "primary-500", style: { margin: "4px" } }));
    const divider = screen.getByRole("separator");
    expect(divider.style.getPropertyValue("--mild-divider-color")).toBe(
      "var(--mild-color-primary-500)",
    );
    expect(divider.style.color).toBe("");
    expect(divider.style.margin).toBe("4px");
  });

  it("renders a label on the line, from the prop or the slot", () => {
    render(h(Divider, { label: "OR", labelPosition: "end" }));
    const divider = screen.getByRole("separator");
    expect(divider).toHaveClass("mild-divider--with-label", "mild-divider--label-end");
    expect(divider.querySelector(".mild-divider__label")).toHaveTextContent("OR");

    render(h(Divider, { "data-testid": "rich" }, { label: () => h("em", "or continue with") }));
    expect(screen.getByTestId("rich").querySelector(".mild-divider__label em")).toHaveTextContent(
      "or continue with",
    );
  });

  it("adds no label-position modifier for the centered default", () => {
    render(h(Divider, { label: "OR" }));
    const divider = screen.getByRole("separator");
    expect(divider).toHaveClass("mild-divider--with-label");
    expect(divider.className).not.toMatch(/mild-divider--label-/);
  });

  it("hides a decorative divider from assistive technology", () => {
    const { container } = render(h(Divider, { decorative: true }));
    expect(screen.queryByRole("separator")).toBeNull();
    const divider = container.firstElementChild as HTMLElement;
    expect(divider).toHaveAttribute("role", "none");
    expect(divider).toHaveAttribute("aria-hidden", "true");
    expect(divider).not.toHaveAttribute("aria-orientation");
  });
});

itHasNoSeriousAxeViolations("Divider", () =>
  h("div", [
    h(Divider),
    h(Divider, { label: "OR", color: "gray-300" }),
    h(Divider, { orientation: "vertical", size: "md" }),
    h(Divider, { decorative: true, variant: "dashed" }),
    // Inside a list a separator must be decorative: a `role="separator"` child breaks the
    // list's required owned elements (axe "list", serious).
    h("ul", [h("li", "a"), h(Divider, { as: "li", decorative: true }), h("li", "b")]),
    h(Divider, { as: "hr" }),
  ]),
);
