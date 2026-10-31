import{r as p,c as b}from"./vue.esm-bundler-DkB1Q1v8.js";import{_ as a}from"./Checkbox-BhuDFWJD.js";import"./cn-CTdd_bgG.js";import"./useMachine-DL-Cf-96.js";import"./useId-jK020Zqe.js";import"./icons-DSNlrOPV.js";import"./Label-DGQrqgZK.js";const S={title:"Components/Checkbox",component:a,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Tri-state checkbox driven by `@mild-ui/primitives/checkbox`: Space toggles it, Enter is left to the form, and a mixed (indeterminate) checkbox resolves to checked, per the [WAI-ARIA APG checkbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/). Keyboard tests: `packages/vue/src/components/Checkbox/Checkbox.test.ts`."}}},argTypes:{size:{control:"radio",options:["sm","md","lg"]},modelValue:{control:"select",options:[!0,!1,"indeterminate"]},defaultChecked:{control:"boolean"},indeterminate:{control:"boolean"},disabled:{control:"boolean"},required:{control:"boolean"},label:{control:"text"},name:{control:"text"},value:{control:"text"},id:{control:"text"},"onUpdate:modelValue":{action:"update:modelValue"},onChange:{action:"change"}},args:{label:"Accept terms and conditions"}},t={render:e=>({components:{Checkbox:a},setup:()=>({args:e}),template:'<Checkbox id="terms" v-bind="args" />'})},l={args:{label:"Receive newsletter",defaultChecked:!0},render:t.render},r={args:{label:"Select all",indeterminate:!0},render:t.render},o={args:{label:"Disabled option",disabled:!0},render:t.render},s={render:()=>({components:{Checkbox:a},template:`
      <div class="flex flex-col gap-3">
        <Checkbox id="sm" size="sm" label="Small" />
        <Checkbox id="md" size="md" label="Medium" default-checked />
        <Checkbox id="lg" size="lg" label="Large" />
      </div>
    `})},c={name:"Select all (parent/child)",render:()=>({components:{Checkbox:a},setup(){const e=p([{id:"mail",label:"Email",checked:!0},{id:"sms",label:"SMS",checked:!1},{id:"push",label:"Push",checked:!1}]),m=b(()=>{const n=e.value.filter(d=>d.checked).length;return n===0?!1:n===e.value.length?!0:"indeterminate"});return{items:e,all:m,setAll:n=>{for(const d of e.value)d.checked=n===!0}}},template:`
      <div class="flex flex-col gap-3">
        <Checkbox id="all" label="Notifications" :model-value="all" @update:model-value="setAll" />
        <div class="flex flex-col gap-2 pl-6">
          <Checkbox v-for="item in items" :key="item.id" :id="item.id" v-model="item.checked" :label="item.label" />
        </div>
      </div>
    `})},i={render:()=>({components:{Checkbox:a},setup(){const e=p(null);return{submitted:e,onSubmit:u=>{const n=new FormData(u.target);e.value=JSON.stringify(Object.fromEntries(n))}}},template:`
      <form class="flex flex-col gap-3" @submit.prevent="onSubmit">
        <Checkbox id="terms" name="terms" value="accepted" label="I accept the terms" required />
        <button type="submit" class="mild-button mild-button--primary mild-button--solid mild-button--md">Submit</button>
        <output v-if="submitted" class="text-sm">{{ submitted }}</output>
      </form>
    `})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Checkbox
    },
    setup: () => ({
      args
    }),
    template: '<Checkbox id="terms" v-bind="args" />'
  })
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Receive newsletter",
    defaultChecked: true
  },
  render: Default.render
}`,...l.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Select all",
    indeterminate: true
  },
  render: Default.render
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Disabled option",
    disabled: true
  },
  render: Default.render
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Checkbox
    },
    template: \`
      <div class="flex flex-col gap-3">
        <Checkbox id="sm" size="sm" label="Small" />
        <Checkbox id="md" size="md" label="Medium" default-checked />
        <Checkbox id="lg" size="lg" label="Large" />
      </div>
    \`
  })
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: "Select all (parent/child)",
  render: () => ({
    components: {
      Checkbox
    },
    setup() {
      const items = ref([{
        id: "mail",
        label: "Email",
        checked: true
      }, {
        id: "sms",
        label: "SMS",
        checked: false
      }, {
        id: "push",
        label: "Push",
        checked: false
      }]);
      const all = computed<boolean | "indeterminate">(() => {
        const checked = items.value.filter(item => item.checked).length;
        return checked === 0 ? false : checked === items.value.length ? true : "indeterminate";
      });
      const setAll = (value: boolean | "indeterminate") => {
        for (const item of items.value) item.checked = value === true;
      };
      return {
        items,
        all,
        setAll
      };
    },
    template: \`
      <div class="flex flex-col gap-3">
        <Checkbox id="all" label="Notifications" :model-value="all" @update:model-value="setAll" />
        <div class="flex flex-col gap-2 pl-6">
          <Checkbox v-for="item in items" :key="item.id" :id="item.id" v-model="item.checked" :label="item.label" />
        </div>
      </div>
    \`
  })
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Checkbox
    },
    setup() {
      const submitted = ref<string | null>(null);
      const onSubmit = (event: Event) => {
        const data = new FormData(event.target as HTMLFormElement);
        submitted.value = JSON.stringify(Object.fromEntries(data));
      };
      return {
        submitted,
        onSubmit
      };
    },
    template: \`
      <form class="flex flex-col gap-3" @submit.prevent="onSubmit">
        <Checkbox id="terms" name="terms" value="accepted" label="I accept the terms" required />
        <button type="submit" class="mild-button mild-button--primary mild-button--solid mild-button--md">Submit</button>
        <output v-if="submitted" class="text-sm">{{ submitted }}</output>
      </form>
    \`
  })
}`,...i.parameters?.docs?.source}}};const A=["Default","Checked","Indeterminate","Disabled","Sizes","SelectAll","InAForm"];export{l as Checked,t as Default,o as Disabled,i as InAForm,r as Indeterminate,c as SelectAll,s as Sizes,A as __namedExportsOrder,S as default};
