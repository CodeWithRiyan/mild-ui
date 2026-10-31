import { defineComponent, h, nextTick, ref } from "vue";
import { fireEvent, render, screen, within } from "@testing-library/vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { dialogCases } from "@mild-ui/test-cases/dialog";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./index";
import { Button } from "../Button";

runComponentCases(dialogCases, (c) =>
  h(Dialog, caseProps<{ open: boolean }>(c), () =>
    h(DialogContent, () => [
      h(DialogHeader, () => [h(DialogTitle, () => "Edit profile"), h(DialogCloseButton)]),
      h(DialogDescription, () => "Make changes."),
    ]),
  ),
);

/** A page with a trigger that opens a dialog; the dialog can open a nested one. */
function page(
  options: {
    nested?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    onOpenChange?: (open: boolean) => void;
  } = {},
) {
  return defineComponent({
    setup() {
      const open = ref(false);
      const innerOpen = ref(false);
      const change = (next: boolean) => {
        open.value = next;
        options.onOpenChange?.(next);
      };
      return () => [
        h("button", { type: "button", onClick: () => change(true) }, "Open dialog"),
        h("button", { type: "button" }, "Outside"),
        h(
          Dialog,
          {
            open: open.value,
            closeOnOverlayClick: options.closeOnOverlayClick,
            closeOnEscape: options.closeOnEscape,
            "onUpdate:open": change,
          },
          () =>
            h(DialogContent, { "data-testid": "outer" }, () => [
              h(DialogHeader, () => [h(DialogTitle, () => "Edit profile"), h(DialogCloseButton)]),
              h(DialogBody, () => [
                h(DialogDescription, () => "Make changes to your profile."),
                h("input", { "aria-label": "Name" }),
                options.nested
                  ? h(
                      "button",
                      { type: "button", onClick: () => (innerOpen.value = true) },
                      "Open inner",
                    )
                  : null,
              ]),
              h(DialogFooter, () => [
                h(Button, { variant: "outline", onClick: () => change(false) }, () => "Cancel"),
                h(Button, () => "Save"),
              ]),
            ]),
        ),
        options.nested
          ? h(
              Dialog,
              { open: innerOpen.value, "onUpdate:open": (v: boolean) => (innerOpen.value = v) },
              () =>
                h(DialogContent, { "data-testid": "inner" }, () => [
                  h(DialogTitle, () => "Are you sure?"),
                  h(DialogFooter, () => [
                    h(Button, { onClick: () => (innerOpen.value = false) }, () => "Inner cancel"),
                    h(Button, () => "Inner confirm"),
                  ]),
                ]),
            )
          : null,
      ];
    },
  });
}

async function openDialog(name = "Open dialog") {
  const trigger = screen.getByRole("button", { name });
  trigger.focus();
  await fireEvent.click(trigger);
  await nextTick();
  return trigger;
}

const keyDown = (key: string, init: KeyboardEventInit = {}) =>
  fireEvent.keyDown(document.activeElement ?? document.body, { key, ...init });

afterEach(() => {
  document.body.style.overflow = "";
});

describe("Dialog (WAI-ARIA dialog pattern)", () => {
  it("renders nothing while closed and a modal dialog named and described by its parts", async () => {
    render(page());
    expect(screen.queryByRole("dialog")).toBeNull();

    await openDialog();
    const dialog = screen.getByRole("dialog", { name: "Edit profile" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleDescription("Make changes to your profile.");
    expect(dialog).toHaveClass("mild-modal-content", "mild-modal-content--md");
    // Rendered in a teleport under the overlay, not inline.
    expect(dialog.closest(".mild-modal-overlay")?.parentElement).toBe(document.body);
  });

  it("moves focus into the dialog when it opens (first tabbable element)", async () => {
    render(page());
    await openDialog();
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("button", { name: "Close" })).toHaveFocus();
  });

  it("traps Tab and Shift+Tab inside the dialog", async () => {
    render(page());
    await openDialog();
    const dialog = screen.getByRole("dialog");
    const close = within(dialog).getByRole("button", { name: "Close" });
    const save = within(dialog).getByRole("button", { name: "Save" });

    save.focus();
    await keyDown("Tab");
    expect(close).toHaveFocus();

    await keyDown("Tab", { shiftKey: true });
    expect(save).toHaveFocus();
  });

  it("pulls focus back when it lands outside the dialog", async () => {
    render(page());
    await openDialog();
    screen.getByRole("button", { name: "Outside" }).focus();
    expect(screen.getByRole("dialog").contains(document.activeElement)).toBe(true);
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const onOpenChange = vi.fn();
    render(page({ onOpenChange }));
    const trigger = await openDialog();

    await keyDown("Escape");
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("returns focus to the trigger after the close button and the cancel action too", async () => {
    render(page());
    let trigger = await openDialog();
    await fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();

    trigger = await openDialog();
    await fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("locks the page scroll while open and restores it after", async () => {
    render(page());
    expect(document.body.style.overflow).toBe("");

    await openDialog();
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.body).toHaveClass("mild-modal-open");

    await keyDown("Escape");
    expect(document.body.style.overflow).toBe("");
    expect(document.body).not.toHaveClass("mild-modal-open");
  });

  it("closes on an overlay click but not on a click inside the panel", async () => {
    render(page());
    await openDialog();
    await fireEvent.click(screen.getByRole("dialog"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await fireEvent.click(document.querySelector("[data-dialog-overlay]")!);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("can keep the overlay click and Escape from closing", async () => {
    render(page({ closeOnOverlayClick: false, closeOnEscape: false }));
    await openDialog();
    await fireEvent.click(document.querySelector("[data-dialog-overlay]")!);
    await keyDown("Escape");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("honours initialFocus and finalFocus getters, and blurs the overlay", async () => {
    const Custom = defineComponent({
      setup() {
        const open = ref(false);
        const initial = ref<HTMLButtonElement | null>(null);
        const final = ref<HTMLButtonElement | null>(null);
        return () => [
          h("button", { type: "button", onClick: () => (open.value = true) }, "Open"),
          h("button", { type: "button", ref: final }, "Land here"),
          h(
            Dialog,
            {
              open: open.value,
              "onUpdate:open": (v: boolean) => (open.value = v),
              initialFocus: () => initial.value,
              finalFocus: () => final.value,
              blurOverlay: true,
              size: "lg",
            },
            () =>
              h(DialogContent, () => [
                h(DialogTitle, () => "Custom focus"),
                h("button", { type: "button" }, "First"),
                h("button", { type: "button", ref: initial }, "Second"),
              ]),
          ),
        ];
      },
    });
    render(Custom);
    await openDialog("Open");
    expect(screen.getByRole("button", { name: "Second" })).toHaveFocus();
    expect(document.querySelector(".mild-modal-overlay")).toHaveClass("mild-modal-overlay--blur");
    expect(screen.getByRole("dialog")).toHaveClass("mild-modal-content--lg");

    await keyDown("Escape");
    expect(screen.getByRole("button", { name: "Land here" })).toHaveFocus();
  });

  it("nested dialogs close one at a time, topmost first, and each returns focus to its trigger", async () => {
    render(page({ nested: true }));
    const trigger = await openDialog();
    const innerTrigger = await openDialog("Open inner");

    expect(screen.getAllByRole("dialog")).toHaveLength(2);
    const inner = screen.getByTestId("inner");
    expect(within(inner).getByRole("button", { name: "Inner cancel" })).toHaveFocus();

    // Escape closes the inner dialog only; the outer one stays open and regains the trap.
    await keyDown("Escape");
    expect(screen.queryByTestId("inner")).toBeNull();
    expect(screen.getByTestId("outer")).toBeInTheDocument();
    expect(innerTrigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");

    const outer = screen.getByTestId("outer");
    const save = within(outer).getByRole("button", { name: "Save" });
    save.focus();
    await keyDown("Tab");
    expect(within(outer).getByRole("button", { name: "Close" })).toHaveFocus();

    await keyDown("Escape");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("renders the layout parts with their modifiers", async () => {
    const Parts = defineComponent({
      setup: () => () =>
        h(Dialog, { open: true }, () =>
          h(DialogContent, () => [
            h(DialogHeader, { noBorder: true }, () => h(DialogTitle, () => "T")),
            h(DialogBody, { noPadding: true }, () => "B"),
            h(DialogFooter, { align: "between", noBorder: true }, () => "F"),
          ]),
        ),
    });
    render(Parts);
    await nextTick();
    expect(document.querySelector(".mild-modal-header")).toHaveClass(
      "mild-modal-header--no-border",
    );
    expect(document.querySelector(".mild-modal-body")).toHaveClass("mild-modal-body--no-padding");
    expect(document.querySelector(".mild-modal-footer")).toHaveClass(
      "mild-modal-footer--between",
      "mild-modal-footer--no-border",
    );
  });

  it("throws a helpful error when a part is used outside a dialog", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(() => render(h(DialogContent))).toThrow("<DialogContent> must be rendered inside");
    expect(() => render(h(DialogTitle, () => "x"))).toThrow("must be rendered inside");
    expect(() => render(h(DialogDescription, () => "x"))).toThrow("must be rendered inside");
    expect(() => render(h(DialogCloseButton))).toThrow("must be rendered inside");
    warn.mockRestore();
  });
});

itHasNoSeriousAxeViolations("Dialog", () =>
  h(Dialog, { open: true }, () =>
    h(DialogContent, () => [
      h(DialogHeader, () => [h(DialogTitle, () => "Edit profile"), h(DialogCloseButton)]),
      h(DialogBody, () => h(DialogDescription, () => "Make changes.")),
      h(DialogFooter, () => h(Button, () => "Save")),
    ]),
  ),
);
