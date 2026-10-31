import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Radio } from "./Radio";

const items = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Bravo" },
  { value: "c", label: "Charlie" },
];

describe("Radio a11y contract", () => {
  it("keeps exactly one radio in the tab order", () => {
    render(<Radio items={items} defaultValue="b" />);
    const tabStops = screen.getAllByRole("radio").filter((r) => r.getAttribute("tabindex") === "0");
    expect(tabStops).toHaveLength(1);
    expect(tabStops[0]).toHaveAccessibleName("Bravo");
  });

  it("arrow keys move both focus and selection, in every direction", () => {
    render(<Radio items={items} defaultValue="b" />);
    const group = screen.getByRole("radiogroup");
    const radio = (name: string) => screen.getByRole("radio", { name });
    radio("Bravo").focus();

    fireEvent.keyDown(group, { key: "ArrowRight" });
    expect(document.activeElement).toBe(radio("Charlie"));
    expect(radio("Charlie")).toHaveAttribute("aria-checked", "true");
    expect(radio("Bravo")).toHaveAttribute("aria-checked", "false");

    fireEvent.keyDown(group, { key: "ArrowLeft" });
    fireEvent.keyDown(group, { key: "ArrowUp" });
    expect(document.activeElement).toBe(radio("Alpha"));
    expect(radio("Alpha")).toHaveAttribute("aria-checked", "true");
    // The tab stop follows the selection.
    expect(radio("Alpha")).toHaveAttribute("tabindex", "0");
    expect(radio("Charlie")).toHaveAttribute("tabindex", "-1");
  });

  it("submits the checked value inside a <form>", () => {
    let data: FormData | null = null;
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault();
          data = new FormData(event.currentTarget);
        }}
      >
        <Radio items={items} name="letter" />
        <button type="submit">send</button>
      </form>,
    );

    fireEvent.click(screen.getByText("send"));
    expect(data!.get("letter")).toBe("");

    fireEvent.click(screen.getByRole("radio", { name: "Charlie" }));
    fireEvent.click(screen.getByText("send"));
    expect(data!.get("letter")).toBe("c");
  });
});
