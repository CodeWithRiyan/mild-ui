import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup, CloseButton, IconButton } from "@mild-ui/react";
import { Bold, Italic, Search, Underline } from "lucide-react";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A square button that shows one glyph (`icon`). `label` is its accessible name (there is no visible text), applied as `aria-label`; the glyph itself is hidden from assistive technology. `CloseButton` is a ghost IconButton with an X.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "link", "destructive"],
    },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    round: { control: "boolean" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    icon: { control: false },
    onClick: { action: "click" },
  },
  args: { label: "Search", icon: <Search size={16} /> },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Variants = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton label="Search" icon={<Search size={16} />} />
      <IconButton label="Search" variant="outline" icon={<Search size={16} />} />
      <IconButton label="Search" variant="ghost" round icon={<Search size={16} />} />
      <IconButton label="Search" size="sm" icon={<Search size={14} />} />
      <IconButton label="Search" size="lg" loading icon={<Search size={20} />} />
    </div>
  ),
} satisfies Story;

export const Close = {
  name: "CloseButton",
  render: () => (
    <div className="flex items-center gap-3">
      <CloseButton />
      <CloseButton size="sm" label="Dismiss notification" />
      <CloseButton variant="outline" round />
    </div>
  ),
} satisfies Story;

export const InAButtonGroup = {
  render: () => (
    <ButtonGroup attached variant="outline" size="sm" aria-label="Formatting">
      <IconButton label="Bold" icon={<Bold size={14} />} />
      <IconButton label="Italic" icon={<Italic size={14} />} />
      <IconButton label="Underline" icon={<Underline size={14} />} />
    </ButtonGroup>
  ),
} satisfies Story;
