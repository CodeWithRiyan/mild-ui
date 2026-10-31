<!-- apps/playground-vue/src/App.vue -->
<!-- One page that exercises every public component of @mild-ui/vue, with no form library: the
     form is native (FormData) and validation state is plain reactive state. -->
<script setup lang="ts">
import { ref } from "vue";
import {
  Box,
  Breadcrumb,
  Button,
  ButtonGroup,
  Checkbox,
  CloseButton,
  Flex,
  Form,
  FormField,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputPassword,
  InputRightElement,
  Label,
  Radio,
  SegmentedControl,
  Select,
  Switch,
  Text,
  Textarea,
  ToastProvider,
  useColorMode,
} from "@mild-ui/vue";
import DataDisplayShowcase from "./sections/DataDisplayShowcase.vue";
import FeedbackShowcase from "./sections/FeedbackShowcase.vue";
import LayoutShowcase from "./sections/LayoutShowcase.vue";
import OverlayShowcase from "./sections/OverlayShowcase.vue";
import ToolbarShowcase from "./sections/ToolbarShowcase.vue";
import TypographyShowcase from "./sections/TypographyShowcase.vue";

interface SignUpValues {
  fullName: string;
  email: string;
  website: string;
  bio: string;
  password: string;
  plan: string;
  billing: string;
  contact: string;
  newsletter: boolean;
  terms: boolean;
}

type Errors = Partial<Record<keyof SignUpValues, string>>;

const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise" },
];

const billingCycles = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const contactChannels = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "post", label: "Post", disabled: true },
];

const breadcrumbs = [
  { label: "mild-ui", href: "#" },
  { label: "Playground", href: "#" },
  { label: "Vue" },
];

function validate(values: SignUpValues): Errors {
  const errors: Errors = {};
  if (!values.fullName.trim()) errors.fullName = "Enter your name";
  if (!values.email.includes("@")) errors.email = "Enter a valid email";
  if (values.password.length < 8) errors.password = "Use at least 8 characters";
  if (!values.terms) errors.terms = "You must accept the terms";
  return errors;
}

const { resolvedColorMode, toggleColorMode, isDark } = useColorMode();
const errors = ref<Errors>({});
const submitted = ref<SignUpValues | null>(null);
const form = ref<HTMLFormElement | null>(null);

function handleSubmit(event: Event): void {
  const data = new FormData(event.currentTarget as HTMLFormElement);
  const values: SignUpValues = {
    fullName: String(data.get("fullName") ?? ""),
    email: String(data.get("email") ?? ""),
    website: String(data.get("website") ?? ""),
    bio: String(data.get("bio") ?? ""),
    password: String(data.get("password") ?? ""),
    plan: String(data.get("plan") ?? ""),
    billing: String(data.get("billing") ?? ""),
    contact: String(data.get("contact") ?? ""),
    newsletter: data.get("newsletter") !== null,
    terms: data.get("terms") !== null,
  };
  const nextErrors = validate(values);
  errors.value = nextErrors;
  submitted.value = Object.keys(nextErrors).length === 0 ? values : null;
}

function handleReset(): void {
  form.value?.reset();
  errors.value = {};
  submitted.value = null;
}

function setForm(instance: unknown): void {
  const element = (instance as { $el?: unknown } | null)?.$el;
  form.value = element instanceof HTMLFormElement ? element : null;
}
</script>

<template>
  <ToastProvider placement="bottom-right">
    <Box class="playground" :data-color-mode="resolvedColorMode">
      <Breadcrumb :items="breadcrumbs" />

      <Box
        display="flex"
        align-items="center"
        justify-content="space-between"
        class="playground__header"
      >
        <Heading :level="1" weight="bold">mild-ui vue playground</Heading>
        <Box display="flex" align-items="center" gap="2">
          <Label for="color-mode">Dark mode</Label>
          <Switch id="color-mode" :model-value="isDark" @change="toggleColorMode" />
        </Box>
      </Box>

      <Text as="p" color="muted">
        Every component in the library is rendered below on a single form page.
      </Text>

      <TypographyShowcase />
      <ToolbarShowcase />
      <FeedbackShowcase />
      <OverlayShowcase />
      <DataDisplayShowcase />
      <LayoutShowcase />

      <Box class="playground__card">
        <Form :ref="setForm" novalidate @submit.prevent="handleSubmit">
          <FormField
            name="fullName"
            label="Full name"
            description="Shown on your profile."
            required
            :error="errors.fullName"
          >
            <Input placeholder="Ada Lovelace" />
          </FormField>

          <FormField name="email" label="Email" required :error="errors.email">
            <InputGroup>
              <InputLeftElement>@</InputLeftElement>
              <Input type="email" placeholder="ada@example.com" />
            </InputGroup>
          </FormField>

          <FormField name="website" label="Website">
            <InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>
              <Input placeholder="example.com" />
              <InputRightElement interactive>
                <CloseButton size="xs" label="Clear website" />
              </InputRightElement>
            </InputGroup>
          </FormField>

          <FormField name="bio" label="Bio" description="A few lines about yourself.">
            <Textarea placeholder="I build things with..." auto-resize />
          </FormField>

          <FormField
            name="password"
            label="Password"
            description="At least 8 characters."
            :error="errors.password"
          >
            <InputPassword placeholder="••••••••" />
          </FormField>

          <FormField name="plan" label="Plan">
            <Select :options="plans" default-value="free" placeholder="Pick a plan" />
          </FormField>

          <FormField name="billing" label="Billing cycle">
            <Radio :items="billingCycles" default-value="monthly" />
          </FormField>

          <FormField name="contact" label="Preferred contact">
            <SegmentedControl :items="contactChannels" default-value="email" />
          </FormField>

          <FormField name="newsletter" label="Send me product updates">
            <Checkbox value="yes" />
          </FormField>

          <FormField name="terms" label="I accept the terms" required :error="errors.terms">
            <Checkbox value="yes" />
          </FormField>

          <Flex gap="2" wrap class="playground__actions">
            <Button type="submit">Create account</Button>
            <ButtonGroup aria-label="Secondary actions" variant="outline">
              <Button type="button" @click="handleReset">Reset</Button>
              <Button type="button" disabled>Disabled</Button>
            </ButtonGroup>
            <Button type="button" variant="ghost" loading>Saving</Button>
          </Flex>
        </Form>
      </Box>

      <Box v-if="submitted" class="playground__card playground__submitted">
        <Heading :level="2" size="lg">Submitted values</Heading>
        <Text as="p">{{ JSON.stringify(submitted, null, 2) }}</Text>
      </Box>
    </Box>
  </ToastProvider>
</template>
