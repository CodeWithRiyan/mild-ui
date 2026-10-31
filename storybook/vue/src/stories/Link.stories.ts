import type { Meta, StoryObj } from "@storybook/vue3";
import { Link, Text } from "@mild-ui/vue";

const meta: Meta<typeof Link> = {
  title: "Typography/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Navigational link. Renders an `a`; pass `as` to use a router link (`<Link :as="RouterLink" to="/docs">`). `external` adds `target="_blank"` with a safe `rel`, and `disabled` makes it inert while keeping the link role.',
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
  args: { href: "#docs" },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  render: (args) => ({
    components: { Link },
    setup: () => ({ args }),
    template: '<Link v-bind="args">Read the docs</Link>',
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Link, Text },
    template: `
      <div class="flex flex-col gap-2">
        <Link href="#">Underlined on hover (default)</Link>
        <Link href="#" underline="always">Always underlined</Link>
        <Link href="#" underline="none">Never underlined</Link>
        <Text>Inline and <Link href="#" plain>plain</Link> inside a sentence.</Text>
        <Link href="https://example.com" external>External (new tab)</Link>
        <Link href="#" disabled>Disabled</Link>
      </div>
    `,
  }),
};
