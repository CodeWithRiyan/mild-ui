import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "@mild-ui/react";

const meta = {
  title: "Data Display/Image",
  component: Image,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`<img>` that loads lazily by default and degrades gracefully: on error it swaps to `fallbackSrc`, or renders `fallback` (a placeholder glyph by default). With `ratio` it fills a fixed-ratio frame.",
      },
    },
  },
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    fallbackSrc: { control: "text" },
    lazy: { control: "boolean" },
    fit: {
      control: "select",
      options: [undefined, "cover", "contain", "fill", "none", "scale-down"],
    },
    ratio: { control: "text" },
    radius: { control: "select", options: [undefined, "none", "sm", "md", "lg", "xl", "full"] },
    showFallbackWhileLoading: { control: "boolean" },
  },
  args: {
    src: "https://picsum.photos/seed/mild-ui/640/360",
    alt: "A landscape",
    ratio: "16/9",
    radius: "lg",
  },
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: (args) => (
    <div className="w-80">
      <Image {...args} />
    </div>
  ),
} satisfies Story;

export const Fallbacks = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-40">
        <Image
          src="https://broken.example/x.jpg"
          fallbackSrc="https://picsum.photos/seed/fallback/320/320"
          alt="Falls back to another picture"
          ratio="1/1"
          radius="md"
        />
      </div>
      <div className="w-40">
        <Image
          src="https://broken.example/y.jpg"
          alt="Shows the placeholder"
          ratio="1/1"
          radius="md"
        />
      </div>
      <div className="w-40">
        <Image alt="No source" ratio="1/1" radius="full" fallback="?" />
      </div>
    </div>
  ),
} satisfies Story;
