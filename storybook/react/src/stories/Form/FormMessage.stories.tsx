import type { Meta, StoryObj } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
import {
  FormMessage,
  FormLabel,
  FormDescription,
  FormField,
  FormItem,
  FormControl,
  Input,
  Button,
} from "@mild-ui/react";
import React from "react";

const meta: Meta<typeof FormMessage> = {
  title: "Components/Form/FormMessage",
  component: FormMessage,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A form message component for displaying validation errors and other messages.",
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Message text content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormMessage>;

const FormMessageWrapper = ({
  children,
  errorMessage,
  fieldName = "testField",
  labelText = "Field Label",
  showDescription = true,
}: {
  children?: React.ReactNode;
  errorMessage?: string;
  fieldName?: string;
  labelText?: string;
  showDescription?: boolean;
}) => {
  const form = useForm({ defaultValues: { [fieldName]: "" } });

  React.useEffect(() => {
    if (errorMessage) {
      form.setError(fieldName, {
        type: "manual",
        message: errorMessage,
      });
    }
  }, [errorMessage, fieldName, form]);

  return (
    <FormProvider {...form}>
      <FormField
        control={form.control}
        name={fieldName}
        render={() => (
          <FormItem>
            <FormLabel>{labelText}</FormLabel>
            <FormControl>
              <Input placeholder="Sample input" />
            </FormControl>
            {showDescription && (
              <FormDescription>
                This is a sample field for testing messages
              </FormDescription>
            )}
            {children || <FormMessage />}
          </FormItem>
        )}
      />
    </FormProvider>
  );
};

export const ErrorMessage: Story = {
  render: (args) => (
    <FormMessageWrapper errorMessage="This field is required">
      <FormMessage {...args} />
    </FormMessageWrapper>
  ),
  parameters: {
    docs: {
      storyDescription:
        "An error message displayed when field validation fails.",
    },
  },
};

export const CustomErrorMessage: Story = {
  render: (args) => (
    <FormMessageWrapper errorMessage="Password must be at least 8 characters long">
      <FormMessage {...args} />
    </FormMessageWrapper>
  ),
  parameters: {
    docs: {
      storyDescription:
        "A specific validation error message for password requirements.",
    },
  },
};

export const LongErrorMessage: Story = {
  render: (args) => (
    <FormMessageWrapper errorMessage="This is a very long error message that demonstrates how the component handles longer validation error text that might span multiple lines and provide detailed feedback to users">
      <FormMessage {...args} />
    </FormMessageWrapper>
  ),
  parameters: {
    docs: {
      storyDescription:
        "A long error message to test text wrapping and display behavior.",
    },
  },
};

export const CustomMessage: Story = {
  render: (args) => (
    <FormMessageWrapper>
      <FormMessage {...args}>
        This is a custom message not from validation
      </FormMessage>
    </FormMessageWrapper>
  ),
  parameters: {
    docs: {
      storyDescription: "A custom message that is not from form validation.",
    },
  },
};

export const NoMessage: Story = {
  render: (args) => (
    <FormMessageWrapper>
      <FormMessage {...args} />
    </FormMessageWrapper>
  ),
  parameters: {
    docs: {
      storyDescription:
        "FormMessage with no error - component returns null and renders nothing.",
    },
  },
};

export const StyledMessage: Story = {
  render: (args) => (
    <FormMessageWrapper>
      <FormMessage {...args} className="text-orange-600 font-semibold">
        Custom styled warning message
      </FormMessage>
    </FormMessageWrapper>
  ),
  parameters: {
    docs: {
      storyDescription: "A form message with custom styling applied.",
    },
  },
};

export const ValidationMessages: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      mode: "onChange",
    });

    const emailValue = form.watch("email");
    const password = form.watch("password");
    const confirmPassword = form.watch("confirmPassword");

    React.useEffect(() => {
      if (emailValue && !emailValue.includes("@")) {
        form.setError("email", {
          type: "manual",
          message: "Please enter a valid email address",
        });
      } else {
        form.clearErrors("email");
      }
    }, [emailValue, form]);

    React.useEffect(() => {
      if (password && password.length < 8) {
        form.setError("password", {
          type: "manual",
          message: "Password must be at least 8 characters long",
        });
      } else {
        form.clearErrors("password");
      }
    }, [password, form]);

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
      <FormProvider {...form}>
        <div className="w-96 space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="john@example.com"
                  />
                </FormControl>
                <FormDescription>Enter a valid email address</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter password"
                  />
                </FormControl>
                <FormDescription>Must be at least 8 characters</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Confirm password"
                  />
                </FormControl>
                <FormDescription>Re-enter your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </FormProvider>
    );
  },
  parameters: {
    docs: {
      storyDescription: "Multiple fields with real-time validation messages.",
    },
  },
};

export const DifferentErrorTypes: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        required: "",
        email: "invalid-email",
        minLength: "abc",
        pattern: "123abc",
      },
    });

    React.useEffect(() => {
      form.setError("required", {
        type: "required",
        message: "This field is required",
      });

      form.setError("email", {
        type: "pattern",
        message: "Please enter a valid email address",
      });

      form.setError("minLength", {
        type: "minLength",
        message: "Must be at least 8 characters long",
      });

      form.setError("pattern", {
        type: "pattern",
        message: "Only letters are allowed",
      });
    }, [form]);

    return (
      <FormProvider {...form}>
        <div className="w-96 space-y-4">
          <FormField
            control={form.control}
            name="required"
            render={() => (
              <FormItem>
                <FormLabel>Required Field</FormLabel>
                <FormControl>
                  <Input placeholder="Required field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={() => (
              <FormItem>
                <FormLabel>Email Validation</FormLabel>
                <FormControl>
                  <Input placeholder="Email field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minLength"
            render={() => (
              <FormItem>
                <FormLabel>Minimum Length</FormLabel>
                <FormControl>
                  <Input placeholder="Min length field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pattern"
            render={() => (
              <FormItem>
                <FormLabel>Pattern Validation</FormLabel>
                <FormControl>
                  <Input placeholder="Pattern field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </FormProvider>
    );
  },
  parameters: {
    docs: {
      storyDescription:
        "Different types of validation errors displayed with FormMessage.",
    },
  },
};

export const InteractiveValidation: Story = {
  render: () => {
    const form = useForm({
      defaultValues: { username: "" },
      mode: "onChange",
    });

    const username = form.watch("username");

    React.useEffect(() => {
      if (username) {
        if (username.length < 3) {
          form.setError("username", {
            type: "minLength",
            message: "Username must be at least 3 characters",
          });
        } else if (username.length > 20) {
          form.setError("username", {
            type: "maxLength",
            message: "Username must be less than 20 characters",
          });
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
          form.setError("username", {
            type: "pattern",
            message:
              "Username can only contain letters, numbers, and underscores",
          });
        } else {
          form.clearErrors("username");
        }
      } else {
        form.setError("username", {
          type: "required",
          message: "Username is required",
        });
      }
    }, [username, form]);

    const onSubmit = (data: any) => {
      alert(`Username: ${data.username}`);
    };

    return (
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter username" />
                </FormControl>
                <FormDescription>
                  3-20 characters, letters, numbers, and underscores only
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </FormProvider>
    );
  },
  parameters: {
    docs: {
      storyDescription:
        "Interactive validation that updates messages as the user types.",
    },
  },
};
