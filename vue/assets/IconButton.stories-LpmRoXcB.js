import{_ as s}from"./CloseButton-B1dKUqcN.js";import{S as c}from"./search-DZdW-qH5.js";import{_ as a}from"./IconButton-4mzys15T.js";import{U as l,I as i,B as u}from"./underline-DL-DUyZ-.js";import{_ as I}from"./ButtonGroup-wncR4obb.js";import"./vue.esm-bundler-DkB1Q1v8.js";import"./icons-DSNlrOPV.js";import"./createLucideIcon-BrUh2xVA.js";import"./cn-CTdd_bgG.js";import"./Button-Ds3ZQdvo.js";const f={title:"Components/IconButton",component:a,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A square button that shows one glyph (the default slot). `label` is its accessible name (there is no visible text), applied as `aria-label`; the glyph itself is hidden from assistive technology. `CloseButton` is a ghost IconButton with an X."}}},argTypes:{label:{control:"text"},variant:{control:"select",options:["primary","secondary","outline","ghost","link","destructive"]},size:{control:"select",options:["xs","sm","md","lg","xl"]},round:{control:"boolean"},disabled:{control:"boolean"},loading:{control:"boolean"},onClick:{action:"click"}},args:{label:"Search"}},n={render:r=>({components:{IconButton:a,SearchIcon:c},setup:()=>({args:r}),template:'<IconButton v-bind="args"><SearchIcon :size="16" /></IconButton>'})},o={render:()=>({components:{IconButton:a,SearchIcon:c},template:`
      <div class="flex items-center gap-3">
        <IconButton label="Search"><SearchIcon :size="16" /></IconButton>
        <IconButton label="Search" variant="outline"><SearchIcon :size="16" /></IconButton>
        <IconButton label="Search" variant="ghost" round><SearchIcon :size="16" /></IconButton>
        <IconButton label="Search" size="sm"><SearchIcon :size="14" /></IconButton>
        <IconButton label="Search" size="lg" loading><SearchIcon :size="20" /></IconButton>
      </div>
    `})},t={name:"CloseButton",render:()=>({components:{CloseButton:s},template:`
      <div class="flex items-center gap-3">
        <CloseButton />
        <CloseButton size="sm" label="Dismiss notification" />
        <CloseButton variant="outline" round />
      </div>
    `})},e={render:()=>({components:{ButtonGroup:I,IconButton:a,BoldIcon:u,ItalicIcon:i,UnderlineIcon:l},template:`
      <ButtonGroup attached variant="outline" size="sm" aria-label="Formatting">
        <IconButton label="Bold"><BoldIcon :size="14" /></IconButton>
        <IconButton label="Italic"><ItalicIcon :size="14" /></IconButton>
        <IconButton label="Underline"><UnderlineIcon :size="14" /></IconButton>
      </ButtonGroup>
    `})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      IconButton,
      SearchIcon
    },
    setup: () => ({
      args
    }),
    template: '<IconButton v-bind="args"><SearchIcon :size="16" /></IconButton>'
  })
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IconButton,
      SearchIcon
    },
    template: \`
      <div class="flex items-center gap-3">
        <IconButton label="Search"><SearchIcon :size="16" /></IconButton>
        <IconButton label="Search" variant="outline"><SearchIcon :size="16" /></IconButton>
        <IconButton label="Search" variant="ghost" round><SearchIcon :size="16" /></IconButton>
        <IconButton label="Search" size="sm"><SearchIcon :size="14" /></IconButton>
        <IconButton label="Search" size="lg" loading><SearchIcon :size="20" /></IconButton>
      </div>
    \`
  })
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: "CloseButton",
  render: () => ({
    components: {
      CloseButton
    },
    template: \`
      <div class="flex items-center gap-3">
        <CloseButton />
        <CloseButton size="sm" label="Dismiss notification" />
        <CloseButton variant="outline" round />
      </div>
    \`
  })
}`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ButtonGroup,
      IconButton,
      BoldIcon,
      ItalicIcon,
      UnderlineIcon
    },
    template: \`
      <ButtonGroup attached variant="outline" size="sm" aria-label="Formatting">
        <IconButton label="Bold"><BoldIcon :size="14" /></IconButton>
        <IconButton label="Italic"><ItalicIcon :size="14" /></IconButton>
        <IconButton label="Underline"><UnderlineIcon :size="14" /></IconButton>
      </ButtonGroup>
    \`
  })
}`,...e.parameters?.docs?.source}}};const C=["Default","Variants","Close","InAButtonGroup"];export{t as Close,n as Default,e as InAButtonGroup,o as Variants,C as __namedExportsOrder,f as default};
