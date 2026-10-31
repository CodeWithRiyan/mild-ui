import{r as s}from"./vue.esm-bundler-DkB1Q1v8.js";import{_ as e}from"./Input-B4Elzf_c.js";import{_ as i}from"./Label-DGQrqgZK.js";import"./input-BiOxQ7f2.js";import"./cn-CTdd_bgG.js";const b={title:"Components/Input",component:e,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Text input with outline, filled, flushed and unstyled variants, five sizes, and error, disabled, readonly and required states. Supports `v-model`."}}},argTypes:{variant:{control:"select",options:["outline","filled","flushed","unstyled"]},size:{control:"select",options:["xs","sm","md","lg","xl"]},type:{control:"text"},placeholder:{control:"text"},fullWidth:{control:"boolean"},error:{control:"boolean"},disabled:{control:"boolean"},readonly:{control:"boolean"},required:{control:"boolean"},"onUpdate:modelValue":{action:"update:modelValue"}},args:{placeholder:"Type here"}},a={render:o=>({components:{Input:e},setup:()=>({args:o}),template:'<div class="w-64"><Input aria-label="Text" v-bind="args" /></div>'})},l={render:()=>({components:{Input:e},template:`
      <div class="flex flex-col gap-4 w-64">
        <Input aria-label="Outline" variant="outline" placeholder="Outline" />
        <Input aria-label="Filled" variant="filled" placeholder="Filled" />
        <Input aria-label="Flushed" variant="flushed" placeholder="Flushed" />
        <Input aria-label="Unstyled" variant="unstyled" placeholder="Unstyled" />
      </div>
    `})},r={render:()=>({components:{Input:e},template:`
      <div class="flex flex-col gap-4 w-64">
        <Input aria-label="Extra small" size="xs" placeholder="Extra small" />
        <Input aria-label="Small" size="sm" placeholder="Small" />
        <Input aria-label="Medium" size="md" placeholder="Medium" />
        <Input aria-label="Large" size="lg" placeholder="Large" />
        <Input aria-label="Extra large" size="xl" placeholder="Extra large" />
      </div>
    `})},n={render:()=>({components:{Input:e},template:`
      <div class="flex flex-col gap-4 w-64">
        <Input aria-label="Error" error placeholder="Error" />
        <Input aria-label="Disabled" disabled placeholder="Disabled" />
        <Input aria-label="Readonly" readonly model-value="Read only" />
        <Input aria-label="Required" required placeholder="Required" />
      </div>
    `})},t={render:()=>({components:{Input:e,Label:i},setup(){return{email:s("")}},template:`
      <div class="flex flex-col gap-1 w-64">
        <Label for="email" required>Email</Label>
        <Input id="email" v-model="email" type="email" placeholder="you@example.com" required />
        <output class="text-sm">{{ email || "(empty)" }}</output>
      </div>
    `})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Input
    },
    setup: () => ({
      args
    }),
    template: '<div class="w-64"><Input aria-label="Text" v-bind="args" /></div>'
  })
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Input
    },
    template: \`
      <div class="flex flex-col gap-4 w-64">
        <Input aria-label="Outline" variant="outline" placeholder="Outline" />
        <Input aria-label="Filled" variant="filled" placeholder="Filled" />
        <Input aria-label="Flushed" variant="flushed" placeholder="Flushed" />
        <Input aria-label="Unstyled" variant="unstyled" placeholder="Unstyled" />
      </div>
    \`
  })
}`,...l.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Input
    },
    template: \`
      <div class="flex flex-col gap-4 w-64">
        <Input aria-label="Extra small" size="xs" placeholder="Extra small" />
        <Input aria-label="Small" size="sm" placeholder="Small" />
        <Input aria-label="Medium" size="md" placeholder="Medium" />
        <Input aria-label="Large" size="lg" placeholder="Large" />
        <Input aria-label="Extra large" size="xl" placeholder="Extra large" />
      </div>
    \`
  })
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Input
    },
    template: \`
      <div class="flex flex-col gap-4 w-64">
        <Input aria-label="Error" error placeholder="Error" />
        <Input aria-label="Disabled" disabled placeholder="Disabled" />
        <Input aria-label="Readonly" readonly model-value="Read only" />
        <Input aria-label="Required" required placeholder="Required" />
      </div>
    \`
  })
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Input,
      Label
    },
    setup() {
      const email = ref("");
      return {
        email
      };
    },
    template: \`
      <div class="flex flex-col gap-1 w-64">
        <Label for="email" required>Email</Label>
        <Input id="email" v-model="email" type="email" placeholder="you@example.com" required />
        <output class="text-sm">{{ email || "(empty)" }}</output>
      </div>
    \`
  })
}`,...t.parameters?.docs?.source}}};const h=["Default","Variants","Sizes","States","WithLabel"];export{a as Default,r as Sizes,n as States,l as Variants,t as WithLabel,h as __namedExportsOrder,b as default};
