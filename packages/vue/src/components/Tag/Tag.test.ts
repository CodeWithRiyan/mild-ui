import { h, nextTick } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { tagCases } from "@mild-ui/test-cases/tag";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Tag, TagCloseButton } from "./index";

runComponentCases(tagCases, (c) => h(Tag, caseProps(c), () => c.children));

describe("Tag", () => {
  it("renders the label and an optional leading icon", () => {
    const { container } = render(
      h(Tag, {}, { default: () => "Design", icon: () => h("i", { "data-testid": "glyph" }) }),
    );
    expect(container.querySelector(".mild-tag__label")).toHaveTextContent("Design");
    expect(screen.getByTestId("glyph").closest(".mild-tag__icon")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("names the close button after the label and emits close", async () => {
    const onClose = vi.fn();
    render(h(Tag, { closable: true, onClose }, () => "Design"));
    await nextTick();
    const button = screen.getByRole("button", { name: "Remove Design" });
    expect(button).toHaveClass("mild-tag__close");
    await fireEvent.click(button);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("disables the close button along with the tag", async () => {
    render(h(Tag, { closable: true, disabled: true }, () => "Design"));
    await nextTick();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("falls back to the bare close label without text", async () => {
    render(h(Tag, { closable: true, closeLabel: "Delete" }, () => h("i")));
    await nextTick();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });
});

describe("TagCloseButton", () => {
  it("composes inside a tag, following its disabled state unless told otherwise", async () => {
    const onClick = vi.fn();
    render(
      asComponent(() =>
        h(Tag, { disabled: true }, () => [
          "Design",
          h(TagCloseButton, { label: "Drop", onClick }),
          h(TagCloseButton, { label: "Force", disabled: false }, () =>
            h("i", { "data-testid": "x" }),
          ),
        ]),
      ),
    );
    expect(screen.getByRole("button", { name: "Drop" })).toBeDisabled();
    const force = screen.getByRole("button", { name: "Force" });
    expect(force).toBeEnabled();
    expect(screen.getByTestId("x")).toBeInTheDocument();
  });

  it("works on its own", async () => {
    const onClick = vi.fn();
    render(h(TagCloseButton, { onClick }));
    await fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

itHasNoSeriousAxeViolations("Tag", () =>
  h("div", [
    h(Tag, () => "Design"),
    h(Tag, { closable: true, colorScheme: "primary", variant: "solid" }, () => "Closable"),
    h(Tag, { closable: true, disabled: true, pill: true }, () => "Disabled"),
  ]),
);
