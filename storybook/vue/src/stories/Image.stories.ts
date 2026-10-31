import type { Meta, StoryObj } from "@storybook/vue3";
import { Image } from "@mild-ui/vue";

const meta: Meta<typeof Image> = {
  title: "Data Display/Image",
  component: Image,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`<img>` that loads lazily by default and degrades gracefully: on error it swaps to `fallbackSrc`, or renders the `fallback` slot (a placeholder glyph by default). With `ratio` it fills a fixed-ratio frame.",
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
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Default: Story = {
  render: (args) => ({
    components: { Image },
    setup: () => ({ args }),
    template: '<div class="w-80"><Image v-bind="args" /></div>',
  }),
};

export const Fallbacks: Story = {
  render: () => ({
    components: { Image },
    template: `
      <div class="flex gap-4">
        <div class="w-40"><Image src="https://broken.example/x.jpg" fallback-src="https://picsum.photos/seed/fallback/320/320" alt="Falls back to another picture" ratio="1/1" radius="md" /></div>
        <div class="w-40"><Image src="https://broken.example/y.jpg" alt="Shows the placeholder" ratio="1/1" radius="md" /></div>
        <div class="w-40"><Image alt="No source" ratio="1/1" radius="full"><template #fallback>?</template></Image></div>
      </div>
    `,
  }),
};
