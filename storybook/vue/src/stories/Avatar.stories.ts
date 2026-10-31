import type { Meta, StoryObj } from "@storybook/vue3";
import { Avatar, AvatarGroup } from "@mild-ui/vue";

const meta: Meta<typeof Avatar> = {
  title: "Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'A person\'s picture, or their initials while it loads / when it fails. `AvatarGroup` overlaps avatars and replaces those beyond `max` with a "+N" avatar.',
      },
    },
  },
  argTypes: {
    src: { control: "text" },
    name: { control: "text" },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
    shape: { control: "radio", options: ["circle", "square"] },
    status: { control: "select", options: [undefined, "online", "offline", "busy", "away"] },
    bordered: { control: "boolean" },
  },
  args: { name: "Ada Lovelace" },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: (args) => ({
    components: { Avatar },
    setup: () => ({ args }),
    template: '<Avatar v-bind="args" />',
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar name="Ada Lovelace" size="sm" />
        <Avatar name="Grace Hopper" status="online" />
        <Avatar src="https://i.pravatar.cc/96?img=5" name="Alan Turing" size="lg" status="busy" />
        <Avatar src="broken.png" name="Edsger Dijkstra" size="xl" shape="square" bordered />
        <Avatar size="2xl" />
      </div>
    `,
  }),
};

export const Group: Story = {
  name: "AvatarGroup",
  render: () => ({
    components: { Avatar, AvatarGroup },
    template: `
      <AvatarGroup :max="3" size="md" aria-label="Assignees">
        <Avatar name="Ada Lovelace" />
        <Avatar name="Grace Hopper" />
        <Avatar name="Alan Turing" />
        <Avatar name="Edsger Dijkstra" />
        <Avatar name="Barbara Liskov" />
      </AvatarGroup>
    `,
  }),
};
