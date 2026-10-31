import{_ as c}from"./Text-HyJ-f5G3.js";import{e as m,f as u,j as p,n as f,v as h,k as g,c as s,l as x,m as v}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as y}from"./cn-CTdd_bgG.js";import{a as i}from"./styling-DD7d-941.js";const t=m({__name:"ScrollArea",props:{as:{default:"div"},orientation:{default:"vertical"},scrollbars:{default:"auto"},height:{default:void 0},maxHeight:{default:void 0},maxWidth:{default:void 0}},setup(r){const e=r,n=s(()=>y("mild-scroll-area",`mild-scroll-area--${e.orientation}`,e.scrollbars!=="auto"&&`mild-scroll-area--${e.scrollbars}`)),d=s(()=>{const a={};return e.height&&(a.height=i(e.height)),e.maxHeight&&(a.maxHeight=i(e.maxHeight)),e.maxWidth&&(a.maxWidth=i(e.maxWidth)),Object.keys(a).length>0?a:void 0});return(a,b)=>(x(),u(g(r.as),{class:h(n.value),style:f(d.value),tabindex:"0"},{default:p(()=>[v(a.$slots,"default")]),_:3},8,["class","style"]))}});t.__docgenInfo={exportName:"default",displayName:"ScrollArea",description:"",tags:{},props:[{name:"maxWidth",description:"Max width (dimension token); the usual way to make a horizontal area scroll.",required:!1,type:{name:"DimensionToken"},defaultValue:{func:!1,value:"undefined"}},{name:"maxHeight",description:"Max height (dimension token); the usual way to make a vertical area scroll.",required:!1,type:{name:"DimensionToken"},defaultValue:{func:!1,value:"undefined"}},{name:"height",description:"Fixed height (dimension token).",required:!1,type:{name:"DimensionToken"},defaultValue:{func:!1,value:"undefined"}},{name:"scrollbars",description:'Scrollbar visibility. Default `"auto"`.',required:!1,type:{name:"ScrollAreaScrollbars"},defaultValue:{func:!1,value:'"auto"'}},{name:"orientation",description:'Which axis scrolls. Default `"vertical"`.',required:!1,type:{name:"ScrollAreaOrientation"},defaultValue:{func:!1,value:'"vertical"'}},{name:"as",description:"Element to render. Defaults to `div`.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"div"'}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/ScrollArea/ScrollArea.vue"]};const _={title:"Layout/ScrollArea",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Scroll container with slim, themed scrollbars. Give it a `maxHeight` (or `maxWidth` for horizontal) so the content has something to overflow. Keyboard-focusable so the region can be scrolled without a pointer."}}},argTypes:{as:{control:"text"},orientation:{control:"radio",options:["vertical","horizontal","both"]},scrollbars:{control:"radio",options:["auto","always","hover","hidden"]},height:{control:"text"},maxHeight:{control:"text"},maxWidth:{control:"text"}},args:{maxHeight:"48"}},o={render:r=>({components:{ScrollArea:t,Text:c},setup:()=>({args:r,lines:Array.from({length:30},(e,n)=>`Line ${n+1}`)}),template:`
      <ScrollArea v-bind="args" role="region" aria-label="Log" style="width: 20rem; border: 1px solid var(--mild-border); border-radius: var(--mild-radius-md); padding: .5rem">
        <Text v-for="line in lines" :key="line" as="p">{{ line }}</Text>
      </ScrollArea>
    `})},l={args:{orientation:"horizontal",maxWidth:"80",scrollbars:"always",maxHeight:void 0},render:r=>({components:{ScrollArea:t},setup:()=>({args:r}),template:`
      <ScrollArea v-bind="args" as="ul" aria-label="Chips" style="display: flex; gap: .5rem; list-style: none; padding: .5rem; margin: 0">
        <li v-for="i in 20" :key="i" style="flex: none; padding: .25rem .75rem; border-radius: 999px; background: var(--mild-color-gray-200)">Chip {{ i }}</li>
      </ScrollArea>
    `})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      ScrollArea,
      Text
    },
    setup: () => ({
      args,
      lines: Array.from({
        length: 30
      }, (_, i) => \`Line \${i + 1}\`)
    }),
    template: \`
      <ScrollArea v-bind="args" role="region" aria-label="Log" style="width: 20rem; border: 1px solid var(--mild-border); border-radius: var(--mild-radius-md); padding: .5rem">
        <Text v-for="line in lines" :key="line" as="p">{{ line }}</Text>
      </ScrollArea>
    \`
  })
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: "horizontal",
    maxWidth: "80",
    scrollbars: "always",
    maxHeight: undefined
  },
  render: args => ({
    components: {
      ScrollArea
    },
    setup: () => ({
      args
    }),
    template: \`
      <ScrollArea v-bind="args" as="ul" aria-label="Chips" style="display: flex; gap: .5rem; list-style: none; padding: .5rem; margin: 0">
        <li v-for="i in 20" :key="i" style="flex: none; padding: .25rem .75rem; border-radius: 999px; background: var(--mild-color-gray-200)">Chip {{ i }}</li>
      </ScrollArea>
    \`
  })
}`,...l.parameters?.docs?.source}}};const H=["Default","Horizontal"];export{o as Default,l as Horizontal,H as __namedExportsOrder,_ as default};
