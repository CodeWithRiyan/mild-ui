import type { Meta, StoryObj } from "@storybook/vue3";
import { Heading } from "@mild-ui/vue";

const meta: Meta<typeof Heading> = {
  title: "Typography/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Section heading. `level` picks both the element (`h1`..`h6`) and the default size, so the document outline and the visual size can be chosen independently (`:level="1" size="xl"`, or `as="div"` for a heading-looking label).',
      },
    },
  },
  argTypes: {
    level: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    size: {
      control: "select",
      options: [undefined, "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
    },
    weight: { control: "select", options: ["normal", "medium", "semibold", "bold", "extrabold"] },
    align: { control: "select", options: [undefined, "left", "center", "right"] },
    color: {
      control: "select",
      options: [undefined, "primary", "secondary", "success", "warning", "danger", "muted"],
    },
    truncate: { control: "boolean" },
    as: { control: "text" },
  },
  args: { level: 2 },
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  render: (args) => ({
    components: { Heading },
    setup: () => ({ args }),
    template: '<Heading v-bind="args">The quick brown fox</Heading>',
  }),
};

export const Levels: Story = {
  render: () => ({
    components: { Heading },
    template: `
      <div class="flex flex-col gap-2">
        <Heading v-for="level in [1, 2, 3, 4, 5, 6]" :key="level" :level="level">Heading level {{ level }}</Heading>
      </div>
    `,
  }),
};

export const SizeIndependentOfLevel: Story = {
  render: () => ({
    components: { Heading },
    template: `
      <div class="flex flex-col gap-2">
        <Heading :level="1" size="lg">An h1 that looks small</Heading>
        <Heading :level="4" size="3xl" color="primary">An h4 that looks large</Heading>
        <Heading as="div" :level="3">Not a heading in the outline</Heading>
      </div>
    `,
  }),
};
