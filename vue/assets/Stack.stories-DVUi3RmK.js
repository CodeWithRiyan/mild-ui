import{_ as s}from"./Button-Ds3ZQdvo.js";import{_ as a}from"./Stack-C-G7Y-pm.js";import"./vue.esm-bundler-DkB1Q1v8.js";import"./cn-CTdd_bgG.js";import"./styling-DD7d-941.js";import"./layout-Bf50BaQu.js";const u={title:"Layout/Stack",component:a,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Spaces its children along one axis (a column by default) with a gap from the spacing scale. Renders a `div`, or the element given with `as`."}}},argTypes:{as:{control:"text"},direction:{control:"select",options:["row","row-reverse","column","column-reverse"]},gap:{control:"select",options:["0","1","2","3","4","6","8","12"]},align:{control:"select",options:["flex-start","flex-end","center","baseline","stretch"]},justify:{control:"select",options:["flex-start","flex-end","center","space-between","space-around","space-evenly"]},wrap:{control:"select",options:[!0,!1,"wrap","nowrap","wrap-reverse"]},inline:{control:"boolean"}},args:{direction:"column",gap:"4"}},o=n=>`<div class="mild-box" style="padding: var(--mild-space-3); border-radius: var(--mild-radius-md); background: var(--mild-color-primary-500); color: white">${n}</div>`,e={render:n=>({components:{Stack:a},setup:()=>({args:n}),template:`<Stack v-bind="args">${o("One")}${o("Two")}${o("Three")}</Stack>`})},t={args:{direction:"row",gap:"2",align:"center"},render:e.render},r={render:()=>({components:{Stack:a,Button:s},template:`
      <Stack direction="row" gap="2" justify="flex-end" as="footer">
        <Button variant="ghost">Cancel</Button>
        <Button>Save</Button>
      </Stack>
    `})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Stack
    },
    setup: () => ({
      args
    }),
    template: \`<Stack v-bind="args">\${item("One")}\${item("Two")}\${item("Three")}</Stack>\`
  })
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    direction: "row",
    gap: "2",
    align: "center"
  },
  render: Default.render
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Stack,
      Button
    },
    template: \`
      <Stack direction="row" gap="2" justify="flex-end" as="footer">
        <Button variant="ghost">Cancel</Button>
        <Button>Save</Button>
      </Stack>
    \`
  })
}`,...r.parameters?.docs?.source}}};const g=["Default","Row","Buttons"];export{r as Buttons,e as Default,t as Row,g as __namedExportsOrder,u as default};
