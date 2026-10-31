import type { Meta, StoryObj } from "@storybook/vue3";
import { FormField, Textarea } from "@mild-ui/vue";
import { ref } from "vue";

// `placeholder` is a native attribute that falls through to the element, not a declared prop.
type Args = InstanceType<typeof Textarea>["$props"] & { placeholder?: string };

const meta: Meta<Args> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Multi-line text field with the same variants, sizes and states as `Input`. `autoResize` grows the field with its content instead of scrolling. Supports `v-model`.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "flushed", "unstyled"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    resize: { control: "select", options: ["none", "vertical", "horizontal", "both"] },
    autoResize: { control: "boolean" },
    rows: { control: "number" },
    placeholder: { control: "text" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    "onUpdate:modelValue": { action: "update:modelValue" },
  },
  args: { placeholder: "Your message" },
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {
  render: (args) => ({
    components: { Textarea },
    setup: () => ({ args }),
    template: '<div class="w-80"><Textarea aria-label="Message" v-bind="args" /></div>',
  }),
};

export const AutoResize: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const text = ref("Type a few lines...\nand watch the field grow.");
      return { text };
    },
    template: '<div class="w-80"><Textarea aria-label="Notes" v-model="text" auto-resize /></div>',
  }),
};

export const InAField: Story = {
  render: () => ({
    components: { FormField, Textarea },
    template: `
      <div class="w-80">
        <FormField name="bio" label="Bio" description="A few words about you" error="Too short" required>
          <Textarea :rows="4" />
        </FormField>
      </div>
    `,
  }),
};
