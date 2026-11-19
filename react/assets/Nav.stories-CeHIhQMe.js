import{j as a}from"./jsx-runtime-DSvmvvsx.js";import{r as d}from"./index-B0WjJBI_.js";import{c as h}from"./cn-BaF2GUMg.js";import"./_commonjsHelpers-CqkleIqs.js";const S="Main",o=d.forwardRef(({variant:e="plain",orientation:r="horizontal",className:s,listClassName:u,children:t,"aria-label":p=S,...l},m)=>a.jsx("nav",{ref:m,"aria-label":p,className:h("mild-nav",`mild-nav--${e}`,`mild-nav--${r}`,s),...l,children:a.jsx("ul",{className:h("mild-nav__list",u),children:t})}));o.displayName="Nav";const n=d.forwardRef(({className:e,...r},s)=>a.jsx("li",{ref:s,className:h("mild-nav-item",e),...r}));n.displayName="NavItem";function R(e){return Number(d.version.split(".")[0])>=19?e.props.ref??null:e.ref??null}function L(e,r){typeof e=="function"?e(r):e&&(e.current=r)}function V(e,r,s){const u=R(e),t=c=>{L(s,c),L(u,c)},{className:p,onClick:l,...m}=r,f=e.props.onClick,j=c=>{f?.(c),c.defaultPrevented||l?.(c)};return d.cloneElement(e,{...m,...e.props,ref:t,className:h(p,e.props.className),onClick:j})}const i=d.forwardRef(({active:e=!1,disabled:r=!1,asChild:s=!1,className:u,children:t,...p},l)=>{const m=h("mild-nav-link",e&&!r&&"mild-nav-link--active",r&&"mild-nav-link--disabled",u);if(r){const{href:j,target:c,rel:D,onClick:E,...I}=p,C=s&&d.isValidElement(t)?t.props.children:t;return a.jsx("span",{ref:l,className:m,"aria-disabled":"true",...I,children:C})}const f={...p,className:m,"aria-current":e?"page":void 0};return s&&d.isValidElement(t)?V(t,f,l):a.jsx("a",{ref:l,...f,children:t})});i.displayName="NavLink";try{o.displayName="Nav",o.__docgenInfo={description:"Site or section navigation (`nav > ul > li > a`). Links are plain links in the normal Tab\norder: this is not a tablist, so there is no roving tabindex and no arrow-key handling.\nHorizontal navs scroll sideways on narrow screens instead of wrapping.",displayName:"Nav",props:{variant:{defaultValue:{value:"plain"},description:'Look of the links. Default `"plain"`.',name:"variant",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"pills"'},{value:'"underline"'},{value:'"plain"'}]}},orientation:{defaultValue:{value:"horizontal"},description:'Direction of the list. Default `"horizontal"`.',name:"orientation",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"horizontal"'},{value:'"vertical"'}]}},listClassName:{defaultValue:null,description:"Class name of the inner `ul`.",name:"listClassName",required:!1,type:{name:"string | undefined"}}}}}catch{}try{n.displayName="NavItem",n.__docgenInfo={description:"One entry of the list (an `li`); holds a `NavLink`.",displayName:"NavItem",props:{}}}catch{}try{i.displayName="NavLink",i.__docgenInfo={description:'A link of the nav. `active` marks the current page (`aria-current="page"` on this link\nonly); `disabled` renders a `span` so nothing focusable or clickable is left; `asChild`\nlets a router link (e.g. Next.js `Link`) take over the element while keeping the props.',displayName:"NavLink",props:{active:{defaultValue:{value:"false"},description:'The link to the current page: gets `aria-current="page"` and the active style.',name:"active",required:!1,type:{name:"boolean | undefined"}},disabled:{defaultValue:{value:"false"},description:"Renders inert text (`aria-disabled`) instead of a link.",name:"disabled",required:!1,type:{name:"boolean | undefined"}},asChild:{defaultValue:{value:"false"},description:"Merge the props into the single child (a router link) instead of rendering an `a`.",name:"asChild",required:!1,type:{name:"boolean | undefined"}}}}}catch{}const w="375px",M={title:"Navigation/Nav",component:o,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Site or section navigation (`nav > ul > li > a`). Only the `active` link gets `aria-current="page"`. A `disabled` item renders as text (`aria-disabled="true"`), `asChild` lets a router link take over the element. Links stay in the normal Tab order: this is not a tablist, so there is no roving tabindex or arrow-key handling.'}}},argTypes:{variant:{control:"inline-radio",options:["pills","underline","plain"]},orientation:{control:"inline-radio",options:["horizontal","vertical"]}},args:{"aria-label":"Primary",variant:"plain",orientation:"horizontal"},render:e=>a.jsxs(o,{...e,children:[a.jsx(n,{children:a.jsx(i,{href:"#home",active:!0,children:"Home"})}),a.jsx(n,{children:a.jsx(i,{href:"#docs",children:"Docs"})}),a.jsx(n,{children:a.jsx(i,{href:"#blog",children:"Blog"})})]})},g={},N={args:{variant:"pills"}},k={args:{variant:"underline"}},x={args:{variant:"pills",orientation:"vertical"}},y={args:{variant:"underline",orientation:"vertical"}},b={args:{variant:"pills"},render:e=>a.jsxs(o,{...e,children:[a.jsx(n,{children:a.jsx(i,{href:"#home",active:!0,children:"Home"})}),a.jsx(n,{children:a.jsx(i,{href:"#pricing",disabled:!0,children:"Pricing"})}),a.jsx(n,{children:a.jsx(i,{href:"#docs",children:"Docs"})})]})},_={args:{variant:"underline"},render:e=>a.jsxs(o,{...e,children:[a.jsx(n,{children:a.jsx(i,{asChild:!0,active:!0,children:a.jsx("a",{href:"#router-home",children:"Router home"})})}),a.jsx(n,{children:a.jsx(i,{asChild:!0,children:a.jsx("a",{href:"#router-docs",children:"Router docs"})})})]})},A=["Overview","Components","Tokens","Theming","Accessibility","Changelog","Migration"],v={args:{variant:"underline"},parameters:{layout:"fullscreen",viewport:{viewports:{mobile375:{name:"Mobile 375px",styles:{width:w,height:"667px"}}},defaultViewport:"mobile375"}},render:e=>a.jsx("div",{style:{width:w,maxWidth:"100%"},children:a.jsx(o,{...e,children:A.map((r,s)=>a.jsx(n,{children:a.jsx(i,{href:`#${r.toLowerCase()}`,active:s===0,children:r})},r))})})};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:"{} satisfies Story",...g.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "pills"
  }
} satisfies Story`,...N.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "underline"
  }
} satisfies Story`,...k.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "pills",
    orientation: "vertical"
  }
} satisfies Story`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "underline",
    orientation: "vertical"
  }
} satisfies Story`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "pills"
  },
  render: args => <Nav {...args}>
      <NavItem>
        <NavLink href="#home" active>
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#pricing" disabled>
          Pricing
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#docs">Docs</NavLink>
      </NavItem>
    </Nav>
} satisfies Story`,...b.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "underline"
  },
  render: args => <Nav {...args}>
      <NavItem>
        <NavLink asChild active>
          <a href="#router-home">Router home</a>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink asChild>
          <a href="#router-docs">Router docs</a>
        </NavLink>
      </NavItem>
    </Nav>
} satisfies Story`,..._.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
  render: args => <div style={{
    width: MOBILE_WIDTH,
    maxWidth: "100%"
  }}>
      <Nav {...args}>
        {overflowLabels.map((label, index) => <NavItem key={label}>
            <NavLink href={\`#\${label.toLowerCase()}\`} active={index === 0}>
              {label}
            </NavLink>
          </NavItem>)}
      </Nav>
    </div>
} satisfies Story`,...v.parameters?.docs?.source},description:{story:"At a 375px viewport the horizontal nav scrolls sideways instead of wrapping.",...v.parameters?.docs?.description}}};const H=["Plain","Pills","Underline","Vertical","VerticalUnderline","WithDisabledItem","AsChild","OverflowAt375"];export{_ as AsChild,v as OverflowAt375,N as Pills,g as Plain,k as Underline,x as Vertical,y as VerticalUnderline,b as WithDisabledItem,H as __namedExportsOrder,M as default};
