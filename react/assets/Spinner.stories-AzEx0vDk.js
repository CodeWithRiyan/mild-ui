import{j as e}from"./jsx-runtime-DSvmvvsx.js";import{S as r}from"./Spinner-JiygG6MT.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cn-BaF2GUMg.js";const d={title:"Feedback/Spinner",component:r,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Indeterminate loading indicator, announced through a visually hidden `label` (`role="status"`).'}}},argTypes:{size:{control:"select",options:["xs","sm","md","lg","xl"]},variant:{control:"select",options:["border","dots","pulse","bars"]},speed:{control:"radio",options:["slow","normal","fast"]},label:{control:"text"}}},s={},a={render:()=>e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsx(r,{variant:"border"}),e.jsx(r,{variant:"dots"}),e.jsx(r,{variant:"pulse"}),e.jsx(r,{variant:"bars"}),e.jsx(r,{size:"xl",speed:"slow",label:"Slowly loading"})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{} satisfies Story",...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-6">
      <Spinner variant="border" />
      <Spinner variant="dots" />
      <Spinner variant="pulse" />
      <Spinner variant="bars" />
      <Spinner size="xl" speed="slow" label="Slowly loading" />
    </div>
} satisfies Story`,...a.parameters?.docs?.source}}};const p=["Default","Variants"];export{s as Default,a as Variants,p as __namedExportsOrder,d as default};
