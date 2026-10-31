import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Box } from "./Box";

describe("Box", () => {
  it("renders a div by default", () => {
    const { container } = render(<Box>content</Box>);
    expect(container.firstElementChild?.tagName).toBe("DIV");
    expect(container.firstElementChild).toHaveClass("mild-box", "mild-box--block");
  });

  it("renders the element given with `as` and forwards its props and ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Box as="section" ref={ref} aria-label="Main">
        content
      </Box>,
    );
    const section = screen.getByRole("region", { name: "Main" });
    expect(section.tagName).toBe("SECTION");
    expect(ref.current).toBe(section);
  });

  it("maps token style props onto themed custom properties", () => {
    const { container } = render(
      <Box
        padding="4"
        marginX="2"
        gap="1-5"
        width="1/2"
        maxHeight="64"
        borderRadius="lg"
        backgroundColor="primary-500"
        color="white"
        zIndex={10}
      />,
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

  it("maps flex keywords onto the stylesheet's short modifiers", () => {
    const { container } = render(
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" />,
    );
    expect(container.firstElementChild).toHaveClass(
      "mild-box--flex",
      "mild-box--items-start",
      "mild-box--justify-between",
    );
  });

  it("sets no inline style when no style prop is given", () => {
    const { container } = render(<Box display="flex" alignItems="center" />);
    const box = container.firstElementChild as HTMLElement;
    expect(box).toHaveClass("mild-box--flex", "mild-box--items-center");
    expect(box.getAttribute("style")).toBeNull();
  });
});
