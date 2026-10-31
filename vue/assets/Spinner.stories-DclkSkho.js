import{_ as r}from"./Spinner-DwIstJ5s.js";import"./vue.esm-bundler-DkB1Q1v8.js";import"./cn-CTdd_bgG.js";const i={title:"Feedback/Spinner",component:r,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Indeterminate loading indicator, announced through a visually hidden `label` (`role="status"`).'}}},argTypes:{size:{control:"select",options:["xs","sm","md","lg","xl"]},variant:{control:"select",options:["border","dots","pulse","bars"]},speed:{control:"radio",options:["slow","normal","fast"]},label:{control:"text"}}},e={render:a=>({components:{Spinner:r},setup:()=>({args:a}),template:'<Spinner v-bind="args" />'})},n={render:()=>({components:{Spinner:r},template:`
      <div class="flex items-center gap-6">
        <Spinner variant="border" />
        <Spinner variant="dots" />
        <Spinner variant="pulse" />
        <Spinner variant="bars" />
        <Spinner size="xl" speed="slow" label="Slowly loading" />
      </div>
    `})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Spinner
    },
    setup: () => ({
      args
    }),
    template: '<Spinner v-bind="args" />'
  })
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Spinner
    },
    template: \`
      <div class="flex items-center gap-6">
        <Spinner variant="border" />
        <Spinner variant="dots" />
        <Spinner variant="pulse" />
        <Spinner variant="bars" />
        <Spinner size="xl" speed="slow" label="Slowly loading" />
      </div>
    \`
  })
}`,...n.parameters?.docs?.source}}};const p=["Default","Variants"];export{e as Default,n as Variants,p as __namedExportsOrder,i as default};
