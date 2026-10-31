import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { headingCases } from "@mild-ui/test-cases/heading";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Heading } from "./index";

runComponentCases(headingCases, (c) => h(Heading, caseProps(c), () => c.children));

describe("Heading", () => {
  it("renders an h2 by default", () => {
    const { container } = render(h(Heading, () => "Title"));
    const heading = container.firstElementChild as HTMLElement;
    expect(heading.tagName).toBe("H2");
    expect(heading).toHaveClass("mild-heading", "mild-heading--level-2", "mild-heading--semibold");
    expect(screen.getByRole("heading", { level: 2, name: "Title" })).toBe(heading);
  });

  it.each([1, 2, 3, 4, 5, 6] as const)("level %i renders the matching element", (level) => {
    render(h(Heading, { level }, () => "Heading"));
    const heading = screen.getByRole("heading", { level });
    expect(heading.tagName).toBe(`H${level}`);
    expect(heading).toHaveClass(`mild-heading--level-${level}`);
  });

  it("keeps the level class when the size is overridden", () => {
    render(h(Heading, { level: 1, size: "lg" }, () => "Small but first"));
    expect(screen.getByRole("heading", { level: 1 })).toHaveClass(
      "mild-heading--level-1",
      "mild-heading--lg",
    );
  });

  it("renders a non-heading element with `as`", () => {
    const { container } = render(h(Heading, { as: "div", level: 3 }, () => "Label"));
    const element = container.firstElementChild as HTMLElement;
    expect(element.tagName).toBe("DIV");
    expect(screen.queryByRole("heading")).toBeNull();
    expect(element).toHaveClass("mild-heading--level-3");
  });

  it("maps weight, alignment, color and truncation onto modifiers", () => {
    render(
      h(
        Heading,
        { weight: "bold", align: "right", color: "danger", truncate: true },
        () => "Styled",
      ),
    );
    expect(screen.getByRole("heading")).toHaveClass(
      "mild-heading--bold",
      "mild-heading--right",
      "mild-heading--danger",
      "mild-heading--truncate",
    );
  });
});

itHasNoSeriousAxeViolations("Heading", () =>
  h("div", [
    h(Heading, { level: 1 }, () => "Page"),
    h(Heading, { level: 2, size: "xl", color: "muted" }, () => "Section"),
    h(Heading, { as: "div", level: 3 }, () => "Label"),
  ]),
);
