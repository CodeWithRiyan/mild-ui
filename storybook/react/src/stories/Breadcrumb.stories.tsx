import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@mild-ui/react";

const items = [
  { label: "Home", href: "#" },
  { label: "Components", href: "#components" },
  { label: "Breadcrumb" },
];

const meta = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Trail of links to the current page (`nav > ol`), with decorative separators inserted between the steps. Pass `items` for the common case, or compose `BreadcrumbItem` / `BreadcrumbLink` children yourself. The last item without an `href` is the current page (`aria-current="page"`), per the [WAI-ARIA APG breadcrumb pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/).',
      },
    },
  },
  argTypes: {
    separator: { control: "text" },
    as: { control: "text" },
  },
  args: { items, separator: "/" },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const CustomSeparator = {
  args: { separator: "›" },
} satisfies Story;

export const Composed = {
  render: () => (
    <Breadcrumb aria-label="You are here" separator={<span aria-hidden="true">→</span>}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#settings">Settings</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink current>Profile</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
} satisfies Story;
