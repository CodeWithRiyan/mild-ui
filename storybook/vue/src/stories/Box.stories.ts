import type { Meta, StoryObj } from "@storybook/vue3";
import { Box, Text } from "@mild-ui/vue";

const meta: Meta<typeof Box> = {
  title: "Components/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Layout primitive. Renders a `div` by default, or the element given with `as`. Its style props take design-token keys only (`padding="4"`, `width="1/2"`, `backgroundColor="primary-500"`) and resolve to themed `--mild-*` custom properties.',
      },
    },
  },
  argTypes: {
    as: { control: "text" },
    display: {
      control: "select",
      options: ["block", "inline-block", "inline", "flex", "inline-flex", "grid", "none"],
    },
    padding: { control: "text" },
    margin: { control: "text" },
    gap: { control: "text" },
    borderRadius: { control: "select", options: ["none", "sm", "base", "md", "lg", "xl", "full"] },
    backgroundColor: { control: "text" },
    color: { control: "text" },
  },
  args: { padding: "4", borderRadius: "lg", backgroundColor: "primary-500", color: "white" },
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
  render: (args) => ({
    components: { Box },
    setup: () => ({ args }),
    template: '<Box v-bind="args">A themed box</Box>',
  }),
};

export const FlexLayout: Story = {
  render: () => ({
    components: { Box, Text },
    template: `
      <Box display="flex" gap="3" padding="4" border-radius="md" background-color="gray-100">
        <Box padding="3" border-radius="md" background-color="primary-500" color="white">One</Box>
        <Box padding="3" border-radius="md" background-color="primary-600" color="white">Two</Box>
        <Box padding="3" border-radius="md" background-color="primary-700" color="white">Three</Box>
      </Box>
    `,
  }),
};

export const AsSection: Story = {
  render: () => ({
    components: { Box, Text },
    template: `
      <Box as="section" aria-label="Card" padding="6" border-width="px" border-color="gray-200" border-radius="lg" max-width="96">
        <Text as="h3" font-size="lg" font-weight="semibold">A section</Text>
        <Text as="p" color="muted">Rendered as a landmark with themed spacing and borders.</Text>
      </Box>
    `,
  }),
};
