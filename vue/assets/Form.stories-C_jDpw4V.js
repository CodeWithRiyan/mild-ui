import{e as b,x as v,m as f,l as h,c,r as _,q as g}from"./vue.esm-bundler-DkB1Q1v8.js";import{_ as i}from"./Input-B4Elzf_c.js";import{_ as I,a as w,b as y,c as C,d as S,e as l}from"./FormField-CXjXHiLM.js";import{_ as u}from"./Button-Ds3ZQdvo.js";import{e as k}from"./Select-C2PwiU1v.js";import{_ as x}from"./Switch-CCKfYEKM.js";import{_ as p}from"./Checkbox-BhuDFWJD.js";import{_ as E}from"./InputPassword-Ce6ACkyu.js";import"./input-BiOxQ7f2.js";import"./cn-CTdd_bgG.js";import"./useId-jK020Zqe.js";import"./Label-DGQrqgZK.js";import"./useMachine-DL-Cf-96.js";import"./icons-DSNlrOPV.js";const B={class:"mild-form"},d=b({__name:"Form",setup(e){return(r,t)=>(h(),v("form",B,[f(r.$slots,"default")]))}});d.__docgenInfo={exportName:"default",displayName:"Form",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Form/Form.vue"]};const j={title:"Components/Form",component:l,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Form field wiring with no form-library dependency. `FormField` links a control to its label, description and error message through `@mild-ui/primitives/field` (`for` / `aria-labelledby`, `aria-describedby`, `aria-invalid`). Validation state comes in through the `error` prop, so plain Vue state or any form library can drive it."}}},argTypes:{label:{control:"text"},description:{control:"text"},error:{control:"text"},required:{control:"boolean"},hideError:{control:"boolean"},name:{control:"text"}},args:{name:"email",label:"Email",description:"We never share it"}},o={render:e=>({components:{FormField:l,Input:i},setup:()=>({args:e}),template:`
      <div class="w-72">
        <FormField v-bind="args"><Input type="email" /></FormField>
      </div>
    `})},a={args:{error:"Enter a valid email address",required:!0},render:o.render},n={name:"Every control",render:()=>({components:{Form:d,FormField:l,Input:i,InputPassword:E,Checkbox:p,Switch:x,Select:k,Button:u},template:`
      <Form class="w-80" @submit.prevent>
        <FormField name="email" label="Email" description="Work address" required>
          <Input type="email" />
        </FormField>
        <FormField name="password" label="Password" error="At least 8 characters">
          <InputPassword />
        </FormField>
        <FormField name="country" label="Country">
          <Select :options="[{ value: 'mx', label: 'Mexico' }, { value: 'ca', label: 'Canada' }]" placeholder="Pick one" full-width />
        </FormField>
        <FormField name="terms" label="I accept the terms" required>
          <Checkbox />
        </FormField>
        <FormField name="newsletter" label="Send me the newsletter" description="Once a month">
          <Switch />
        </FormField>
        <Button type="submit">Sign up</Button>
      </Form>
    `})},m={name:"Validation with plain Vue state",render:()=>({components:{Form:d,FormField:l,Input:i,Checkbox:p,Button:u},setup(){const e=g({email:"",terms:!1}),r=_(!1),t=c(()=>({email:r.value&&!e.email.includes("@")?"Enter a valid email":void 0,terms:r.value&&!e.terms?"You must accept the terms":void 0})),F=c(()=>r.value&&!t.value.email&&!t.value.terms);return{values:e,submitted:r,errors:t,ok:F}},template:`
      <Form class="w-80" novalidate @submit.prevent="submitted = true">
        <FormField name="email" label="Email" :error="errors.email" required>
          <Input v-model="values.email" type="email" />
        </FormField>
        <FormField name="terms" label="I accept the terms" :error="errors.terms" required>
          <Checkbox v-model="values.terms" />
        </FormField>
        <Button type="submit">Sign up</Button>
        <output v-if="ok" class="text-sm">Submitted {{ values.email }}</output>
      </Form>
    `})},s={name:"Composed from parts",render:()=>({components:{FormItem:S,FormLabel:C,FormControl:y,FormDescription:w,FormMessage:I,Input:i},template:`
      <div class="w-72">
        <FormItem name="age" error="Must be a number">
          <FormLabel>Age</FormLabel>
          <FormControl><Input inputmode="numeric" /></FormControl>
          <FormDescription>In years</FormDescription>
          <FormMessage />
        </FormItem>
      </div>
    `})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      FormField,
      Input
    },
    setup: () => ({
      args
    }),
    template: \`
      <div class="w-72">
        <FormField v-bind="args"><Input type="email" /></FormField>
      </div>
    \`
  })
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    error: "Enter a valid email address",
    required: true
  },
  render: Default.render
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: "Every control",
  render: () => ({
    components: {
      Form,
      FormField,
      Input,
      InputPassword,
      Checkbox,
      Switch,
      Select,
      Button
    },
    template: \`
      <Form class="w-80" @submit.prevent>
        <FormField name="email" label="Email" description="Work address" required>
          <Input type="email" />
        </FormField>
        <FormField name="password" label="Password" error="At least 8 characters">
          <InputPassword />
        </FormField>
        <FormField name="country" label="Country">
          <Select :options="[{ value: 'mx', label: 'Mexico' }, { value: 'ca', label: 'Canada' }]" placeholder="Pick one" full-width />
        </FormField>
        <FormField name="terms" label="I accept the terms" required>
          <Checkbox />
        </FormField>
        <FormField name="newsletter" label="Send me the newsletter" description="Once a month">
          <Switch />
        </FormField>
        <Button type="submit">Sign up</Button>
      </Form>
    \`
  })
}`,...n.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: "Validation with plain Vue state",
  render: () => ({
    components: {
      Form,
      FormField,
      Input,
      Checkbox,
      Button
    },
    setup() {
      const values = reactive({
        email: "",
        terms: false
      });
      const submitted = ref(false);
      const errors = computed(() => ({
        email: submitted.value && !values.email.includes("@") ? "Enter a valid email" : undefined,
        terms: submitted.value && !values.terms ? "You must accept the terms" : undefined
      }));
      const ok = computed(() => submitted.value && !errors.value.email && !errors.value.terms);
      return {
        values,
        submitted,
        errors,
        ok
      };
    },
    template: \`
      <Form class="w-80" novalidate @submit.prevent="submitted = true">
        <FormField name="email" label="Email" :error="errors.email" required>
          <Input v-model="values.email" type="email" />
        </FormField>
        <FormField name="terms" label="I accept the terms" :error="errors.terms" required>
          <Checkbox v-model="values.terms" />
        </FormField>
        <Button type="submit">Sign up</Button>
        <output v-if="ok" class="text-sm">Submitted {{ values.email }}</output>
      </Form>
    \`
  })
}`,...m.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: "Composed from parts",
  render: () => ({
    components: {
      FormItem,
      FormLabel,
      FormControl,
      FormDescription,
      FormMessage,
      Input
    },
    template: \`
      <div class="w-72">
        <FormItem name="age" error="Must be a number">
          <FormLabel>Age</FormLabel>
          <FormControl><Input inputmode="numeric" /></FormControl>
          <FormDescription>In years</FormDescription>
          <FormMessage />
        </FormItem>
      </div>
    \`
  })
}`,...s.parameters?.docs?.source}}};const z=["Default","WithError","EveryControl","PlainVueState","ComposedByHand"];export{s as ComposedByHand,o as Default,n as EveryControl,m as PlainVueState,a as WithError,z as __namedExportsOrder,j as default};
