import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  Field,
  Form,
  Input,
  InputPassword,
} from "@mild-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

// Create a wrapper component that doesn't require props
const Dummy = () => <></>;

const meta = {
  component: Dummy,
  title: "Components/Form",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A form component that uses React Hook Form and Yup for validation.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dummy>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RegistrationForm: Story = {
  render: () => {
    const schema = yup.object({
      name: yup
        .string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters"),
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        ),
      confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password")], "Passwords must match"),
      age: yup
        .string()
        .required("Age is required")
        .matches(/^[0-9]+$/, "Age must be a number")
        .test(
          "is-positive",
          "You must be at least 13 years old",
          (value) => !!(value && parseInt(value) >= 13),
        ),
      terms: yup
        .boolean()
        .required("You must accept the terms and conditions")
        .oneOf([true], "You must accept the terms and conditions"),
    });

    // Define the form data type explicitly
    interface FormData {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      age: string;
      terms: boolean;
    }

    const form = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        terms: false,
      },
      mode: "onChange", // Validate on change for better UX
    });

    const TermCondition = () => (
      <span>
        <span>I agree to the </span>
        <a href="#" className="text-blue-600 hover:underline">
          Terms and Conditions
        </a>
        <span> and </span>
        <a href="#" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>
      </span>
    );

    const onSubmit: SubmitHandler<FormData> = (data) => {
      console.log("Form Data:", data);
      alert(
        `Registration Successful!\nName: ${data.name}\nEmail: ${data.email}\nPassword: ${data.password}\nAge: ${data.age}\nTerms: ${data.terms}`,
      );
    };

    const onError = (errors: any) => {
      console.log("Form Errors:", errors);
    };

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-4"
        >
          {/* Name Field */}
          <Field
            name="name"
            label="Full Name"
            description="Enter your full name as it appears on official documents"
            required
          >
            <Input
              placeholder="Enter your full name"
              autoComplete="name"
              onChange={(v) => console.log("Name changed:", v)}
            />
          </Field>

          {/* Email Field */}
          <Field
            name="email"
            label="Email Address"
            description="We'll never share your email with anyone else"
            required
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
            />
          </Field>

          {/* Age Field */}
          <Field name="age" label="Age" required>
            <Input
              type="number"
              placeholder="Enter your age"
              min="13"
              max="120"
            />
          </Field>

          {/* Password Field */}
          <Field
            name="password"
            label="Password"
            description="Must be at least 8 characters with uppercase, lowercase, and numbers"
            required
          >
            <InputPassword
              placeholder="Create a strong password"
              autoComplete="new-password"
            />
          </Field>

          {/* Confirm Password Field */}
          <Field name="confirmPassword" label="Confirm Password" required>
            <InputPassword
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
          </Field>

          {/* Terms and Conditions */}
          <Field name="terms" required isBoolean>
            <Checkbox required label={<TermCondition />} />
          </Field>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </Button>
          </div>

          {/* Reset Button */}
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="w-full"
          >
            Reset Form
          </Button>
        </form>
      </Form>
    );
  },
};
