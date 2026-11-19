import type { Meta, StoryObj } from "@storybook/vue3";
import { Nav, NavItem, NavLink } from "@mild-ui/vue";

const MOBILE_WIDTH = "375px";

const meta: Meta<typeof Nav> = {
  title: "Navigation/Nav",
  component: Nav,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Site or section navigation (`nav > ul > li > a`). Only the `active` link gets `aria-current="page"`. A `disabled` item renders as text (`aria-disabled="true"`), and `as` lets a router link take over the element. Links stay in the normal Tab order: this is not a tablist, so there is no roving tabindex or arrow-key handling.',
      },
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["pills", "underline", "plain"] },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
  args: { "aria-label": "Primary", variant: "plain", orientation: "horizontal" } as never,
};

export default meta;

type Story = StoryObj<typeof Nav>;

const Default: Story = {
  render: (args) => ({
    components: { Nav, NavItem, NavLink },
    setup: () => ({ args }),
    template: `
      <Nav v-bind="args">
        <NavItem><NavLink href="#home" active>Home</NavLink></NavItem>
        <NavItem><NavLink href="#docs">Docs</NavLink></NavItem>
        <NavItem><NavLink href="#blog">Blog</NavLink></NavItem>
      </Nav>
    `,
  }),
};

export const Plain: Story = Default;

export const Pills: Story = { ...Default, args: { variant: "pills" } };

export const Underline: Story = { ...Default, args: { variant: "underline" } };

export const Vertical: Story = {
  ...Default,
  args: { variant: "pills", orientation: "vertical" },
};

export const VerticalUnderline: Story = {
  ...Default,
  args: { variant: "underline", orientation: "vertical" },
};

export const WithDisabledItem: Story = {
  args: { variant: "pills" },
  render: (args) => ({
    components: { Nav, NavItem, NavLink },
    setup: () => ({ args }),
    template: `
      <Nav v-bind="args">
        <NavItem><NavLink href="#home" active>Home</NavLink></NavItem>
        <NavItem><NavLink href="#pricing" disabled>Pricing</NavLink></NavItem>
        <NavItem><NavLink href="#docs">Docs</NavLink></NavItem>
      </Nav>
    `,
  }),
};

export const AsChild: Story = {
  args: { variant: "underline" },
  render: (args) => ({
    components: { Nav, NavItem, NavLink },
    setup: () => ({ args }),
    // `as` takes any component, e.g. RouterLink / NuxtLink; a plain element keeps the story router-free.
    template: `
      <Nav v-bind="args">
        <NavItem><NavLink as="a" href="#router-home" active>Router home</NavLink></NavItem>
        <NavItem><NavLink as="a" href="#router-docs">Router docs</NavLink></NavItem>
      </Nav>
    `,
  }),
};

const overflowLabels = [
  "Overview",
  "Components",
  "Tokens",
  "Theming",
  "Accessibility",
  "Changelog",
  "Migration",
];

/** At a 375px viewport the horizontal nav scrolls sideways instead of wrapping. */
export const OverflowAt375: Story = {
  args: { variant: "underline" },
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewports: {
        mobile375: { name: "Mobile 375px", styles: { width: MOBILE_WIDTH, height: "667px" } },
      },
      defaultViewport: "mobile375",
    },
  },
  render: (args) => ({
    components: { Nav, NavItem, NavLink },
    setup: () => ({ args, overflowLabels, width: MOBILE_WIDTH }),
    template: `
      <div :style="{ width, maxWidth: '100%' }">
        <Nav v-bind="args">
          <NavItem v-for="(label, index) in overflowLabels" :key="label">
            <NavLink :href="'#' + label.toLowerCase()" :active="index === 0">{{ label }}</NavLink>
          </NavItem>
        </Nav>
      </div>
    `,
  }),
};
