import * as React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./Dialog";
import { Button } from "../Button";

/** A page with a trigger that opens a dialog; the dialog can open a nested one. */
function Page({
  nested = false,
  closeOnOverlayClick,
  closeOnEscape,
  onOpenChange,
}: {
  nested?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [innerOpen, setInnerOpen] = React.useState(false);
  const change = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };
  return (
    <>
      <button type="button" onClick={() => change(true)}>
        Open dialog
      </button>
      <button type="button">Outside</button>
      <Dialog
        open={open}
        onOpenChange={change}
        closeOnOverlayClick={closeOnOverlayClick}
        closeOnEscape={closeOnEscape}
      >
        <DialogContent data-testid="outer">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogCloseButton />
          </DialogHeader>
          <DialogBody>
            <DialogDescription>Make changes to your profile.</DialogDescription>
            <input aria-label="Name" />
            {nested && (
              <button type="button" onClick={() => setInnerOpen(true)}>
                Open inner
              </button>
            )}
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => change(false)}>
              Cancel
            </Button>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {nested && (
        <Dialog open={innerOpen} onOpenChange={setInnerOpen}>
          <DialogContent data-testid="inner">
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogFooter>
              <Button onClick={() => setInnerOpen(false)}>Inner cancel</Button>
              <Button>Inner confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

function openDialog(name = "Open dialog") {
  const trigger = screen.getByRole("button", { name });
  trigger.focus();
  fireEvent.click(trigger);
  return trigger;
}

const keyDown = (key: string, init: KeyboardEventInit = {}) =>
  fireEvent.keyDown(document.activeElement ?? document.body, { key, ...init });

afterEach(() => {
  document.body.style.overflow = "";
});

describe("Dialog (WAI-ARIA dialog pattern)", () => {
  it("renders nothing while closed and a modal dialog named and described by its parts", () => {
    render(<Page />);
    expect(screen.queryByRole("dialog")).toBeNull();

    openDialog();
    const dialog = screen.getByRole("dialog", { name: "Edit profile" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleDescription("Make changes to your profile.");
    expect(dialog).toHaveClass("mild-modal-content", "mild-modal-content--md");
    // Rendered in a portal under the overlay, not inline.
    expect(dialog.closest(".mild-modal-overlay")?.parentElement).toBe(document.body);
  });

  it("moves focus into the dialog when it opens (first tabbable element)", () => {
    render(<Page />);
    openDialog();
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("button", { name: "Close" })).toHaveFocus();
  });

  it("traps Tab and Shift+Tab inside the dialog", () => {
    render(<Page />);
    openDialog();
    const dialog = screen.getByRole("dialog");
    const close = within(dialog).getByRole("button", { name: "Close" });
    const save = within(dialog).getByRole("button", { name: "Save" });

    save.focus();
    keyDown("Tab");
    expect(close).toHaveFocus();

    keyDown("Tab", { shiftKey: true });
    expect(save).toHaveFocus();
  });

  it("pulls focus back when it lands outside the dialog", () => {
    render(<Page />);
    openDialog();
    act(() => screen.getByRole("button", { name: "Outside" }).focus());
    expect(screen.getByRole("dialog").contains(document.activeElement)).toBe(true);
  });

  it("closes on Escape and returns focus to the trigger", () => {
    const onOpenChange = vi.fn();
    render(<Page onOpenChange={onOpenChange} />);
    const trigger = openDialog();

    keyDown("Escape");
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("returns focus to the trigger after the close button and the cancel action too", () => {
    render(<Page />);
    let trigger = openDialog();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();

    trigger = openDialog();
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("locks the page scroll while open and restores it after", () => {
    render(<Page />);
    expect(document.body.style.overflow).toBe("");

    openDialog();
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.body).toHaveClass("mild-modal-open");

    keyDown("Escape");
    expect(document.body.style.overflow).toBe("");
    expect(document.body).not.toHaveClass("mild-modal-open");
  });

  it("closes on an overlay click but not on a click inside the panel", () => {
    render(<Page />);
    openDialog();
    fireEvent.click(screen.getByRole("dialog"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(document.querySelector("[data-dialog-overlay]") as HTMLElement);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("can keep the overlay click and Escape from closing", () => {
    render(<Page closeOnOverlayClick={false} closeOnEscape={false} />);
    openDialog();
    fireEvent.click(document.querySelector("[data-dialog-overlay]") as HTMLElement);
    keyDown("Escape");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("honours initialFocusRef and finalFocusRef", () => {
    function Custom() {
      const [open, setOpen] = React.useState(false);
      const initial = React.useRef<HTMLButtonElement>(null);
      const final = React.useRef<HTMLButtonElement>(null);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open
          </button>
          <button type="button" ref={final}>
            Land here
          </button>
          <Dialog
            open={open}
            onOpenChange={setOpen}
            initialFocusRef={initial}
            finalFocusRef={final}
          >
            <DialogContent>
              <DialogTitle>Custom focus</DialogTitle>
              <button type="button">First</button>
              <button type="button" ref={initial}>
                Second
              </button>
            </DialogContent>
          </Dialog>
        </>
      );
    }
    render(<Custom />);
    openDialog("Open");
    expect(screen.getByRole("button", { name: "Second" })).toHaveFocus();

    keyDown("Escape");
    expect(screen.getByRole("button", { name: "Land here" })).toHaveFocus();
  });

  it("nested dialogs close one at a time, topmost first, and each returns focus to its trigger", () => {
    render(<Page nested />);
    const trigger = openDialog();
    const innerTrigger = openDialog("Open inner");

    expect(screen.getAllByRole("dialog")).toHaveLength(2);
    const inner = screen.getByTestId("inner");
    expect(within(inner).getByRole("button", { name: "Inner cancel" })).toHaveFocus();

    // Escape closes the inner dialog only; the outer one stays open and regains the trap.
    keyDown("Escape");
    expect(screen.queryByTestId("inner")).toBeNull();
    expect(screen.getByTestId("outer")).toBeInTheDocument();
    expect(innerTrigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");

    // The outer trap is active again.
    const outer = screen.getByTestId("outer");
    const save = within(outer).getByRole("button", { name: "Save" });
    save.focus();
    keyDown("Tab");
    expect(within(outer).getByRole("button", { name: "Close" })).toHaveFocus();

    // Then Escape closes the outer dialog and focus returns to the page trigger.
    keyDown("Escape");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("while a nested dialog is open, the outer dialog's focus trap yields to it", () => {
    render(<Page nested />);
    openDialog();
    openDialog("Open inner");
    const inner = screen.getByTestId("inner");
    const confirm = within(inner).getByRole("button", { name: "Inner confirm" });
    confirm.focus();
    keyDown("Tab");
    expect(within(inner).getByRole("button", { name: "Inner cancel" })).toHaveFocus();
  });

  it("throws a helpful error when a part is used outside a dialog", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<DialogContent />)).toThrow("<DialogContent> must be rendered inside");
    error.mockRestore();
  });
});
