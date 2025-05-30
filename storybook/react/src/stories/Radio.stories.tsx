import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Field,
  Form,
  Radio,
  RadioGroup,
  RadioGroupItem,
} from "@mild-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const meta = {
  title: "Components/Radio",
  tags: ["autodocs"],
  component: Radio,
  argTypes: {
    defaultValue: { control: "text" },
    value: { control: "text" },
    name: { control: "text" },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      defaultValue: "md",
    },
    onValueChange: { action: "value changed" },
    items: { control: "array" },
    className: { control: "text" },
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

// Basic Radio using the high-level Radio component
export const Basic = {
  render: (args) => (
    <Radio
      {...args}
      items={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ]}
      defaultValue="option1"
    />
  ),
} satisfies Story;

// Using RadioGroup and RadioGroupItem directly
export const BasicGroup = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <RadioGroupItem value="option1" label="Option 1" />
      <RadioGroupItem value="option2" label="Option 2" />
      <RadioGroupItem value="option3" label="Option 3" />
    </RadioGroup>
  ),
} satisfies Story;

// Controlled component example
export const Controlled = {
  render: () => {
    const [value, setValue] = useState("option2");

    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">Selected: {value}</p>
        <Radio
          items={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
          ]}
          value={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
} satisfies Story;

// Different sizes example
export const Sizes = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <Radio
          items={[
            { value: "small1", label: "Small Option 1" },
            { value: "small2", label: "Small Option 2" },
          ]}
          size="sm"
          defaultValue="small1"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Medium (Default)</h3>
        <Radio
          items={[
            { value: "medium1", label: "Medium Option 1" },
            { value: "medium2", label: "Medium Option 2" },
          ]}
          size="md"
          defaultValue="medium1"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <Radio
          items={[
            { value: "large1", label: "Large Option 1" },
            { value: "large2", label: "Large Option 2" },
          ]}
          size="lg"
          defaultValue="large1"
        />
      </div>
    </div>
  ),
} satisfies Story;

// Disabled options example
export const WithDisabledOptions = {
  render: () => (
    <Radio
      items={[
        { value: "active", label: "Active" },
        { value: "disabled", label: "Disabled Option", disabled: true },
        { value: "offline", label: "Offline" },
      ]}
      defaultValue="active"
    />
  ),
} satisfies Story;

// Mixed usage: some items via props, some via children
export const MixedUsage = {
  render: () => (
    <RadioGroup defaultValue="child1">
      <RadioGroupItem value="child1" label="Child Item 1" />
      <RadioGroupItem value="child2" label="Child Item 2" size="lg" />
      <RadioGroupItem value="child3" label="Disabled Child" disabled />
    </RadioGroup>
  ),
} satisfies Story;

// React Hook Form integration
export const WithReactHookForm = {
  render: () => {
    const schema = yup.object({
      status: yup.string().required("Please select your availability status"),
      priority: yup.string().required("Please select priority level"),
    });

    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        status: "",
        priority: "",
      },
    });

    const onSubmit = (data: { status: string; priority: string }) => {
      alert(`Submitted: ${JSON.stringify(data, null, 2)}`);
    };

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-96 p-4 border rounded-md"
        >
          <Field name="status" label="Availability Status" required isRadio>
            <Radio
              items={[
                { value: "available", label: "Available" },
                { value: "busy", label: "Busy" },
                { value: "away", label: "Away" },
              ]}
            />
          </Field>
          <Field name="priority" label="Priority Level" required isRadio>
            <Radio
              items={[
                { value: "low", label: "Low Priority" },
                { value: "medium", label: "Medium Priority" },
                { value: "high", label: "High Priority" },
              ]}
            />
          </Field>

          <Button type="submit">Submit Form</Button>
        </form>
      </Form>
    );
  },
} satisfies Story;

// Playground story for interactive testing
export const Playground = {
  args: {
    defaultValue: "option1",
    size: "md",
  },
  render: (args) => (
    <Radio
      {...args}
      items={[
        { value: "option1", label: "First Option" },
        { value: "option2", label: "Second Option" },
        { value: "option3", label: "Third Option", disabled: false },
      ]}
    />
  ),
} satisfies Story;
