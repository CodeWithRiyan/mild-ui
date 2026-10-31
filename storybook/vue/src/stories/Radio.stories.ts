import type { Meta, StoryObj } from "@storybook/vue3";
import { Radio, RadioGroup, RadioGroupItem } from "@mild-ui/vue";
import { ref } from "vue";

const items = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "push", label: "Push notification" },
];

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radio group with roving tabindex driven by `@mild-ui/primitives/radio-group`: one tab stop, Arrow keys move and check (wrapping), Space checks the focused radio. Use `items` or compose `RadioGroup` + `RadioGroupItem`. Follows the [WAI-ARIA APG radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/); keyboard tests: `packages/vue/src/components/Radio/Radio.test.ts`.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    modelValue: { control: "select", options: items.map((item) => item.value) },
    defaultValue: { control: "select", options: items.map((item) => item.value) },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    name: { control: "text" },
    "onUpdate:modelValue": { action: "update:modelValue" },
    onChange: { action: "change" },
  },
  args: { items, defaultValue: "email" },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: (args) => ({
    components: { Radio },
    setup: () => ({ args }),
    template: '<Radio aria-label="Contact method" v-bind="args" />',
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
};

export const Sizes: Story = {
  render: () => ({
    components: { Radio },
    setup: () => ({ items }),
    template: `
      <div class="flex gap-8">
        <Radio aria-label="Small" size="sm" :items="items" default-value="email" />
        <Radio aria-label="Medium" size="md" :items="items" default-value="email" />
        <Radio aria-label="Large" size="lg" :items="items" default-value="email" />
      </div>
    `,
  }),
};

export const Composed: Story = {
  name: "Composed with RadioGroupItem",
  render: () => ({
    components: { RadioGroup, RadioGroupItem },
    setup() {
      const plan = ref("pro");
      return { plan };
    },
    template: `
      <div class="flex flex-col gap-4">
        <RadioGroup v-model="plan" name="plan" aria-label="Plan">
          <RadioGroupItem value="free">
            <span class="font-medium">Free</span> <span class="text-sm opacity-70">- for trying it out</span>
          </RadioGroupItem>
          <RadioGroupItem value="pro">
            <span class="font-medium">Pro</span> <span class="text-sm opacity-70">- for teams</span>
          </RadioGroupItem>
          <RadioGroupItem value="enterprise" disabled label="Enterprise (contact sales)" />
        </RadioGroup>
        <output class="text-sm">Selected: {{ plan }}</output>
      </div>
    `,
  }),
};
