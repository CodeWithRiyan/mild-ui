import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@mild-ui/react";

const meta = {
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
  args: {
    padding: "4",
    borderRadius: "lg",
    backgroundColor: "primary-500",
    color: "white",
    children: "A themed box",
  },
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const FlexLayout = {
  render: () => (
    <Box display="flex" gap="3" padding="4" borderRadius="md" backgroundColor="gray-100">
      <Box padding="3" borderRadius="md" backgroundColor="primary-500" color="white">
        One
      </Box>
      <Box padding="3" borderRadius="md" backgroundColor="primary-600" color="white">
        Two
      </Box>
      <Box padding="3" borderRadius="md" backgroundColor="primary-700" color="white">
        Three
      </Box>
    </Box>
  ),
} satisfies Story;

export const AsSection = {
  render: () => (
    <Box
      as="section"
      aria-label="Card"
      padding="6"
      borderWidth="px"
      borderColor="gray-200"
      borderRadius="lg"
      maxWidth="96"
    >
      <Text as="h3" fontSize="lg" fontWeight="semibold">
        A section
      </Text>
      <Text as="p" color="muted">
        Rendered as a landmark with themed spacing and borders.
      </Text>
    </Box>
  ),
} satisfies Story;
