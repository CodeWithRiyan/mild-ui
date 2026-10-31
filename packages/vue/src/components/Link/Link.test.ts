import { defineComponent, h } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { linkCases } from "@mild-ui/test-cases/link";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Link } from "./index";

runComponentCases(linkCases, (c) => h(Link, caseProps(c), () => c.children));

describe("Link", () => {
  it("renders an anchor with the href", () => {
    render(h(Link, { href: "/docs" }, () => "Docs"));
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveClass("mild-link", "mild-link--underline-hover");
  });

  it("adds a safe rel for external links", () => {
    render(h(Link, { href: "https://example.com", external: true }, () => "Example"));
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("lets the caller override target and rel", () => {
    render(
      h(
        Link,
        { href: "https://example.com", external: true, target: "_self", rel: "nofollow" },
        () => "Example",
      ),
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_self");
    expect(link).toHaveAttribute("rel", "nofollow");
  });

  it("swallows clicks and drops the href when disabled", async () => {
    const onClick = vi.fn();
    render(h(Link, { href: "/docs", disabled: true, onClick }, () => "Docs"));
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("href");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");

    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    link.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("emits click when it is not disabled", async () => {
    // Default prevented so jsdom does not try to navigate.
    const onClick = vi.fn((event: MouseEvent) => event.preventDefault());
    render(h(Link, { href: "/docs", onClick }, () => "Docs"));
    await fireEvent.click(screen.getByRole("link"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders another element with `as` and forwards attributes", () => {
    render(h(Link, { as: "button", type: "button", underline: "always" }, () => "Act"));
    const button = screen.getByRole("button", { name: "Act" });
    expect(button).toHaveClass("mild-link", "mild-link--underline-always");
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders a router-like component with `as`", () => {
    const RouterLink = defineComponent({
      props: { to: { type: String, required: true } },
      setup:
        (props, { slots }) =>
        () =>
          h("a", { href: props.to, "data-router": "" }, slots.default?.()),
    });
    render(h(Link, { as: RouterLink, to: "/docs", plain: true }, () => "Docs"));
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("data-router", "");
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveClass("mild-link--plain");
  });
});

itHasNoSeriousAxeViolations("Link", () =>
  h("div", [
    h(Link, { href: "/docs" }, () => "Docs"),
    h(Link, { href: "https://example.com", external: true }, () => "External"),
    h(Link, { href: "/x", disabled: true }, () => "Disabled"),
  ]),
);
