import{G as k,H as w,e as B,x as p,m as f,c,l as m,B as S,A as V,y as b,C as x,f as $,v as C,r as y}from"./vue.esm-bundler-DkB1Q1v8.js";import{_ as v}from"./Badge-BR2nYQqz.js";import{c as z}from"./cn-CTdd_bgG.js";import{X as D}from"./icons-DSNlrOPV.js";const h=Symbol("mild-ui:tag");function N(e){w(h,e)}function q(){return k(h,null)}const R=["aria-label","disabled"],T=B({__name:"TagCloseButton",props:{disabled:{type:Boolean,default:void 0},label:{default:"Remove"}},emits:["click"],setup(e,{emit:t}){const a=e,l=t,o=q(),u=c(()=>a.disabled??o?.disabled.value??!1);return(g,n)=>(m(),p("button",{type:"button","aria-label":e.label,disabled:u.value,class:"mild-tag__close",onClick:n[0]||(n[0]=s=>l("click",s))},[f(g.$slots,"default",{},()=>[S(V(D))])],8,R))}});T.__docgenInfo={exportName:"default",displayName:"TagCloseButton",description:"",tags:{},props:[{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"undefined"}},{name:"label",description:'Accessible name. Default `"Remove"`.',required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"Remove"'}}],events:[{name:"click",type:{names:["MouseEvent"]}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Tag/TagCloseButton.vue"]};const L=["data-disabled"],E={key:0,class:"mild-tag__icon","aria-hidden":"true"},_=B({__name:"Tag",props:{variant:{default:"subtle"},colorScheme:{default:"gray"},size:{default:"md"},pill:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},closable:{type:Boolean,default:!1},closeLabel:{default:"Remove"}},emits:["close"],setup(e,{emit:t}){const a=e,l=t;N({disabled:c(()=>a.disabled)});const o=y(null),u=c(()=>{const s=o.value?.textContent?.trim();return s?`${a.closeLabel} ${s}`:a.closeLabel});function g(){l("close")}const n=c(()=>z("mild-tag",`mild-tag--${a.variant}`,`mild-tag--${a.colorScheme}`,`mild-tag--${a.size}`,a.pill&&"mild-tag--pill",a.disabled&&"mild-tag--disabled"));return(s,I)=>(m(),p("span",{class:C(n.value),"data-disabled":e.disabled?"":void 0},[s.$slots.icon?(m(),p("span",E,[f(s.$slots,"icon")])):b("",!0),x("span",{ref_key:"label",ref:o,class:"mild-tag__label"},[f(s.$slots,"default")],512),e.closable?(m(),$(T,{key:1,label:u.value,onClick:g},null,8,["label"])):b("",!0)],10,L))}});_.__docgenInfo={exportName:"default",displayName:"Tag",description:"",tags:{},props:[{name:"variant",required:!1,type:{name:"BadgeVariant"},defaultValue:{func:!1,value:'"subtle"'}},{name:"colorScheme",required:!1,type:{name:"BadgeColorScheme"},defaultValue:{func:!1,value:'"gray"'}},{name:"size",required:!1,type:{name:"BadgeSize"},defaultValue:{func:!1,value:'"md"'}},{name:"pill",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"closable",description:"Shows a close button; `close` is emitted when it is pressed.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"closeLabel",description:'Accessible name of the close button. Default `"Remove"`.',required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"Remove"'}}],events:[{name:"close",description:"The close button was pressed."}],slots:[{name:"icon",description:"Leading glyph."},{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Tag/Tag.vue"]};const X={title:"Data Display/Badge",component:v,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Small inline status label (`Badge`, static text) and a removable label (`Tag`, whose close button is a real button named after the label)."}}},argTypes:{variant:{control:"radio",options:["subtle","solid","outline"]},colorScheme:{control:"select",options:["gray","primary","success","warning","danger","info"]},size:{control:"radio",options:["sm","md","lg"]},pill:{control:"boolean"},dot:{control:"boolean"}}},r={render:e=>({components:{Badge:v},setup:()=>({args:e}),template:'<Badge v-bind="args">New</Badge>'})},i={render:()=>({components:{Badge:v},template:`
      <div class="flex flex-wrap items-center gap-2">
        <Badge>Gray</Badge>
        <Badge color-scheme="primary">Primary</Badge>
        <Badge variant="solid" color-scheme="success" dot>Live</Badge>
        <Badge variant="outline" color-scheme="warning" pill>Beta</Badge>
        <Badge variant="solid" color-scheme="danger" size="sm">3</Badge>
        <Badge color-scheme="info" size="lg">Info</Badge>
      </div>
    `})},d={name:"Tag",render:()=>({components:{Tag:_},setup(){const e=y(["Design","Engineering","Research"]);return{tags:e,remove:a=>e.value=e.value.filter(l=>l!==a)}},template:`
      <div class="flex flex-wrap gap-2">
        <Tag v-for="tag in tags" :key="tag" closable color-scheme="primary" @close="remove(tag)">{{ tag }}</Tag>
        <Tag variant="solid" pill>Static</Tag>
        <Tag closable disabled>Disabled</Tag>
      </div>
    `})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Badge
    },
    setup: () => ({
      args
    }),
    template: '<Badge v-bind="args">New</Badge>'
  })
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Badge
    },
    template: \`
      <div class="flex flex-wrap items-center gap-2">
        <Badge>Gray</Badge>
        <Badge color-scheme="primary">Primary</Badge>
        <Badge variant="solid" color-scheme="success" dot>Live</Badge>
        <Badge variant="outline" color-scheme="warning" pill>Beta</Badge>
        <Badge variant="solid" color-scheme="danger" size="sm">3</Badge>
        <Badge color-scheme="info" size="lg">Info</Badge>
      </div>
    \`
  })
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: "Tag",
  render: () => ({
    components: {
      Tag
    },
    setup() {
      const tags = ref(["Design", "Engineering", "Research"]);
      const remove = (tag: string) => tags.value = tags.value.filter(t => t !== tag);
      return {
        tags,
        remove
      };
    },
    template: \`
      <div class="flex flex-wrap gap-2">
        <Tag v-for="tag in tags" :key="tag" closable color-scheme="primary" @close="remove(tag)">{{ tag }}</Tag>
        <Tag variant="solid" pill>Static</Tag>
        <Tag closable disabled>Disabled</Tag>
      </div>
    \`
  })
}`,...d.parameters?.docs?.source}}};const j=["Default","Variants","Tags"];export{r as Default,d as Tags,i as Variants,j as __namedExportsOrder,X as default};
