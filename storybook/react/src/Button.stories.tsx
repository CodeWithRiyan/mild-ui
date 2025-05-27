// storybook/react/stories/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@mild-ui/react";
import { Plus, ArrowRight, Download, Trash2 } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component that supports multiple variants, sizes, and icon combinations.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost"],
      description: "The visual style variant of the button",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    asChild: {
      control: "boolean",
      description: "Render as a child element (using Radix Slot)",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different visual styles for various use cases.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Three available sizes to fit different design needs.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4 flex-col items-start">
      <div className="flex gap-4 flex-wrap">
        <Button leadingIcon={<Plus size={16} />}>Add Item</Button>
        <Button trailingIcon={<ArrowRight size={16} />}>Continue</Button>
        <Button
          leadingIcon={<Download size={16} />}
          trailingIcon={<ArrowRight size={16} />}
        >
          Download & Continue
        </Button>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Button variant="outline" leadingIcon={<Plus size={16} />}>
          Add
        </Button>
        <Button variant="ghost" leadingIcon={<Trash2 size={16} />}>
          Delete
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Buttons can include leading and trailing icons for better visual communication.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="flex gap-4 flex-col items-start">
      <div className="flex gap-4 flex-wrap">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Button variant="outline">Default Outline</Button>
        <Button variant="outline" disabled>
          Disabled Outline
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different button states including disabled state.",
      },
    },
  },
};

export const AsChild: Story = {
  render: () => (
    <Button asChild>
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        Link Button
      </a>
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Using asChild prop to render the button as a different element (like a link).",
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    children: "Click me!",
    onClick: () => alert("Button clicked!"),
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive button that responds to clicks.",
      },
    },
  },
};
