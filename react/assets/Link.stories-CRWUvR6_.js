import{j as e}from"./jsx-runtime-DSvmvvsx.js";import{L as n}from"./Link-pFB_wmHJ.js";import{T as i}from"./Text-Dop0KOme.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cn-BaF2GUMg.js";const p={title:"Typography/Link",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Navigational link. Renders an `a`; pass `as` to use a router link (`<Link as={RouterLink} to="/docs">`). `external` adds `target="_blank"` with a safe `rel`, and `disabled` makes it inert while keeping the link role.'}}},argTypes:{href:{control:"text"},underline:{control:"radio",options:["none","hover","always"]},external:{control:"boolean"},plain:{control:"boolean"},disabled:{control:"boolean"},onClick:{action:"click"}},args:{href:"#docs",children:"Read the docs"}},r={},a={render:()=>e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx(n,{href:"#",children:"Underlined on hover (default)"}),e.jsx(n,{href:"#",underline:"always",children:"Always underlined"}),e.jsx(n,{href:"#",underline:"none",children:"Never underlined"}),e.jsxs(i,{children:["Inline and"," ",e.jsx(n,{href:"#",plain:!0,children:"plain"})," ","inside a sentence."]}),e.jsx(n,{href:"https://example.com",external:!0,children:"External (new tab)"}),e.jsx(n,{href:"#",disabled:!0,children:"Disabled"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{} satisfies Story",...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
      <Link href="#">Underlined on hover (default)</Link>
      <Link href="#" underline="always">
        Always underlined
      </Link>
      <Link href="#" underline="none">
        Never underlined
      </Link>
      <Text>
        Inline and{" "}
        <Link href="#" plain>
          plain
        </Link>{" "}
        inside a sentence.
      </Text>
      <Link href="https://example.com" external>
        External (new tab)
      </Link>
      <Link href="#" disabled>
        Disabled
      </Link>
    </div>
} satisfies Story`,...a.parameters?.docs?.source}}};const h=["Default","Variants"];export{r as Default,a as Variants,h as __namedExportsOrder,p as default};
