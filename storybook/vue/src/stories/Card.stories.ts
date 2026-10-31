import type { Meta, StoryObj } from "@storybook/vue3";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
  Text,
} from "@mild-ui/vue";

const meta: Meta<typeof Card> = {
  title: "Data Display/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Surface grouping related content. Compose with `CardHeader` (+ `CardTitle`, `CardDescription`), `CardBody`, `CardFooter` and `CardMedia`. Renders a `div`, or the element given with `as`.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["default", "outlined", "elevated", "filled"] },
    padding: { control: "select", options: ["none", "sm", "md", "lg"] },
    interactive: { control: "boolean" },
    disabled: { control: "boolean" },
    as: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Card,
      CardHeader,
      CardTitle,
      CardDescription,
      CardBody,
      CardFooter,
      Button,
      Badge,
      Text,
    },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args" class="w-80">
        <CardHeader>
          <CardTitle>Project Apollo</CardTitle>
          <CardDescription>Design system rollout, Q3.</CardDescription>
        </CardHeader>
        <CardBody>
          <Text as="p">12 components shipped, 7 in review.</Text>
        </CardBody>
        <CardFooter align="between">
          <Badge color-scheme="success" dot>On track</Badge>
          <Button size="sm">Open</Button>
        </CardFooter>
      </Card>
    `,
  }),
};

export const WithMedia: Story = {
  render: () => ({
    components: { Card, CardMedia, CardHeader, CardTitle, CardDescription, CardBody },
    template: `
      <Card variant="elevated" interactive as="article" class="w-80">
        <CardMedia src="https://picsum.photos/seed/mild/640/360" alt="" />
        <CardHeader>
          <CardTitle as="h2" size="lg">Elevated card</CardTitle>
          <CardDescription>With a media image on top.</CardDescription>
        </CardHeader>
        <CardBody>Hover to see the interactive affordance.</CardBody>
      </Card>
    `,
  }),
};
