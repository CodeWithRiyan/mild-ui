import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "./Form";
import { Input } from "../Input";
import { Checkbox } from "../Checkbox";
import { Select } from "../Select";

describe("FormField (wired by @mild-ui/primitives/field)", () => {
  it("links the control to its label and description automatically", () => {
    render(
      <FormField name="email" label="Email" description="We never share it">
        <Input />
      </FormField>,
    );
    const input = screen.getByLabelText("Email");

    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAccessibleDescription("We never share it");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(screen.getByText("Email")).toHaveAttribute("for", input.id);
  });

  it("sets no aria-describedby when there is nothing to describe", () => {
    render(
      <FormField name="email" label="Email">
        <Input />
      </FormField>,
    );
    expect(screen.getByLabelText("Email")).not.toHaveAttribute("aria-describedby");
  });

  it("adds the error after the description while invalid, and drops it when fixed", () => {
    const { rerender } = render(
      <FormField name="email" label="Email" description="Hint">
        <Input />
      </FormField>,
    );
    const input = screen.getByLabelText("Email");

    rerender(
      <FormField name="email" label="Email" description="Hint" error="Required">
        <Input />
      </FormField>,
    );
    const message = screen.getByRole("alert");
    expect(message).toHaveTextContent("Required");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.getAttribute("aria-describedby")?.split(" ")).toEqual([
      screen.getByText("Hint").id,
      message.id,
    ]);
    expect(input).toHaveAccessibleDescription("Hint Required");

    rerender(
      <FormField name="email" label="Email" description="Hint">
        <Input />
      </FormField>,
    );
    expect(screen.queryByRole("alert")).toBeNull();
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).toHaveAccessibleDescription("Hint");
  });

  it("can hide the message while keeping the control invalid", () => {
    render(
      <FormField name="email" label="Email" error="Required" hideError>
        <Input />
      </FormField>,
    );
    const input = screen.getByLabelText("Email");
    expect(screen.queryByRole("alert")).toBeNull();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).not.toHaveAttribute("aria-describedby");
  });

  it("marks required on the control and the label marker stays decorative", () => {
    render(
      <FormField name="email" label="Email" required>
        <Input />
      </FormField>,
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeRequired();
    expect(input).toHaveAccessibleName("Email");
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
  });

  it("wires a custom control such as Checkbox with aria-labelledby and label activation", () => {
    const onCheckedChange = vi.fn();
    render(
      <FormField name="terms" label="Terms" description="Read them" error="Accept the terms">
        <Checkbox onCheckedChange={onCheckedChange} />
      </FormField>,
    );
    const checkbox = screen.getByRole("checkbox", { name: "Terms" });

    expect(checkbox).toHaveAttribute("aria-labelledby", screen.getByText("Terms").id);
    expect(checkbox).toHaveAccessibleDescription("Read them Accept the terms");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");

    // Clicking the label focuses and toggles the control exactly once.
    fireEvent.click(screen.getByText("Terms"));
    expect(document.activeElement).toBe(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
  });

  it("wires a Select trigger and submits its value under the field name", () => {
    let data: FormData | null = null;
    render(
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          data = new FormData(event.currentTarget);
        }}
      >
        <FormField name="country" label="Country">
          <Select options={[{ value: "mx", label: "Mexico" }]} defaultValue="mx" />
        </FormField>
        <button type="submit">send</button>
      </Form>,
    );
    expect(screen.getByRole("combobox", { name: "Country" })).toBeInTheDocument();
    fireEvent.click(screen.getByText("send"));
    expect(data!.get("country")).toBe("mx");
  });

  it("keeps a consumer ref on the control", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <FormField name="email" label="Email">
        <Input ref={ref} />
      </FormField>,
    );
    expect(ref.current).toBe(screen.getByLabelText("Email"));
  });

  it("works with plain React state, no form library needed", () => {
    function SignUp() {
      const [email, setEmail] = React.useState("");
      const [submitted, setSubmitted] = React.useState(false);
      const error = submitted && !email.includes("@") ? "Enter a valid email" : undefined;
      return (
        <Form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <FormField name="email" label="Email" error={error}>
            <Input value={email} onChange={(event) => setEmail(event.target.value)} />
          </FormField>
          <button type="submit">Sign up</button>
        </Form>
      );
    }
    render(<SignUp />);
    const input = screen.getByLabelText("Email");

    fireEvent.click(screen.getByText("Sign up"));
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email");

    fireEvent.change(input, { target: { value: "ada@example.com" } });
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByRole("alert")).toBeNull();
  });
});

describe("Form parts composed by hand", () => {
  it("exposes the ids through useFormField and wires the parts the same way", () => {
    function Ids() {
      const field = useFormField();
      return <span data-testid="ids">{`${field.formItemId}|${field.formMessageId}`}</span>;
    }
    render(
      <FormItem name="age" error="Must be a number">
        <FormLabel>Age</FormLabel>
        <FormControl>
          <Input />
        </FormControl>
        <FormDescription>In years</FormDescription>
        <FormMessage />
        <Ids />
      </FormItem>,
    );
    const input = screen.getByLabelText("Age");
    const [itemId, messageId] = screen.getByTestId("ids").textContent!.split("|");

    expect(input.id).toBe(itemId);
    expect(screen.getByRole("alert").id).toBe(messageId);
    expect(input).toHaveAccessibleDescription("In years Must be a number");
  });

  it("throws a helpful error when a part is used outside a field", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<FormLabel>Lost</FormLabel>)).toThrow(
      "<FormLabel> must be used inside <FormItem> or <FormField>",
    );
    consoleError.mockRestore();
  });
});
