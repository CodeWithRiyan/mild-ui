import { h } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { buttonCases } from "@mild-ui/test-cases/button";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Button } from "./index";

runComponentCases(buttonCases, (c) => h(Button, caseProps(c), () => c.children));

describe("Button", () => {
  it("renders a primary solid button by default", () => {
    render(h(Button, () => "Save"));
    const button = screen.getByRole("button", { name: "Save" });

    expect(button).toHaveAttribute("type", "button");
    // The stylesheet paints `.mild-button--solid.mild-button--primary`; without the style
    // class the button has no background and renders transparent.
    expect(button).toHaveClass("mild-button", "mild-button--primary", "mild-button--solid");
    expect(button).not.toHaveAttribute("aria-busy");
    expect(button).not.toHaveAttribute("aria-disabled");
    expect(button).toBeEnabled();
    expect(button.querySelector(".mild-button__content")).toHaveTextContent("Save");
  });

  it.each([
    ["primary", ["mild-button--solid", "mild-button--primary"], ["mild-button--secondary"]],
    ["secondary", ["mild-button--solid", "mild-button--secondary"], ["mild-button--primary"]],
    ["destructive", ["mild-button--solid", "mild-button--danger"], ["mild-button--primary"]],
    ["outline", ["mild-button--outline", "mild-button--primary"], ["mild-button--solid"]],
    ["ghost", ["mild-button--ghost", "mild-button--primary"], ["mild-button--solid"]],
    ["link", ["mild-button--link", "mild-button--primary"], ["mild-button--solid"]],
  ] as const)("maps variant %s onto a style + color pair", (variant, present, absent) => {
    render(h(Button, { variant }, () => "x"));
    const button = screen.getByRole("button");
    for (const cls of present) expect(button).toHaveClass(cls);
    for (const cls of absent) expect(button).not.toHaveClass(cls);
  });

  it("lets colorScheme recolor the outline, ghost and link styles", () => {
    render(h(Button, { variant: "outline", colorScheme: "danger" }, () => "Delete"));
    const button = screen.getByRole("button");
    expect(button).toHaveClass("mild-button--outline", "mild-button--danger");
    expect(button).not.toHaveClass("mild-button--primary");
  });

  it("while loading: sets aria-busy, blocks clicks and stays focusable", async () => {
    const onClick = vi.fn();
    render(h(Button, { loading: true, onClick }, () => "Saving"));
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("data-loading", "");
    expect(button).toHaveClass("mild-button--loading");
    // Not the `disabled` attribute: that would throw focus away mid-submit.
    expect(button).not.toHaveAttribute("disabled");

    await fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();

    button.focus();
    expect(document.activeElement).toBe(button);
  });

  it("shows the spinner while loading and keeps the label as the accessible name", () => {
    const { container } = render(h(Button, { loading: true }, () => "Saving"));
    expect(container.querySelector(".mild-button__spinner")).toBeInTheDocument();
    expect(container.querySelector(".mild-button__spinner")).toHaveAttribute("aria-hidden", "true");
    // The stylesheet fades the content under the spinner; it is not removed from the DOM.
    expect(container.querySelector(".mild-button__content")).toHaveTextContent("Saving");
    expect(screen.getByRole("button")).toHaveAccessibleName("Saving");
  });

  it("while disabled: uses the disabled attribute and blocks clicks", async () => {
    const onClick = vi.fn();
    render(h(Button, { disabled: true, onClick }, () => "Nope"));
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("data-disabled", "");
    expect(button).toHaveAttribute("tabindex", "-1");
    expect(button).toHaveClass("mild-button--disabled");
    await fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("calls onClick when enabled and forwards the type, size, width and attributes", async () => {
    const onClick = vi.fn();
    render(
      h(
        Button,
        {
          type: "submit",
          size: "lg",
          fullWidth: true,
          class: "extra",
          "aria-label": "Go!",
          onClick,
        },
        () => "Go",
      ),
    );
    const button = screen.getByRole("button", { name: "Go!" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveClass("mild-button--lg", "mild-button--full-width", "extra");
    await fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
  });

  it("renders left and right icons in aria-hidden wrappers", () => {
    render(
      h(
        Button,
        {},
        {
          default: () => "Next",
          leftIcon: () => h("i", { "data-testid": "left" }),
          rightIcon: () => h("i", { "data-testid": "right" }),
        },
      ),
    );
    expect(screen.getByTestId("left").parentElement).toHaveClass("mild-button__left-icon");
    expect(screen.getByTestId("left").parentElement).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("right").parentElement).toHaveClass("mild-button__right-icon");
    expect(screen.getByRole("button")).toHaveAccessibleName("Next");
  });

  it("still accepts the legacy leading-icon / trailing-icon slot names", () => {
    render(
      h(
        Button,
        {},
        {
          default: () => "Next",
          "leading-icon": () => h("i", { "data-testid": "left" }),
          "trailing-icon": () => h("i", { "data-testid": "right" }),
        },
      ),
    );
    expect(screen.getByTestId("left").parentElement).toHaveClass("mild-button__left-icon");
    expect(screen.getByTestId("right").parentElement).toHaveClass("mild-button__right-icon");
  });
});

itHasNoSeriousAxeViolations("Button", () =>
  h("div", [
    h(Button, () => "Primary"),
    h(Button, { variant: "outline", size: "sm" }, () => "Outline"),
    h(Button, { disabled: true }, () => "Disabled"),
    h(Button, { loading: true }, () => "Loading"),
    h(Button, { size: "icon", "aria-label": "Close" }, { leftIcon: () => h("i") }),
  ]),
);
