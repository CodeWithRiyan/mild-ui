import type { Meta, StoryObj } from "@storybook/vue3";
import { Container, Text } from "@mild-ui/vue";

const meta: Meta<typeof Container> = {
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
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: (args) => ({
    components: { Container, Text },
    setup: () => ({ args }),
    template: `
      <Container v-bind="args" style="background: var(--mild-color-gray-100); padding-top: 1rem; padding-bottom: 1rem">
        <Text as="p">This content is limited to the <code>{{ args.size }}</code> breakpoint width and centered in the viewport.</Text>
      </Container>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Container },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem">
        <Container v-for="size in ['sm', 'md', 'lg', 'xl', '2xl', 'full']" :key="size" :size="size" style="background: var(--mild-color-primary-100); padding-top: .5rem; padding-bottom: .5rem">
          {{ size }}
        </Container>
      </div>
    `,
  }),
};

export const CenteredContent: Story = {
  args: { size: "md", centerContent: true },
  render: Default.render,
};
