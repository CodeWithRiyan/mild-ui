import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "./Breadcrumb";

const trail = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Breadcrumb" },
];

describe("Breadcrumb", () => {
  it("renders a labelled nav around an ordered list", () => {
    render(<Breadcrumb items={trail} />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav.tagName).toBe("NAV");
    const list = within(nav).getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(list).toHaveClass("mild-breadcrumb__list");
  });

  it("links every step except the current page", () => {
    render(<Breadcrumb items={trail} />);
    const links = screen.getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual(["Home", "Docs"]);
    expect(links[0]).toHaveAttribute("href", "/");

    const current = screen.getByText("Breadcrumb");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.tagName).toBe("SPAN");
  });

  it("inserts a decorative separator between the steps only", () => {
    const { container } = render(<Breadcrumb items={trail} separator="›" />);
    const separators = container.querySelectorAll(".mild-breadcrumb-separator");
    expect(separators).toHaveLength(trail.length - 1);
    for (const separator of separators) {
      expect(separator.tagName).toBe("LI");
      expect(separator).toHaveAttribute("aria-hidden", "true");
      expect(separator).toHaveTextContent("›");
    }
  });

  it("marks an item current even when it has an href", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Docs", href: "/docs", current: true },
        ]}
      />,
    );
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByText("Docs")).toHaveAttribute("aria-current", "page");
  });

  it("keeps the last item a link when it has an href", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Docs", href: "/docs" },
        ]}
      />,
    );
    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(
      screen.queryByText((_, node) => node?.getAttribute("aria-current") === "page"),
    ).toBeNull();
  });

  it("renders composed children and separates them too", () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink current>Docs</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(container.querySelectorAll(".mild-breadcrumb-separator")).toHaveLength(1);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByText("Docs")).toHaveAttribute("aria-current", "page");
  });

  it("lets the caller rename the landmark", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Breadcrumb ref={ref} items={trail} aria-label="You are here" />);
    const nav = screen.getByRole("navigation", { name: "You are here" });
    expect(nav.tagName).toBe("NAV");
    expect(ref.current).toBe(nav);
  });

  it("renders the element given with `as` and forwards its ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(<Breadcrumb as="div" ref={ref} items={trail} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe("DIV");
    expect(ref.current).toBe(root);
    expect(root).toHaveClass("mild-breadcrumb");
    // The landmark role comes from the <nav> element, so a div is only the styled wrapper.
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("styles the inner parts through `ui`", () => {
    const { container } = render(
      <Breadcrumb items={trail} ui={{ list: "custom-list", separator: "custom-separator" }} />,
    );
    expect(container.querySelector("ol")).toHaveClass("mild-breadcrumb__list", "custom-list");
    expect(container.querySelector(".mild-breadcrumb-separator")).toHaveClass("custom-separator");
  });
});

describe("BreadcrumbSeparator", () => {
  it("defaults to a slash", () => {
    render(
      <ul>
        <BreadcrumbSeparator />
      </ul>,
    );
    const separator = screen.getByText("/");
    expect(separator).toHaveClass("mild-breadcrumb-separator");
    expect(separator).toHaveAttribute("aria-hidden", "true");
  });
});

describe("BreadcrumbLink", () => {
  it("renders a plain link by default and forwards its ref", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <BreadcrumbLink ref={ref} href="/docs">
        Docs
      </BreadcrumbLink>,
    );
    const link = screen.getByRole("link", { name: "Docs" });
    expect(ref.current).toBe(link);
    expect(link).toHaveClass("mild-link", "mild-link--plain", "mild-breadcrumb-link");
  });

  it("renders the current page as text", () => {
    render(<BreadcrumbLink current>Here</BreadcrumbLink>);
    expect(screen.queryByRole("link")).toBeNull();
    const page = screen.getByText("Here");
    expect(page).toHaveClass("mild-breadcrumb-page");
    expect(page).toHaveAttribute("aria-current", "page");
  });
});
