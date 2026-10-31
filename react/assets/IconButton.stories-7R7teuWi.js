import{j as e}from"./jsx-runtime-DSvmvvsx.js";import{I as o}from"./IconButton-C5OCXJPs.js";import{C as i}from"./CloseButton-C1djzhOE.js";import{B as l,I as c,U as m}from"./underline-DOTOrXcB.js";import{S as s}from"./search-BCaW7rQP.js";import{a as u}from"./Button-CSLSlcO9.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cn-BaF2GUMg.js";import"./icons-DN7Z3vsR.js";import"./createLucideIcon-DYphhiRx.js";const I={title:"Components/IconButton",component:o,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A square button that shows one glyph (`icon`). `label` is its accessible name (there is no visible text), applied as `aria-label`; the glyph itself is hidden from assistive technology. `CloseButton` is a ghost IconButton with an X."}}},argTypes:{label:{control:"text"},variant:{control:"select",options:["primary","secondary","outline","ghost","link","destructive"]},size:{control:"select",options:["xs","sm","md","lg","xl"]},round:{control:"boolean"},disabled:{control:"boolean"},loading:{control:"boolean"},icon:{control:!1},onClick:{action:"click"}},args:{label:"Search",icon:e.jsx(s,{size:16})}},t={},a={render:()=>e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(o,{label:"Search",icon:e.jsx(s,{size:16})}),e.jsx(o,{label:"Search",variant:"outline",icon:e.jsx(s,{size:16})}),e.jsx(o,{label:"Search",variant:"ghost",round:!0,icon:e.jsx(s,{size:16})}),e.jsx(o,{label:"Search",size:"sm",icon:e.jsx(s,{size:14})}),e.jsx(o,{label:"Search",size:"lg",loading:!0,icon:e.jsx(s,{size:20})})]})},n={name:"CloseButton",render:()=>e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(i,{}),e.jsx(i,{size:"sm",label:"Dismiss notification"}),e.jsx(i,{variant:"outline",round:!0})]})},r={render:()=>e.jsxs(u,{attached:!0,variant:"outline",size:"sm","aria-label":"Formatting",children:[e.jsx(o,{label:"Bold",icon:e.jsx(l,{size:14})}),e.jsx(o,{label:"Italic",icon:e.jsx(c,{size:14})}),e.jsx(o,{label:"Underline",icon:e.jsx(m,{size:14})})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{} satisfies Story",...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      <IconButton label="Search" icon={<Search size={16} />} />
      <IconButton label="Search" variant="outline" icon={<Search size={16} />} />
      <IconButton label="Search" variant="ghost" round icon={<Search size={16} />} />
      <IconButton label="Search" size="sm" icon={<Search size={14} />} />
      <IconButton label="Search" size="lg" loading icon={<Search size={20} />} />
    </div>
} satisfies Story`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: "CloseButton",
  render: () => <div className="flex items-center gap-3">
      <CloseButton />
      <CloseButton size="sm" label="Dismiss notification" />
      <CloseButton variant="outline" round />
    </div>
} satisfies Story`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup attached variant="outline" size="sm" aria-label="Formatting">
      <IconButton label="Bold" icon={<Bold size={14} />} />
      <IconButton label="Italic" icon={<Italic size={14} />} />
      <IconButton label="Underline" icon={<Underline size={14} />} />
    </ButtonGroup>
} satisfies Story`,...r.parameters?.docs?.source}}};const v=["Default","Variants","Close","InAButtonGroup"];export{n as Close,t as Default,r as InAButtonGroup,a as Variants,v as __namedExportsOrder,I as default};
