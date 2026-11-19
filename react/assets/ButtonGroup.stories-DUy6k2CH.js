import{j as e}from"./jsx-runtime-DSvmvvsx.js";import{a as s,B as r}from"./Button-CSLSlcO9.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cn-BaF2GUMg.js";const m={title:"Components/ButtonGroup",component:s,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Lays buttons out in a row (or column) and hands them a shared `size`, `variant` and `disabled`. `attached` joins them into one bar. Rendered with `role="group"`; give it an `aria-label` when the group\'s purpose is not obvious from context.'}}},argTypes:{attached:{control:"boolean"},orientation:{control:"radio",options:["horizontal","vertical"]},fullWidth:{control:"boolean"},size:{control:"select",options:[void 0,"xs","sm","md","lg","xl"]},variant:{control:"select",options:[void 0,"primary","secondary","outline","ghost","link","destructive"]},disabled:{control:"boolean"}},args:{"aria-label":"Pager"}},t={render:i=>e.jsxs(s,{...i,children:[e.jsx(r,{children:"Previous"}),e.jsx(r,{children:"1"}),e.jsx(r,{children:"2"}),e.jsx(r,{children:"Next"})]})},o={args:{attached:!0,variant:"outline"},render:t.render},a={args:{attached:!0,orientation:"vertical",variant:"secondary",size:"sm"},render:t.render},n={name:"Buttons override the group",render:()=>e.jsxs(s,{variant:"ghost",size:"sm",disabled:!0,"aria-label":"Mixed",children:[e.jsx(r,{children:"Inherits"}),e.jsx(r,{variant:"primary",disabled:!1,children:"Overrides"})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <ButtonGroup {...args}>
      <Button>Previous</Button>
      <Button>1</Button>
      <Button>2</Button>
      <Button>Next</Button>
    </ButtonGroup>
} satisfies Story`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    attached: true,
    variant: "outline"
  },
  render: Default.render
} satisfies Story`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    attached: true,
    orientation: "vertical",
    variant: "secondary",
    size: "sm"
  },
  render: Default.render
} satisfies Story`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: "Buttons override the group",
  render: () => <ButtonGroup variant="ghost" size="sm" disabled aria-label="Mixed">
      <Button>Inherits</Button>
      <Button variant="primary" disabled={false}>
        Overrides
      </Button>
    </ButtonGroup>
} satisfies Story`,...n.parameters?.docs?.source}}};const h=["Default","Attached","Vertical","Overrides"];export{o as Attached,t as Default,n as Overrides,a as Vertical,h as __namedExportsOrder,m as default};
