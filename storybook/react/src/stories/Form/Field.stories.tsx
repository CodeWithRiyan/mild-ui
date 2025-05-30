import type { Meta, StoryObj } from "@storybook/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Checkbox,
  Form,
  Field,
  Input,
  Select,
  Radio,
  Switch,
  FormLabel,
  FormMessage,
} from "@mild-ui/react";
import React from "react";

const meta: Meta<typeof Field> = {
  title: "Components/Form/Field",
  component: Field,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible form field component that wraps form controls with labels, descriptions, and error messages.",
      },
    },
  },
  argTypes: {
    name: {
      control: "text",
      description: "The name of the form field",
    },
    label: {
      control: "text",
      description: "Label text for the field",
    },
    description: {
      control: "text",
      description: "Helper text displayed below the field",
    },
    required: {
      control: "boolean",
      description: "Whether the field is required",
    },
    hideError: {
      control: "boolean",
      description: "Hide error messages",
    },
    isBoolean: {
      control: "boolean",
      description:
        "Mark the field as a boolean field. ex: Checkbox (single not group), Switch.",
    },
    isRadio: {
      control: "boolean",
      description: "Mark the field as a Radio field",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Field>;

// Basic text input field
export const TextInput: Story = {
  render: (args) => {
    const schema = yup.object({
      username: yup
        .string()
        .required("Username is required")
        .matches(
          /^[a-zA-Z0-9_]{3,20}$/,
          "Username must be 3-20 characters long and can only contain letters, numbers, and underscores",
        ),
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        username: "",
      },
    });
    const handleSubmit: SubmitHandler<{ username: string }> = (data) => {
      alert(`Registration Successful!\nUsername: ${data.username}`);
    };

    return (
      <Form {...form}>
        <form
          className="space-y-4 min-w-[300px]"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <Field {...args}>
            <Input placeholder="Enter your name" />
          </Field>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
  args: {
    name: "username",
    label: "Username",
    description: "Enter your preferred username",
    required: true,
    hideError: false,
    isBoolean: false,
    className: "",
  },
};

// Required field with validation
export const Required: Story = {
  render: () => {
    const schema = yup.object({
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        email: "",
      },
    });

    return (
      <Form {...form}>
        <form className="space-y-4 min-w-[300px]">
          <Field
            name="email"
            label="Email Address"
            description={`We'll never share your email with anyone else`}
            required
          >
            <Input placeholder="Enter your email" />
          </Field>
        </form>
      </Form>
    );
  },
};

// Select field
export const SelectField: Story = {
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

    const optionList = [
      { value: "id", label: "Indonesia" },
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
      { value: "mx", label: "Mexico" },
    ];

    return (
      <Form {...form}>
        <form className="space-y-4 min-w-[300px]">
          <Field
            name="country"
            label="Country"
            description="Select your country of residence"
            required
          >
            <Select options={optionList} />
          </Field>
        </form>
      </Form>
    );
  },
};

// Select field
export const RadioGroupField: Story = {
  render: () => {
    const schema = yup.object({
      gender: yup.string().required("Please select a gender"),
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        gender: "",
      },
    });

    const options = [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ];

    return (
      <Form {...form}>
        <form className="space-y-4 min-w-[300px]">
          <Field
            name="gender"
            label="Gender"
            description="Select your gender"
            required
            isRadio
          >
            <Radio
              items={options}
              onValueChange={(value) => console.log(`Gender: ${value}`)}
            />
          </Field>
        </form>
      </Form>
    );
  },
};

// Checkbox field
export const CheckboxField: Story = {
  render: () => {
    const schema = yup.object({
      acceptTerms: yup
        .boolean()
        .required("You must accept the terms and conditions"),
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        acceptTerms: false,
      },
    });
    return (
      <Form {...form}>
        <form className="space-y-4 min-w-[300px]">
          <Field name="acceptTerms" isBoolean>
            <Checkbox
              label="I accept the terms and conditions"
              required
              onCheckedChange={(val) => console.log(`checked changed: ${val}`)}
            />
          </Field>
        </form>
      </Form>
    );
  },
};

// Switch field
export const SwitchField: Story = {
  render: () => {
    const schema = yup.object({
      acceptTerms: yup
        .boolean()
        .required("You must accept the terms and conditions"),
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        acceptTerms: false,
      },
    });
    return (
      <Form {...form}>
        <form className="space-y-4 min-w-[300px]">
          <Field name="acceptTerms" isBoolean>
            <Switch
              label="I accept the terms and conditions"
              required
              onCheckedChange={(val) => console.log(`checked changed: ${val}`)}
            />
          </Field>
        </form>
      </Form>
    );
  },
};

// Field without label
export const NoLabel: Story = {
  render: () => {
    const schema = yup.object({
      name: yup.string(),
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        name: "",
      },
    });

    return (
      <Form {...form}>
        <form className="space-y-4 min-w-[300px]">
          <Field name="search" description="Type to search for items">
            <Input placeholder="Search..." />
          </Field>
        </form>
      </Form>
    );
  },
};

// Field with hidden error
export const HiddenError: Story = {
  render: () => {
    const schema = yup.object({
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        email: "",
      },
    });

    return (
      <Form {...form}>
        <form className="space-y-4 min-w-[300px]">
          <Field
            name="email"
            label="Email Address"
            description={`We'll never share your email with anyone else`}
            required
            hideError
          >
            <Input placeholder="Enter your email" />
          </Field>
        </form>
      </Form>
    );
  },
};

// Custom styled field
export const CustomStyled: Story = {
  render: () => {
    const schema = yup.object({
      custom: yup.string(),
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        custom: "",
      },
    });
    return (
      <Form {...form}>
        <Field
          name="custom"
          label="Custom Styled Field"
          description="This field has custom styling applied"
          className="p-4 bg-gray-50 rounded-lg border"
        >
          <Input placeholder="Custom styled input" />
        </Field>
      </Form>
    );
  },
};

// Multiple fields form
export const MultipleFields: Story = {
  render: () => {
    const schema = yup.object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      newsletter: yup
        .array(yup.string().required())
        .required()
        .min(1, "Please select at least one option"),
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
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

    const newsletterOptions = [
      { value: "tech", label: "Technology" },
      { value: "health", label: "Health & Wellness" },
      { value: "finance", label: "Finance & Investing" },
      { value: "travel", label: "Travel & Adventure" },
      { value: "food", label: "Food & Recipes" },
      { value: "sports", label: "Sports & Fitness" },
      { value: "entertainment", label: "Movies & TV Shows" },
      { value: "science", label: "Science & Innovation" },
    ];

    const handleCheckboxGroupChange = (value: string, checked: boolean) => {
      if (checked) {
        setValue("newsletter", [...newsletter, value]);
      } else {
        setValue(
          "newsletter",
          newsletter.filter((item) => item !== value),
        );
      }
    };

    const onSubmit = (data: any) => {
      console.log("Form submitted:", data);
      alert("Form submitted successfully! Check console for data.");
    };

    return (
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 min-w-[400px] p-4 border rounded-md"
        >
          <Field name="firstName" label="First Name" required>
            <Input placeholder="John" />
          </Field>

          <Field name="lastName" label="Last Name" required>
            <Input placeholder="Doe" />
          </Field>

          <Field
            name="email"
            label="Email"
            description="We'll use this to contact you"
            required
          >
            <Input type="email" placeholder="john@example.com" />
          </Field>

          <div className="space-y-2">
            <FormLabel id="newsletter" error={!!errors.newsletter}>
              Select newsletter topics you're interested in:
            </FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {newsletterOptions.map((option) => (
                <Field key={option.value} name="newsletter" hideError>
                  <Checkbox
                    label={option.label}
                    value={option.value}
                    checked={newsletter.includes(option.value)}
                    onCheckedChange={(checked) => {
                      checked && form.clearErrors("newsletter");
                      handleCheckboxGroupChange(option.value, checked === true);
                    }}
                  />
                </Field>
              ))}
            </div>
            {errors.newsletter && (
              <FormMessage>{errors.newsletter.message}</FormMessage>
            )}
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
};

// Password field with confirmation
export const PasswordFields: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        password: "",
        confirmPassword: "",
      },
      mode: "onChange",
    });

    const password = form.watch("password");
    const confirmPassword = form.watch("confirmPassword");

    React.useEffect(() => {
      if (confirmPassword && password !== confirmPassword) {
        form.setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
      } else {
        form.clearErrors("confirmPassword");
      }
    }, [password, confirmPassword, form]);

    return (
      <Form {...form}>
        <form className="space-y-4 min-w-[300px]">
          <Field
            name="password"
            label="Password"
            description="Must be at least 8 characters"
            required
          >
            <Input type="password" placeholder="Enter password" />
          </Field>

          <Field name="confirmPassword" label="Confirm Password" required>
            <Input type="password" placeholder="Confirm password" />
          </Field>

          <Button type="submit">Create Account</Button>
        </form>
      </Form>
    );
  },
};

// Complete form with Yup validation
export const CompleteFormWithYup: Story = {
  render: () => {
    const schema = yup.object({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      age: yup
        .string()
        .required("Age is required")
        .matches(/^[0-9]+$/, "Age must be a number")
        .test(
          "is-positive",
          "You must be at least 18 years old",
          (value) => !!(value && parseInt(value) >= 18),
        ),
      country: yup.string().required("Please select a country"),
      acceptTerms: yup
        .boolean()
        .oneOf([true], "You must accept the terms and conditions"),
    });

    const form = useForm({
      resolver: yupResolver(schema),
      mode: "onChange",
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        country: "",
        acceptTerms: false,
      },
    });

    const countryOptions = [
      { value: "id", label: "Indonesia" },
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "ca", label: "Canada" },
      { value: "au", label: "Australia" },
    ];

    const onSubmit = (data: any) => {
      console.log("Form submitted:", data);
      alert("Form submitted successfully! Check console for data.");
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-96">
          <Field name="firstName" label="First Name" required>
            <Input placeholder="John" />
          </Field>

          <Field name="lastName" label="Last Name" required>
            <Input placeholder="Doe" />
          </Field>

          <Field
            name="email"
            label="Email Address"
            description="We'll never share your email"
            required
          >
            <Input type="email" placeholder="john@example.com" />
          </Field>

          <Field
            name="age"
            label="Age"
            description="Must be 18 or older"
            required
          >
            <Input type="number" placeholder="25" />
          </Field>

          <Field
            name="country"
            label="Country"
            description="Select your country of residence"
            required
          >
            <Select placeholder="Select a country" options={countryOptions} />
          </Field>

          <Field name="acceptTerms" isBoolean>
            <Checkbox label="I accept the terms and conditions" required />
          </Field>

          <Button type="submit" className="w-full">
            Submit Form
          </Button>
        </form>
      </Form>
    );
  },
};
