import { h } from "vue";
import { render } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { kbdCases } from "@mild-ui/test-cases/kbd";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Kbd } from "./index";

runComponentCases(kbdCases, (c) => h(Kbd, caseProps(c), () => c.children));

describe("Kbd", () => {
  it("renders a kbd element at the medium size", () => {
    const { container } = render(h(Kbd, () => "K"));
    const kbd = container.firstElementChild as HTMLElement;
    expect(kbd.tagName).toBe("KBD");
    expect(kbd).toHaveClass("mild-kbd", "mild-kbd--md");
    expect(kbd).toHaveTextContent("K");
  });

  it.each(["sm", "md", "lg"] as const)("size %s maps onto a modifier", (size) => {
    const { container } = render(h(Kbd, { size }, () => "K"));
    expect(container.firstElementChild).toHaveClass(`mild-kbd--${size}`);
  });

  it("renders the element given with `as` and forwards attributes", () => {
    const { container } = render(h(Kbd, { as: "span", title: "Command" }, () => "⌘"));
    const span = container.firstElementChild as HTMLElement;
    expect(span.tagName).toBe("SPAN");
    expect(span).toHaveAttribute("title", "Command");
  });
});

itHasNoSeriousAxeViolations("Kbd", () =>
  h("p", [h(Kbd, () => "⌘"), " + ", h(Kbd, { size: "sm" }, () => "K")]),
);
