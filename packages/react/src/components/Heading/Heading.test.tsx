import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders an h2 by default", () => {
    const { container } = render(<Heading>Title</Heading>);
    const heading = container.firstElementChild as HTMLElement;
    expect(heading.tagName).toBe("H2");
    expect(heading).toHaveClass("mild-heading", "mild-heading--level-2", "mild-heading--semibold");
    expect(screen.getByRole("heading", { level: 2, name: "Title" })).toBe(heading);
  });

  it.each([1, 2, 3, 4, 5, 6] as const)("level %i renders the matching element", (level) => {
    render(<Heading level={level}>Heading</Heading>);
    const heading = screen.getByRole("heading", { level });
    expect(heading.tagName).toBe(`H${level}`);
    expect(heading).toHaveClass(`mild-heading--level-${level}`);
  });

  it("keeps the level class when the size is overridden", () => {
    render(
      <Heading level={1} size="lg">
        Small but first
      </Heading>,
    );
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("mild-heading--level-1", "mild-heading--lg");
  });

  it("renders a non-heading element with `as` and forwards its ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <Heading as="div" ref={ref} level={3}>
        Label
      </Heading>,
    );
    const element = container.firstElementChild as HTMLElement;
    expect(element.tagName).toBe("DIV");
    expect(ref.current).toBe(element);
    expect(screen.queryByRole("heading")).toBeNull();
    expect(element).toHaveClass("mild-heading--level-3");
  });

  it("maps weight, alignment, color and truncation onto modifiers", () => {
    render(
      <Heading weight="bold" align="right" color="danger" truncate>
        Styled
      </Heading>,
    );
    expect(screen.getByRole("heading")).toHaveClass(
      "mild-heading--bold",
      "mild-heading--right",
      "mild-heading--danger",
      "mild-heading--truncate",
    );
  });
});
