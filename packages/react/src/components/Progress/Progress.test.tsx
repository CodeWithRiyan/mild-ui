import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress } from "./Progress";
import { progressFraction, progressPercent } from "../../utils";

describe("Progress (WAI-ARIA progressbar)", () => {
  it("exposes value, min and max and fills the bar", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Progress ref={ref} value={40} label="Upload" />);
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(ref.current).toBe(bar);
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveAttribute("aria-valuetext", "40%");
    expect(bar.style.getPropertyValue("--mild-progress-value")).toBe("40%");
    expect(bar).not.toHaveAttribute("aria-busy");
    expect(bar.querySelector(".mild-progress__bar")).toBeInTheDocument();
  });

  it("clamps the value into the range and uses custom min/max and valueText", () => {
    render(<Progress value={15} min={5} max={15} valueText="10 of 10 files" showValue />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "15");
    expect(bar).toHaveAttribute("aria-valuetext", "10 of 10 files");
    expect(bar.style.getPropertyValue("--mild-progress-value")).toBe("100%");
    expect(screen.getByText("10 of 10 files")).toHaveClass("mild-progress__label");
  });

  it("is indeterminate (busy, no aria-valuenow) without a value", () => {
    render(<Progress label="Loading" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(bar).toHaveAttribute("aria-busy", "true");
    expect(bar).toHaveClass("mild-progress--indeterminate");
    expect(bar.getAttribute("style")).toBeNull();
  });

  it("maps size, color scheme, striped and animated", () => {
    render(<Progress value={50} size="lg" colorScheme="success" striped animated />);
    expect(screen.getByRole("progressbar")).toHaveClass(
      "mild-progress--lg",
      "mild-progress--success",
      "mild-progress--striped",
      "mild-progress--animated",
    );
  });

  it("utilities clamp and round", () => {
    expect(progressFraction(-5, 0, 100)).toBe(0);
    expect(progressFraction(250, 0, 100)).toBe(1);
    expect(progressFraction(5, 10, 10)).toBe(0);
    expect(progressPercent(1, 0, 3)).toBe(33);
  });
});
