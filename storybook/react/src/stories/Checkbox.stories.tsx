import { yupResolver } from "@hookform/resolvers/yup";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  Checkbox,
  Field,
  Form,
  FormLabel,
  FormMessage,
} from "@mild-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const meta = {
  title: "Components/Checkbox",
  tags: ["autodocs"],
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile checkbox component with multiple sizes and states.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    checked: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    indeterminate: { control: "boolean" },
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    className: { control: false },
    id: { control: "text" },
    onCheckedChange: { control: false, action: "checked changed" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    label: "Accept terms and conditions",
  },
} satisfies Story;

export const Checked = {
  args: {
    label: "Receive newsletter",
    checked: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    label: "Disabled option",
    disabled: true,
    checked: false,
  },
} satisfies Story;

export const Indeterminate = {
  args: {
    label: "Partial selection",
    indeterminate: true,
  },
} satisfies Story;

export const WithDifferentSizes = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox" size="md" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
  ),
} satisfies Story;

export const ControlledCheckbox = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label={`Controlled checkbox (${checked ? "checked" : "unchecked"})`}
        checked={checked}
        onCheckedChange={(val: any) => setChecked(val === true)}
      />
    );
  },
} satisfies Story;

export const UncontrolledCheckbox = {
  render: () => (
    <Checkbox
      label="Uncontrolled checkbox"
      defaultChecked={true}
      onCheckedChange={(val: any) => console.log("checked changed:", val)}
    />
  ),
} satisfies Story;

export const ToggleableIndeterminate = {
  render: () => {
    const [state, setState] = useState<boolean | "indeterminate">(
      "indeterminate",
    );

    const handleToggle = () => {
      if (state === "indeterminate") setState(true);
      else if (state === true) setState(false);
      else setState("indeterminate");
    };

    return (
      <Checkbox
        label={`State: ${String(state)}`}
        checked={state === "indeterminate" ? false : state}
        indeterminate={state === "indeterminate"}
        onCheckedChange={handleToggle}
      />
    );
  },
} satisfies Story;

export const ReactHookFormWithYup = {
  render: () => {
    const schema = yup.object({
      terms: yup
        .boolean()
        .required()
        .oneOf([true], "You must accept the terms and conditions"),
      newsletter: yup.boolean().required(),
      marketing: yup.boolean().required(),
    });

    type FormData = yup.InferType<typeof schema>;

    const form = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        terms: false,
        newsletter: false,
        marketing: false,
      },
    });

    const { handleSubmit } = form;

    const onSubmit = (data: FormData) => {
      alert(
        `Submitted:\nTerms: ${data.terms}\nNewsletter: ${data.newsletter}\nMarketing: ${data.marketing}`,
      );
    };

    return (
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
          <Field name="terms" isBoolean>
            <Checkbox label="I accept the terms and conditions" required />
          </Field>

          <Field name="newsletter" isBoolean>
            <Checkbox label="Subscribe to newsletter" />
          </Field>

          <Field name="marketing" isBoolean>
            <Checkbox label="Receive marketing emails" />
          </Field>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
} satisfies Story;

export const CheckboxGroup = {
  render: () => {
    const schema = yup.object({
      newsletter: yup
        .array(yup.string().required())
        .required()
        .min(1, "Please select at least one option"),
    });

    type FormData = yup.InferType<typeof schema>;

    const form = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        newsletter: [],
      },
    });

    const {
      watch,
      setValue,
      handleSubmit,
      formState: { errors },
    } = form;
    const newsletter = watch("newsletter") ?? [];

    const handleCheckboxChange = (value: string, checked: boolean) => {
      if (checked) {
        setValue("newsletter", [...newsletter, value]);
      } else {
        setValue(
          "newsletter",
          newsletter.filter((item) => item !== value),
        );
      }
    };

    const onSubmit = (data: FormData) => {
      alert(`Selected: ${data.newsletter.join(", ")}`);
    };

    const options = [
      { value: "tech", label: "Technology" },
      { value: "health", label: "Health & Wellness" },
      { value: "finance", label: "Finance & Investing" },
      { value: "travel", label: "Travel & Adventure" },
      { value: "food", label: "Food & Recipes" },
      { value: "sports", label: "Sports & Fitness" },
      { value: "entertainment", label: "Movies & TV Shows" },
      { value: "science", label: "Science & Innovation" },
    ];

    return (
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
          <div className="space-y-2">
            <FormLabel id="newsletter" error={!!errors.newsletter}>
              Select newsletter topics you're interested in:
            </FormLabel>
            <div className="space-y-2">
              {options.map((option) => (
                <Field key={option.value} name="newsletter" hideError>
                  <Checkbox
                    label={option.label}
                    value={option.value}
                    checked={newsletter.includes(option.value)}
                    onCheckedChange={(checked) => {
                      checked && form.clearErrors("newsletter");
                      handleCheckboxChange(option.value, checked === true);
                    }}
                  />
                </Field>
              ))}
            </div>
            {errors.newsletter && (
              <FormMessage>{errors.newsletter.message}</FormMessage>
            )}
          </div>

          <Button type="submit">Submit Selection</Button>
        </form>
      </Form>
    );
  },
} satisfies Story;

export const IndeterminateParentChild = {
  render: () => {
    const [parentChecked, setParentChecked] = useState<
      boolean | "indeterminate"
    >("indeterminate");
    const [childrenChecked, setChildrenChecked] = useState([
      false,
      true,
      false,
    ]);

    const handleParentChange = () => {
      if (parentChecked === true) {
        // Uncheck all
        setChildrenChecked([false, false, false]);
        setParentChecked(false);
      } else {
        // Check all
        setChildrenChecked([true, true, true]);
        setParentChecked(true);
      }
    };

    const handleChildChange = (index: number, checked: boolean) => {
      const newChildren = [...childrenChecked];
      newChildren[index] = checked;
      setChildrenChecked(newChildren);

      // Update parent state
      const checkedCount = newChildren.filter(Boolean).length;
      if (checkedCount === 0) {
        setParentChecked(false);
      } else if (checkedCount === newChildren.length) {
        setParentChecked(true);
      } else {
        setParentChecked("indeterminate");
      }
    };

    return (
      <div className="space-y-3 w-80">
        <div>
          <Checkbox
            label="Select All Features"
            checked={parentChecked === "indeterminate" ? false : parentChecked}
            indeterminate={parentChecked === "indeterminate"}
            onCheckedChange={handleParentChange}
            size="lg"
          />
        </div>

        <div className="ml-6 space-y-2">
          {["Dark Mode", "Notifications", "Auto-save"].map((feature, index) => (
            <Checkbox
              key={feature}
              label={feature}
              checked={childrenChecked[index]}
              onCheckedChange={(checked) =>
                handleChildChange(index, checked === true)
              }
            />
          ))}
        </div>
      </div>
    );
  },
} satisfies Story;
