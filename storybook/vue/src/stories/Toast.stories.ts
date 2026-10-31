import type { Meta, StoryObj } from "@storybook/vue3";
import { Button, Toast, ToastProvider, useToast } from "@mild-ui/vue";
import { defineComponent, h } from "vue";

const Demo = defineComponent({
  name: "ToastDemo",
  components: { MildButton: Button },
  setup() {
    const { toast, dismissAll } = useToast();
    const saved = () =>
      toast({ title: "Saved", description: "Your changes are safe.", status: "success" });
    const failed = () =>
      toast({
        title: "Upload failed",
        description: "Check your connection.",
        status: "error",
        duration: null,
      });
    const withAction = () =>
      toast({
        title: "Message archived",
        action: () =>
          h(
            "button",
            {
              type: "button",
              class: "mild-button mild-button--link mild-button--primary mild-button--sm",
            },
            "Undo",
          ),
      });
    const top = () => toast({ title: "Up here", placement: "top", status: "warning" });
    return { saved, failed, withAction, top, dismissAll };
  },
  template: `
    <div class="flex flex-wrap gap-2">
      <MildButton @click="saved">Success</MildButton>
      <MildButton variant="destructive" @click="failed">Error (persistent)</MildButton>
      <MildButton variant="outline" @click="withAction">With action</MildButton>
      <MildButton variant="ghost" @click="top">Top placement</MildButton>
      <MildButton variant="link" @click="dismissAll">Dismiss all</MildButton>
    </div>
  `,
});

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Toast notifications. `ToastProvider` owns the queue and renders one region per placement; `useToast()` adds, updates and dismisses toasts; `Toast` is one notification. The auto-dismiss timer pauses while hovered or focused (`@mild-ui/primitives/toast`). Toasts are live regions per the [WAI-ARIA APG alert pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) (`role="status"`, or `"alert"` for errors and warnings); stacking, pause and close tests: `packages/vue/src/components/Toast/Toast.test.ts`.',
      },
    },
  },
  argTypes: {
    status: { control: "select", options: ["info", "success", "warning", "error"] },
    title: { control: "text" },
    description: { control: "text" },
    closable: { control: "boolean" },
    onClose: { action: "close" },
  },
  args: {
    title: "Saved",
    description: "Your changes are safe.",
    status: "success",
    duration: null,
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Single: Story = {
  render: (args) => ({
    components: { Toast },
    setup: () => ({ args }),
    template: '<div class="w-96"><Toast v-bind="args" /></div>',
  }),
};

export const WithProvider: Story = {
  render: () => ({
    components: { ToastProvider, Demo },
    template: '<ToastProvider :duration="4000"><Demo /></ToastProvider>',
  }),
};
