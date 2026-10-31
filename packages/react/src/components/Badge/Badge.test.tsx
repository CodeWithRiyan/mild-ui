import * as React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders a subtle gray span by default", () => {
    const ref = React.createRef<HTMLSpanElement>();
    const { container } = render(<Badge ref={ref}>New</Badge>);
    const badge = container.firstElementChild as HTMLElement;
    expect(ref.current).toBe(badge);
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass(
      "mild-badge",
      "mild-badge--subtle",
      "mild-badge--gray",
      "mild-badge--md",
    );
    expect(badge).toHaveTextContent("New");
    expect(badge.querySelector(".mild-badge__dot")).toBeNull();
  });

  it("maps variant, color, size, pill and dot", () => {
    const { container } = render(
      <Badge variant="solid" colorScheme="success" size="lg" pill dot>
        Live
      </Badge>,
    );
    const badge = container.firstElementChild as HTMLElement;
    expect(badge).toHaveClass(
      "mild-badge--solid",
      "mild-badge--success",
      "mild-badge--lg",
      "mild-badge--pill",
    );
    expect(badge.querySelector(".mild-badge__dot")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders the element given with `as`", () => {
    const { container } = render(
      <Badge as="a" href="/new" colorScheme="primary">
        New
      </Badge>,
    );
    expect(container.querySelector("a.mild-badge")).toHaveAttribute("href", "/new");
  });
});
