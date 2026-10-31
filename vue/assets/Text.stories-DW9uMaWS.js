import{_ as n}from"./Text-HyJ-f5G3.js";import"./vue.esm-bundler-DkB1Q1v8.js";import"./cn-CTdd_bgG.js";const i={title:"Components/Text",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Typography primitive. Renders a `span` by default, or the element given with `as`, and maps size, weight, alignment, transform, decoration and semantic color onto `mild-text--*` classes."}}},argTypes:{as:{control:"text"},fontSize:{control:"select",options:["xs","sm","md","lg","xl","2xl","3xl","4xl","5xl","6xl"]},fontWeight:{control:"select",options:["thin","light","normal","medium","semibold","bold","extrabold","black"]},textAlign:{control:"select",options:["left","center","right","justify"]},textTransform:{control:"select",options:["none","uppercase","lowercase","capitalize"]},textDecoration:{control:"select",options:["none","underline","line-through","overline"]},color:{control:"select",options:[void 0,"primary","secondary","success","warning","danger","muted"]},truncate:{control:"boolean"},noOfLines:{control:"number"}}},e={render:s=>({components:{Text:n},setup:()=>({args:s}),template:'<Text v-bind="args">The quick brown fox jumps over the lazy dog.</Text>'})},t={render:()=>({components:{Text:n},template:`
      <div class="flex flex-col gap-2">
        <Text font-size="xs">Extra small</Text>
        <Text font-size="sm">Small</Text>
        <Text font-size="md">Medium</Text>
        <Text font-size="lg">Large</Text>
        <Text font-size="xl">Extra large</Text>
        <Text font-size="2xl" font-weight="bold">2xl bold</Text>
      </div>
    `})},o={render:()=>({components:{Text:n},template:`
      <div class="flex flex-col gap-2">
        <Text as="h2" font-size="3xl" font-weight="semibold">A heading element</Text>
        <Text as="p" color="muted">A muted paragraph.</Text>
        <Text color="success">Success</Text>
        <Text color="danger" text-decoration="line-through">Danger, struck through</Text>
        <Text text-transform="uppercase" letter-spacing="0.1">Uppercase and spaced</Text>
        <Text as="p" truncate style="max-width: 12rem">This long line is truncated with an ellipsis when it overflows.</Text>
      </div>
    `})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Text
    },
    setup: () => ({
      args
    }),
    template: '<Text v-bind="args">The quick brown fox jumps over the lazy dog.</Text>'
  })
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Text
    },
    template: \`
      <div class="flex flex-col gap-2">
        <Text font-size="xs">Extra small</Text>
        <Text font-size="sm">Small</Text>
        <Text font-size="md">Medium</Text>
        <Text font-size="lg">Large</Text>
        <Text font-size="xl">Extra large</Text>
        <Text font-size="2xl" font-weight="bold">2xl bold</Text>
      </div>
    \`
  })
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Text
    },
    template: \`
      <div class="flex flex-col gap-2">
        <Text as="h2" font-size="3xl" font-weight="semibold">A heading element</Text>
        <Text as="p" color="muted">A muted paragraph.</Text>
        <Text color="success">Success</Text>
        <Text color="danger" text-decoration="line-through">Danger, struck through</Text>
        <Text text-transform="uppercase" letter-spacing="0.1">Uppercase and spaced</Text>
        <Text as="p" truncate style="max-width: 12rem">This long line is truncated with an ellipsis when it overflows.</Text>
      </div>
    \`
  })
}`,...o.parameters?.docs?.source}}};const c=["Default","Sizes","Semantic"];export{e as Default,o as Semantic,t as Sizes,c as __namedExportsOrder,i as default};
