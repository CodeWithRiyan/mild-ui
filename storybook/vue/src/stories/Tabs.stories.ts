import type { Meta, StoryObj } from "@storybook/vue3";
import { Tabs, TabsContent, TabsList, TabsTrigger, Text } from "@mild-ui/vue";
import { ref } from "vue";

const meta: Meta<typeof Tabs> = {
  title: "Disclosure/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tabs with one tab stop and Arrow/Home/End keys, automatic (default) or manual activation, driven by `@mild-ui/primitives/tabs`. Compose `TabsList` > `TabsTrigger` and `TabsContent`; supports `v-model`. Follows the [WAI-ARIA APG tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/); keyboard tests: `packages/vue/src/components/Tabs/Tabs.test.ts`.",
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
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent, Text },
    setup: () => ({ args }),
    template: `
      <Tabs v-bind="args" class="w-96">
        <TabsList aria-label="Settings">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="billing" disabled>Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="account"><Text as="p">Manage your account details.</Text></TabsContent>
        <TabsContent value="password"><Text as="p">Change your password.</Text></TabsContent>
        <TabsContent value="billing"><Text as="p">Billing is disabled.</Text></TabsContent>
      </Tabs>
    `,
  }),
};

export const Controlled: Story = {
  render: () => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent, Text },
    setup() {
      const tab = ref("one");
      return { tab };
    },
    template: `
      <div class="flex flex-col gap-3 w-96">
        <Tabs v-model="tab" variant="pills" activation="manual">
          <TabsList aria-label="Manual">
            <TabsTrigger value="one">One</TabsTrigger>
            <TabsTrigger value="two">Two</TabsTrigger>
          </TabsList>
          <TabsContent value="one">Arrow keys move focus; Enter or Space selects.</TabsContent>
          <TabsContent value="two">Second panel.</TabsContent>
        </Tabs>
        <output class="text-sm">Selected: {{ tab }}</output>
      </div>
    `,
  }),
};

export const Vertical: Story = {
  args: { orientation: "vertical", variant: "underline", defaultValue: "account" },
  render: Default.render,
};
