import { defineComponent, h, nextTick, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { formCases } from "@mild-ui/test-cases/form";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import {
  Field,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "./index";
import { Input } from "../Input";
import { Checkbox } from "../Checkbox";
import { Select } from "../Select";
import { Switch } from "../Switch";

runComponentCases(formCases, (c) => h(FormField, caseProps(c), () => h(Input)));

describe("FormField (wired by @mild-ui/primitives/field)", () => {
  it("links the control to its label and description automatically", async () => {
    render(
      h(FormField, { name: "email", label: "Email", description: "We never share it" }, () =>
        h(Input),
      ),
    );
    await nextTick();
    const input = screen.getByLabelText("Email");

    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAccessibleDescription("We never share it");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(screen.getByText("Email")).toHaveAttribute("for", input.id);
    expect(screen.getByText("We never share it")).toHaveClass("mild-form-description");
  });

  it("sets no aria-describedby when there is nothing to describe", async () => {
    render(h(FormField, { name: "email", label: "Email" }, () => h(Input)));
    await nextTick();
    expect(screen.getByLabelText("Email")).not.toHaveAttribute("aria-describedby");
  });

  it("adds the error after the description while invalid, and drops it when fixed", async () => {
    const { rerender } = render(
      h(FormField, { name: "email", label: "Email", description: "Hint" }, () => h(Input)),
    );
    await nextTick();
    const input = screen.getByLabelText("Email");

    await rerender({ name: "email", label: "Email", description: "Hint", error: "Required" });
    await nextTick();
    const message = screen.getByRole("alert");
    expect(message).toHaveTextContent("Required");
    expect(message).toHaveClass("mild-form-message");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.getAttribute("aria-describedby")?.split(" ")).toEqual([
      screen.getByText("Hint").id,
      message.id,
    ]);
    expect(input).toHaveAccessibleDescription("Hint Required");
    expect(input.closest(".mild-form-item")).toHaveAttribute("data-invalid", "");

    await rerender({ name: "email", label: "Email", description: "Hint", error: undefined });
    await nextTick();
    expect(screen.queryByRole("alert")).toBeNull();
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).toHaveAccessibleDescription("Hint");
  });

  it("can hide the message while keeping the control invalid, or mark invalid without one", async () => {
    render(
      h(FormField, { name: "email", label: "Email", error: "Required", hideError: true }, () =>
        h(Input),
      ),
    );
    await nextTick();
    const input = screen.getByLabelText("Email");
    expect(screen.queryByRole("alert")).toBeNull();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).not.toHaveAttribute("aria-describedby");

    render(h(FormField, { name: "code", label: "Code", invalid: true }, () => h(Input)));
    await nextTick();
    expect(screen.getByLabelText("Code")).toHaveAttribute("aria-invalid", "true");
  });

  it("marks required on the control and the label marker stays decorative", async () => {
    render(h(FormField, { name: "email", label: "Email", required: true }, () => h(Input)));
    await nextTick();
    const input = screen.getByRole("textbox");
    expect(input).toBeRequired();
    expect(input).toHaveAccessibleName("Email");
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
    expect(input.closest(".mild-form-item")).toHaveAttribute("data-required", "");
  });

  it("lets the control keep its own id, name and required", async () => {
    render(
      h(FormField, { name: "email", label: "Email", required: true }, () =>
        h(Input, { id: "custom", name: "own", required: false }),
      ),
    );
    await nextTick();
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "custom");
    expect(input).toHaveAttribute("name", "own");
    expect(input).not.toBeRequired();
    expect(screen.getByText("Email")).toHaveAttribute("for", "custom");
  });

  it("renders rich label and description slots", async () => {
    render(
      h(
        FormField,
        { name: "x" },
        {
          default: () => h(Input),
          label: () => h("em", "Fancy"),
          description: () => h("strong", "Bold hint"),
        },
      ),
    );
    await nextTick();
    const input = screen.getByLabelText("Fancy");
    expect(input).toHaveAccessibleDescription("Bold hint");
  });

  it("wires a custom control such as Checkbox with aria-labelledby and label activation", async () => {
    const onChange = vi.fn();
    render(
      h(
        FormField,
        { name: "terms", label: "Terms", description: "Read them", error: "Accept the terms" },
        () => h(Checkbox, { onChange }),
      ),
    );
    await nextTick();
    const checkbox = screen.getByRole("checkbox", { name: "Terms" });

    expect(checkbox).toHaveAttribute("aria-labelledby", screen.getByText("Terms").id);
    expect(checkbox).toHaveAccessibleDescription("Read them Accept the terms");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAttribute("id");

    // Clicking the label focuses and toggles the control exactly once.
    await fireEvent.click(screen.getByText("Terms"));
    expect(document.activeElement).toBe(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("wires a Switch and forwards required", async () => {
    render(h(FormField, { name: "wifi", label: "Wi-Fi", required: true }, () => h(Switch)));
    await nextTick();
    const toggle = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(toggle).toHaveAttribute("aria-required", "true");
    await fireEvent.click(screen.getByText("Wi-Fi"));
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  it("wires a Select trigger and submits its value under the field name", async () => {
    const { container } = render(
      asComponent(() =>
        h(Form, [
          h(FormField, { name: "country", label: "Country" }, () =>
            h(Select, { options: [{ value: "mx", label: "Mexico" }], defaultValue: "mx" }),
          ),
          h("button", { type: "submit" }, "send"),
        ]),
      ),
    );
    await nextTick();
    expect(container.querySelector("form")).toHaveClass("mild-form");
    expect(screen.getByRole("combobox", { name: "Country" })).toBeInTheDocument();
    expect(new FormData(container.querySelector("form")!).get("country")).toBe("mx");
  });

  it("wires a plain element and the control found inside a wrapper", async () => {
    render(
      asComponent(() => [
        h(FormField, { name: "plain", label: "Plain" }, () => h("input")),
        h(FormField, { name: "wrapped", label: "Wrapped" }, () =>
          h("div", { class: "wrapper" }, [h("textarea")]),
        ),
        h(FormField, { name: "custom", label: "Custom" }, () =>
          h("div", [h("div", { role: "slider", tabindex: "0" })]),
        ),
        h(FormField, { name: "empty", label: "Empty" }, () => h("div", { "data-testid": "empty" })),
      ]),
    );
    await nextTick();
    expect(screen.getByLabelText("Plain").tagName).toBe("INPUT");
    expect(screen.getByLabelText("Plain")).toHaveAttribute("name", "plain");
    expect(screen.getByLabelText("Wrapped").tagName).toBe("TEXTAREA");
    expect(document.querySelector(".wrapper")).not.toHaveAttribute("id");
    expect(screen.getByRole("slider", { name: "Custom" })).toBeInTheDocument();
    // Nothing control-like inside: the wrapper itself is wired.
    expect(screen.getByTestId("empty")).toHaveAttribute("aria-labelledby");
  });

  it("keeps a consumer ref on the control", async () => {
    const input = ref<{ $el: HTMLElement } | null>(null);
    render(
      asComponent(() =>
        h(FormField, { name: "email", label: "Email" }, () => h(Input, { ref: input })),
      ),
    );
    await nextTick();
    expect(input.value?.$el).toBe(screen.getByLabelText("Email"));
  });

  it("works with plain Vue state, no form library needed", async () => {
    const SignUp = defineComponent({
      setup() {
        const email = ref("");
        const submitted = ref(false);
        return () =>
          h(
            Form,
            {
              novalidate: true,
              onSubmit: (event: Event) => {
                event.preventDefault();
                submitted.value = true;
              },
            },
            () => [
              h(
                FormField,
                {
                  name: "email",
                  label: "Email",
                  error:
                    submitted.value && !email.value.includes("@")
                      ? "Enter a valid email"
                      : undefined,
                },
                () =>
                  h(Input, {
                    modelValue: email.value,
                    "onUpdate:modelValue": (value: string) => (email.value = value),
                  }),
              ),
              h("button", { type: "submit" }, "Sign up"),
            ],
          );
      },
    });
    render(SignUp);
    await nextTick();
    const input = screen.getByLabelText("Email");

    await fireEvent.click(screen.getByText("Sign up"));
    await nextTick();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email");

    await fireEvent.update(input, "ada@example.com");
    await nextTick();
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("applies the ui classes per part", async () => {
    const { container } = render(
      h(
        FormField,
        {
          name: "x",
          label: "X",
          description: "hint",
          error: "bad",
          ui: { label: "l", control: "c", description: "d", message: "m" },
        },
        () => h(Input),
      ),
    );
    await nextTick();
    expect(screen.getByText("X")).toHaveClass("mild-label", "l");
    expect(container.querySelector("input")).toHaveClass("mild-input", "c");
    expect(screen.getByText("hint")).toHaveClass("mild-form-description", "d");
    expect(screen.getByRole("alert")).toHaveClass("mild-form-message", "m");
  });

  it("still exports the deprecated Field alias", () => {
    expect(Field).toBe(FormField);
  });
});

describe("Form parts composed by hand", () => {
  it("exposes the ids through useFormField and wires the parts the same way", async () => {
    const Ids = defineComponent({
      setup() {
        const field = useFormField();
        return () =>
          h("span", { "data-testid": "ids" }, `${field.formItemId}|${field.formMessageId}`);
      },
    });
    render(
      asComponent(() =>
        h(FormItem, { name: "age", error: "Must be a number" }, () => [
          h(FormLabel, () => "Age"),
          h(FormControl, () => h(Input)),
          h(FormDescription, () => "In years"),
          h(FormMessage),
          h(Ids),
        ]),
      ),
    );
    await nextTick();
    const input = screen.getByLabelText("Age");
    const [itemId, messageId] = screen.getByTestId("ids").textContent!.split("|");

    expect(input.id).toBe(itemId);
    expect(screen.getByRole("alert").id).toBe(messageId);
    expect(input).toHaveAccessibleDescription("In years Must be a number");
  });

  it("shows slot content in FormMessage when there is no error, and nothing otherwise", async () => {
    render(
      asComponent(() => [
        h(FormItem, { name: "a" }, () => [
          h(FormControl, () => h(Input, { "aria-label": "A" })),
          h(FormMessage, () => "Static note"),
        ]),
        h(FormItem, { name: "b" }, () => [
          h(FormControl, () => h(Input, { "aria-label": "B" })),
          h(FormMessage),
        ]),
      ]),
    );
    await nextTick();
    expect(screen.getByRole("alert")).toHaveTextContent("Static note");
    expect(screen.getAllByRole("alert")).toHaveLength(1);
    // A message is only referenced from aria-describedby while the field is invalid.
    expect(screen.getByLabelText("A")).not.toHaveAttribute("aria-describedby");
  });

  it("lets FormLabel override required and error, and applies a FormControl class", async () => {
    render(
      asComponent(() =>
        h(FormItem, { name: "x", required: true, error: "Bad" }, () => [
          h(FormLabel, { required: false, error: false }, () => "X"),
          h(FormControl, { class: "wide" }, () => h(Input)),
        ]),
      ),
    );
    await nextTick();
    const label = screen.getByText("X");
    expect(label).not.toHaveClass("mild-label--required", "mild-label--error");
    expect(screen.getByLabelText("X")).toHaveClass("mild-input", "wide");
  });

  it("throws a helpful error when a part is used outside a field", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(() => render(h(FormLabel, () => "Lost"))).toThrow(
      "<FormLabel> must be used inside <FormItem> or <FormField>",
    );
    expect(() => render(h(FormControl, () => h(Input)))).toThrow(
      "<FormControl> must be used inside <FormItem> or <FormField>",
    );
    expect(() => render(h(FormMessage))).toThrow("<FormMessage> must be used inside");
    expect(() => render(h(FormDescription, () => "x"))).toThrow(
      "<FormDescription> must be used inside",
    );
    warn.mockRestore();
  });

  it("throws when FormControl gets no child or more than one", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(() =>
      render(asComponent(() => h(FormItem, () => [h(FormControl, () => [h(Input), h(Input)])]))),
    ).toThrow("<FormControl> expects exactly one child control");
    expect(() => render(asComponent(() => h(FormItem, () => [h(FormControl, () => [])])))).toThrow(
      "<FormControl> expects exactly one child control",
    );
    warn.mockRestore();
  });
});

itHasNoSeriousAxeViolations("Form", () =>
  h(Form, () => [
    h(FormField, { name: "email", label: "Email", description: "Work address" }, () =>
      h(Input, { type: "email" }),
    ),
    h(FormField, { name: "password", label: "Password", error: "Too short", required: true }, () =>
      h(Input, { type: "password" }),
    ),
    h(FormField, { name: "terms", label: "Terms" }, () => h(Checkbox)),
    h(FormField, { name: "wifi", label: "Wi-Fi" }, () => h(Switch)),
    h(FormField, { name: "country", label: "Country" }, () =>
      h(Select, { options: [{ value: "mx", label: "Mexico" }], placeholder: "Pick" }),
    ),
  ]),
);
