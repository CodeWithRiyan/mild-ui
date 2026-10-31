import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders a horizontal separator div by default", () => {
    render(<Divider />);
    const divider = screen.getByRole("separator");
    expect(divider.tagName).toBe("DIV");
    expect(divider).toHaveClass(
      "mild-divider",
      "mild-divider--horizontal",
      "mild-divider--solid",
      "mild-divider--sm",
    );
    expect(divider).toHaveAttribute("aria-orientation", "horizontal");
    expect(divider).toBeEmptyDOMElement();
    expect(divider.getAttribute("style")).toBeNull();
  });

  it("renders the element given with `as` and forwards its props and ref", () => {
    const ref = React.createRef<HTMLLIElement>();
    render(
      <ul>
        <Divider as="li" ref={ref} data-testid="divider" />
      </ul>,
    );
    const divider = screen.getByTestId("divider");
    expect(divider.tagName).toBe("LI");
    expect(ref.current).toBe(divider);
    expect(divider).toHaveAttribute("role", "separator");
  });

  it("announces the vertical orientation", () => {
    render(<Divider orientation="vertical" variant="dotted" size="lg" />);
    const divider = screen.getByRole("separator");
    expect(divider).toHaveAttribute("aria-orientation", "vertical");
    expect(divider).toHaveClass(
      "mild-divider--vertical",
      "mild-divider--dotted",
      "mild-divider--lg",
    );
  });

  it("writes the color token to the line's custom property only", () => {
    render(<Divider color="primary-500" />);
    const divider = screen.getByRole("separator");
    expect(divider.style.getPropertyValue("--mild-divider-color")).toBe(
      "var(--mild-color-primary-500)",
    );
    expect(divider.style.color).toBe("");
  });

  it("renders a label on the line", () => {
    render(<Divider label="OR" labelPosition="end" />);
    const divider = screen.getByRole("separator");
    expect(divider).toHaveClass("mild-divider--with-label", "mild-divider--label-end");
    expect(divider.querySelector(".mild-divider__label")).toHaveTextContent("OR");
  });

  it("adds no label-position modifier for the centered default", () => {
    render(<Divider label="OR" />);
    const divider = screen.getByRole("separator");
    expect(divider).toHaveClass("mild-divider--with-label");
    expect(divider.className).not.toMatch(/mild-divider--label-/);
  });

  it("hides a decorative divider from assistive technology", () => {
    const { container } = render(<Divider decorative />);
    expect(screen.queryByRole("separator")).toBeNull();
    const divider = container.firstElementChild as HTMLElement;
    expect(divider).toHaveAttribute("role", "none");
    expect(divider).toHaveAttribute("aria-hidden", "true");
  });
});
