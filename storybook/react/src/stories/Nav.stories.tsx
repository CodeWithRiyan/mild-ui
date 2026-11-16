import type { Meta, StoryObj } from "@storybook/react";
import { Nav, NavItem, NavLink } from "@mild-ui/react";

const MOBILE_WIDTH = "375px";

const meta = {
  title: "Navigation/Nav",
  component: Nav,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Site or section navigation (`nav > ul > li > a`). Only the `active` link gets `aria-current="page"`. A `disabled` item renders as text (`aria-disabled="true"`), `asChild` lets a router link take over the element. Links stay in the normal Tab order: this is not a tablist, so there is no roving tabindex or arrow-key handling.',
      },
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["pills", "underline", "plain"] },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
  args: { "aria-label": "Primary", variant: "plain", orientation: "horizontal" },
  render: (args) => (
    <Nav {...args}>
      <NavItem>
        <NavLink href="#home" active>
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#docs">Docs</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#blog">Blog</NavLink>
      </NavItem>
    </Nav>
  ),
} satisfies Meta<typeof Nav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Plain = {} satisfies Story;

export const Pills = { args: { variant: "pills" } } satisfies Story;

export const Underline = { args: { variant: "underline" } } satisfies Story;

export const Vertical = {
  args: { variant: "pills", orientation: "vertical" },
} satisfies Story;

export const VerticalUnderline = {
  args: { variant: "underline", orientation: "vertical" },
} satisfies Story;

export const WithDisabledItem = {
  args: { variant: "pills" },
  render: (args) => (
    <Nav {...args}>
      <NavItem>
        <NavLink href="#home" active>
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#pricing" disabled>
          Pricing
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#docs">Docs</NavLink>
      </NavItem>
    </Nav>
  ),
} satisfies Story;

export const AsChild = {
  args: { variant: "underline" },
  render: (args) => (
    <Nav {...args}>
      <NavItem>
        <NavLink asChild active>
          <a href="#router-home">Router home</a>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink asChild>
          <a href="#router-docs">Router docs</a>
        </NavLink>
      </NavItem>
    </Nav>
  ),
} satisfies Story;

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
export const OverflowAt375 = {
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
  render: (args) => (
    <div style={{ width: MOBILE_WIDTH, maxWidth: "100%" }}>
      <Nav {...args}>
        {overflowLabels.map((label, index) => (
          <NavItem key={label}>
            <NavLink href={`#${label.toLowerCase()}`} active={index === 0}>
              {label}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </div>
  ),
} satisfies Story;
