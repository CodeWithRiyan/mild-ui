import type { Meta, StoryObj } from "@storybook/vue3";
import { Badge, Tag } from "@mild-ui/vue";
import { ref } from "vue";

const meta: Meta<typeof Badge> = {
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Small inline status label (`Badge`, static text) and a removable label (`Tag`, whose close button is a real button named after the label).",
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["subtle", "solid", "outline"] },
    colorScheme: {
      control: "select",
      options: ["gray", "primary", "success", "warning", "danger", "info"],
    },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    pill: { control: "boolean" },
    dot: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args">New</Badge>',
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <Badge>Gray</Badge>
        <Badge color-scheme="primary">Primary</Badge>
        <Badge variant="solid" color-scheme="success" dot>Live</Badge>
        <Badge variant="outline" color-scheme="warning" pill>Beta</Badge>
        <Badge variant="solid" color-scheme="danger" size="sm">3</Badge>
        <Badge color-scheme="info" size="lg">Info</Badge>
      </div>
    `,
  }),
};

export const Tags: Story = {
  name: "Tag",
  render: () => ({
    components: { Tag },
    setup() {
      const tags = ref(["Design", "Engineering", "Research"]);
      const remove = (tag: string) => (tags.value = tags.value.filter((t) => t !== tag));
      return { tags, remove };
    },
    template: `
      <div class="flex flex-wrap gap-2">
        <Tag v-for="tag in tags" :key="tag" closable color-scheme="primary" @close="remove(tag)">{{ tag }}</Tag>
        <Tag variant="solid" pill>Static</Tag>
        <Tag closable disabled>Disabled</Tag>
      </div>
    `,
  }),
};
