import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Select } from "@mild-ui/react";
import { Field, Form } from "../examples/react-hook-form";

const options = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
];

const meta = {
  title: "Components/Select",
  tags: ["autodocs"],
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          "Select-only combobox with a listbox popup: Arrow/Enter/Space open it, Arrow/Home/End move, typing jumps to an option, Enter/Space select, Escape and Tab close, per the [WAI-ARIA APG select-only combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/). Keyboard tests: `packages/react/src/components/Select/Select.test.tsx`.",
      },
    },
  },
  argTypes: {
    value: { control: "text" },
    defaultValue: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    name: { control: "text" },
    options: { control: false },
    className: { control: false },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    fullWidth: { control: "boolean" },
    error: { control: "boolean" },
    onChange: { action: "value changed" },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    placeholder: "Select a country",
    options,
  },
} satisfies Story;

export const Controlled = {
  render: () => {
    const [value, setValue] = useState("ca");

    return (
      <div className="w-64">
        <Select
          value={value}
          onChange={(val) => setValue(val)}
          options={options}
          placeholder="Select a country"
        />
        <p className="mt-2 text-sm text-gray-600">Selected: {value}</p>
      </div>
    );
  },
} satisfies Story;

export const WithDisabledOptions = {
  args: {
    placeholder: "Select a country",
    options: [
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada", disabled: true },
      { value: "mx", label: "Mexico" },
    ],
  },
} satisfies Story;

export const SizesExample = {
  render: () => (
    <div className="space-y-4 w-64">
      <Select placeholder="Small" size="sm" options={options} defaultValue="us" />
      <Select placeholder="Medium" size="md" options={options} defaultValue="ca" />
      <Select placeholder="Large" size="lg" options={options} defaultValue="mx" />
    </div>
  ),
} satisfies Story;

export const ReactHookFormWithYup = {
  render: () => {
    const schema = yup.object({
      country: yup.string().required("Please select a country"),
    });

    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        country: "",
      },
    });

    const onSubmit = (data: { country: string }) => {
      alert(`Submitted country: ${data.country}`);
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-80">
          <Field
            name="country"
            label="Country"
            description="Please select your country from the list"
            required
          >
            <Select placeholder="Select a country" options={options} />
          </Field>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
} satisfies Story;
