import { defineComponent, h, nextTick, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { checkboxCases } from "@mild-ui/test-cases/checkbox";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Checkbox } from "./index";

runComponentCases(checkboxCases, (c) => h(Checkbox, caseProps(c)));

describe("Checkbox (driven by @mild-ui/primitives/checkbox)", () => {
  it("renders an unchecked, focusable checkbox with its label", () => {
    render(h(Checkbox, { id: "terms", label: "Accept terms" }));
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });

    expect(checkbox).toHaveAttribute("aria-checked", "false");
    expect(checkbox).toHaveAttribute("tabindex", "0");
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
    expect(screen.getByText("Accept terms")).toHaveAttribute("for", "terms");
  });

  it("toggles on click and on Space, and reports the change", async () => {
    const onChange = vi.fn();
    const { emitted } = render(h(Checkbox, { onChange }));
    const checkbox = screen.getByRole("checkbox");

    await fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(checkbox).toHaveAttribute("data-state", "checked");
    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(emitted("update:modelValue")).toEqual([[true]]);

    await fireEvent.keyDown(checkbox, { key: " " });
    expect(checkbox).toHaveAttribute("aria-checked", "false");
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it("does not toggle on Enter (reserved for submitting the form)", async () => {
    render(h(Checkbox));
    const checkbox = screen.getByRole("checkbox");

    await fireEvent.keyDown(checkbox, { key: "Enter" });

    expect(checkbox).toHaveAttribute("aria-checked", "false");
  });

  it("renders the indeterminate state and resolves it to checked on activation", async () => {
    const onChange = vi.fn();
    render(h(Checkbox, { defaultChecked: "indeterminate", onChange }));
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    expect(checkbox).toHaveAttribute("data-state", "indeterminate");

    await fireEvent.click(checkbox);

    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("treats the indeterminate prop as the mixed state, and reports the resolved value", async () => {
    const onChange = vi.fn();
    const { rerender } = render(h(Checkbox, { modelValue: false, indeterminate: true, onChange }));
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");

    await fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);
    // Still indeterminate until the parent says otherwise.
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");

    await rerender({ modelValue: true, indeterminate: false });
    expect(checkbox).toHaveAttribute("aria-checked", "true");
  });

  it("stays where the parent puts it when controlled", async () => {
    const onChange = vi.fn();
    const { rerender } = render(h(Checkbox, { modelValue: false, onChange }));
    const checkbox = screen.getByRole("checkbox");

    await fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);
    // The parent did not update the prop, so the DOM is synced back to unchecked.
    expect(checkbox).toHaveAttribute("aria-checked", "false");

    await rerender({ modelValue: "indeterminate" });
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
  });

  it("works with v-model", async () => {
    const Harness = defineComponent({
      setup() {
        const checked = ref<boolean | "indeterminate">(false);
        return () => [
          h(Checkbox, {
            modelValue: checked.value,
            "onUpdate:modelValue": (value) => (checked.value = value),
          }),
          h("output", String(checked.value)),
        ];
      },
    });
    render(Harness);

    await fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("status")).toHaveTextContent("true");
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true");
  });

  it("ignores interaction while disabled and reflects it with aria-disabled", async () => {
    const onChange = vi.fn();
    render(h(Checkbox, { disabled: true, onChange }));
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveAttribute("aria-disabled", "true");
    expect(checkbox).toHaveAttribute("data-disabled", "");
    await fireEvent.click(checkbox);

    expect(checkbox).toHaveAttribute("aria-checked", "false");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("shows the default check mark, or the icon passed in", async () => {
    const { container, rerender } = render(h(Checkbox, { defaultChecked: true }));
    expect(container.querySelector("[data-indicator] svg")).not.toBeNull();

    const { container: custom } = render(
      h(Checkbox, { defaultChecked: true }, { icon: () => h("span", { "data-testid": "custom" }) }),
    );
    expect(custom.querySelector("[data-testid=custom]")).not.toBeNull();
    expect(custom.querySelector("[data-indicator] svg")).toBeNull();

    await rerender({ defaultChecked: true, indeterminate: true });
    expect(container.querySelector("[data-indicator] svg path")).toHaveAttribute("d", "M5 12h14");
  });

  it("renders a custom indeterminate icon and rich label content from the default slot", () => {
    render(
      h(
        Checkbox,
        { id: "all", indeterminate: true },
        {
          default: () => h("em", "Select all"),
          indeterminateIcon: () => h("span", { "data-testid": "mixed-icon" }),
        },
      ),
    );
    expect(screen.getByRole("checkbox", { name: "Select all" })).toBeInTheDocument();
    expect(screen.getByTestId("mixed-icon")).toBeInTheDocument();
  });

  it("puts class and aria attributes on the checkbox itself, not the wrapper", () => {
    const { container } = render(
      h(Checkbox, { class: "custom", "aria-label": "Custom", "data-testid": "cb" }),
    );
    const checkbox = screen.getByRole("checkbox", { name: "Custom" });
    expect(checkbox).toHaveClass("mild-checkbox", "custom");
    expect(checkbox).toHaveAttribute("data-testid", "cb");
    expect(container.firstElementChild).toHaveClass("mild-checkbox-field");
    expect(container.firstElementChild).not.toHaveClass("custom");
  });

  it("applies the ui classes per part", () => {
    const { container } = render(
      h(Checkbox, {
        id: "u",
        label: "Parts",
        defaultChecked: true,
        ui: { container: "c", checkbox: "b", indicator: "i", label: "l" },
      }),
    );
    expect(container.firstElementChild).toHaveClass("mild-checkbox-field", "c");
    expect(screen.getByRole("checkbox")).toHaveClass("mild-checkbox", "b");
    expect(container.querySelector("[data-indicator]")).toHaveClass(
      "mild-checkbox__indicator",
      "i",
    );
    expect(screen.getByText("Parts")).toHaveClass("mild-checkbox-label", "l");
  });

  it("marks the label required and disabled along with the control", () => {
    render(h(Checkbox, { id: "x", label: "Needed", required: true, disabled: true }));
    const checkbox = screen.getByRole("checkbox", { name: "Needed" });
    expect(checkbox).toHaveAttribute("aria-required", "true");
    expect(screen.getByText("Needed")).toHaveClass("mild-checkbox-label--disabled");
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
  });

  it("submits through a hidden input when given a name", () => {
    const { container } = render(
      h(Checkbox, { name: "terms", value: "yes", defaultChecked: true }),
    );
    const input = container.querySelector<HTMLInputElement>('input[name="terms"]');

    expect(input).not.toBeNull();
    expect(input?.checked).toBe(true);
    expect(input?.value).toBe("yes");
  });
});

describe("Checkbox a11y contract", () => {
  it("indeterminate is announced as mixed and Space resolves it to checked", async () => {
    render(h(Checkbox, { defaultChecked: "indeterminate", label: "Select all" }));
    const checkbox = screen.getByRole("checkbox", { name: "Select all" });
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    expect(checkbox).toHaveAttribute("tabindex", "0");

    await fireEvent.keyDown(checkbox, { key: " " });
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    await fireEvent.keyDown(checkbox, { key: " " });
    expect(checkbox).toHaveAttribute("aria-checked", "false");
  });

  it("the indeterminate prop pins the mixed state until the parent changes it", async () => {
    const { rerender } = render(h(Checkbox, { indeterminate: true }));
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");

    await fireEvent.keyDown(checkbox, { key: " " });
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");

    await rerender({ indeterminate: false, defaultChecked: true });
    await nextTick();
    expect(checkbox).toHaveAttribute("aria-checked", "true");
  });

  it("clicking the label focuses and toggles the checkbox exactly once", async () => {
    const onChange = vi.fn();
    render(h(Checkbox, { id: "terms", label: "Terms", onChange }));

    await fireEvent.click(screen.getByText("Terms"));

    expect(document.activeElement).toBe(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("submits inside a <form> only while checked", async () => {
    const { container } = render(
      asComponent(() => h("form", [h(Checkbox, { name: "terms", value: "yes" })])),
    );
    const form = container.querySelector("form")!;

    expect(new FormData(form).get("terms")).toBeNull();
    await fireEvent.click(screen.getByRole("checkbox"));
    expect(new FormData(form).get("terms")).toBe("yes");
  });
});

itHasNoSeriousAxeViolations("Checkbox", () =>
  h("div", [
    h(Checkbox, { id: "a", label: "Unchecked" }),
    h(Checkbox, { id: "b", label: "Checked", defaultChecked: true }),
    h(Checkbox, { id: "c", label: "Mixed", indeterminate: true }),
    h(Checkbox, { id: "d", label: "Disabled", disabled: true }),
    h(Checkbox, { id: "e", label: "Required", required: true, name: "e" }),
    h(Checkbox, { id: "f", "aria-label": "No visible label" }),
  ]),
);
