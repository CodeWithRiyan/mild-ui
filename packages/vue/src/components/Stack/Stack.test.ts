import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { stackCases } from "@mild-ui/test-cases/stack";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Stack } from "./index";

runComponentCases(stackCases, (c) => h(Stack, caseProps(c), () => c.children));

describe("Stack", () => {
  it("renders a column div with the default gap", () => {
    const { container } = render(h(Stack, () => "content"));
    const stack = container.firstElementChild as HTMLElement;
    expect(stack.tagName).toBe("DIV");
    expect(stack).toHaveClass("mild-stack", "mild-stack--column");
    expect(stack.style.gap).toBe("var(--mild-space-4, 1rem)");
  });

  it("renders the element given with `as` and forwards its attributes", () => {
    render(h(Stack, { as: "section", "aria-label": "Steps", direction: "row" }, () => "content"));
    const section = screen.getByRole("region", { name: "Steps" });
    expect(section.tagName).toBe("SECTION");
    expect(section).toHaveClass("mild-stack--row");
  });

  it("maps gap tokens and flex keywords onto the stylesheet's modifiers", () => {
    const { container } = render(
      h(Stack, { gap: "2-5", align: "flex-start", justify: "space-around", wrap: "wrap-reverse" }),
    );
    const stack = container.firstElementChild as HTMLElement;
    expect(stack.style.gap).toBe("var(--mild-space-2-5, 0.625rem)");
    expect(stack).toHaveClass(
      "mild-stack--items-start",
      "mild-stack--justify-around",
      "mild-stack--wrap-reverse",
    );
  });

  it("treats wrap=false as no wrap modifier, and wrap as `wrap`", () => {
    const { container } = render(h(Stack, { wrap: false }));
    expect((container.firstElementChild as HTMLElement).className).not.toMatch(/wrap/);

    const { container: wrapping } = render(h(Stack, { wrap: true, inline: true }));
    expect(wrapping.firstElementChild).toHaveClass("mild-stack--wrap", "mild-stack--inline");
  });

  it("keeps a caller-provided style and class next to the gap", () => {
    const { container } = render(h(Stack, { style: { minHeight: "10px" }, class: "custom" }));
    const stack = container.firstElementChild as HTMLElement;
    expect(stack.style.gap).toBe("var(--mild-space-4, 1rem)");
    expect(stack.style.minHeight).toBe("10px");
    expect(stack).toHaveClass("mild-stack", "custom");
  });
});

itHasNoSeriousAxeViolations("Stack", () =>
  h("div", [
    h(Stack, { gap: "2" }, () => [h("p", "One"), h("p", "Two")]),
    h(Stack, { as: "nav", "aria-label": "Crumbs", direction: "row", inline: true }, () => [
      h("a", { href: "#a" }, "A"),
      h("a", { href: "#b" }, "B"),
    ]),
  ]),
);
