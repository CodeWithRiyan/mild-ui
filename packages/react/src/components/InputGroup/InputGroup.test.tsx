import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  InputAddon,
  InputElement,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
} from "./InputGroup";
import { Input } from "../Input";
import { FormField } from "../Form";

describe("InputGroup", () => {
  it("detects the sides from its children and forwards its ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <InputGroup ref={ref}>
        <InputLeftAddon>https://</InputLeftAddon>
        <Input />
        <InputRightElement>✓</InputRightElement>
      </InputGroup>,
    );
    const group = container.firstElementChild as HTMLElement;
    expect(ref.current).toBe(group);
    expect(group).toHaveClass(
      "mild-input-group--has-left-addon",
      "mild-input-group--has-right-element",
    );
    expect(group).not.toHaveClass(
      "mild-input-group--has-right-addon",
      "mild-input-group--has-left-element",
    );
  });

  it("understands the generic parts with a placement", () => {
    const { container } = render(
      <InputGroup>
        <InputElement placement="right" interactive>
          <button type="button">Clear</button>
        </InputElement>
        <Input />
        <InputAddon placement="right">kg</InputAddon>
        <InputAddon>left</InputAddon>
        <InputElement>@</InputElement>
      </InputGroup>,
    );
    const group = container.firstElementChild as HTMLElement;
    expect(group).toHaveClass(
      "mild-input-group--has-right-element",
      "mild-input-group--has-right-addon",
      "mild-input-group--has-left-addon",
      "mild-input-group--has-left-element",
    );
    expect(container.querySelector(".mild-input-element--right")).toHaveClass(
      "mild-input-element--interactive",
    );
  });

  it("sizes the input from the group unless the input says otherwise", () => {
    render(
      <>
        <InputGroup size="sm">
          <Input aria-label="Inherits" />
        </InputGroup>
        <InputGroup size="sm">
          <Input aria-label="Overrides" size="lg" />
        </InputGroup>
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Inherits" })).toHaveClass("mild-input--sm");
    expect(screen.getByRole("textbox", { name: "Overrides" })).toHaveClass("mild-input--lg");
  });

  it("ignores non-element children", () => {
    const { container } = render(
      <InputGroup>
        {null}
        {false}
        text
        <Input />
        <InputRightAddon>.com</InputRightAddon>
        <InputLeftElement>@</InputLeftElement>
      </InputGroup>,
    );
    expect(container.firstElementChild).toHaveClass(
      "mild-input-group--has-right-addon",
      "mild-input-group--has-left-element",
    );
  });

  it("forwards refs of the parts", () => {
    const addon = React.createRef<HTMLDivElement>();
    const element = React.createRef<HTMLDivElement>();
    render(
      <InputGroup>
        <InputLeftAddon ref={addon}>$</InputLeftAddon>
        <Input />
        <InputRightElement ref={element}>✓</InputRightElement>
      </InputGroup>,
    );
    expect(addon.current).toHaveClass("mild-input-addon--left");
    expect(element.current).toHaveClass("mild-input-element--right");
  });

  it("passes the field wiring through to the input inside a FormField", () => {
    const groupRef = React.createRef<HTMLDivElement>();
    render(
      <FormField name="site" label="Website" description="Public URL" error="Invalid" required>
        <InputGroup ref={groupRef}>
          <InputLeftAddon>https://</InputLeftAddon>
          <Input />
          <InputRightElement interactive>
            <button type="button">Clear</button>
          </InputRightElement>
        </InputGroup>
      </FormField>,
    );
    // The label names the input, not the wrapper or the button inside the element.
    const input = screen.getByRole("textbox", { name: "Website" });
    expect(input).toHaveAttribute("name", "site");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Public URL Invalid");
    // The group keeps its own ref and carries no duplicate id.
    expect(groupRef.current).toHaveClass("mild-input-group");
    expect(groupRef.current).not.toHaveAttribute("id");
    expect(groupRef.current).not.toHaveAttribute("aria-invalid");
  });
});
