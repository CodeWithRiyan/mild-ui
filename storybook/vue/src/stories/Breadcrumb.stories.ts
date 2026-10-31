import type { Meta, StoryObj } from "@storybook/vue3";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@mild-ui/vue";

const items = [
  { label: "Home", href: "#" },
  { label: "Components", href: "#components" },
  { label: "Breadcrumb" },
];

const meta: Meta<typeof Breadcrumb> = {
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
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: (args) => ({
    components: { Breadcrumb },
    setup: () => ({ args }),
    template: '<Breadcrumb v-bind="args" />',
  }),
};

export const CustomSeparator: Story = {
  args: { separator: "›" },
  render: Default.render,
};

export const Composed: Story = {
  render: () => ({
    components: { Breadcrumb, BreadcrumbItem, BreadcrumbLink },
    template: `
      <Breadcrumb aria-label="You are here">
        <template #separator><span aria-hidden="true">→</span></template>
        <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem><BreadcrumbLink href="#settings">Settings</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem><BreadcrumbLink current>Profile</BreadcrumbLink></BreadcrumbItem>
      </Breadcrumb>
    `,
  }),
};
