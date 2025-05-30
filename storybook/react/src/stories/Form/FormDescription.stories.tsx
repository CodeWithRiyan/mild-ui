import type { Meta, StoryObj } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
import {
  FormDescription,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  Input,
} from "@mild-ui/react";
import React from "react";

const meta: Meta<typeof FormDescription> = {
  title: "Components/Form/FormDescription",
  component: FormDescription,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A form description component for providing helpful text and instructions to users.",
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Description text content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormDescription>;

const FormDescriptionWrapper = ({
  children,
  fieldName = "testField",
  labelText = "Field Label",
}: {
  children: React.ReactNode;
  fieldName?: string;
  labelText?: string;
}) => {
  const form = useForm({ defaultValues: { [fieldName]: "" } });

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
            {children}
          </FormItem>
        )}
      />
    </FormProvider>
  );
};

export const BasicDescription: Story = {
  render: (args) => (
    <FormDescriptionWrapper>
      <FormDescription {...args}>
        Enter your username. It must be unique and contain only letters and
        numbers.
      </FormDescription>
    </FormDescriptionWrapper>
  ),
  parameters: {
    docs: {
      storyDescription:
        "A basic form description providing helpful information to users.",
    },
  },
};

export const ShortDescription: Story = {
  render: (args) => (
    <FormDescriptionWrapper>
      <FormDescription {...args}>Required field</FormDescription>
    </FormDescriptionWrapper>
  ),
  parameters: {
    docs: {
      storyDescription: "A short, concise form description.",
    },
  },
};

export const LongDescription: Story = {
  render: (args) => (
    <FormDescriptionWrapper>
      <FormDescription {...args}>
        This is a longer description that provides detailed instructions about
        what the user should enter in this field. It can span multiple lines and
        provide comprehensive guidance to help users understand the requirements
        and expectations.
      </FormDescription>
    </FormDescriptionWrapper>
  ),
  parameters: {
    docs: {
      storyDescription: "A longer form description that spans multiple lines.",
    },
  },
};

export const DescriptionWithMarkup: Story = {
  render: (args) => (
    <FormDescriptionWrapper>
      <FormDescription {...args}>
        Password must contain at least <strong>8 characters</strong>, including
        one <em>uppercase letter</em> and one <em>number</em>.
      </FormDescription>
    </FormDescriptionWrapper>
  ),
  parameters: {
    docs: {
      storyDescription:
        "A form description containing HTML markup for emphasis.",
    },
  },
};

export const CustomStyledDescription: Story = {
  render: (args) => (
    <FormDescriptionWrapper>
      <FormDescription {...args} className="text-blue-600 font-medium">
        This description has custom styling applied
      </FormDescription>
    </FormDescriptionWrapper>
  ),
  parameters: {
    docs: {
      storyDescription: "A form description with custom CSS styling.",
    },
  },
};

export const DescriptionWithInstructions: Story = {
  render: (args) => (
    <FormDescriptionWrapper labelText="API Key">
      <FormDescription {...args}>
        You can find your API key in your account settings. Keep it secure and
        don't share it publicly.
      </FormDescription>
    </FormDescriptionWrapper>
  ),
  parameters: {
    docs: {
      storyDescription:
        "A form description providing specific instructions for finding information.",
    },
  },
};

export const WarningDescription: Story = {
  render: (args) => (
    <FormDescriptionWrapper labelText="Delete Account">
      <FormDescription {...args} className="text-orange-600 font-medium">
        ⚠️ This action cannot be undone. All your data will be permanently
        deleted.
      </FormDescription>
    </FormDescriptionWrapper>
  ),
  parameters: {
    docs: {
      storyDescription:
        "A form description styled as a warning with custom colors and an icon.",
    },
  },
};

export const MultipleDescriptions: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        username: "",
        email: "",
        password: "",
      },
    });

    return (
      <FormProvider {...form}>
        <div className="space-y-6 w-96">
          <FormField
            control={form.control}
            name="username"
            render={() => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" />
                </FormControl>
                <FormDescription>
                  Choose a unique username that you'll use to log in.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={() => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email" />
                </FormControl>
                <FormDescription>
                  We'll use this email to send you important updates about your
                  account. Make sure it's an email you check regularly.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={() => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter password" />
                </FormControl>
                <FormDescription className="text-orange-600">
                  <strong>Security tip:</strong> Use a combination of uppercase
                  letters, lowercase letters, numbers, and symbols for a strong
                  password.
                </FormDescription>
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
        "Multiple form descriptions showing different styles and content lengths.",
    },
  },
};

export const DescriptionWithLinks: Story = {
  render: (args) => (
    <FormDescriptionWrapper labelText="Terms of Service">
      <FormDescription {...args}>
        By creating an account, you agree to our{" "}
        <a href="#" className="text-blue-600 underline hover:text-blue-800">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-600 underline hover:text-blue-800">
          Privacy Policy
        </a>
        .
      </FormDescription>
    </FormDescriptionWrapper>
  ),
  parameters: {
    docs: {
      storyDescription: "A form description containing clickable links.",
    },
  },
};
