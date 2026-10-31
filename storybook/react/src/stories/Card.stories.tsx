import type { Meta, StoryObj } from "@storybook/react";
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
} from "@mild-ui/react";

const meta = {
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
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Project Apollo</CardTitle>
        <CardDescription>Design system rollout, Q3.</CardDescription>
      </CardHeader>
      <CardBody>
        <Text as="p">12 components shipped, 7 in review.</Text>
      </CardBody>
      <CardFooter align="between">
        <Badge colorScheme="success" dot>
          On track
        </Badge>
        <Button size="sm">Open</Button>
      </CardFooter>
    </Card>
  ),
} satisfies Story;

export const WithMedia = {
  render: () => (
    <Card variant="elevated" interactive as="article" className="w-80">
      <CardMedia src="https://picsum.photos/seed/mild/640/360" alt="" />
      <CardHeader>
        <CardTitle as="h2" size="lg">
          Elevated card
        </CardTitle>
        <CardDescription>With a media image on top.</CardDescription>
      </CardHeader>
      <CardBody>Hover to see the interactive affordance.</CardBody>
    </Card>
  ),
} satisfies Story;
