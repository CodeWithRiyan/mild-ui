import type { Meta, StoryObj } from "@storybook/react";
import { Container, Text } from "@mild-ui/react";

const meta = {
  title: "Layout/Container",
  component: Container,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Horizontally centered wrapper with a max-width from the breakpoint scale (`size`) and horizontal padding. Renders a `div`, or the element given with `as` (`main`, `section`, ...).",
      },
    },
  },
  argTypes: {
    as: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg", "xl", "2xl", "full"] },
    padding: { control: "select", options: ["0", "2", "4", "6", "8", "12"] },
    centerContent: { control: "boolean" },
  },
  args: { size: "lg" },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: (args) => (
    <Container
      {...args}
      style={{
        background: "var(--mild-color-gray-100)",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Text as="p">
        This content is limited to the <code>{args.size}</code> breakpoint width and centered in the
        viewport.
      </Text>
    </Container>
  ),
} satisfies Story;

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {(["sm", "md", "lg", "xl", "2xl", "full"] as const).map((size) => (
        <Container
          key={size}
          size={size}
          style={{
            background: "var(--mild-color-primary-100)",
            paddingTop: ".5rem",
            paddingBottom: ".5rem",
          }}
        >
          {size}
        </Container>
      ))}
    </div>
  ),
} satisfies Story;

export const CenteredContent = {
  args: { size: "md", centerContent: true },
  render: Default.render,
} satisfies Story;
