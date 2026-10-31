import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ButtonGroup, useButtonGroup } from "./ButtonGroup";
import { Button } from "../Button";

describe("ButtonGroup", () => {
  it("renders a group and forwards its ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ButtonGroup ref={ref} aria-label="Pager">
        <Button>Prev</Button>
        <Button>Next</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole("group", { name: "Pager" });
    expect(ref.current).toBe(group);
    expect(group).toHaveClass("mild-button-group");
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("hands size, variant and disabled to the buttons, which can still override them", () => {
    render(
      <ButtonGroup size="sm" variant="ghost" disabled>
        <Button>Inherits</Button>
        <Button size="lg" variant="outline" disabled={false}>
          Overrides
        </Button>
      </ButtonGroup>,
    );
    const inherits = screen.getByRole("button", { name: "Inherits" });
    expect(inherits).toHaveClass("mild-button--sm", "mild-button--ghost");
    expect(inherits).toBeDisabled();

    const overrides = screen.getByRole("button", { name: "Overrides" });
    expect(overrides).toHaveClass("mild-button--lg", "mild-button--outline");
    expect(overrides).not.toBeDisabled();
  });

  it("exposes an empty context outside a group", () => {
    let context: ReturnType<typeof useButtonGroup> | undefined;
    function Probe() {
      context = useButtonGroup();
      return null;
    }
    render(<Probe />);
    expect(context).toEqual({});
  });

  it("keeps Button defaults outside a group", () => {
    render(<Button>Alone</Button>);
    expect(screen.getByRole("button")).toHaveClass("mild-button--primary", "mild-button--md");
  });
});
