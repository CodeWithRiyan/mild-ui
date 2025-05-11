// packages/react/src/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'React/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    asChild: {
      control: 'boolean',
      description: 'Whether to render the button as a child component',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// Base story with default values
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

// Variant stories
export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
  },
};

// Size stories
export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
};

export const Icon: Story = {
  args: {
    children: '×',
    size: 'icon',
    'aria-label': 'Close',
  },
};

// State stories
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};