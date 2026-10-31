import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toggle, ToggleGroup, ToggleGroupItem } from "@mild-ui/react";
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "lucide-react";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'A two-state button (`aria-pressed`). Controlled through `pressed` / `onPressedChange`, or uncontrolled with `defaultPressed`. `ToggleGroup` presses one (`type="single"`) or many (`type="multiple"`) `ToggleGroupItem`s with one tab stop and Arrow/Home/End keys, driven by `@mild-ui/primitives/toggle-group`. Patterns: [WAI-ARIA APG button (toggle)](https://www.w3.org/WAI/ARIA/apg/patterns/button/) and [toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) for the group\'s roving focus; keyboard tests: `packages/react/src/components/Toggle/Toggle.test.tsx` and `ToggleGroup/ToggleGroup.test.tsx`.',
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["ghost", "outline"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    defaultPressed: { control: "boolean" },
    onPressedChange: { action: "pressedChange" },
  },
  args: { "aria-label": "Bold", children: <Bold size={16} /> },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

function ControlledDemo() {
  const [italic, setItalic] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <Toggle aria-label="Italic" pressed={italic} onPressedChange={setItalic} variant="outline">
        <Italic size={16} />
      </Toggle>
      <output className="text-sm">{italic ? "on" : "off"}</output>
    </div>
  );
}

export const Controlled = {
  render: () => <ControlledDemo />,
} satisfies Story;

function SingleGroupDemo() {
  const [align, setAlign] = useState<string | null>("left");
  return (
    <div className="flex flex-col gap-3">
      <ToggleGroup
        aria-label="Alignment"
        value={align}
        onValueChange={setAlign}
        attached
        variant="outline"
      >
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
      <output className="text-sm">{align ?? "none"}</output>
    </div>
  );
}

export const GroupSingle = {
  name: "ToggleGroup (single)",
  render: () => <SingleGroupDemo />,
} satisfies Story;

function MultipleGroupDemo() {
  const [format, setFormat] = useState<string[]>(["bold"]);
  return (
    <div className="flex flex-col gap-3">
      <ToggleGroup aria-label="Format" type="multiple" value={format} onValueChange={setFormat}>
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline" disabled>
          <Underline size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
      <output className="text-sm">{format.join(", ") || "none"}</output>
    </div>
  );
}

export const GroupMultiple = {
  name: "ToggleGroup (multiple)",
  render: () => <MultipleGroupDemo />,
} satisfies Story;
