import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { containerCases } from "@mild-ui/test-cases/container";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Container } from "./index";

runComponentCases(containerCases, (c) => h(Container, caseProps(c), () => c.children));

describe("Container", () => {
  it("renders a lg div without inline style by default", () => {
    const { container } = render(h(Container, () => "content"));
    const element = container.firstElementChild as HTMLElement;
    expect(element.tagName).toBe("DIV");
    expect(element).toHaveClass("mild-container", "mild-container--lg");
    expect(element.getAttribute("style")).toBeNull();
  });

  it("renders the element given with `as` and forwards its attributes", () => {
    render(h(Container, { as: "main", size: "2xl" }, () => "page"));
    const main = screen.getByRole("main");
    expect(main.tagName).toBe("MAIN");
    expect(main).toHaveClass("mild-container--2xl");
  });

  it("maps the padding token onto both horizontal paddings", () => {
    const { container } = render(h(Container, { padding: "8", centerContent: true }));
    const element = container.firstElementChild as HTMLElement;
    expect(element.style.paddingLeft).toBe("var(--mild-space-8, 2rem)");
    expect(element.style.paddingRight).toBe("var(--mild-space-8, 2rem)");
    expect(element.style.paddingTop).toBe("");
    expect(element).toHaveClass("mild-container--center-content");
  });

  it("merges a caller-provided style", () => {
    const { container } = render(h(Container, { padding: "2", style: { minHeight: "100vh" } }));
    const element = container.firstElementChild as HTMLElement;
    expect(element.style.paddingLeft).toBe("var(--mild-space-2, 0.5rem)");
    expect(element.style.minHeight).toBe("100vh");
  });
});

itHasNoSeriousAxeViolations("Container", () =>
  h("div", [
    h(Container, { as: "main", size: "md", padding: "6" }, () => h("p", "Page")),
    h(Container, { size: "full", centerContent: true }, () => h("p", "Centered")),
  ]),
);
