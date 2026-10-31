import{e as u,h as s,c as i}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as p}from"./cn-CTdd_bgG.js";import{c as f}from"./styling-DD7d-941.js";import{_ as g}from"./Stack-C-G7Y-pm.js";import{_ as h}from"./Text-HyJ-f5G3.js";import"./layout-Bf50BaQu.js";const t=u({name:"Divider",props:{as:{type:String,default:"div"},orientation:{type:String,default:"horizontal"},variant:{type:String,default:"solid"},size:{type:String,default:"sm"},color:{type:String,default:void 0},label:{type:String,default:void 0},labelPosition:{type:String,default:"center"},decorative:{type:Boolean,default:!1}},setup(e,{slots:d}){const l=i(()=>e.label!==void 0||!!d.label),c=i(()=>p("mild-divider",`mild-divider--${e.orientation}`,`mild-divider--${e.variant}`,`mild-divider--${e.size}`,l.value&&"mild-divider--with-label",l.value&&e.labelPosition!=="center"&&`mild-divider--label-${e.labelPosition}`)),m=i(()=>e.color?{"--mild-divider-color":f(e.color)}:void 0),v=i(()=>e.decorative?{role:"none","aria-hidden":"true"}:{role:"separator","aria-orientation":e.orientation});return()=>s(e.as,{class:c.value,style:m.value,...v.value},l.value?[s("span",{class:"mild-divider__label"},d.label?.()??e.label)]:void 0)}});t.__docgenInfo={displayName:"Divider",description:'Horizontal or vertical separator (`role="separator"`), optionally with a label on the line.\nRenders a `div`, or the element given with `as` (`hr`, `li`, ...).\n\nA render function rather than a template: a void `as="hr"` must get no children at all (not\neven a `v-if` placeholder comment).',tags:{},exportName:"default",props:[{name:"as",type:{name:"string"},defaultValue:{func:!1,value:'"div"'}},{name:"orientation",type:{name:"DividerOrientation"},defaultValue:{func:!1,value:'"horizontal"'}},{name:"variant",type:{name:"DividerVariant"},defaultValue:{func:!1,value:'"solid"'}},{name:"size",type:{name:"DividerSize"},defaultValue:{func:!1,value:'"sm"'}},{name:"color",type:{name:"ColorToken"},defaultValue:{func:!1,value:"undefined"}},{name:"label",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"labelPosition",type:{name:"DividerLabelPosition"},defaultValue:{func:!1,value:'"center"'}},{name:"decorative",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Divider/Divider.vue"]};const V={title:"Layout/Divider",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Horizontal or vertical separator (`role="separator"`), optionally with a label on the line. Use `decorative` for purely visual lines (for example inside lists), which hides them from assistive technology.'}}},argTypes:{as:{control:"text"},orientation:{control:"radio",options:["horizontal","vertical"]},variant:{control:"radio",options:["solid","dashed","dotted"]},size:{control:"radio",options:["sm","md","lg"]},color:{control:"text"},label:{control:"text"},labelPosition:{control:"radio",options:["start","center","end"]},decorative:{control:"boolean"}}},a={render:e=>({components:{Divider:t},setup:()=>({args:e}),template:'<div style="width: 20rem"><Divider v-bind="args" /></div>'})},r={args:{label:"OR"},render:a.render},n={render:()=>({components:{Divider:t,Stack:g},template:`
      <Stack gap="4" style="width: 20rem">
        <Divider variant="solid" />
        <Divider variant="dashed" size="md" />
        <Divider variant="dotted" size="lg" color="primary-500" />
        <Divider label="start" label-position="start" />
        <Divider label="end" label-position="end" />
      </Stack>
    `})},o={render:()=>({components:{Divider:t,Text:h},template:`
      <div style="display: flex; align-items: center; gap: 1rem; height: 2rem">
        <Text>Left</Text>
        <Divider orientation="vertical" />
        <Text>Right</Text>
      </div>
    `})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Divider
    },
    setup: () => ({
      args
    }),
    template: \`<div style="width: 20rem"><Divider v-bind="args" /></div>\`
  })
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: "OR"
  },
  render: Default.render
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Divider,
      Stack
    },
    template: \`
      <Stack gap="4" style="width: 20rem">
        <Divider variant="solid" />
        <Divider variant="dashed" size="md" />
        <Divider variant="dotted" size="lg" color="primary-500" />
        <Divider label="start" label-position="start" />
        <Divider label="end" label-position="end" />
      </Stack>
    \`
  })
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Divider,
      Text
    },
    template: \`
      <div style="display: flex; align-items: center; gap: 1rem; height: 2rem">
        <Text>Left</Text>
        <Divider orientation="vertical" />
        <Text>Right</Text>
      </div>
    \`
  })
}`,...o.parameters?.docs?.source}}};const _=["Default","WithLabel","Variants","Vertical"];export{a as Default,n as Variants,o as Vertical,r as WithLabel,_ as __namedExportsOrder,V as default};
