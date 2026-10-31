import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SegmentedControl } from "@mild-ui/react";

const items = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year", disabled: true },
];

const meta = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Single-choice control drawn as one bar of segments. It is a radio group driven by `@mild-ui/primitives/radio-group`: one tab stop, Arrow keys move and select, Space selects, per the [WAI-ARIA APG radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/). Controlled through `value` / `onValueChange`. Keyboard tests: `packages/react/src/components/SegmentedControl/SegmentedControl.test.tsx`.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    name: { control: "text" },
    onValueChange: { action: "valueChange" },
  },
  args: { items, defaultValue: "week", "aria-label": "Range" },
} satisfies Meta<typeof SegmentedControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

function ControlledDemo() {
  const [range, setRange] = useState("day");
  return (
    <div className="flex flex-col gap-3">
      <SegmentedControl
        aria-label="Range"
        value={range}
        onValueChange={setRange}
        items={items}
        fullWidth
      />
      <output className="text-sm">Selected: {range}</output>
    </div>
  );
}

export const Controlled = {
  render: () => <ControlledDemo />,
} satisfies Story;

export const Vertical = {
  args: { orientation: "vertical", size: "sm" },
} satisfies Story;
