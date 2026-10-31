import { defineComponent, h, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { toggleCases } from "@mild-ui/test-cases/toggle";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Toggle } from "./index";

runComponentCases(toggleCases, (c) => h(Toggle, caseProps(c), () => c.children));

describe("Toggle", () => {
  it("toggles aria-pressed on click when uncontrolled", async () => {
    const onChange = vi.fn();
    const { emitted } = render(h(Toggle, { onChange }, () => "B"));
    const toggle = screen.getByRole("button");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(toggle).toHaveAttribute("type", "button");

    await fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle).toHaveAttribute("data-state", "on");
    expect(onChange).toHaveBeenLastCalledWith(true);

    await fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(onChange).toHaveBeenLastCalledWith(false);
    expect(emitted("update:pressed")).toEqual([[true], [false]]);
  });

  it("follows the controlled value only", async () => {
    const onChange = vi.fn();
    const { rerender } = render(h(Toggle, { pressed: false, onChange }));
    const toggle = screen.getByRole("button");
    await fireEvent.click(toggle);
    expect(onChange).toHaveBeenCalledWith(true);
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    await rerender({ pressed: true });
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  it("works with v-model:pressed", async () => {
    const Harness = defineComponent({
      setup() {
        const bold = ref(false);
        return () => [
          h(
            Toggle,
            { pressed: bold.value, "onUpdate:pressed": (v) => (bold.value = v) },
            () => "B",
          ),
          h("output", String(bold.value)),
        ];
      },
    });
    render(Harness);
    await fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("status")).toHaveTextContent("true");
  });

  it("does nothing while disabled", async () => {
    const onChange = vi.fn();
    render(h(Toggle, { disabled: true, onChange }));
    const toggle = screen.getByRole("button");
    expect(toggle).toBeDisabled();
    expect(toggle).toHaveAttribute("data-disabled", "");
    await fireEvent.click(toggle);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("lets a click handler cancel the toggle", async () => {
    const onChange = vi.fn();
    render(h(Toggle, { onClick: (event: MouseEvent) => event.preventDefault(), onChange }));
    await fireEvent.click(screen.getByRole("button"));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });
});

itHasNoSeriousAxeViolations("Toggle", () =>
  h("div", [
    h(Toggle, { "aria-label": "Bold" }, () => "B"),
    h(
      Toggle,
      { "aria-label": "Italic", defaultPressed: true, variant: "outline", size: "sm" },
      () => "I",
    ),
    h(Toggle, { "aria-label": "Off", disabled: true }, () => "S"),
  ]),
);
