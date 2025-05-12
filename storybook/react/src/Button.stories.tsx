import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test'; // Import fn from @storybook/test
import { Button } from '@mild-ui/react';
import { Plus, ArrowRight } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Button Text',
    onClick: fn(), // Use fn() instead of relying on argTypesRegex
  },
};

export const WithIcons: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Button with Icons',
    leadingIcon: <Plus size={16} />,
    trailingIcon: <ArrowRight size={16} />,
    onClick: fn(), // Use fn() instead of relying on argTypesRegex
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Disabled Button',
    disabled: true,
    onClick: fn(), // Use fn() instead of relying on argTypesRegex
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="small" onClick={fn()}>Small</Button>
      <Button size="medium" onClick={fn()}>Medium</Button>
      <Button size="large" onClick={fn()}>Large</Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button variant="primary" onClick={fn()}>Primary</Button>
      <Button variant="secondary" onClick={fn()}>Secondary</Button>
      <Button variant="outline" onClick={fn()}>Outline</Button>
      <Button variant="ghost" onClick={fn()}>Ghost</Button>
    </div>
  ),
};