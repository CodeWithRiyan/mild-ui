import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Skeleton, SkeletonText, Stack, Text } from "@mild-ui/react";

const meta = {
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
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

function CardPlaceholderDemo() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-80" aria-busy={!loaded}>
      <Stack direction="row" gap="3" align="center">
        <Skeleton variant="circle" width="12" height="12" loaded={loaded}>
          <div
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "999px",
              background: "var(--mild-color-primary-500)",
            }}
          />
        </Skeleton>
        <Stack gap="2" style={{ flex: 1 }}>
          <SkeletonText lines={2} animation="wave" loaded={loaded}>
            <Text as="p">
              <strong>Ada Lovelace</strong>
            </Text>
            <Text as="p" color="muted">
              Loaded after 2.5 seconds.
            </Text>
          </SkeletonText>
        </Stack>
      </Stack>
    </div>
  );
}

export const CardPlaceholder = {
  render: () => <CardPlaceholderDemo />,
} satisfies Story;
