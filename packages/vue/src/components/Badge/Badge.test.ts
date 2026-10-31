import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { badgeCases } from "@mild-ui/test-cases/badge";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Badge } from "./index";

runComponentCases(badgeCases, (c) => h(Badge, caseProps(c), () => c.children));

describe("Badge", () => {
  it("renders a span with the default classes", () => {
    const { container } = render(h(Badge, () => "New"));
    const badge = container.firstElementChild as HTMLElement;
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass(
      "mild-badge",
      "mild-badge--subtle",
      "mild-badge--gray",
      "mild-badge--md",
    );
    expect(badge.querySelector(".mild-badge__dot")).toBeNull();
  });

  it("renders the element given with `as` and a decorative dot", () => {
    render(h(Badge, { as: "li", dot: true, pill: true }, () => "Live"));
    const badge = screen.getByRole("listitem");
    expect(badge).toHaveClass("mild-badge--pill");
    expect(badge.querySelector(".mild-badge__dot")).toHaveAttribute("aria-hidden", "true");
  });
});

itHasNoSeriousAxeViolations("Badge", () =>
  h("p", [
    h(Badge, () => "New"),
    h(Badge, { variant: "solid", colorScheme: "success", dot: true }, () => "Live"),
    h(Badge, { variant: "outline", colorScheme: "danger", size: "sm" }, () => "Error"),
  ]),
);
