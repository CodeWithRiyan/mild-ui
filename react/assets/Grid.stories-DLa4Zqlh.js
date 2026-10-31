import{j as e}from"./jsx-runtime-DSvmvvsx.js";import{r as I}from"./index-B0WjJBI_.js";import{c as q}from"./cn-BaF2GUMg.js";import{r as x}from"./layout-CwouAro2.js";import{g as w}from"./styling-uCqKwP1C.js";import"./_commonjsHelpers-CqkleIqs.js";function $({as:a,columns:s,rows:u,templateColumns:o,templateRows:d,gap:m,columnGap:c,rowGap:p,flow:v,align:t,justify:i,inline:C=!1,children:V,className:_,style:R,...j},N){const k=a??"div",A=q("mild-grid",C&&"mild-grid--inline",...x(s,(S,b)=>b?`mild-grid--${b}-cols-${S}`:`mild-grid--cols-${S}`),u&&`mild-grid--rows-${u}`,v&&`mild-grid--flow-${v}`,t&&`mild-grid--items-${t}`,i&&`mild-grid--justify-${i}`,_),G={...o&&{gridTemplateColumns:o},...d&&{gridTemplateRows:d},...m&&{gap:w(m)},...c&&{columnGap:w(c)},...p&&{rowGap:w(p)},...R};return e.jsx(k,{ref:N,className:A,style:Object.keys(G).length>0?G:void 0,...j,children:V})}const r=I.forwardRef($);r.displayName="Grid";function E({as:a,colSpan:s,rowSpan:u,children:o,className:d,...m},c){const p=a??"div",v=q("mild-grid-item",...x(s,(t,i)=>i?`mild-grid-item--${i}-col-span-${t}`:`mild-grid-item--col-span-${t}`),u&&`mild-grid-item--row-span-${u}`,d);return e.jsx(p,{ref:c,className:v,...m,children:o})}const n=I.forwardRef(E);n.displayName="GridItem";try{r.displayName="Grid",r.__docgenInfo={description:"CSS grid with 1-12 equal columns (`columns`, per breakpoint if needed) or a custom template.\nRenders a `div`, or the element given with `as`. Place children with `GridItem` to span\ncolumns or rows.",displayName:"Grid",props:{children:{defaultValue:null,description:"Grid content",name:"children",required:!1,type:{name:"ReactNode"}},className:{defaultValue:null,description:"Additional CSS class",name:"className",required:!1,type:{name:"string | undefined"}},columns:{defaultValue:null,description:"Number of equal columns (1-12), optionally per breakpoint: `{ base: 1, md: 3 }`.",name:"columns",required:!1,type:{name:"Responsive<GridColumns> | undefined"}},rows:{defaultValue:null,description:"Number of equal rows (1-6).",name:"rows",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:"1"},{value:"2"},{value:"3"},{value:"4"},{value:"5"},{value:"6"}]}},templateColumns:{defaultValue:null,description:"Custom `grid-template-columns`, for layouts the `columns` scale cannot express.",name:"templateColumns",required:!1,type:{name:"string | undefined"}},templateRows:{defaultValue:null,description:"Custom `grid-template-rows`.",name:"templateRows",required:!1,type:{name:"string | undefined"}},gap:{defaultValue:null,description:"Gap on both axes (spacing token).",name:"gap",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"0"'},{value:'"px"'},{value:'"0-5"'},{value:'"1"'},{value:'"1-5"'},{value:'"2"'},{value:'"2-5"'},{value:'"3"'},{value:'"3-5"'},{value:'"4"'},{value:'"5"'},{value:'"6"'},{value:'"7"'},{value:'"8"'},{value:'"9"'},{value:'"10"'},{value:'"11"'},{value:'"12"'},{value:'"14"'},{value:'"16"'},{value:'"20"'},{value:'"24"'},{value:'"28"'},{value:'"32"'},{value:'"36"'},{value:'"40"'},{value:'"44"'},{value:'"48"'},{value:'"52"'},{value:'"56"'},{value:'"60"'},{value:'"64"'},{value:'"72"'},{value:'"80"'},{value:'"96"'}]}},columnGap:{defaultValue:null,description:"Column gap (spacing token); overrides `gap` horizontally.",name:"columnGap",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"0"'},{value:'"px"'},{value:'"0-5"'},{value:'"1"'},{value:'"1-5"'},{value:'"2"'},{value:'"2-5"'},{value:'"3"'},{value:'"3-5"'},{value:'"4"'},{value:'"5"'},{value:'"6"'},{value:'"7"'},{value:'"8"'},{value:'"9"'},{value:'"10"'},{value:'"11"'},{value:'"12"'},{value:'"14"'},{value:'"16"'},{value:'"20"'},{value:'"24"'},{value:'"28"'},{value:'"32"'},{value:'"36"'},{value:'"40"'},{value:'"44"'},{value:'"48"'},{value:'"52"'},{value:'"56"'},{value:'"60"'},{value:'"64"'},{value:'"72"'},{value:'"80"'},{value:'"96"'}]}},rowGap:{defaultValue:null,description:"Row gap (spacing token); overrides `gap` vertically.",name:"rowGap",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"0"'},{value:'"px"'},{value:'"0-5"'},{value:'"1"'},{value:'"1-5"'},{value:'"2"'},{value:'"2-5"'},{value:'"3"'},{value:'"3-5"'},{value:'"4"'},{value:'"5"'},{value:'"6"'},{value:'"7"'},{value:'"8"'},{value:'"9"'},{value:'"10"'},{value:'"11"'},{value:'"12"'},{value:'"14"'},{value:'"16"'},{value:'"20"'},{value:'"24"'},{value:'"28"'},{value:'"32"'},{value:'"36"'},{value:'"40"'},{value:'"44"'},{value:'"48"'},{value:'"52"'},{value:'"56"'},{value:'"60"'},{value:'"64"'},{value:'"72"'},{value:'"80"'},{value:'"96"'}]}},flow:{defaultValue:null,description:"`grid-auto-flow`.",name:"flow",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"row"'},{value:'"column"'},{value:'"dense"'},{value:'"row-dense"'},{value:'"column-dense"'}]}},align:{defaultValue:null,description:"`align-items` of the cells.",name:"align",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"center"'},{value:'"stretch"'},{value:'"end"'},{value:'"start"'}]}},justify:{defaultValue:null,description:"`justify-items` of the cells.",name:"justify",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"center"'},{value:'"stretch"'},{value:'"end"'},{value:'"start"'}]}},inline:{defaultValue:null,description:"Render as `inline-grid`.",name:"inline",required:!1,type:{name:"boolean | undefined"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"any"}}}}}catch{}try{n.displayName="GridItem",n.__docgenInfo={description:"A `Grid` child that spans columns (`colSpan`, per breakpoint if needed) and/or rows.",displayName:"GridItem",props:{children:{defaultValue:null,description:"Item content",name:"children",required:!1,type:{name:"ReactNode"}},className:{defaultValue:null,description:"Additional CSS class",name:"className",required:!1,type:{name:"string | undefined"}},colSpan:{defaultValue:null,description:'Columns to span (1-12 or `"full"`), optionally per breakpoint: `{ base: "full", md: 6 }`.',name:"colSpan",required:!1,type:{name:'Responsive<"full" | GridColumns> | undefined'}},rowSpan:{defaultValue:null,description:'Rows to span (1-6 or `"full"`).',name:"rowSpan",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:"1"},{value:"2"},{value:"3"},{value:"4"},{value:"5"},{value:"6"},{value:'"full"'}]}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"any"}}}}}catch{}const P={title:"Layout/Grid",component:r,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"CSS grid with 1-12 equal columns (`columns`, per breakpoint if needed) or a custom template. Place children with `GridItem` to span columns or rows."}}},argTypes:{columns:{control:"number",min:1,max:12},rows:{control:"number",min:1,max:6},gap:{control:"select",options:["0","1","2","3","4","6","8"]},flow:{control:"select",options:["row","column","dense","row-dense","column-dense"]},align:{control:"select",options:["start","end","center","stretch"]},justify:{control:"select",options:["start","end","center","stretch"]},inline:{control:"boolean"}},args:{columns:3,gap:"4"}},l=a=>e.jsx("div",{style:{padding:"var(--mild-space-4)",borderRadius:"var(--mild-radius-md)",background:"var(--mild-color-primary-500)",color:"white",textAlign:"center"},children:a},a),f={render:a=>e.jsx(r,{...a,style:{width:"32rem"},children:Array.from({length:6},(s,u)=>l(String(u+1)))})},g={name:"Responsive columns",render:()=>e.jsx(r,{columns:{base:1,sm:2,lg:4},gap:"3",style:{width:"40rem"},children:Array.from({length:8},(a,s)=>l(String(s+1)))})},y={name:"GridItem spans",render:()=>e.jsxs(r,{columns:4,gap:"3",style:{width:"32rem"},children:[e.jsx(n,{colSpan:4,children:l("Header (span 4)")}),e.jsx(n,{colSpan:{base:4,md:1},children:l("Aside")}),e.jsx(n,{colSpan:{base:4,md:3},rowSpan:2,children:l("Main (row span 2)")}),e.jsx(n,{colSpan:{base:4,md:1},children:l("Aside 2")}),e.jsx(n,{colSpan:"full",children:l("Footer (full)")})]})},h={render:()=>e.jsxs(r,{templateColumns:"12rem 1fr",templateRows:"auto auto",columnGap:"4",rowGap:"2",style:{width:"32rem"},children:[l("Sidebar"),l("Content"),l("Sidebar 2"),l("Content 2")]})};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => <Grid {...args} style={{
    width: "32rem"
  }}>
      {Array.from({
      length: 6
    }, (_, i) => cell(String(i + 1)))}
    </Grid>
} satisfies Story`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: "Responsive columns",
  render: () => <Grid columns={{
    base: 1,
    sm: 2,
    lg: 4
  }} gap="3" style={{
    width: "40rem"
  }}>
      {Array.from({
      length: 8
    }, (_, i) => cell(String(i + 1)))}
    </Grid>
} satisfies Story`,...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: "GridItem spans",
  render: () => <Grid columns={4} gap="3" style={{
    width: "32rem"
  }}>
      <GridItem colSpan={4}>{cell("Header (span 4)")}</GridItem>
      <GridItem colSpan={{
      base: 4,
      md: 1
    }}>{cell("Aside")}</GridItem>
      <GridItem colSpan={{
      base: 4,
      md: 3
    }} rowSpan={2}>
        {cell("Main (row span 2)")}
      </GridItem>
      <GridItem colSpan={{
      base: 4,
      md: 1
    }}>{cell("Aside 2")}</GridItem>
      <GridItem colSpan="full">{cell("Footer (full)")}</GridItem>
    </Grid>
} satisfies Story`,...y.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Grid templateColumns="12rem 1fr" templateRows="auto auto" columnGap="4" rowGap="2" style={{
    width: "32rem"
  }}>
      {cell("Sidebar")}
      {cell("Content")}
      {cell("Sidebar 2")}
      {cell("Content 2")}
    </Grid>
} satisfies Story`,...h.parameters?.docs?.source}}};const z=["Default","Responsive","Spans","CustomTemplate"];export{h as CustomTemplate,f as Default,g as Responsive,y as Spans,z as __namedExportsOrder,P as default};
