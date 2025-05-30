import { yupResolver } from "@hookform/resolvers/yup";
import { RadioGroup, RadioGroupItem } from "@mild-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const meta = {
  title: "Components/RadioGroup",
  tags: ["autodocs"],
  component: RadioGroup,
  argTypes: {
    defaultValue: { control: "text" },
    value: { control: "text" },
    name: { control: "text" },
    onValueChange: { action: "value changed" },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicGroup = {
  render: () => (
    <RadioGroup defaultValue="option1" className="space-y-2">
      <RadioGroupItem id="option1" value="option1" label="Option 1" />
      <RadioGroupItem id="option2" value="option2" label="Option 2" />
      <RadioGroupItem id="option3" value="option3" label="Option 3" />
    </RadioGroup>
  ),
} satisfies Story;

export const ControlledRadioGroup = {
  render: () => {
    const [value, setValue] = useState("option2");

    return (
      <RadioGroup
        value={value}
        onValueChange={(val) => setValue(val)}
        className="space-y-2"
      >
        <RadioGroupItem id="opt-a" value="option1" label="Option 1" />
        <RadioGroupItem id="opt-b" value="option2" label="Option 2" />
        <RadioGroupItem id="opt-c" value="option3" label="Option 3" />
      </RadioGroup>
    );
  },
} satisfies Story;

export const DisabledOptions = {
  render: () => (
    <RadioGroup defaultValue="active" className="space-y-2">
      <RadioGroupItem id="active" value="active" label="Active" />
      <RadioGroupItem
        id="disabled"
        value="disabled"
        label="Disabled"
        disabled
      />
      <RadioGroupItem id="offline" value="offline" label="Offline" />
    </RadioGroup>
  ),
} satisfies Story;

export const SizesExample = {
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroup defaultValue="a-sm" className="space-y-2">
        <RadioGroupItem id="a-sm" value="a-sm" label="Small" size="sm" />
        <RadioGroupItem id="b-sm" value="b-sm" label="Small 2" size="sm" />
      </RadioGroup>
      <RadioGroup defaultValue="a-md" className="space-y-2">
        <RadioGroupItem id="a-md" value="a-md" label="Medium" size="md" />
        <RadioGroupItem id="b-md" value="b-md" label="Medium 2" size="md" />
      </RadioGroup>
      <RadioGroup defaultValue="a-lg" className="space-y-2">
        <RadioGroupItem id="a-lg" value="a-lg" label="Large" size="lg" />
        <RadioGroupItem id="b-lg" value="b-lg" label="Large 2" size="lg" />
      </RadioGroup>
    </div>
  ),
} satisfies Story;

export const ReactHookFormWithYup = {
  render: () => {
    const schema = yup.object({
      status: yup.string().required("Please select your availability status"),
    });

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = (data: { status: string }) => {
      alert(`Submitted status: ${data.status}`);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <RadioGroup {...register("status")} className="space-y-2">
          <RadioGroupItem
            id="status-available"
            value="available"
            label="Available"
          />
          <RadioGroupItem id="status-busy" value="busy" label="Busy" />
          <RadioGroupItem id="status-away" value="away" label="Away" />
        </RadioGroup>
        {errors.status && (
          <p className="text-sm text-red-600">{errors.status.message}</p>
        )}
        <button
          type="submit"
          className="px-3 py-1 rounded bg-indigo-600 text-white text-sm"
        >
          Submit
        </button>
      </form>
    );
  },
} satisfies Story;
