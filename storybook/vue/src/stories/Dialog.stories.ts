import type { Meta, StoryObj } from "@storybook/vue3";
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
} from "@mild-ui/vue";
import { ref } from "vue";

const meta: Meta<typeof Dialog> = {
  title: "Overlay/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Modal dialog (`v-model:open`). While open it renders in a teleport under an overlay, traps focus, locks the page scroll, closes on Escape (and on the overlay) and returns focus to the trigger. `AlertDialog` is `role="alertdialog"`: the overlay does not close it and focus starts on the least destructive action. Behaviour from `@mild-ui/primitives/dialog`, per the [WAI-ARIA APG dialog (modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) and [alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) patterns; keyboard and focus tests: `packages/vue/src/components/Dialog/Dialog.test.ts` and `AlertDialog/AlertDialog.test.ts`.',
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "full"] },
    closeOnOverlayClick: { control: "boolean" },
    closeOnEscape: { control: "boolean" },
    blurOverlay: { control: "boolean" },
  },
  args: { size: "md" },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogBody,
      DialogFooter,
      DialogCloseButton,
      Button,
      Input,
      Label,
    },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <Button @click="open = true">Edit profile</Button>
      <Dialog v-model:open="open" v-bind="args">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogCloseButton />
          </DialogHeader>
          <DialogBody>
            <DialogDescription>Make changes to your profile here.</DialogDescription>
            <div class="flex flex-col gap-1 mt-3">
              <Label for="name">Name</Label>
              <Input id="name" model-value="Ada Lovelace" />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" @click="open = false">Cancel</Button>
            <Button @click="open = false">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
};

export const Alert: Story = {
  name: "AlertDialog",
  render: () => ({
    components: {
      AlertDialog,
      AlertDialogContent,
      AlertDialogTitle,
      AlertDialogDescription,
      AlertDialogFooter,
      Button,
    },
    setup() {
      const open = ref(false);
      const cancel = ref<{ $el: HTMLElement } | null>(null);
      return { open, cancel };
    },
    template: `
      <Button variant="destructive" @click="open = true">Delete project</Button>
      <AlertDialog v-model:open="open" :least-destructive="() => cancel?.$el">
        <AlertDialogContent>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone. All data will be removed.</AlertDialogDescription>
          <AlertDialogFooter>
            <Button ref="cancel" variant="outline" @click="open = false">Cancel</Button>
            <Button variant="destructive" @click="open = false">Delete</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    `,
  }),
};
