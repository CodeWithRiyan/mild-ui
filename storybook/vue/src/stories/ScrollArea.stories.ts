import type { Meta, StoryObj } from "@storybook/vue3";
import { ScrollArea, Text } from "@mild-ui/vue";

const meta: Meta<typeof ScrollArea> = {
  title: "Layout/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Scroll container with slim, themed scrollbars. Give it a `maxHeight` (or `maxWidth` for horizontal) so the content has something to overflow. Keyboard-focusable so the region can be scrolled without a pointer.",
      },
    },
  },
  argTypes: {
    as: { control: "text" },
    orientation: { control: "radio", options: ["vertical", "horizontal", "both"] },
    scrollbars: { control: "radio", options: ["auto", "always", "hover", "hidden"] },
    height: { control: "text" },
    maxHeight: { control: "text" },
    maxWidth: { control: "text" },
  },
  args: { maxHeight: "48" },
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: (args) => ({
    components: { ScrollArea, Text },
    setup: () => ({ args, lines: Array.from({ length: 30 }, (_, i) => `Line ${i + 1}`) }),
    template: `
      <ScrollArea v-bind="args" role="region" aria-label="Log" style="width: 20rem; border: 1px solid var(--mild-border); border-radius: var(--mild-radius-md); padding: .5rem">
        <Text v-for="line in lines" :key="line" as="p">{{ line }}</Text>
      </ScrollArea>
    `,
  }),
};

export const Horizontal: Story = {
  args: { orientation: "horizontal", maxWidth: "80", scrollbars: "always", maxHeight: undefined },
  render: (args) => ({
    components: { ScrollArea },
    setup: () => ({ args }),
    template: `
      <ScrollArea v-bind="args" as="ul" aria-label="Chips" style="display: flex; gap: .5rem; list-style: none; padding: .5rem; margin: 0">
        <li v-for="i in 20" :key="i" style="flex: none; padding: .25rem .75rem; border-radius: 999px; background: var(--mild-color-gray-200)">Chip {{ i }}</li>
      </ScrollArea>
    `,
  }),
};
