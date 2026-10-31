import { h } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { iconButtonCases } from "@mild-ui/test-cases/icon-button";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { IconButton, type IconButtonProps } from "./index";
import { ButtonGroup } from "../ButtonGroup";

runComponentCases(iconButtonCases, (c) =>
  h(IconButton, caseProps<IconButtonProps>(c), () => h("svg")),
);

describe("IconButton", () => {
  it("names the button with the label and hides the glyph", () => {
    render(h(IconButton, { label: "Search" }, () => h("svg", { "data-testid": "glyph" })));
    const button = screen.getByRole("button", { name: "Search" });
    expect(button).toHaveAttribute("aria-label", "Search");
    expect(screen.getByTestId("glyph").closest("[aria-hidden='true']")).toHaveClass(
      "mild-icon-button__icon",
    );
    expect(button.querySelector(".mild-button__content")).toBeInTheDocument();
  });

  it("behaves like a Button: type, click, loading", async () => {
    const onClick = vi.fn();
    const { rerender } = render(h(IconButton, { label: "Save", onClick }, () => h("svg")));
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
    await fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);

    await rerender({ label: "Save", onClick, loading: true });
    expect(button).toHaveAttribute("aria-busy", "true");
    await fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("takes its size from an enclosing ButtonGroup, ignoring the icon size", () => {
    render(
      asComponent(() =>
        h(ButtonGroup, { size: "lg", variant: "outline" }, () => [
          h(IconButton, { label: "Bold" }, () => h("svg")),
          h(IconButton, { label: "Italic", size: "xs" }, () => h("svg")),
        ]),
      ),
    );
    expect(screen.getByRole("button", { name: "Bold" })).toHaveClass(
      "mild-icon-button--lg",
      "mild-button--lg",
      "mild-button--outline",
    );
    expect(screen.getByRole("button", { name: "Italic" })).toHaveClass("mild-icon-button--xs");

    render(
      asComponent(() =>
        h(ButtonGroup, { size: "icon" }, () => h(IconButton, { label: "Edit" }, () => h("svg"))),
      ),
    );
    expect(screen.getByRole("button", { name: "Edit" })).toHaveClass("mild-icon-button--md");
  });
});

itHasNoSeriousAxeViolations("IconButton", () =>
  h("div", [
    h(IconButton, { label: "Search" }, () => h("svg")),
    h(IconButton, { label: "More", variant: "ghost", round: true, size: "sm" }, () => h("svg")),
    h(IconButton, { label: "Busy", loading: true }, () => h("svg")),
  ]),
);
