import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{c as j,a as l,o as N}from"./index.esm-CDmTEbLs.js";import{r as w}from"./index-B2-qRKKC.js";import{u as F,F as D}from"./index.esm-B5r5kaiW.js";import{S as a}from"./Switch-CypNhvbX.js";import{F as d}from"./Form-6r68mTog.js";import{B}from"./Button-tFE5omYn.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-ChlNXIGl.js";import"./index-Bagf71Y5.js";import"./cn-Dtjc6EhN.js";import"./Label-Dk0OgnlF.js";const W={title:"Components/Switch",tags:["autodocs"],component:a,parameters:{layout:"centered",docs:{description:{component:"A versatile switch component with multiple sizes and states, perfect for toggling settings."}}},argTypes:{size:{control:{type:"radio"},options:["sm","md","lg"]},checked:{control:"boolean"},defaultChecked:{control:"boolean"},disabled:{control:"boolean"},required:{control:"boolean"},indeterminate:{control:"boolean"},label:{control:"text"},name:{control:"text"},value:{control:"text"},className:{control:!1},id:{control:"text"},onCheckedChange:{control:!1,action:"checked changed"}}},h={args:{label:"Enable notifications"}},m={args:{label:"Dark mode enabled",checked:!0}},u={args:{label:"Disabled setting",disabled:!0,checked:!1}},g={args:{label:"Disabled but checked",disabled:!0,checked:!0}},p={args:{checked:!1}},b={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(a,{label:"Small switch",size:"sm"}),e.jsx(a,{label:"Medium switch",size:"md"}),e.jsx(a,{label:"Large switch",size:"lg"})]})},f={render:()=>{const[s,r]=w.useState(!1);return e.jsx(a,{label:`Controlled switch (${s?"on":"off"})`,checked:s,onCheckedChange:t=>r(t===!0)})}},k={render:()=>e.jsx(a,{label:"Uncontrolled switch",defaultChecked:!0,onCheckedChange:s=>console.log("switch changed:",s)})},S={render:()=>{const[s,r]=w.useState({notifications:!0,darkMode:!1,autoSave:!0,analytics:!1,marketing:!1}),t=(n,c)=>{r(o=>({...o,[n]:c}))};return e.jsxs("div",{className:"space-y-4 w-80 p-4 border rounded-lg",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Application Settings"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"Push notifications",checked:s.notifications,onCheckedChange:n=>t("notifications",n===!0)}),e.jsx(a,{label:"Dark mode",checked:s.darkMode,onCheckedChange:n=>t("darkMode",n===!0)}),e.jsx(a,{label:"Auto-save documents",checked:s.autoSave,onCheckedChange:n=>t("autoSave",n===!0)}),e.jsx(a,{label:"Usage analytics",checked:s.analytics,onCheckedChange:n=>t("analytics",n===!0)}),e.jsx(a,{label:"Marketing emails",checked:s.marketing,onCheckedChange:n=>t("marketing",n===!0),disabled:!0})]}),e.jsxs("div",{className:"mt-6 p-3 bg-gray-50 rounded text-sm",children:[e.jsx("strong",{children:"Current Settings:"}),e.jsx("pre",{className:"mt-1 text-xs",children:JSON.stringify(s,null,2)})]})]})}},C={render:()=>{const s=j({terms:l().required().oneOf([!0],"You must accept the terms and conditions"),newsletter:l().required(),notifications:l().required(),marketing:l().required()}),r=F({resolver:N(s),defaultValues:{terms:!1,newsletter:!0,notifications:!1,marketing:!1}}),t=n=>{alert(`Submitted:
Terms: ${n.terms}
Newsletter: ${n.newsletter}
Notifications: ${n.notifications}
Marketing: ${n.marketing}`)};return e.jsx(D,{...r,children:e.jsxs("form",{onSubmit:r.handleSubmit(t),className:"space-y-4 w-80",children:[e.jsx(d,{name:"terms",isBoolean:!0,children:e.jsx(a,{label:"I accept the terms and conditions",required:!0})}),e.jsx(d,{name:"newsletter",isBoolean:!0,children:e.jsx(a,{label:"Subscribe to newsletter"})}),e.jsx(d,{name:"notifications",isBoolean:!0,children:e.jsx(a,{label:"Enable push notifications"})}),e.jsx(d,{name:"marketing",isBoolean:!0,children:e.jsx(a,{label:"Receive marketing communications"})}),e.jsx(B,{type:"submit",children:"Save Preferences"})]})})}},v={render:()=>{const[s,r]=w.useState({highContrast:!1,reduceMotion:!1,largeText:!1,screenReader:!0}),t=(n,c)=>{r(o=>({...o,[n]:c}))};return e.jsxs("div",{className:"space-y-4 w-80 p-4 border rounded-lg",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Accessibility Settings"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"High contrast mode",checked:s.highContrast,onCheckedChange:n=>t("highContrast",n===!0),size:"lg"}),e.jsx(a,{label:"Reduce motion",checked:s.reduceMotion,onCheckedChange:n=>t("reduceMotion",n===!0),size:"lg"}),e.jsx(a,{label:"Large text",checked:s.largeText,onCheckedChange:n=>t("largeText",n===!0),size:"lg"}),e.jsx(a,{label:"Screen reader optimizations",checked:s.screenReader,onCheckedChange:n=>t("screenReader",n===!0),size:"lg",disabled:!0})]}),e.jsx("p",{className:"text-xs text-gray-600 mt-4",children:"These settings help improve accessibility for users with different needs."})]})}},x={render:()=>{const[s,r]=w.useState({camera:!0,microphone:!1,location:!0,notifications:!1,contacts:!1}),t=(o,i)=>{r(y=>({...y,[o]:i}))},n=Object.values(s).every(Boolean),c=Object.values(s).some(Boolean);return e.jsxs("div",{className:"space-y-4 w-80 p-4 border rounded-lg",children:[e.jsxs("div",{className:"flex justify-between items-center pb-3 border-b",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"App Permissions"}),e.jsx(a,{checked:n,onCheckedChange:o=>{const i=o===!0;r({camera:i,microphone:i,location:i,notifications:i,contacts:i})},label:n?"Disable All":"Enable All"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{label:"Camera access",checked:s.camera,onCheckedChange:o=>t("camera",o===!0)}),e.jsx(a,{label:"Microphone access",checked:s.microphone,onCheckedChange:o=>t("microphone",o===!0)}),e.jsx(a,{label:"Location access",checked:s.location,onCheckedChange:o=>t("location",o===!0)}),e.jsx(a,{label:"Push notifications",checked:s.notifications,onCheckedChange:o=>t("notifications",o===!0)}),e.jsx(a,{label:"Contacts access",checked:s.contacts,onCheckedChange:o=>t("contacts",o===!0)})]}),e.jsx("div",{className:"text-xs text-gray-600 mt-4",children:n?"All permissions enabled":c?`${Object.values(s).filter(Boolean).length} permissions enabled`:"No permissions enabled"})]})}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
          <pre className="mt-1 text-xs">
            {JSON.stringify(settings, null, 2)}
          </pre>
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
          These settings help improve accessibility for users with different
          needs.
        </p>
      </div>;
  }
} satisfies Story`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
} satisfies Story`,...x.parameters?.docs?.source}}};const H=["Default","Checked","Disabled","DisabledChecked","WithoutLabel","WithDifferentSizes","ControlledSwitch","UncontrolledSwitch","SettingsPanel","ReactHookFormWithYup","AccessibilityDemo","SwitchGroup"];export{v as AccessibilityDemo,m as Checked,f as ControlledSwitch,h as Default,u as Disabled,g as DisabledChecked,C as ReactHookFormWithYup,S as SettingsPanel,x as SwitchGroup,k as UncontrolledSwitch,b as WithDifferentSizes,p as WithoutLabel,H as __namedExportsOrder,W as default};
