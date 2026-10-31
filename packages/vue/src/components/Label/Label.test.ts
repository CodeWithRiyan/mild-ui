import { h } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { labelCases } from "@mild-ui/test-cases/label";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Label } from "./index";
import { Checkbox } from "../Checkbox";
import { Switch } from "../Switch";

runComponentCases(labelCases, (c) => h(Label, caseProps(c), () => c.children));

describe("Label", () => {
  it("names and focuses a native control through `for`", async () => {
    render(
      asComponent(() => [h(Label, { for: "email" }, () => "Email"), h("input", { id: "email" })]),
    );
    const input = screen.getByLabelText("Email");
    await fireEvent.click(screen.getByText("Email"));
    expect(document.activeElement).toBe(input);
  });

  it("accepts htmlFor as an alias of for", () => {
    render(h(Label, { htmlFor: "x" }, () => "X"));
    expect(screen.getByText("X")).toHaveAttribute("for", "x");
  });

  it("focuses and activates a custom control (role checkbox) on click", async () => {
    render(
      asComponent(() => [h(Label, { for: "terms" }, () => "Terms"), h(Checkbox, { id: "terms" })]),
    );
    const checkbox = screen.getByRole("checkbox");
    await fireEvent.click(screen.getByText("Terms"));
    expect(document.activeElement).toBe(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "true");
  });

  it("focuses and toggles a custom switch on click", async () => {
    render(
      asComponent(() => [h(Label, { for: "wifi" }, () => "Wi-Fi"), h(Switch, { id: "wifi" })]),
    );
    await fireEvent.click(screen.getByText("Wi-Fi"));
    expect(document.activeElement).toBe(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("focuses a custom control that is not checkbox-like without activating it", async () => {
    const onClick = vi.fn();
    render(
      asComponent(() => [
        h(Label, { for: "tab" }, () => "Tab"),
        h("div", { id: "tab", role: "tab", tabindex: "0", onClick }),
      ]),
    );
    await fireEvent.click(screen.getByText("Tab"));
    expect(document.activeElement).toBe(screen.getByRole("tab"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does nothing special when the control is missing or wraps the click target", async () => {
    render(
      asComponent(() => [
        h(Label, { for: "missing" }, () => "Missing"),
        h(Label, { for: "inner" }, () => h("input", { id: "inner" })),
        h(Label, () => "No target"),
      ]),
    );
    await fireEvent.click(screen.getByText("Missing"));
    await fireEvent.click(screen.getByText("No target"));
    const inner = screen.getByRole("textbox");
    await fireEvent.click(inner);
    expect(document.activeElement).not.toBe(screen.getByText("Missing"));
  });

  it("marks required visually without reading the marker twice, and error", () => {
    render(
      asComponent(() => [
        h(
          Label,
          { for: "name", required: true, error: true, ui: { asterisk: "star" } },
          () => "Name",
        ),
        h("input", { id: "name", required: true }),
      ]),
    );
    const label = screen.getByText("Name").closest("label")!;
    const marker = label.querySelector("[data-required-marker]")!;
    expect(marker).toHaveTextContent("*");
    expect(marker).toHaveAttribute("aria-hidden", "true");
    expect(marker).toHaveClass("mild-label__marker", "star");
    expect(label).toHaveClass("mild-label--required", "mild-label--error");
    // The accessible name is just the text; "required" comes from the control itself.
    expect(screen.getByRole("textbox")).toHaveAccessibleName("Name");
    expect(screen.getByRole("textbox")).toBeRequired();
  });

  it("still calls a consumer onClick, and skips its own work when default is prevented", async () => {
    const onClick = vi.fn((event: MouseEvent) => event.preventDefault());
    render(
      asComponent(() => [h(Label, { for: "x", onClick }, () => "X"), h("input", { id: "x" })]),
    );
    await fireEvent.click(screen.getByText("X"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(document.activeElement).not.toBe(screen.getByRole("textbox"));
  });
});

itHasNoSeriousAxeViolations("Label", () =>
  h("div", [
    h(Label, { for: "a" }, () => "Plain"),
    h("input", { id: "a" }),
    h(Label, { for: "b", required: true, error: true }, () => "Required"),
    h("input", { id: "b", required: true, "aria-invalid": "true" }),
  ]),
);
