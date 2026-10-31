import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "@mild-ui/react";

const meta = {
  title: "Layout/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Keeps its child at a fixed width/height ratio (`ratio={16 / 9}` or `ratio="16/9"`); the child fills the box. Renders a `div`, or the element given with `as`.',
      },
    },
  },
  argTypes: {
    as: { control: "text" },
    ratio: { control: "text" },
  },
  args: { ratio: "16/9" },
} satisfies Meta<typeof AspectRatio>;

export default meta;

type Story = StoryObj<typeof meta>;

const fill = (label: string, background = "var(--mild-color-primary-500)", color = "white") => (
  <div
    style={{
      display: "grid",
      placeItems: "center",
      background,
      color,
      borderRadius: "var(--mild-radius-md)",
    }}
  >
    {label}
  </div>
);

export const Default = {
  render: (args) => (
    <div style={{ width: "20rem" }}>
      <AspectRatio {...args}>{fill(String(args.ratio))}</AspectRatio>
    </div>
  ),
} satisfies Story;

export const Ratios = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      {(["1/1", "4/3", "16/9", "21/9"] as const).map((ratio) => (
        <div key={ratio} style={{ width: "10rem" }}>
          <AspectRatio ratio={ratio}>
            {fill(ratio, "var(--mild-color-gray-200)", "inherit")}
          </AspectRatio>
        </div>
      ))}
    </div>
  ),
} satisfies Story;
