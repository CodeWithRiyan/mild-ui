import * as React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Kbd } from "./Kbd";

describe("Kbd", () => {
  it("renders a kbd element at the medium size", () => {
    const { container } = render(<Kbd>K</Kbd>);
    const kbd = container.firstElementChild as HTMLElement;
    expect(kbd.tagName).toBe("KBD");
    expect(kbd).toHaveClass("mild-kbd", "mild-kbd--md");
    expect(kbd).toHaveTextContent("K");
  });

  it.each(["sm", "md", "lg"] as const)("size %s maps onto a modifier", (size) => {
    const { container } = render(<Kbd size={size}>K</Kbd>);
    expect(container.firstElementChild).toHaveClass(`mild-kbd--${size}`);
  });

  it("renders the element given with `as` and forwards its props and ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    const { container } = render(
      <Kbd as="span" ref={ref} title="Command">
        ⌘
      </Kbd>,
    );
    const span = container.firstElementChild as HTMLElement;
    expect(span.tagName).toBe("SPAN");
    expect(ref.current).toBe(span);
    expect(span).toHaveAttribute("title", "Command");
  });
});
