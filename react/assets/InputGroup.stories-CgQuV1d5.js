import{j as e}from"./jsx-runtime-DSvmvvsx.js";import{a as s,b as i,I as a,c as d,d as p,e as l}from"./Input-BHICaYbx.js";import{S as c}from"./search-BCaW7rQP.js";import{e as m}from"./Form-DjjlGdbW.js";import{B as u}from"./Button-CSLSlcO9.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cn-BaF2GUMg.js";import"./createLucideIcon-DYphhiRx.js";import"./useMachine-DSGsW_My.js";import"./Label-mrk_WNRp.js";const L={title:"Components/InputGroup",component:s,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Wraps an `Input` with addons (`InputLeftAddon` / `InputRightAddon`: flush blocks outside the field, e.g. "https://") and elements (`InputLeftElement` / `InputRightElement`: icons or buttons inside it). The group shares its `size` with the input and makes room for the parts. Inside a `FormField` the field wiring passes through to the input.'}}},argTypes:{size:{control:"radio",options:["sm","md","lg"]},inline:{control:"boolean"}},args:{size:"md"}},t={render:o=>e.jsx("div",{className:"w-80",children:e.jsxs(s,{...o,children:[e.jsx(i,{children:"https://"}),e.jsx(a,{"aria-label":"Site",placeholder:"example"}),e.jsx(d,{children:".com"})]})})},n={render:o=>e.jsx("div",{className:"w-80",children:e.jsxs(s,{...o,children:[e.jsx(p,{children:e.jsx(c,{size:16})}),e.jsx(a,{"aria-label":"Search",placeholder:"Search"}),e.jsx(l,{interactive:!0,children:e.jsx(u,{variant:"ghost",size:"xs",children:"Clear"})})]})})},r={render:()=>e.jsx("div",{className:"w-80",children:e.jsx(m,{name:"site",label:"Website",description:"Public URL",required:!0,children:e.jsxs(s,{children:[e.jsx(i,{children:"https://"}),e.jsx(a,{placeholder:"example.com"})]})})})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-80">
      <InputGroup {...args}>
        <InputLeftAddon>https://</InputLeftAddon>
        <Input aria-label="Site" placeholder="example" />
        <InputRightAddon>.com</InputRightAddon>
      </InputGroup>
    </div>
} satisfies Story`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-80">
      <InputGroup {...args}>
        <InputLeftElement>
          <Search size={16} />
        </InputLeftElement>
        <Input aria-label="Search" placeholder="Search" />
        <InputRightElement interactive>
          <Button variant="ghost" size="xs">
            Clear
          </Button>
        </InputRightElement>
      </InputGroup>
    </div>
} satisfies Story`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-80">
      <FormField name="site" label="Website" description="Public URL" required>
        <InputGroup>
          <InputLeftAddon>https://</InputLeftAddon>
          <Input placeholder="example.com" />
        </InputGroup>
      </FormField>
    </div>
} satisfies Story`,...r.parameters?.docs?.source}}};const R=["Addons","Elements","InAField"];export{t as Addons,n as Elements,r as InAField,R as __namedExportsOrder,L as default};
