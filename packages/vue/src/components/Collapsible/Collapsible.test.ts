import { defineComponent, h, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { collapsibleCases } from "@mild-ui/test-cases/collapsible";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./index";

runComponentCases(collapsibleCases, (c) =>
  h(Collapsible, caseProps(c), () => [
    h(CollapsibleTrigger, () => "Details"),
    h(CollapsibleContent, () => "More"),
  ]),
);

function renderCollapsible(
  props: Record<string, unknown> = {},
  contentProps: Record<string, unknown> = {},
) {
  return render(
    asComponent(() =>
      h(Collapsible, props, () => [
        h(CollapsibleTrigger, () => "Details"),
        h(CollapsibleContent, contentProps, () => "More"),
      ]),
    ),
  );
}

describe("Collapsible (WAI-ARIA disclosure pattern)", () => {
  it("renders a button with aria-expanded / aria-controls and hidden content", () => {
    renderCollapsible();
    const trigger = screen.getByRole("button", { name: "Details" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    const content = document.getElementById(trigger.getAttribute("aria-controls")!);
    expect(content).toHaveAttribute("hidden");
    expect(content).toHaveClass("mild-collapsible-content");
    expect(trigger.querySelector(".mild-collapsible-trigger__icon")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("toggles on click (uncontrolled) and reports the state", async () => {
    const onChange = vi.fn();
    renderCollapsible({ onChange });
    await fireEvent.click(screen.getByRole("button"));
    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("More")).toBeVisible();

    await fireEvent.click(screen.getByRole("button"));
    expect(onChange).toHaveBeenLastCalledWith(false);
    expect(screen.getByText("More")).not.toBeVisible();
  });

  it("follows a controlled value only, and works with v-model:open", async () => {
    const onChange = vi.fn();
    const { rerender } = render(
      asComponent(() =>
        h(Collapsible, { open: false, onChange }, () => [
          h(CollapsibleTrigger, () => "Details"),
          h(CollapsibleContent, { forceMount: false }, () => "More"),
        ]),
      ),
    );
    expect(screen.queryByText("More")).toBeNull();
    await fireEvent.click(screen.getByRole("button"));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
    void rerender;

    const Harness = defineComponent({
      setup() {
        const open = ref(false);
        return () =>
          h(
            Collapsible,
            { open: open.value, "onUpdate:open": (v: boolean) => (open.value = v) },
            () => [
              h(CollapsibleTrigger, () => "Toggle"),
              h(CollapsibleContent, { forceMount: false }, () => "Body"),
            ],
          );
      },
    });
    render(Harness);
    await fireEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByText("Body")).toBeVisible();
  });

  it("does nothing while disabled and lets a click handler cancel the toggle", async () => {
    const onChange = vi.fn();
    renderCollapsible({ disabled: true, onChange });
    expect(screen.getByRole("button")).toBeDisabled();

    render(
      asComponent(() =>
        h(Collapsible, { onChange }, () => [
          h(
            CollapsibleTrigger,
            { onClick: (event: MouseEvent) => event.preventDefault(), noIcon: true },
            () => "Cancelled",
          ),
          h(CollapsibleContent, () => "More"),
        ]),
      ),
    );
    const trigger = screen.getByRole("button", { name: "Cancelled" });
    await fireEvent.click(trigger);
    expect(onChange).not.toHaveBeenCalled();
    expect(trigger.querySelector(".mild-collapsible-trigger__icon")).toBeNull();
  });

  it("throws a helpful error when a part is used outside a Collapsible", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(() => render(h(CollapsibleTrigger, () => "x"))).toThrow("inside <Collapsible>");
    expect(() => render(h(CollapsibleContent, () => "x"))).toThrow("inside <Collapsible>");
    warn.mockRestore();
  });
});

itHasNoSeriousAxeViolations("Collapsible", () =>
  h("div", [
    h(Collapsible, () => [
      h(CollapsibleTrigger, () => "Details"),
      h(CollapsibleContent, () => "More"),
    ]),
    h(Collapsible, { defaultOpen: true }, () => [
      h(CollapsibleTrigger, () => "Open"),
      h(CollapsibleContent, () => "Shown"),
    ]),
  ]),
);
