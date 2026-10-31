import{_ as s}from"./Switch-CCKfYEKM.js";import{_ as c}from"./Checkbox-BhuDFWJD.js";import{_ as t}from"./Label-DGQrqgZK.js";import{_ as i}from"./Input-B4Elzf_c.js";import"./vue.esm-bundler-DkB1Q1v8.js";import"./cn-CTdd_bgG.js";import"./useMachine-DL-Cf-96.js";import"./useId-jK020Zqe.js";import"./icons-DSNlrOPV.js";import"./input-BiOxQ7f2.js";const x={title:"Components/Label",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Form label. Names native controls through `for`, and also focuses and activates custom controls (Checkbox, Switch, radios) on click, as a native label would. The required marker is decorative: `required` is announced by the control itself."}}},argTypes:{for:{control:"text"},required:{control:"boolean"},error:{control:"boolean"}}},e={render:n=>({components:{Label:t,Input:i},setup:()=>({args:n}),template:`
      <div class="flex flex-col gap-1 w-64">
        <Label for="name" v-bind="args">Name</Label>
        <Input id="name" :required="args.required" :error="args.error" />
      </div>
    `})},r={args:{required:!0},render:e.render},o={args:{error:!0,required:!0},render:e.render},a={name:"Activating custom controls",render:()=>({components:{Label:t,Checkbox:c,Switch:s},template:`
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label for="terms">Click me to toggle the checkbox</Label>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="wifi" />
          <Label for="wifi">Click me to toggle the switch</Label>
        </div>
      </div>
    `})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Label,
      Input
    },
    setup: () => ({
      args
    }),
    template: \`
      <div class="flex flex-col gap-1 w-64">
        <Label for="name" v-bind="args">Name</Label>
        <Input id="name" :required="args.required" :error="args.error" />
      </div>
    \`
  })
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    required: true
  },
  render: Default.render
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    error: true,
    required: true
  },
  render: Default.render
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: "Activating custom controls",
  render: () => ({
    components: {
      Label,
      Checkbox,
      Switch
    },
    template: \`
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label for="terms">Click me to toggle the checkbox</Label>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="wifi" />
          <Label for="wifi">Click me to toggle the switch</Label>
        </div>
      </div>
    \`
  })
}`,...a.parameters?.docs?.source}}};const L=["Default","Required","Error","CustomControls"];export{a as CustomControls,e as Default,o as Error,r as Required,L as __namedExportsOrder,x as default};
