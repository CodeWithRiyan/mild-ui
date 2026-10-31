import{e as p,f as c,j as u,n as m,v as f,k as g,c as o,l as x,m as y}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as v}from"./cn-CTdd_bgG.js";import{g as w}from"./styling-DD7d-941.js";import{f as F}from"./layout-Bf50BaQu.js";const s=p({__name:"Flex",props:{as:{default:"div"},direction:{default:"row"},wrap:{type:[Boolean,String],default:void 0},align:{default:void 0},justify:{default:void 0},gap:{default:void 0},inline:{type:Boolean,default:!1}},setup(a){const e=a,l=o(()=>v("mild-flex",e.inline&&"mild-flex--inline",...F("flex",{direction:e.direction,wrap:e.wrap,align:e.align,justify:e.justify}))),i=o(()=>e.gap?{gap:w(e.gap)}:void 0);return(d,h)=>(x(),c(g(a.as),{class:f(l.value),style:m(i.value)},{default:u(()=>[y(d.$slots,"default")]),_:3},8,["class","style"]))}});s.__docgenInfo={exportName:"default",displayName:"Flex",description:"",tags:{},props:[{name:"inline",description:"Render as `inline-flex`.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"gap",description:"Space between children (spacing token).",required:!1,type:{name:"SpaceToken"},defaultValue:{func:!1,value:"undefined"}},{name:"justify",description:"`justify-content`.",required:!1,type:{name:"JustifyContent"},defaultValue:{func:!1,value:"undefined"}},{name:"align",description:"`align-items`.",required:!1,type:{name:"AlignItems"},defaultValue:{func:!1,value:"undefined"}},{name:"wrap",description:'`flex-wrap`; `true` is `"wrap"`.',required:!1,type:{name:"union",elements:[{name:"boolean"},{name:"FlexWrap"}]},defaultValue:{func:!1,value:"undefined"}},{name:"direction",description:'`flex-direction`. Default `"row"`.',required:!1,type:{name:"FlexDirection"},defaultValue:{func:!1,value:'"row"'}},{name:"as",description:"Element to render. Defaults to `div`.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"div"'}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Flex/Flex.vue"]};const _={title:"Layout/Flex",component:s,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"General-purpose flex container (a row by default). Renders a `div`, or the element given with `as`."}}},argTypes:{as:{control:"text"},direction:{control:"select",options:["row","row-reverse","column","column-reverse"]},wrap:{control:"select",options:[!0,!1,"wrap","nowrap","wrap-reverse"]},align:{control:"select",options:["flex-start","flex-end","center","baseline","stretch"]},justify:{control:"select",options:["flex-start","flex-end","center","space-between","space-around","space-evenly"]},gap:{control:"select",options:["0","1","2","3","4","6","8"]},inline:{control:"boolean"}},args:{gap:"3",align:"center",justify:"space-between"}},r=(a,e="2rem")=>`<div style="padding: var(--mild-space-2) var(--mild-space-4); min-height: ${e}; border-radius: var(--mild-radius-md); background: var(--mild-color-primary-500); color: white">${a}</div>`,n={render:a=>({components:{Flex:s},setup:()=>({args:a}),template:`<Flex v-bind="args" style="width: 24rem">${r("A")}${r("B","4rem")}${r("C")}</Flex>`})},t={args:{wrap:!0,gap:"2",justify:"flex-start"},render:a=>({components:{Flex:s},setup:()=>({args:a}),template:`<Flex v-bind="args" style="width: 16rem">${Array.from({length:8},(e,l)=>r(`Chip ${l+1}`)).join("")}</Flex>`})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Flex
    },
    setup: () => ({
      args
    }),
    template: \`<Flex v-bind="args" style="width: 24rem">\${item("A")}\${item("B", "4rem")}\${item("C")}</Flex>\`
  })
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    wrap: true,
    gap: "2",
    justify: "flex-start"
  },
  render: args => ({
    components: {
      Flex
    },
    setup: () => ({
      args
    }),
    template: \`<Flex v-bind="args" style="width: 16rem">\${Array.from({
      length: 8
    }, (_, i) => item(\`Chip \${i + 1}\`)).join("")}</Flex>\`
  })
}`,...t.parameters?.docs?.source}}};const k=["Default","Wrapping"];export{n as Default,t as Wrapping,k as __namedExportsOrder,_ as default};
