import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { List, ListItem } from "./List";

describe("List", () => {
  it("renders a ul without a marker modifier by default", () => {
    render(
      <List>
        <ListItem>one</ListItem>
      </List>,
    );
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("UL");
    expect(list).toHaveClass("mild-list");
    expect(list.className).not.toMatch(/marker/);
    expect(list.getAttribute("style")).toBeNull();
  });

  it("renders an ol numbered by default when ordered", () => {
    const { container } = render(<List ordered>items</List>);
    const list = container.firstElementChild as HTMLElement;
    expect(list.tagName).toBe("OL");
    expect(list).toHaveClass("mild-list--marker-decimal");
  });

  it("keeps the element from `as` while numbering", () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(<List as="div" ref={ref} marker="square" />);
    const list = container.firstElementChild as HTMLElement;
    expect(list.tagName).toBe("DIV");
    expect(ref.current).toBe(list);
    expect(list).toHaveClass("mild-list--marker-square");
  });

  it("drops the marker when unstyled", () => {
    const { container } = render(<List unstyled marker="disc" />);
    const list = container.firstElementChild as HTMLElement;
    expect(list).toHaveClass("mild-list--unstyled");
    expect(list.className).not.toMatch(/marker-disc/);
  });

  it("maps the spacing token onto the list's custom property", () => {
    const { container } = render(<List spacing="3" />);
    const list = container.firstElementChild as HTMLElement;
    expect(list.style.getPropertyValue("--mild-list-spacing")).toBe("var(--mild-space-3, 0.75rem)");
  });
});

describe("ListItem", () => {
  it("renders an li", () => {
    render(
      <List>
        <ListItem>one</ListItem>
      </List>,
    );
    const item = screen.getByRole("listitem");
    expect(item.tagName).toBe("LI");
    expect(item).toHaveClass("mild-list-item");
    expect(item.querySelector(".mild-list-item__icon")).toBeNull();
  });

  it("renders a decorative icon instead of the marker", () => {
    render(
      <List unstyled>
        <ListItem icon={<svg data-testid="glyph" />}>done</ListItem>
      </List>,
    );
    const item = screen.getByRole("listitem");
    const icon = item.querySelector(".mild-list-item__icon");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon?.querySelector("[data-testid='glyph']")).toBeInTheDocument();
    expect(item).toHaveTextContent("done");
  });

  it("forwards its ref and merges className", () => {
    const ref = React.createRef<HTMLLIElement>();
    render(
      <List>
        <ListItem ref={ref} className="custom-item">
          one
        </ListItem>
      </List>,
    );
    expect(ref.current).toBe(screen.getByRole("listitem"));
    expect(ref.current).toHaveClass("mild-list-item", "custom-item");
  });
});
