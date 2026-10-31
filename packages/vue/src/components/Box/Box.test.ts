import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { boxCases } from "@mild-ui/test-cases/box";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Box } from "./index";

runComponentCases(boxCases, (c) => h(Box, caseProps(c), () => c.children));

describe("Box", () => {
  it("renders a div by default with no inline style", () => {
    const { container } = render(h(Box, () => "content"));
    expect(container.firstElementChild?.tagName).toBe("DIV");
    expect(container.firstElementChild).toHaveClass("mild-box", "mild-box--block");
    expect(container.firstElementChild).not.toHaveAttribute("style");
  });

  it("renders the element given with `as` and forwards its attributes", () => {
    render(h(Box, { as: "section", "aria-label": "Main" }, () => "content"));
    const section = screen.getByRole("region", { name: "Main" });
    expect(section.tagName).toBe("SECTION");
  });

  it("maps layout props onto modifier classes", () => {
    const { container } = render(
      h(Box, {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        overflowX: "auto",
        overflowY: "scroll",
      }),
    );
    expect(container.firstElementChild).toHaveClass(
      "mild-box--flex",
      "mild-box--flex-column",
      "mild-box--flex-wrap",
      "mild-box--items-start",
      "mild-box--justify-between",
      "mild-box--relative",
      "mild-box--overflow-hidden",
      "mild-box--overflow-x-auto",
      "mild-box--overflow-y-scroll",
    );
  });

  it("maps token style props onto themed custom properties", () => {
    const { container } = render(
      h(Box, {
        padding: "4",
        marginX: "2",
        gap: "1-5",
        width: "1/2",
        maxHeight: "64",
        borderRadius: "lg",
        backgroundColor: "primary-500",
        color: "white",
        zIndex: 10,
      }),
    );
    const box = container.firstElementChild as HTMLElement;
    expect(box.style.padding).toBe("var(--mild-space-4, 1rem)");
    expect(box.style.marginLeft).toBe("var(--mild-space-2, 0.5rem)");
    expect(box.style.marginRight).toBe("var(--mild-space-2, 0.5rem)");
    expect(box.style.gap).toBe("var(--mild-space-1-5, 0.375rem)");
    expect(box.style.width).toBe("var(--mild-dimension-1-2, 50%)");
    expect(box.style.maxHeight).toBe("var(--mild-space-64, 16rem)");
    expect(box.style.borderRadius).toBe("var(--mild-radius-lg, 0.5rem)");
    expect(box.style.backgroundColor).toBe("var(--mild-color-primary-500)");
    expect(box.style.color).toBe("var(--mild-color-white)");
    expect(box.style.zIndex).toBe("10");
  });

  it("maps every remaining spacing, sizing, border and position prop", () => {
    const { container } = render(
      h(Box, {
        paddingX: "1",
        paddingY: "2",
        paddingTop: "3",
        paddingRight: "4",
        paddingBottom: "5",
        paddingLeft: "6",
        margin: "7",
        marginY: "8",
        marginTop: "9",
        marginRight: "10",
        marginBottom: "11",
        marginLeft: "12",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto",
        gridGap: "2",
        height: "full",
        minWidth: "1/4",
        minHeight: "px",
        maxWidth: "3/4",
        borderWidth: "px",
        borderColor: "gray-200",
        top: "0",
        right: "1",
        bottom: "2",
        left: "3",
      }),
    );
    const box = container.firstElementChild as HTMLElement;
    expect(box.style.paddingTop).toBe("var(--mild-space-3, 0.75rem)");
    expect(box.style.paddingRight).toBe("var(--mild-space-4, 1rem)");
    expect(box.style.paddingBottom).toBe("var(--mild-space-5, 1.25rem)");
    expect(box.style.paddingLeft).toBe("var(--mild-space-6, 1.5rem)");
    expect(box.style.marginTop).toBe("var(--mild-space-9, 2.25rem)");
    expect(box.style.marginRight).toBe("var(--mild-space-10, 2.5rem)");
    expect(box.style.marginBottom).toBe("var(--mild-space-11, 2.75rem)");
    expect(box.style.marginLeft).toBe("var(--mild-space-12, 3rem)");
    expect(box.style.gridTemplateColumns).toBe("1fr 1fr");
    expect(box.style.gridTemplateRows).toBe("auto");
    expect(box.style.gap).toBe("var(--mild-space-2, 0.5rem)");
    expect(box.style.height).toBe("var(--mild-dimension-full, 100%)");
    expect(box.style.minWidth).toBe("var(--mild-dimension-1-4, 25%)");
    expect(box.style.minHeight).toBe("var(--mild-space-px, 1px)");
    expect(box.style.maxWidth).toBe("var(--mild-dimension-3-4, 75%)");
    expect(box.style.borderWidth).toBe("var(--mild-space-px, 1px)");
    expect(box.style.borderColor).toBe("var(--mild-color-gray-200)");
    expect(box.style.top).toBe("var(--mild-space-0, 0px)");
    expect(box.style.right).toBe("var(--mild-space-1, 0.25rem)");
    expect(box.style.bottom).toBe("var(--mild-space-2, 0.5rem)");
    expect(box.style.left).toBe("var(--mild-space-3, 0.75rem)");
  });
});

itHasNoSeriousAxeViolations("Box", () =>
  h("div", [
    h(Box, { padding: "4" }, () => "Padded"),
    h(Box, { as: "nav", "aria-label": "Site", display: "flex", gap: "2" }, () => [
      h("a", { href: "#a" }, "A"),
      h("a", { href: "#b" }, "B"),
    ]),
  ]),
);
