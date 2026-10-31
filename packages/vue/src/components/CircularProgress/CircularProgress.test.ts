import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { circularProgressCases } from "@mild-ui/test-cases/circular-progress";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { CircularProgress } from "./index";

runComponentCases(circularProgressCases, (c) => h(CircularProgress, caseProps(c)));

describe("CircularProgress", () => {
  it("draws the arc from the value and keeps the svg decorative", () => {
    render(h(CircularProgress, { value: 25, label: "Storage" }));
    const ring = screen.getByRole("progressbar", { name: "Storage" });
    const bar = ring.querySelector(".mild-circular-progress__bar")!;
    const circumference = Number(bar.getAttribute("stroke-dasharray"));
    expect(circumference).toBeGreaterThan(0);
    expect(Number(bar.getAttribute("stroke-dashoffset"))).toBeCloseTo(circumference * 0.75);
    expect(ring.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(ring.querySelector(".mild-circular-progress__label")).toBeNull();
  });

  it("spins without dash values while indeterminate", () => {
    render(h(CircularProgress, { indeterminate: true }));
    const bar = screen.getByRole("progressbar").querySelector(".mild-circular-progress__bar")!;
    expect(bar).not.toHaveAttribute("stroke-dasharray");
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-busy", "true");
  });

  it("clamps the thickness and shows the percentage or the slot in the middle", () => {
    const { container } = render(h(CircularProgress, { value: 50, thickness: 2, showValue: true }));
    expect(container.querySelector(".mild-circular-progress__track")).toHaveAttribute(
      "stroke-width",
      "50",
    );
    expect(container.querySelector(".mild-circular-progress__label")).toHaveTextContent("50%");

    const { container: custom } = render(
      h(CircularProgress, { value: 50, thickness: 0 }, () => "½"),
    );
    expect(custom.querySelector(".mild-circular-progress__track")).toHaveAttribute(
      "stroke-width",
      "2",
    );
    expect(custom.querySelector(".mild-circular-progress__label")).toHaveTextContent("½");
  });
});

itHasNoSeriousAxeViolations("CircularProgress", () =>
  h("div", [
    h(CircularProgress, { value: 25, label: "Storage" }),
    h(CircularProgress, { indeterminate: true, label: "Working", size: "xl" }),
    h(CircularProgress, { value: 80, label: "Done", showValue: true, colorScheme: "success" }),
  ]),
);
