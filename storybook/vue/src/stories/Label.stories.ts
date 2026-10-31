import type { Meta, StoryObj } from "@storybook/vue3";
import { Checkbox, Input, Label, Switch } from "@mild-ui/vue";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form label. Names native controls through `for`, and also focuses and activates custom controls (Checkbox, Switch, radios) on click, as a native label would. The required marker is decorative: `required` is announced by the control itself.",
      },
    },
  },
  argTypes: {
    for: { control: "text" },
    required: { control: "boolean" },
    error: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: (args) => ({
    components: { Label, Input },
    setup: () => ({ args }),
    template: `
      <div class="flex flex-col gap-1 w-64">
        <Label for="name" v-bind="args">Name</Label>
        <Input id="name" :required="args.required" :error="args.error" />
      </div>
    `,
  }),
};

export const Required: Story = {
  args: { required: true },
  render: Default.render,
};

export const Error: Story = {
  args: { error: true, required: true },
  render: Default.render,
};

export const CustomControls: Story = {
  name: "Activating custom controls",
  render: () => ({
    components: { Label, Checkbox, Switch },
    template: `
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label for="terms">Click me to toggle the checkbox</Label>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="wifi" />
          <Label for="wifi">Click me to toggle the switch</Label>
        </div>
      </div>
    `,
  }),
};
