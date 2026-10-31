import { defineComponent, h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { buttonGroupCases } from "@mild-ui/test-cases/button-group";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { ButtonGroup, useButtonGroup } from "./index";
import { Button } from "../Button";

runComponentCases(buttonGroupCases, (c) =>
  h(ButtonGroup, caseProps(c), () => [h(Button, () => "One"), h(Button, () => "Two")]),
);

describe("ButtonGroup", () => {
  it("renders a group", () => {
    render(
      asComponent(() =>
        h(ButtonGroup, { "aria-label": "Pager" }, () => [
          h(Button, () => "Prev"),
          h(Button, () => "Next"),
        ]),
      ),
    );
    const group = screen.getByRole("group", { name: "Pager" });
    expect(group).toHaveClass("mild-button-group");
    expect(group).toHaveAttribute("data-orientation", "horizontal");
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("hands size, variant and disabled to the buttons, which can still override them", () => {
    render(
      asComponent(() =>
        h(ButtonGroup, { size: "sm", variant: "ghost", disabled: true }, () => [
          h(Button, () => "Inherits"),
          h(Button, { size: "lg", variant: "outline", disabled: false }, () => "Overrides"),
        ]),
      ),
    );
    const inherits = screen.getByRole("button", { name: "Inherits" });
    expect(inherits).toHaveClass("mild-button--sm", "mild-button--ghost");
    expect(inherits).toBeDisabled();

    const overrides = screen.getByRole("button", { name: "Overrides" });
    expect(overrides).toHaveClass("mild-button--lg", "mild-button--outline");
    expect(overrides).not.toBeDisabled();
  });

  it("exposes no context outside a group", () => {
    let context: ReturnType<typeof useButtonGroup> | undefined;
    const Probe = defineComponent({
      setup() {
        context = useButtonGroup();
        return () => null;
      },
    });
    render(Probe);
    expect(context).toBeNull();
  });

  it("keeps Button defaults outside a group", () => {
    render(h(Button, () => "Alone"));
    expect(screen.getByRole("button")).toHaveClass("mild-button--primary", "mild-button--md");
    expect(screen.getByRole("button")).toBeEnabled();
  });
});

itHasNoSeriousAxeViolations("ButtonGroup", () =>
  h("div", [
    h(ButtonGroup, { "aria-label": "Pager" }, () => [
      h(Button, () => "Prev"),
      h(Button, () => "Next"),
    ]),
    h(
      ButtonGroup,
      { attached: true, orientation: "vertical", variant: "outline", "aria-label": "Zoom" },
      () => [h(Button, () => "+"), h(Button, () => "-")],
    ),
  ]),
);
