import type { Meta, StoryObj } from "@storybook/react";
import { Button, Toast, ToastProvider, useToast } from "@mild-ui/react";

function Demo() {
  const { toast, dismissAll } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast({ title: "Saved", description: "Your changes are safe.", status: "success" })
        }
      >
        Success
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            title: "Upload failed",
            description: "Check your connection.",
            status: "error",
            duration: null,
          })
        }
      >
        Error (persistent)
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Message archived",
            action: (
              <Button variant="link" size="sm">
                Undo
              </Button>
            ),
          })
        }
      >
        With action
      </Button>
      <Button
        variant="ghost"
        onClick={() => toast({ title: "Up here", placement: "top", status: "warning" })}
      >
        Top placement
      </Button>
      <Button variant="link" onClick={dismissAll}>
        Dismiss all
      </Button>
    </div>
  );
}

const meta = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Toast notifications. `ToastProvider` owns the queue and renders one region per placement; `useToast()` adds, updates and dismisses toasts; `Toast` is one notification. The auto-dismiss timer pauses while hovered or focused (`@mild-ui/primitives/toast`). Toasts are live regions per the [WAI-ARIA APG alert pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) (`role="status"`, or `"alert"` for errors and warnings); stacking, pause and close tests: `packages/react/src/components/Toast/Toast.test.tsx`.',
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
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single = {
  render: (args) => (
    <div className="w-96">
      <Toast {...args} />
    </div>
  ),
} satisfies Story;

export const WithProvider = {
  render: () => (
    <ToastProvider duration={4000}>
      <Demo />
    </ToastProvider>
  ),
} satisfies Story;
