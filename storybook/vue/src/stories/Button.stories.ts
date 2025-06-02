import type { Meta, StoryObj } from "@storybook/vue3";
import { Button } from "@mild-ui/vue";
import { ref } from "vue";
import { PlusIcon, ArrowRightIcon, DownloadIcon } from "lucide-vue-next";

// Mock loading icon for demonstration
const LoadingIcon = {
  template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="animate-spin">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"/>
    <path d="m12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="4" class="opacity-75"/>
  </svg>`,
};

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component with multiple variants, sizes, and icon support for Vue.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => ({
    components: { Button },
    template: "<Button>Button</Button>",
  }),
};

export const Primary: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="primary">Primary Button</Button>',
  }),
};

export const Secondary: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="secondary">Secondary Button</Button>',
  }),
};

export const Outline: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="outline">Outline Button</Button>',
  }),
};

export const Ghost: Story = {
  render: () => ({
    components: { Button },
    template: '<Button variant="ghost">Ghost Button</Button>',
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { Button },
    template: "<Button disabled>Disabled Button</Button>",
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        <div class="flex items-center gap-4">
          <Button variant="outline" size="sm">Small</Button>
          <Button variant="outline" size="md">Medium</Button>
          <Button variant="outline" size="lg">Large</Button>
        </div>
      </div>
    `,
  }),
};

export const WithLeadingIcon: Story = {
  render: () => ({
    components: { Button, PlusIcon, DownloadIcon, ArrowRightIcon },
    template: `
      <div class="flex flex-wrap gap-4">
        <Button>
          <template #leading-icon>
            <PlusIcon />
          </template>
          Add Item
        </Button>
        <Button variant="secondary">
          <template #leading-icon>
            <DownloadIcon />
          </template>
          Download
        </Button>
        <Button variant="outline">
          <template #leading-icon>
            <ArrowRightIcon />
          </template>
          Continue
        </Button>
      </div>
    `,
  }),
};

export const WithTrailingIcon: Story = {
  render: () => ({
    components: { Button, ArrowRightIcon, DownloadIcon },
    template: `
      <div class="flex flex-wrap gap-4">
        <Button>
          Next
          <template #trailing-icon>
            <ArrowRightIcon />
          </template>
        </Button>
        <Button variant="secondary">
          Export
          <template #trailing-icon>
            <DownloadIcon />
          </template>
        </Button>
        <Button variant="outline">
          Learn More
          <template #trailing-icon>
            <ArrowRightIcon />
          </template>
        </Button>
      </div>
    `,
  }),
};

export const LoadingStates: Story = {
  render: () => ({
    components: { Button, LoadingIcon, DownloadIcon, ArrowRightIcon },
    setup() {
      const loading = ref<string | null>(null);

      const handleClick = (buttonId: string) => {
        loading.value = buttonId;
        setTimeout(() => (loading.value = null), 2000);
      };

      return { loading, handleClick };
    },
    template: `
      <div class="flex flex-wrap gap-4">
        <Button
          @click="handleClick('primary')"
          :disabled="loading === 'primary'"
        >
          <template v-if="loading === 'primary'" #leading-icon>
            <LoadingIcon />
          </template>
          {{ loading === 'primary' ? 'Processing...' : 'Submit' }}
        </Button>
        
        <Button
          variant="secondary"
          @click="handleClick('secondary')"
          :disabled="loading === 'secondary'"
        >
          <template #leading-icon>
            <LoadingIcon v-if="loading === 'secondary'" />
            <DownloadIcon v-else />
          </template>
          {{ loading === 'secondary' ? 'Downloading...' : 'Download' }}
        </Button>
        
        <Button
          variant="outline"
          @click="handleClick('outline')"
          :disabled="loading === 'outline'"
        >
          {{ loading === 'outline' ? 'Loading...' : 'Continue' }}
          <template #trailing-icon>
            <LoadingIcon v-if="loading === 'outline'" />
            <ArrowRightIcon v-else />
          </template>
        </Button>
      </div>
    `,
  }),
};

export const ClickHandlers: Story = {
  render: () => ({
    components: { Button, PlusIcon },
    setup() {
      const clickCount = ref(0);
      const lastClicked = ref("");

      const handleClick = (buttonName: string) => {
        clickCount.value++;
        lastClicked.value = buttonName;
      };

      return { clickCount, lastClicked, handleClick };
    },
    template: `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-4">
          <Button @click="handleClick('Primary')">
            Primary Action
          </Button>
          <Button variant="secondary" @click="handleClick('Secondary')">
            Secondary Action
          </Button>
          <Button variant="outline" @click="handleClick('Outline')">
            <template #leading-icon>
              <PlusIcon />
            </template>
            Add Item
          </Button>
        </div>
        
        <div class="text-sm text-gray-600">
          <p>Total clicks: {{ clickCount }}</p>
          <p>Last clicked: {{ lastClicked || 'None' }}</p>
        </div>
      </div>
    `,
  }),
};
