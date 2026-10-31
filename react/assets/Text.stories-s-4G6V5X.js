import{j as e}from"./jsx-runtime-DSvmvvsx.js";import{T as t}from"./Text-Dop0KOme.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";const c={title:"Components/Text",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Typography primitive. Renders a `span` by default, or the element given with `as`, and maps size, weight, alignment, transform, decoration and semantic color onto `mild-text--*` classes."}}},argTypes:{as:{control:"text"},fontSize:{control:"select",options:["xs","sm","md","lg","xl","2xl","3xl","4xl","5xl","6xl"]},fontWeight:{control:"select",options:["thin","light","normal","medium","semibold","bold","extrabold","black"]},textAlign:{control:"select",options:["left","center","right","justify"]},textTransform:{control:"select",options:["none","uppercase","lowercase","capitalize"]},textDecoration:{control:"select",options:["none","underline","line-through","overline"]},color:{control:"select",options:[void 0,"primary","secondary","success","warning","danger","muted"]},truncate:{control:"boolean"},noOfLines:{control:"number"}},args:{children:"The quick brown fox jumps over the lazy dog."}},n={},o={render:()=>e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx(t,{fontSize:"xs",children:"Extra small"}),e.jsx(t,{fontSize:"sm",children:"Small"}),e.jsx(t,{fontSize:"md",children:"Medium"}),e.jsx(t,{fontSize:"lg",children:"Large"}),e.jsx(t,{fontSize:"xl",children:"Extra large"}),e.jsx(t,{fontSize:"2xl",fontWeight:"bold",children:"2xl bold"})]})},r={render:()=>e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx(t,{as:"h2",fontSize:"3xl",fontWeight:"semibold",children:"A heading element"}),e.jsx(t,{as:"p",color:"muted",children:"A muted paragraph."}),e.jsx(t,{color:"success",children:"Success"}),e.jsx(t,{color:"danger",textDecoration:"line-through",children:"Danger, struck through"}),e.jsx(t,{textTransform:"uppercase",letterSpacing:"0.1em",children:"Uppercase and spaced"}),e.jsx(t,{as:"p",truncate:!0,style:{maxWidth:"12rem"},children:"This long line is truncated with an ellipsis when it overflows."})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{} satisfies Story",...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
      <Text fontSize="xs">Extra small</Text>
      <Text fontSize="sm">Small</Text>
      <Text fontSize="md">Medium</Text>
      <Text fontSize="lg">Large</Text>
      <Text fontSize="xl">Extra large</Text>
      <Text fontSize="2xl" fontWeight="bold">
        2xl bold
      </Text>
    </div>
} satisfies Story`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
      <Text as="h2" fontSize="3xl" fontWeight="semibold">
        A heading element
      </Text>
      <Text as="p" color="muted">
        A muted paragraph.
      </Text>
      <Text color="success">Success</Text>
      <Text color="danger" textDecoration="line-through">
        Danger, struck through
      </Text>
      <Text textTransform="uppercase" letterSpacing="0.1em">
        Uppercase and spaced
      </Text>
      <Text as="p" truncate style={{
      maxWidth: "12rem"
    }}>
        This long line is truncated with an ellipsis when it overflows.
      </Text>
    </div>
} satisfies Story`,...r.parameters?.docs?.source}}};const x=["Default","Sizes","Semantic"];export{n as Default,r as Semantic,o as Sizes,x as __namedExportsOrder,c as default};
