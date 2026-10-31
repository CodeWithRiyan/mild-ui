import { defineComponent, h, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { toggleGroupCases } from "@mild-ui/test-cases/toggle-group";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { ToggleGroup, ToggleGroupItem } from "./index";

runComponentCases(toggleGroupCases, (c) =>
  h(ToggleGroup, caseProps(c), () => [
    h(ToggleGroupItem, { value: "left" }, () => "left"),
    h(ToggleGroupItem, { value: "center" }, () => "center"),
    h(ToggleGroupItem, { value: "right", disabled: true }, () => "right"),
  ]),
);

function renderGroup(props: Record<string, unknown> = {}) {
  return render(
    asComponent(() =>
      h(ToggleGroup, { "aria-label": "Format", ...props }, () => [
        h(ToggleGroupItem, { value: "bold" }, () => "Bold"),
        h(ToggleGroupItem, { value: "italic" }, () => "Italic"),
        h(ToggleGroupItem, { value: "underline" }, () => "Underline"),
      ]),
    ),
  );
}

const pressed = () =>
  screen.getAllByRole("button").map((button) => button.getAttribute("aria-pressed"));

describe("ToggleGroup (driven by @mild-ui/primitives/toggle-group)", () => {
  it("renders a group of toggles with one tab stop", () => {
    renderGroup();
    expect(screen.getByRole("group", { name: "Format" })).toHaveClass("mild-toggle-group");
    const buttons = screen.getAllByRole("button");
    expect(buttons.map((button) => button.getAttribute("tabindex"))).toEqual(["0", "-1", "-1"]);
    expect(buttons[0]).toHaveAttribute("data-value", "bold");
    expect(buttons[0]).toHaveClass("mild-toggle", "mild-toggle-group__item");
  });

  it("single: presses one at a time, deselects on a second press, reports string | null", async () => {
    const onChange = vi.fn();
    renderGroup({ onChange });
    await fireEvent.click(screen.getByRole("button", { name: "Bold" }));
    expect(pressed()).toEqual(["true", "false", "false"]);
    expect(onChange).toHaveBeenLastCalledWith("bold");

    await fireEvent.click(screen.getByRole("button", { name: "Italic" }));
    expect(pressed()).toEqual(["false", "true", "false"]);
    expect(onChange).toHaveBeenLastCalledWith("italic");

    await fireEvent.click(screen.getByRole("button", { name: "Italic" }));
    expect(pressed()).toEqual(["false", "false", "false"]);
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it("multiple: toggles independently and reports an array", async () => {
    const onChange = vi.fn();
    renderGroup({ type: "multiple", defaultValue: ["bold"], onChange });
    await fireEvent.click(screen.getByRole("button", { name: "Underline" }));
    expect(pressed()).toEqual(["true", "false", "true"]);
    expect(onChange).toHaveBeenLastCalledWith(["bold", "underline"]);

    await fireEvent.click(screen.getByRole("button", { name: "Bold" }));
    expect(onChange).toHaveBeenLastCalledWith(["underline"]);
  });

  it("follows a controlled value and snaps back when the parent ignores a change", async () => {
    const onChange = vi.fn();
    const value = ref<string | null>("bold");
    render(
      asComponent(() =>
        h(ToggleGroup, { modelValue: value.value, onChange }, () => [
          h(ToggleGroupItem, { value: "bold" }, () => "Bold"),
          h(ToggleGroupItem, { value: "italic" }, () => "Italic"),
        ]),
      ),
    );
    await fireEvent.click(screen.getByRole("button", { name: "Italic" }));
    expect(onChange).toHaveBeenCalledWith("italic");
    expect(pressed()).toEqual(["true", "false"]);

    value.value = "italic";
    await fireEvent.click(document.body); // flush a tick
    expect(pressed()).toEqual(["false", "true"]);
  });

  it("works with v-model in both modes", async () => {
    const Harness = defineComponent({
      setup() {
        const single = ref<string | null>(null);
        const multiple = ref<string[]>([]);
        return () => [
          h(
            ToggleGroup,
            {
              "aria-label": "S",
              modelValue: single.value,
              "onUpdate:modelValue": (v) => (single.value = v as string | null),
            },
            () => [h(ToggleGroupItem, { value: "a" }, () => "A")],
          ),
          h(
            ToggleGroup,
            {
              "aria-label": "M",
              type: "multiple",
              modelValue: multiple.value,
              "onUpdate:modelValue": (v) => (multiple.value = v as string[]),
            },
            () => [
              h(ToggleGroupItem, { value: "x" }, () => "X"),
              h(ToggleGroupItem, { value: "y" }, () => "Y"),
            ],
          ),
          h("output", `${single.value}|${multiple.value.join(",")}`),
        ];
      },
    });
    render(Harness);
    await fireEvent.click(screen.getByRole("button", { name: "A" }));
    await fireEvent.click(screen.getByRole("button", { name: "X" }));
    await fireEvent.click(screen.getByRole("button", { name: "Y" }));
    expect(screen.getByRole("status")).toHaveTextContent("a|x,y");
  });

  it("moves focus with the Arrow keys, Home and End without pressing", async () => {
    const onChange = vi.fn();
    renderGroup({ onChange });
    const bold = screen.getByRole("button", { name: "Bold" });
    bold.focus();
    await fireEvent.keyDown(bold, { key: "ArrowRight" });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Italic" }));
    await fireEvent.keyDown(document.activeElement!, { key: "End" });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Underline" }));
    await fireEvent.keyDown(document.activeElement!, { key: "Home" });
    expect(document.activeElement).toBe(bold);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("wraps with the Arrow keys unless loop is off", async () => {
    renderGroup({ loop: false });
    const bold = screen.getByRole("button", { name: "Bold" });
    bold.focus();
    await fireEvent.keyDown(bold, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(bold);

    renderGroup({ "aria-label": "Looping" });
    const [first] = screen.getAllByRole("button", { name: "Bold" }).slice(-1);
    first.focus();
    await fireEvent.keyDown(first, { key: "ArrowLeft" });
    expect(document.activeElement).toHaveTextContent("Underline");
  });

  it("disables every item when the group is disabled, and items can be disabled alone", async () => {
    const onChange = vi.fn();
    renderGroup({
      disabled: true,
      onChange,
      variant: "outline",
      size: "sm",
      attached: true,
      orientation: "vertical",
    });
    for (const button of screen.getAllByRole("button")) {
      expect(button).toBeDisabled();
      expect(button).toHaveClass("mild-toggle--outline", "mild-toggle--sm");
    }
    expect(screen.getByRole("group")).toHaveClass(
      "mild-toggle-group--attached",
      "mild-toggle-group--vertical",
    );
    await fireEvent.click(screen.getByRole("button", { name: "Bold" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("requires items to be inside a group", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(() => render(h(ToggleGroupItem, { value: "x" }, () => "x"))).toThrow(
      /inside <ToggleGroup>/,
    );
    warn.mockRestore();
  });
});

itHasNoSeriousAxeViolations("ToggleGroup", () =>
  h("div", [
    h(ToggleGroup, { "aria-label": "Format", defaultValue: "bold" }, () => [
      h(ToggleGroupItem, { value: "bold" }, () => "Bold"),
      h(ToggleGroupItem, { value: "italic" }, () => "Italic"),
    ]),
    h(
      ToggleGroup,
      { "aria-label": "Align", type: "multiple", attached: true, disabled: true },
      () => [
        h(ToggleGroupItem, { value: "l" }, () => "Left"),
        h(ToggleGroupItem, { value: "r" }, () => "Right"),
      ],
    ),
  ]),
);
