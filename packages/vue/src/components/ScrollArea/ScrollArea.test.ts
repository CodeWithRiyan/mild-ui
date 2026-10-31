import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { scrollAreaCases } from "@mild-ui/test-cases/scroll-area";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { ScrollArea } from "./index";

runComponentCases(scrollAreaCases, (c) => h(ScrollArea, caseProps(c), () => c.children));

describe("ScrollArea", () => {
  it("renders a focusable vertical scroll div by default", () => {
    const { container } = render(h(ScrollArea, () => "content"));
    const area = container.firstElementChild as HTMLElement;
    expect(area.tagName).toBe("DIV");
    expect(area).toHaveClass("mild-scroll-area", "mild-scroll-area--vertical");
    expect(area.className).not.toMatch(/mild-scroll-area--(auto|always|hover|hidden)/);
    expect(area).toHaveAttribute("tabindex", "0");
    expect(area.getAttribute("style")).toBeNull();
  });

  it("renders the element given with `as` and forwards its attributes", () => {
    render(
      h(ScrollArea, { as: "ul", "aria-label": "Results", orientation: "horizontal" }, () =>
        h("li", "one"),
      ),
    );
    const list = screen.getByRole("list", { name: "Results" });
    expect(list.tagName).toBe("UL");
    expect(list).toHaveClass("mild-scroll-area--horizontal");
  });

  it("maps the scrollbar mode onto a modifier", () => {
    const { container } = render(h(ScrollArea, { scrollbars: "hover", orientation: "both" }));
    expect(container.firstElementChild).toHaveClass(
      "mild-scroll-area--both",
      "mild-scroll-area--hover",
    );
  });

  it("maps dimension tokens onto themed custom properties", () => {
    const { container } = render(
      h(ScrollArea, { height: "64", maxHeight: "96", maxWidth: "full" }),
    );
    const area = container.firstElementChild as HTMLElement;
    expect(area.style.height).toBe("var(--mild-space-64, 16rem)");
    expect(area.style.maxHeight).toBe("var(--mild-space-96, 24rem)");
    expect(area.style.maxWidth).toBe("var(--mild-dimension-full, 100%)");
  });

  it("lets the caller override tabindex and merge a style", () => {
    const { container } = render(h(ScrollArea, { tabindex: -1, style: { padding: "4px" } }));
    const area = container.firstElementChild as HTMLElement;
    expect(area).toHaveAttribute("tabindex", "-1");
    expect(area.style.padding).toBe("4px");
  });
});

itHasNoSeriousAxeViolations("ScrollArea", () =>
  h("div", [
    h(ScrollArea, { maxHeight: "32", role: "region", "aria-label": "Log" }, () => h("p", "Lines")),
    h(ScrollArea, { as: "ul", orientation: "horizontal", "aria-label": "Chips" }, () => [
      h("li", "A"),
      h("li", "B"),
    ]),
  ]),
);
