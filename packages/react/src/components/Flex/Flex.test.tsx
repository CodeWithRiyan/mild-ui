import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Flex } from "./Flex";

describe("Flex", () => {
  it("renders a row div without inline style by default", () => {
    const { container } = render(<Flex>content</Flex>);
    const flex = container.firstElementChild as HTMLElement;
    expect(flex.tagName).toBe("DIV");
    expect(flex).toHaveClass("mild-flex", "mild-flex--row");
    expect(flex.getAttribute("style")).toBeNull();
  });

  it("renders the element given with `as` and forwards its props and ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Flex as="nav" ref={ref} aria-label="Main">
        links
      </Flex>,
    );
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav.tagName).toBe("NAV");
    expect(ref.current).toBe(nav);
  });

  it("maps the gap token and flex keywords onto the stylesheet's modifiers", () => {
    const { container } = render(
      <Flex gap="3" direction="column-reverse" wrap align="baseline" justify="flex-end" inline />,
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
    const { container } = render(<Flex gap="1" style={{ minHeight: "10px" }} />);
    const flex = container.firstElementChild as HTMLElement;
    expect(flex.style.gap).toBe("var(--mild-space-1, 0.25rem)");
    expect(flex.style.minHeight).toBe("10px");
  });
});
