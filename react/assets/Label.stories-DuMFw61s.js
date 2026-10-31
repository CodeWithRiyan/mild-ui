import{j as e}from"./jsx-runtime-DSvmvvsx.js";import{L as i}from"./Label-mrk_WNRp.js";import{I as d}from"./Input-BHICaYbx.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cn-BaF2GUMg.js";const b={title:"Components/Label",component:i,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A styled label component based on Radix Label with support for required and error states."}}},argTypes:{children:{control:"text"},required:{control:"boolean"},error:{control:"boolean"},ui:{control:"object"},className:{control:"text"}}},r={args:{children:"Username"}},s={args:{children:"Email address",required:!0}},a={args:{children:"Password",error:!0}},o={args:{children:"Phone number",className:"text-blue-600 font-semibold"}},t={args:{children:"Email address",className:"text-blue-600 font-semibold",ui:{asterisk:"text-blue-500"},required:!0}},n={render:()=>e.jsxs("div",{className:"flex flex-col gap-2 w-64",children:[e.jsx(i,{htmlFor:"email",required:!0,children:"Email address"}),e.jsx(d,{id:"email",type:"email",placeholder:"you@example.com",className:"px-3 py-2 border rounded text-sm"})]})},l={render:()=>e.jsxs("div",{className:"flex flex-col gap-2 w-64",children:[e.jsx(i,{htmlFor:"email",required:!0,error:!0,children:"Email address"}),e.jsx(d,{id:"email",type:"email",placeholder:"you@example.com",className:"px-3 py-2 border rounded text-sm"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Username"
  }
} satisfies Story`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Email address",
    required: true
  }
} satisfies Story`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Password",
    error: true
  }
} satisfies Story`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Phone number",
    className: "text-blue-600 font-semibold"
  }
} satisfies Story`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Email address",
    className: "text-blue-600 font-semibold",
    ui: {
      asterisk: "text-blue-500"
    },
    required: true
  }
} satisfies Story`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="email" required>
        Email address
      </Label>
      <Input id="email" type="email" placeholder="you@example.com" className="px-3 py-2 border rounded text-sm" />
    </div>
} satisfies Story`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="email" required error>
        Email address
      </Label>
      <Input id="email" type="email" placeholder="you@example.com" className="px-3 py-2 border rounded text-sm" />
    </div>
} satisfies Story`,...l.parameters?.docs?.source}}};const f=["Default","Required","WithError","CustomClassName","CustomUI","WithInput","WithInputWithError"];export{o as CustomClassName,t as CustomUI,r as Default,s as Required,a as WithError,n as WithInput,l as WithInputWithError,f as __namedExportsOrder,b as default};
