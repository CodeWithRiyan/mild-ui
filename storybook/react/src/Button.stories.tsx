import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test"; // Import fn from @storybook/test
import { Button } from "@mild-ui/react";
import { Plus, ArrowRight } from "lucide-react";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/Button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost"],
      description:
        "Defines the visual style of the button. Choose from primary, secondary, outline, or ghost.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
      description:
        "Controls the size of the button. Options include small, medium, and large.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "medium" },
      },
    },
    disabled: {
      control: "boolean",
      description:
        "Disables the button if set to true. The button becomes non-interactive.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onClick: {
      action: "clicked",
      description: "Function to call when the button is clicked.",
      table: {
        type: { summary: "() => void" },
      },
    },
    children: {
      description: "The content inside the button, usually text or icons.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    leadingIcon: {
      description: "An optional icon displayed before the button text.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    trailingIcon: {
      description: "An optional icon displayed after the button text.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "medium",
    children: "Button Text",
  },
};

export const WithIcons: Story = {
  args: {
    variant: "primary",
    size: "medium",
    children: "Button with Icons",
  },
  render: (args) => (
    <Button
      {...args}
      leadingIcon={<Plus size={16} />}
      trailingIcon={<ArrowRight size={16} />}
    />
  ),
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "medium",
    children: "Disabled Button",
    disabled: true,
  },
};

export const Sizes: Story = {
  argTypes: {
    disabled: { control: false },
  },
  render: (args, { viewMode }) => (
    <div className="flex gap-4 items-center">
      <Button {...args} size="small" disabled={viewMode !== 'docs' && args.size !== "small"}>
        Small
      </Button>
      <Button {...args} size="medium" disabled={viewMode !== 'docs' && args.size !== "medium"}>
        Medium
      </Button>
      <Button {...args} size="large" disabled={viewMode !== 'docs' && args.size !== "large"}>
        Large
      </Button>
    </div>
  ),
};

export const Variants: Story = {
  argTypes: {
    variant: { control: false },
  },
  render: (args) => (
    <div className="flex gap-4 items-center">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </div>
  ),
};
