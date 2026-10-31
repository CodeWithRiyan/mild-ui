import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Checkbox } from "./Checkbox";

function submit(form: HTMLFormElement): FormData {
  let data: FormData | null = null;
  form.onsubmit = (event) => {
    event.preventDefault();
    data = new FormData(form);
  };
  fireEvent.submit(form);
  return data!;
}

describe("Checkbox a11y contract", () => {
  it("indeterminate is announced as mixed and Space resolves it to checked", () => {
    render(<Checkbox defaultChecked="indeterminate" label="Select all" />);
    const checkbox = screen.getByRole("checkbox", { name: "Select all" });
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    expect(checkbox).toHaveAttribute("tabindex", "0");

    fireEvent.keyDown(checkbox, { key: " " });
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    fireEvent.keyDown(checkbox, { key: " " });
    expect(checkbox).toHaveAttribute("aria-checked", "false");
  });

  it("the indeterminate prop pins the mixed state until the parent changes it", () => {
    const { rerender } = render(<Checkbox indeterminate />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");

    fireEvent.keyDown(checkbox, { key: " " });
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");

    rerender(<Checkbox indeterminate={false} defaultChecked />);
    expect(checkbox).toHaveAttribute("aria-checked", "true");
  });

  it("submits inside a <form> only while checked", () => {
    const { container } = render(
      <form>
        <Checkbox name="terms" value="yes" />
      </form>,
    );
    const form = container.querySelector("form")!;

    expect(submit(form).get("terms")).toBeNull();
    fireEvent.click(screen.getByRole("checkbox"));
    expect(submit(form).get("terms")).toBe("yes");
  });
});
