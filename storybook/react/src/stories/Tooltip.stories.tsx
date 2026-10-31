import type { Meta, StoryObj } from "@storybook/react";
import { Button, IconButton, Tooltip } from "@mild-ui/react";
import { Search } from "lucide-react";

const meta = {
  title: "Overlay/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Describes its child with a small bubble (`role="tooltip"`, linked through `aria-describedby`). Shows on hover after a delay and on keyboard focus at once; hides on leave, blur or Escape. Behaviour from `@mild-ui/primitives/tooltip`, per the [WAI-ARIA APG tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/); keyboard tests: `packages/react/src/components/Tooltip/Tooltip.test.tsx`.',
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    placement: { control: "select", options: ["top", "bottom", "left", "right"] },
    openDelay: { control: "number" },
    closeDelay: { control: "number" },
    multiline: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: false },
  },
  args: { label: "Save your changes", children: <Button>Save</Button> },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Placements = {
  render: () => (
    <div className="flex items-center gap-6 p-12">
      <Tooltip label="Top" placement="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip label="Bottom" placement="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip label="Left" placement="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
      <Tooltip label="Right" placement="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
      <Tooltip label="Search the docs" multiline>
        <IconButton label="Search" variant="ghost" icon={<Search size={16} />} />
      </Tooltip>
    </div>
  ),
} satisfies Story;
