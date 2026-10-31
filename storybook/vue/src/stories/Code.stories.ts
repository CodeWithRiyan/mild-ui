import type { Meta, StoryObj } from "@storybook/vue3";
import { Code, Text } from "@mild-ui/vue";

const meta: Meta<typeof Code> = {
  title: "Typography/Code",
  component: Code,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Inline code. `block` keeps the whitespace and scrolls horizontally instead; pair it with `as="pre"` for a real code block.',
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["subtle", "solid", "outline"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    block: { control: "boolean" },
    as: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Code>;

export const Default: Story = {
  render: (args) => ({
    components: { Code },
    setup: () => ({ args }),
    template: '<Code v-bind="args">npm install @mild-ui/vue</Code>',
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Code, Text },
    template: `
      <div class="flex flex-col gap-3">
        <Text>Run <Code>pnpm install</Code>, <Code variant="solid">pnpm build</Code> or <Code variant="outline">pnpm test</Code>.</Text>
        <Text>Sizes: <Code size="sm">sm</Code> <Code>md</Code> <Code size="lg">lg</Code></Text>
        <Code as="pre" block>import { Button } from "@mild-ui/vue";

export default { components: { Button } };</Code>
      </div>
    `,
  }),
};
