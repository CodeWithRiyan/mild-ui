import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Input } from "./Input";
import { InputPassword } from "../InputPassword";
import { FormField } from "../Form";

describe("Input", () => {
  let consoleError: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    consoleError.mockRestore();
  });

  it("is valid by default: no aria-invalid", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });

  it.each([
    ["error", { error: true }],
    ["isInvalid", { isInvalid: true }],
  ])("sets aria-invalid and the error class when %s is true", (_name, props) => {
    render(<Input {...props} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveClass("mild-input--error");
  });

  it("maps isDisabled / isReadOnly / isRequired onto the native attributes", () => {
    render(<Input isDisabled isReadOnly isRequired />);
    const input = screen.getByRole("textbox", { hidden: true });
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("readonly");
    expect(input).toBeRequired();
  });

  it("keeps styling-only props off the DOM", () => {
    render(
      <Input
        isInvalid
        colorScheme="primary"
        errorBorderColor="red"
        focusBorderColor="blue"
        variant="filled"
        size="sm"
      />,
    );
    const input = screen.getByRole("textbox");
    for (const attr of ["isinvalid", "colorscheme", "errorbordercolor", "focusbordercolor"]) {
      expect(input).not.toHaveAttribute(attr);
    }
    // React warns about unknown props on DOM elements; none should have leaked.
    expect(consoleError).not.toHaveBeenCalled();
  });

  it("merges a consumer-provided aria-describedby", () => {
    render(
      <>
        <Input aria-describedby="hint" error />
        <p id="hint">Hint</p>
      </>,
    );
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription("Hint");
  });
});

function InvalidField({ control }: { control: React.ReactElement }) {
  const [error, setError] = React.useState<string | undefined>();
  return (
    <>
      <FormField name="secret" label="Secret" description="Keep it safe" error={error}>
        {control}
      </FormField>
      <button type="button" onClick={() => setError("Too short")}>
        fail
      </button>
      <button type="button" onClick={() => setError(undefined)}>
        fix
      </button>
    </>
  );
}

describe.each([
  ["Input", <Input key="i" />],
  ["InputPassword", <InputPassword key="p" />],
])("%s inside a Field", (_name, control) => {
  it("sets aria-invalid and links the error message through aria-describedby", () => {
    const { container } = render(<InvalidField control={control} />);
    const input = container.querySelector("input")!;

    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).toHaveAccessibleDescription("Keep it safe");

    fireEvent.click(screen.getByText("fail"));
    const message = screen.getByText("Too short");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.getAttribute("aria-describedby")?.split(" ")).toContain(message.id);
    expect(input).toHaveAccessibleDescription("Keep it safe Too short");

    fireEvent.click(screen.getByText("fix"));
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).toHaveAccessibleDescription("Keep it safe");
  });
});
