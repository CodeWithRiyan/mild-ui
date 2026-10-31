import{r as c}from"./vue.esm-bundler-DkB1Q1v8.js";import{_ as t}from"./Button-Ds3ZQdvo.js";import{c as u}from"./createLucideIcon-BrUh2xVA.js";import"./cn-CTdd_bgG.js";const d=u("ArrowRightIcon",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]),m=u("DownloadIcon",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]),p=u("PlusIcon",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]),x={title:"Components/Button",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Button with solid, outline, ghost and link styles, five sizes, icon slots, and loading and disabled states. A loading button stays focusable and is announced busy instead of disabled."}}},argTypes:{variant:{control:"select",options:["primary","secondary","outline","ghost","link","destructive"]},size:{control:"select",options:["xs","sm","md","lg","xl","icon"]},colorScheme:{control:"text"},disabled:{control:"boolean"},loading:{control:"boolean"},fullWidth:{control:"boolean"},type:{control:"select",options:["button","submit","reset"]},onClick:{action:"clicked"}},args:{variant:"primary",size:"md"}},e={render:n=>({components:{Button:t},setup:()=>({args:n}),template:'<Button v-bind="args">Button</Button>'})},o={render:()=>({components:{Button:t},template:`
      <div class="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    `})},a={render:()=>({components:{Button:t},template:`
      <div class="flex flex-wrap gap-4">
        <Button variant="outline" color-scheme="danger">Delete</Button>
        <Button variant="ghost" color-scheme="success">Approve</Button>
        <Button variant="link" color-scheme="secondary">Learn more</Button>
      </div>
    `})},s={render:()=>({components:{Button:t},template:`
      <div class="flex items-center gap-4">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra large</Button>
      </div>
    `})},r={render:()=>({components:{Button:t,PlusIcon:p,DownloadIcon:m,ArrowRightIcon:d},template:`
      <div class="flex flex-wrap gap-4">
        <Button>
          <template #leftIcon><PlusIcon :size="16" /></template>
          Add item
        </Button>
        <Button variant="secondary">
          <template #leftIcon><DownloadIcon :size="16" /></template>
          Download
        </Button>
        <Button variant="outline">
          Continue
          <template #rightIcon><ArrowRightIcon :size="16" /></template>
        </Button>
        <Button size="icon" aria-label="Add">
          <template #leftIcon><PlusIcon :size="16" /></template>
        </Button>
      </div>
    `})},i={render:()=>({components:{Button:t},template:`
      <div class="flex flex-wrap gap-4">
        <Button disabled>Disabled</Button>
        <Button loading>Saving</Button>
        <Button variant="outline" loading>Loading outline</Button>
        <Button full-width>Full width</Button>
      </div>
    `})},l={render:()=>({components:{Button:t},setup(){const n=c(!1);return{loading:n,submit:()=>{n.value=!0,setTimeout(()=>n.value=!1,2e3)}}},template:`
      <Button :loading="loading" @click="submit">
        {{ loading ? "Submitting..." : "Submit" }}
      </Button>
    `})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Button
    },
    setup: () => ({
      args
    }),
    template: '<Button v-bind="args">Button</Button>'
  })
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Button
    },
    template: \`
      <div class="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    \`
  })
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Button
    },
    template: \`
      <div class="flex flex-wrap gap-4">
        <Button variant="outline" color-scheme="danger">Delete</Button>
        <Button variant="ghost" color-scheme="success">Approve</Button>
        <Button variant="link" color-scheme="secondary">Learn more</Button>
      </div>
    \`
  })
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Button
    },
    template: \`
      <div class="flex items-center gap-4">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra large</Button>
      </div>
    \`
  })
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Button,
      PlusIcon,
      DownloadIcon,
      ArrowRightIcon
    },
    template: \`
      <div class="flex flex-wrap gap-4">
        <Button>
          <template #leftIcon><PlusIcon :size="16" /></template>
          Add item
        </Button>
        <Button variant="secondary">
          <template #leftIcon><DownloadIcon :size="16" /></template>
          Download
        </Button>
        <Button variant="outline">
          Continue
          <template #rightIcon><ArrowRightIcon :size="16" /></template>
        </Button>
        <Button size="icon" aria-label="Add">
          <template #leftIcon><PlusIcon :size="16" /></template>
        </Button>
      </div>
    \`
  })
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Button
    },
    template: \`
      <div class="flex flex-wrap gap-4">
        <Button disabled>Disabled</Button>
        <Button loading>Saving</Button>
        <Button variant="outline" loading>Loading outline</Button>
        <Button full-width>Full width</Button>
      </div>
    \`
  })
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Button
    },
    setup() {
      const loading = ref(false);
      const submit = () => {
        loading.value = true;
        setTimeout(() => loading.value = false, 2000);
      };
      return {
        loading,
        submit
      };
    },
    template: \`
      <Button :loading="loading" @click="submit">
        {{ loading ? "Submitting..." : "Submit" }}
      </Button>
    \`
  })
}`,...l.parameters?.docs?.source}}};const y=["Default","AllVariants","ColorSchemes","AllSizes","WithIcons","States","LoadingOnClick"];export{s as AllSizes,o as AllVariants,a as ColorSchemes,e as Default,l as LoadingOnClick,i as States,r as WithIcons,y as __namedExportsOrder,x as default};
