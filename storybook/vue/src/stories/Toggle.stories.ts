import type { Meta, StoryObj } from "@storybook/vue3";
import { Toggle, ToggleGroup, ToggleGroupItem } from "@mild-ui/vue";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from "lucide-vue-next";
import { ref } from "vue";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'A two-state button (`aria-pressed`). Controlled through `v-model:pressed`, or uncontrolled with `defaultPressed`. `ToggleGroup` presses one (`type="single"`) or many (`type="multiple"`) `ToggleGroupItem`s with one tab stop and Arrow/Home/End keys, driven by `@mild-ui/primitives/toggle-group`. Patterns: [WAI-ARIA APG button (toggle)](https://www.w3.org/WAI/ARIA/apg/patterns/button/) and [toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) for the group\'s roving focus; keyboard tests: `packages/vue/src/components/Toggle/Toggle.test.ts` and `ToggleGroup/ToggleGroup.test.ts`.',
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["ghost", "outline"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    defaultPressed: { control: "boolean" },
    "onUpdate:pressed": { action: "update:pressed" },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: (args) => ({
    components: { Toggle, BoldIcon },
    setup: () => ({ args }),
    template: '<Toggle aria-label="Bold" v-bind="args"><BoldIcon :size="16" /></Toggle>',
  }),
};

export const Controlled: Story = {
  render: () => ({
    components: { Toggle, ItalicIcon },
    setup() {
      const italic = ref(false);
      return { italic };
    },
    template: `
      <div class="flex items-center gap-3">
        <Toggle aria-label="Italic" v-model:pressed="italic" variant="outline"><ItalicIcon :size="16" /></Toggle>
        <output class="text-sm">{{ italic ? "on" : "off" }}</output>
      </div>
    `,
  }),
};

export const GroupSingle: Story = {
  name: "ToggleGroup (single)",
  render: () => ({
    components: { ToggleGroup, ToggleGroupItem, AlignLeftIcon, AlignCenterIcon, AlignRightIcon },
    setup() {
      const align = ref<string | null>("left");
      return { align };
    },
    template: `
      <div class="flex flex-col gap-3">
        <ToggleGroup aria-label="Alignment" v-model="align" attached variant="outline">
          <ToggleGroupItem value="left" aria-label="Align left"><AlignLeftIcon :size="16" /></ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center"><AlignCenterIcon :size="16" /></ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right"><AlignRightIcon :size="16" /></ToggleGroupItem>
        </ToggleGroup>
        <output class="text-sm">{{ align ?? "none" }}</output>
      </div>
    `,
  }),
};

export const GroupMultiple: Story = {
  name: "ToggleGroup (multiple)",
  render: () => ({
    components: { ToggleGroup, ToggleGroupItem, BoldIcon, ItalicIcon, UnderlineIcon },
    setup() {
      const format = ref<string[]>(["bold"]);
      return { format };
    },
    template: `
      <div class="flex flex-col gap-3">
        <ToggleGroup aria-label="Format" type="multiple" v-model="format">
          <ToggleGroupItem value="bold" aria-label="Bold"><BoldIcon :size="16" /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic"><ItalicIcon :size="16" /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline" disabled><UnderlineIcon :size="16" /></ToggleGroupItem>
        </ToggleGroup>
        <output class="text-sm">{{ format.join(", ") || "none" }}</output>
      </div>
    `,
  }),
};
