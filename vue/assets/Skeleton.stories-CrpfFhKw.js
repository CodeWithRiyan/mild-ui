import{e as f,m as s,x as i,n as h,v as k,c,l as r,J as v,K as g,f as S,r as x}from"./vue.esm-bundler-DkB1Q1v8.js";import{_ as y}from"./Text-HyJ-f5G3.js";import{_ as w}from"./Stack-C-G7Y-pm.js";import{c as T}from"./cn-CTdd_bgG.js";import{a as m}from"./styling-DD7d-941.js";import"./layout-Bf50BaQu.js";const n=f({__name:"Skeleton",props:{variant:{default:"rect"},animation:{default:"pulse"},width:{default:void 0},height:{default:void 0},loaded:{type:Boolean,default:!1}},setup(e){const a=e,u=c(()=>T("mild-skeleton",`mild-skeleton--${a.variant}`,`mild-skeleton--${a.animation}`)),d=c(()=>{const t={};return a.width&&(t.width=m(a.width)),a.height&&(t.height=m(a.height)),Object.keys(t).length>0?t:void 0});return(t,_)=>e.loaded?s(t.$slots,"default",{},void 0,void 0,0):(r(),i("div",{key:1,"aria-hidden":"true","data-loading":"",class:k(u.value),style:h(d.value)},[s(t.$slots,"default")],6))}});n.__docgenInfo={exportName:"default",displayName:"Skeleton",description:"",tags:{},props:[{name:"variant",required:!1,type:{name:"SkeletonVariant"},defaultValue:{func:!1,value:'"rect"'}},{name:"animation",required:!1,type:{name:"SkeletonAnimation"},defaultValue:{func:!1,value:'"pulse"'}},{name:"width",required:!1,type:{name:"DimensionToken"},defaultValue:{func:!1,value:"undefined"}},{name:"height",required:!1,type:{name:"DimensionToken"},defaultValue:{func:!1,value:"undefined"}},{name:"loaded",description:"Render the children instead of the placeholder.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Skeleton/Skeleton.vue"]};const b={key:1,"aria-hidden":"true",class:"mild-skeleton-text"},p=f({__name:"SkeletonText",props:{lines:{default:3},animation:{default:"pulse"},width:{default:void 0},loaded:{type:Boolean,default:!1}},setup(e){return(a,u)=>e.loaded?s(a.$slots,"default",{},void 0,void 0,0):(r(),i("div",b,[(r(!0),i(v,null,g(e.lines,d=>(r(),S(n,{key:d,variant:"text",animation:e.animation,width:e.width},null,8,["animation","width"]))),128))]))}});p.__docgenInfo={exportName:"default",displayName:"SkeletonText",description:"",tags:{},props:[{name:"lines",description:"Number of lines. Default `3`.",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"3"}},{name:"animation",defaultValue:{func:!1,value:'"pulse"'}},{name:"width",defaultValue:{func:!1,value:"undefined"}},{name:"loaded",defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Skeleton/SkeletonText.vue"]};const N={title:"Feedback/Skeleton",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Placeholder shape shown while content loads (hidden from assistive technology; mark the region `aria-busy`). Renders its children once `loaded`. `SkeletonText` is a paragraph placeholder."}}},argTypes:{variant:{control:"radio",options:["text","circle","rect"]},animation:{control:"radio",options:["pulse","wave","none"]},width:{control:"text"},height:{control:"text"},loaded:{control:"boolean"}},args:{width:"48",height:"8"}},o={render:e=>({components:{Skeleton:n},setup:()=>({args:e}),template:'<Skeleton v-bind="args" />'})},l={render:()=>({components:{Skeleton:n,SkeletonText:p,Stack:w,Text:y},setup(){const e=x(!1);return setTimeout(()=>e.value=!0,2500),{loaded:e}},template:`
      <div class="w-80" :aria-busy="!loaded">
        <Stack direction="row" gap="3" align="center">
          <Skeleton variant="circle" width="12" height="12" :loaded="loaded">
            <div style="width: 3rem; height: 3rem; border-radius: 999px; background: var(--mild-color-primary-500)" />
          </Skeleton>
          <Stack gap="2" style="flex: 1">
            <SkeletonText :lines="2" animation="wave" :loaded="loaded">
              <Text as="p"><strong>Ada Lovelace</strong></Text>
              <Text as="p" color="muted">Loaded after 2.5 seconds.</Text>
            </SkeletonText>
          </Stack>
        </Stack>
      </div>
    `})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Skeleton
    },
    setup: () => ({
      args
    }),
    template: '<Skeleton v-bind="args" />'
  })
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Skeleton,
      SkeletonText,
      Stack,
      Text
    },
    setup() {
      const loaded = ref(false);
      setTimeout(() => loaded.value = true, 2500);
      return {
        loaded
      };
    },
    template: \`
      <div class="w-80" :aria-busy="!loaded">
        <Stack direction="row" gap="3" align="center">
          <Skeleton variant="circle" width="12" height="12" :loaded="loaded">
            <div style="width: 3rem; height: 3rem; border-radius: 999px; background: var(--mild-color-primary-500)" />
          </Skeleton>
          <Stack gap="2" style="flex: 1">
            <SkeletonText :lines="2" animation="wave" :loaded="loaded">
              <Text as="p"><strong>Ada Lovelace</strong></Text>
              <Text as="p" color="muted">Loaded after 2.5 seconds.</Text>
            </SkeletonText>
          </Stack>
        </Stack>
      </div>
    \`
  })
}`,...l.parameters?.docs?.source}}};const C=["Default","CardPlaceholder"];export{l as CardPlaceholder,o as Default,C as __namedExportsOrder,N as default};
