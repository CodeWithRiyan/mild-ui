import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Nav, NavItem, NavLink } from "./Nav";

function renderNav(props: Partial<React.ComponentProps<typeof Nav>> = {}) {
  return render(
    <Nav aria-label="Primary" {...props}>
      <NavItem>
        <NavLink href="/">Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/docs" active>
          Docs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/pricing" disabled>
          Pricing
        </NavLink>
      </NavItem>
    </Nav>,
  );
}

describe("Nav", () => {
  it("renders nav > ul > li > a with an accessible name", () => {
    renderNav();
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(nav.tagName).toBe("NAV");
    const list = within(nav).getByRole("list");
    expect(list.tagName).toBe("UL");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0].tagName).toBe("LI");
    expect(items[0].firstElementChild?.tagName).toBe("A");
  });

  it("marks only the active link with aria-current", () => {
    const { container } = renderNav();
    const current = container.querySelectorAll("[aria-current]");
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute("aria-current", "page");
    expect(current[0]).toHaveTextContent("Docs");
    expect(current[0]).toHaveClass("mild-nav-link--active");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });

  it("applies variant and orientation classes (plain and horizontal by default)", () => {
    const { rerender } = renderNav();
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("mild-nav", "mild-nav--plain", "mild-nav--horizontal");
    rerender(<Nav aria-label="Primary" variant="underline" orientation="vertical" />);
    expect(nav).toHaveClass("mild-nav--underline", "mild-nav--vertical");
  });

  it("renders a disabled item as non-focusable text, not a link", () => {
    renderNav();
    expect(screen.queryByRole("link", { name: "Pricing" })).toBeNull();
    const disabled = screen.getByText("Pricing");
    expect(disabled.tagName).toBe("SPAN");
    expect(disabled).toHaveAttribute("aria-disabled", "true");
    expect(disabled).not.toHaveAttribute("href");
    expect(disabled).not.toHaveAttribute("tabindex");
    expect(disabled).toHaveClass("mild-nav-link--disabled");
  });

  it("keeps links in the normal tab order without roving tabindex", () => {
    renderNav();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    for (const link of links) expect(link).not.toHaveAttribute("tabindex");
    expect(screen.queryByRole("tablist")).toBeNull();
    expect(screen.queryByRole("tab")).toBeNull();
  });

  it("asChild passes props through to the child link", () => {
    const onClick = vi.fn((event: React.MouseEvent) => event.preventDefault());
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <Nav aria-label="Primary">
        <NavItem>
          <NavLink asChild active className="extra" data-testid="slot">
            <a href="/router" className="router-link" ref={ref} onClick={onClick}>
              Router
            </a>
          </NavLink>
        </NavItem>
      </Nav>,
    );
    const link = screen.getByRole("link", { name: "Router" });
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(link).toBe(ref.current);
    expect(link).toHaveAttribute("href", "/router");
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link).toHaveAttribute("data-testid", "slot");
    expect(link).toHaveClass("mild-nav-link", "mild-nav-link--active", "extra", "router-link");
    fireEvent.click(link);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("asChild + disabled renders text, not the child", () => {
    render(
      <Nav aria-label="Primary">
        <NavItem>
          <NavLink asChild disabled>
            <a href="/x">Nope</a>
          </NavLink>
        </NavItem>
      </Nav>,
    );
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("Nope")).toHaveAttribute("aria-disabled", "true");
  });
});
