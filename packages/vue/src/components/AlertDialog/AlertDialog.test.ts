import { defineComponent, h, nextTick, ref, type ComponentPublicInstance } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { alertDialogCases } from "@mild-ui/test-cases/alert-dialog";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./index";
import { Button } from "../Button";

runComponentCases(alertDialogCases, (c) =>
  h(AlertDialog, caseProps<{ open: boolean }>(c), () =>
    h(AlertDialogContent, () => [
      h(AlertDialogTitle, () => "Delete project?"),
      h(AlertDialogDescription, () => "This cannot be undone."),
      h("button", { type: "button" }, "Cancel"),
    ]),
  ),
);

function page(onOpenChange?: (open: boolean) => void) {
  return defineComponent({
    setup() {
      const open = ref(false);
      // A component ref: the Button instance exposes its element as `$el`.
      const cancel = ref<ComponentPublicInstance | null>(null);
      const change = (next: boolean) => {
        open.value = next;
        onOpenChange?.(next);
      };
      return () => [
        h("button", { type: "button", onClick: () => change(true) }, "Delete"),
        h(
          AlertDialog,
          { open: open.value, "onUpdate:open": change, leastDestructive: () => cancel.value?.$el },
          () =>
            h(AlertDialogContent, () => [
              h(AlertDialogHeader, () => h(AlertDialogTitle, () => "Delete project?")),
              h(AlertDialogBody, () => h(AlertDialogDescription, () => "This cannot be undone.")),
              h(AlertDialogFooter, () => [
                h(
                  Button,
                  { ref: cancel, variant: "outline", onClick: () => change(false) },
                  () => "Cancel",
                ),
                h(Button, { variant: "destructive" }, () => "Delete"),
              ]),
            ]),
        ),
      ];
    },
  });
}

describe("AlertDialog (WAI-ARIA alertdialog role)", () => {
  it("renders role=alertdialog, named and described, with focus on the least destructive action", async () => {
    render(page());
    const trigger = screen.getByRole("button", { name: "Delete" });
    trigger.focus();
    await fireEvent.click(trigger);
    await nextTick();

    const dialog = screen.getByRole("alertdialog", { name: "Delete project?" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleDescription("This cannot be undone.");
    expect(dialog).toHaveClass("mild-modal-content", "mild-modal-content--alert");
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();
  });

  it("does not close on an overlay click, but does on Escape, returning focus to the trigger", async () => {
    const onOpenChange = vi.fn();
    render(page(onOpenChange));
    const trigger = screen.getByRole("button", { name: "Delete" });
    trigger.focus();
    await fireEvent.click(trigger);
    await nextTick();

    await fireEvent.click(document.querySelector("[data-dialog-overlay]")!);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    await fireEvent.keyDown(document.activeElement as Element, { key: "Escape" });
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(screen.queryByRole("alertdialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });
});

itHasNoSeriousAxeViolations("AlertDialog", () =>
  h(AlertDialog, { open: true }, () =>
    h(AlertDialogContent, () => [
      h(AlertDialogTitle, () => "Delete project?"),
      h(AlertDialogDescription, () => "This cannot be undone."),
      h(AlertDialogFooter, () => [
        h(Button, { variant: "outline" }, () => "Cancel"),
        h(Button, { variant: "destructive" }, () => "Delete"),
      ]),
    ]),
  ),
);
