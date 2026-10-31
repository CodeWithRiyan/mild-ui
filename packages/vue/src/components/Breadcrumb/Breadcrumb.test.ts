import { h } from "vue";
import { fireEvent, render, screen, within } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { breadcrumbCases } from "@mild-ui/test-cases/breadcrumb";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "./index";

const trail = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Breadcrumb" },
];

runComponentCases(breadcrumbCases, (c) => h(Breadcrumb, caseProps(c)));

describe("Breadcrumb", () => {
  it("renders a labelled nav around an ordered list", () => {
    render(h(Breadcrumb, { items: trail }));
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav.tagName).toBe("NAV");
    const list = within(nav).getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(list).toHaveClass("mild-breadcrumb__list");
  });

  it("links every step except the current page", () => {
    render(h(Breadcrumb, { items: trail }));
    const links = screen.getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual(["Home", "Docs"]);
    expect(links[0]).toHaveAttribute("href", "/");

    const current = screen.getByText("Breadcrumb");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.tagName).toBe("SPAN");
  });

  it("inserts a decorative separator between the steps only", () => {
    const { container } = render(h(Breadcrumb, { items: trail, separator: "›" }));
    const separators = container.querySelectorAll(".mild-breadcrumb-separator");
    expect(separators).toHaveLength(trail.length - 1);
    for (const separator of separators) {
      expect(separator.tagName).toBe("LI");
      expect(separator).toHaveAttribute("aria-hidden", "true");
      expect(separator).toHaveTextContent("›");
    }
  });

  it("takes a rich separator from the slot", () => {
    const { container } = render(
      h(Breadcrumb, { items: trail }, { separator: () => h("i", { "data-testid": "glyph" }) }),
    );
    expect(
      container.querySelectorAll(".mild-breadcrumb-separator [data-testid=glyph]"),
    ).toHaveLength(2);
  });

  it("marks an item current even when it has an href", () => {
    render(
      h(Breadcrumb, {
        items: [
          { label: "Home", href: "/" },
          { label: "Docs", href: "/docs", current: true },
        ],
      }),
    );
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByText("Docs")).toHaveAttribute("aria-current", "page");
  });

  it("keeps the last item a link when it has an href", () => {
    const { container } = render(
      h(Breadcrumb, {
        items: [
          { label: "Home", href: "/" },
          { label: "Docs", href: "/docs" },
        ],
      }),
    );
    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(container.querySelector("[aria-current=page]")).toBeNull();
  });

  it("renders composed children and separates them too", () => {
    const { container } = render(
      asComponent(() =>
        h(Breadcrumb, () => [
          h(BreadcrumbItem, () => h(BreadcrumbLink, { href: "/" }, () => "Home")),
          null,
          "  ",
          [h(BreadcrumbItem, () => h(BreadcrumbLink, { current: true }, () => "Docs"))],
        ]),
      ),
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(container.querySelectorAll(".mild-breadcrumb-separator")).toHaveLength(1);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByText("Docs")).toHaveAttribute("aria-current", "page");
  });

  it("lets the caller rename the landmark", () => {
    render(h(Breadcrumb, { items: trail, "aria-label": "You are here" }));
    expect(screen.getByRole("navigation", { name: "You are here" }).tagName).toBe("NAV");
  });

  it("renders the element given with `as`", () => {
    const { container } = render(h(Breadcrumb, { as: "div", items: trail }));
    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe("DIV");
    expect(root).toHaveClass("mild-breadcrumb");
    // The landmark role comes from the <nav> element, so a div is only the styled wrapper.
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("styles the inner parts through `ui`", () => {
    const { container } = render(
      h(Breadcrumb, { items: trail, ui: { list: "custom-list", separator: "custom-separator" } }),
    );
    expect(container.querySelector("ol")).toHaveClass("mild-breadcrumb__list", "custom-list");
    expect(container.querySelector(".mild-breadcrumb-separator")).toHaveClass("custom-separator");
  });
});

describe("BreadcrumbSeparator", () => {
  it("defaults to a slash", () => {
    render(asComponent(() => h("ul", [h(BreadcrumbSeparator)])));
    const separator = screen.getByText("/");
    expect(separator).toHaveClass("mild-breadcrumb-separator");
    expect(separator).toHaveAttribute("aria-hidden", "true");
  });
});

describe("BreadcrumbLink", () => {
  it("renders a plain link by default", () => {
    render(h(BreadcrumbLink, { href: "/docs" }, () => "Docs"));
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveClass("mild-link", "mild-link--plain", "mild-breadcrumb-link");
  });

  it("renders the current page as text, as the element given with `as`", () => {
    render(h(BreadcrumbLink, { current: true, as: "strong" }, () => "Here"));
    expect(screen.queryByRole("link")).toBeNull();
    const page = screen.getByText("Here");
    expect(page.tagName).toBe("STRONG");
    expect(page).toHaveClass("mild-breadcrumb-page");
    expect(page).toHaveAttribute("aria-current", "page");
  });

  it("re-emits click", async () => {
    const onClick = vi.fn((event: MouseEvent) => event.preventDefault());
    render(h(BreadcrumbLink, { href: "/", onClick }, () => "Home"));
    await fireEvent.click(screen.getByRole("link"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

itHasNoSeriousAxeViolations("Breadcrumb", () =>
  h("div", [
    h(Breadcrumb, { items: trail }),
    h(Breadcrumb, { items: trail, separator: "›", "aria-label": "Trail" }),
  ]),
);
