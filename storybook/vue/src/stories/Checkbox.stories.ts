import type { Meta, StoryObj } from "@storybook/vue3";
import { Checkbox } from "@mild-ui/vue";
import { computed, ref } from "vue";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tri-state checkbox driven by `@mild-ui/primitives/checkbox`: Space toggles it, Enter is left to the form, and a mixed (indeterminate) checkbox resolves to checked, per the [WAI-ARIA APG checkbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/). Keyboard tests: `packages/vue/src/components/Checkbox/Checkbox.test.ts`.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    modelValue: { control: "select", options: [true, false, "indeterminate"] },
    defaultChecked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    id: { control: "text" },
    "onUpdate:modelValue": { action: "update:modelValue" },
    onChange: { action: "change" },
  },
  args: {
    label: "Accept terms and conditions",
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup: () => ({ args }),
    template: '<Checkbox id="terms" v-bind="args" />',
  }),
};

export const Checked: Story = {
  args: { label: "Receive newsletter", defaultChecked: true },
  render: Default.render,
};

export const Indeterminate: Story = {
  args: { label: "Select all", indeterminate: true },
  render: Default.render,
};

export const Disabled: Story = {
  args: { label: "Disabled option", disabled: true },
  render: Default.render,
};

export const Sizes: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div class="flex flex-col gap-3">
        <Checkbox id="sm" size="sm" label="Small" />
        <Checkbox id="md" size="md" label="Medium" default-checked />
        <Checkbox id="lg" size="lg" label="Large" />
      </div>
    `,
  }),
};

export const SelectAll: Story = {
  name: "Select all (parent/child)",
  render: () => ({
    components: { Checkbox },
    setup() {
      const items = ref([
        { id: "mail", label: "Email", checked: true },
        { id: "sms", label: "SMS", checked: false },
        { id: "push", label: "Push", checked: false },
      ]);
      const all = computed<boolean | "indeterminate">(() => {
        const checked = items.value.filter((item) => item.checked).length;
        return checked === 0 ? false : checked === items.value.length ? true : "indeterminate";
      });
      const setAll = (value: boolean | "indeterminate") => {
        for (const item of items.value) item.checked = value === true;
      };
      return { items, all, setAll };
    },
    template: `
      <div class="flex flex-col gap-3">
        <Checkbox id="all" label="Notifications" :model-value="all" @update:model-value="setAll" />
        <div class="flex flex-col gap-2 pl-6">
          <Checkbox v-for="item in items" :key="item.id" :id="item.id" v-model="item.checked" :label="item.label" />
        </div>
      </div>
    `,
  }),
};

export const InAForm: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const submitted = ref<string | null>(null);
      const onSubmit = (event: Event) => {
        const data = new FormData(event.target as HTMLFormElement);
        submitted.value = JSON.stringify(Object.fromEntries(data));
      };
      return { submitted, onSubmit };
    },
    template: `
      <form class="flex flex-col gap-3" @submit.prevent="onSubmit">
        <Checkbox id="terms" name="terms" value="accepted" label="I accept the terms" required />
        <button type="submit" class="mild-button mild-button--primary mild-button--solid mild-button--md">Submit</button>
        <output v-if="submitted" class="text-sm">{{ submitted }}</output>
      </form>
    `,
  }),
};
