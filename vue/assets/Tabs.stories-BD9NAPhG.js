import{G as R,H as G,e as w,r as I,x as y,m as C,v as k,c,l as V,A as b,y as W}from"./vue.esm-bundler-DkB1Q1v8.js";import{_ as O}from"./Text-HyJ-f5G3.js";import{c as A}from"./cn-CTdd_bgG.js";import{u as j}from"./useMachine-DL-Cf-96.js";import{u as U}from"./useId-jK020Zqe.js";const F=Symbol("mild-ui:tabs");function J(e){G(F,e)}function S(e){const a=R(F,null);if(!a)throw new Error(`<${e}> must be rendered inside <Tabs>.`);return a}const P=(e,a)=>`${e}-tab-${a}`,H=(e,a)=>`${e}-panel-${a}`,Q=["data-orientation"],_=w({__name:"Tabs",props:{modelValue:{default:void 0},defaultValue:{default:void 0},variant:{default:"default"},size:{default:"md"},orientation:{default:"horizontal"},activation:{default:"automatic"}},emits:["update:modelValue","change"],setup(e,{emit:a}){const t=e,r=a,i=c(()=>t.modelValue!==void 0),s=I(t.defaultValue??null),d=c(()=>i.value?t.modelValue:s.value);function p(u){i.value||(s.value=u),r("update:modelValue",u),r("change",u)}J({value:d,baseId:U(),select:p,variant:c(()=>t.variant),size:c(()=>t.size),orientation:c(()=>t.orientation),activation:c(()=>t.activation)});const m=c(()=>A("mild-tabs",t.orientation==="vertical"&&"mild-tabs--vertical"));return(u,g)=>(V(),y("div",{"data-orientation":e.orientation,class:k(m.value)},[C(u.$slots,"default")],10,Q))}});_.__docgenInfo={exportName:"default",displayName:"Tabs",description:"",tags:{},props:[{name:"modelValue",description:"`v-model`: the selected tab.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"defaultValue",description:"Initial tab when uncontrolled.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"variant",required:!1,type:{name:"TabsVariant"},defaultValue:{func:!1,value:'"default"'}},{name:"size",required:!1,type:{name:"TabsSize"},defaultValue:{func:!1,value:'"md"'}},{name:"orientation",required:!1,type:{name:"TabsOrientation"},defaultValue:{func:!1,value:'"horizontal"'}},{name:"activation",description:'`"automatic"` selects on focus (default), `"manual"` on Enter / Space.',required:!1,type:{name:"TabsActivation"},defaultValue:{func:!1,value:'"automatic"'}}],events:[{name:"update:modelValue",type:{names:["string"]},description:"`v-model`"},{name:"change",type:{names:["string"]}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Tabs/Tabs.vue"]};function $(e){return e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"}function z(e){return e.getAttribute("data-value")??(e.textContent??"").trim()}function X(e){const{element:a,orientation:t="horizontal",activation:r="automatic",onChange:i}=e;let s=e.value??null,d=[];a.setAttribute("role","tablist"),a.setAttribute("aria-orientation",t);function p(){d=Array.from(a.querySelectorAll('[role="tab"]'))}function m(){return d.filter(n=>!$(n))}function u(){const n=d.find(l=>z(l)===s&&!$(l)),v=d.find(l=>l===document.activeElement)??n??m()[0];for(const l of d)l.setAttribute("aria-selected",String(z(l)===s)),l.setAttribute("tabindex",l===v?"0":"-1")}function g(n){if($(n))return;const o=z(n);if(o===s){u();return}s=o,u(),i?.(s)}function L(n){n&&(n.focus(),r==="automatic"?g(n):u())}function N(n){const o=m();if(o.length===0)return;const v=o.indexOf(document.activeElement),l=v===-1?0:(v+n+o.length)%o.length;L(o[l])}function B(n){const o=t==="horizontal",v=o?"ArrowLeft":"ArrowUp",l=o?"ArrowRight":"ArrowDown";switch(n.key){case l:n.preventDefault(),N(1);break;case v:n.preventDefault(),N(-1);break;case"Home":n.preventDefault(),L(m()[0]);break;case"End":{n.preventDefault();const T=m();L(T[T.length-1]);break}case"Enter":case" ":{const T=d.find(K=>K===n.target);if(!T)return;n.preventDefault(),g(T);break}}}function M(n){const o=n.target.closest('[role="tab"]');!o||!d.includes(o)||g(o)}return a.addEventListener("keydown",B),a.addEventListener("click",M),p(),u(),{element:a,getValue:()=>s,setValue:n=>{s=n,u()},refresh:()=>{p(),u()},destroy:()=>{a.removeEventListener("keydown",B),a.removeEventListener("click",M)}}}const Y=["aria-orientation"],E=w({__name:"TabsList",setup(e){const a=S("TabsList"),t=I(null);j(t,(i,s)=>X({element:i,...s}),()=>({value:a.value.value,orientation:a.orientation.value,activation:a.activation.value,onChange:a.select}),(i,s)=>{i.refresh(),i.setValue(s.value)},()=>[a.orientation.value,a.activation.value]);const r=c(()=>A("mild-tabs-list",`mild-tabs-list--${a.variant.value}`,`mild-tabs-list--${a.orientation.value}`,a.size.value!=="md"&&`mild-tabs-list--${a.size.value}`));return(i,s)=>(V(),y("div",{ref_key:"element",ref:t,role:"tablist","aria-orientation":b(a).orientation.value,class:k(r.value)},[C(i.$slots,"default")],10,Y))}});E.__docgenInfo={exportName:"default",displayName:"TabsList",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Tabs/TabsList.vue"]};const Z=["id","aria-selected","aria-controls","tabindex","data-value","data-state","data-disabled","disabled"],D=w({__name:"TabsTrigger",props:{value:{},disabled:{type:Boolean,default:!1}},setup(e){const a=e,t=S("TabsTrigger"),r=c(()=>t.value.value===a.value),i=c(()=>A("mild-tabs-trigger",r.value&&"mild-tabs-trigger--active",a.disabled&&"mild-tabs-trigger--disabled",t.size.value!=="md"&&`mild-tabs-trigger--${t.size.value}`));return(s,d)=>(V(),y("button",{id:b(P)(b(t).baseId,e.value),type:"button",role:"tab","aria-selected":r.value,"aria-controls":b(H)(b(t).baseId,e.value),tabindex:r.value?0:-1,"data-value":e.value,"data-state":r.value?"active":"inactive","data-disabled":e.disabled?"":void 0,disabled:e.disabled,class:k(i.value)},[C(s.$slots,"default")],10,Z))}});D.__docgenInfo={exportName:"default",displayName:"TabsTrigger",description:"",tags:{},props:[{name:"value",required:!0,type:{name:"string"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Tabs/TabsTrigger.vue"]};const ee=["id","aria-labelledby","hidden","data-state"],q=w({__name:"TabsContent",props:{value:{},forceMount:{type:Boolean,default:!1}},setup(e){const a=e,t=S("TabsContent"),r=c(()=>t.value.value===a.value),i=c(()=>A("mild-tabs-content","mild-tabs-panel",t.size.value!=="md"&&`mild-tabs-content--${t.size.value}`));return(s,d)=>r.value||e.forceMount?(V(),y("div",{key:0,id:b(H)(b(t).baseId,e.value),role:"tabpanel","aria-labelledby":b(P)(b(t).baseId,e.value),hidden:!r.value,tabindex:"0","data-state":r.value?"active":"inactive",class:k(i.value)},[C(s.$slots,"default")],10,ee)):W("",!0)}});q.__docgenInfo={exportName:"default",displayName:"TabsContent",description:"",tags:{},props:[{name:"value",required:!0,type:{name:"string"}},{name:"forceMount",description:"Keep the panel mounted (hidden) while another tab is selected.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Tabs/TabsContent.vue"]};const re={title:"Disclosure/Tabs",component:_,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Tabs with one tab stop and Arrow/Home/End keys, automatic (default) or manual activation, driven by `@mild-ui/primitives/tabs`. Compose `TabsList` > `TabsTrigger` and `TabsContent`; supports `v-model`. Follows the [WAI-ARIA APG tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/); keyboard tests: `packages/vue/src/components/Tabs/Tabs.test.ts`."}}},argTypes:{variant:{control:"radio",options:["default","pills","underline"]},size:{control:"radio",options:["sm","md","lg"]},orientation:{control:"radio",options:["horizontal","vertical"]},activation:{control:"radio",options:["automatic","manual"]}},args:{defaultValue:"account"}},f={render:e=>({components:{Tabs:_,TabsList:E,TabsTrigger:D,TabsContent:q,Text:O},setup:()=>({args:e}),template:`
      <Tabs v-bind="args" class="w-96">
        <TabsList aria-label="Settings">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="billing" disabled>Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="account"><Text as="p">Manage your account details.</Text></TabsContent>
        <TabsContent value="password"><Text as="p">Change your password.</Text></TabsContent>
        <TabsContent value="billing"><Text as="p">Billing is disabled.</Text></TabsContent>
      </Tabs>
    `})},h={render:()=>({components:{Tabs:_,TabsList:E,TabsTrigger:D,TabsContent:q,Text:O},setup(){return{tab:I("one")}},template:`
      <div class="flex flex-col gap-3 w-96">
        <Tabs v-model="tab" variant="pills" activation="manual">
          <TabsList aria-label="Manual">
            <TabsTrigger value="one">One</TabsTrigger>
            <TabsTrigger value="two">Two</TabsTrigger>
          </TabsList>
          <TabsContent value="one">Arrow keys move focus; Enter or Space selects.</TabsContent>
          <TabsContent value="two">Second panel.</TabsContent>
        </Tabs>
        <output class="text-sm">Selected: {{ tab }}</output>
      </div>
    `})},x={args:{orientation:"vertical",variant:"underline",defaultValue:"account"},render:f.render};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Tabs,
      TabsList,
      TabsTrigger,
      TabsContent,
      Text
    },
    setup: () => ({
      args
    }),
    template: \`
      <Tabs v-bind="args" class="w-96">
        <TabsList aria-label="Settings">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="billing" disabled>Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="account"><Text as="p">Manage your account details.</Text></TabsContent>
        <TabsContent value="password"><Text as="p">Change your password.</Text></TabsContent>
        <TabsContent value="billing"><Text as="p">Billing is disabled.</Text></TabsContent>
      </Tabs>
    \`
  })
}`,...f.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Tabs,
      TabsList,
      TabsTrigger,
      TabsContent,
      Text
    },
    setup() {
      const tab = ref("one");
      return {
        tab
      };
    },
    template: \`
      <div class="flex flex-col gap-3 w-96">
        <Tabs v-model="tab" variant="pills" activation="manual">
          <TabsList aria-label="Manual">
            <TabsTrigger value="one">One</TabsTrigger>
            <TabsTrigger value="two">Two</TabsTrigger>
          </TabsList>
          <TabsContent value="one">Arrow keys move focus; Enter or Space selects.</TabsContent>
          <TabsContent value="two">Second panel.</TabsContent>
        </Tabs>
        <output class="text-sm">Selected: {{ tab }}</output>
      </div>
    \`
  })
}`,...h.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: "vertical",
    variant: "underline",
    defaultValue: "account"
  },
  render: Default.render
}`,...x.parameters?.docs?.source}}};const ie=["Default","Controlled","Vertical"];export{h as Controlled,f as Default,x as Vertical,ie as __namedExportsOrder,re as default};
