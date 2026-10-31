import type { Meta, StoryObj } from "@storybook/vue3";
import { SegmentedControl } from "@mild-ui/vue";
import { ref } from "vue";

const items = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year", disabled: true },
];

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Single-choice control drawn as one bar of segments. It is a radio group driven by `@mild-ui/primitives/radio-group`: one tab stop, Arrow keys move and select, Space selects, per the [WAI-ARIA APG radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/). Supports `v-model`. Keyboard tests: `packages/vue/src/components/SegmentedControl/SegmentedControl.test.ts`.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    name: { control: "text" },
    "onUpdate:modelValue": { action: "update:modelValue" },
  },
  args: { items, defaultValue: "week" },
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  render: (args) => ({
    components: { SegmentedControl },
    setup: () => ({ args }),
    template: '<SegmentedControl aria-label="Range" v-bind="args" />',
  }),
};

export const Controlled: Story = {
  render: () => ({
    components: { SegmentedControl },
    setup() {
      const range = ref("day");
      return { range, items };
    },
    template: `
      <div class="flex flex-col gap-3">
        <SegmentedControl aria-label="Range" v-model="range" :items="items" full-width />
        <output class="text-sm">Selected: {{ range }}</output>
      </div>
    `,
  }),
};

export const Vertical: Story = {
  args: { orientation: "vertical", size: "sm" },
  render: Default.render,
};
