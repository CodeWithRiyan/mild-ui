import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders a status with a visually hidden label", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Spinner ref={ref} />);
    const spinner = screen.getByRole("status");
    expect(ref.current).toBe(spinner);
    expect(spinner).toHaveClass(
      "mild-spinner",
      "mild-spinner--border",
      "mild-spinner--md",
      "mild-spinner--normal",
    );
    expect(spinner).toHaveTextContent("Loading...");
    expect(spinner.querySelector(".mild-spinner__label")).toBeInTheDocument();
  });

  it("maps variant, size, speed and a custom label", () => {
    render(<Spinner variant="dots" size="xl" speed="fast" label="Saving" />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("mild-spinner--dots", "mild-spinner--xl", "mild-spinner--fast");
    expect(spinner).toHaveTextContent("Saving");
  });
});
