import{e as y,E as $,x as d,C as h,m as D,y as P,z as x,c as s,l as m,F as T,D as w}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as _}from"./cn-CTdd_bgG.js";function V(r,e,a){return a<=e?0:(Math.min(a,Math.max(e,r))-e)/(a-e)}function k(r,e,a){return Math.round(V(r,e,a)*100)}function C({value:r,min:e,max:a,indeterminate:l,label:o,valueText:t}){const n=!l&&r!==void 0;return{role:"progressbar","aria-valuemin":e,"aria-valuemax":a,"aria-valuenow":n?Math.min(a,Math.max(e,r)):void 0,"aria-valuetext":n?t??`${k(r,e,a)}%`:t,"aria-label":o,"aria-busy":l||void 0}}const M=["viewBox"],N=["r","stroke-width"],W=["r","stroke-width","stroke-dasharray","stroke-dashoffset"],F={key:0,class:"mild-circular-progress__label","aria-hidden":"true"},c=100,S=y({__name:"CircularProgress",props:{value:{default:void 0},min:{default:0},max:{default:100},indeterminate:{type:Boolean,default:void 0},size:{default:"md"},colorScheme:{default:"primary"},thickness:{default:.1},label:{default:void 0},valueText:{default:void 0},showValue:{type:Boolean,default:!1}},setup(r){const e=r,a=$(),l=s(()=>e.indeterminate??e.value===void 0),o=s(()=>l.value||e.value===void 0?0:V(e.value,e.min,e.max)),t=s(()=>C({value:e.value,min:e.min,max:e.max,indeterminate:l.value,label:e.label,valueText:e.valueText})),n=s(()=>Math.min(.5,Math.max(.02,e.thickness))*c),i=s(()=>(c-n.value)/2),u=s(()=>2*Math.PI*i.value),f=c/2,q=s(()=>!!a.default||e.showValue&&!l.value),z=s(()=>_("mild-circular-progress",`mild-circular-progress--${e.size}`,`mild-circular-progress--${e.colorScheme}`,l.value&&"mild-circular-progress--indeterminate"));return(B,I)=>(m(),d("div",x(t.value,{class:z.value}),[(m(),d("svg",{class:"mild-circular-progress__svg",viewBox:`0 0 ${c} ${c}`,"aria-hidden":"true",focusable:"false"},[h("circle",{class:"mild-circular-progress__track",cx:f,cy:f,r:i.value,"stroke-width":n.value},null,8,N),h("circle",{class:"mild-circular-progress__bar",cx:f,cy:f,r:i.value,"stroke-width":n.value,"stroke-dasharray":l.value?void 0:u.value,"stroke-dashoffset":l.value?void 0:u.value*(1-o.value)},null,8,W)],8,M)),q.value?(m(),d("span",F,[D(B.$slots,"default",{},()=>[T(w(t.value["aria-valuetext"]),1)])])):P("",!0)],16))}});S.__docgenInfo={exportName:"default",displayName:"CircularProgress",description:"",tags:{},props:[{name:"value",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"undefined"}},{name:"min",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"max",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"100"}},{name:"indeterminate",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"undefined"}},{name:"size",required:!1,type:{name:"CircularProgressSize"},defaultValue:{func:!1,value:'"md"'}},{name:"colorScheme",required:!1,type:{name:"ProgressColorScheme"},defaultValue:{func:!1,value:'"primary"'}},{name:"thickness",description:"Ring thickness as a fraction of the size (0-1). Default `0.1`.",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"0.1"}},{name:"label",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"valueText",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"showValue",description:"Show the percentage in the middle.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",description:"Content shown in the middle of the ring (instead of the percentage)."}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/CircularProgress/CircularProgress.vue"]};const A={class:"mild-progress-field"},E={key:0,class:"mild-progress__label","aria-hidden":"true"},b=y({inheritAttrs:!1,__name:"Progress",props:{value:{default:void 0},min:{default:0},max:{default:100},indeterminate:{type:Boolean,default:void 0},size:{default:"md"},colorScheme:{default:"primary"},striped:{type:Boolean,default:!1},animated:{type:Boolean,default:!1},label:{default:void 0},valueText:{default:void 0},showValue:{type:Boolean,default:!1}},setup(r){const e=r,a=s(()=>e.indeterminate??e.value===void 0),l=s(()=>a.value||e.value===void 0?0:k(e.value,e.min,e.max)),o=s(()=>C({value:e.value,min:e.min,max:e.max,indeterminate:a.value,label:e.label,valueText:e.valueText})),t=s(()=>_("mild-progress",`mild-progress--${e.size}`,`mild-progress--${e.colorScheme}`,e.striped&&"mild-progress--striped",e.animated&&"mild-progress--animated",a.value&&"mild-progress--indeterminate")),n=s(()=>a.value?void 0:{"--mild-progress-value":`${l.value}%`});return(i,u)=>(m(),d("div",A,[h("div",x({...o.value,...i.$attrs},{class:t.value,style:n.value}),[...u[0]||(u[0]=[h("div",{class:"mild-progress__bar"},null,-1)])],16),r.showValue&&!a.value?(m(),d("span",E,w(o.value["aria-valuetext"]),1)):P("",!0)]))}});b.__docgenInfo={exportName:"default",displayName:"Progress",description:"",tags:{},props:[{name:"value",description:"Current value between `min` and `max`. Omit (or set `indeterminate`) for unknown progress.",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"undefined"}},{name:"min",description:"Default `0`.",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"max",description:"Default `100`.",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"100"}},{name:"indeterminate",description:"Unknown progress: the bar animates instead of filling.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"undefined"}},{name:"size",required:!1,type:{name:"ProgressSize"},defaultValue:{func:!1,value:'"md"'}},{name:"colorScheme",required:!1,type:{name:"ProgressColorScheme"},defaultValue:{func:!1,value:'"primary"'}},{name:"striped",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"animated",description:"Animate the stripes.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"label",description:"Accessible name.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"valueText",description:'Human-readable value for assistive technology (`aria-valuetext`), e.g. "3 of 10 files".',required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"showValue",description:"Show the percentage under the bar.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Progress/Progress.vue"]};const U={title:"Feedback/Progress",component:b,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Linear (`Progress`) and ring-shaped (`CircularProgress`) progress indicators with `role="progressbar"`. Without a `value`, or with `indeterminate`, they animate and announce themselves as busy.'}}},argTypes:{value:{control:{type:"range",min:0,max:100}},indeterminate:{control:"boolean"},size:{control:"select",options:["xs","sm","md","lg"]},colorScheme:{control:"select",options:["primary","success","warning","danger","info"]},striped:{control:"boolean"},animated:{control:"boolean"},showValue:{control:"boolean"},label:{control:"text"}},args:{value:40,label:"Upload"}},p={render:r=>({components:{Progress:b},setup:()=>({args:r}),template:'<div class="w-80"><Progress v-bind="args" /></div>'})},v={render:()=>({components:{Progress:b},template:`
      <div class="flex flex-col gap-4 w-80">
        <Progress :value="30" label="Small" size="sm" />
        <Progress :value="60" label="Success" color-scheme="success" show-value />
        <Progress :value="80" label="Striped" striped animated color-scheme="warning" size="lg" />
        <Progress indeterminate label="Working" />
      </div>
    `})},g={name:"CircularProgress",render:()=>({components:{CircularProgress:S},template:`
      <div class="flex items-center gap-6">
        <CircularProgress :value="25" label="Storage" />
        <CircularProgress :value="65" label="Done" show-value color-scheme="success" size="lg" />
        <CircularProgress indeterminate label="Working" size="xl" color-scheme="warning" />
        <CircularProgress :value="100" label="Complete" :thickness="0.2">✓</CircularProgress>
      </div>
    `})};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Progress
    },
    setup: () => ({
      args
    }),
    template: '<div class="w-80"><Progress v-bind="args" /></div>'
  })
}`,...p.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Progress
    },
    template: \`
      <div class="flex flex-col gap-4 w-80">
        <Progress :value="30" label="Small" size="sm" />
        <Progress :value="60" label="Success" color-scheme="success" show-value />
        <Progress :value="80" label="Striped" striped animated color-scheme="warning" size="lg" />
        <Progress indeterminate label="Working" />
      </div>
    \`
  })
}`,...v.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: "CircularProgress",
  render: () => ({
    components: {
      CircularProgress
    },
    template: \`
      <div class="flex items-center gap-6">
        <CircularProgress :value="25" label="Storage" />
        <CircularProgress :value="65" label="Done" show-value color-scheme="success" size="lg" />
        <CircularProgress indeterminate label="Working" size="xl" color-scheme="warning" />
        <CircularProgress :value="100" label="Complete" :thickness="0.2">✓</CircularProgress>
      </div>
    \`
  })
}`,...g.parameters?.docs?.source}}};const H=["Default","Variants","Circular"];export{g as Circular,p as Default,v as Variants,H as __namedExportsOrder,U as default};
