import{j as r}from"./jsx-runtime-DSvmvvsx.js";import{S as s}from"./Stack-6y2OYEvs.js";import{B as c}from"./Button-CSLSlcO9.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cn-BaF2GUMg.js";import"./layout-CwouAro2.js";import"./styling-uCqKwP1C.js";const w={title:"Layout/Stack",component:s,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Spaces its children along one axis (a column by default) with a gap from the spacing scale. Renders a `div`, or the element given with `as`."}}},argTypes:{as:{control:"text"},direction:{control:"select",options:["row","row-reverse","column","column-reverse"]},gap:{control:"select",options:["0","1","2","3","4","6","8","12"]},align:{control:"select",options:["flex-start","flex-end","center","baseline","stretch"]},justify:{control:"select",options:["flex-start","flex-end","center","space-between","space-around","space-evenly"]},wrap:{control:"select",options:[!0,!1,"wrap","nowrap","wrap-reverse"]},inline:{control:"boolean"}},args:{direction:"column",gap:"4"}},n=t=>r.jsx("div",{className:"mild-box",style:{padding:"var(--mild-space-3)",borderRadius:"var(--mild-radius-md)",background:"var(--mild-color-primary-500)",color:"white"},children:t},t),e={render:t=>r.jsxs(s,{...t,children:[n("One"),n("Two"),n("Three")]})},o={args:{direction:"row",gap:"2",align:"center"},render:e.render},a={render:()=>r.jsxs(s,{direction:"row",gap:"2",justify:"flex-end",as:"footer",children:[r.jsx(c,{variant:"ghost",children:"Cancel"}),r.jsx(c,{children:"Save"})]})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => <Stack {...args}>
      {item("One")}
      {item("Two")}
      {item("Three")}
    </Stack>
} satisfies Story`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    direction: "row",
    gap: "2",
    align: "center"
  },
  render: Default.render
} satisfies Story`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <Stack direction="row" gap="2" justify="flex-end" as="footer">
      <Button variant="ghost">Cancel</Button>
      <Button>Save</Button>
    </Stack>
} satisfies Story`,...a.parameters?.docs?.source}}};const x=["Default","Row","Buttons"];export{a as Buttons,e as Default,o as Row,x as __namedExportsOrder,w as default};
