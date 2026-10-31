import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stack } from "./Stack";

describe("Stack", () => {
  it("renders a column div with the default gap", () => {
    const { container } = render(<Stack>content</Stack>);
    const stack = container.firstElementChild as HTMLElement;
    expect(stack.tagName).toBe("DIV");
    expect(stack).toHaveClass("mild-stack", "mild-stack--column");
    expect(stack.style.gap).toBe("var(--mild-space-4, 1rem)");
  });

  it("renders the element given with `as` and forwards its props and ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Stack as="section" ref={ref} aria-label="Steps" direction="row">
        content
      </Stack>,
    );
    const section = screen.getByRole("region", { name: "Steps" });
    expect(section.tagName).toBe("SECTION");
    expect(ref.current).toBe(section);
    expect(section).toHaveClass("mild-stack--row");
  });

  it("maps gap tokens and flex keywords onto the stylesheet's modifiers", () => {
    const { container } = render(
      <Stack gap="2-5" align="flex-start" justify="space-around" wrap="wrap-reverse" />,
    );
    const stack = container.firstElementChild as HTMLElement;
    expect(stack.style.gap).toBe("var(--mild-space-2-5, 0.625rem)");
    expect(stack).toHaveClass(
      "mild-stack--items-start",
      "mild-stack--justify-around",
      "mild-stack--wrap-reverse",
    );
  });

  it("treats wrap={false} as no wrap modifier", () => {
    const { container } = render(<Stack wrap={false} />);
    const stack = container.firstElementChild as HTMLElement;
    expect(stack.className).not.toMatch(/wrap/);
  });

  it("keeps a caller-provided style next to the gap", () => {
    const { container } = render(<Stack style={{ minHeight: "10px" }} />);
    const stack = container.firstElementChild as HTMLElement;
    expect(stack.style.gap).toBe("var(--mild-space-4, 1rem)");
    expect(stack.style.minHeight).toBe("10px");
  });
});
