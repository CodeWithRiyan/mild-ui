import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { gridCases } from "@mild-ui/test-cases/grid";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { asComponent } from "../../test-utils/render";
import { Grid, GridItem } from "./index";

runComponentCases(gridCases, (c) => h(Grid, caseProps(c), () => c.children));

describe("Grid", () => {
  it("renders a grid div without inline style by default", () => {
    const { container } = render(h(Grid, () => "content"));
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.tagName).toBe("DIV");
    expect(grid).toHaveClass("mild-grid");
    expect(grid.getAttribute("style")).toBeNull();
  });

  it("renders the element given with `as` and forwards its attributes", () => {
    render(h(Grid, { as: "ul", columns: 2, "aria-label": "Cards" }, () => h("li", "one")));
    const list = screen.getByRole("list", { name: "Cards" });
    expect(list.tagName).toBe("UL");
    expect(list).toHaveClass("mild-grid--cols-2");
  });

  it("emits a class per breakpoint for responsive columns", () => {
    const { container } = render(h(Grid, { columns: { base: 1, sm: 2, lg: 3, "2xl": 6 } }));
    expect(container.firstElementChild).toHaveClass(
      "mild-grid--cols-1",
      "mild-grid--sm-cols-2",
      "mild-grid--lg-cols-3",
      "mild-grid--2xl-cols-6",
    );
  });

  it("accepts breakpoints only (no base) and custom templates", () => {
    const { container } = render(
      h(Grid, { columns: { md: 4 }, templateRows: "auto 1fr", templateColumns: "1fr 2fr" }),
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid).toHaveClass("mild-grid--md-cols-4");
    expect(grid.className).not.toMatch(/mild-grid--cols-/);
    expect(grid.style.gridTemplateRows).toBe("auto 1fr");
    expect(grid.style.gridTemplateColumns).toBe("1fr 2fr");
  });

  it("maps gap tokens onto themed custom properties and merges a style", () => {
    const { container } = render(
      h(Grid, { gap: "4", columnGap: "2", rowGap: "8", style: { minHeight: "1px" } }),
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gap).toBe("var(--mild-space-4, 1rem)");
    expect(grid.style.columnGap).toBe("var(--mild-space-2, 0.5rem)");
    expect(grid.style.rowGap).toBe("var(--mild-space-8, 2rem)");
    expect(grid.style.minHeight).toBe("1px");
  });
});

describe("GridItem", () => {
  it("renders a div that spans columns and rows", () => {
    const { container } = render(h(GridItem, { colSpan: 2, rowSpan: "full" }, () => "cell"));
    const item = container.firstElementChild as HTMLElement;
    expect(item.tagName).toBe("DIV");
    expect(item).toHaveClass(
      "mild-grid-item",
      "mild-grid-item--col-span-2",
      "mild-grid-item--row-span-full",
    );
  });

  it("emits a class per breakpoint for responsive spans", () => {
    const { container } = render(h(GridItem, { colSpan: { base: "full", md: 6, xl: 4 } }));
    expect(container.firstElementChild).toHaveClass(
      "mild-grid-item--col-span-full",
      "mild-grid-item--md-col-span-6",
      "mild-grid-item--xl-col-span-4",
    );
  });

  it("renders the element given with `as` and merges a class", () => {
    render(
      asComponent(() => h("ul", [h(GridItem, { as: "li", class: "custom-item" }, () => "cell")])),
    );
    const item = screen.getByRole("listitem");
    expect(item).toHaveClass("mild-grid-item", "custom-item");
  });

  it("renders plainly without spans", () => {
    const { container } = render(h(GridItem, () => "cell"));
    expect(container.firstElementChild?.className).toBe("mild-grid-item");
  });
});

itHasNoSeriousAxeViolations("Grid", () =>
  h("div", [
    h(Grid, { columns: { base: 1, md: 3 }, gap: "4" }, () => [
      h(GridItem, { colSpan: 2 }, () => "Wide"),
      h(GridItem, () => "Narrow"),
    ]),
    h(Grid, { as: "ul", "aria-label": "Cards", columns: 2 }, () => [
      h(GridItem, { as: "li" }, () => "A"),
      h(GridItem, { as: "li" }, () => "B"),
    ]),
  ]),
);
