import { defineComponent, h, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { segmentedControlCases } from "@mild-ui/test-cases/segmented-control";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { SegmentedControl, type SegmentedControlProps } from "./index";

const items = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

runComponentCases(segmentedControlCases, (c) =>
  h(SegmentedControl, caseProps<SegmentedControlProps>(c)),
);

describe("SegmentedControl (driven by @mild-ui/primitives/radio-group)", () => {
  it("renders a radiogroup of buttons with one tab stop", () => {
    render(h(SegmentedControl, { items, "aria-label": "Range" }));
    expect(screen.getByRole("radiogroup", { name: "Range" })).toHaveClass("mild-segmented-control");
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
    expect(radios.every((radio) => radio.tagName === "BUTTON")).toBe(true);
    // Nothing checked: the first segment is the tab stop.
    expect(radios.map((radio) => radio.getAttribute("tabindex"))).toEqual(["0", "-1", "-1"]);
  });

  it("selects on click (uncontrolled) and reports the value", async () => {
    const onChange = vi.fn();
    const { emitted } = render(h(SegmentedControl, { items, defaultValue: "day", onChange }));
    await fireEvent.click(screen.getByRole("radio", { name: "Week" }));
    expect(onChange).toHaveBeenCalledWith("week");
    expect(emitted("update:modelValue")).toEqual([["week"]]);
    expect(screen.getByRole("radio", { name: "Week" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Week" })).toHaveAttribute("data-state", "checked");
    expect(screen.getByRole("radio", { name: "Day" })).toHaveAttribute("aria-checked", "false");
  });

  it("follows the controlled value and snaps back when the parent ignores a change", async () => {
    const onChange = vi.fn();
    const { rerender } = render(h(SegmentedControl, { items, modelValue: "day", onChange }));
    await fireEvent.click(screen.getByRole("radio", { name: "Month" }));
    expect(onChange).toHaveBeenCalledWith("month");
    expect(screen.getByRole("radio", { name: "Day" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Month" })).toHaveAttribute("aria-checked", "false");

    await rerender({ items, modelValue: "month" });
    expect(screen.getByRole("radio", { name: "Month" })).toHaveAttribute("aria-checked", "true");
  });

  it("works with v-model", async () => {
    const Harness = defineComponent({
      setup() {
        const range = ref("day");
        return () => [
          h(SegmentedControl, {
            items,
            modelValue: range.value,
            "onUpdate:modelValue": (v) => (range.value = v),
          }),
          h("output", range.value),
        ];
      },
    });
    render(Harness);
    await fireEvent.click(screen.getByRole("radio", { name: "Week" }));
    expect(screen.getByRole("status")).toHaveTextContent("week");
  });

  it("moves and selects with the Arrow keys, and checks with Space", async () => {
    const onChange = vi.fn();
    render(h(SegmentedControl, { items, defaultValue: "day", onChange }));
    const day = screen.getByRole("radio", { name: "Day" });
    day.focus();
    await fireEvent.keyDown(day, { key: "ArrowRight" });
    expect(onChange).toHaveBeenLastCalledWith("week");
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: "Week" }));

    await fireEvent.keyDown(document.activeElement!, { key: "ArrowLeft" });
    expect(onChange).toHaveBeenLastCalledWith("day");
    await fireEvent.keyDown(document.activeElement!, { key: " " });
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it("never selects a disabled segment, and labels default to the value", async () => {
    const onChange = vi.fn();
    render(
      h(SegmentedControl, {
        items: [...items, { value: "year", disabled: true }],
        onChange,
      }),
    );
    const year = screen.getByRole("radio", { name: "year" });
    expect(year).toBeDisabled();
    await fireEvent.click(year);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("submits through a hidden input that follows the value", async () => {
    const { container } = render(
      h(SegmentedControl, { items, name: "range", defaultValue: "day" }),
    );
    const hidden = container.querySelector<HTMLInputElement>("input[name='range']");
    expect(hidden).toHaveValue("day");
    await fireEvent.click(screen.getByRole("radio", { name: "Month" }));
    expect(hidden).toHaveValue("month");
  });

  it("submits an empty value while nothing is selected", () => {
    const { container } = render(h(SegmentedControl, { items, name: "range" }));
    expect(container.querySelector("input[name='range']")).toHaveValue("");
  });

  it("applies the ui item class", () => {
    render(h(SegmentedControl, { items, ui: { item: "seg" } }));
    for (const radio of screen.getAllByRole("radio"))
      expect(radio).toHaveClass("mild-segmented-control__item", "seg");
  });
});

itHasNoSeriousAxeViolations("SegmentedControl", () =>
  h("div", [
    h(SegmentedControl, { items, defaultValue: "day", "aria-label": "Range" }),
    h(SegmentedControl, {
      items,
      size: "sm",
      orientation: "vertical",
      disabled: true,
      "aria-label": "Off",
    }),
  ]),
);
