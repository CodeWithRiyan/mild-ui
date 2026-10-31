import{e as d,f as r,j as i,v as c,k as p,c as m,l as u,m as f}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as C}from"./cn-CTdd_bgG.js";import{_ as v}from"./Text-HyJ-f5G3.js";const a=d({__name:"Code",props:{as:{default:"code"},variant:{default:"subtle"},size:{default:"md"},block:{type:Boolean,default:!1}},setup(e){const s=e,n=m(()=>C("mild-code",`mild-code--${s.variant}`,`mild-code--${s.size}`,s.block&&"mild-code--block"));return(l,g)=>(u(),r(p(e.as),{class:c(n.value)},{default:i(()=>[f(l.$slots,"default")]),_:3},8,["class"]))}});a.__docgenInfo={exportName:"default",displayName:"Code",description:"",tags:{},props:[{name:"block",description:"Render as a block (preserved whitespace, horizontal scrolling) instead of inline.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"size",description:'Font size. Default `"md"` (relative to the surrounding text).',required:!1,type:{name:"CodeSize"},defaultValue:{func:!1,value:'"md"'}},{name:"variant",description:'Visual style. Default `"subtle"`.',required:!1,type:{name:"CodeVariant"},defaultValue:{func:!1,value:'"subtle"'}},{name:"as",description:"Element to render. Defaults to `code`; use `pre` with `block`.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"code"'}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Code/Code.vue"]};const z={title:"Typography/Code",component:a,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Inline code. `block` keeps the whitespace and scrolls horizontally instead; pair it with `as="pre"` for a real code block.'}}},argTypes:{variant:{control:"radio",options:["subtle","solid","outline"]},size:{control:"radio",options:["sm","md","lg"]},block:{control:"boolean"},as:{control:"text"}}},o={render:e=>({components:{Code:a},setup:()=>({args:e}),template:'<Code v-bind="args">npm install @mild-ui/vue</Code>'})},t={render:()=>({components:{Code:a,Text:v},template:`
      <div class="flex flex-col gap-3">
        <Text>Run <Code>pnpm install</Code>, <Code variant="solid">pnpm build</Code> or <Code variant="outline">pnpm test</Code>.</Text>
        <Text>Sizes: <Code size="sm">sm</Code> <Code>md</Code> <Code size="lg">lg</Code></Text>
        <Code as="pre" block>import { Button } from "@mild-ui/vue";

export default { components: { Button } };</Code>
      </div>
    `})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Code
    },
    setup: () => ({
      args
    }),
    template: '<Code v-bind="args">npm install @mild-ui/vue</Code>'
  })
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Code,
      Text
    },
    template: \`
      <div class="flex flex-col gap-3">
        <Text>Run <Code>pnpm install</Code>, <Code variant="solid">pnpm build</Code> or <Code variant="outline">pnpm test</Code>.</Text>
        <Text>Sizes: <Code size="sm">sm</Code> <Code>md</Code> <Code size="lg">lg</Code></Text>
        <Code as="pre" block>import { Button } from "@mild-ui/vue";

export default { components: { Button } };</Code>
      </div>
    \`
  })
}`,...t.parameters?.docs?.source}}};const y=["Default","Variants"];export{o as Default,t as Variants,y as __namedExportsOrder,z as default};
