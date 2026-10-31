import{e as k,E as V,x as s,m as u,y as i,C as _,B as f,A as p,v as B,c as l,l as a,F as v,D as g}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as D}from"./cn-CTdd_bgG.js";import{S as x,X as I}from"./icons-DSNlrOPV.js";const q=["role","data-status"],C={key:0,class:"mild-alert__icon","aria-hidden":"true"},z={class:"mild-alert__content"},$={key:0,class:"mild-alert__title"},N={key:1,class:"mild-alert__description"},F=["aria-label"],r=k({__name:"Alert",props:{title:{default:void 0},description:{default:void 0},noIcon:{type:Boolean,default:!1},dismissLabel:{default:"Dismiss"},role:{default:void 0},status:{default:"info"},variant:{default:"subtle"},size:{default:"md"},dismissible:{type:Boolean,default:!1}},emits:["dismiss"],setup(e,{emit:y}){const t=e,h=y,c=V(),b=l(()=>t.role??(t.status==="error"||t.status==="warning"?"alert":"status")),A=l(()=>t.title!==void 0||!!c.title),w=l(()=>t.description!==void 0||!!c.default),S=l(()=>D("mild-alert",`mild-alert--${t.variant}`,`mild-alert--${t.status}`,t.size!=="md"&&`mild-alert--${t.size}`,t.dismissible&&"mild-alert--dismissible"));return(d,m)=>(a(),s("div",{role:b.value,"data-status":e.status,class:B(S.value)},[e.noIcon?i("",!0):(a(),s("span",C,[u(d.$slots,"icon",{},()=>[f(p(x),{status:e.status},null,8,["status"])])])),_("div",z,[A.value?(a(),s("div",$,[u(d.$slots,"title",{},()=>[v(g(e.title),1)])])):i("",!0),w.value?(a(),s("div",N,[u(d.$slots,"default",{},()=>[v(g(e.description),1)])])):i("",!0)]),e.dismissible?(a(),s("button",{key:1,type:"button",class:"mild-alert__dismiss","aria-label":e.dismissLabel,onClick:m[0]||(m[0]=T=>h("dismiss"))},[f(p(I))],8,F)):i("",!0)],10,q))}});r.__docgenInfo={exportName:"default",displayName:"Alert",description:"",tags:{},props:[{name:"dismissible",description:"Shows a close button; `dismiss` is emitted when it is pressed.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"size",required:!1,type:{name:"AlertSize"},defaultValue:{func:!1,value:'"md"'}},{name:"variant",description:'Visual style. Default `"subtle"`.',required:!1,type:{name:"AlertVariant"},defaultValue:{func:!1,value:'"subtle"'}},{name:"status",description:'Semantic status; also picks the default icon. Default `"info"`.',required:!1,type:{name:"AlertStatus"},defaultValue:{func:!1,value:'"info"'}},{name:"title",description:"Bold first line. Use the `title` slot for rich content.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"description",description:"Body text; the default slot is an alias.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"noIcon",description:"Drop the status glyph.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"dismissLabel",description:'Accessible name of the close button. Default `"Dismiss"`.',required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"Dismiss"'}},{name:"role",description:'`"alert"` for errors and warnings, `"status"` otherwise, unless given.',required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}}],events:[{name:"dismiss"}],slots:[{name:"icon",description:"Replaces the status glyph."},{name:"title"},{name:"default",description:"Body content; an alias of `description`."}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Alert/Alert.vue"]};const X={title:"Feedback/Alert",component:r,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Inline status message. Rendered with `role="alert"` for errors and warnings (announced at once) and `role="status"` otherwise, unless a `role` is given.'}}},argTypes:{status:{control:"select",options:["info","success","warning","error"]},variant:{control:"select",options:["subtle","solid","left-accent","top-accent"]},size:{control:"radio",options:["sm","md","lg"]},dismissible:{control:"boolean"},noIcon:{control:"boolean"},title:{control:"text"},description:{control:"text"},onDismiss:{action:"dismiss"}},args:{title:"Heads up",description:"Your changes have been saved."}},n={render:e=>({components:{Alert:r},setup:()=>({args:e}),template:'<div class="w-96"><Alert v-bind="args" /></div>'})},o={render:()=>({components:{Alert:r},template:`
      <div class="flex flex-col gap-3 w-96">
        <Alert status="info" title="Info" description="Something you should know." />
        <Alert status="success" title="Saved" description="All good." dismissible />
        <Alert status="warning" variant="left-accent" title="Careful" description="Check your input." />
        <Alert status="error" variant="solid" title="Failed" description="Try again." />
      </div>
    `})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Alert
    },
    setup: () => ({
      args
    }),
    template: '<div class="w-96"><Alert v-bind="args" /></div>'
  })
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Alert
    },
    template: \`
      <div class="flex flex-col gap-3 w-96">
        <Alert status="info" title="Info" description="Something you should know." />
        <Alert status="success" title="Saved" description="All good." dismissible />
        <Alert status="warning" variant="left-accent" title="Careful" description="Check your input." />
        <Alert status="error" variant="solid" title="Failed" description="Try again." />
      </div>
    \`
  })
}`,...o.parameters?.docs?.source}}};const H=["Default","Statuses"];export{n as Default,o as Statuses,H as __namedExportsOrder,X as default};
