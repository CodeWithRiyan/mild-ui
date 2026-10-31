import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Badge, Tag } from "@mild-ui/react";

const meta = {
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
  args: { children: "New" },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Variants = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Gray</Badge>
      <Badge colorScheme="primary">Primary</Badge>
      <Badge variant="solid" colorScheme="success" dot>
        Live
      </Badge>
      <Badge variant="outline" colorScheme="warning" pill>
        Beta
      </Badge>
      <Badge variant="solid" colorScheme="danger" size="sm">
        3
      </Badge>
      <Badge colorScheme="info" size="lg">
        Info
      </Badge>
    </div>
  ),
} satisfies Story;

function TagsDemo() {
  const [tags, setTags] = useState(["Design", "Engineering", "Research"]);
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag
          key={tag}
          colorScheme="primary"
          onClose={() => setTags((current) => current.filter((t) => t !== tag))}
        >
          {tag}
        </Tag>
      ))}
      <Tag variant="solid" pill>
        Static
      </Tag>
      <Tag onClose={() => undefined} disabled>
        Disabled
      </Tag>
    </div>
  );
}

export const Tags = {
  name: "Tag",
  render: () => <TagsDemo />,
} satisfies Story;
