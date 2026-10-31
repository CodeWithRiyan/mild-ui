import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  Button,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  type DialogProps,
} from "@mild-ui/react";

const meta = {
  title: "Overlay/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Modal dialog (`open` / `onOpenChange`). While open it renders in a portal under an overlay, traps focus, locks the page scroll, closes on Escape (and on the overlay) and returns focus to the trigger. `AlertDialog` is `role="alertdialog"`: the overlay does not close it and focus starts on the least destructive action. Behaviour from `@mild-ui/primitives/dialog`, per the [WAI-ARIA APG dialog (modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) and [alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) patterns; keyboard and focus tests: `packages/react/src/components/Dialog/Dialog.test.tsx` and `AlertDialog/AlertDialog.test.tsx`.',
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "full"] },
    closeOnOverlayClick: { control: "boolean" },
    closeOnEscape: { control: "boolean" },
    blurOverlay: { control: "boolean" },
  },
  args: { size: "md", open: false },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

function DialogDemo(args: DialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit profile</Button>
      <Dialog {...args} open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogCloseButton />
          </DialogHeader>
          <DialogBody>
            <DialogDescription>Make changes to your profile here.</DialogDescription>
            <div className="flex flex-col gap-1 mt-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Ada Lovelace" />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const Default = {
  render: (args) => <DialogDemo {...args} />,
} satisfies Story;

function AlertDialogDemo() {
  const [open, setOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete project
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen} leastDestructiveRef={cancelRef}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            This cannot be undone. All data will be removed.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <Button ref={cancelRef} variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export const Alert = {
  name: "AlertDialog",
  render: () => <AlertDialogDemo />,
} satisfies Story;
