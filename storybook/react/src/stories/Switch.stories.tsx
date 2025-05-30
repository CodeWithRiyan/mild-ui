import { yupResolver } from "@hookform/resolvers/yup";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Field, Form, Switch } from "@mild-ui/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

const meta = {
  title: "Components/Switch",
  tags: ["autodocs"],
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile switch component with multiple sizes and states, perfect for toggling settings.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    checked: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    indeterminate: { control: "boolean" },
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    className: { control: false },
    id: { control: "text" },
    onCheckedChange: { control: false, action: "checked changed" },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    label: "Enable notifications",
  },
} satisfies Story;

export const Checked = {
  args: {
    label: "Dark mode enabled",
    checked: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    label: "Disabled setting",
    disabled: true,
    checked: false,
  },
} satisfies Story;

export const DisabledChecked = {
  args: {
    label: "Disabled but checked",
    disabled: true,
    checked: true,
  },
} satisfies Story;

export const WithoutLabel = {
  args: {
    checked: false,
  },
} satisfies Story;

export const WithDifferentSizes = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Small switch" size="sm" />
      <Switch label="Medium switch" size="md" />
      <Switch label="Large switch" size="lg" />
    </div>
  ),
} satisfies Story;

export const ControlledSwitch = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        label={`Controlled switch (${checked ? "on" : "off"})`}
        checked={checked}
        onCheckedChange={(val) => setChecked(val === true)}
      />
    );
  },
} satisfies Story;

export const UncontrolledSwitch = {
  render: () => (
    <Switch
      label="Uncontrolled switch"
      defaultChecked={true}
      onCheckedChange={(val) => console.log("switch changed:", val)}
    />
  ),
} satisfies Story;

export const SettingsPanel = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
      marketing: false,
    });

    const handleSettingChange = (
      key: keyof typeof settings,
      value: boolean,
    ) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <div className="space-y-4 w-80 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Application Settings</h3>

        <div className="space-y-3">
          <Switch
            label="Push notifications"
            checked={settings.notifications}
            onCheckedChange={(val) =>
              handleSettingChange("notifications", val === true)
            }
          />

          <Switch
            label="Dark mode"
            checked={settings.darkMode}
            onCheckedChange={(val) =>
              handleSettingChange("darkMode", val === true)
            }
          />

          <Switch
            label="Auto-save documents"
            checked={settings.autoSave}
            onCheckedChange={(val) =>
              handleSettingChange("autoSave", val === true)
            }
          />

          <Switch
            label="Usage analytics"
            checked={settings.analytics}
            onCheckedChange={(val) =>
              handleSettingChange("analytics", val === true)
            }
          />

          <Switch
            label="Marketing emails"
            checked={settings.marketing}
            onCheckedChange={(val) =>
              handleSettingChange("marketing", val === true)
            }
            disabled
          />
        </div>

        <div className="mt-6 p-3 bg-gray-50 rounded text-sm">
          <strong>Current Settings:</strong>
          <pre className="mt-1 text-xs">
            {JSON.stringify(settings, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
} satisfies Story;

export const ReactHookFormWithYup = {
  render: () => {
    const schema = yup.object({
      terms: yup
        .boolean()
        .required()
        .oneOf([true], "You must accept the terms and conditions"),
      newsletter: yup.boolean().required(),
      notifications: yup.boolean().required(),
      marketing: yup.boolean().required(),
    });

    type FormData = yup.InferType<typeof schema>;

    const form = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        terms: false,
        newsletter: true,
        notifications: false,
        marketing: false,
      },
    });

    const onSubmit = (data: FormData) => {
      alert(
        `Submitted:\nTerms: ${data.terms}\nNewsletter: ${data.newsletter}\nNotifications: ${data.notifications}\nMarketing: ${data.marketing}`,
      );
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-80">
          <Field
            name="terms"
            isBoolean // isBoolean is required for Field that has a boolean value
          >
            <Switch label="I accept the terms and conditions" required />
          </Field>
          <Field
            name="newsletter"
            isBoolean //isBoolean is required for Field that has a boolean value
          >
            <Switch label="Subscribe to newsletter" />
          </Field>
          <Field
            name="notifications"
            isBoolean //isBoolean is required for Field that has a boolean value
          >
            <Switch label="Enable push notifications" />
          </Field>
          <Field
            name="marketing"
            isBoolean //isBoolean is required for Field that has a boolean value
          >
            <Switch label="Receive marketing communications" />
          </Field>
          <Button type="submit">Save Preferences</Button>
        </form>
      </Form>
    );
  },
} satisfies Story;

export const AccessibilityDemo = {
  render: () => {
    const [switches, setSwitches] = useState({
      highContrast: false,
      reduceMotion: false,
      largeText: false,
      screenReader: true,
    });

    const handleChange = (key: keyof typeof switches, value: boolean) => {
      setSwitches((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <div className="space-y-4 w-80 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Accessibility Settings</h3>

        <div className="space-y-3">
          <Switch
            label="High contrast mode"
            checked={switches.highContrast}
            onCheckedChange={(val) =>
              handleChange("highContrast", val === true)
            }
            size="lg"
          />

          <Switch
            label="Reduce motion"
            checked={switches.reduceMotion}
            onCheckedChange={(val) =>
              handleChange("reduceMotion", val === true)
            }
            size="lg"
          />

          <Switch
            label="Large text"
            checked={switches.largeText}
            onCheckedChange={(val) => handleChange("largeText", val === true)}
            size="lg"
          />

          <Switch
            label="Screen reader optimizations"
            checked={switches.screenReader}
            onCheckedChange={(val) =>
              handleChange("screenReader", val === true)
            }
            size="lg"
            disabled
          />
        </div>

        <p className="text-xs text-gray-600 mt-4">
          These settings help improve accessibility for users with different
          needs.
        </p>
      </div>
    );
  },
} satisfies Story;

export const SwitchGroup = {
  render: () => {
    const [permissions, setPermissions] = useState({
      camera: true,
      microphone: false,
      location: true,
      notifications: false,
      contacts: false,
    });

    const handlePermissionChange = (
      permission: keyof typeof permissions,
      value: boolean,
    ) => {
      setPermissions((prev) => ({ ...prev, [permission]: value }));
    };

    const allEnabled = Object.values(permissions).every(Boolean);
    const someEnabled = Object.values(permissions).some(Boolean);

    return (
      <div className="space-y-4 w-80 p-4 border rounded-lg">
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="text-lg font-semibold">App Permissions</h3>
          <Switch
            checked={allEnabled}
            onCheckedChange={(val) => {
              const newState = val === true;
              setPermissions({
                camera: newState,
                microphone: newState,
                location: newState,
                notifications: newState,
                contacts: newState,
              });
            }}
            label={allEnabled ? "Disable All" : "Enable All"}
          />
        </div>

        <div className="space-y-3">
          <Switch
            label="Camera access"
            checked={permissions.camera}
            onCheckedChange={(val) =>
              handlePermissionChange("camera", val === true)
            }
          />

          <Switch
            label="Microphone access"
            checked={permissions.microphone}
            onCheckedChange={(val) =>
              handlePermissionChange("microphone", val === true)
            }
          />

          <Switch
            label="Location access"
            checked={permissions.location}
            onCheckedChange={(val) =>
              handlePermissionChange("location", val === true)
            }
          />

          <Switch
            label="Push notifications"
            checked={permissions.notifications}
            onCheckedChange={(val) =>
              handlePermissionChange("notifications", val === true)
            }
          />

          <Switch
            label="Contacts access"
            checked={permissions.contacts}
            onCheckedChange={(val) =>
              handlePermissionChange("contacts", val === true)
            }
          />
        </div>

        <div className="text-xs text-gray-600 mt-4">
          {allEnabled
            ? "All permissions enabled"
            : someEnabled
              ? `${Object.values(permissions).filter(Boolean).length} permissions enabled`
              : "No permissions enabled"}
        </div>
      </div>
    );
  },
} satisfies Story;
