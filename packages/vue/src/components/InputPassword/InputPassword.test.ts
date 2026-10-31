import { defineComponent, h, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { inputPasswordCases } from "@mild-ui/test-cases/input-password";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { InputPassword } from "./index";

runComponentCases(inputPasswordCases, (c) => h(InputPassword, caseProps(c)));

describe("InputPassword", () => {
  it("toggles between password and text with an announced pressed state", async () => {
    const { container } = render(h(InputPassword));
    const input = container.querySelector("input")!;
    const toggle = screen.getByRole("button", { name: "Show password" });

    expect(input).toHaveAttribute("type", "password");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(toggle).toHaveClass("mild-input-password-toggle", "mild-input-password-toggle--md");

    await fireEvent.click(toggle);
    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: "Hide password" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("switches the toggle label without moving focus off the input", async () => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame"] });
    try {
      const { container } = render(h(InputPassword, { modelValue: "hunter2" }));
      const input = container.querySelector("input")!;
      input.focus();
      input.setSelectionRange(3, 6);
      expect(document.activeElement).toBe(input);

      const toggle = screen.getByRole("button", { name: "Show password" });
      // Browsers move focus on mousedown; the toggle opts out of that...
      const mouseDown = new MouseEvent("mousedown", { bubbles: true, cancelable: true });
      toggle.dispatchEvent(mouseDown);
      expect(mouseDown.defaultPrevented).toBe(true);
      await fireEvent.click(toggle);
      vi.runAllTimers();

      // ...so the input keeps focus (and its selection) while the label and type switch.
      expect(document.activeElement).toBe(input);
      expect(input).toHaveAttribute("type", "text");
      expect(input.selectionStart).toBe(3);
      expect(input.selectionEnd).toBe(6);
      expect(screen.getByRole("button", { name: "Hide password" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Show password" })).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });

  it("restores focus even when the selection is unavailable", async () => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame"] });
    try {
      const { container } = render(h(InputPassword));
      const input = container.querySelector("input")!;
      input.focus();
      Object.defineProperty(input, "selectionStart", { value: null, configurable: true });
      await fireEvent.click(screen.getByRole("button", { name: "Show password" }));
      vi.runAllTimers();
      expect(document.activeElement).toBe(input);
      expect(input).toHaveAttribute("type", "text");
    } finally {
      vi.useRealTimers();
    }
  });

  it("keeps the toggle reachable by keyboard and does not steal focus from elsewhere", async () => {
    render(h(InputPassword));
    const toggle = screen.getByRole("button", { name: "Show password" });
    toggle.focus();
    await fireEvent.click(toggle);
    // Activated from the keyboard: focus stays on the toggle.
    expect(document.activeElement).toBe(toggle);
    expect(toggle).toHaveAttribute("aria-label", "Hide password");
  });

  it("sets aria-invalid for error and isInvalid, and maps readonly", async () => {
    const { container, rerender } = render(h(InputPassword, { isInvalid: true, isReadOnly: true }));
    const input = container.querySelector("input")!;
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("readonly");
    expect(input).toHaveClass("mild-input-password--error", "mild-input-password--readonly");

    await rerender({ isInvalid: false, isReadOnly: false });
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("maps the native spellings and the ui classes, and keeps styling props off the DOM", () => {
    const { container } = render(
      h(InputPassword, {
        disabled: true,
        required: true,
        readonly: true,
        fullWidth: false,
        colorScheme: "primary",
        errorBorderColor: "red",
        focusBorderColor: "blue",
        id: "pw",
        name: "pw",
        placeholder: "Secret",
        ui: { container: "c", input: "i", buttonIcon: "b" },
      }),
    );
    const input = container.querySelector("input")!;
    expect(container.firstElementChild).toHaveClass("mild-input-password-field", "c");
    expect(container.firstElementChild).not.toHaveClass("mild-input-password-field--full-width");
    expect(input).toHaveClass(
      "i",
      "mild-input-password--disabled",
      "mild-input-password--required",
    );
    expect(input).toBeDisabled();
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("id", "pw");
    expect(input).toHaveAttribute("name", "pw");
    expect(input).toHaveAttribute("placeholder", "Secret");
    expect(input).not.toHaveAttribute("colorscheme");
    expect(screen.getByRole("button")).toHaveClass("b");
  });

  it("supports v-model and custom toggle icons", async () => {
    const Harness = defineComponent({
      setup() {
        const value = ref("");
        return () =>
          h(
            InputPassword,
            { modelValue: value.value, "onUpdate:modelValue": (v) => (value.value = v) },
            {
              visibleIcon: () => h("i", { "data-testid": "show" }),
              hiddenIcon: () => h("i", { "data-testid": "hide" }),
            },
          );
      },
    });
    const { container } = render(Harness);
    const input = container.querySelector("input")!;
    await fireEvent.update(input, "s3cret");
    expect(input).toHaveValue("s3cret");
    expect(input).toHaveAttribute("data-controlled", "true");

    expect(screen.getByTestId("show")).toBeInTheDocument();
    await fireEvent.click(screen.getByRole("button"));
    expect(screen.getByTestId("hide")).toBeInTheDocument();
  });
});

itHasNoSeriousAxeViolations("InputPassword", () =>
  h("div", [
    h(InputPassword, { "aria-label": "Password" }),
    h(InputPassword, { "aria-label": "Invalid", error: true, size: "lg" }),
    h(InputPassword, { "aria-label": "Disabled", disabled: true }),
  ]),
);
