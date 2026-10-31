import { h, nextTick } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { inputGroupCases } from "@mild-ui/test-cases/input-group";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import {
  InputAddon,
  InputElement,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
} from "./index";
import { Input } from "../Input";
import { FormField } from "../Form";

type Part = "left-addon" | "right-addon" | "left-element" | "right-element";

runComponentCases(inputGroupCases, (c) => {
  const { parts, ...props } = caseProps<{ parts: Part[] } & Record<string, unknown>>(c);
  return h(InputGroup, props, () => [
    parts.includes("left-addon") ? h(InputLeftAddon, () => "https://") : null,
    parts.includes("left-element") ? h(InputLeftElement, () => "@") : null,
    h(Input, { placeholder: "site" }),
    parts.includes("right-element") ? h(InputRightElement, () => "✓") : null,
    parts.includes("right-addon") ? h(InputRightAddon, () => ".com") : null,
  ]);
});

describe("InputGroup", () => {
  it("detects the sides from its children", () => {
    const { container } = render(
      asComponent(() =>
        h(InputGroup, () => [
          h(InputLeftAddon, () => "https://"),
          h(Input),
          h(InputRightElement, () => "✓"),
        ]),
      ),
    );
    const group = container.firstElementChild as HTMLElement;
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
      asComponent(() =>
        h(InputGroup, () => [
          h(InputElement, { placement: "right", interactive: true }, () =>
            h("button", { type: "button" }, "Clear"),
          ),
          h(Input),
          h(InputAddon, { placement: "right" }, () => "kg"),
          h(InputAddon, () => "left"),
          h(InputElement, () => "@"),
        ]),
      ),
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
    expect(container.querySelector(".mild-input-addon--right")).toHaveAttribute(
      "data-placement",
      "right",
    );
  });

  it("sizes the input from the group unless the input says otherwise", () => {
    render(
      asComponent(() => [
        h(InputGroup, { size: "sm" }, () => h(Input, { "aria-label": "Inherits" })),
        h(InputGroup, { size: "sm" }, () => h(Input, { "aria-label": "Overrides", size: "lg" })),
      ]),
    );
    expect(screen.getByRole("textbox", { name: "Inherits" })).toHaveClass("mild-input--sm");
    expect(screen.getByRole("textbox", { name: "Overrides" })).toHaveClass("mild-input--lg");
  });

  it("ignores non-element children and forwarded slot fragments", () => {
    const { container } = render(
      asComponent(() =>
        h(InputGroup, () => [
          null,
          false,
          "text",
          h(Input),
          [h(InputRightAddon, () => ".com"), h(InputLeftElement, () => "@")],
        ]),
      ),
    );
    expect(container.firstElementChild).toHaveClass(
      "mild-input-group--has-right-addon",
      "mild-input-group--has-left-element",
    );
  });

  it("passes the field wiring through to the input inside a FormField", async () => {
    const { container } = render(
      h(
        FormField,
        {
          name: "site",
          label: "Website",
          description: "Public URL",
          error: "Invalid",
          required: true,
        },
        () =>
          h(InputGroup, { class: "group" }, () => [
            h(InputLeftAddon, () => "https://"),
            h(Input),
            h(InputRightElement, { interactive: true }, () =>
              h("button", { type: "button" }, "Clear"),
            ),
          ]),
      ),
    );
    await nextTick();
    // The label names the input, not the wrapper or the button inside the element.
    const input = screen.getByRole("textbox", { name: "Website" });
    expect(input).toHaveAttribute("name", "site");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Public URL Invalid");
    // The group carries no duplicate id or wiring.
    const group = container.querySelector(".group")!;
    expect(group).toHaveClass("mild-input-group");
    expect(group).not.toHaveAttribute("id");
    expect(group).not.toHaveAttribute("aria-invalid");
  });
});

itHasNoSeriousAxeViolations("InputGroup", () =>
  h("div", [
    h(InputGroup, () => [
      h(InputLeftAddon, () => "https://"),
      h(Input, { "aria-label": "Site" }),
      h(InputRightAddon, () => ".com"),
    ]),
    h(InputGroup, { size: "lg", inline: true }, () => [
      h(InputLeftElement, () => "@"),
      h(Input, { "aria-label": "Handle" }),
      h(InputRightElement, { interactive: true }, () => h("button", { type: "button" }, "Clear")),
    ]),
  ]),
);
