import { defineComponent, h, nextTick, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { textareaCases } from "@mild-ui/test-cases/textarea";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Textarea } from "./index";
import { FormField } from "../Form";

runComponentCases(textareaCases, (c) => h(Textarea, caseProps(c)));

describe("Textarea", () => {
  it("renders a textarea and forwards its attributes", () => {
    render(h(Textarea, { name: "message", rows: 6, placeholder: "Say hi" }));
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("name", "message");
    expect(textarea).toHaveAttribute("rows", "6");
    expect(textarea).toHaveAttribute("placeholder", "Say hi");
    expect(textarea).not.toHaveAttribute("data-controlled");
  });

  it("supports v-model and reports controlled use", async () => {
    const Harness = defineComponent({
      setup() {
        const value = ref("hi");
        return () => [
          h(Textarea, { modelValue: value.value, "onUpdate:modelValue": (v) => (value.value = v) }),
          h("output", value.value),
        ];
      },
    });
    render(Harness);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("data-controlled", "true");
    await fireEvent.update(textarea, "hello");
    expect(screen.getByRole("status")).toHaveTextContent("hello");
  });

  it("fits its height to the content when autoResize is on", async () => {
    const { rerender } = render(h(Textarea, { autoResize: true, modelValue: "a" }));
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    // jsdom does not lay out, so scrollHeight is faked.
    Object.defineProperty(textarea, "scrollHeight", { value: 120, configurable: true });
    await fireEvent.input(textarea, { target: { value: "a\nb\nc" } });
    expect(textarea.style.height).toBe("120px");

    // A value change from outside refits too.
    Object.defineProperty(textarea, "scrollHeight", { value: 80, configurable: true });
    await rerender({ autoResize: true, modelValue: "a\nb" });
    await nextTick();
    expect(textarea.style.height).toBe("80px");
  });

  it("leaves the height alone without autoResize", async () => {
    render(h(Textarea));
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    await fireEvent.input(textarea, { target: { value: "a\nb" } });
    expect(textarea.style.height).toBe("");
  });

  it("maps the native spellings onto the attributes and classes", () => {
    render(h(Textarea, { disabled: true, readonly: true, required: true, error: true }));
    const textarea = screen.getByRole("textbox", { hidden: true });
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute("readonly");
    expect(textarea).toBeRequired();
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveClass(
      "mild-textarea--disabled",
      "mild-textarea--readonly",
      "mild-textarea--required",
      "mild-textarea--error",
    );
  });

  it("is wired by FormField like an input", async () => {
    render(
      h(
        FormField,
        {
          name: "bio",
          label: "Bio",
          description: "Tell us more",
          error: "Too short",
          required: true,
        },
        () => h(Textarea),
      ),
    );
    await nextTick();
    const textarea = screen.getByRole("textbox", { name: "Bio" });
    expect(textarea).toHaveAttribute("name", "bio");
    expect(textarea).toBeRequired();
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription("Tell us more Too short");
  });
});

itHasNoSeriousAxeViolations("Textarea", () =>
  h("div", [
    h(Textarea, { "aria-label": "Message" }),
    h(Textarea, { "aria-label": "Bio", autoResize: true, error: true, variant: "filled" }),
    h(Textarea, { "aria-label": "Notes", disabled: true, size: "sm" }),
  ]),
);
