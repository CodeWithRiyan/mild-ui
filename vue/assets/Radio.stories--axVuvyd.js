import{G as A,H as D,e as z,r as G,x as g,m as k,y as q,v as b,A as s,c as i,l as c,E as N,C,z as E,B as F,F as L,D as P,f as w,j as U,J as M,K as j}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as n}from"./cn-CTdd_bgG.js";import{D as K}from"./icons-DSNlrOPV.js";import{c as T}from"./radio-group-BcpMULhr.js";import{u as W}from"./useMachine-DL-Cf-96.js";const $=Symbol("mild-ui:radio-group");function H(e){D($,e)}function J(){return A($,null)}const O=["aria-required","aria-disabled"],Q=["name","value"],S=z({__name:"RadioGroup",props:{modelValue:{default:void 0},defaultValue:{default:void 0},name:{default:void 0},disabled:{type:Boolean,default:!1},required:{type:Boolean,default:!1},ui:{default:void 0}},emits:["update:modelValue","change"],setup(e,{emit:l}){const d=e,u=l,o=G(null),a=G(d.defaultValue??null),p=i(()=>d.modelValue!==void 0),r=i(()=>p.value?d.modelValue??null:a.value);return W(o,(t,m)=>T({element:t,...m}),()=>({value:r.value,onChange:t=>{p.value||(a.value=t),u("update:modelValue",t),u("change",t)}}),(t,m)=>{t.refresh(),t.setValue(m.value)}),H({value:r,disabled:i(()=>d.disabled),required:i(()=>d.required)}),(t,m)=>(c(),g("div",{ref_key:"element",ref:o,role:"radiogroup","aria-required":e.required||void 0,"aria-disabled":e.disabled||void 0,class:b(s(n)("mild-radio-group",e.ui?.container))},[k(t.$slots,"default"),e.name?(c(),g("input",{key:0,type:"hidden",name:e.name,value:r.value??""},null,8,Q)):q("",!0)],10,O))}});S.__docgenInfo={exportName:"default",displayName:"RadioGroup",description:"",tags:{},props:[{name:"modelValue",description:"`v-model`: the checked value. Makes the group controlled.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"defaultValue",description:"Initial value when uncontrolled.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"name",description:"Submits a hidden input under this name.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"required",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"ui",description:"Extra classes per part. `class`/`style` on the component go to the group element.",required:!1,type:{name:"RadioGroupUiClasses"},defaultValue:{func:!1,value:"undefined"}}],events:[{name:"update:modelValue",type:{names:["string"]},description:"`v-model`"},{name:"change",type:{names:["string"]},description:"Fired when the user checks a radio, controlled or not."}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Radio/RadioGroup.vue"]};function X(e){const{size:l="md"}=e;return n("mild-radio",`mild-radio--${l}`)}function Y(e){const{size:l="md"}=e;return n("mild-radio-label",`mild-radio-label--${l}`)}const Z=["id","aria-checked","aria-labelledby","aria-disabled","data-value","data-state","data-disabled"],_=["id","for"],x=z({inheritAttrs:!1,__name:"RadioGroupItem",props:{id:{default:void 0},value:{},label:{default:void 0},size:{default:"md"},disabled:{type:Boolean,default:!1},ui:{default:void 0}},setup(e){const l=e,d=N(),u=J(),o=G(null),a=i(()=>!!u?.disabled.value||l.disabled),p=i(()=>u?.value.value===l.value),r=i(()=>l.id||`radio-${l.value}`),t=i(()=>`${r.value}-label`),m=i(()=>!!d.default||l.label!==void 0);function B(f){f.preventDefault(),o.value?.focus(),o.value?.click()}return(f,ee)=>(c(),g("div",{class:b(s(n)("mild-radio-field",e.ui?.container))},[C("span",E({id:r.value,ref_key:"radio",ref:o,role:"radio","aria-checked":p.value,"aria-labelledby":m.value?t.value:void 0,"aria-disabled":a.value||void 0,"data-value":e.value,"data-state":p.value?"checked":"unchecked","data-disabled":a.value?"":void 0,class:s(n)(s(X)({size:e.size}),e.ui?.radio)},f.$attrs),[C("span",{class:b(s(n)("mild-radio__indicator",e.ui?.indicator)),"data-indicator":""},[p.value?k(f.$slots,"indicator",{},()=>[F(s(K))],void 0,0):q("",!0)],2)],16,Z),m.value?(c(),g("label",{key:0,id:t.value,for:r.value,class:b(s(n)(s(Y)({size:e.size}),a.value&&"mild-radio-label--disabled",e.ui?.label)),onClick:B},[k(f.$slots,"default",{},()=>[L(P(e.label),1)])],10,_)):q("",!0)],2))}});x.__docgenInfo={exportName:"default",displayName:"RadioGroupItem",description:"",tags:{},props:[{name:"id",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"value",required:!0,type:{name:"string"}},{name:"label",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"size",required:!1,type:{name:"RadioSize"},defaultValue:{func:!1,value:'"md"'}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"ui",description:"Extra classes per part. `class`/`style` on the component go to the radio itself.",required:!1,type:{name:"RadioGroupItemUiClasses"},defaultValue:{func:!1,value:"undefined"}}],slots:[{name:"indicator",description:"Shown while checked. Defaults to a filled dot."},{name:"default",description:"Label content; takes precedence over the `label` prop."}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Radio/RadioGroupItem.vue"]};const I=z({__name:"Radio",props:{items:{default:void 0},size:{default:"md"},modelValue:{default:void 0},defaultValue:{default:void 0},name:{default:void 0},disabled:{type:Boolean,default:!1},required:{type:Boolean,default:!1},ui:{default:void 0}},emits:["update:modelValue","change"],setup(e,{emit:l}){const d=l;return(u,o)=>(c(),w(S,{"model-value":e.modelValue,"default-value":e.defaultValue,name:e.name,disabled:e.disabled,required:e.required,ui:e.ui,"onUpdate:modelValue":o[0]||(o[0]=a=>d("update:modelValue",a)),onChange:o[1]||(o[1]=a=>d("change",a))},{default:U(()=>[e.items?(c(!0),g(M,{key:0},j(e.items,a=>(c(),w(x,{id:a.id,key:a.value,value:a.value,label:a.label,disabled:a.disabled,size:e.size,class:b(s(n)(a.class,e.ui?.items))},null,8,["id","value","label","disabled","size","class"]))),128)):k(u.$slots,"default",{},void 0,void 0,1)]),_:3},8,["model-value","default-value","name","disabled","required","ui"]))}});I.__docgenInfo={exportName:"default",displayName:"Radio",description:"",tags:{},props:[{name:"ui",description:"Extra classes per part. `class`/`style` on the component go to the group element.",required:!1,type:{name:"RadioGroupUiClasses"},defaultValue:{func:!1,value:"undefined"}},{name:"required",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"name",description:"Submits a hidden input under this name.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"defaultValue",description:"Initial value when uncontrolled.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"modelValue",description:"`v-model`: the checked value. Makes the group controlled.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"items",description:"Items rendered as `RadioGroupItem`s. Use the default slot instead for custom markup.",required:!1,type:{name:"Array",elements:[{name:"RadioItem"}]},defaultValue:{func:!1,value:"undefined"}},{name:"size",required:!1,type:{name:"RadioSize"},defaultValue:{func:!1,value:'"md"'}}],events:[{name:"update:modelValue",type:{names:["string"]},description:"`v-model`"},{name:"change",type:{names:["string"]}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Radio/Radio.vue"]};const V=[{value:"email",label:"Email"},{value:"sms",label:"SMS"},{value:"push",label:"Push notification"}],se={title:"Components/Radio",component:I,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Radio group with roving tabindex driven by `@mild-ui/primitives/radio-group`: one tab stop, Arrow keys move and check (wrapping), Space checks the focused radio. Use `items` or compose `RadioGroup` + `RadioGroupItem`. Follows the [WAI-ARIA APG radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/); keyboard tests: `packages/vue/src/components/Radio/Radio.test.ts`."}}},argTypes:{size:{control:"radio",options:["sm","md","lg"]},modelValue:{control:"select",options:V.map(e=>e.value)},defaultValue:{control:"select",options:V.map(e=>e.value)},disabled:{control:"boolean"},required:{control:"boolean"},name:{control:"text"},"onUpdate:modelValue":{action:"update:modelValue"},onChange:{action:"change"}},args:{items:V,defaultValue:"email"}},v={render:e=>({components:{Radio:I},setup:()=>({args:e}),template:'<Radio aria-label="Contact method" v-bind="args" />'})},h={args:{disabled:!0},render:v.render},R={render:()=>({components:{Radio:I},setup:()=>({items:V}),template:`
      <div class="flex gap-8">
        <Radio aria-label="Small" size="sm" :items="items" default-value="email" />
        <Radio aria-label="Medium" size="md" :items="items" default-value="email" />
        <Radio aria-label="Large" size="lg" :items="items" default-value="email" />
      </div>
    `})},y={name:"Composed with RadioGroupItem",render:()=>({components:{RadioGroup:S,RadioGroupItem:x},setup(){return{plan:G("pro")}},template:`
      <div class="flex flex-col gap-4">
        <RadioGroup v-model="plan" name="plan" aria-label="Plan">
          <RadioGroupItem value="free">
            <span class="font-medium">Free</span> <span class="text-sm opacity-70">- for trying it out</span>
          </RadioGroupItem>
          <RadioGroupItem value="pro">
            <span class="font-medium">Pro</span> <span class="text-sm opacity-70">- for teams</span>
          </RadioGroupItem>
          <RadioGroupItem value="enterprise" disabled label="Enterprise (contact sales)" />
        </RadioGroup>
        <output class="text-sm">Selected: {{ plan }}</output>
      </div>
    `})};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Radio
    },
    setup: () => ({
      args
    }),
    template: '<Radio aria-label="Contact method" v-bind="args" />'
  })
}`,...v.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: Default.render
}`,...h.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Radio
    },
    setup: () => ({
      items
    }),
    template: \`
      <div class="flex gap-8">
        <Radio aria-label="Small" size="sm" :items="items" default-value="email" />
        <Radio aria-label="Medium" size="md" :items="items" default-value="email" />
        <Radio aria-label="Large" size="lg" :items="items" default-value="email" />
      </div>
    \`
  })
}`,...R.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: "Composed with RadioGroupItem",
  render: () => ({
    components: {
      RadioGroup,
      RadioGroupItem
    },
    setup() {
      const plan = ref("pro");
      return {
        plan
      };
    },
    template: \`
      <div class="flex flex-col gap-4">
        <RadioGroup v-model="plan" name="plan" aria-label="Plan">
          <RadioGroupItem value="free">
            <span class="font-medium">Free</span> <span class="text-sm opacity-70">- for trying it out</span>
          </RadioGroupItem>
          <RadioGroupItem value="pro">
            <span class="font-medium">Pro</span> <span class="text-sm opacity-70">- for teams</span>
          </RadioGroupItem>
          <RadioGroupItem value="enterprise" disabled label="Enterprise (contact sales)" />
        </RadioGroup>
        <output class="text-sm">Selected: {{ plan }}</output>
      </div>
    \`
  })
}`,...y.parameters?.docs?.source}}};const ie=["Default","Disabled","Sizes","Composed"];export{y as Composed,v as Default,h as Disabled,R as Sizes,ie as __namedExportsOrder,se as default};
