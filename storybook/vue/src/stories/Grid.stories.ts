import type { Meta, StoryObj } from "@storybook/vue3";
import { Grid, GridItem } from "@mild-ui/vue";

const meta: Meta<typeof Grid> = {
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
};

export default meta;

type Story = StoryObj<typeof Grid>;

const cell = (label: string) =>
  `<div style="padding: var(--mild-space-4); border-radius: var(--mild-radius-md); background: var(--mild-color-primary-500); color: white; text-align: center">${label}</div>`;

export const Default: Story = {
  render: (args) => ({
    components: { Grid },
    setup: () => ({ args }),
    template: `<Grid v-bind="args" style="width: 32rem">${Array.from({ length: 6 }, (_, i) => cell(String(i + 1))).join("")}</Grid>`,
  }),
};

export const Responsive: Story = {
  name: "Responsive columns",
  render: () => ({
    components: { Grid },
    template: `
      <Grid :columns="{ base: 1, sm: 2, lg: 4 }" gap="3" style="width: 40rem">
        ${Array.from({ length: 8 }, (_, i) => cell(String(i + 1))).join("")}
      </Grid>
    `,
  }),
};

export const Spans: Story = {
  name: "GridItem spans",
  render: () => ({
    components: { Grid, GridItem },
    template: `
      <Grid :columns="4" gap="3" style="width: 32rem">
        <GridItem :col-span="4">${cell("Header (span 4)")}</GridItem>
        <GridItem :col-span="{ base: 4, md: 1 }">${cell("Aside")}</GridItem>
        <GridItem :col-span="{ base: 4, md: 3 }" :row-span="2">${cell("Main (row span 2)")}</GridItem>
        <GridItem :col-span="{ base: 4, md: 1 }">${cell("Aside 2")}</GridItem>
        <GridItem col-span="full">${cell("Footer (full)")}</GridItem>
      </Grid>
    `,
  }),
};

export const CustomTemplate: Story = {
  render: () => ({
    components: { Grid },
    template: `
      <Grid template-columns="12rem 1fr" template-rows="auto auto" column-gap="4" row-gap="2" style="width: 32rem">
        ${cell("Sidebar")}${cell("Content")}${cell("Sidebar")}${cell("Content")}
      </Grid>
    `,
  }),
};
