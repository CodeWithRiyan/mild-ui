import type { Meta, StoryObj } from "@storybook/vue3";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Text,
} from "@mild-ui/vue";

const meta: Meta<typeof Accordion> = {
  title: "Disclosure/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Accordion driven by `@mild-ui/primitives/accordion`: headings wrapping buttons with `aria-expanded`, Arrow/Home/End between headers, `type="single"` or `"multiple"`, `v-model`. `Collapsible` is a single disclosure. Patterns: [WAI-ARIA APG accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) and [disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/); keyboard tests: `packages/vue/src/components/Accordion/Accordion.test.ts` and `Collapsible/Collapsible.test.ts`.',
      },
    },
  },
  argTypes: {
    type: { control: "radio", options: ["single", "multiple"] },
    variant: { control: "radio", options: ["default", "ghost", "bordered"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    headingLevel: { control: "select", options: [2, 3, 4, 5, 6] },
    collapsible: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { defaultValue: "shipping" },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => ({
    components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Text },
    setup: () => ({ args }),
    template: `
      <Accordion v-bind="args" class="w-96">
        <AccordionItem value="shipping">
          <AccordionTrigger>Shipping</AccordionTrigger>
          <AccordionContent><Text as="p">Ships within 2 business days.</Text></AccordionContent>
        </AccordionItem>
        <AccordionItem value="returns">
          <AccordionTrigger>Returns</AccordionTrigger>
          <AccordionContent><Text as="p">30-day return window.</Text></AccordionContent>
        </AccordionItem>
        <AccordionItem value="warranty" disabled>
          <AccordionTrigger>Warranty</AccordionTrigger>
          <AccordionContent><Text as="p">Two years.</Text></AccordionContent>
        </AccordionItem>
      </Accordion>
    `,
  }),
};

export const Multiple: Story = {
  args: { type: "multiple", defaultValue: ["shipping", "returns"], variant: "bordered" },
  render: Default.render,
};

export const Single: Story = {
  name: "Collapsible",
  render: () => ({
    components: { Collapsible, CollapsibleTrigger, CollapsibleContent, Text },
    template: `
      <Collapsible class="w-96">
        <CollapsibleTrigger>Show details</CollapsibleTrigger>
        <CollapsibleContent><Text as="p">A single disclosure: a button with aria-expanded that shows or hides its content.</Text></CollapsibleContent>
      </Collapsible>
    `,
  }),
};
