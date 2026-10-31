import{j as e}from"./jsx-runtime-DSvmvvsx.js";import{c as j,d as l,o as N}from"./index.esm-BhyIV8Ly.js";import{F as A,a as d}from"./react-hook-form-1I7SNVg-.js";import{r as x}from"./index-B0WjJBI_.js";import{u as F}from"./index.esm-CbvOEqST.js";import{S as t}from"./Switch-DspEhJtc.js";import{B as D}from"./Button-CSLSlcO9.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Form-DjjlGdbW.js";import"./cn-BaF2GUMg.js";import"./useMachine-DSGsW_My.js";import"./Label-mrk_WNRp.js";const I={title:"Components/Switch",tags:["autodocs"],component:t,parameters:{layout:"centered",docs:{description:{component:"A versatile switch component with multiple sizes and states, perfect for toggling settings. Space and Enter toggle it, per the [WAI-ARIA APG switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/). Keyboard tests: `packages/react/src/components/Switch/Switch.test.tsx`."}}},argTypes:{size:{control:{type:"radio"},options:["sm","md","lg"]},checked:{control:"boolean"},defaultChecked:{control:"boolean"},disabled:{control:"boolean"},required:{control:"boolean"},label:{control:"text"},name:{control:"text"},value:{control:"text"},className:{control:!1},id:{control:"text"},onCheckedChange:{control:!1,action:"checked changed"}}},h={args:{label:"Enable notifications"}},m={args:{label:"Dark mode enabled",checked:!0}},u={args:{label:"Disabled setting",disabled:!0,checked:!1}},g={args:{label:"Disabled but checked",disabled:!0,checked:!0}},p={args:{checked:!1}},b={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(t,{label:"Small switch",size:"sm"}),e.jsx(t,{label:"Medium switch",size:"md"}),e.jsx(t,{label:"Large switch",size:"lg"})]})},f={render:()=>{const[n,o]=x.useState(!1);return e.jsx(t,{label:`Controlled switch (${n?"on":"off"})`,checked:n,onCheckedChange:a=>o(a===!0)})}},k={render:()=>e.jsx(t,{label:"Uncontrolled switch",defaultChecked:!0,onCheckedChange:n=>console.log("switch changed:",n)})},S={render:()=>{const[n,o]=x.useState({notifications:!0,darkMode:!1,autoSave:!0,analytics:!1,marketing:!1}),a=(s,c)=>{o(r=>({...r,[s]:c}))};return e.jsxs("div",{className:"space-y-4 w-80 p-4 border rounded-lg",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Application Settings"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{label:"Push notifications",checked:n.notifications,onCheckedChange:s=>a("notifications",s===!0)}),e.jsx(t,{label:"Dark mode",checked:n.darkMode,onCheckedChange:s=>a("darkMode",s===!0)}),e.jsx(t,{label:"Auto-save documents",checked:n.autoSave,onCheckedChange:s=>a("autoSave",s===!0)}),e.jsx(t,{label:"Usage analytics",checked:n.analytics,onCheckedChange:s=>a("analytics",s===!0)}),e.jsx(t,{label:"Marketing emails",checked:n.marketing,onCheckedChange:s=>a("marketing",s===!0),disabled:!0})]}),e.jsxs("div",{className:"mt-6 p-3 bg-gray-50 rounded text-sm",children:[e.jsx("strong",{children:"Current Settings:"}),e.jsx("pre",{className:"mt-1 text-xs",children:JSON.stringify(n,null,2)})]})]})}},C={render:()=>{const n=j({terms:l().required().oneOf([!0],"You must accept the terms and conditions"),newsletter:l().required(),notifications:l().required(),marketing:l().required()}),o=F({resolver:N(n),defaultValues:{terms:!1,newsletter:!0,notifications:!1,marketing:!1}}),a=s=>{alert(`Submitted:
Terms: ${s.terms}
Newsletter: ${s.newsletter}
Notifications: ${s.notifications}
Marketing: ${s.marketing}`)};return e.jsx(A,{...o,children:e.jsxs("form",{onSubmit:o.handleSubmit(a),className:"space-y-4 w-80",children:[e.jsx(d,{name:"terms",isBoolean:!0,children:e.jsx(t,{label:"I accept the terms and conditions",required:!0})}),e.jsx(d,{name:"newsletter",isBoolean:!0,children:e.jsx(t,{label:"Subscribe to newsletter"})}),e.jsx(d,{name:"notifications",isBoolean:!0,children:e.jsx(t,{label:"Enable push notifications"})}),e.jsx(d,{name:"marketing",isBoolean:!0,children:e.jsx(t,{label:"Receive marketing communications"})}),e.jsx(D,{type:"submit",children:"Save Preferences"})]})})}},v={render:()=>{const[n,o]=x.useState({highContrast:!1,reduceMotion:!1,largeText:!1,screenReader:!0}),a=(s,c)=>{o(r=>({...r,[s]:c}))};return e.jsxs("div",{className:"space-y-4 w-80 p-4 border rounded-lg",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Accessibility Settings"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{label:"High contrast mode",checked:n.highContrast,onCheckedChange:s=>a("highContrast",s===!0),size:"lg"}),e.jsx(t,{label:"Reduce motion",checked:n.reduceMotion,onCheckedChange:s=>a("reduceMotion",s===!0),size:"lg"}),e.jsx(t,{label:"Large text",checked:n.largeText,onCheckedChange:s=>a("largeText",s===!0),size:"lg"}),e.jsx(t,{label:"Screen reader optimizations",checked:n.screenReader,onCheckedChange:s=>a("screenReader",s===!0),size:"lg",disabled:!0})]}),e.jsx("p",{className:"text-xs text-gray-600 mt-4",children:"These settings help improve accessibility for users with different needs."})]})}},w={render:()=>{const[n,o]=x.useState({camera:!0,microphone:!1,location:!0,notifications:!1,contacts:!1}),a=(r,i)=>{o(y=>({...y,[r]:i}))},s=Object.values(n).every(Boolean),c=Object.values(n).some(Boolean);return e.jsxs("div",{className:"space-y-4 w-80 p-4 border rounded-lg",children:[e.jsxs("div",{className:"flex justify-between items-center pb-3 border-b",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"App Permissions"}),e.jsx(t,{checked:s,onCheckedChange:r=>{const i=r===!0;o({camera:i,microphone:i,location:i,notifications:i,contacts:i})},label:s?"Disable All":"Enable All"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{label:"Camera access",checked:n.camera,onCheckedChange:r=>a("camera",r===!0)}),e.jsx(t,{label:"Microphone access",checked:n.microphone,onCheckedChange:r=>a("microphone",r===!0)}),e.jsx(t,{label:"Location access",checked:n.location,onCheckedChange:r=>a("location",r===!0)}),e.jsx(t,{label:"Push notifications",checked:n.notifications,onCheckedChange:r=>a("notifications",r===!0)}),e.jsx(t,{label:"Contacts access",checked:n.contacts,onCheckedChange:r=>a("contacts",r===!0)})]}),e.jsx("div",{className:"text-xs text-gray-600 mt-4",children:s?"All permissions enabled":c?`${Object.values(n).filter(Boolean).length} permissions enabled`:"No permissions enabled"})]})}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Enable notifications"
  }
} satisfies Story`,...h.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Dark mode enabled",
    checked: true
  }
} satisfies Story`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Disabled setting",
    disabled: true,
    checked: false
  }
} satisfies Story`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Disabled but checked",
    disabled: true,
    checked: true
  }
} satisfies Story`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false
  }
} satisfies Story`,...p.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Switch label="Small switch" size="sm" />
      <Switch label="Medium switch" size="md" />
      <Switch label="Large switch" size="lg" />
    </div>
} satisfies Story`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Switch label={\`Controlled switch (\${checked ? "on" : "off"})\`} checked={checked} onCheckedChange={val => setChecked(val === true)} />;
  }
} satisfies Story`,...f.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <Switch label="Uncontrolled switch" defaultChecked={true} onCheckedChange={val => console.log("switch changed:", val)} />
} satisfies Story`,...k.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
      marketing: false
    });
    const handleSettingChange = (key: keyof typeof settings, value: boolean) => {
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));
    };
    return <div className="space-y-4 w-80 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Application Settings</h3>

        <div className="space-y-3">
          <Switch label="Push notifications" checked={settings.notifications} onCheckedChange={val => handleSettingChange("notifications", val === true)} />

          <Switch label="Dark mode" checked={settings.darkMode} onCheckedChange={val => handleSettingChange("darkMode", val === true)} />

          <Switch label="Auto-save documents" checked={settings.autoSave} onCheckedChange={val => handleSettingChange("autoSave", val === true)} />

          <Switch label="Usage analytics" checked={settings.analytics} onCheckedChange={val => handleSettingChange("analytics", val === true)} />

          <Switch label="Marketing emails" checked={settings.marketing} onCheckedChange={val => handleSettingChange("marketing", val === true)} disabled />
        </div>

        <div className="mt-6 p-3 bg-gray-50 rounded text-sm">
          <strong>Current Settings:</strong>
          <pre className="mt-1 text-xs">{JSON.stringify(settings, null, 2)}</pre>
        </div>
      </div>;
  }
} satisfies Story`,...S.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const schema = yup.object({
      terms: yup.boolean().required().oneOf([true], "You must accept the terms and conditions"),
      newsletter: yup.boolean().required(),
      notifications: yup.boolean().required(),
      marketing: yup.boolean().required()
    });
    type FormData = yup.InferType<typeof schema>;
    const form = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        terms: false,
        newsletter: true,
        notifications: false,
        marketing: false
      }
    });
    const onSubmit = (data: FormData) => {
      alert(\`Submitted:\\nTerms: \${data.terms}\\nNewsletter: \${data.newsletter}\\nNotifications: \${data.notifications}\\nMarketing: \${data.marketing}\`);
    };
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-80">
          <Field name="terms" isBoolean // isBoolean is required for Field that has a boolean value
        >
            <Switch label="I accept the terms and conditions" required />
          </Field>
          <Field name="newsletter" isBoolean //isBoolean is required for Field that has a boolean value
        >
            <Switch label="Subscribe to newsletter" />
          </Field>
          <Field name="notifications" isBoolean //isBoolean is required for Field that has a boolean value
        >
            <Switch label="Enable push notifications" />
          </Field>
          <Field name="marketing" isBoolean //isBoolean is required for Field that has a boolean value
        >
            <Switch label="Receive marketing communications" />
          </Field>
          <Button type="submit">Save Preferences</Button>
        </form>
      </Form>;
  }
} satisfies Story`,...C.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [switches, setSwitches] = useState({
      highContrast: false,
      reduceMotion: false,
      largeText: false,
      screenReader: true
    });
    const handleChange = (key: keyof typeof switches, value: boolean) => {
      setSwitches(prev => ({
        ...prev,
        [key]: value
      }));
    };
    return <div className="space-y-4 w-80 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Accessibility Settings</h3>

        <div className="space-y-3">
          <Switch label="High contrast mode" checked={switches.highContrast} onCheckedChange={val => handleChange("highContrast", val === true)} size="lg" />

          <Switch label="Reduce motion" checked={switches.reduceMotion} onCheckedChange={val => handleChange("reduceMotion", val === true)} size="lg" />

          <Switch label="Large text" checked={switches.largeText} onCheckedChange={val => handleChange("largeText", val === true)} size="lg" />

          <Switch label="Screen reader optimizations" checked={switches.screenReader} onCheckedChange={val => handleChange("screenReader", val === true)} size="lg" disabled />
        </div>

        <p className="text-xs text-gray-600 mt-4">
          These settings help improve accessibility for users with different needs.
        </p>
      </div>;
  }
} satisfies Story`,...v.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [permissions, setPermissions] = useState({
      camera: true,
      microphone: false,
      location: true,
      notifications: false,
      contacts: false
    });
    const handlePermissionChange = (permission: keyof typeof permissions, value: boolean) => {
      setPermissions(prev => ({
        ...prev,
        [permission]: value
      }));
    };
    const allEnabled = Object.values(permissions).every(Boolean);
    const someEnabled = Object.values(permissions).some(Boolean);
    return <div className="space-y-4 w-80 p-4 border rounded-lg">
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="text-lg font-semibold">App Permissions</h3>
          <Switch checked={allEnabled} onCheckedChange={val => {
          const newState = val === true;
          setPermissions({
            camera: newState,
            microphone: newState,
            location: newState,
            notifications: newState,
            contacts: newState
          });
        }} label={allEnabled ? "Disable All" : "Enable All"} />
        </div>

        <div className="space-y-3">
          <Switch label="Camera access" checked={permissions.camera} onCheckedChange={val => handlePermissionChange("camera", val === true)} />

          <Switch label="Microphone access" checked={permissions.microphone} onCheckedChange={val => handlePermissionChange("microphone", val === true)} />

          <Switch label="Location access" checked={permissions.location} onCheckedChange={val => handlePermissionChange("location", val === true)} />

          <Switch label="Push notifications" checked={permissions.notifications} onCheckedChange={val => handlePermissionChange("notifications", val === true)} />

          <Switch label="Contacts access" checked={permissions.contacts} onCheckedChange={val => handlePermissionChange("contacts", val === true)} />
        </div>

        <div className="text-xs text-gray-600 mt-4">
          {allEnabled ? "All permissions enabled" : someEnabled ? \`\${Object.values(permissions).filter(Boolean).length} permissions enabled\` : "No permissions enabled"}
        </div>
      </div>;
  }
} satisfies Story`,...w.parameters?.docs?.source}}};const U=["Default","Checked","Disabled","DisabledChecked","WithoutLabel","WithDifferentSizes","ControlledSwitch","UncontrolledSwitch","SettingsPanel","ReactHookFormWithYup","AccessibilityDemo","SwitchGroup"];export{v as AccessibilityDemo,m as Checked,f as ControlledSwitch,h as Default,u as Disabled,g as DisabledChecked,C as ReactHookFormWithYup,S as SettingsPanel,w as SwitchGroup,k as UncontrolledSwitch,b as WithDifferentSizes,p as WithoutLabel,U as __namedExportsOrder,I as default};
