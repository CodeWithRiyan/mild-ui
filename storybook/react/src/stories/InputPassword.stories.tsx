import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, InputPassword, InputPasswordProps } from '@mild-ui/react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const meta: Meta<typeof InputPassword> = {
  title: 'Components/InputPassword',
  tags: ['autodocs'],
  component: InputPassword,
  argTypes: {
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
    ui: { 
      control: { type: 'object', raw: false },
    },
  },
} satisfies Meta<typeof InputPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    placeholder: 'Password',
  },
} satisfies Story;

export const Disabled = {
  args: {
    placeholder: 'Disabled InputPassword',
    disabled: true,
  },
} satisfies Story;

export const WithError = {
  args: {
    placeholder: 'InputPassword error',
    error: true,
  },
} satisfies Story;

export const Sizes = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <InputPassword placeholder="Small" size="sm" />
      <InputPassword placeholder="Medium" size="md" />
      <InputPassword placeholder="Large" size="lg" />
    </div>
  ),
} satisfies Story;

export const Variants = {
  render: () => {
    return (
      <div className="flex flex-col gap-4 w-64">
        <InputPassword placeholder="Default" variant="default" />
        <InputPassword placeholder="Filled" variant="filled" />
        <InputPassword placeholder="Outline" variant="outline" />
        <InputPassword placeholder="Ghost" variant="ghost" />
      </div>
    )
  },
} satisfies Story;

export const IconPosition = {
  
  render: () => {
    const uiIconLeft: InputPasswordProps['ui'] = { 
      input: 'pl-10',
      buttonIcon: 'top-0 left-0'
    }

    return (
      <div className="flex flex-col gap-4 w-64">
        <InputPassword placeholder="Icon Right"  />
        <InputPassword placeholder="Icon Left" ui={uiIconLeft}
        />
      </div>
    );
  },
} satisfies Story;

export const ChangeIcon = {
  
  render: () => {
    const VisibleIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
        <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
      </svg>
    )

    const HiddenIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
        <path d="M228,175a8,8,0,0,1-10.92-3l-19-33.2A123.23,123.23,0,0,1,162,155.46l5.87,35.22a8,8,0,0,1-6.58,9.21A8.4,8.4,0,0,1,160,200a8,8,0,0,1-7.88-6.69l-5.77-34.58a133.06,133.06,0,0,1-36.68,0l-5.77,34.58A8,8,0,0,1,96,200a8.4,8.4,0,0,1-1.32-.11,8,8,0,0,1-6.58-9.21L94,155.46a123.23,123.23,0,0,1-36.06-16.69L39,172A8,8,0,1,1,25.06,164l20-35a153.47,153.47,0,0,1-19.3-20A8,8,0,1,1,38.22,99c16.6,20.54,45.64,45,89.78,45s73.18-24.49,89.78-45A8,8,0,1,1,230.22,109a153.47,153.47,0,0,1-19.3,20l20,35A8,8,0,0,1,228,175Z"></path>
      </svg>
    )

    return <InputPassword placeholder="Password" visibleIcon={<VisibleIcon />} hiddenIcon={<HiddenIcon />} />
  },
} satisfies Story;

export const ControlledInputPassword = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <InputPassword
        placeholder="Type here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
} satisfies Story;

export const UncontrolledInputPassword = {
  render: () => (
    <InputPassword
      placeholder="Uncontrolled InputPassword"
      defaultValue="Initial value"
      onChange={(e) => console.log('value changed:', e.target.value)}
    />
  ),
} satisfies Story;

export const ReactHookFormWithYup = {
  render: () => {
    const schema = yup.object({
      email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
      password: yup.string().required('Password is required'),
    });

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = (data: { email: string, password: string }) => {
      alert(`Submitted:\nEmail: ${data.email}\nPassword: ${data.password}`);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
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
        <div>
          <InputPassword
            placeholder="Password"
            {...register('password')}
            error={Boolean(errors.password)}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        <Button
          type="submit"
        >
          Submit
        </Button>
      </form>
    );
  },
} satisfies Story;