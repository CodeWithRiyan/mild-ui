import{_ as a}from"./Link-CgDG_gSH.js";import{_ as i}from"./Text-HyJ-f5G3.js";import"./vue.esm-bundler-DkB1Q1v8.js";import"./cn-CTdd_bgG.js";const d={title:"Typography/Link",component:a,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Navigational link. Renders an `a`; pass `as` to use a router link (`<Link :as="RouterLink" to="/docs">`). `external` adds `target="_blank"` with a safe `rel`, and `disabled` makes it inert while keeping the link role.'}}},argTypes:{href:{control:"text"},underline:{control:"radio",options:["none","hover","always"]},external:{control:"boolean"},plain:{control:"boolean"},disabled:{control:"boolean"},onClick:{action:"click"}},args:{href:"#docs"}},e={render:r=>({components:{Link:a},setup:()=>({args:r}),template:'<Link v-bind="args">Read the docs</Link>'})},n={render:()=>({components:{Link:a,Text:i},template:`
      <div class="flex flex-col gap-2">
        <Link href="#">Underlined on hover (default)</Link>
        <Link href="#" underline="always">Always underlined</Link>
        <Link href="#" underline="none">Never underlined</Link>
        <Text>Inline and <Link href="#" plain>plain</Link> inside a sentence.</Text>
        <Link href="https://example.com" external>External (new tab)</Link>
        <Link href="#" disabled>Disabled</Link>
      </div>
    `})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Link
    },
    setup: () => ({
      args
    }),
    template: '<Link v-bind="args">Read the docs</Link>'
  })
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Link,
      Text
    },
    template: \`
      <div class="flex flex-col gap-2">
        <Link href="#">Underlined on hover (default)</Link>
        <Link href="#" underline="always">Always underlined</Link>
        <Link href="#" underline="none">Never underlined</Link>
        <Text>Inline and <Link href="#" plain>plain</Link> inside a sentence.</Text>
        <Link href="https://example.com" external>External (new tab)</Link>
        <Link href="#" disabled>Disabled</Link>
      </div>
    \`
  })
}`,...n.parameters?.docs?.source}}};const c=["Default","Variants"];export{e as Default,n as Variants,c as __namedExportsOrder,d as default};
