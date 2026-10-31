import type { Meta, StoryObj } from "@storybook/vue3";
import {
  FormField,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
} from "@mild-ui/vue";
import { SearchIcon } from "lucide-vue-next";

const meta: Meta<typeof InputGroup> = {
  title: "Components/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Wraps an `Input` with addons (`InputLeftAddon` / `InputRightAddon`: flush blocks outside the field, e.g. "https://") and elements (`InputLeftElement` / `InputRightElement`: icons or buttons inside it). The group shares its `size` with the input and makes room for the parts. Inside a `FormField` the field wiring passes through to the input.',
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    inline: { control: "boolean" },
  },
  args: { size: "md" },
};

export default meta;

type Story = StoryObj<typeof InputGroup>;

export const Addons: Story = {
  render: (args) => ({
    components: { InputGroup, InputLeftAddon, InputRightAddon, Input },
    setup: () => ({ args }),
    template: `
      <div class="w-80">
        <InputGroup v-bind="args">
          <InputLeftAddon>https://</InputLeftAddon>
          <Input aria-label="Site" placeholder="example" />
          <InputRightAddon>.com</InputRightAddon>
        </InputGroup>
      </div>
    `,
  }),
};

export const Elements: Story = {
  render: (args) => ({
    components: { InputGroup, InputLeftElement, InputRightElement, Input, SearchIcon },
    setup: () => ({ args }),
    template: `
      <div class="w-80">
        <InputGroup v-bind="args">
          <InputLeftElement><SearchIcon :size="16" /></InputLeftElement>
          <Input aria-label="Search" placeholder="Search" />
          <InputRightElement interactive>
            <button type="button" class="mild-button mild-button--ghost mild-button--primary mild-button--xs">Clear</button>
          </InputRightElement>
        </InputGroup>
      </div>
    `,
  }),
};

export const InAField: Story = {
  render: () => ({
    components: { FormField, InputGroup, InputLeftAddon, Input },
    template: `
      <div class="w-80">
        <FormField name="site" label="Website" description="Public URL" required>
          <InputGroup>
            <InputLeftAddon>https://</InputLeftAddon>
            <Input placeholder="example.com" />
          </InputGroup>
        </FormField>
      </div>
    `,
  }),
};
