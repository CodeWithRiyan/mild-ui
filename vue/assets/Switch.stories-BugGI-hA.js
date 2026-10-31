import{r as l}from"./vue.esm-bundler-DkB1Q1v8.js";import{_ as n}from"./Switch-CCKfYEKM.js";import"./cn-CTdd_bgG.js";import"./useMachine-DL-Cf-96.js";import"./useId-jK020Zqe.js";import"./Label-DGQrqgZK.js";const h={title:"Components/Switch",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"On/off switch driven by `@mild-ui/primitives/switch`: Space and Enter both toggle it, per the [WAI-ARIA APG switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/). Keyboard tests: `packages/vue/src/components/Switch/Switch.test.ts`."}}},argTypes:{size:{control:"radio",options:["sm","md","lg"]},modelValue:{control:"boolean"},defaultChecked:{control:"boolean"},disabled:{control:"boolean"},required:{control:"boolean"},label:{control:"text"},name:{control:"text"},"onUpdate:modelValue":{action:"update:modelValue"},onChange:{action:"change"}},args:{label:"Wi-Fi"}},e={render:s=>({components:{Switch:n},setup:()=>({args:s}),template:'<Switch id="wifi" v-bind="args" />'})},t={args:{label:"Bluetooth",defaultChecked:!0},render:e.render},r={args:{label:"Airplane mode",disabled:!0},render:e.render},a={render:()=>({components:{Switch:n},template:`
      <div class="flex flex-col gap-3">
        <Switch id="sm" size="sm" label="Small" />
        <Switch id="md" size="md" label="Medium" default-checked />
        <Switch id="lg" size="lg" label="Large" />
      </div>
    `})},o={render:()=>({components:{Switch:n},setup(){return{on:l(!1)}},template:`
      <div class="flex flex-col gap-3">
        <Switch id="dark" v-model="on" label="Dark mode" />
        <output class="text-sm">{{ on ? "On" : "Off" }}</output>
      </div>
    `})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Switch
    },
    setup: () => ({
      args
    }),
    template: '<Switch id="wifi" v-bind="args" />'
  })
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Bluetooth",
    defaultChecked: true
  },
  render: Default.render
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Airplane mode",
    disabled: true
  },
  render: Default.render
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Switch
    },
    template: \`
      <div class="flex flex-col gap-3">
        <Switch id="sm" size="sm" label="Small" />
        <Switch id="md" size="md" label="Medium" default-checked />
        <Switch id="lg" size="lg" label="Large" />
      </div>
    \`
  })
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Switch
    },
    setup() {
      const on = ref(false);
      return {
        on
      };
    },
    template: \`
      <div class="flex flex-col gap-3">
        <Switch id="dark" v-model="on" label="Dark mode" />
        <output class="text-sm">{{ on ? "On" : "Off" }}</output>
      </div>
    \`
  })
}`,...o.parameters?.docs?.source}}};const g=["Default","On","Disabled","Sizes","Controlled"];export{o as Controlled,e as Default,r as Disabled,t as On,a as Sizes,g as __namedExportsOrder,h as default};
