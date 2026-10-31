import type { Meta, StoryObj } from "@storybook/vue3";
import { Input, Label } from "@mild-ui/vue";
import { ref } from "vue";

// `placeholder` is a native attribute that falls through to the element, not a declared prop.
type Args = InstanceType<typeof Input>["$props"] & { placeholder?: string };

const meta: Meta<Args> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Text input with outline, filled, flushed and unstyled variants, five sizes, and error, disabled, readonly and required states. Supports `v-model`.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "flushed", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    type: { control: "text" },
    placeholder: { control: "text" },
    fullWidth: { control: "boolean" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    "onUpdate:modelValue": { action: "update:modelValue" },
  },
  args: { placeholder: "Type here" },
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {
  render: (args) => ({
    components: { Input },
    setup: () => ({ args }),
    template: '<div class="w-64"><Input aria-label="Text" v-bind="args" /></div>',
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div class="flex flex-col gap-4 w-64">
        <Input aria-label="Outline" variant="outline" placeholder="Outline" />
        <Input aria-label="Filled" variant="filled" placeholder="Filled" />
        <Input aria-label="Flushed" variant="flushed" placeholder="Flushed" />
        <Input aria-label="Unstyled" variant="unstyled" placeholder="Unstyled" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div class="flex flex-col gap-4 w-64">
        <Input aria-label="Extra small" size="xs" placeholder="Extra small" />
        <Input aria-label="Small" size="sm" placeholder="Small" />
        <Input aria-label="Medium" size="md" placeholder="Medium" />
        <Input aria-label="Large" size="lg" placeholder="Large" />
        <Input aria-label="Extra large" size="xl" placeholder="Extra large" />
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div class="flex flex-col gap-4 w-64">
        <Input aria-label="Error" error placeholder="Error" />
        <Input aria-label="Disabled" disabled placeholder="Disabled" />
        <Input aria-label="Readonly" readonly model-value="Read only" />
        <Input aria-label="Required" required placeholder="Required" />
      </div>
    `,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    components: { Input, Label },
    setup() {
      const email = ref("");
      return { email };
    },
    template: `
      <div class="flex flex-col gap-1 w-64">
        <Label for="email" required>Email</Label>
        <Input id="email" v-model="email" type="email" placeholder="you@example.com" required />
        <output class="text-sm">{{ email || "(empty)" }}</output>
      </div>
    `,
  }),
};
