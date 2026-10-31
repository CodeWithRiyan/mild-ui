import{e as f,f as g,j as G,n as b,v,k as w,c,l as y,m as $}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as I}from"./cn-CTdd_bgG.js";import{g as p}from"./styling-DD7d-941.js";import{r as h}from"./layout-Bf50BaQu.js";const s=f({__name:"Grid",props:{as:{default:"div"},columns:{default:void 0},rows:{default:void 0},templateColumns:{default:void 0},templateRows:{default:void 0},gap:{default:void 0},columnGap:{default:void 0},rowGap:{default:void 0},flow:{default:void 0},align:{default:void 0},justify:{default:void 0},inline:{type:Boolean,default:!1}},setup(r){const e=r,l=c(()=>I("mild-grid",e.inline&&"mild-grid--inline",...h(e.columns,(n,u)=>u?`mild-grid--${u}-cols-${n}`:`mild-grid--cols-${n}`),e.rows&&`mild-grid--rows-${e.rows}`,e.flow&&`mild-grid--flow-${e.flow}`,e.align&&`mild-grid--items-${e.align}`,e.justify&&`mild-grid--justify-${e.justify}`)),t=c(()=>{const n={};return e.templateColumns&&(n.gridTemplateColumns=e.templateColumns),e.templateRows&&(n.gridTemplateRows=e.templateRows),e.gap&&(n.gap=p(e.gap)),e.columnGap&&(n.columnGap=p(e.columnGap)),e.rowGap&&(n.rowGap=p(e.rowGap)),Object.keys(n).length>0?n:void 0});return(n,u)=>(y(),g(w(r.as),{class:v(l.value),style:b(t.value)},{default:G(()=>[$(n.$slots,"default")]),_:3},8,["class","style"]))}});s.__docgenInfo={exportName:"default",displayName:"Grid",description:"",tags:{},props:[{name:"inline",description:"Render as `inline-grid`.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"justify",description:"`justify-items` of the cells.",required:!1,type:{name:"GridAlignment"},defaultValue:{func:!1,value:"undefined"}},{name:"align",description:"`align-items` of the cells.",required:!1,type:{name:"GridAlignment"},defaultValue:{func:!1,value:"undefined"}},{name:"flow",description:"`grid-auto-flow`.",required:!1,type:{name:"GridFlow"},defaultValue:{func:!1,value:"undefined"}},{name:"rowGap",description:"Row gap (spacing token); overrides `gap` vertically.",required:!1,type:{name:"SpaceToken"},defaultValue:{func:!1,value:"undefined"}},{name:"columnGap",description:"Column gap (spacing token); overrides `gap` horizontally.",required:!1,type:{name:"SpaceToken"},defaultValue:{func:!1,value:"undefined"}},{name:"gap",description:"Gap on both axes (spacing token).",required:!1,type:{name:"SpaceToken"},defaultValue:{func:!1,value:"undefined"}},{name:"templateRows",description:"Custom `grid-template-rows`.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"templateColumns",description:"Custom `grid-template-columns`, for layouts the `columns` scale cannot express.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"rows",description:"Number of equal rows (1-6).",required:!1,type:{name:"GridRows"},defaultValue:{func:!1,value:"undefined"}},{name:"columns",description:"Number of equal columns (1-12), optionally per breakpoint: `{ base: 1, md: 3 }`.",required:!1,type:{name:"Responsive",elements:[{name:"GridColumns"}]},defaultValue:{func:!1,value:"undefined"}},{name:"as",description:"Element to render. Defaults to `div`.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"div"'}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Grid/Grid.vue"]};const S=f({__name:"GridItem",props:{as:{default:"div"},colSpan:{default:void 0},rowSpan:{default:void 0}},setup(r){const e=r,l=c(()=>I("mild-grid-item",...h(e.colSpan,(t,n)=>n?`mild-grid-item--${n}-col-span-${t}`:`mild-grid-item--col-span-${t}`),e.rowSpan&&`mild-grid-item--row-span-${e.rowSpan}`));return(t,n)=>(y(),g(w(r.as),{class:v(l.value)},{default:G(()=>[$(t.$slots,"default")]),_:3},8,["class"]))}});S.__docgenInfo={exportName:"default",displayName:"GridItem",description:"",tags:{},props:[{name:"rowSpan",description:'Rows to span (1-6 or `"full"`).',required:!1,type:{name:"union",elements:[{name:"GridRows"},{name:'"full"'}]},defaultValue:{func:!1,value:"undefined"}},{name:"colSpan",description:'Columns to span (1-12 or `"full"`), optionally per breakpoint: `{ base: "full", md: 6 }`.',required:!1,type:{name:"Responsive",elements:[{name:"union",elements:[{name:"GridColumns"},{name:'"full"'}]}]},defaultValue:{func:!1,value:"undefined"}},{name:"as",description:"Element to render. Defaults to `div`.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"div"'}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Grid/GridItem.vue"]};const R={title:"Layout/Grid",component:s,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"CSS grid with 1-12 equal columns (`columns`, per breakpoint if needed) or a custom template. Place children with `GridItem` to span columns or rows."}}},argTypes:{columns:{control:"number",min:1,max:12},rows:{control:"number",min:1,max:6},gap:{control:"select",options:["0","1","2","3","4","6","8"]},flow:{control:"select",options:["row","column","dense","row-dense","column-dense"]},align:{control:"select",options:["start","end","center","stretch"]},justify:{control:"select",options:["start","end","center","stretch"]},inline:{control:"boolean"}},args:{columns:3,gap:"4"}},a=r=>`<div style="padding: var(--mild-space-4); border-radius: var(--mild-radius-md); background: var(--mild-color-primary-500); color: white; text-align: center">${r}</div>`,o={render:r=>({components:{Grid:s},setup:()=>({args:r}),template:`<Grid v-bind="args" style="width: 32rem">${Array.from({length:6},(e,l)=>a(String(l+1))).join("")}</Grid>`})},i={name:"Responsive columns",render:()=>({components:{Grid:s},template:`
      <Grid :columns="{ base: 1, sm: 2, lg: 4 }" gap="3" style="width: 40rem">
        ${Array.from({length:8},(r,e)=>a(String(e+1))).join("")}
      </Grid>
    `})},d={name:"GridItem spans",render:()=>({components:{Grid:s,GridItem:S},template:`
      <Grid :columns="4" gap="3" style="width: 32rem">
        <GridItem :col-span="4">${a("Header (span 4)")}</GridItem>
        <GridItem :col-span="{ base: 4, md: 1 }">${a("Aside")}</GridItem>
        <GridItem :col-span="{ base: 4, md: 3 }" :row-span="2">${a("Main (row span 2)")}</GridItem>
        <GridItem :col-span="{ base: 4, md: 1 }">${a("Aside 2")}</GridItem>
        <GridItem col-span="full">${a("Footer (full)")}</GridItem>
      </Grid>
    `})},m={render:()=>({components:{Grid:s},template:`
      <Grid template-columns="12rem 1fr" template-rows="auto auto" column-gap="4" row-gap="2" style="width: 32rem">
        ${a("Sidebar")}${a("Content")}${a("Sidebar")}${a("Content")}
      </Grid>
    `})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Grid
    },
    setup: () => ({
      args
    }),
    template: \`<Grid v-bind="args" style="width: 32rem">\${Array.from({
      length: 6
    }, (_, i) => cell(String(i + 1))).join("")}</Grid>\`
  })
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: "Responsive columns",
  render: () => ({
    components: {
      Grid
    },
    template: \`
      <Grid :columns="{ base: 1, sm: 2, lg: 4 }" gap="3" style="width: 40rem">
        \${Array.from({
      length: 8
    }, (_, i) => cell(String(i + 1))).join("")}
      </Grid>
    \`
  })
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: "GridItem spans",
  render: () => ({
    components: {
      Grid,
      GridItem
    },
    template: \`
      <Grid :columns="4" gap="3" style="width: 32rem">
        <GridItem :col-span="4">\${cell("Header (span 4)")}</GridItem>
        <GridItem :col-span="{ base: 4, md: 1 }">\${cell("Aside")}</GridItem>
        <GridItem :col-span="{ base: 4, md: 3 }" :row-span="2">\${cell("Main (row span 2)")}</GridItem>
        <GridItem :col-span="{ base: 4, md: 1 }">\${cell("Aside 2")}</GridItem>
        <GridItem col-span="full">\${cell("Footer (full)")}</GridItem>
      </Grid>
    \`
  })
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Grid
    },
    template: \`
      <Grid template-columns="12rem 1fr" template-rows="auto auto" column-gap="4" row-gap="2" style="width: 32rem">
        \${cell("Sidebar")}\${cell("Content")}\${cell("Sidebar")}\${cell("Content")}
      </Grid>
    \`
  })
}`,...m.parameters?.docs?.source}}};const V=["Default","Responsive","Spans","CustomTemplate"];export{m as CustomTemplate,o as Default,i as Responsive,d as Spans,V as __namedExportsOrder,R as default};
