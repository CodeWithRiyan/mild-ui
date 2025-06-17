import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{L as i}from"./Label-Dk0OgnlF.js";import{I as d}from"./Input-uNLkzt6C.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cn-Dtjc6EhN.js";const b={title:"Components/Label",component:i,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A styled label component based on Radix Label with support for required and error states."}}},argTypes:{children:{control:"text"},required:{control:"boolean"},error:{control:"boolean"},ui:{control:"object"},className:{control:"text"}}},r={args:{children:"Username"}},s={args:{children:"Email address",required:!0}},a={args:{children:"Password",error:!0}},o={args:{children:"Phone number",className:"text-blue-600 font-semibold"}},t={args:{children:"Email address",ui:{label:"text-blue-600 font-semibold",asterisk:"text-blue-500"},required:!0}},l={render:()=>e.jsxs("div",{className:"flex flex-col gap-2 w-64",children:[e.jsx(i,{htmlFor:"email",required:!0,children:"Email address"}),e.jsx(d,{id:"email",type:"email",placeholder:"you@example.com",className:"px-3 py-2 border rounded text-sm"})]})},n={render:()=>e.jsxs("div",{className:"flex flex-col gap-2 w-64",children:[e.jsx(i,{htmlFor:"email",required:!0,error:!0,children:"Email address"}),e.jsx(d,{id:"email",type:"email",placeholder:"you@example.com",className:"px-3 py-2 border rounded text-sm"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
    ui: {
      label: "text-blue-600 font-semibold",
      asterisk: "text-blue-500"
    },
    required: true
  }
} satisfies Story`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="email" required>
        Email address
      </Label>
      <Input id="email" type="email" placeholder="you@example.com" className="px-3 py-2 border rounded text-sm" />
    </div>
} satisfies Story`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="email" required error>
        Email address
      </Label>
      <Input id="email" type="email" placeholder="you@example.com" className="px-3 py-2 border rounded text-sm" />
    </div>
} satisfies Story`,...n.parameters?.docs?.source}}};const f=["Default","Required","WithError","CustomClassName","CustomUI","WithInput","WithInputWithError"];export{o as CustomClassName,t as CustomUI,r as Default,s as Required,a as WithError,l as WithInput,n as WithInputWithError,f as __namedExportsOrder,b as default};
