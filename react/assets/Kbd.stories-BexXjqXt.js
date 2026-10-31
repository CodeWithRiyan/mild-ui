import{j as e}from"./jsx-runtime-DSvmvvsx.js";import{r as u}from"./index-B0WjJBI_.js";import{c as p}from"./cn-BaF2GUMg.js";import{T as t}from"./Text-Dop0KOme.js";import"./_commonjsHelpers-CqkleIqs.js";function f({as:d,size:n="md",children:o,className:l,...i},c){const m=d??"kbd";return e.jsx(m,{ref:c,className:p("mild-kbd",`mild-kbd--${n}`,l),...i,children:o})}const r=u.forwardRef(f);r.displayName="Kbd";try{r.displayName="Kbd",r.__docgenInfo={description:"A keyboard key (`<kbd>`). Combine several for a shortcut: `<Kbd>⌘</Kbd> + <Kbd>K</Kbd>`.",displayName:"Kbd",props:{children:{defaultValue:null,description:"Key label, e.g. `⌘` or `Shift`",name:"children",required:!1,type:{name:"ReactNode"}},className:{defaultValue:null,description:"Additional CSS class",name:"className",required:!1,type:{name:"string | undefined"}},size:{defaultValue:null,description:'Key size. Default `"md"`.',name:"size",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"any"}}}}}catch{}const S={title:"Typography/Kbd",component:r,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A keyboard key (`<kbd>`). Combine several for a shortcut."}}},argTypes:{size:{control:"radio",options:["sm","md","lg"]},as:{control:"text"}},args:{children:"⌘"}},s={},a={render:()=>e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs(t,{children:["Search: ",e.jsx(r,{children:"⌘"})," + ",e.jsx(r,{children:"K"})]}),e.jsxs(t,{children:["Save: ",e.jsx(r,{size:"sm",children:"Ctrl"})," + ",e.jsx(r,{size:"sm",children:"S"})]}),e.jsxs(t,{children:["Submit: ",e.jsx(r,{size:"lg",children:"Enter"})]})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{} satisfies Story",...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      <Text>
        Search: <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
      </Text>
      <Text>
        Save: <Kbd size="sm">Ctrl</Kbd> + <Kbd size="sm">S</Kbd>
      </Text>
      <Text>
        Submit: <Kbd size="lg">Enter</Kbd>
      </Text>
    </div>
} satisfies Story`,...a.parameters?.docs?.source}}};const g=["Default","Shortcuts"];export{s as Default,a as Shortcuts,g as __namedExportsOrder,S as default};
