import{e as V,r as b,x as U,m as w,v as R,c as p,l as B,G as O,H as j,f as M,j as W,A as x}from"./vue.esm-bundler-DkB1Q1v8.js";import{I as F,B as N,U as H}from"./underline-DL-DUyZ-.js";import{c as P}from"./cn-CTdd_bgG.js";import{u as K}from"./useMachine-DL-Cf-96.js";import{c as C}from"./createLucideIcon-BrUh2xVA.js";const J=["aria-pressed","data-state","data-disabled","disabled"],y=V({__name:"Toggle",props:{pressed:{type:Boolean,default:void 0},defaultPressed:{type:Boolean,default:!1},variant:{default:"ghost"},size:{default:"md"},disabled:{type:Boolean,default:!1}},emits:["update:pressed","change","click"],setup(e,{emit:r}){const a=e,m=r,f=b(a.defaultPressed),n=p(()=>a.pressed!==void 0),i=p(()=>n.value?!!a.pressed:f.value),u=p(()=>P("mild-toggle",`mild-toggle--${a.variant}`,`mild-toggle--${a.size}`));function v(g){if(m("click",g),g.defaultPrevented||a.disabled)return;const d=!i.value;n.value||(f.value=d),m("update:pressed",d),m("change",d)}return(g,d)=>(B(),U("button",{type:"button","aria-pressed":i.value,"data-state":i.value?"on":"off","data-disabled":e.disabled?"":void 0,disabled:e.disabled,class:R(u.value),onClick:v},[w(g.$slots,"default")],10,J))}});y.__docgenInfo={exportName:"default",displayName:"Toggle",description:"",tags:{},props:[{name:"pressed",description:"`v-model:pressed`: controlled pressed state.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"undefined"}},{name:"defaultPressed",description:"Initial pressed state when uncontrolled.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"variant",required:!1,type:{name:"ToggleVariant"},defaultValue:{func:!1,value:'"ghost"'}},{name:"size",required:!1,type:{name:"ToggleSize"},defaultValue:{func:!1,value:'"md"'}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"update:pressed",type:{names:["boolean"]},description:"`v-model:pressed`"},{name:"change",type:{names:["boolean"]},description:"Fired on every user toggle, controlled or not."},{name:"click",type:{names:["MouseEvent"]},description:"Fired before the toggle; `preventDefault()` cancels it."}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Toggle/Toggle.vue"]};function k(e){return e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"}function z(e){return e.getAttribute("data-value")??(e.textContent??"").trim()}function Q(e){const{element:r,multiple:a=!1,loop:m=!0,onChange:f}=e;let n=[...e.value??[]],i=[],u=null;r.hasAttribute("role")||r.setAttribute("role","group");function v(){i=Array.from(r.querySelectorAll("[aria-pressed]")),u&&!i.includes(u)&&(u=null)}function g(){return i.filter(t=>!k(t))}function d(){const t=g(),l=(u&&!k(u)?u:null)??t.find(s=>n.includes(z(s)))??t[0];for(const s of i)s.setAttribute("aria-pressed",String(n.includes(z(s)))),s.setAttribute("tabindex",s===l?"0":"-1")}function o(t){if(k(t))return;const l=z(t),s=n.includes(l);a?n=s?n.filter(I=>I!==l):[...n,l]:n=s?[]:[l],u=t,d(),f?.([...n])}function c(t){t&&(u=t,d(),t.focus())}function E(t){const l=g();if(l.length===0)return;const s=l.indexOf(document.activeElement);if(s===-1){c(l[0]);return}let I=s+t;if(I<0||I>=l.length){if(!m)return;I=(I+l.length)%l.length}c(l[I])}function L(t){switch(t.key){case"ArrowRight":case"ArrowDown":t.preventDefault(),E(1);break;case"ArrowLeft":case"ArrowUp":t.preventDefault(),E(-1);break;case"Home":t.preventDefault(),c(g()[0]);break;case"End":{t.preventDefault();const l=g();c(l[l.length-1]);break}case" ":case"Enter":{const l=i.find(s=>s===t.target);if(!l||l.tagName==="BUTTON")return;t.preventDefault(),o(l);break}}}function S(t){const l=t.target.closest("[aria-pressed]");!l||!i.includes(l)||o(l)}function D(t){const l=i.find(s=>s===t.target);l&&(u=l,d())}return r.addEventListener("keydown",L),r.addEventListener("click",S),r.addEventListener("focusin",D),v(),d(),{element:r,getValue:()=>[...n],setValue:t=>{n=[...t],d()},refresh:()=>{v(),d()},destroy:()=>{r.removeEventListener("keydown",L),r.removeEventListener("click",S),r.removeEventListener("focusin",D)}}}const $=Symbol("mild-ui:toggle-group");function X(e){j($,e)}function Y(){const e=O($,null);if(!e)throw new Error("<ToggleGroupItem> must be rendered inside <ToggleGroup>.");return e}const Z=["data-orientation","aria-disabled"],q=V({__name:"ToggleGroup",props:{type:{default:"single"},modelValue:{default:void 0},defaultValue:{default:void 0},variant:{default:"ghost"},size:{default:"md"},orientation:{default:"horizontal"},attached:{type:Boolean,default:!1},loop:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1}},emits:["update:modelValue","change"],setup(e,{emit:r}){const a=e,m=r;function f(o){return o==null?[]:Array.isArray(o)?o:[o]}const n=p(()=>a.type==="multiple"),i=b(null),u=b(f(a.defaultValue)),v=p(()=>a.modelValue!==void 0),g=p(()=>v.value?f(a.modelValue):u.value);K(i,(o,c)=>Q({element:o,...c}),()=>({multiple:n.value,loop:a.loop,value:g.value,onChange:o=>{v.value||(u.value=o);const c=n.value?o:o[0]??null;m("update:modelValue",c),m("change",c)}}),(o,c)=>{o.refresh(),o.setValue(c.value)},()=>[n.value,a.loop]),X({value:g,variant:p(()=>a.variant),size:p(()=>a.size),disabled:p(()=>a.disabled)});const d=p(()=>P("mild-toggle-group",a.attached&&"mild-toggle-group--attached",a.orientation==="vertical"&&"mild-toggle-group--vertical"));return(o,c)=>(B(),U("div",{ref_key:"element",ref:i,role:"group",class:R(d.value),"data-orientation":e.orientation,"aria-disabled":e.disabled||void 0},[w(o.$slots,"default")],10,Z))}});q.__docgenInfo={exportName:"default",displayName:"ToggleGroup",description:"",tags:{},props:[{name:"type",description:'`"single"` (default): at most one pressed, pressing it again clears. `"multiple"`: any number.',required:!1,type:{name:"ToggleGroupType"},defaultValue:{func:!1,value:'"single"'}},{name:"modelValue",description:"`v-model`: `string | null` for single, `string[]` for multiple.",required:!1,type:{name:"union",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}]},{name:"null"}]},defaultValue:{func:!1,value:"undefined"}},{name:"defaultValue",description:"Initial value when uncontrolled.",required:!1,type:{name:"union",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}]},{name:"null"}]},defaultValue:{func:!1,value:"undefined"}},{name:"variant",required:!1,type:{name:"ToggleVariant"},defaultValue:{func:!1,value:'"ghost"'}},{name:"size",required:!1,type:{name:"ToggleSize"},defaultValue:{func:!1,value:'"md"'}},{name:"orientation",required:!1,type:{name:"ToggleGroupOrientation"},defaultValue:{func:!1,value:'"horizontal"'}},{name:"attached",description:"Join the toggles into one bar.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"loop",description:"Wrap from the last toggle to the first with the Arrow keys. Default `true`.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"update:modelValue",type:{names:["union"],elements:[{name:"string"},{name:"Array",elements:[{name:"string"}]},{name:"null"}]},description:"`v-model`: `string | null` for single, `string[]` for multiple."},{name:"change",type:{names:["union"],elements:[{name:"string"},{name:"Array",elements:[{name:"string"}]},{name:"null"}]}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/ToggleGroup/ToggleGroup.vue"]};const _=V({__name:"ToggleGroupItem",props:{value:{},variant:{default:void 0},size:{default:void 0},disabled:{type:Boolean,default:!1}},setup(e){const r=e,a=Y(),m=p(()=>a.value.value.includes(r.value)),f=p(()=>a.disabled.value||r.disabled);return(n,i)=>(B(),M(x(y),{pressed:m.value,variant:e.variant??x(a).variant.value,size:e.size??x(a).size.value,disabled:f.value,"data-value":e.value,class:"mild-toggle-group__item"},{default:W(()=>[w(n.$slots,"default")]),_:3},8,["pressed","variant","size","disabled","data-value"]))}});_.__docgenInfo={exportName:"default",displayName:"ToggleGroupItem",description:"",tags:{},props:[{name:"value",description:"The value this item adds to the group's value while pressed.",required:!0,type:{name:"string"}},{name:"variant",required:!1,type:{name:"ToggleVariant"},defaultValue:{func:!1,value:"undefined"}},{name:"size",required:!1,type:{name:"ToggleSize"},defaultValue:{func:!1,value:"undefined"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/ToggleGroup/ToggleGroupItem.vue"]};const ee=C("AlignCenterIcon",[["line",{x1:"21",x2:"3",y1:"6",y2:"6",key:"1fp77t"}],["line",{x1:"17",x2:"7",y1:"12",y2:"12",key:"rsh8ii"}],["line",{x1:"19",x2:"5",y1:"18",y2:"18",key:"1t0tuv"}]]),te=C("AlignLeftIcon",[["line",{x1:"21",x2:"3",y1:"6",y2:"6",key:"1fp77t"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}],["line",{x1:"17",x2:"3",y1:"18",y2:"18",key:"1awlsn"}]]),le=C("AlignRightIcon",[["line",{x1:"21",x2:"3",y1:"6",y2:"6",key:"1fp77t"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}],["line",{x1:"21",x2:"7",y1:"18",y2:"18",key:"1g9eri"}]]),ie={title:"Components/Toggle",component:y,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'A two-state button (`aria-pressed`). Controlled through `v-model:pressed`, or uncontrolled with `defaultPressed`. `ToggleGroup` presses one (`type="single"`) or many (`type="multiple"`) `ToggleGroupItem`s with one tab stop and Arrow/Home/End keys, driven by `@mild-ui/primitives/toggle-group`. Patterns: [WAI-ARIA APG button (toggle)](https://www.w3.org/WAI/ARIA/apg/patterns/button/) and [toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) for the group\'s roving focus; keyboard tests: `packages/vue/src/components/Toggle/Toggle.test.ts` and `ToggleGroup/ToggleGroup.test.ts`.'}}},argTypes:{variant:{control:"radio",options:["ghost","outline"]},size:{control:"radio",options:["sm","md","lg"]},disabled:{control:"boolean"},defaultPressed:{control:"boolean"},"onUpdate:pressed":{action:"update:pressed"}}},T={render:e=>({components:{Toggle:y,BoldIcon:N},setup:()=>({args:e}),template:'<Toggle aria-label="Bold" v-bind="args"><BoldIcon :size="16" /></Toggle>'})},h={render:()=>({components:{Toggle:y,ItalicIcon:F},setup(){return{italic:b(!1)}},template:`
      <div class="flex items-center gap-3">
        <Toggle aria-label="Italic" v-model:pressed="italic" variant="outline"><ItalicIcon :size="16" /></Toggle>
        <output class="text-sm">{{ italic ? "on" : "off" }}</output>
      </div>
    `})},G={name:"ToggleGroup (single)",render:()=>({components:{ToggleGroup:q,ToggleGroupItem:_,AlignLeftIcon:te,AlignCenterIcon:ee,AlignRightIcon:le},setup(){return{align:b("left")}},template:`
      <div class="flex flex-col gap-3">
        <ToggleGroup aria-label="Alignment" v-model="align" attached variant="outline">
          <ToggleGroupItem value="left" aria-label="Align left"><AlignLeftIcon :size="16" /></ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center"><AlignCenterIcon :size="16" /></ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right"><AlignRightIcon :size="16" /></ToggleGroupItem>
        </ToggleGroup>
        <output class="text-sm">{{ align ?? "none" }}</output>
      </div>
    `})},A={name:"ToggleGroup (multiple)",render:()=>({components:{ToggleGroup:q,ToggleGroupItem:_,BoldIcon:N,ItalicIcon:F,UnderlineIcon:H},setup(){return{format:b(["bold"])}},template:`
      <div class="flex flex-col gap-3">
        <ToggleGroup aria-label="Format" type="multiple" v-model="format">
          <ToggleGroupItem value="bold" aria-label="Bold"><BoldIcon :size="16" /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic"><ItalicIcon :size="16" /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline" disabled><UnderlineIcon :size="16" /></ToggleGroupItem>
        </ToggleGroup>
        <output class="text-sm">{{ format.join(", ") || "none" }}</output>
      </div>
    `})};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Toggle,
      BoldIcon
    },
    setup: () => ({
      args
    }),
    template: '<Toggle aria-label="Bold" v-bind="args"><BoldIcon :size="16" /></Toggle>'
  })
}`,...T.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Toggle,
      ItalicIcon
    },
    setup() {
      const italic = ref(false);
      return {
        italic
      };
    },
    template: \`
      <div class="flex items-center gap-3">
        <Toggle aria-label="Italic" v-model:pressed="italic" variant="outline"><ItalicIcon :size="16" /></Toggle>
        <output class="text-sm">{{ italic ? "on" : "off" }}</output>
      </div>
    \`
  })
}`,...h.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: "ToggleGroup (single)",
  render: () => ({
    components: {
      ToggleGroup,
      ToggleGroupItem,
      AlignLeftIcon,
      AlignCenterIcon,
      AlignRightIcon
    },
    setup() {
      const align = ref<string | null>("left");
      return {
        align
      };
    },
    template: \`
      <div class="flex flex-col gap-3">
        <ToggleGroup aria-label="Alignment" v-model="align" attached variant="outline">
          <ToggleGroupItem value="left" aria-label="Align left"><AlignLeftIcon :size="16" /></ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center"><AlignCenterIcon :size="16" /></ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right"><AlignRightIcon :size="16" /></ToggleGroupItem>
        </ToggleGroup>
        <output class="text-sm">{{ align ?? "none" }}</output>
      </div>
    \`
  })
}`,...G.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: "ToggleGroup (multiple)",
  render: () => ({
    components: {
      ToggleGroup,
      ToggleGroupItem,
      BoldIcon,
      ItalicIcon,
      UnderlineIcon
    },
    setup() {
      const format = ref<string[]>(["bold"]);
      return {
        format
      };
    },
    template: \`
      <div class="flex flex-col gap-3">
        <ToggleGroup aria-label="Format" type="multiple" v-model="format">
          <ToggleGroupItem value="bold" aria-label="Bold"><BoldIcon :size="16" /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic"><ItalicIcon :size="16" /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline" disabled><UnderlineIcon :size="16" /></ToggleGroupItem>
        </ToggleGroup>
        <output class="text-sm">{{ format.join(", ") || "none" }}</output>
      </div>
    \`
  })
}`,...A.parameters?.docs?.source}}};const ue=["Default","Controlled","GroupSingle","GroupMultiple"];export{h as Controlled,T as Default,A as GroupMultiple,G as GroupSingle,ue as __namedExportsOrder,ie as default};
