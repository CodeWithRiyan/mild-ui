import{r as p}from"./vue.esm-bundler-DkB1Q1v8.js";import{_ as d,a as m,b as u,c as S,d as g,e as i}from"./Select-C2PwiU1v.js";import"./useId-jK020Zqe.js";import"./cn-CTdd_bgG.js";import"./icons-DSNlrOPV.js";import"./useMachine-DL-Cf-96.js";const c=[{value:"us",label:"United States"},{value:"ca",label:"Canada"},{value:"mx",label:"Mexico"},{value:"br",label:"Brazil",disabled:!0},{value:"ar",label:"Argentina"}],h={title:"Components/Select",component:i,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Select-only combobox with a listbox popup driven by `@mild-ui/primitives/listbox`: Arrow/Enter/Space open it, Arrow/Home/End move, typing jumps to an option, Enter/Space select, Escape and Tab close. Use `options` or compose the parts. Follows the [WAI-ARIA APG select-only combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/); keyboard tests: `packages/vue/src/components/Select/Select.test.ts`."}}},argTypes:{size:{control:"radio",options:["sm","md","lg"]},modelValue:{control:"select",options:c.map(t=>t.value)},placeholder:{control:"text"},disabled:{control:"boolean"},required:{control:"boolean"},fullWidth:{control:"boolean"},error:{control:"boolean"},name:{control:"text"},"onUpdate:modelValue":{action:"update:modelValue"},onChange:{action:"change"},"onUpdate:open":{action:"update:open"}},args:{options:c,placeholder:"Pick a country"}},e={render:t=>({components:{Select:i},setup:()=>({args:t}),template:'<div class="w-64"><Select aria-label="Country" v-bind="args" /></div>'})},o={args:{defaultValue:"mx"},render:e.render},a={args:{error:!0},render:e.render},r={args:{disabled:!0,defaultValue:"ca"},render:e.render},n={render:()=>({components:{Select:i},setup:()=>({options:c}),template:`
      <div class="flex flex-col gap-4 w-64">
        <Select aria-label="Small" size="sm" :options="options" placeholder="Small" />
        <Select aria-label="Medium" size="md" :options="options" placeholder="Medium" />
        <Select aria-label="Large" size="lg" :options="options" placeholder="Large" />
      </div>
    `})},l={render:()=>({components:{Select:i},setup(){return{country:p("us"),options:c}},template:`
      <div class="flex flex-col gap-3 w-64">
        <Select aria-label="Country" v-model="country" :options="options" />
        <output class="text-sm">Value: {{ country }}</output>
      </div>
    `})},s={name:"Composed from parts",render:()=>({components:{SelectRoot:g,SelectTrigger:S,SelectValue:u,SelectContent:m,SelectItem:d},template:`
      <div class="w-64">
        <SelectRoot default-value="ca" name="country">
          <SelectTrigger aria-label="Country" full-width>
            <SelectValue placeholder="Pick a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">🇺🇸 United States</SelectItem>
            <SelectItem value="ca">🇨🇦 Canada</SelectItem>
            <SelectItem value="mx">🇲🇽 Mexico</SelectItem>
          </SelectContent>
        </SelectRoot>
      </div>
    `})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Select
    },
    setup: () => ({
      args
    }),
    template: '<div class="w-64"><Select aria-label="Country" v-bind="args" /></div>'
  })
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: "mx"
  },
  render: Default.render
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    error: true
  },
  render: Default.render
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: "ca"
  },
  render: Default.render
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Select
    },
    setup: () => ({
      options
    }),
    template: \`
      <div class="flex flex-col gap-4 w-64">
        <Select aria-label="Small" size="sm" :options="options" placeholder="Small" />
        <Select aria-label="Medium" size="md" :options="options" placeholder="Medium" />
        <Select aria-label="Large" size="lg" :options="options" placeholder="Large" />
      </div>
    \`
  })
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Select
    },
    setup() {
      const country = ref("us");
      return {
        country,
        options
      };
    },
    template: \`
      <div class="flex flex-col gap-3 w-64">
        <Select aria-label="Country" v-model="country" :options="options" />
        <output class="text-sm">Value: {{ country }}</output>
      </div>
    \`
  })
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: "Composed from parts",
  render: () => ({
    components: {
      SelectRoot,
      SelectTrigger,
      SelectValue,
      SelectContent,
      SelectItem
    },
    template: \`
      <div class="w-64">
        <SelectRoot default-value="ca" name="country">
          <SelectTrigger aria-label="Country" full-width>
            <SelectValue placeholder="Pick a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">🇺🇸 United States</SelectItem>
            <SelectItem value="ca">🇨🇦 Canada</SelectItem>
            <SelectItem value="mx">🇲🇽 Mexico</SelectItem>
          </SelectContent>
        </SelectRoot>
      </div>
    \`
  })
}`,...s.parameters?.docs?.source}}};const w=["Default","WithValue","Error","Disabled","Sizes","Controlled","Composed"];export{s as Composed,l as Controlled,e as Default,r as Disabled,a as Error,n as Sizes,o as WithValue,w as __namedExportsOrder,h as default};
