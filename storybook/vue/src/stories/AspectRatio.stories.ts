import type { Meta, StoryObj } from "@storybook/vue3";
import { AspectRatio } from "@mild-ui/vue";

const meta: Meta<typeof AspectRatio> = {
  title: "Layout/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Keeps its child at a fixed width/height ratio (`:ratio="16 / 9"` or `ratio="16/9"`); the child fills the box. Renders a `div`, or the element given with `as`.',
      },
    },
  },
  argTypes: {
    as: { control: "text" },
    ratio: { control: "text" },
  },
  args: { ratio: "16/9" },
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  render: (args) => ({
    components: { AspectRatio },
    setup: () => ({ args }),
    template: `
      <div style="width: 20rem">
        <AspectRatio v-bind="args">
          <div style="display: grid; place-items: center; background: var(--mild-color-primary-500); color: white; border-radius: var(--mild-radius-md)">{{ args.ratio }}</div>
        </AspectRatio>
      </div>
    `,
  }),
};

export const Ratios: Story = {
  render: () => ({
    components: { AspectRatio },
    template: `
      <div style="display: flex; gap: 1rem; align-items: flex-start">
        <div v-for="ratio in ['1/1', '4/3', '16/9', '21/9']" :key="ratio" style="width: 10rem">
          <AspectRatio :ratio="ratio">
            <div style="display: grid; place-items: center; background: var(--mild-color-gray-200); border-radius: var(--mild-radius-md)">{{ ratio }}</div>
          </AspectRatio>
        </div>
      </div>
    `,
  }),
};
