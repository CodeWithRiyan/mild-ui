import type { Meta, StoryObj } from "@storybook/vue3";
import { ButtonGroup, CloseButton, IconButton } from "@mild-ui/vue";
import { BoldIcon, ItalicIcon, SearchIcon, UnderlineIcon } from "lucide-vue-next";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A square button that shows one glyph (the default slot). `label` is its accessible name (there is no visible text), applied as `aria-label`; the glyph itself is hidden from assistive technology. `CloseButton` is a ghost IconButton with an X.",
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
    onClick: { action: "click" },
  },
  args: { label: "Search" },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  render: (args) => ({
    components: { IconButton, SearchIcon },
    setup: () => ({ args }),
    template: '<IconButton v-bind="args"><SearchIcon :size="16" /></IconButton>',
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { IconButton, SearchIcon },
    template: `
      <div class="flex items-center gap-3">
        <IconButton label="Search"><SearchIcon :size="16" /></IconButton>
        <IconButton label="Search" variant="outline"><SearchIcon :size="16" /></IconButton>
        <IconButton label="Search" variant="ghost" round><SearchIcon :size="16" /></IconButton>
        <IconButton label="Search" size="sm"><SearchIcon :size="14" /></IconButton>
        <IconButton label="Search" size="lg" loading><SearchIcon :size="20" /></IconButton>
      </div>
    `,
  }),
};

export const Close: Story = {
  name: "CloseButton",
  render: () => ({
    components: { CloseButton },
    template: `
      <div class="flex items-center gap-3">
        <CloseButton />
        <CloseButton size="sm" label="Dismiss notification" />
        <CloseButton variant="outline" round />
      </div>
    `,
  }),
};

export const InAButtonGroup: Story = {
  render: () => ({
    components: { ButtonGroup, IconButton, BoldIcon, ItalicIcon, UnderlineIcon },
    template: `
      <ButtonGroup attached variant="outline" size="sm" aria-label="Formatting">
        <IconButton label="Bold"><BoldIcon :size="14" /></IconButton>
        <IconButton label="Italic"><ItalicIcon :size="14" /></IconButton>
        <IconButton label="Underline"><UnderlineIcon :size="14" /></IconButton>
      </ButtonGroup>
    `,
  }),
};
