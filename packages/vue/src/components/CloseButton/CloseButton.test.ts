import { h } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { closeButtonCases } from "@mild-ui/test-cases/close-button";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { CloseButton } from "./index";

runComponentCases(closeButtonCases, (c) => h(CloseButton, caseProps(c)));

describe("CloseButton", () => {
  it("is a ghost icon button named Close with an X glyph", async () => {
    const onClick = vi.fn();
    render(h(CloseButton, { onClick }));
    const button = screen.getByRole("button", { name: "Close" });
    expect(button).toHaveClass("mild-close-button", "mild-icon-button", "mild-button--ghost");
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    await fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("accepts another glyph, label and variant", () => {
    render(
      h(CloseButton, { label: "Dismiss", variant: "outline" }, () =>
        h("span", { "data-testid": "custom" }),
      ),
    );
    const button = screen.getByRole("button", { name: "Dismiss" });
    expect(screen.getByTestId("custom")).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeNull();
    expect(button).toHaveClass("mild-button--outline");
  });
});

itHasNoSeriousAxeViolations("CloseButton", () =>
  h("div", [h(CloseButton), h(CloseButton, { label: "Dismiss", size: "sm", round: true })]),
);
