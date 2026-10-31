import * as React from "react";
import { alertDialogCases } from "@mild-ui/test-cases/alert-dialog";
import { runComponentCases } from "../../test-utils/run-cases";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  type AlertDialogProps,
} from "./AlertDialog";

runComponentCases(alertDialogCases, (c) => (
  <AlertDialog {...(c.props as AlertDialogProps)}>
    <AlertDialogContent>
      <AlertDialogTitle>Delete project?</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
      <button type="button">Cancel</button>
    </AlertDialogContent>
  </AlertDialog>
));
