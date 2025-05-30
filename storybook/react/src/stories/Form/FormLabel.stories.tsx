import type { Meta, StoryObj } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
import {
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  Input,
} from "@mild-ui/react";
import React from "react";

const meta: Meta<typeof FormLabel> = {
  title: "Components/Form/FormLabel",
  component: FormLabel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A form label component that automatically handles error states and accessibility attributes.",
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Label text content",
    },
    required: {
      control: "boolean",
      description: "Show required indicator",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormLabel>;

// FormLabel wrapper to provide form context
const FormLabelWrapper = ({
  children,
  hasError = false,
  fieldName = "testField",
}: {
  children: React.ReactNode;
  hasError?: boolean;
  fieldName?: string;
}) => {
  const form = useForm({ defaultValues: { [fieldName]: "" } });

  React.useEffect(() => {
    if (hasError) {
      form.setError(fieldName, {
        type: "manual",
        message: "This field has an error",
      });
    }
  }, [hasError, fieldName, form]);

  return (
    <FormProvider {...form}>
      <FormField
        control={form.control}
        name={fieldName}
        render={() => (
          <FormItem>
            {children}
            <FormControl>
              <Input placeholder="Sample input" />
            </FormControl>
          </FormItem>
        )}
      />
    </FormProvider>
  );
};

export const BasicLabel: Story = {
  render: (args) => (
    <FormLabelWrapper>
      <FormLabel {...args}>Username</FormLabel>
    </FormLabelWrapper>
  ),
  parameters: {
    docs: {
      storyDescription: "A basic form label without any special states.",
    },
  },
};

export const RequiredLabel: Story = {
  render: (args) => (
    <FormLabelWrapper>
      <FormLabel {...args} required>
        Email Address
      </FormLabel>
    </FormLabelWrapper>
  ),
  parameters: {
    docs: {
      storyDescription: "A form label with a required indicator.",
    },
  },
};

export const LabelWithError: Story = {
  render: (args) => (
    <FormLabelWrapper hasError>
      <FormLabel {...args}>Password</FormLabel>
    </FormLabelWrapper>
  ),
  parameters: {
    docs: {
      storyDescription: "A form label in error state showing error styling.",
    },
  },
};

export const CustomStyledLabel: Story = {
  render: (args) => (
    <FormLabelWrapper>
      <FormLabel {...args} className="text-lg font-bold text-blue-600">
        Custom Styled Label
      </FormLabel>
    </FormLabelWrapper>
  ),
  parameters: {
    docs: {
      storyDescription: "A form label with custom CSS styling applied.",
    },
  },
};

export const LongLabel: Story = {
  render: (args) => (
    <FormLabelWrapper>
      <FormLabel {...args}>
        This is a very long label that demonstrates how the component handles
        longer text content
      </FormLabel>
    </FormLabelWrapper>
  ),
  parameters: {
    docs: {
      storyDescription:
        "A form label with long text content to test text wrapping behavior.",
    },
  },
};

export const RequiredWithError: Story = {
  render: (args) => (
    <FormLabelWrapper hasError>
      <FormLabel {...args} required>
        Required Field with Error
      </FormLabel>
    </FormLabelWrapper>
  ),
  parameters: {
    docs: {
      storyDescription: "A required form label that also has an error state.",
    },
  },
};

export const MultipleLabels: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        field1: "",
        field2: "",
        field3: "",
      },
    });

    React.useEffect(() => {
      form.setError("field2", {
        type: "manual",
        message: "This field has an error",
      });
    }, [form]);

    return (
      <FormProvider {...form}>
        <div className="space-y-4 w-80">
          <FormField
            control={form.control}
            name="field1"
            render={() => (
              <FormItem>
                <FormLabel>Normal Label</FormLabel>
                <FormControl>
                  <Input placeholder="Normal field" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="field2"
            render={() => (
              <FormItem>
                <FormLabel>Label with Error</FormLabel>
                <FormControl>
                  <Input placeholder="Field with error" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="field3"
            render={() => (
              <FormItem>
                <FormLabel required>Required Label</FormLabel>
                <FormControl>
                  <Input placeholder="Required field" />
                </FormControl>
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
        "Multiple form labels showing different states side by side.",
    },
  },
};
