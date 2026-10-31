import { h } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { alertCases } from "@mild-ui/test-cases/alert";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Alert } from "./index";

runComponentCases(alertCases, (c) => h(Alert, caseProps(c), () => c.children));

describe("Alert", () => {
  it("is a polite status by default with the info icon, title and body", () => {
    render(h(Alert, { title: "Heads up", description: "Something happened." }));
    const alert = screen.getByRole("status");
    expect(alert).toHaveClass("mild-alert", "mild-alert--subtle", "mild-alert--info");
    expect(alert.querySelector(".mild-alert__icon svg")).toBeInTheDocument();
    expect(screen.getByText("Heads up")).toHaveClass("mild-alert__title");
    expect(screen.getByText("Something happened.")).toHaveClass("mild-alert__description");
  });

  it("is assertive for errors and warnings, and lets the caller pick a role", () => {
    render(h(Alert, { status: "error" }, () => "Failed"));
    expect(screen.getByRole("alert")).toHaveClass("mild-alert--error");
    render(h(Alert, { status: "warning", role: "note" }, () => "Careful"));
    expect(screen.getByRole("note")).toHaveClass("mild-alert--warning");
  });

  it("emits dismiss from the close button", async () => {
    const onDismiss = vi.fn();
    render(h(Alert, { dismissible: true, dismissLabel: "Hide", onDismiss }, () => "Saved"));
    await fireEvent.click(screen.getByRole("button", { name: "Hide" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("renders rich title, icon slots, and no icon when asked", () => {
    const { container } = render(
      h(
        Alert,
        {},
        { title: () => h("em", "Rich"), icon: () => h("i", { "data-testid": "glyph" }) },
      ),
    );
    expect(screen.getByText("Rich").closest(".mild-alert__title")).toBeInTheDocument();
    expect(screen.getByTestId("glyph").closest(".mild-alert__icon")).toBeInTheDocument();
    expect(container.querySelector(".mild-alert__description")).toBeNull();

    const { container: plain } = render(h(Alert, { noIcon: true }, () => "Plain"));
    expect(plain.querySelector(".mild-alert__icon")).toBeNull();
  });
});

itHasNoSeriousAxeViolations("Alert", () =>
  h("div", [
    h(Alert, { title: "Info", description: "Body" }),
    h(Alert, { status: "success", dismissible: true }, () => "Saved"),
    h(Alert, { status: "error", variant: "solid" }, () => "Failed"),
    h(Alert, { status: "warning", variant: "left-accent", size: "sm", noIcon: true }, () => "Hmm"),
  ]),
);
