import type { Meta, StoryObj } from "@storybook/vue3";
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputPassword,
  Select,
  Switch,
} from "@mild-ui/vue";
import { computed, reactive, ref } from "vue";

const meta: Meta<typeof FormField> = {
  title: "Components/Form",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form field wiring with no form-library dependency. `FormField` links a control to its label, description and error message through `@mild-ui/primitives/field` (`for` / `aria-labelledby`, `aria-describedby`, `aria-invalid`). Validation state comes in through the `error` prop, so plain Vue state or any form library can drive it.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    description: { control: "text" },
    error: { control: "text" },
    required: { control: "boolean" },
    hideError: { control: "boolean" },
    name: { control: "text" },
  },
  args: { name: "email", label: "Email", description: "We never share it" },
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: (args) => ({
    components: { FormField, Input },
    setup: () => ({ args }),
    template: `
      <div class="w-72">
        <FormField v-bind="args"><Input type="email" /></FormField>
      </div>
    `,
  }),
};

export const WithError: Story = {
  args: { error: "Enter a valid email address", required: true },
  render: Default.render,
};

export const EveryControl: Story = {
  name: "Every control",
  render: () => ({
    components: { Form, FormField, Input, InputPassword, Checkbox, Switch, Select, Button },
    template: `
      <Form class="w-80" @submit.prevent>
        <FormField name="email" label="Email" description="Work address" required>
          <Input type="email" />
        </FormField>
        <FormField name="password" label="Password" error="At least 8 characters">
          <InputPassword />
        </FormField>
        <FormField name="country" label="Country">
          <Select :options="[{ value: 'mx', label: 'Mexico' }, { value: 'ca', label: 'Canada' }]" placeholder="Pick one" full-width />
        </FormField>
        <FormField name="terms" label="I accept the terms" required>
          <Checkbox />
        </FormField>
        <FormField name="newsletter" label="Send me the newsletter" description="Once a month">
          <Switch />
        </FormField>
        <Button type="submit">Sign up</Button>
      </Form>
    `,
  }),
};

export const PlainVueState: Story = {
  name: "Validation with plain Vue state",
  render: () => ({
    components: { Form, FormField, Input, Checkbox, Button },
    setup() {
      const values = reactive({ email: "", terms: false });
      const submitted = ref(false);
      const errors = computed(() => ({
        email: submitted.value && !values.email.includes("@") ? "Enter a valid email" : undefined,
        terms: submitted.value && !values.terms ? "You must accept the terms" : undefined,
      }));
      const ok = computed(() => submitted.value && !errors.value.email && !errors.value.terms);
      return { values, submitted, errors, ok };
    },
    template: `
      <Form class="w-80" novalidate @submit.prevent="submitted = true">
        <FormField name="email" label="Email" :error="errors.email" required>
          <Input v-model="values.email" type="email" />
        </FormField>
        <FormField name="terms" label="I accept the terms" :error="errors.terms" required>
          <Checkbox v-model="values.terms" />
        </FormField>
        <Button type="submit">Sign up</Button>
        <output v-if="ok" class="text-sm">Submitted {{ values.email }}</output>
      </Form>
    `,
  }),
};

export const ComposedByHand: Story = {
  name: "Composed from parts",
  render: () => ({
    components: { FormItem, FormLabel, FormControl, FormDescription, FormMessage, Input },
    template: `
      <div class="w-72">
        <FormItem name="age" error="Must be a number">
          <FormLabel>Age</FormLabel>
          <FormControl><Input inputmode="numeric" /></FormControl>
          <FormDescription>In years</FormDescription>
          <FormMessage />
        </FormItem>
      </div>
    `,
  }),
};
