import{e as k,x as b,C as V,m as N,v as h,A as y,l as f,f as w,j as x,k as _,P as C,z as L,c as A}from"./vue.esm-bundler-C1601G13.js";import{c as O}from"./cn-CTdd_bgG.js";const n=k({__name:"Nav",props:{variant:{default:"plain"},orientation:{default:"horizontal"},ui:{default:void 0}},setup(e){return(a,g)=>(f(),b("nav",{"aria-label":"Main",class:h(`mild-nav mild-nav--${e.variant} mild-nav--${e.orientation}`)},[V("ul",{class:h(y(O)("mild-nav__list",e.ui?.list))},[N(a.$slots,"default")],2)],2))}});n.__docgenInfo={exportName:"default",displayName:"Nav",description:"",tags:{},props:[{name:"variant",description:'Look of the links. Default `"plain"`.',required:!1,type:{name:"NavVariant"},defaultValue:{func:!1,value:'"plain"'}},{name:"orientation",description:'Direction of the list. Default `"horizontal"`.',required:!1,type:{name:"NavOrientation"},defaultValue:{func:!1,value:'"horizontal"'}},{name:"ui",required:!1,type:{name:"NavUiClasses"},defaultValue:{func:!1,value:"undefined"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Nav/Nav.vue"]};const r=k({__name:"NavItem",props:{as:{default:"li"}},setup(e){return(a,g)=>(f(),w(_(e.as),{class:"mild-nav-item"},{default:x(()=>[N(a.$slots,"default")]),_:3}))}});r.__docgenInfo={exportName:"default",displayName:"NavItem",description:"",tags:{},props:[{name:"as",description:"Element to render. Defaults to `li`.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"li"'}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Nav/NavItem.vue"]};const i=k({inheritAttrs:!1,__name:"NavLink",props:{as:{default:"a"},active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},setup(e){const a=C(),g=new Set(["href","to","target","rel","onClick"]),D=A(()=>Object.fromEntries(Object.entries(a).filter(([o])=>!g.has(o))));return(o,B)=>e.disabled?(f(),b("span",L({key:0},D.value,{class:"mild-nav-link mild-nav-link--disabled","aria-disabled":"true"}),[N(o.$slots,"default")],16)):(f(),w(_(e.as),L({key:1},y(a),{class:["mild-nav-link",e.active&&"mild-nav-link--active"],"aria-current":e.active?"page":void 0}),{default:x(()=>[N(o.$slots,"default")]),_:3},16,["class","aria-current"]))}});i.__docgenInfo={exportName:"default",displayName:"NavLink",description:"",tags:{},props:[{name:"as",description:"Element or component to render. Defaults to `a`; pass a router link component.",required:!1,type:{name:"union",elements:[{name:"string"},{name:"Component"}]},defaultValue:{func:!1,value:'"a"'}},{name:"active",description:'The link to the current page: gets `aria-current="page"` and the active style.',required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Renders inert text (`aria-disabled`) instead of a link.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Nav/NavLink.vue"]};const I="375px",P={title:"Navigation/Nav",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Site or section navigation (`nav > ul > li > a`). Only the `active` link gets `aria-current="page"`. A `disabled` item renders as text (`aria-disabled="true"`), and `as` lets a router link take over the element. Links stay in the normal Tab order: this is not a tablist, so there is no roving tabindex or arrow-key handling.'}}},argTypes:{variant:{control:"inline-radio",options:["pills","underline","plain"]},orientation:{control:"inline-radio",options:["horizontal","vertical"]}},args:{"aria-label":"Primary",variant:"plain",orientation:"horizontal"}},s={render:e=>({components:{Nav:n,NavItem:r,NavLink:i},setup:()=>({args:e}),template:`
      <Nav v-bind="args">
        <NavItem><NavLink href="#home" active>Home</NavLink></NavItem>
        <NavItem><NavLink href="#docs">Docs</NavLink></NavItem>
        <NavItem><NavLink href="#blog">Blog</NavLink></NavItem>
      </Nav>
    `})},l=s,v={...s,args:{variant:"pills"}},c={...s,args:{variant:"underline"}},d={...s,args:{variant:"pills",orientation:"vertical"}},m={...s,args:{variant:"underline",orientation:"vertical"}},u={args:{variant:"pills"},render:e=>({components:{Nav:n,NavItem:r,NavLink:i},setup:()=>({args:e}),template:`
      <Nav v-bind="args">
        <NavItem><NavLink href="#home" active>Home</NavLink></NavItem>
        <NavItem><NavLink href="#pricing" disabled>Pricing</NavLink></NavItem>
        <NavItem><NavLink href="#docs">Docs</NavLink></NavItem>
      </Nav>
    `})},p={args:{variant:"underline"},render:e=>({components:{Nav:n,NavItem:r,NavLink:i},setup:()=>({args:e}),template:`
      <Nav v-bind="args">
        <NavItem><NavLink as="a" href="#router-home" active>Router home</NavLink></NavItem>
        <NavItem><NavLink as="a" href="#router-docs">Router docs</NavLink></NavItem>
      </Nav>
    `})},S=["Overview","Components","Tokens","Theming","Accessibility","Changelog","Migration"],t={args:{variant:"underline"},parameters:{layout:"fullscreen",viewport:{viewports:{mobile375:{name:"Mobile 375px",styles:{width:I,height:"667px"}}},defaultViewport:"mobile375"}},render:e=>({components:{Nav:n,NavItem:r,NavLink:i},setup:()=>({args:e,overflowLabels:S,width:I}),template:`
      <div :style="{ width, maxWidth: '100%' }">
        <Nav v-bind="args">
          <NavItem v-for="(label, index) in overflowLabels" :key="label">
            <NavLink :href="'#' + label.toLowerCase()" :active="index === 0">{{ label }}</NavLink>
          </NavItem>
        </Nav>
      </div>
    `})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"Default",...l.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    variant: "pills"
  }
}`,...v.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    variant: "underline"
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    variant: "pills",
    orientation: "vertical"
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...Default,
  args: {
    variant: "underline",
    orientation: "vertical"
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "pills"
  },
  render: args => ({
    components: {
      Nav,
      NavItem,
      NavLink
    },
    setup: () => ({
      args
    }),
    template: \`
      <Nav v-bind="args">
        <NavItem><NavLink href="#home" active>Home</NavLink></NavItem>
        <NavItem><NavLink href="#pricing" disabled>Pricing</NavLink></NavItem>
        <NavItem><NavLink href="#docs">Docs</NavLink></NavItem>
      </Nav>
    \`
  })
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "underline"
  },
  render: args => ({
    components: {
      Nav,
      NavItem,
      NavLink
    },
    setup: () => ({
      args
    }),
    // \`as\` takes any component, e.g. RouterLink / NuxtLink; a plain element keeps the story router-free.
    template: \`
      <Nav v-bind="args">
        <NavItem><NavLink as="a" href="#router-home" active>Router home</NavLink></NavItem>
        <NavItem><NavLink as="a" href="#router-docs">Router docs</NavLink></NavItem>
      </Nav>
    \`
  })
}`,...p.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "underline"
  },
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewports: {
        mobile375: {
          name: "Mobile 375px",
          styles: {
            width: MOBILE_WIDTH,
            height: "667px"
          }
        }
      },
      defaultViewport: "mobile375"
    }
  },
  render: args => ({
    components: {
      Nav,
      NavItem,
      NavLink
    },
    setup: () => ({
      args,
      overflowLabels,
      width: MOBILE_WIDTH
    }),
    template: \`
      <div :style="{ width, maxWidth: '100%' }">
        <Nav v-bind="args">
          <NavItem v-for="(label, index) in overflowLabels" :key="label">
            <NavLink :href="'#' + label.toLowerCase()" :active="index === 0">{{ label }}</NavLink>
          </NavItem>
        </Nav>
      </div>
    \`
  })
}`,...t.parameters?.docs?.source},description:{story:"At a 375px viewport the horizontal nav scrolls sideways instead of wrapping.",...t.parameters?.docs?.description}}};const z=["Plain","Pills","Underline","Vertical","VerticalUnderline","WithDisabledItem","AsChild","OverflowAt375"];export{p as AsChild,t as OverflowAt375,v as Pills,l as Plain,c as Underline,d as Vertical,m as VerticalUnderline,u as WithDisabledItem,z as __namedExportsOrder,P as default};
