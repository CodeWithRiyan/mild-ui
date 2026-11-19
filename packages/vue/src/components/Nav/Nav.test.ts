import { defineComponent, h } from "vue";
import { fireEvent, render, screen, within } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { navCases } from "@mild-ui/test-cases/nav";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Nav, NavItem, NavLink } from "./index";

runComponentCases(navCases, (c) => h(Nav, caseProps(c)));

function createNav(navProps: Record<string, unknown> = {}) {
  return h(Nav, { "aria-label": "Primary", ...navProps }, () => [
    h(NavItem, () => h(NavLink, { href: "/" }, () => "Home")),
    h(NavItem, () => h(NavLink, { href: "/docs", active: true }, () => "Docs")),
    h(NavItem, () => h(NavLink, { href: "/pricing", disabled: true }, () => "Pricing")),
  ]);
}

describe("Nav", () => {
  it("renders nav > ul > li > a with an accessible name", () => {
    render(asComponent(() => createNav()));
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
    const { container } = render(asComponent(() => createNav()));
    const current = container.querySelectorAll("[aria-current]");
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute("aria-current", "page");
    expect(current[0]).toHaveTextContent("Docs");
    expect(current[0]).toHaveClass("mild-nav-link--active");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });

  it("renders a disabled item as non-focusable text, not a link", () => {
    render(asComponent(() => createNav()));
    expect(screen.queryByRole("link", { name: "Pricing" })).toBeNull();
    const disabled = screen.getByText("Pricing");
    expect(disabled.tagName).toBe("SPAN");
    expect(disabled).toHaveAttribute("aria-disabled", "true");
    expect(disabled).not.toHaveAttribute("href");
    expect(disabled).not.toHaveAttribute("tabindex");
    expect(disabled).toHaveClass("mild-nav-link--disabled");
  });

  it("keeps links in the normal tab order without roving tabindex", () => {
    render(asComponent(() => createNav()));
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    for (const link of links) expect(link).not.toHaveAttribute("tabindex");
    expect(screen.queryByRole("tablist")).toBeNull();
    expect(screen.queryByRole("tab")).toBeNull();
  });

  it("a custom `as` component receives href, class and aria-current", async () => {
    const received: Record<string, unknown>[] = [];
    const RouterLinkStub = defineComponent({
      name: "RouterLinkStub",
      inheritAttrs: false,
      props: { to: { type: String, required: true } },
      setup(props, { attrs, slots }) {
        return () => {
          received.push({ ...attrs });
          return h("a", { ...attrs, href: props.to }, slots.default?.());
        };
      },
    });
    const onClick = vi.fn();
    render(
      asComponent(() =>
        h(Nav, { "aria-label": "Primary" }, () =>
          h(NavItem, () =>
            h(
              NavLink,
              { as: RouterLinkStub, to: "/router", active: true, onClick },
              () => "Router",
            ),
          ),
        ),
      ),
    );
    const link = screen.getByRole("link", { name: "Router" });
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(link).toHaveAttribute("href", "/router");
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link).toHaveClass("mild-nav-link", "mild-nav-link--active");
    await fireEvent.click(link);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("`as` + disabled renders text, not the custom component", () => {
    const Custom = defineComponent({ render: () => h("a", { href: "/x" }, "custom") });
    render(
      asComponent(() =>
        h(Nav, () => h(NavItem, () => h(NavLink, { as: Custom, disabled: true }, () => "Nope"))),
      ),
    );
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("Nope")).toHaveAttribute("aria-disabled", "true");
  });
});

itHasNoSeriousAxeViolations("Nav", () => createNav({ variant: "pills" }));
