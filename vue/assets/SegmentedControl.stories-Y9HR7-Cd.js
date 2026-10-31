import{e as k,r as p,x as s,J as w,K as z,y as x,v as b,c,l as d,A,D as q}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as I}from"./radio-group-BcpMULhr.js";import{c as y}from"./cn-CTdd_bgG.js";import{u as R}from"./useMachine-DL-Cf-96.js";const W=["aria-disabled","aria-orientation","data-orientation"],D=["aria-checked","data-value","data-state","disabled"],B=["name","value"],m=k({__name:"SegmentedControl",props:{items:{},modelValue:{default:void 0},defaultValue:{default:void 0},name:{default:void 0},size:{default:"md"},orientation:{default:"horizontal"},fullWidth:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},ui:{default:void 0}},emits:["update:modelValue","change"],setup(e,{emit:C}){const n=e,f=C,g=p(null),v=p(n.defaultValue??null),h=c(()=>n.modelValue!==void 0),o=c(()=>h.value?n.modelValue:v.value);R(g,(a,r)=>I({element:a,...r}),()=>({value:o.value,onChange:a=>{h.value||(v.value=a),f("update:modelValue",a),f("change",a)}}),(a,r)=>{a.refresh(),a.setValue(r.value)});const V=c(()=>y("mild-segmented-control",`mild-segmented-control--${n.size}`,n.orientation==="vertical"&&"mild-segmented-control--vertical",n.fullWidth&&"mild-segmented-control--full-width"));return(a,r)=>(d(),s("div",{ref_key:"element",ref:g,role:"radiogroup","aria-disabled":e.disabled||void 0,"aria-orientation":e.orientation,"data-orientation":e.orientation,class:b(V.value)},[(d(!0),s(w,null,z(e.items,t=>(d(),s("button",{key:t.value,type:"button",role:"radio","aria-checked":o.value===t.value,"data-value":t.value,"data-state":o.value===t.value?"checked":"unchecked",disabled:e.disabled||!!t.disabled,class:b(A(y)("mild-segmented-control__item",e.ui?.item))},q(t.label??t.value),11,D))),128)),e.name?(d(),s("input",{key:0,type:"hidden",name:e.name,value:o.value??""},null,8,B)):x("",!0)],10,W))}});m.__docgenInfo={exportName:"default",displayName:"SegmentedControl",description:"",tags:{},props:[{name:"items",required:!0,type:{name:"Array",elements:[{name:"SegmentedControlItem"}]}},{name:"modelValue",description:"`v-model`: the selected value. Makes the control controlled.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"defaultValue",description:"Initial value when uncontrolled.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"name",description:"Submits the value through a hidden input.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"size",required:!1,type:{name:"SegmentedControlSize"},defaultValue:{func:!1,value:'"md"'}},{name:"orientation",required:!1,type:{name:"SegmentedControlOrientation"},defaultValue:{func:!1,value:'"horizontal"'}},{name:"fullWidth",description:"Stretch the segments to fill the line.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"ui",required:!1,type:{name:"SegmentedControlUiClasses"},defaultValue:{func:!1,value:"undefined"}}],events:[{name:"update:modelValue",type:{names:["string"]},description:"`v-model`"},{name:"change",type:{names:["string"]},description:"Fired when the user selects a segment, controlled or not."}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/SegmentedControl/SegmentedControl.vue"]};const S=[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"},{value:"year",label:"Year",disabled:!0}],E={title:"Components/SegmentedControl",component:m,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Single-choice control drawn as one bar of segments. It is a radio group driven by `@mild-ui/primitives/radio-group`: one tab stop, Arrow keys move and select, Space selects, per the [WAI-ARIA APG radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/). Supports `v-model`. Keyboard tests: `packages/vue/src/components/SegmentedControl/SegmentedControl.test.ts`."}}},argTypes:{size:{control:"radio",options:["sm","md","lg"]},orientation:{control:"radio",options:["horizontal","vertical"]},fullWidth:{control:"boolean"},disabled:{control:"boolean"},name:{control:"text"},"onUpdate:modelValue":{action:"update:modelValue"}},args:{items:S,defaultValue:"week"}},l={render:e=>({components:{SegmentedControl:m},setup:()=>({args:e}),template:'<SegmentedControl aria-label="Range" v-bind="args" />'})},i={render:()=>({components:{SegmentedControl:m},setup(){return{range:p("day"),items:S}},template:`
      <div class="flex flex-col gap-3">
        <SegmentedControl aria-label="Range" v-model="range" :items="items" full-width />
        <output class="text-sm">Selected: {{ range }}</output>
      </div>
    `})},u={args:{orientation:"vertical",size:"sm"},render:l.render};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      SegmentedControl
    },
    setup: () => ({
      args
    }),
    template: '<SegmentedControl aria-label="Range" v-bind="args" />'
  })
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      SegmentedControl
    },
    setup() {
      const range = ref("day");
      return {
        range,
        items
      };
    },
    template: \`
      <div class="flex flex-col gap-3">
        <SegmentedControl aria-label="Range" v-model="range" :items="items" full-width />
        <output class="text-sm">Selected: {{ range }}</output>
      </div>
    \`
  })
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: "vertical",
    size: "sm"
  },
  render: Default.render
}`,...u.parameters?.docs?.source}}};const G=["Default","Controlled","Vertical"];export{i as Controlled,l as Default,u as Vertical,G as __namedExportsOrder,E as default};
