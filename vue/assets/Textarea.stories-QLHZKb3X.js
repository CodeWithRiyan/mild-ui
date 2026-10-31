import{e as z,o as g,w as V,x as q,v as T,c as r,l as R,r as h}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as F}from"./cn-CTdd_bgG.js";import{e as B}from"./FormField-CXjXHiLM.js";import"./useId-jK020Zqe.js";import"./Label-DGQrqgZK.js";import"./useMachine-DL-Cf-96.js";function I(a){const{variant:p="outline",size:e="md",fullWidth:v=!0,error:t=!1,disabled:s=!1,readonly:n=!1,required:i=!1,resize:d="vertical",autoResize:y=!1,className:u}=a;return F("mild-textarea",`mild-textarea--${p}`,`mild-textarea--${e}`,`mild-textarea--resize-${d}`,y&&"mild-textarea--auto-resize",v&&"mild-textarea--full-width",t&&"mild-textarea--error",s&&"mild-textarea--disabled",n&&"mild-textarea--readonly",i&&"mild-textarea--required",u)}const A=["id","name","rows","value","disabled","readonly","required","aria-invalid","data-controlled"],o=z({__name:"Textarea",props:{modelValue:{default:void 0},id:{default:void 0},name:{default:void 0},rows:{default:3},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},required:{type:Boolean,default:!1},size:{default:"md"},resize:{default:"vertical"},autoResize:{type:Boolean,default:!1},variant:{default:"outline"},isDisabled:{type:Boolean,default:!1},isReadOnly:{type:Boolean,default:!1},isRequired:{type:Boolean,default:!1},isInvalid:{type:Boolean,default:!1},fullWidth:{type:Boolean,default:!0},error:{type:Boolean,default:!1}},emits:["update:modelValue"],setup(a,{emit:p}){const e=a,v=p,t=h(null),s=r(()=>e.error||e.isInvalid),n=r(()=>e.disabled||e.isDisabled),i=r(()=>e.readonly||e.isReadOnly),d=r(()=>e.required||e.isRequired),y=r(()=>I({variant:e.variant,size:e.size,fullWidth:e.fullWidth,error:s.value,disabled:n.value,readonly:i.value,required:d.value,resize:e.resize,autoResize:e.autoResize}));function u(l){l.style.height="auto",l.style.height=`${l.scrollHeight}px`}function b(){e.autoResize&&t.value&&u(t.value)}g(b),V(()=>[e.autoResize,e.modelValue],b,{flush:"post"});function w(l){const x=l.target;e.autoResize&&u(x),v("update:modelValue",x.value)}return(l,x)=>(R(),q("textarea",{id:a.id,ref_key:"element",ref:t,name:a.name,rows:a.rows,class:T(y.value),value:a.modelValue,disabled:n.value,readonly:i.value,required:d.value,"aria-invalid":s.value||void 0,"data-controlled":a.modelValue!==void 0?"true":void 0,onInput:w},null,42,A))}});o.__docgenInfo={exportName:"default",displayName:"Textarea",description:"",tags:{},props:[{name:"autoResize",description:"Grow with the content instead of showing a scrollbar (disables manual resizing).",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"resize",description:'Which directions the user may drag the field. Default `"vertical"`.',required:!1,type:{name:"TextareaResize"},defaultValue:{func:!1,value:'"vertical"'}},{name:"size",required:!1,type:{name:"TextareaSize"},defaultValue:{func:!1,value:'"md"'}},{name:"modelValue",description:"`v-model`",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"id",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"name",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"rows",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"3"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"readonly",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"required",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"variant",defaultValue:{func:!1,value:'"outline"'}},{name:"fullWidth",defaultValue:{func:!1,value:"true"}},{name:"error",defaultValue:{func:!1,value:"false"}},{name:"isInvalid",defaultValue:{func:!1,value:"false"}},{name:"isDisabled",defaultValue:{func:!1,value:"false"}},{name:"isReadOnly",defaultValue:{func:!1,value:"false"}},{name:"isRequired",defaultValue:{func:!1,value:"false"}}],events:[{name:"update:modelValue",type:{names:["string"]},description:"`v-model`"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Textarea/Textarea.vue"]};const $={title:"Components/Textarea",component:o,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Multi-line text field with the same variants, sizes and states as `Input`. `autoResize` grows the field with its content instead of scrolling. Supports `v-model`."}}},argTypes:{variant:{control:"select",options:["outline","filled","flushed","unstyled"]},size:{control:"radio",options:["sm","md","lg"]},resize:{control:"select",options:["none","vertical","horizontal","both"]},autoResize:{control:"boolean"},rows:{control:"number"},placeholder:{control:"text"},error:{control:"boolean"},disabled:{control:"boolean"},readonly:{control:"boolean"},required:{control:"boolean"},"onUpdate:modelValue":{action:"update:modelValue"}},args:{placeholder:"Your message"}},f={render:a=>({components:{Textarea:o},setup:()=>({args:a}),template:'<div class="w-80"><Textarea aria-label="Message" v-bind="args" /></div>'})},m={render:()=>({components:{Textarea:o},setup(){return{text:h(`Type a few lines...
and watch the field grow.`)}},template:'<div class="w-80"><Textarea aria-label="Notes" v-model="text" auto-resize /></div>'})},c={render:()=>({components:{FormField:B,Textarea:o},template:`
      <div class="w-80">
        <FormField name="bio" label="Bio" description="A few words about you" error="Too short" required>
          <Textarea :rows="4" />
        </FormField>
      </div>
    `})};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Textarea
    },
    setup: () => ({
      args
    }),
    template: '<div class="w-80"><Textarea aria-label="Message" v-bind="args" /></div>'
  })
}`,...f.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Textarea
    },
    setup() {
      const text = ref("Type a few lines...\\nand watch the field grow.");
      return {
        text
      };
    },
    template: '<div class="w-80"><Textarea aria-label="Notes" v-model="text" auto-resize /></div>'
  })
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      FormField,
      Textarea
    },
    template: \`
      <div class="w-80">
        <FormField name="bio" label="Bio" description="A few words about you" error="Too short" required>
          <Textarea :rows="4" />
        </FormField>
      </div>
    \`
  })
}`,...c.parameters?.docs?.source}}};const C=["Default","AutoResize","InAField"];export{m as AutoResize,f as Default,c as InAField,C as __namedExportsOrder,$ as default};
