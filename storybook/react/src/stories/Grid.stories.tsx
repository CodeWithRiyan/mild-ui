import type { Meta, StoryObj } from "@storybook/react";
import { Grid, GridItem } from "@mild-ui/react";

const meta = {
  title: "Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "CSS grid with 1-12 equal columns (`columns`, per breakpoint if needed) or a custom template. Place children with `GridItem` to span columns or rows.",
      },
    },
  },
  argTypes: {
    columns: { control: "number", min: 1, max: 12 },
    rows: { control: "number", min: 1, max: 6 },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "6", "8"] },
    flow: { control: "select", options: ["row", "column", "dense", "row-dense", "column-dense"] },
    align: { control: "select", options: ["start", "end", "center", "stretch"] },
    justify: { control: "select", options: ["start", "end", "center", "stretch"] },
    inline: { control: "boolean" },
  },
  args: { columns: 3, gap: "4" },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

const cell = (label: string) => (
  <div
    key={label}
    style={{
      padding: "var(--mild-space-4)",
      borderRadius: "var(--mild-radius-md)",
      background: "var(--mild-color-primary-500)",
      color: "white",
      textAlign: "center",
    }}
  >
    {label}
  </div>
);

export const Default = {
  render: (args) => (
    <Grid {...args} style={{ width: "32rem" }}>
      {Array.from({ length: 6 }, (_, i) => cell(String(i + 1)))}
    </Grid>
  ),
} satisfies Story;

export const Responsive = {
  name: "Responsive columns",
  render: () => (
    <Grid columns={{ base: 1, sm: 2, lg: 4 }} gap="3" style={{ width: "40rem" }}>
      {Array.from({ length: 8 }, (_, i) => cell(String(i + 1)))}
    </Grid>
  ),
} satisfies Story;

export const Spans = {
  name: "GridItem spans",
  render: () => (
    <Grid columns={4} gap="3" style={{ width: "32rem" }}>
      <GridItem colSpan={4}>{cell("Header (span 4)")}</GridItem>
      <GridItem colSpan={{ base: 4, md: 1 }}>{cell("Aside")}</GridItem>
      <GridItem colSpan={{ base: 4, md: 3 }} rowSpan={2}>
        {cell("Main (row span 2)")}
      </GridItem>
      <GridItem colSpan={{ base: 4, md: 1 }}>{cell("Aside 2")}</GridItem>
      <GridItem colSpan="full">{cell("Footer (full)")}</GridItem>
    </Grid>
  ),
} satisfies Story;

export const CustomTemplate = {
  render: () => (
    <Grid
      templateColumns="12rem 1fr"
      templateRows="auto auto"
      columnGap="4"
      rowGap="2"
      style={{ width: "32rem" }}
    >
      {cell("Sidebar")}
      {cell("Content")}
      {cell("Sidebar 2")}
      {cell("Content 2")}
    </Grid>
  ),
} satisfies Story;
