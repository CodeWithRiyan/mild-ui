import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { flexCases } from "@mild-ui/test-cases/flex";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Flex } from "./index";

runComponentCases(flexCases, (c) => h(Flex, caseProps(c), () => c.children));

describe("Flex", () => {
  it("renders a row div without inline style by default", () => {
    const { container } = render(h(Flex, () => "content"));
    const flex = container.firstElementChild as HTMLElement;
    expect(flex.tagName).toBe("DIV");
    expect(flex).toHaveClass("mild-flex", "mild-flex--row");
    expect(flex.getAttribute("style")).toBeNull();
  });

  it("renders the element given with `as` and forwards its attributes", () => {
    render(h(Flex, { as: "nav", "aria-label": "Main" }, () => "links"));
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav.tagName).toBe("NAV");
  });

  it("maps the gap token and flex keywords onto the stylesheet's modifiers", () => {
    const { container } = render(
      h(Flex, {
        gap: "3",
        direction: "column-reverse",
        wrap: true,
        align: "baseline",
        justify: "flex-end",
        inline: true,
      }),
    );
    const flex = container.firstElementChild as HTMLElement;
    expect(flex.style.gap).toBe("var(--mild-space-3, 0.75rem)");
    expect(flex).toHaveClass(
      "mild-flex--inline",
      "mild-flex--column-reverse",
      "mild-flex--wrap",
      "mild-flex--items-baseline",
      "mild-flex--justify-end",
    );
  });

  it("merges a caller-provided style", () => {
    const { container } = render(h(Flex, { gap: "1", style: { minHeight: "10px" } }));
    const flex = container.firstElementChild as HTMLElement;
    expect(flex.style.gap).toBe("var(--mild-space-1, 0.25rem)");
    expect(flex.style.minHeight).toBe("10px");
  });
});

itHasNoSeriousAxeViolations("Flex", () =>
  h("div", [
    h(Flex, { gap: "2", align: "center" }, () => [h("span", "One"), h("span", "Two")]),
    h(Flex, { as: "ul", "aria-label": "Items", wrap: true }, () => [h("li", "A"), h("li", "B")]),
  ]),
);
