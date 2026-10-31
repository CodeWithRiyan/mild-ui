import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollArea } from "./ScrollArea";

describe("ScrollArea", () => {
  it("renders a focusable vertical scroll div by default", () => {
    const { container } = render(<ScrollArea>content</ScrollArea>);
    const area = container.firstElementChild as HTMLElement;
    expect(area.tagName).toBe("DIV");
    expect(area).toHaveClass("mild-scroll-area", "mild-scroll-area--vertical");
    expect(area.className).not.toMatch(/mild-scroll-area--(auto|always|hover|hidden)/);
    expect(area).toHaveAttribute("tabindex", "0");
    expect(area.getAttribute("style")).toBeNull();
  });

  it("renders the element given with `as` and forwards its props and ref", () => {
    const ref = React.createRef<HTMLUListElement>();
    render(
      <ScrollArea as="ul" ref={ref} aria-label="Results" orientation="horizontal">
        <li>one</li>
      </ScrollArea>,
    );
    const list = screen.getByRole("list", { name: "Results" });
    expect(list.tagName).toBe("UL");
    expect(ref.current).toBe(list);
    expect(list).toHaveClass("mild-scroll-area--horizontal");
  });

  it("maps the scrollbar mode onto a modifier", () => {
    const { container } = render(<ScrollArea scrollbars="hover" orientation="both" />);
    expect(container.firstElementChild).toHaveClass(
      "mild-scroll-area--both",
      "mild-scroll-area--hover",
    );
  });

  it("maps dimension tokens onto themed custom properties", () => {
    const { container } = render(<ScrollArea height="64" maxHeight="96" maxWidth="full" />);
    const area = container.firstElementChild as HTMLElement;
    expect(area.style.height).toBe("var(--mild-space-64, 16rem)");
    expect(area.style.maxHeight).toBe("var(--mild-space-96, 24rem)");
    expect(area.style.maxWidth).toBe("var(--mild-dimension-full, 100%)");
  });

  it("lets the caller override tabIndex and merge a style", () => {
    const { container } = render(<ScrollArea tabIndex={-1} style={{ padding: "4px" }} />);
    const area = container.firstElementChild as HTMLElement;
    expect(area).toHaveAttribute("tabindex", "-1");
    expect(area.style.padding).toBe("4px");
  });
});
