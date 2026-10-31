import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FormField, Textarea } from "@mild-ui/react";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Multi-line text field with the same variants, sizes and states as `Input`. `autoResize` grows the field with its content instead of scrolling.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "flushed", "unstyled"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    resize: { control: "select", options: ["none", "vertical", "horizontal", "both"] },
    autoResize: { control: "boolean" },
    rows: { control: "number" },
    placeholder: { control: "text" },
    isInvalid: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isReadOnly: { control: "boolean" },
    isRequired: { control: "boolean" },
    onChange: { action: "change" },
  },
  args: { placeholder: "Your message", "aria-label": "Message" },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
} satisfies Story;

function AutoResizeDemo() {
  const [text, setText] = useState("Type a few lines...\nand watch the field grow.");
  return (
    <div className="w-80">
      <Textarea
        aria-label="Notes"
        value={text}
        onChange={(event) => setText(event.target.value)}
        autoResize
      />
    </div>
  );
}

export const AutoResize = {
  render: () => <AutoResizeDemo />,
} satisfies Story;

export const InAField = {
  render: () => (
    <div className="w-80">
      <FormField
        name="bio"
        label="Bio"
        description="A few words about you"
        error="Too short"
        required
      >
        <Textarea rows={4} />
      </FormField>
    </div>
  ),
} satisfies Story;
