import type { Meta, StoryObj } from "@storybook/vue3";
import { Button } from "@mild-ui/vue";
import { ref } from "vue";
import { PlusIcon, ArrowRightIcon, DownloadIcon } from "lucide-vue-next";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button with solid, outline, ghost and link styles, five sizes, icon slots, and loading and disabled states. A loading button stays focusable and is announced busy instead of disabled.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "link", "destructive"],
    },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "icon"] },
    colorScheme: { control: "text" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    fullWidth: { control: "boolean" },
    type: { control: "select", options: ["button", "submit", "reset"] },
    onClick: { action: "clicked" },
  },
  args: {
    variant: "primary",
    size: "md",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    `,
  }),
};

export const ColorSchemes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap gap-4">
        <Button variant="outline" color-scheme="danger">Delete</Button>
        <Button variant="ghost" color-scheme="success">Approve</Button>
        <Button variant="link" color-scheme="secondary">Learn more</Button>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex items-center gap-4">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra large</Button>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    components: { Button, PlusIcon, DownloadIcon, ArrowRightIcon },
    template: `
      <div class="flex flex-wrap gap-4">
        <Button>
          <template #leftIcon><PlusIcon :size="16" /></template>
          Add item
        </Button>
        <Button variant="secondary">
          <template #leftIcon><DownloadIcon :size="16" /></template>
          Download
        </Button>
        <Button variant="outline">
          Continue
          <template #rightIcon><ArrowRightIcon :size="16" /></template>
        </Button>
        <Button size="icon" aria-label="Add">
          <template #leftIcon><PlusIcon :size="16" /></template>
        </Button>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap gap-4">
        <Button disabled>Disabled</Button>
        <Button loading>Saving</Button>
        <Button variant="outline" loading>Loading outline</Button>
        <Button full-width>Full width</Button>
      </div>
    `,
  }),
};

export const LoadingOnClick: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const loading = ref(false);
      const submit = () => {
        loading.value = true;
        setTimeout(() => (loading.value = false), 2000);
      };
      return { loading, submit };
    },
    template: `
      <Button :loading="loading" @click="submit">
        {{ loading ? "Submitting..." : "Submit" }}
      </Button>
    `,
  }),
};
