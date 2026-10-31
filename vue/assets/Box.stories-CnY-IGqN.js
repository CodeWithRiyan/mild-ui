import{_ as f}from"./Text-HyJ-f5G3.js";import{e as x,f as h,j as y,n as b,v as T,k,c as p,l as w,m as B}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as q}from"./cn-CTdd_bgG.js";import{g as o,a as n,b as v,c as s}from"./styling-DD7d-941.js";import{s as g}from"./layout-Bf50BaQu.js";const i=x({__name:"Box",props:{as:{default:"div"},display:{default:"block"},flexDirection:{},flexWrap:{},alignItems:{},justifyContent:{},gap:{},gridTemplateColumns:{},gridTemplateRows:{},gridGap:{},padding:{},paddingX:{},paddingY:{},paddingTop:{},paddingRight:{},paddingBottom:{},paddingLeft:{},margin:{},marginX:{},marginY:{},marginTop:{},marginRight:{},marginBottom:{},marginLeft:{},width:{},height:{},minWidth:{},minHeight:{},maxWidth:{},maxHeight:{},borderRadius:{},borderWidth:{},borderColor:{},backgroundColor:{},color:{},position:{},top:{},right:{},bottom:{},left:{},zIndex:{},overflow:{},overflowX:{},overflowY:{}},setup(t){const r=t,c=p(()=>q("mild-box",`mild-box--${r.display}`,r.flexDirection&&`mild-box--flex-${r.flexDirection}`,r.flexWrap&&`mild-box--flex-${r.flexWrap}`,r.alignItems&&`mild-box--items-${g(r.alignItems)}`,r.justifyContent&&`mild-box--justify-${g(r.justifyContent)}`,r.position&&`mild-box--${r.position}`,r.overflow&&`mild-box--overflow-${r.overflow}`,r.overflowX&&`mild-box--overflow-x-${r.overflowX}`,r.overflowY&&`mild-box--overflow-y-${r.overflowY}`)),u=p(()=>{const a={},e=r;return e.padding&&(a.padding=o(e.padding)),e.paddingX&&(a.paddingLeft=o(e.paddingX),a.paddingRight=o(e.paddingX)),e.paddingY&&(a.paddingTop=o(e.paddingY),a.paddingBottom=o(e.paddingY)),e.paddingTop&&(a.paddingTop=o(e.paddingTop)),e.paddingRight&&(a.paddingRight=o(e.paddingRight)),e.paddingBottom&&(a.paddingBottom=o(e.paddingBottom)),e.paddingLeft&&(a.paddingLeft=o(e.paddingLeft)),e.margin&&(a.margin=o(e.margin)),e.marginX&&(a.marginLeft=o(e.marginX),a.marginRight=o(e.marginX)),e.marginY&&(a.marginTop=o(e.marginY),a.marginBottom=o(e.marginY)),e.marginTop&&(a.marginTop=o(e.marginTop)),e.marginRight&&(a.marginRight=o(e.marginRight)),e.marginBottom&&(a.marginBottom=o(e.marginBottom)),e.marginLeft&&(a.marginLeft=o(e.marginLeft)),e.gap&&(a.gap=o(e.gap)),e.gridTemplateColumns&&(a.gridTemplateColumns=e.gridTemplateColumns),e.gridTemplateRows&&(a.gridTemplateRows=e.gridTemplateRows),e.gridGap&&(a.gap=o(e.gridGap)),e.width&&(a.width=n(e.width)),e.height&&(a.height=n(e.height)),e.minWidth&&(a.minWidth=n(e.minWidth)),e.minHeight&&(a.minHeight=n(e.minHeight)),e.maxWidth&&(a.maxWidth=n(e.maxWidth)),e.maxHeight&&(a.maxHeight=n(e.maxHeight)),e.borderRadius&&(a.borderRadius=v(e.borderRadius)),e.borderWidth&&(a.borderWidth=o(e.borderWidth)),e.borderColor&&(a.borderColor=s(e.borderColor)),e.backgroundColor&&(a.backgroundColor=s(e.backgroundColor)),e.color&&(a.color=s(e.color)),e.top&&(a.top=o(e.top)),e.right&&(a.right=o(e.right)),e.bottom&&(a.bottom=o(e.bottom)),e.left&&(a.left=o(e.left)),e.zIndex&&(a.zIndex=e.zIndex),Object.keys(a).length>0?a:void 0});return(a,e)=>(w(),h(k(t.as),{class:T(c.value),style:b(u.value)},{default:y(()=>[B(a.$slots,"default")]),_:3},8,["class","style"]))}});i.__docgenInfo={exportName:"default",displayName:"Box",description:"",tags:{},props:[{name:"overflowY",required:!1,type:{name:"OverflowValue"}},{name:"overflowX",required:!1,type:{name:"OverflowValue"}},{name:"overflow",required:!1,type:{name:"OverflowValue"}},{name:"zIndex",required:!1,type:{name:"ZIndexToken"}},{name:"left",required:!1,type:{name:"SpaceToken"}},{name:"bottom",required:!1,type:{name:"SpaceToken"}},{name:"right",required:!1,type:{name:"SpaceToken"}},{name:"top",required:!1,type:{name:"SpaceToken"}},{name:"position",required:!1,type:{name:"PositionValue"}},{name:"color",required:!1,type:{name:"ColorToken"}},{name:"backgroundColor",required:!1,type:{name:"ColorToken"}},{name:"borderColor",required:!1,type:{name:"ColorToken"}},{name:"borderWidth",required:!1,type:{name:"SpaceToken"}},{name:"borderRadius",required:!1,type:{name:"RadiusToken"}},{name:"maxHeight",required:!1,type:{name:"DimensionToken"}},{name:"maxWidth",required:!1,type:{name:"DimensionToken"}},{name:"minHeight",required:!1,type:{name:"DimensionToken"}},{name:"minWidth",required:!1,type:{name:"DimensionToken"}},{name:"height",required:!1,type:{name:"DimensionToken"}},{name:"width",required:!1,type:{name:"DimensionToken"}},{name:"marginLeft",required:!1,type:{name:"SpaceToken"}},{name:"marginBottom",required:!1,type:{name:"SpaceToken"}},{name:"marginRight",required:!1,type:{name:"SpaceToken"}},{name:"marginTop",required:!1,type:{name:"SpaceToken"}},{name:"marginY",required:!1,type:{name:"SpaceToken"}},{name:"marginX",required:!1,type:{name:"SpaceToken"}},{name:"margin",required:!1,type:{name:"SpaceToken"}},{name:"paddingLeft",required:!1,type:{name:"SpaceToken"}},{name:"paddingBottom",required:!1,type:{name:"SpaceToken"}},{name:"paddingRight",required:!1,type:{name:"SpaceToken"}},{name:"paddingTop",required:!1,type:{name:"SpaceToken"}},{name:"paddingY",required:!1,type:{name:"SpaceToken"}},{name:"paddingX",required:!1,type:{name:"SpaceToken"}},{name:"padding",required:!1,type:{name:"SpaceToken"}},{name:"gridGap",required:!1,type:{name:"SpaceToken"}},{name:"gridTemplateRows",required:!1,type:{name:"string"}},{name:"gridTemplateColumns",required:!1,type:{name:"string"}},{name:"gap",required:!1,type:{name:"SpaceToken"}},{name:"justifyContent",required:!1,type:{name:"JustifyContent"}},{name:"alignItems",required:!1,type:{name:"AlignItems"}},{name:"flexWrap",required:!1,type:{name:"FlexWrap"}},{name:"flexDirection",required:!1,type:{name:"FlexDirection"}},{name:"display",required:!1,type:{name:"DisplayValue"},defaultValue:{func:!1,value:'"block"'}},{name:"as",description:"Element to render. Defaults to `div`.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"div"'}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Box/Box.vue"]};const L={title:"Components/Box",component:i,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Layout primitive. Renders a `div` by default, or the element given with `as`. Its style props take design-token keys only (`padding="4"`, `width="1/2"`, `backgroundColor="primary-500"`) and resolve to themed `--mild-*` custom properties.'}}},argTypes:{as:{control:"text"},display:{control:"select",options:["block","inline-block","inline","flex","inline-flex","grid","none"]},padding:{control:"text"},margin:{control:"text"},gap:{control:"text"},borderRadius:{control:"select",options:["none","sm","base","md","lg","xl","full"]},backgroundColor:{control:"text"},color:{control:"text"}},args:{padding:"4",borderRadius:"lg",backgroundColor:"primary-500",color:"white"}},d={render:t=>({components:{Box:i},setup:()=>({args:t}),template:'<Box v-bind="args">A themed box</Box>'})},m={render:()=>({components:{Box:i,Text:f},template:`
      <Box display="flex" gap="3" padding="4" border-radius="md" background-color="gray-100">
        <Box padding="3" border-radius="md" background-color="primary-500" color="white">One</Box>
        <Box padding="3" border-radius="md" background-color="primary-600" color="white">Two</Box>
        <Box padding="3" border-radius="md" background-color="primary-700" color="white">Three</Box>
      </Box>
    `})},l={render:()=>({components:{Box:i,Text:f},template:`
      <Box as="section" aria-label="Card" padding="6" border-width="px" border-color="gray-200" border-radius="lg" max-width="96">
        <Text as="h3" font-size="lg" font-weight="semibold">A section</Text>
        <Text as="p" color="muted">Rendered as a landmark with themed spacing and borders.</Text>
      </Box>
    `})};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Box
    },
    setup: () => ({
      args
    }),
    template: '<Box v-bind="args">A themed box</Box>'
  })
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Box,
      Text
    },
    template: \`
      <Box display="flex" gap="3" padding="4" border-radius="md" background-color="gray-100">
        <Box padding="3" border-radius="md" background-color="primary-500" color="white">One</Box>
        <Box padding="3" border-radius="md" background-color="primary-600" color="white">Two</Box>
        <Box padding="3" border-radius="md" background-color="primary-700" color="white">Three</Box>
      </Box>
    \`
  })
}`,...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Box,
      Text
    },
    template: \`
      <Box as="section" aria-label="Card" padding="6" border-width="px" border-color="gray-200" border-radius="lg" max-width="96">
        <Text as="h3" font-size="lg" font-weight="semibold">A section</Text>
        <Text as="p" color="muted">Rendered as a landmark with themed spacing and borders.</Text>
      </Box>
    \`
  })
}`,...l.parameters?.docs?.source}}};const X=["Default","FlexLayout","AsSection"];export{l as AsSection,d as Default,m as FlexLayout,X as __namedExportsOrder,L as default};
