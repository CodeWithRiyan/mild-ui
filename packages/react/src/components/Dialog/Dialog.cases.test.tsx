import * as React from "react";
import { dialogCases } from "@mild-ui/test-cases/dialog";
import { runComponentCases } from "../../test-utils/run-cases";
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  type DialogProps,
} from "./Dialog";

runComponentCases(dialogCases, (c) => (
  <Dialog {...(c.props as DialogProps)}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogCloseButton />
      </DialogHeader>
      <DialogDescription>Make changes.</DialogDescription>
    </DialogContent>
  </Dialog>
));
