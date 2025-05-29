import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@mild-ui/react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const meta = {
  title: 'Components/Input',
  tags: ['autodocs'],
  component: Input,
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
    },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'filled', 'outline', 'ghost'],
    },
    fullWidth: { control: 'boolean' },
    className: { control: false },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    placeholder: 'Enter text...',
  },
} satisfies Story;

export const Disabled = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
} satisfies Story;

export const WithError = {
  args: {
    placeholder: 'Input with error',
    error: true,
  },
} satisfies Story;

export const FullWidth = {
  args: {
    placeholder: 'Full width input',
    fullWidth: true,
  },
} satisfies Story;

export const Sizes = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Input placeholder="Small" size="sm" />
      <Input placeholder="Medium" size="md" />
      <Input placeholder="Large" size="lg" />
    </div>
  ),
} satisfies Story;

export const Variants = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Input placeholder="Default" variant="default" />
      <Input placeholder="Filled" variant="filled" />
      <Input placeholder="Outline" variant="outline" />
      <Input placeholder="Ghost" variant="ghost" />
    </div>
  ),
} satisfies Story;

export const ControlledInput = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        placeholder="Type here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
} satisfies Story;

export const UncontrolledInput = {
  render: () => (
    <Input
      placeholder="Uncontrolled input"
      defaultValue="Initial value"
      onChange={(e) => console.log('value changed:', e.target.value)}
    />
  ),
} satisfies Story;

export const ReactHookFormWithYup = {
  render: () => {
    const schema = yup.object({
      name: yup.string().required('Name is required'),
      email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    });

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = (data: { name: string; email: string }) => {
      alert(`Submitted:\nName: ${data.name}\nEmail: ${data.email}`);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
        <div>
          <Input
            placeholder="Full name"
            {...register('name')}
            error={Boolean(errors.name)}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email address"
            {...register('email')}
            error={Boolean(errors.email)}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-3 py-1 rounded bg-green-600 text-white text-sm"
        >
          Submit
        </button>
      </form>
    );
  },
} satisfies Story;