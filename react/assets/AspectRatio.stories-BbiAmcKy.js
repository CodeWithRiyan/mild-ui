import{j as t}from"./jsx-runtime-DSvmvvsx.js";import{A as a}from"./AspectRatio-DHCWzt8G.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cn-BaF2GUMg.js";const h={title:"Layout/AspectRatio",component:a,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Keeps its child at a fixed width/height ratio (`ratio={16 / 9}` or `ratio="16/9"`); the child fills the box. Renders a `div`, or the element given with `as`.'}}},argTypes:{as:{control:"text"},ratio:{control:"text"}},args:{ratio:"16/9"}},s=(e,o="var(--mild-color-primary-500)",n="white")=>t.jsx("div",{style:{display:"grid",placeItems:"center",background:o,color:n,borderRadius:"var(--mild-radius-md)"},children:e}),r={render:e=>t.jsx("div",{style:{width:"20rem"},children:t.jsx(a,{...e,children:s(String(e.ratio))})})},i={render:()=>t.jsx("div",{style:{display:"flex",gap:"1rem",alignItems:"flex-start"},children:["1/1","4/3","16/9","21/9"].map(e=>t.jsx("div",{style:{width:"10rem"},children:t.jsx(a,{ratio:e,children:s(e,"var(--mild-color-gray-200)","inherit")})},e))})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    width: "20rem"
  }}>
      <AspectRatio {...args}>{fill(String(args.ratio))}</AspectRatio>
    </div>
} satisfies Story`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start"
  }}>
      {(["1/1", "4/3", "16/9", "21/9"] as const).map(ratio => <div key={ratio} style={{
      width: "10rem"
    }}>
          <AspectRatio ratio={ratio}>
            {fill(ratio, "var(--mild-color-gray-200)", "inherit")}
          </AspectRatio>
        </div>)}
    </div>
} satisfies Story`,...i.parameters?.docs?.source}}};const y=["Default","Ratios"];export{r as Default,i as Ratios,y as __namedExportsOrder,h as default};
