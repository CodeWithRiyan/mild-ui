import type { Meta, StoryObj } from "@storybook/vue3";
import { InputPassword, Label } from "@mild-ui/vue";
import { ref } from "vue";

// `placeholder` is a native attribute that falls through to the element, not a declared prop.
type Args = InstanceType<typeof InputPassword>["$props"] & { placeholder?: string };

const meta: Meta<Args> = {
  title: "Components/InputPassword",
  component: InputPassword,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Password input with a show/hide toggle. The toggle announces its pressed state and never steals focus or the caret from the input.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "flushed", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    placeholder: { control: "text" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    "onUpdate:modelValue": { action: "update:modelValue" },
  },
  args: { placeholder: "Password" },
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {
  render: (args) => ({
    components: { InputPassword },
    setup: () => ({ args }),
    template: '<div class="w-64"><InputPassword aria-label="Password" v-bind="args" /></div>',
  }),
};

export const WithLabel: Story = {
  render: () => ({
    components: { InputPassword, Label },
    setup() {
      const password = ref("hunter2");
      return { password };
    },
    template: `
      <div class="flex flex-col gap-1 w-64">
        <Label for="password">Password</Label>
        <InputPassword id="password" v-model="password" autocomplete="current-password" />
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    components: { InputPassword },
    template: `
      <div class="flex flex-col gap-4 w-64">
        <InputPassword aria-label="Error" error placeholder="Error" />
        <InputPassword aria-label="Disabled" disabled placeholder="Disabled" />
        <InputPassword aria-label="Small" size="sm" placeholder="Small" />
      </div>
    `,
  }),
};
