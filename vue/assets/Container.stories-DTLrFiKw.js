import{_ as m}from"./Text-HyJ-f5G3.js";import{e as p,f as u,j as f,n as g,v as C,k as v,c as s,l as y,m as z}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as x}from"./cn-CTdd_bgG.js";import{g as i}from"./styling-DD7d-941.js";const o=p({__name:"Container",props:{as:{default:"div"},size:{default:"lg"},padding:{default:void 0},centerContent:{type:Boolean,default:!1}},setup(t){const e=t,d=s(()=>x("mild-container",`mild-container--${e.size}`,e.centerContent&&"mild-container--center-content")),l=s(()=>e.padding?{paddingLeft:i(e.padding),paddingRight:i(e.padding)}:void 0);return(c,h)=>(y(),u(v(t.as),{class:C(d.value),style:g(l.value)},{default:f(()=>[z(c.$slots,"default")]),_:3},8,["class","style"]))}});o.__docgenInfo={exportName:"default",displayName:"Container",description:"",tags:{},props:[{name:"centerContent",description:"Center the children too (flex column, centered items).",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"padding",description:'Horizontal padding (spacing token). Default comes from the stylesheet (`"4"`).',required:!1,type:{name:"SpaceToken"},defaultValue:{func:!1,value:"undefined"}},{name:"size",description:'Max-width. Default `"lg"` (1024px).',required:!1,type:{name:"ContainerSize"},defaultValue:{func:!1,value:'"lg"'}},{name:"as",description:"Element to render. Defaults to `div`.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"div"'}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Container/Container.vue"]};const S={title:"Layout/Container",component:o,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:"Horizontally centered wrapper with a max-width from the breakpoint scale (`size`) and horizontal padding. Renders a `div`, or the element given with `as` (`main`, `section`, ...)."}}},argTypes:{as:{control:"text"},size:{control:"select",options:["sm","md","lg","xl","2xl","full"]},padding:{control:"select",options:["0","2","4","6","8","12"]},centerContent:{control:"boolean"}},args:{size:"lg"}},n={render:t=>({components:{Container:o,Text:m},setup:()=>({args:t}),template:`
      <Container v-bind="args" style="background: var(--mild-color-gray-100); padding-top: 1rem; padding-bottom: 1rem">
        <Text as="p">This content is limited to the <code>{{ args.size }}</code> breakpoint width and centered in the viewport.</Text>
      </Container>
    `})},a={render:()=>({components:{Container:o},template:`
      <div style="display: flex; flex-direction: column; gap: 0.5rem">
        <Container v-for="size in ['sm', 'md', 'lg', 'xl', '2xl', 'full']" :key="size" :size="size" style="background: var(--mild-color-primary-100); padding-top: .5rem; padding-bottom: .5rem">
          {{ size }}
        </Container>
      </div>
    `})},r={args:{size:"md",centerContent:!0},render:n.render};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Container,
      Text
    },
    setup: () => ({
      args
    }),
    template: \`
      <Container v-bind="args" style="background: var(--mild-color-gray-100); padding-top: 1rem; padding-bottom: 1rem">
        <Text as="p">This content is limited to the <code>{{ args.size }}</code> breakpoint width and centered in the viewport.</Text>
      </Container>
    \`
  })
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Container
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 0.5rem">
        <Container v-for="size in ['sm', 'md', 'lg', 'xl', '2xl', 'full']" :key="size" :size="size" style="background: var(--mild-color-primary-100); padding-top: .5rem; padding-bottom: .5rem">
          {{ size }}
        </Container>
      </div>
    \`
  })
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    size: "md",
    centerContent: true
  },
  render: Default.render
}`,...r.parameters?.docs?.source}}};const T=["Default","Sizes","CenteredContent"];export{r as CenteredContent,n as Default,a as Sizes,T as __namedExportsOrder,S as default};
