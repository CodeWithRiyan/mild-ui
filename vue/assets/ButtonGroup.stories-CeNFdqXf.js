import{_ as a}from"./Button-Ds3ZQdvo.js";import{_ as r}from"./ButtonGroup-wncR4obb.js";import"./vue.esm-bundler-DkB1Q1v8.js";import"./cn-CTdd_bgG.js";const p={title:"Components/ButtonGroup",component:r,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Lays buttons out in a row (or column) and hands them a shared `size`, `variant` and `disabled`. `attached` joins them into one bar. Rendered with `role="group"`; give it an `aria-label` when the group\'s purpose is not obvious from context.'}}},argTypes:{attached:{control:"boolean"},orientation:{control:"radio",options:["horizontal","vertical"]},fullWidth:{control:"boolean"},size:{control:"select",options:[void 0,"xs","sm","md","lg","xl"]},variant:{control:"select",options:[void 0,"primary","secondary","outline","ghost","link","destructive"]},disabled:{control:"boolean"}}},t={render:s=>({components:{ButtonGroup:r,Button:a},setup:()=>({args:s}),template:`
      <ButtonGroup aria-label="Pager" v-bind="args">
        <Button>Previous</Button>
        <Button>1</Button>
        <Button>2</Button>
        <Button>Next</Button>
      </ButtonGroup>
    `})},e={args:{attached:!0,variant:"outline"},render:t.render},n={args:{attached:!0,orientation:"vertical",variant:"secondary",size:"sm"},render:t.render},o={name:"Buttons override the group",render:()=>({components:{ButtonGroup:r,Button:a},template:`
      <ButtonGroup variant="ghost" size="sm" disabled aria-label="Mixed">
        <Button>Inherits</Button>
        <Button variant="primary" :disabled="false">Overrides</Button>
      </ButtonGroup>
    `})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      ButtonGroup,
      Button
    },
    setup: () => ({
      args
    }),
    template: \`
      <ButtonGroup aria-label="Pager" v-bind="args">
        <Button>Previous</Button>
        <Button>1</Button>
        <Button>2</Button>
        <Button>Next</Button>
      </ButtonGroup>
    \`
  })
}`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    attached: true,
    variant: "outline"
  },
  render: Default.render
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    attached: true,
    orientation: "vertical",
    variant: "secondary",
    size: "sm"
  },
  render: Default.render
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: "Buttons override the group",
  render: () => ({
    components: {
      ButtonGroup,
      Button
    },
    template: \`
      <ButtonGroup variant="ghost" size="sm" disabled aria-label="Mixed">
        <Button>Inherits</Button>
        <Button variant="primary" :disabled="false">Overrides</Button>
      </ButtonGroup>
    \`
  })
}`,...o.parameters?.docs?.source}}};const l=["Default","Attached","Vertical","Overrides"];export{e as Attached,t as Default,o as Overrides,n as Vertical,l as __namedExportsOrder,p as default};
