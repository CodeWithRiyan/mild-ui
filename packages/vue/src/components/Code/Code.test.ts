import { h } from "vue";
import { render } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { codeCases } from "@mild-ui/test-cases/code";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Code } from "./index";

runComponentCases(codeCases, (c) => h(Code, caseProps(c), () => c.children));

describe("Code", () => {
  it("renders a subtle inline code element by default", () => {
    const { container } = render(h(Code, () => "npm i"));
    const code = container.firstElementChild as HTMLElement;
    expect(code.tagName).toBe("CODE");
    expect(code).toHaveClass("mild-code", "mild-code--subtle", "mild-code--md");
    expect(code).not.toHaveClass("mild-code--block");
    expect(code).toHaveTextContent("npm i");
  });

  it("maps variant, size and block onto modifiers", () => {
    const { container } = render(
      h(Code, { variant: "outline", size: "lg", block: true }, () => "b"),
    );
    expect(container.firstElementChild).toHaveClass(
      "mild-code--outline",
      "mild-code--lg",
      "mild-code--block",
    );
  });

  it("renders the element given with `as`", () => {
    const { container } = render(h(Code, { as: "pre", block: true }, () => "line"));
    expect((container.firstElementChild as HTMLElement).tagName).toBe("PRE");
  });
});

itHasNoSeriousAxeViolations("Code", () =>
  h("p", [
    h(Code, () => "inline"),
    h(Code, { as: "pre", block: true, variant: "solid" }, () => "block"),
  ]),
);
