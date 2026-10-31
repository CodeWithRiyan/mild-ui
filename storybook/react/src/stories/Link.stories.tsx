import type { Meta, StoryObj } from "@storybook/react";
import { Link, Text } from "@mild-ui/react";

const meta = {
  title: "Typography/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Navigational link. Renders an `a`; pass `as` to use a router link (`<Link as={RouterLink} to="/docs">`). `external` adds `target="_blank"` with a safe `rel`, and `disabled` makes it inert while keeping the link role.',
      },
    },
  },
  argTypes: {
    href: { control: "text" },
    underline: { control: "radio", options: ["none", "hover", "always"] },
    external: { control: "boolean" },
    plain: { control: "boolean" },
    disabled: { control: "boolean" },
    onClick: { action: "click" },
  },
  args: { href: "#docs", children: "Read the docs" },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Variants = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Link href="#">Underlined on hover (default)</Link>
      <Link href="#" underline="always">
        Always underlined
      </Link>
      <Link href="#" underline="none">
        Never underlined
      </Link>
      <Text>
        Inline and{" "}
        <Link href="#" plain>
          plain
        </Link>{" "}
        inside a sentence.
      </Text>
      <Link href="https://example.com" external>
        External (new tab)
      </Link>
      <Link href="#" disabled>
        Disabled
      </Link>
    </div>
  ),
} satisfies Story;
