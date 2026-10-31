import * as React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Code } from "./Code";

describe("Code", () => {
  it("renders a subtle inline code element by default", () => {
    const { container } = render(<Code>npm i</Code>);
    const code = container.firstElementChild as HTMLElement;
    expect(code.tagName).toBe("CODE");
    expect(code).toHaveClass("mild-code", "mild-code--subtle", "mild-code--md");
    expect(code).not.toHaveClass("mild-code--block");
    expect(code).toHaveTextContent("npm i");
  });

  it("maps variant, size and block onto modifiers", () => {
    const { container } = render(
      <Code variant="outline" size="lg" block>
        block
      </Code>,
    );
    expect(container.firstElementChild).toHaveClass(
      "mild-code--outline",
      "mild-code--lg",
      "mild-code--block",
    );
  });

  it("renders the element given with `as` and forwards its ref", () => {
    const ref = React.createRef<HTMLPreElement>();
    const { container } = render(
      <Code as="pre" ref={ref} block>
        line
      </Code>,
    );
    const pre = container.firstElementChild as HTMLElement;
    expect(pre.tagName).toBe("PRE");
    expect(ref.current).toBe(pre);
  });
});
