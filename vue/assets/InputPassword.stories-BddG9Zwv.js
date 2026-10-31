import{r as t}from"./vue.esm-bundler-DkB1Q1v8.js";import{_ as a}from"./InputPassword-Ce6ACkyu.js";import{_ as n}from"./Label-DGQrqgZK.js";import"./cn-CTdd_bgG.js";import"./input-BiOxQ7f2.js";import"./icons-DSNlrOPV.js";const u={title:"Components/InputPassword",component:a,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Password input with a show/hide toggle. The toggle announces its pressed state and never steals focus or the caret from the input."}}},argTypes:{variant:{control:"select",options:["outline","filled","flushed","unstyled"]},size:{control:"select",options:["xs","sm","md","lg","xl"]},placeholder:{control:"text"},error:{control:"boolean"},disabled:{control:"boolean"},readonly:{control:"boolean"},required:{control:"boolean"},"onUpdate:modelValue":{action:"update:modelValue"}},args:{placeholder:"Password"}},e={render:o=>({components:{InputPassword:a},setup:()=>({args:o}),template:'<div class="w-64"><InputPassword aria-label="Password" v-bind="args" /></div>'})},s={render:()=>({components:{InputPassword:a,Label:n},setup(){return{password:t("hunter2")}},template:`
      <div class="flex flex-col gap-1 w-64">
        <Label for="password">Password</Label>
        <InputPassword id="password" v-model="password" autocomplete="current-password" />
      </div>
    `})},r={render:()=>({components:{InputPassword:a},template:`
      <div class="flex flex-col gap-4 w-64">
        <InputPassword aria-label="Error" error placeholder="Error" />
        <InputPassword aria-label="Disabled" disabled placeholder="Disabled" />
        <InputPassword aria-label="Small" size="sm" placeholder="Small" />
      </div>
    `})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      InputPassword
    },
    setup: () => ({
      args
    }),
    template: '<div class="w-64"><InputPassword aria-label="Password" v-bind="args" /></div>'
  })
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      InputPassword,
      Label
    },
    setup() {
      const password = ref("hunter2");
      return {
        password
      };
    },
    template: \`
      <div class="flex flex-col gap-1 w-64">
        <Label for="password">Password</Label>
        <InputPassword id="password" v-model="password" autocomplete="current-password" />
      </div>
    \`
  })
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      InputPassword
    },
    template: \`
      <div class="flex flex-col gap-4 w-64">
        <InputPassword aria-label="Error" error placeholder="Error" />
        <InputPassword aria-label="Disabled" disabled placeholder="Disabled" />
        <InputPassword aria-label="Small" size="sm" placeholder="Small" />
      </div>
    \`
  })
}`,...r.parameters?.docs?.source}}};const w=["Default","WithLabel","States"];export{e as Default,r as States,s as WithLabel,w as __namedExportsOrder,u as default};
