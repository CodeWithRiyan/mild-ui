import { defineComponent, h, nextTick, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { inputCases } from "@mild-ui/test-cases/input";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Input } from "./index";
import { InputPassword } from "../InputPassword";
import { FormField } from "../Form";

runComponentCases(inputCases, (c) => h(Input, caseProps(c)));

describe("Input", () => {
  it("is valid by default: no aria-invalid, uncontrolled", () => {
    render(h(Input));
    const input = screen.getByRole("textbox");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("data-controlled");
  });

  it.each([
    ["error", { error: true }],
    ["isInvalid", { isInvalid: true }],
  ])("sets aria-invalid and the error class when %s is true", (_name, props) => {
    render(h(Input, props));
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveClass("mild-input--error");
  });

  it("maps isDisabled / isReadOnly / isRequired onto the native attributes", () => {
    render(h(Input, { isDisabled: true, isReadOnly: true, isRequired: true }));
    const input = screen.getByRole("textbox", { hidden: true });
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("readonly");
    expect(input).toBeRequired();
  });

  it("accepts the native spellings too", () => {
    render(h(Input, { disabled: true, readonly: true, required: true }));
    const input = screen.getByRole("textbox", { hidden: true });
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("readonly");
    expect(input).toBeRequired();
    expect(input).toHaveClass(
      "mild-input--disabled",
      "mild-input--readonly",
      "mild-input--required",
    );
  });

  it("keeps styling-only props off the DOM", () => {
    render(
      h(Input, {
        isInvalid: true,
        colorScheme: "primary",
        errorBorderColor: "red",
        focusBorderColor: "blue",
        variant: "filled",
        size: "sm",
        fullWidth: false,
      }),
    );
    const input = screen.getByRole("textbox");
    for (const attr of ["isinvalid", "colorscheme", "errorbordercolor", "focusbordercolor"]) {
      expect(input).not.toHaveAttribute(attr);
    }
    expect(input).toHaveClass("mild-input--filled", "mild-input--sm");
    expect(input).not.toHaveClass("mild-input--full-width");
  });

  it("forwards id, name, type, placeholder and other attributes", () => {
    render(h(Input, { id: "email", name: "email", type: "email", placeholder: "you@example.com" }));
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "email");
    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "you@example.com");
  });

  it("supports v-model", async () => {
    const Harness = defineComponent({
      setup() {
        const value = ref("");
        return () => [
          h(Input, { modelValue: value.value, "onUpdate:modelValue": (v) => (value.value = v) }),
          h("output", value.value),
        ];
      },
    });
    render(Harness);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("data-controlled", "true");

    await fireEvent.update(input, "ada");
    expect(screen.getByRole("status")).toHaveTextContent("ada");
    expect(input).toHaveValue("ada");
  });

  it("merges a consumer-provided aria-describedby", () => {
    render(
      asComponent(() => [
        h(Input, { "aria-describedby": "hint", error: true }),
        h("p", { id: "hint" }, "Hint"),
      ]),
    );
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription("Hint");
  });
});

describe.each([
  ["Input", Input],
  ["InputPassword", InputPassword],
])("%s inside a FormField", (_name, Control) => {
  it("sets aria-invalid and links the error message through aria-describedby", async () => {
    const error = ref<string | undefined>(undefined);
    const { container } = render(
      asComponent(() => [
        h(
          FormField,
          { name: "secret", label: "Secret", description: "Keep it safe", error: error.value },
          () => h(Control),
        ),
        h("button", { type: "button", onClick: () => (error.value = "Too short") }, "fail"),
        h("button", { type: "button", onClick: () => (error.value = undefined) }, "fix"),
      ]),
    );
    const input = container.querySelector("input")!;
    // The field primitive wires the parts once they are all mounted: one tick.
    await nextTick();

    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).toHaveAccessibleDescription("Keep it safe");
    expect(input).toHaveAttribute("name", "secret");

    await fireEvent.click(screen.getByText("fail"));
    const message = screen.getByText("Too short");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.getAttribute("aria-describedby")?.split(" ")).toContain(message.id);
    expect(input).toHaveAccessibleDescription("Keep it safe Too short");

    await fireEvent.click(screen.getByText("fix"));
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).toHaveAccessibleDescription("Keep it safe");
  });
});

itHasNoSeriousAxeViolations("Input", () =>
  h("div", [
    h(Input, { "aria-label": "Name" }),
    h(Input, { "aria-label": "Email", type: "email", error: true, required: true }),
    h(Input, { "aria-label": "Disabled", disabled: true, variant: "filled" }),
    h(Input, { "aria-label": "Readonly", readonly: true, modelValue: "fixed" }),
  ]),
);
