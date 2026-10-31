import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Label } from "./Label";
import { Checkbox } from "../Checkbox";
import { Switch } from "../Switch";

describe("Label", () => {
  it("names and focuses a native control through htmlFor", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    );
    const input = screen.getByLabelText("Email");
    fireEvent.click(screen.getByText("Email"));
    expect(document.activeElement).toBe(input);
  });

  it("focuses and activates a custom control (role checkbox) on click", () => {
    render(
      <>
        <Label htmlFor="terms">Terms</Label>
        <Checkbox id="terms" />
      </>,
    );
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(screen.getByText("Terms"));
    expect(document.activeElement).toBe(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "true");
  });

  it("focuses and toggles a custom switch on click", () => {
    render(
      <>
        <Label htmlFor="wifi">Wi-Fi</Label>
        <Switch id="wifi" />
      </>,
    );
    fireEvent.click(screen.getByText("Wi-Fi"));
    expect(document.activeElement).toBe(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("marks required visually without reading the marker twice", () => {
    render(
      <>
        <Label htmlFor="name" required>
          Name
        </Label>
        <input id="name" required />
      </>,
    );
    const label = screen.getByText("Name").closest("label")!;
    const marker = label.querySelector("[data-required-marker]")!;
    expect(marker).toHaveTextContent("*");
    expect(marker).toHaveAttribute("aria-hidden", "true");
    // The accessible name is just the text; "required" comes from the control itself.
    expect(screen.getByRole("textbox")).toHaveAccessibleName("Name");
    expect(screen.getByRole("textbox")).toBeRequired();
  });

  it("still calls a consumer onClick", () => {
    let clicks = 0;
    render(
      <Label htmlFor="x" onClick={() => clicks++}>
        X
      </Label>,
    );
    fireEvent.click(screen.getByText("X"));
    expect(clicks).toBe(1);
  });
});
