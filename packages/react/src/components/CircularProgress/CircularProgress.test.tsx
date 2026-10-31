import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CircularProgress } from "./CircularProgress";

describe("CircularProgress (WAI-ARIA progressbar)", () => {
  it("exposes the value and draws the arc proportionally", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CircularProgress ref={ref} value={25} label="Storage" showValue />);
    const ring = screen.getByRole("progressbar", { name: "Storage" });
    expect(ref.current).toBe(ring);
    expect(ring).toHaveAttribute("aria-valuenow", "25");
    expect(ring).toHaveAttribute("aria-valuetext", "25%");
    expect(ring).toHaveClass("mild-circular-progress", "mild-circular-progress--md");

    const bar = ring.querySelector(".mild-circular-progress__bar") as SVGCircleElement;
    const dasharray = Number(bar.getAttribute("stroke-dasharray"));
    const dashoffset = Number(bar.getAttribute("stroke-dashoffset"));
    expect(dashoffset / dasharray).toBeCloseTo(0.75);
    expect(screen.getByText("25%")).toHaveClass("mild-circular-progress__label");
    expect(ring.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("is indeterminate without a value and shows children in the middle", () => {
    render(
      <CircularProgress size="lg" colorScheme="info">
        <span>...</span>
      </CircularProgress>,
    );
    const ring = screen.getByRole("progressbar");
    expect(ring).not.toHaveAttribute("aria-valuenow");
    expect(ring).toHaveAttribute("aria-busy", "true");
    expect(ring).toHaveClass(
      "mild-circular-progress--indeterminate",
      "mild-circular-progress--lg",
      "mild-circular-progress--info",
    );
    expect(ring.querySelector(".mild-circular-progress__bar")).not.toHaveAttribute(
      "stroke-dasharray",
    );
    expect(screen.getByText("...")).toBeInTheDocument();
  });

  it("clamps the thickness", () => {
    render(<CircularProgress value={10} thickness={2} />);
    const track = screen.getByRole("progressbar").querySelector(".mild-circular-progress__track");
    expect(track).toHaveAttribute("stroke-width", "50");
  });
});
