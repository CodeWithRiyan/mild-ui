import type { Meta, StoryObj } from "@storybook/react";
import { Input, Label } from "@mild-ui/react";

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A styled label component based on Radix Label with support for required and error states.",
      },
    },
  },
  argTypes: {
    children: { control: "text" },
    required: { control: "boolean" },
    error: { control: "boolean" },
    ui: { control: "object" },
    className: { control: "text" },
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: "Username",
  },
} satisfies Story;

export const Required = {
  args: {
    children: "Email address",
    required: true,
  },
} satisfies Story;

export const WithError = {
  args: {
    children: "Password",
    error: true,
  },
} satisfies Story;

export const CustomClassName = {
  args: {
    children: "Phone number",
    className: "text-blue-600 font-semibold",
  },
} satisfies Story;

export const CustomUI = {
  args: {
    children: "Email address",
    ui: {
      label: "text-blue-600 font-semibold",
      asterisk: "text-blue-500",
    },
    required: true,
  },
} satisfies Story;

export const WithInput = {
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="email" required>
        Email address
      </Label>
      <Input
        id="email"
        type="email"
        placeholder="you@example.com"
        className="px-3 py-2 border rounded text-sm"
      />
    </div>
  ),
} satisfies Story;

export const WithInputWithError = {
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="email" required error>
        Email address
      </Label>
      <Input
        id="email"
        type="email"
        placeholder="you@example.com"
        className="px-3 py-2 border rounded text-sm"
      />
    </div>
  ),
} satisfies Story;
