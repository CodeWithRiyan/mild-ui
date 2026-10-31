import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Text,
} from "@mild-ui/react";

const meta = {
  title: "Disclosure/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Accordion driven by `@mild-ui/primitives/accordion`: headings wrapping buttons with `aria-expanded`, Arrow/Home/End between headers, `type="single"` or `"multiple"`, controlled through `value` / `onValueChange`. `Collapsible` is a single disclosure. Patterns: [WAI-ARIA APG accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) and [disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/); keyboard tests: `packages/react/src/components/Accordion/Accordion.test.tsx` and `Collapsible/Collapsible.test.tsx`.',
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
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = (
  <>
    <AccordionItem value="shipping">
      <AccordionTrigger>Shipping</AccordionTrigger>
      <AccordionContent>
        <Text as="p">Ships within 2 business days.</Text>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="returns">
      <AccordionTrigger>Returns</AccordionTrigger>
      <AccordionContent>
        <Text as="p">30-day return window.</Text>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="warranty" disabled>
      <AccordionTrigger>Warranty</AccordionTrigger>
      <AccordionContent>
        <Text as="p">Two years.</Text>
      </AccordionContent>
    </AccordionItem>
  </>
);

export const Default = {
  render: (args) => (
    <Accordion {...args} className="w-96">
      {items}
    </Accordion>
  ),
} satisfies Story;

export const Multiple = {
  render: () => (
    <Accordion
      type="multiple"
      defaultValue={["shipping", "returns"]}
      variant="bordered"
      className="w-96"
    >
      {items}
    </Accordion>
  ),
} satisfies Story;

export const Single = {
  name: "Collapsible",
  render: () => (
    <Collapsible className="w-96">
      <CollapsibleTrigger>Show details</CollapsibleTrigger>
      <CollapsibleContent>
        <Text as="p">
          A single disclosure: a button with aria-expanded that shows or hides its content.
        </Text>
      </CollapsibleContent>
    </Collapsible>
  ),
} satisfies Story;
