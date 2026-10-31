import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "./Container";

describe("Container", () => {
  it("renders a lg div without inline style by default", () => {
    const { container } = render(<Container>content</Container>);
    const element = container.firstElementChild as HTMLElement;
    expect(element.tagName).toBe("DIV");
    expect(element).toHaveClass("mild-container", "mild-container--lg");
    expect(element.getAttribute("style")).toBeNull();
  });

  it("renders the element given with `as` and forwards its props and ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Container as="main" ref={ref} size="2xl">
        page
      </Container>,
    );
    const main = screen.getByRole("main");
    expect(main.tagName).toBe("MAIN");
    expect(ref.current).toBe(main);
    expect(main).toHaveClass("mild-container--2xl");
  });

  it("maps the padding token onto both horizontal paddings", () => {
    const { container } = render(<Container padding="8" centerContent />);
    const element = container.firstElementChild as HTMLElement;
    expect(element.style.paddingLeft).toBe("var(--mild-space-8, 2rem)");
    expect(element.style.paddingRight).toBe("var(--mild-space-8, 2rem)");
    expect(element.style.paddingTop).toBe("");
    expect(element).toHaveClass("mild-container--center-content");
  });

  it("merges a caller-provided style", () => {
    const { container } = render(<Container padding="2" style={{ minHeight: "100vh" }} />);
    const element = container.firstElementChild as HTMLElement;
    expect(element.style.paddingLeft).toBe("var(--mild-space-2, 0.5rem)");
    expect(element.style.minHeight).toBe("100vh");
  });
});
