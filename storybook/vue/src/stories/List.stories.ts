import type { Meta, StoryObj } from "@storybook/vue3";
import { List, ListItem } from "@mild-ui/vue";

const meta: Meta<typeof List> = {
  title: "Typography/List",
  component: List,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Bulleted or numbered list. `ordered` renders an `ol` (numbered), `unstyled` drops the marker and the indentation, `spacing` takes a spacing token for the gap between items, and a `ListItem` can replace its marker with an `icon` slot.",
      },
    },
  },
  argTypes: {
    ordered: { control: "boolean" },
    marker: {
      control: "select",
      options: [
        undefined,
        "disc",
        "circle",
        "square",
        "decimal",
        "decimal-leading-zero",
        "lower-alpha",
        "upper-alpha",
        "lower-roman",
        "upper-roman",
        "none",
      ],
    },
    unstyled: { control: "boolean" },
    spacing: { control: "select", options: [undefined, "0", "1", "2", "3", "4"] },
  },
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: (args) => ({
    components: { List, ListItem },
    setup: () => ({ args }),
    template: `
      <List v-bind="args">
        <ListItem>Framework-agnostic primitives</ListItem>
        <ListItem>One stylesheet for React and Vue</ListItem>
        <ListItem>Design tokens only</ListItem>
      </List>
    `,
  }),
};

export const Ordered: Story = {
  args: { ordered: true, marker: "lower-alpha", spacing: "2" },
  render: Default.render,
};

export const WithIcons: Story = {
  render: () => ({
    components: { List, ListItem },
    template: `
      <List unstyled spacing="2">
        <ListItem v-for="item in ['Install', 'Import the stylesheet', 'Ship']" :key="item">
          <template #icon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5" /></svg>
          </template>
          {{ item }}
        </ListItem>
      </List>
    `,
  }),
};
