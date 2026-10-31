import{e as n,f as c,j as l,v as m,k as i,c as p,l as u,m as b}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as K}from"./cn-CTdd_bgG.js";import{_ as f}from"./Text-HyJ-f5G3.js";const a=n({__name:"Kbd",props:{as:{default:"kbd"},size:{default:"md"}},setup(e){const r=e,d=p(()=>K("mild-kbd",`mild-kbd--${r.size}`));return(o,x)=>(u(),c(i(e.as),{class:m(d.value)},{default:l(()=>[b(o.$slots,"default")]),_:3},8,["class"]))}});a.__docgenInfo={exportName:"default",displayName:"Kbd",description:"",tags:{},props:[{name:"size",description:'Key size. Default `"md"`.',required:!1,type:{name:"KbdSize"},defaultValue:{func:!1,value:'"md"'}},{name:"as",description:"Element to render. Defaults to `kbd`.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"kbd"'}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Kbd/Kbd.vue"]};const S={title:"Typography/Kbd",component:a,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A keyboard key (`<kbd>`). Combine several for a shortcut."}}},argTypes:{size:{control:"radio",options:["sm","md","lg"]},as:{control:"text"}}},s={render:e=>({components:{Kbd:a},setup:()=>({args:e}),template:'<Kbd v-bind="args">⌘</Kbd>'})},t={render:()=>({components:{Kbd:a,Text:f},template:`
      <div class="flex flex-col gap-3">
        <Text>Search: <Kbd>⌘</Kbd> + <Kbd>K</Kbd></Text>
        <Text>Save: <Kbd size="sm">Ctrl</Kbd> + <Kbd size="sm">S</Kbd></Text>
        <Text>Submit: <Kbd size="lg">Enter</Kbd></Text>
      </div>
    `})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Kbd
    },
    setup: () => ({
      args
    }),
    template: '<Kbd v-bind="args">⌘</Kbd>'
  })
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Kbd,
      Text
    },
    template: \`
      <div class="flex flex-col gap-3">
        <Text>Search: <Kbd>⌘</Kbd> + <Kbd>K</Kbd></Text>
        <Text>Save: <Kbd size="sm">Ctrl</Kbd> + <Kbd size="sm">S</Kbd></Text>
        <Text>Submit: <Kbd size="lg">Enter</Kbd></Text>
      </div>
    \`
  })
}`,...t.parameters?.docs?.source}}};const k=["Default","Shortcuts"];export{s as Default,t as Shortcuts,k as __namedExportsOrder,S as default};
