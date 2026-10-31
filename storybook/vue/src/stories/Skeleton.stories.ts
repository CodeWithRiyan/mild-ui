import type { Meta, StoryObj } from "@storybook/vue3";
import { Skeleton, SkeletonText, Stack, Text } from "@mild-ui/vue";
import { ref } from "vue";

const meta: Meta<typeof Skeleton> = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Placeholder shape shown while content loads (hidden from assistive technology; mark the region `aria-busy`). Renders its children once `loaded`. `SkeletonText` is a paragraph placeholder.",
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["text", "circle", "rect"] },
    animation: { control: "radio", options: ["pulse", "wave", "none"] },
    width: { control: "text" },
    height: { control: "text" },
    loaded: { control: "boolean" },
  },
  args: { width: "48", height: "8" },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: (args) => ({
    components: { Skeleton },
    setup: () => ({ args }),
    template: '<Skeleton v-bind="args" />',
  }),
};

export const CardPlaceholder: Story = {
  render: () => ({
    components: { Skeleton, SkeletonText, Stack, Text },
    setup() {
      const loaded = ref(false);
      setTimeout(() => (loaded.value = true), 2500);
      return { loaded };
    },
    template: `
      <div class="w-80" :aria-busy="!loaded">
        <Stack direction="row" gap="3" align="center">
          <Skeleton variant="circle" width="12" height="12" :loaded="loaded">
            <div style="width: 3rem; height: 3rem; border-radius: 999px; background: var(--mild-color-primary-500)" />
          </Skeleton>
          <Stack gap="2" style="flex: 1">
            <SkeletonText :lines="2" animation="wave" :loaded="loaded">
              <Text as="p"><strong>Ada Lovelace</strong></Text>
              <Text as="p" color="muted">Loaded after 2.5 seconds.</Text>
            </SkeletonText>
          </Stack>
        </Stack>
      </div>
    `,
  }),
};
