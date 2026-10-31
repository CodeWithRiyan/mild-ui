import { defineComponent, h, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { switchCases } from "@mild-ui/test-cases/switch";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Switch } from "./index";

runComponentCases(switchCases, (c) => h(Switch, caseProps(c)));

describe("Switch (driven by @mild-ui/primitives/switch)", () => {
  it("renders an off, focusable switch with its label", () => {
    render(h(Switch, { id: "wifi", label: "Wi-Fi" }));
    const toggle = screen.getByRole("switch", { name: "Wi-Fi" });

    expect(toggle).toHaveAttribute("aria-checked", "false");
    expect(toggle).toHaveAttribute("tabindex", "0");
    expect(toggle).toHaveAttribute("data-state", "unchecked");
    expect(toggle.querySelector(".mild-switch-thumb")).toHaveAttribute("data-state", "unchecked");
  });

  it("toggles on click, Space and Enter (the switch pattern lists both keys)", async () => {
    const onChange = vi.fn();
    const { emitted } = render(h(Switch, { onChange }));
    const toggle = screen.getByRole("switch");

    await fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(toggle.querySelector(".mild-switch-thumb")).toHaveAttribute("data-state", "checked");
    expect(onChange).toHaveBeenLastCalledWith(true);

    await fireEvent.keyDown(toggle, { key: " " });
    expect(toggle).toHaveAttribute("aria-checked", "false");

    await fireEvent.keyDown(toggle, { key: "Enter" });
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(emitted("update:modelValue")).toEqual([[true], [false], [true]]);
  });

  it("ignores other keys", async () => {
    render(h(Switch));
    const toggle = screen.getByRole("switch");
    await fireEvent.keyDown(toggle, { key: "ArrowRight" });
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("follows the controlled prop", async () => {
    const { rerender } = render(h(Switch, { modelValue: false }));
    const toggle = screen.getByRole("switch");

    await fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");

    await rerender({ modelValue: true });
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(toggle).toHaveAttribute("data-state", "checked");
  });

  it("works with v-model", async () => {
    const Harness = defineComponent({
      setup() {
        const on = ref(false);
        return () => [
          h(Switch, { modelValue: on.value, "onUpdate:modelValue": (v) => (on.value = v) }),
          h("output", String(on.value)),
        ];
      },
    });
    render(Harness);
    await fireEvent.click(screen.getByRole("switch"));
    expect(screen.getByRole("status")).toHaveTextContent("true");
  });

  it("ignores interaction while disabled", async () => {
    const onChange = vi.fn();
    render(h(Switch, { disabled: true, onChange }));
    const toggle = screen.getByRole("switch");

    await fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-disabled", "true");
    expect(toggle).toHaveAttribute("data-disabled", "");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders a thumb icon and rich label content when given them", () => {
    render(
      h(
        Switch,
        { id: "s" },
        {
          default: () => h("strong", "Bold label"),
          thumbIcon: () => h("span", { "data-testid": "thumb-icon" }),
        },
      ),
    );
    expect(screen.getByTestId("thumb-icon")).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: "Bold label" })).toBeInTheDocument();
  });

  it("applies the ui classes per part and passes attributes to the switch", () => {
    const { container } = render(
      h(Switch, {
        id: "x",
        label: "L",
        class: "custom",
        "data-testid": "sw",
        disabled: true,
        ui: { container: "c", switch: "s", thumb: "t", label: "l" },
      }),
    );
    expect(container.firstElementChild).toHaveClass("mild-switch-field", "c");
    const toggle = screen.getByTestId("sw");
    expect(toggle).toHaveClass("mild-switch", "s", "custom");
    expect(toggle.querySelector(".mild-switch-thumb")).toHaveClass("t");
    expect(screen.getByText("L")).toHaveClass("l", "mild-switch-label--disabled");
  });

  it("clicking the label focuses and toggles the switch once", async () => {
    const onChange = vi.fn();
    render(h(Switch, { id: "wifi", label: "Wi-Fi", onChange }));
    await fireEvent.click(screen.getByText("Wi-Fi"));
    expect(document.activeElement).toBe(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("submits through a hidden input when given a name, only while on", async () => {
    const { container } = render(
      asComponent(() => h("form", [h(Switch, { name: "wifi", value: "yes", required: true })])),
    );
    const form = container.querySelector("form")!;
    const input = container.querySelector<HTMLInputElement>('input[name="wifi"]')!;
    expect(input.required).toBe(true);
    expect(new FormData(form).get("wifi")).toBeNull();

    await fireEvent.click(screen.getByRole("switch"));
    expect(input.checked).toBe(true);
    expect(new FormData(form).get("wifi")).toBe("yes");
  });
});

itHasNoSeriousAxeViolations("Switch", () =>
  h("div", [
    h(Switch, { id: "a", label: "Off" }),
    h(Switch, { id: "b", label: "On", defaultChecked: true }),
    h(Switch, { id: "c", label: "Disabled", disabled: true }),
    h(Switch, { id: "d", label: "Required", required: true, name: "d" }),
    h(Switch, { id: "e", "aria-label": "Unlabelled" }),
  ]),
);
