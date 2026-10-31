import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Grid, GridItem } from "./Grid";

describe("Grid", () => {
  it("renders a grid div without inline style by default", () => {
    const { container } = render(<Grid>content</Grid>);
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.tagName).toBe("DIV");
    expect(grid).toHaveClass("mild-grid");
    expect(grid.getAttribute("style")).toBeNull();
  });

  it("renders the element given with `as` and forwards its props and ref", () => {
    const ref = React.createRef<HTMLUListElement>();
    render(
      <Grid as="ul" ref={ref} columns={2} aria-label="Cards">
        <li>one</li>
      </Grid>,
    );
    const list = screen.getByRole("list", { name: "Cards" });
    expect(list.tagName).toBe("UL");
    expect(ref.current).toBe(list);
    expect(list).toHaveClass("mild-grid--cols-2");
  });

  it("emits a class per breakpoint for responsive columns", () => {
    const { container } = render(<Grid columns={{ base: 1, sm: 2, lg: 3, "2xl": 6 }} />);
    expect(container.firstElementChild).toHaveClass(
      "mild-grid--cols-1",
      "mild-grid--sm-cols-2",
      "mild-grid--lg-cols-3",
      "mild-grid--2xl-cols-6",
    );
  });

  it("accepts breakpoints only (no base) and custom templates", () => {
    const { container } = render(
      <Grid columns={{ md: 4 }} templateRows="auto 1fr" templateColumns="1fr 2fr" />,
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid).toHaveClass("mild-grid--md-cols-4");
    expect(grid.className).not.toMatch(/mild-grid--cols-/);
    expect(grid.style.gridTemplateRows).toBe("auto 1fr");
    expect(grid.style.gridTemplateColumns).toBe("1fr 2fr");
  });

  it("maps gap tokens onto themed custom properties", () => {
    const { container } = render(<Grid gap="4" columnGap="2" rowGap="8" />);
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gap).toBe("var(--mild-space-4, 1rem)");
    expect(grid.style.columnGap).toBe("var(--mild-space-2, 0.5rem)");
    expect(grid.style.rowGap).toBe("var(--mild-space-8, 2rem)");
  });
});

describe("GridItem", () => {
  it("renders a div that spans columns and rows", () => {
    const { container } = render(
      <GridItem colSpan={2} rowSpan="full">
        cell
      </GridItem>,
    );
    const item = container.firstElementChild as HTMLElement;
    expect(item.tagName).toBe("DIV");
    expect(item).toHaveClass(
      "mild-grid-item",
      "mild-grid-item--col-span-2",
      "mild-grid-item--row-span-full",
    );
  });

  it("emits a class per breakpoint for responsive spans", () => {
    const { container } = render(<GridItem colSpan={{ base: "full", md: 6, xl: 4 }} />);
    expect(container.firstElementChild).toHaveClass(
      "mild-grid-item--col-span-full",
      "mild-grid-item--md-col-span-6",
      "mild-grid-item--xl-col-span-4",
    );
  });

  it("renders the element given with `as` and forwards its ref", () => {
    const ref = React.createRef<HTMLLIElement>();
    render(
      <GridItem as="li" ref={ref} className="custom-item">
        cell
      </GridItem>,
    );
    const item = screen.getByRole("listitem");
    expect(ref.current).toBe(item);
    expect(item).toHaveClass("mild-grid-item", "custom-item");
  });
});
