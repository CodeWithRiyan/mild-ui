import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "./AlertDialog";
import { Button } from "../Button";

function Page({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = React.useState(false);
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const change = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };
  return (
    <>
      <button type="button" onClick={() => change(true)}>
        Delete
      </button>
      <AlertDialog open={open} onOpenChange={change} leastDestructiveRef={cancelRef}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          <AlertDialogFooter>
            <Button ref={cancelRef} variant="outline" onClick={() => change(false)}>
              Cancel
            </Button>
            <Button variant="destructive">Delete</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

describe("AlertDialog (WAI-ARIA alertdialog role)", () => {
  it("renders role=alertdialog, named and described, with focus on the least destructive action", () => {
    render(<Page />);
    const trigger = screen.getByRole("button", { name: "Delete" });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = screen.getByRole("alertdialog", { name: "Delete project?" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleDescription("This cannot be undone.");
    expect(dialog).toHaveClass("mild-modal-content", "mild-modal-content--alert");
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();
  });

  it("does not close on an overlay click, but does on Escape, returning focus to the trigger", () => {
    const onOpenChange = vi.fn();
    render(<Page onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole("button", { name: "Delete" });
    trigger.focus();
    fireEvent.click(trigger);

    fireEvent.click(document.querySelector("[data-dialog-overlay]") as HTMLElement);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    fireEvent.keyDown(document.activeElement as Element, { key: "Escape" });
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(screen.queryByRole("alertdialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });
});
