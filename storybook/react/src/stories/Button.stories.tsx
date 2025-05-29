import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@mild-ui/react';
import { useState } from 'react';

// Mock icons for demonstration
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LoadingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spin">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
    <path d="m12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" className="opacity-75"/>
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and icon support.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default = {
  args: {
    children: 'Button',
  },
} satisfies Story;

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
} satisfies Story;

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
} satisfies Story;

export const Outline = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
} satisfies Story;

export const Ghost = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
} satisfies Story;

export const Disabled = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
} satisfies Story;

export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
} satisfies Story;

export const AllSizes = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">Small</Button>
        <Button variant="outline" size="md">Medium</Button>
        <Button variant="outline" size="lg">Large</Button>
      </div>
    </div>
  ),
} satisfies Story;

export const WithLeadingIcon = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button leadingIcon={<PlusIcon />}>Add Item</Button>
      <Button variant="secondary" leadingIcon={<DownloadIcon />}>Download</Button>
      <Button variant="outline" leadingIcon={<ChevronRightIcon />}>Continue</Button>
    </div>
  ),
} satisfies Story;

export const WithTrailingIcon = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button trailingIcon={<ChevronRightIcon />}>Next</Button>
      <Button variant="secondary" trailingIcon={<DownloadIcon />}>Export</Button>
      <Button variant="outline" trailingIcon={<ChevronRightIcon />}>Learn More</Button>
    </div>
  ),
} satisfies Story;

export const WithBothIcons = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button 
        leadingIcon={<PlusIcon />} 
        trailingIcon={<ChevronRightIcon />}
      >
        Add & Continue
      </Button>
      <Button 
        variant="outline"
        leadingIcon={<DownloadIcon />} 
        trailingIcon={<ChevronRightIcon />}
      >
        Download & Next
      </Button>
    </div>
  ),
} satisfies Story;

export const LoadingStates = {
  render: () => {
    const [loading, setLoading] = useState<string | null>(null);

    const handleClick = (buttonId: string) => {
      setLoading(buttonId);
      setTimeout(() => setLoading(null), 2000);
    };

    return (
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() => handleClick('primary')}
          disabled={loading === 'primary'}
          leadingIcon={loading === 'primary' ? <LoadingIcon /> : undefined}
        >
          {loading === 'primary' ? 'Processing...' : 'Submit'}
        </Button>
        
        <Button
          variant="secondary"
          onClick={() => handleClick('secondary')}
          disabled={loading === 'secondary'}
          leadingIcon={loading === 'secondary' ? <LoadingIcon /> : <DownloadIcon />}
        >
          {loading === 'secondary' ? 'Downloading...' : 'Download'}
        </Button>
        
        <Button
          variant="outline"
          onClick={() => handleClick('outline')}
          disabled={loading === 'outline'}
          trailingIcon={loading === 'outline' ? <LoadingIcon /> : <ChevronRightIcon />}
        >
          {loading === 'outline' ? 'Loading...' : 'Continue'}
        </Button>
      </div>
    );
  },
} satisfies Story;

export const AsChild = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button asChild>
        <a href="#" role="button">Link as Button</a>
      </Button>
      <Button variant="outline" asChild>
        <a href="#external" target="_blank" rel="noopener noreferrer" role="button">
          External Link
        </a>
      </Button>
    </div>
  ),
} satisfies Story;

export const ClickHandlers = {
  render: () => {
    const [clickCount, setClickCount] = useState(0);
    const [lastClicked, setLastClicked] = useState<string>('');

    const handleClick = (buttonName: string) => {
      setClickCount(prev => prev + 1);
      setLastClicked(buttonName);
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => handleClick('Primary')}>
            Primary Action
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => handleClick('Secondary')}
          >
            Secondary Action
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleClick('Outline')}
            leadingIcon={<PlusIcon />}
          >
            Add Item
          </Button>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>Total clicks: {clickCount}</p>
          <p>Last clicked: {lastClicked || 'None'}</p>
        </div>
      </div>
    );
  },
} satisfies Story;

export const ButtonGroup = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Action Group</h3>
        <div className="flex gap-2">
          <Button size="sm">Save</Button>
          <Button variant="outline" size="sm">Cancel</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Navigation</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">← Previous</Button>
          <Button size="sm">Next →</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Toolbar</h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" leadingIcon={<PlusIcon />}>
            New
          </Button>
          <Button variant="ghost" size="sm" leadingIcon={<DownloadIcon />}>
            Export
          </Button>
          <Button variant="ghost" size="sm">
            Settings
          </Button>
        </div>
      </div>
    </div>
  ),
} satisfies Story;

export const ResponsiveButtons = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <Button className="w-full">Full Width Button</Button>
      <Button variant="outline" className="w-full" leadingIcon={<DownloadIcon />}>
        Full Width with Icon
      </Button>
      <div className="flex gap-2">
        <Button className="flex-1">Flexible</Button>
        <Button variant="outline" className="flex-1">Flexible</Button>
      </div>
    </div>
  ),
} satisfies Story;
