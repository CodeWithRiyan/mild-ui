import{e as p,f as u,j as f,n as k,v,k as g,c as a,l as i,m as l,x as I,y as w}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as _}from"./cn-CTdd_bgG.js";import{g as b}from"./styling-DD7d-941.js";const o=p({__name:"List",props:{as:{default:void 0},ordered:{type:Boolean,default:!1},marker:{default:void 0},unstyled:{type:Boolean,default:!1},spacing:{default:void 0}},setup(t){const e=t,m=a(()=>e.as??(e.ordered?"ol":"ul")),c=a(()=>e.marker??(e.ordered?"decimal":void 0)),h=a(()=>_("mild-list",e.unstyled&&"mild-list--unstyled",!e.unstyled&&c.value&&`mild-list--marker-${c.value}`)),L=a(()=>e.spacing?{"--mild-list-spacing":b(e.spacing)}:void 0);return(y,S)=>(i(),u(g(m.value),{class:v(h.value),style:k(L.value)},{default:f(()=>[l(y.$slots,"default")]),_:3},8,["class","style"]))}});o.__docgenInfo={exportName:"default",displayName:"List",description:"",tags:{},props:[{name:"spacing",description:"Space between items (spacing token).",required:!1,type:{name:"SpaceToken"},defaultValue:{func:!1,value:"undefined"}},{name:"unstyled",description:"Drop the marker and the indentation.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"marker",description:'Marker style; defaults to `"decimal"` when ordered, otherwise the browser\'s `disc`.',required:!1,type:{name:"ListMarker"},defaultValue:{func:!1,value:"undefined"}},{name:"ordered",description:'Render an `ol` instead of a `ul` (marker defaults to `"decimal"`).',required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"as",description:"Element to render. Defaults to `ul`, or `ol` when `ordered`.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/List/List.vue"]};const D={key:0,class:"mild-list-item__icon","aria-hidden":"true"},d=p({__name:"ListItem",props:{as:{default:"li"}},setup(t){return(e,m)=>(i(),u(g(t.as),{class:"mild-list-item"},{default:f(()=>[e.$slots.icon?(i(),I("span",D,[l(e.$slots,"icon")])):w("",!0),l(e.$slots,"default")]),_:3}))}});d.__docgenInfo={exportName:"default",displayName:"ListItem",description:"",tags:{},props:[{name:"as",description:"Element to render. Defaults to `li`.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"li"'}}],slots:[{name:"icon",description:"Icon shown instead of the list marker. Decorative: the item's text carries the meaning."},{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/List/ListItem.vue"]};const x={title:"Typography/List",component:o,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Bulleted or numbered list. `ordered` renders an `ol` (numbered), `unstyled` drops the marker and the indentation, `spacing` takes a spacing token for the gap between items, and a `ListItem` can replace its marker with an `icon` slot."}}},argTypes:{ordered:{control:"boolean"},marker:{control:"select",options:[void 0,"disc","circle","square","decimal","decimal-leading-zero","lower-alpha","upper-alpha","lower-roman","upper-roman","none"]},unstyled:{control:"boolean"},spacing:{control:"select",options:[void 0,"0","1","2","3","4"]}}},s={render:t=>({components:{List:o,ListItem:d},setup:()=>({args:t}),template:`
      <List v-bind="args">
        <ListItem>Framework-agnostic primitives</ListItem>
        <ListItem>One stylesheet for React and Vue</ListItem>
        <ListItem>Design tokens only</ListItem>
      </List>
    `})},r={args:{ordered:!0,marker:"lower-alpha",spacing:"2"},render:s.render},n={render:()=>({components:{List:o,ListItem:d},template:`
      <List unstyled spacing="2">
        <ListItem v-for="item in ['Install', 'Import the stylesheet', 'Ship']" :key="item">
          <template #icon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5" /></svg>
          </template>
          {{ item }}
        </ListItem>
      </List>
    `})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      List,
      ListItem
    },
    setup: () => ({
      args
    }),
    template: \`
      <List v-bind="args">
        <ListItem>Framework-agnostic primitives</ListItem>
        <ListItem>One stylesheet for React and Vue</ListItem>
        <ListItem>Design tokens only</ListItem>
      </List>
    \`
  })
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ordered: true,
    marker: "lower-alpha",
    spacing: "2"
  },
  render: Default.render
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      List,
      ListItem
    },
    template: \`
      <List unstyled spacing="2">
        <ListItem v-for="item in ['Install', 'Import the stylesheet', 'Ship']" :key="item">
          <template #icon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5" /></svg>
          </template>
          {{ item }}
        </ListItem>
      </List>
    \`
  })
}`,...n.parameters?.docs?.source}}};const C=["Default","Ordered","WithIcons"];export{s as Default,r as Ordered,n as WithIcons,C as __namedExportsOrder,x as default};
