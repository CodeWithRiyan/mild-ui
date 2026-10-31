import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Textarea } from "./Textarea";
import { FormField } from "../Form";

describe("Textarea", () => {
  it("renders a textarea and forwards its ref and props", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} name="message" rows={6} />);
    const textarea = screen.getByRole("textbox");
    expect(ref.current).toBe(textarea);
    expect(textarea).toHaveAttribute("name", "message");
    expect(textarea).toHaveAttribute("rows", "6");
  });

  it("reports controlled use and fires onChange", () => {
    const onChange = vi.fn();
    render(<Textarea value="hi" onChange={onChange} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("data-controlled", "true");
    fireEvent.change(textarea, { target: { value: "hello" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("fits its height to the content when autoResize is on", () => {
    const onInput = vi.fn();
    render(<Textarea autoResize onInput={onInput} />);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    // jsdom does not lay out, so scrollHeight is faked.
    Object.defineProperty(textarea, "scrollHeight", { value: 120, configurable: true });
    fireEvent.input(textarea, { target: { value: "a\nb\nc" } });
    expect(textarea.style.height).toBe("120px");
    expect(onInput).toHaveBeenCalledTimes(1);
  });

  it("leaves the height alone without autoResize", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    fireEvent.input(textarea, { target: { value: "a\nb" } });
    expect(textarea.style.height).toBe("");
  });

  it("is wired by FormField like an input", () => {
    render(
      <FormField name="bio" label="Bio" description="Tell us more" error="Too short" required>
        <Textarea />
      </FormField>,
    );
    const textarea = screen.getByRole("textbox", { name: "Bio" });
    expect(textarea).toHaveAttribute("name", "bio");
    expect(textarea).toBeRequired();
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription("Tell us more Too short");
  });
});
