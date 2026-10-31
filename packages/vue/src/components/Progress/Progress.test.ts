import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { progressCases } from "@mild-ui/test-cases/progress";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Progress } from "./index";
import { progressFraction, progressPercent, getProgressA11yProps } from "../../utils";

runComponentCases(progressCases, (c) => h(Progress, caseProps(c)));

describe("Progress", () => {
  it("exposes the value through the progressbar role and a custom property", () => {
    render(h(Progress, { value: 40, label: "Upload" }));
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuetext", "40%");
    expect(bar.style.getPropertyValue("--mild-progress-value")).toBe("40%");
    expect(bar.parentElement).toHaveClass("mild-progress-field");
  });

  it("is indeterminate without a value and announces busy", () => {
    render(h(Progress));
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-busy", "true");
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(bar).toHaveClass("mild-progress--indeterminate");
    expect(bar.getAttribute("style")).toBeNull();
  });

  it("clamps the value, shows the label and takes a custom value text", () => {
    const { container } = render(
      h(Progress, { value: 150, showValue: true, valueText: "Done", animated: true }),
    );
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "100");
    expect(bar).toHaveAttribute("aria-valuetext", "Done");
    expect(bar).toHaveClass("mild-progress--animated");
    expect(container.querySelector(".mild-progress__label")).toHaveTextContent("Done");
  });

  it("hides the label while indeterminate", () => {
    const { container } = render(h(Progress, { indeterminate: true, showValue: true }));
    expect(container.querySelector(".mild-progress__label")).toBeNull();
  });

  it("progress helpers clamp and round", () => {
    expect(progressFraction(5, 0, 10)).toBe(0.5);
    expect(progressFraction(-5, 0, 10)).toBe(0);
    expect(progressFraction(5, 10, 10)).toBe(0);
    expect(progressPercent(1, 0, 3)).toBe(33);
    expect(
      getProgressA11yProps({ min: 0, max: 10, indeterminate: true, valueText: "x" }),
    ).toMatchObject({
      role: "progressbar",
      "aria-valuenow": undefined,
      "aria-valuetext": "x",
      "aria-busy": true,
    });
  });
});

itHasNoSeriousAxeViolations("Progress", () =>
  h("div", [
    h(Progress, { value: 40, label: "Upload" }),
    h(Progress, { indeterminate: true, label: "Working", colorScheme: "success", striped: true }),
    h(Progress, { value: 3, max: 4, label: "Files", showValue: true, size: "lg" }),
  ]),
);
