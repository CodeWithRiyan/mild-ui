import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger, Text } from "@mild-ui/react";

const meta = {
  title: "Disclosure/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tabs with one tab stop and Arrow/Home/End keys, automatic (default) or manual activation, driven by `@mild-ui/primitives/tabs`. Compose `TabsList` > `TabsTrigger` and `TabsContent`; controlled through `value` / `onValueChange`. Follows the [WAI-ARIA APG tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/); keyboard tests: `packages/react/src/components/Tabs/Tabs.test.tsx`.",
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["default", "pills", "underline"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    activation: { control: "radio", options: ["automatic", "manual"] },
  },
  args: { defaultValue: "account" },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: (args) => (
    <Tabs {...args} className="w-96">
      <TabsList aria-label="Settings">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Text as="p">Manage your account details.</Text>
      </TabsContent>
      <TabsContent value="password">
        <Text as="p">Change your password.</Text>
      </TabsContent>
      <TabsContent value="billing">
        <Text as="p">Billing is disabled.</Text>
      </TabsContent>
    </Tabs>
  ),
} satisfies Story;

function ControlledDemo() {
  const [tab, setTab] = useState("one");
  return (
    <div className="flex flex-col gap-3 w-96">
      <Tabs value={tab} onValueChange={setTab} variant="pills" activation="manual">
        <TabsList aria-label="Manual">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Arrow keys move focus; Enter or Space selects.</TabsContent>
        <TabsContent value="two">Second panel.</TabsContent>
      </Tabs>
      <output className="text-sm">Selected: {tab}</output>
    </div>
  );
}

export const Controlled = {
  render: () => <ControlledDemo />,
} satisfies Story;

export const Vertical = {
  args: { orientation: "vertical", variant: "underline", defaultValue: "account" },
  render: Default.render,
} satisfies Story;
