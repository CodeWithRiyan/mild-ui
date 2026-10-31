import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { listCases } from "@mild-ui/test-cases/list";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { List, ListItem } from "./index";

runComponentCases(listCases, (c) => h(List, caseProps(c), () => h(ListItem, () => c.children)));

describe("List", () => {
  it("renders a ul without a marker modifier by default", () => {
    render(asComponent(() => h(List, () => h(ListItem, () => "one"))));
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("UL");
    expect(list).toHaveClass("mild-list");
    expect(list.className).not.toMatch(/marker/);
    expect(list.getAttribute("style")).toBeNull();
  });

  it("renders an ol numbered by default when ordered", () => {
    const { container } = render(h(List, { ordered: true }, () => "items"));
    const list = container.firstElementChild as HTMLElement;
    expect(list.tagName).toBe("OL");
    expect(list).toHaveClass("mild-list--marker-decimal");
  });

  it("keeps the element from `as` while numbering", () => {
    const { container } = render(h(List, { as: "div", marker: "square" }));
    const list = container.firstElementChild as HTMLElement;
    expect(list.tagName).toBe("DIV");
    expect(list).toHaveClass("mild-list--marker-square");
  });

  it("drops the marker when unstyled", () => {
    const { container } = render(h(List, { unstyled: true, marker: "disc" }));
    const list = container.firstElementChild as HTMLElement;
    expect(list).toHaveClass("mild-list--unstyled");
    expect(list.className).not.toMatch(/marker-disc/);
  });

  it("maps the spacing token onto the list's custom property", () => {
    const { container } = render(h(List, { spacing: "3" }));
    const list = container.firstElementChild as HTMLElement;
    expect(list.style.getPropertyValue("--mild-list-spacing")).toBe("var(--mild-space-3, 0.75rem)");
  });
});

describe("ListItem", () => {
  it("renders an li", () => {
    render(asComponent(() => h(List, () => h(ListItem, () => "one"))));
    const item = screen.getByRole("listitem");
    expect(item.tagName).toBe("LI");
    expect(item).toHaveClass("mild-list-item");
    expect(item.querySelector(".mild-list-item__icon")).toBeNull();
  });

  it("renders a decorative icon instead of the marker", () => {
    render(
      asComponent(() =>
        h(List, { unstyled: true }, () =>
          h(ListItem, null, {
            default: () => "done",
            icon: () => h("svg", { "data-testid": "glyph" }),
          }),
        ),
      ),
    );
    const item = screen.getByRole("listitem");
    const icon = item.querySelector(".mild-list-item__icon");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon?.querySelector("[data-testid='glyph']")).toBeInTheDocument();
    expect(item).toHaveTextContent("done");
  });

  it("renders the element given with `as` and merges a class", () => {
    render(
      asComponent(() =>
        h(List, { as: "div" }, () => h(ListItem, { as: "div", class: "custom-item" }, () => "one")),
      ),
    );
    expect(screen.getByText("one")).toHaveClass("mild-list-item", "custom-item");
    expect(screen.getByText("one").tagName).toBe("DIV");
  });
});

itHasNoSeriousAxeViolations("List", () =>
  h("div", [
    h(List, () => [h(ListItem, () => "One"), h(ListItem, () => "Two")]),
    h(List, { ordered: true, marker: "lower-alpha", spacing: "2" }, () => [
      h(ListItem, () => "A"),
      h(ListItem, null, { default: () => "B", icon: () => h("svg") }),
    ]),
  ]),
);
