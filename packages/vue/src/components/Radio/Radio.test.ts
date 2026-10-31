import { defineComponent, h, nextTick, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { radioCases } from "@mild-ui/test-cases/radio";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Radio, RadioGroup, RadioGroupItem, useRadioGroup } from "./index";

const items = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Bravo" },
  { value: "c", label: "Charlie" },
];

function tabIndexes(): string[] {
  return screen.getAllByRole("radio").map((radio) => radio.getAttribute("tabindex") ?? "");
}

runComponentCases(radioCases, (c) => h(Radio, caseProps(c)));

describe("Radio (driven by @mild-ui/primitives/radio-group)", () => {
  it("renders a radiogroup whose checked radio is the single tab stop", () => {
    render(h(Radio, { items, defaultValue: "b" }));

    expect(screen.getByRole("radiogroup")).toHaveClass("mild-radio-group");
    expect(screen.getByRole("radio", { name: "Bravo" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Bravo" })).toHaveAttribute("data-state", "checked");
    expect(tabIndexes()).toEqual(["-1", "0", "-1"]);
  });

  it("makes the first radio the tab stop when nothing is checked", () => {
    render(h(Radio, { items }));

    expect(tabIndexes()).toEqual(["0", "-1", "-1"]);
  });

  it("checks on click and reports the value", async () => {
    const onChange = vi.fn();
    const { emitted } = render(h(Radio, { items, onChange }));

    await fireEvent.click(screen.getByRole("radio", { name: "Charlie" }));

    expect(onChange).toHaveBeenCalledWith("c");
    expect(emitted("update:modelValue")).toEqual([["c"]]);
    expect(screen.getByRole("radio", { name: "Charlie" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Charlie" })).toHaveAttribute("data-state", "checked");
    expect(tabIndexes()).toEqual(["-1", "-1", "0"]);
  });

  it("moves and checks with the arrow keys, wrapping at both ends", async () => {
    const onChange = vi.fn();
    render(h(Radio, { items, defaultValue: "a", onChange }));
    const group = screen.getByRole("radiogroup");

    screen.getByRole("radio", { name: "Alpha" }).focus();
    await fireEvent.keyDown(group, { key: "ArrowDown" });
    expect(onChange).toHaveBeenLastCalledWith("b");
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: "Bravo" }));

    await fireEvent.keyDown(group, { key: "ArrowRight" });
    expect(onChange).toHaveBeenLastCalledWith("c");
    await fireEvent.keyDown(group, { key: "ArrowDown" });
    expect(onChange).toHaveBeenLastCalledWith("a");

    await fireEvent.keyDown(group, { key: "ArrowUp" });
    expect(onChange).toHaveBeenLastCalledWith("c");
    await fireEvent.keyDown(group, { key: "ArrowLeft" });
    expect(onChange).toHaveBeenLastCalledWith("b");
    expect(tabIndexes()).toEqual(["-1", "0", "-1"]);
  });

  it("checks the focused radio with Space without moving focus", async () => {
    const onChange = vi.fn();
    render(h(Radio, { items, onChange }));
    const bravo = screen.getByRole("radio", { name: "Bravo" });

    bravo.focus();
    await fireEvent.keyDown(screen.getByRole("radiogroup"), { key: " " });

    expect(onChange).toHaveBeenCalledWith("b");
    expect(document.activeElement).toBe(bravo);
  });

  it("skips disabled radios", async () => {
    const onChange = vi.fn();
    render(
      asComponent(() =>
        h(RadioGroup, { defaultValue: "a", onChange }, () => [
          h(RadioGroupItem, { value: "a", label: "Alpha" }),
          h(RadioGroupItem, { value: "b", label: "Bravo", disabled: true }),
          h(RadioGroupItem, { value: "c", label: "Charlie" }),
        ]),
      ),
    );

    expect(screen.getByRole("radio", { name: "Bravo" })).toHaveAttribute("aria-disabled", "true");
    screen.getByRole("radio", { name: "Alpha" }).focus();
    await fireEvent.keyDown(screen.getByRole("radiogroup"), { key: "ArrowDown" });

    expect(onChange).toHaveBeenLastCalledWith("c");
    await fireEvent.click(screen.getByRole("radio", { name: "Bravo" }));
    expect(onChange).not.toHaveBeenCalledWith("b");
  });

  it("disables every radio when the group is disabled", () => {
    render(h(Radio, { items, disabled: true, required: true }));
    const group = screen.getByRole("radiogroup");
    expect(group).toHaveAttribute("aria-disabled", "true");
    expect(group).toHaveAttribute("aria-required", "true");
    for (const radio of screen.getAllByRole("radio")) {
      expect(radio).toHaveAttribute("data-disabled", "");
    }
    expect(screen.getByText("Alpha")).toHaveClass("mild-radio-label--disabled");
  });

  it("follows the controlled value", async () => {
    const { rerender } = render(h(Radio, { items, modelValue: "a" }));

    await fireEvent.click(screen.getByRole("radio", { name: "Bravo" }));
    expect(screen.getByRole("radio", { name: "Alpha" })).toHaveAttribute("aria-checked", "true");

    await rerender({ modelValue: "c" });
    expect(screen.getByRole("radio", { name: "Charlie" })).toHaveAttribute("aria-checked", "true");
    expect(tabIndexes()).toEqual(["-1", "-1", "0"]);
  });

  it("works with v-model", async () => {
    const Harness = defineComponent({
      setup() {
        const value = ref("a");
        return () => [
          h(Radio, {
            items,
            modelValue: value.value,
            "onUpdate:modelValue": (v) => (value.value = v),
          }),
          h("output", value.value),
        ];
      },
    });
    render(Harness);
    await fireEvent.click(screen.getByRole("radio", { name: "Charlie" }));
    expect(screen.getByRole("status")).toHaveTextContent("c");
  });

  it("picks up radios added after mount", async () => {
    const { rerender } = render(h(Radio, { items: items.slice(0, 2) }));
    await rerender({ items });
    await nextTick();

    await fireEvent.click(screen.getByRole("radio", { name: "Charlie" }));

    expect(screen.getByRole("radio", { name: "Charlie" })).toHaveAttribute("aria-checked", "true");
  });

  it("shows the default dot, or the indicator passed in, and rich labels", async () => {
    render(
      asComponent(() =>
        h(RadioGroup, { defaultValue: "a" }, () => [
          h(
            RadioGroupItem,
            { value: "a" },
            {
              default: () => h("em", "Alpha"),
              indicator: () => h("span", { "data-testid": "custom" }),
            },
          ),
          h(RadioGroupItem, { value: "b", label: "Bravo", id: "custom-id", class: "extra" }),
        ]),
      ),
    );

    expect(screen.getByTestId("custom")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Alpha" })).toHaveAttribute("id", "radio-a");
    const bravo = screen.getByRole("radio", { name: "Bravo" });
    expect(bravo).toHaveAttribute("id", "custom-id");
    expect(bravo).toHaveClass("mild-radio", "extra");
    await fireEvent.click(bravo);
    expect(bravo.querySelector("svg")).not.toBeNull();
  });

  it("clicking a label focuses and checks its radio", async () => {
    render(h(Radio, { items }));
    await fireEvent.click(screen.getByText("Bravo"));
    const bravo = screen.getByRole("radio", { name: "Bravo" });
    expect(document.activeElement).toBe(bravo);
    expect(bravo).toHaveAttribute("aria-checked", "true");
  });

  it("renders slot children instead of items, and an empty hidden input when nothing is checked", () => {
    const { container } = render(
      asComponent(() =>
        h(Radio, { name: "letter", "aria-label": "Letters" }, () => [
          h(RadioGroupItem, { value: "x", label: "X-ray" }),
          h(RadioGroupItem, { value: "y", label: "Yankee" }),
        ]),
      ),
    );
    expect(screen.getAllByRole("radio")).toHaveLength(2);
    expect(container.querySelector<HTMLInputElement>('input[name="letter"]')?.value).toBe("");
  });

  it("exposes the group to custom items through useRadioGroup", async () => {
    const CustomItem = defineComponent({
      setup() {
        const group = useRadioGroup();
        return () =>
          h(
            "output",
            `${group?.value.value ?? "none"}|${group?.disabled.value}|${group?.required.value}`,
          );
      },
    });
    render(
      asComponent(() =>
        h(RadioGroup, { defaultValue: "a", required: true }, () => [
          h(RadioGroupItem, { value: "a", label: "Alpha" }),
          h(CustomItem),
        ]),
      ),
    );
    expect(screen.getByRole("status")).toHaveTextContent("a|false|true");
  });

  it("applies the ui classes per part of the group and the items", () => {
    const { container } = render(
      h(Radio, { items, defaultValue: "a", ui: { container: "g", items: "r" } }),
    );
    expect(container.firstElementChild).toHaveClass("mild-radio-group", "g");
    for (const radio of screen.getAllByRole("radio")) expect(radio).toHaveClass("mild-radio", "r");

    render(
      asComponent(() =>
        h(RadioGroup, { defaultValue: "x", "aria-label": "Parts" }, () =>
          h(RadioGroupItem, {
            value: "x",
            label: "X-ray",
            ui: { container: "c", radio: "b", indicator: "i", label: "l" },
          }),
        ),
      ),
    );
    const radio = screen.getByRole("radio", { name: "X-ray" });
    expect(radio).toHaveClass("mild-radio", "b");
    expect(radio.parentElement).toHaveClass("mild-radio-field", "c");
    expect(radio.querySelector("[data-indicator]")).toHaveClass("mild-radio__indicator", "i");
    expect(screen.getByText("X-ray")).toHaveClass("mild-radio-label", "l");
  });

  it("renders an item without a label and without a group", () => {
    render(h(RadioGroupItem, { value: "lonely", "aria-label": "Lonely" }));
    const radio = screen.getByRole("radio", { name: "Lonely" });
    expect(radio).toHaveAttribute("aria-checked", "false");
    expect(radio).not.toHaveAttribute("aria-labelledby");
  });

  it("submits the value through a hidden input when given a name", async () => {
    const { container } = render(
      asComponent(() => h("form", [h(Radio, { items, name: "letter", defaultValue: "b" })])),
    );
    const form = container.querySelector("form")!;
    expect(new FormData(form).get("letter")).toBe("b");
    await fireEvent.click(screen.getByRole("radio", { name: "Charlie" }));
    expect(new FormData(form).get("letter")).toBe("c");
  });
});

itHasNoSeriousAxeViolations("Radio", () =>
  h("div", [
    h(Radio, { items, defaultValue: "a", "aria-label": "Letters" }),
    h(Radio, {
      items: [...items, { value: "d", label: "Delta", disabled: true }],
      disabled: true,
      "aria-label": "Disabled letters",
    }),
    h(RadioGroup, { "aria-label": "Custom" }, () => [
      h(RadioGroupItem, { value: "x", size: "lg" }, () => "Custom label"),
    ]),
  ]),
);
