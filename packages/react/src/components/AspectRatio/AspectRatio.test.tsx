import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AspectRatio, toCssAspectRatio } from "./AspectRatio";

describe("AspectRatio", () => {
  it("renders a square div by default", () => {
    const { container } = render(
      <AspectRatio>
        <img alt="Cover" src="cover.png" />
      </AspectRatio>,
    );
    const box = container.firstElementChild as HTMLElement;
    expect(box.tagName).toBe("DIV");
    expect(box).toHaveClass("mild-aspect-ratio");
    expect(box.style.getPropertyValue("--mild-aspect-ratio")).toBe("1");
    expect(screen.getByRole("img", { name: "Cover" }).parentElement).toBe(box);
  });

  it("renders the element given with `as` and forwards its props and ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(<AspectRatio as="figure" ref={ref} ratio={16 / 9} aria-label="Video" />);
    const figure = screen.getByRole("figure", { name: "Video" });
    expect(figure.tagName).toBe("FIGURE");
    expect(ref.current).toBe(figure);
  });

  it("accepts a numeric or a string ratio", () => {
    const { container, rerender } = render(<AspectRatio ratio={16 / 9} />);
    const box = container.firstElementChild as HTMLElement;
    expect(box.style.getPropertyValue("--mild-aspect-ratio")).toBe(String(16 / 9));

    rerender(<AspectRatio ratio="4/3" />);
    expect(box.style.getPropertyValue("--mild-aspect-ratio")).toBe("4 / 3");
  });

  it("merges a caller-provided style", () => {
    const { container } = render(<AspectRatio ratio={2} style={{ maxWidth: "20rem" }} />);
    const box = container.firstElementChild as HTMLElement;
    expect(box.style.getPropertyValue("--mild-aspect-ratio")).toBe("2");
    expect(box.style.maxWidth).toBe("20rem");
  });

  it("toCssAspectRatio formats both input forms", () => {
    expect(toCssAspectRatio(1.5)).toBe("1.5");
    expect(toCssAspectRatio("21/9")).toBe("21 / 9");
    expect(toCssAspectRatio(" 16 /9 ")).toBe("16 / 9");
  });
});
