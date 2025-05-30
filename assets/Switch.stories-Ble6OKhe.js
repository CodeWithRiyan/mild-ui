var me=Object.defineProperty,ue=Object.defineProperties;var ge=Object.getOwnPropertyDescriptors;var D=Object.getOwnPropertySymbols;var pe=Object.prototype.hasOwnProperty,be=Object.prototype.propertyIsEnumerable;var B=(n,i,t)=>i in n?me(n,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[i]=t,e=(n,i)=>{for(var t in i||(i={}))pe.call(i,t)&&B(n,t,i[t]);if(D)for(var t of D(i))be.call(i,t)&&B(n,t,i[t]);return n},o=(n,i)=>ue(n,ge(i));import{j as l,a}from"./jsx-runtime-Cr617v10.js";import{c as fe,a as m,o as ke}from"./index.esm-8fDv6iyI.js";import{r as F}from"./index-D2dH9QXU.js";import{u as Se,F as Ce}from"./index.esm-CovI7bOW.js";import{S as r}from"./Switch-CQ-jLdZS.js";import{F as u}from"./Form-6JD4W4bJ.js";import{B as ve}from"./Button-DodV_9Wl.js";import"./_commonjsHelpers-CDgoFxsB.js";import"./index-BrWEkG-Y.js";import"./index-yjVGmfkS.js";import"./index-8BIPUTFA.js";import"./cn-C4RepMSz.js";import"./Label-BIqHYFl8.js";const Re={title:"Components/Switch",tags:["autodocs"],component:r,parameters:{layout:"centered",docs:{description:{component:"A versatile switch component with multiple sizes and states, perfect for toggling settings."}}},argTypes:{size:{control:{type:"radio"},options:["sm","md","lg"]},checked:{control:"boolean"},defaultChecked:{control:"boolean"},disabled:{control:"boolean"},required:{control:"boolean"},indeterminate:{control:"boolean"},label:{control:"text"},name:{control:"text"},value:{control:"text"},className:{control:!1},id:{control:"text"},onCheckedChange:{control:!1,action:"checked changed"}}},g={args:{label:"Enable notifications"}},p={args:{label:"Dark mode enabled",checked:!0}},b={args:{label:"Disabled setting",disabled:!0,checked:!1}},f={args:{label:"Disabled but checked",disabled:!0,checked:!0}},k={args:{checked:!1}},S={render:()=>l("div",{className:"flex flex-col gap-4",children:[a(r,{label:"Small switch",size:"sm"}),a(r,{label:"Medium switch",size:"md"}),a(r,{label:"Large switch",size:"lg"})]})},C={render:()=>{const[n,i]=F.useState(!1);return a(r,{label:`Controlled switch (${n?"on":"off"})`,checked:n,onCheckedChange:t=>i(t===!0)})}},v={render:()=>a(r,{label:"Uncontrolled switch",defaultChecked:!0,onCheckedChange:n=>console.log("switch changed:",n)})},w={render:()=>{const[n,i]=F.useState({notifications:!0,darkMode:!1,autoSave:!0,analytics:!1,marketing:!1}),t=(s,h)=>{i(c=>o(e({},c),{[s]:h}))};return l("div",{className:"space-y-4 w-80 p-4 border rounded-lg",children:[a("h3",{className:"text-lg font-semibold mb-4",children:"Application Settings"}),l("div",{className:"space-y-3",children:[a(r,{label:"Push notifications",checked:n.notifications,onCheckedChange:s=>t("notifications",s===!0)}),a(r,{label:"Dark mode",checked:n.darkMode,onCheckedChange:s=>t("darkMode",s===!0)}),a(r,{label:"Auto-save documents",checked:n.autoSave,onCheckedChange:s=>t("autoSave",s===!0)}),a(r,{label:"Usage analytics",checked:n.analytics,onCheckedChange:s=>t("analytics",s===!0)}),a(r,{label:"Marketing emails",checked:n.marketing,onCheckedChange:s=>t("marketing",s===!0),disabled:!0})]}),l("div",{className:"mt-6 p-3 bg-gray-50 rounded text-sm",children:[a("strong",{children:"Current Settings:"}),a("pre",{className:"mt-1 text-xs",children:JSON.stringify(n,null,2)})]})]})}},y={render:()=>{const n=fe({terms:m().required().oneOf([!0],"You must accept the terms and conditions"),newsletter:m().required(),notifications:m().required(),marketing:m().required()}),i=Se({resolver:ke(n),defaultValues:{terms:!1,newsletter:!0,notifications:!1,marketing:!1}}),t=s=>{alert(`Submitted:
Terms: ${s.terms}
Newsletter: ${s.newsletter}
Notifications: ${s.notifications}
Marketing: ${s.marketing}`)};return a(Ce,o(e({},i),{children:l("form",{onSubmit:i.handleSubmit(t),className:"space-y-4 w-80",children:[a(u,{name:"terms",isBoolean:!0,children:a(r,{label:"I accept the terms and conditions",required:!0})}),a(u,{name:"newsletter",isBoolean:!0,children:a(r,{label:"Subscribe to newsletter"})}),a(u,{name:"notifications",isBoolean:!0,children:a(r,{label:"Enable push notifications"})}),a(u,{name:"marketing",isBoolean:!0,children:a(r,{label:"Receive marketing communications"})}),a(ve,{type:"submit",children:"Save Preferences"})]})}))}},x={render:()=>{const[n,i]=F.useState({highContrast:!1,reduceMotion:!1,largeText:!1,screenReader:!0}),t=(s,h)=>{i(c=>o(e({},c),{[s]:h}))};return l("div",{className:"space-y-4 w-80 p-4 border rounded-lg",children:[a("h3",{className:"text-lg font-semibold mb-4",children:"Accessibility Settings"}),l("div",{className:"space-y-3",children:[a(r,{label:"High contrast mode",checked:n.highContrast,onCheckedChange:s=>t("highContrast",s===!0),size:"lg"}),a(r,{label:"Reduce motion",checked:n.reduceMotion,onCheckedChange:s=>t("reduceMotion",s===!0),size:"lg"}),a(r,{label:"Large text",checked:n.largeText,onCheckedChange:s=>t("largeText",s===!0),size:"lg"}),a(r,{label:"Screen reader optimizations",checked:n.screenReader,onCheckedChange:s=>t("screenReader",s===!0),size:"lg",disabled:!0})]}),a("p",{className:"text-xs text-gray-600 mt-4",children:"These settings help improve accessibility for users with different needs."})]})}},N={render:()=>{const[n,i]=F.useState({camera:!0,microphone:!1,location:!0,notifications:!1,contacts:!1}),t=(c,d)=>{i(he=>o(e({},he),{[c]:d}))},s=Object.values(n).every(Boolean),h=Object.values(n).some(Boolean);return l("div",{className:"space-y-4 w-80 p-4 border rounded-lg",children:[l("div",{className:"flex justify-between items-center pb-3 border-b",children:[a("h3",{className:"text-lg font-semibold",children:"App Permissions"}),a(r,{checked:s,onCheckedChange:c=>{const d=c===!0;i({camera:d,microphone:d,location:d,notifications:d,contacts:d})},label:s?"Disable All":"Enable All"})]}),l("div",{className:"space-y-3",children:[a(r,{label:"Camera access",checked:n.camera,onCheckedChange:c=>t("camera",c===!0)}),a(r,{label:"Microphone access",checked:n.microphone,onCheckedChange:c=>t("microphone",c===!0)}),a(r,{label:"Location access",checked:n.location,onCheckedChange:c=>t("location",c===!0)}),a(r,{label:"Push notifications",checked:n.notifications,onCheckedChange:c=>t("notifications",c===!0)}),a(r,{label:"Contacts access",checked:n.contacts,onCheckedChange:c=>t("contacts",c===!0)})]}),a("div",{className:"text-xs text-gray-600 mt-4",children:s?"All permissions enabled":h?`${Object.values(n).filter(Boolean).length} permissions enabled`:"No permissions enabled"})]})}};var P,z,M;g.parameters=o(e({},g.parameters),{docs:o(e({},(P=g.parameters)==null?void 0:P.docs),{source:e({originalSource:`{
  args: {
    label: "Enable notifications"
  }
} satisfies Story`},(M=(z=g.parameters)==null?void 0:z.docs)==null?void 0:M.source)})});var A,E,q;p.parameters=o(e({},p.parameters),{docs:o(e({},(A=p.parameters)==null?void 0:A.docs),{source:e({originalSource:`{
  args: {
    label: "Dark mode enabled",
    checked: true
  }
} satisfies Story`},(q=(E=p.parameters)==null?void 0:E.docs)==null?void 0:q.source)})});var $,R,j;b.parameters=o(e({},b.parameters),{docs:o(e({},($=b.parameters)==null?void 0:$.docs),{source:e({originalSource:`{
  args: {
    label: "Disabled setting",
    disabled: true,
    checked: false
  }
} satisfies Story`},(j=(R=b.parameters)==null?void 0:R.docs)==null?void 0:j.source)})});var T,O,L;f.parameters=o(e({},f.parameters),{docs:o(e({},(T=f.parameters)==null?void 0:T.docs),{source:e({originalSource:`{
  args: {
    label: "Disabled but checked",
    disabled: true,
    checked: true
  }
} satisfies Story`},(L=(O=f.parameters)==null?void 0:O.docs)==null?void 0:L.source)})});var U,W,H;k.parameters=o(e({},k.parameters),{docs:o(e({},(U=k.parameters)==null?void 0:U.docs),{source:e({originalSource:`{
  args: {
    checked: false
  }
} satisfies Story`},(H=(W=k.parameters)==null?void 0:W.docs)==null?void 0:H.source)})});var Y,I,G;S.parameters=o(e({},S.parameters),{docs:o(e({},(Y=S.parameters)==null?void 0:Y.docs),{source:e({originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Switch label="Small switch" size="sm" />
      <Switch label="Medium switch" size="md" />
      <Switch label="Large switch" size="lg" />
    </div>
} satisfies Story`},(G=(I=S.parameters)==null?void 0:I.docs)==null?void 0:G.source)})});var J,V,_;C.parameters=o(e({},C.parameters),{docs:o(e({},(J=C.parameters)==null?void 0:J.docs),{source:e({originalSource:`{
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Switch label={\`Controlled switch (\${checked ? "on" : "off"})\`} checked={checked} onCheckedChange={val => setChecked(val === true)} />;
  }
} satisfies Story`},(_=(V=C.parameters)==null?void 0:V.docs)==null?void 0:_.source)})});var K,Q,X;v.parameters=o(e({},v.parameters),{docs:o(e({},(K=v.parameters)==null?void 0:K.docs),{source:e({originalSource:`{
  render: () => <Switch label="Uncontrolled switch" defaultChecked={true} onCheckedChange={val => console.log("switch changed:", val)} />
} satisfies Story`},(X=(Q=v.parameters)==null?void 0:Q.docs)==null?void 0:X.source)})});var Z,ee,ne;w.parameters=o(e({},w.parameters),{docs:o(e({},(Z=w.parameters)==null?void 0:Z.docs),{source:e({originalSource:`{
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
} satisfies Story`},(ne=(ee=w.parameters)==null?void 0:ee.docs)==null?void 0:ne.source)})});var ae,te,se;y.parameters=o(e({},y.parameters),{docs:o(e({},(ae=y.parameters)==null?void 0:ae.docs),{source:e({originalSource:`{
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
} satisfies Story`},(se=(te=y.parameters)==null?void 0:te.docs)==null?void 0:se.source)})});var oe,re,ie;x.parameters=o(e({},x.parameters),{docs:o(e({},(oe=x.parameters)==null?void 0:oe.docs),{source:e({originalSource:`{
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
} satisfies Story`},(ie=(re=x.parameters)==null?void 0:re.docs)==null?void 0:ie.source)})});var ce,le,de;N.parameters=o(e({},N.parameters),{docs:o(e({},(ce=N.parameters)==null?void 0:ce.docs),{source:e({originalSource:`{
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
} satisfies Story`},(de=(le=N.parameters)==null?void 0:le.docs)==null?void 0:de.source)})});const je=["Default","Checked","Disabled","DisabledChecked","WithoutLabel","WithDifferentSizes","ControlledSwitch","UncontrolledSwitch","SettingsPanel","ReactHookFormWithYup","AccessibilityDemo","SwitchGroup"];export{x as AccessibilityDemo,p as Checked,C as ControlledSwitch,g as Default,b as Disabled,f as DisabledChecked,y as ReactHookFormWithYup,w as SettingsPanel,N as SwitchGroup,v as UncontrolledSwitch,S as WithDifferentSizes,k as WithoutLabel,je as __namedExportsOrder,Re as default};
