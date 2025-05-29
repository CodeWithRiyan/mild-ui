import { yupResolver } from '@hookform/resolvers/yup';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@mild-ui/react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

const meta = {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile checkbox component with multiple sizes and states.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    className: { control: false },
    id: { control: 'text' },
    onCheckedChange: { control: false, action: 'checked changed' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    label: 'Accept terms and conditions',
  },
} satisfies Story;

export const Checked = {
  args: {
    label: 'Receive newsletter',
    checked: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    label: 'Disabled option',
    disabled: true,
    checked: false,
  },
} satisfies Story;

export const Indeterminate = {
  args: {
    label: 'Partial selection',
    indeterminate: true,
  },
} satisfies Story;

export const WithDifferentSizes = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox" size="md" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
  ),
} satisfies Story;

export const ControlledCheckbox = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label={`Controlled checkbox (${checked ? 'checked' : 'unchecked'})`}
        checked={checked}
        onCheckedChange={(val: any) => setChecked(val === true)}
      />
    );
  },
} satisfies Story;

export const UncontrolledCheckbox = {
  render: () => (
    <Checkbox
      label="Uncontrolled checkbox"
      defaultChecked={true}
      onCheckedChange={(val: any) => console.log('checked changed:', val)}
    />
  ),
} satisfies Story;

export const ToggleableIndeterminate = {
  render: () => {
    const [state, setState] = useState<boolean | 'indeterminate'>('indeterminate');

    const handleToggle = () => {
      if (state === 'indeterminate') setState(true);
      else if (state === true) setState(false);
      else setState('indeterminate');
    };

    return (
      <Checkbox
        label={`State: ${String(state)}`}
        checked={state === 'indeterminate' ? false : state}
        indeterminate={state === 'indeterminate'}
        onCheckedChange={handleToggle}
      />
    );
  },
} satisfies Story;

export const ReactHookFormWithYup = {
  render: () => {
    const schema = yup.object({
      terms: yup
        .boolean()
        .required()
        .oneOf([true], 'You must accept the terms and conditions'),
      newsletter: yup.boolean().required(),
      marketing: yup.boolean().required(),
    });

    type FormData = yup.InferType<typeof schema>;

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        terms: false,
        newsletter: false,
        marketing: false,
      },
    });

    const onSubmit = (data: FormData) => {
      alert(`Submitted:\nTerms: ${data.terms}\nNewsletter: ${data.newsletter}\nMarketing: ${data.marketing}`);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
        <div>
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="I accept the terms and conditions *"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          {errors.terms && (
            <p className="text-sm text-red-600 mt-1">{errors.terms.message}</p>
          )}
        </div>
        
        <div>
          <Controller
            name="newsletter"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="Subscribe to newsletter"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
        
        <div>
          <Controller
            name="marketing"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="Receive marketing emails"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
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

export const CheckboxGroup = {
  render: () => {
    const schema = yup.object({
      selectedItems: yup
        .array(yup.string().required())
        .required()
        .min(1, 'Please select at least one option'),
    });

    type FormData = yup.InferType<typeof schema>;

    const {
      watch,
      setValue,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        selectedItems: [],
      },
    });

    const selectedItems = watch('selectedItems') ?? [];

    const handleCheckboxChange = (value: string, checked: boolean) => {
      if (checked) {
        setValue('selectedItems', [...selectedItems, value]);
      } else {
        setValue('selectedItems', selectedItems.filter(item => item !== value));
      }
    };

    const onSubmit = (data: FormData) => {
      alert(`Selected: ${data.selectedItems.join(', ')}`);
    };

    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' },
    ];

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
        <div>
          <p className="text-sm font-medium mb-2">Choose your preferences:</p>
          <div className="space-y-2">
            {options.map((option) => (
              <Checkbox
                key={option.value}
                label={option.label}
                checked={selectedItems.includes(option.value)}
                onCheckedChange={(checked) => 
                  handleCheckboxChange(option.value, checked === true)
                }
              />
            ))}
          </div>
          {errors.selectedItems && (
            <p className="text-sm text-red-600 mt-1">{errors.selectedItems.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="px-3 py-1 rounded bg-green-600 text-white text-sm"
        >
          Submit Selection
        </button>
      </form>
    );
  },
} satisfies Story;

export const IndeterminateParentChild = {
  render: () => {
    const [parentChecked, setParentChecked] = useState<boolean | 'indeterminate'>('indeterminate');
    const [childrenChecked, setChildrenChecked] = useState([false, true, false]);

    const handleParentChange = () => {
      if (parentChecked === true) {
        // Uncheck all
        setChildrenChecked([false, false, false]);
        setParentChecked(false);
      } else {
        // Check all
        setChildrenChecked([true, true, true]);
        setParentChecked(true);
      }
    };

    const handleChildChange = (index: number, checked: boolean) => {
      const newChildren = [...childrenChecked];
      newChildren[index] = checked;
      setChildrenChecked(newChildren);

      // Update parent state
      const checkedCount = newChildren.filter(Boolean).length;
      if (checkedCount === 0) {
        setParentChecked(false);
      } else if (checkedCount === newChildren.length) {
        setParentChecked(true);
      } else {
        setParentChecked('indeterminate');
      }
    };

    return (
      <div className="space-y-3 w-80">
        <div>
          <Checkbox
            label="Select All Features"
            checked={parentChecked === 'indeterminate' ? false : parentChecked}
            indeterminate={parentChecked === 'indeterminate'}
            onCheckedChange={handleParentChange}
            size="lg"
          />
        </div>
        
        <div className="ml-6 space-y-2">
          {['Dark Mode', 'Notifications', 'Auto-save'].map((feature, index) => (
            <Checkbox
              key={feature}
              label={feature}
              checked={childrenChecked[index]}
              onCheckedChange={(checked) => handleChildChange(index, checked === true)}
            />
          ))}
        </div>
      </div>
    );
  },
} satisfies Story;