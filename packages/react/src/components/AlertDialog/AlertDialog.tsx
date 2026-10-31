"use client";

// packages/react/src/components/AlertDialog/AlertDialog.tsx
import * as React from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  type DialogProps,
} from "../Dialog";

export interface AlertDialogProps extends Omit<DialogProps, "role" | "initialFocusRef"> {
  /**
   * The least destructive action (usually "Cancel"), focused when the dialog opens so that
   * an accidental Enter does not confirm.
   */
  leastDestructiveRef?: DialogProps["initialFocusRef"];
}

/**
 * A dialog that interrupts the user with a decision (`role="alertdialog"`). Unlike `Dialog`,
 * clicking the overlay does not close it, and focus starts on the least destructive action.
 * Compose it with `AlertDialogContent`, `AlertDialogTitle`, `AlertDialogDescription`, ...
 */
export function AlertDialog({
  leastDestructiveRef,
  closeOnOverlayClick = false,
  ...rest
}: AlertDialogProps): React.ReactElement | null {
  return (
    <Dialog
      role="alertdialog"
      initialFocusRef={leastDestructiveRef}
      closeOnOverlayClick={closeOnOverlayClick}
      {...rest}
    />
  );
}
AlertDialog.displayName = "AlertDialog";

// The parts are the dialog's; the role comes from the root.
export const AlertDialogContent = DialogContent;
export const AlertDialogHeader = DialogHeader;
export const AlertDialogTitle = DialogTitle;
export const AlertDialogDescription = DialogDescription;
export const AlertDialogBody = DialogBody;
export const AlertDialogFooter = DialogFooter;
