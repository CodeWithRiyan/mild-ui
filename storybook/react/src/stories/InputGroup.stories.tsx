import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  FormField,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
} from "@mild-ui/react";
import { Search } from "lucide-react";

const meta = {
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
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Addons = {
  render: (args) => (
    <div className="w-80">
      <InputGroup {...args}>
        <InputLeftAddon>https://</InputLeftAddon>
        <Input aria-label="Site" placeholder="example" />
        <InputRightAddon>.com</InputRightAddon>
      </InputGroup>
    </div>
  ),
} satisfies Story;

export const Elements = {
  render: (args) => (
    <div className="w-80">
      <InputGroup {...args}>
        <InputLeftElement>
          <Search size={16} />
        </InputLeftElement>
        <Input aria-label="Search" placeholder="Search" />
        <InputRightElement interactive>
          <Button variant="ghost" size="xs">
            Clear
          </Button>
        </InputRightElement>
      </InputGroup>
    </div>
  ),
} satisfies Story;

export const InAField = {
  render: () => (
    <div className="w-80">
      <FormField name="site" label="Website" description="Public URL" required>
        <InputGroup>
          <InputLeftAddon>https://</InputLeftAddon>
          <Input placeholder="example.com" />
        </InputGroup>
      </FormField>
    </div>
  ),
} satisfies Story;
