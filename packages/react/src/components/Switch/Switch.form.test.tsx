import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Switch } from "./Switch";

describe("Switch a11y contract", () => {
  it("exposes role switch with aria-checked from the first render", () => {
    const { rerender } = render(<Switch defaultChecked />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("aria-checked", "true");

    rerender(<Switch checked={false} />);
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("Space and Enter both toggle; other keys do not", () => {
    render(<Switch />);
    const toggle = screen.getByRole("switch");

    fireEvent.keyDown(toggle, { key: " " });
    expect(toggle).toHaveAttribute("aria-checked", "true");
    fireEvent.keyDown(toggle, { key: "Enter" });
    expect(toggle).toHaveAttribute("aria-checked", "false");
    fireEvent.keyDown(toggle, { key: "ArrowRight" });
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("submits inside a <form> only while on", () => {
    let data: FormData | null = null;
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault();
          data = new FormData(event.currentTarget);
        }}
      >
        <Switch name="notifications" value="on" />
        <button type="submit">send</button>
      </form>,
    );

    fireEvent.click(screen.getByText("send"));
    expect(data!.get("notifications")).toBeNull();

    fireEvent.click(screen.getByRole("switch"));
    fireEvent.click(screen.getByText("send"));
    expect(data!.get("notifications")).toBe("on");
  });
});
