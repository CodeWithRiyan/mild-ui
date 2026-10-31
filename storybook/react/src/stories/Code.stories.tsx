import type { Meta, StoryObj } from "@storybook/react";
import { Code, Text } from "@mild-ui/react";

const meta = {
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
  args: { children: "npm install @mild-ui/react" },
} satisfies Meta<typeof Code>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Variants = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Text>
        Run <Code>pnpm install</Code>, <Code variant="solid">pnpm build</Code> or{" "}
        <Code variant="outline">pnpm test</Code>.
      </Text>
      <Text>
        Sizes: <Code size="sm">sm</Code> <Code>md</Code> <Code size="lg">lg</Code>
      </Text>
      <Code as="pre" block>
        {'import { Button } from "@mild-ui/react";\n\nexport default () => <Button>Go</Button>;'}
      </Code>
    </div>
  ),
} satisfies Story;
