import{e as p,f as b,j as h,k,l as c,m as i,A as I,x as _,F as w,h as u,i as L,J as x,M as S,T as V}from"./vue.esm-bundler-DkB1Q1v8.js";import{_ as A}from"./Link-CgDG_gSH.js";import{c as C}from"./cn-CTdd_bgG.js";const B=p({__name:"BreadcrumbItem",props:{as:{default:"li"}},setup(e){return(a,r)=>(c(),b(k(e.as),{class:"mild-breadcrumb-item"},{default:h(()=>[i(a.$slots,"default")]),_:3}))}});B.__docgenInfo={exportName:"default",displayName:"BreadcrumbItem",description:"",tags:{},props:[{name:"as",description:"Element to render. Defaults to `li`.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"li"'}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Breadcrumb/BreadcrumbItem.vue"]};const g=p({__name:"BreadcrumbLink",props:{as:{default:void 0},current:{type:Boolean,default:!1},href:{default:void 0},underline:{default:"hover"},external:{type:Boolean,default:!1},plain:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1}},emits:["click"],setup(e,{emit:a}){const r=a;return(t,n)=>e.current?(c(),b(k(e.as??"span"),{key:0,class:"mild-breadcrumb-page","aria-current":"page"},{default:h(()=>[i(t.$slots,"default")]),_:3})):(c(),b(I(A),{key:1,as:e.as??"a",href:e.href,underline:e.underline,external:e.external,disabled:e.disabled,plain:"",class:"mild-breadcrumb-link",onClick:n[0]||(n[0]=s=>r("click",s))},{default:h(()=>[i(t.$slots,"default")]),_:3},8,["as","href","underline","external","disabled"]))}});g.__docgenInfo={exportName:"default",displayName:"BreadcrumbLink",description:"",tags:{},props:[{name:"disabled",description:'Inert link: `aria-disabled="true"`, no `href`, not focusable, clicks are swallowed.',required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"plain",description:"Inherit the surrounding text color instead of the accent color.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"external",description:'Opens in a new tab: sets `target="_blank"` and `rel="noopener noreferrer"` unless the\ncaller passes its own.',required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"underline",description:'Underline behaviour. Default `"hover"`.',required:!1,type:{name:"LinkUnderline"},defaultValue:{func:!1,value:'"hover"'}},{name:"href",description:"Target URL.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"as",description:"Element or component to render.",required:!1,type:{name:"union",elements:[{name:"string"},{name:"Component"}]},defaultValue:{func:!1,value:"undefined"}},{name:"current",description:'The current page: rendered as text with `aria-current="page"` instead of a link.',required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"click",type:{names:["MouseEvent"]}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Breadcrumb/BreadcrumbLink.vue"]};const N={class:"mild-breadcrumb-separator","aria-hidden":"true"},v=p({__name:"BreadcrumbSeparator",setup(e){return(a,r)=>(c(),_("li",N,[i(a.$slots,"default",{},()=>[r[0]||(r[0]=w("/",-1))])]))}});v.__docgenInfo={exportName:"default",displayName:"BreadcrumbSeparator",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Breadcrumb/BreadcrumbSeparator.vue"]};function y(e){const a=[];for(const r of e)L(r)&&(r.type===x&&Array.isArray(r.children)?a.push(...y(r.children)):r.type!==S&&!(r.type===V&&!String(r.children).trim())&&a.push(r));return a}const f=p({name:"Breadcrumb",props:{as:{type:String,default:"nav"},items:{type:Array,default:void 0},separator:{type:String,default:"/"},ui:{type:Object,default:void 0}},setup(e,{slots:a}){function r(t,n){const s=t.current??(n&&!t.href);return u(B,{key:`${t.label}-${t.href??""}`},()=>u(g,{current:s,href:s?void 0:t.href},()=>t.label))}return()=>{const t=e.items?e.items.map((s,l)=>r(s,l===e.items.length-1)):y(a.default?.()??[]),n=[];return t.forEach((s,l)=>{l>0&&n.push(u(v,{key:`separator-${l}`,class:e.ui?.separator},()=>a.separator?a.separator():e.separator)),n.push(s)}),u(e.as,{class:"mild-breadcrumb","aria-label":"Breadcrumb"},[u("ol",{class:C("mild-breadcrumb__list",e.ui?.list)},n)])}}});f.__docgenInfo={displayName:"Breadcrumb",description:"Trail of links to the current page (`nav > ol`), with decorative separators inserted\nbetween the steps. Pass `items` for the common case, or compose `BreadcrumbItem` /\n`BreadcrumbLink` children yourself.\n\nA render function rather than a template: the separators go between whatever the slot\nrenders, which means reading the slot's vnodes.",tags:{},exportName:"default",props:[{name:"as",type:{name:"string"},defaultValue:{func:!1,value:'"nav"'}},{name:"items",type:{name:"BreadcrumbItemData[]"},defaultValue:{func:!1,value:"undefined"}},{name:"separator",type:{name:"string"},defaultValue:{func:!1,value:'"/"'}},{name:"ui",type:{name:"BreadcrumbUiClasses"},defaultValue:{func:!1,value:"undefined"}}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Breadcrumb/Breadcrumb.vue"]};const $=[{label:"Home",href:"#"},{label:"Components",href:"#components"},{label:"Breadcrumb"}],E={title:"Navigation/Breadcrumb",component:f,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Trail of links to the current page (`nav > ol`), with decorative separators inserted between the steps. Pass `items` for the common case, or compose `BreadcrumbItem` / `BreadcrumbLink` children yourself. The last item without an `href` is the current page (`aria-current="page"`), per the [WAI-ARIA APG breadcrumb pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/).'}}},argTypes:{separator:{control:"text"},as:{control:"text"}},args:{items:$,separator:"/"}},o={render:e=>({components:{Breadcrumb:f},setup:()=>({args:e}),template:'<Breadcrumb v-bind="args" />'})},d={args:{separator:"›"},render:o.render},m={render:()=>({components:{Breadcrumb:f,BreadcrumbItem:B,BreadcrumbLink:g},template:`
      <Breadcrumb aria-label="You are here">
        <template #separator><span aria-hidden="true">→</span></template>
        <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem><BreadcrumbLink href="#settings">Settings</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem><BreadcrumbLink current>Profile</BreadcrumbLink></BreadcrumbItem>
      </Breadcrumb>
    `})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Breadcrumb
    },
    setup: () => ({
      args
    }),
    template: '<Breadcrumb v-bind="args" />'
  })
}`,...o.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    separator: "›"
  },
  render: Default.render
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Breadcrumb,
      BreadcrumbItem,
      BreadcrumbLink
    },
    template: \`
      <Breadcrumb aria-label="You are here">
        <template #separator><span aria-hidden="true">→</span></template>
        <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem><BreadcrumbLink href="#settings">Settings</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem><BreadcrumbLink current>Profile</BreadcrumbLink></BreadcrumbItem>
      </Breadcrumb>
    \`
  })
}`,...m.parameters?.docs?.source}}};const F=["Default","CustomSeparator","Composed"];export{m as Composed,d as CustomSeparator,o as Default,F as __namedExportsOrder,E as default};
