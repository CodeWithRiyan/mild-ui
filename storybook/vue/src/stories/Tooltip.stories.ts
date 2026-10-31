import type { Meta, StoryObj } from "@storybook/vue3";
import { Button, IconButton, Tooltip } from "@mild-ui/vue";
import { SearchIcon } from "lucide-vue-next";

const meta: Meta<typeof Tooltip> = {
  title: "Overlay/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Describes its child with a small bubble (`role="tooltip"`, linked through `aria-describedby`). Shows on hover after a delay and on keyboard focus at once; hides on leave, blur or Escape. Behaviour from `@mild-ui/primitives/tooltip`, per the [WAI-ARIA APG tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/); keyboard tests: `packages/vue/src/components/Tooltip/Tooltip.test.ts`.',
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
  },
  args: { label: "Save your changes" },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup: () => ({ args }),
    template: '<Tooltip v-bind="args"><Button>Save</Button></Tooltip>',
  }),
};

export const Placements: Story = {
  render: () => ({
    components: { Tooltip, Button, IconButton, SearchIcon },
    template: `
      <div class="flex items-center gap-6 p-12">
        <Tooltip label="Top" placement="top"><Button variant="outline">Top</Button></Tooltip>
        <Tooltip label="Bottom" placement="bottom"><Button variant="outline">Bottom</Button></Tooltip>
        <Tooltip label="Left" placement="left"><Button variant="outline">Left</Button></Tooltip>
        <Tooltip label="Right" placement="right"><Button variant="outline">Right</Button></Tooltip>
        <Tooltip label="Search the docs" multiline>
          <IconButton label="Search" variant="ghost"><SearchIcon :size="16" /></IconButton>
        </Tooltip>
      </div>
    `,
  }),
};
