import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stat, StatGroup } from "./Stat";

describe("Stat", () => {
  it("renders the label, value and help text", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Stat ref={ref} label="Revenue" value="$12,400" helpText="Last 30 days" />);
    expect(ref.current).toHaveClass("mild-stat", "mild-stat--md");
    expect(screen.getByText("Revenue")).toHaveClass("mild-stat__label");
    expect(screen.getByText("$12,400")).toHaveClass("mild-stat__value");
    expect(screen.getByText("Last 30 days")).toHaveClass("mild-stat__help");
    expect(document.querySelector(".mild-stat__trend")).toBeNull();
  });

  it("announces the trend in words and draws a decorative arrow", () => {
    const { rerender } = render(
      <Stat label="Users" value="1,204" trend="increase" trendValue="12%" size="lg" />,
    );
    const trend = document.querySelector(".mild-stat__trend") as HTMLElement;
    expect(trend).toHaveClass("mild-stat__trend--increase");
    expect(trend).toHaveAttribute("data-trend", "increase");
    expect(trend.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(trend).toHaveTextContent("increased by 12%");
    expect(document.querySelector(".mild-stat")).toHaveClass("mild-stat--lg");

    rerender(<Stat label="Users" value="1,204" trend="decrease" trendValue="3%" />);
    expect(document.querySelector(".mild-stat__trend--decrease")).toHaveTextContent(
      "decreased by 3%",
    );
  });

  it("StatGroup lays stats out in a row", () => {
    render(
      <StatGroup aria-label="Overview">
        <Stat label="A" value="1" />
        <Stat label="B" value="2">
          <span>extra</span>
        </Stat>
      </StatGroup>,
    );
    const group = document.querySelector(".mild-stat-group") as HTMLElement;
    expect(group.querySelectorAll(".mild-stat")).toHaveLength(2);
    expect(screen.getByText("extra")).toBeInTheDocument();
  });
});
