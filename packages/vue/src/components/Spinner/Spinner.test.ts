import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { spinnerCases } from "@mild-ui/test-cases/spinner";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Spinner } from "./index";

runComponentCases(spinnerCases, (c) => h(Spinner, caseProps(c)));

describe("Spinner", () => {
  it("announces a visually hidden label through role=status", () => {
    render(h(Spinner));
    const spinner = screen.getByRole("status");
    expect(spinner.tagName).toBe("SPAN");
    expect(spinner).toHaveClass("mild-spinner--border", "mild-spinner--md", "mild-spinner--normal");
    expect(spinner.querySelector(".mild-spinner__label")).toHaveTextContent("Loading...");
  });

  it("maps variant, size, speed and label", () => {
    render(h(Spinner, { variant: "bars", size: "xl", speed: "slow", label: "Working" }));
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("mild-spinner--bars", "mild-spinner--xl", "mild-spinner--slow");
    expect(spinner).toHaveTextContent("Working");
  });
});

itHasNoSeriousAxeViolations("Spinner", () =>
  h("div", [h(Spinner), h(Spinner, { variant: "dots", size: "sm", label: "Saving" })]),
);
