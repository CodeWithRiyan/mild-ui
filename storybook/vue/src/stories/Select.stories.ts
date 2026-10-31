import type { Meta, StoryObj } from "@storybook/vue3";
import {
  Select,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@mild-ui/vue";
import { ref } from "vue";

const options = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "br", label: "Brazil", disabled: true },
  { value: "ar", label: "Argentina" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Select-only combobox with a listbox popup driven by `@mild-ui/primitives/listbox`: Arrow/Enter/Space open it, Arrow/Home/End move, typing jumps to an option, Enter/Space select, Escape and Tab close. Use `options` or compose the parts. Follows the [WAI-ARIA APG select-only combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/); keyboard tests: `packages/vue/src/components/Select/Select.test.ts`.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    modelValue: { control: "select", options: options.map((option) => option.value) },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    fullWidth: { control: "boolean" },
    error: { control: "boolean" },
    name: { control: "text" },
    "onUpdate:modelValue": { action: "update:modelValue" },
    onChange: { action: "change" },
    "onUpdate:open": { action: "update:open" },
  },
  args: { options, placeholder: "Pick a country" },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => ({
    components: { Select },
    setup: () => ({ args }),
    template: '<div class="w-64"><Select aria-label="Country" v-bind="args" /></div>',
  }),
};

export const WithValue: Story = {
  args: { defaultValue: "mx" },
  render: Default.render,
};

export const Error: Story = {
  args: { error: true },
  render: Default.render,
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "ca" },
  render: Default.render,
};

export const Sizes: Story = {
  render: () => ({
    components: { Select },
    setup: () => ({ options }),
    template: `
      <div class="flex flex-col gap-4 w-64">
        <Select aria-label="Small" size="sm" :options="options" placeholder="Small" />
        <Select aria-label="Medium" size="md" :options="options" placeholder="Medium" />
        <Select aria-label="Large" size="lg" :options="options" placeholder="Large" />
      </div>
    `,
  }),
};

export const Controlled: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const country = ref("us");
      return { country, options };
    },
    template: `
      <div class="flex flex-col gap-3 w-64">
        <Select aria-label="Country" v-model="country" :options="options" />
        <output class="text-sm">Value: {{ country }}</output>
      </div>
    `,
  }),
};

export const Composed: Story = {
  name: "Composed from parts",
  render: () => ({
    components: { SelectRoot, SelectTrigger, SelectValue, SelectContent, SelectItem },
    template: `
      <div class="w-64">
        <SelectRoot default-value="ca" name="country">
          <SelectTrigger aria-label="Country" full-width>
            <SelectValue placeholder="Pick a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">🇺🇸 United States</SelectItem>
            <SelectItem value="ca">🇨🇦 Canada</SelectItem>
            <SelectItem value="mx">🇲🇽 Mexico</SelectItem>
          </SelectContent>
        </SelectRoot>
      </div>
    `,
  }),
};
