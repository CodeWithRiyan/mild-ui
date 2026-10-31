import{j as n}from"./jsx-runtime-DSvmvvsx.js";import{r as h}from"./index-B0WjJBI_.js";import{c as x}from"./cn-BaF2GUMg.js";import{g as s}from"./styling-uCqKwP1C.js";import{T as C}from"./Text-Dop0KOme.js";import"./_commonjsHelpers-CqkleIqs.js";function z({as:e,size:d="lg",padding:o,centerContent:u=!1,children:c,className:m,style:p,...v},f){const g=e??"div",y=x("mild-container",`mild-container--${d}`,u&&"mild-container--center-content",m),i={...o&&{paddingLeft:s(o),paddingRight:s(o)},...p};return n.jsx(g,{ref:f,className:y,style:Object.keys(i).length>0?i:void 0,...v,children:c})}const a=h.forwardRef(z);a.displayName="Container";try{a.displayName="Container",a.__docgenInfo={description:"Horizontally centered wrapper with a max-width from the breakpoint scale (`size`) and\nhorizontal padding. Renders a `div`, or the element given with `as` (`main`, `section`, ...).",displayName:"Container",props:{children:{defaultValue:null,description:"Container content",name:"children",required:!1,type:{name:"ReactNode"}},className:{defaultValue:null,description:"Additional CSS class",name:"className",required:!1,type:{name:"string | undefined"}},size:{defaultValue:null,description:'Max-width. Default `"lg"` (1024px).',name:"size",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"full"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"2xl"'}]}},padding:{defaultValue:null,description:'Horizontal padding (spacing token). Default comes from the stylesheet (`"4"`).',name:"padding",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"0"'},{value:'"px"'},{value:'"0-5"'},{value:'"1"'},{value:'"1-5"'},{value:'"2"'},{value:'"2-5"'},{value:'"3"'},{value:'"3-5"'},{value:'"4"'},{value:'"5"'},{value:'"6"'},{value:'"7"'},{value:'"8"'},{value:'"9"'},{value:'"10"'},{value:'"11"'},{value:'"12"'},{value:'"14"'},{value:'"16"'},{value:'"20"'},{value:'"24"'},{value:'"28"'},{value:'"32"'},{value:'"36"'},{value:'"40"'},{value:'"44"'},{value:'"48"'},{value:'"52"'},{value:'"56"'},{value:'"60"'},{value:'"64"'},{value:'"72"'},{value:'"80"'},{value:'"96"'}]}},centerContent:{defaultValue:null,description:"Center the children too (flex column, centered items).",name:"centerContent",required:!1,type:{name:"boolean | undefined"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"any"}}}}}catch{}const j={title:"Layout/Container",component:a,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:"Horizontally centered wrapper with a max-width from the breakpoint scale (`size`) and horizontal padding. Renders a `div`, or the element given with `as` (`main`, `section`, ...)."}}},argTypes:{as:{control:"text"},size:{control:"select",options:["sm","md","lg","xl","2xl","full"]},padding:{control:"select",options:["0","2","4","6","8","12"]},centerContent:{control:"boolean"}},args:{size:"lg"}},t={render:e=>n.jsx(a,{...e,style:{background:"var(--mild-color-gray-100)",paddingTop:"1rem",paddingBottom:"1rem"},children:n.jsxs(C,{as:"p",children:["This content is limited to the ",n.jsx("code",{children:e.size})," breakpoint width and centered in the viewport."]})})},r={render:()=>n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem"},children:["sm","md","lg","xl","2xl","full"].map(e=>n.jsx(a,{size:e,style:{background:"var(--mild-color-primary-100)",paddingTop:".5rem",paddingBottom:".5rem"},children:e},e))})},l={args:{size:"md",centerContent:!0},render:t.render};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <Container {...args} style={{
    background: "var(--mild-color-gray-100)",
    paddingTop: "1rem",
    paddingBottom: "1rem"
  }}>
      <Text as="p">
        This content is limited to the <code>{args.size}</code> breakpoint width and centered in the
        viewport.
      </Text>
    </Container>
} satisfies Story`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  }}>
      {(["sm", "md", "lg", "xl", "2xl", "full"] as const).map(size => <Container key={size} size={size} style={{
      background: "var(--mild-color-primary-100)",
      paddingTop: ".5rem",
      paddingBottom: ".5rem"
    }}>
          {size}
        </Container>)}
    </div>
} satisfies Story`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: "md",
    centerContent: true
  },
  render: Default.render
} satisfies Story`,...l.parameters?.docs?.source}}};const V=["Default","Sizes","CenteredContent"];export{l as CenteredContent,t as Default,r as Sizes,V as __namedExportsOrder,j as default};
