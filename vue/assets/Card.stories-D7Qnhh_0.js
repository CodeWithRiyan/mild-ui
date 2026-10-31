import{_ as w}from"./Text-HyJ-f5G3.js";import{_ as V}from"./Badge-BR2nYQqz.js";import{_ as q}from"./Button-Ds3ZQdvo.js";import{G as F,c as t,H as N,e as o,f as B,j as b,v as i,k as D,l as s,m as l,x as u}from"./vue.esm-bundler-DkB1Q1v8.js";import{c}from"./cn-CTdd_bgG.js";import{_ as z}from"./_plugin-vue_export-helper-DlAUqK2U.js";const T=Symbol("mild-ui:card");function M(e){N(T,e)}function C(e){const a=F(T,null);return t(()=>e()??a?.padding.value??"md")}function v(e,a){return a!=="md"&&`${e}--padding-${a}`}const f=o({__name:"Card",props:{as:{default:"div"},variant:{default:"default"},padding:{default:"md"},interactive:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},setup(e){const a=e;M({padding:t(()=>a.padding)});const d=t(()=>c("mild-card",`mild-card--${a.variant}`,a.interactive&&"mild-card--interactive",a.disabled&&"mild-card--disabled"));return(r,n)=>(s(),B(D(e.as),{class:i(d.value),"data-disabled":e.disabled?"":void 0},{default:b(()=>[l(r.$slots,"default")]),_:3},8,["class","data-disabled"]))}});f.__docgenInfo={exportName:"default",displayName:"Card",description:"",tags:{},props:[{name:"as",description:"Element to render. Defaults to `div`.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"div"'}},{name:"variant",required:!1,type:{name:"CardVariant"},defaultValue:{func:!1,value:'"default"'}},{name:"padding",description:'Padding of the parts (header, body, footer). Default `"md"`.',required:!1,type:{name:"CardPadding"},defaultValue:{func:!1,value:'"md"'}},{name:"interactive",description:"Hover/active affordance for clickable cards.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Card/Card.vue"]};const g=o({__name:"CardHeader",props:{noBorder:{type:Boolean,default:!1},padding:{default:void 0}},setup(e){const a=e,d=C(()=>a.padding),r=t(()=>c("mild-card-header",v("mild-card-header",d.value),a.noBorder&&"mild-card-header--no-border"));return(n,y)=>(s(),u("div",{class:i(r.value)},[l(n.$slots,"default")],2))}});g.__docgenInfo={exportName:"default",displayName:"CardHeader",description:"",tags:{},props:[{name:"padding",description:"Overrides the card's padding for this part.",required:!1,type:{name:"CardPadding"},defaultValue:{func:!1,value:"undefined"}},{name:"noBorder",description:"Drop the divider under the header.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Card/CardHeader.vue"]};const _=o({__name:"CardTitle",props:{as:{default:"h3"},size:{default:"md"}},setup(e){const a=e,d=t(()=>c("mild-card-title",a.size!=="md"&&`mild-card-title--${a.size}`));return(r,n)=>(s(),B(D(e.as),{class:i(d.value)},{default:b(()=>[l(r.$slots,"default")]),_:3},8,["class"]))}});_.__docgenInfo={exportName:"default",displayName:"CardTitle",description:"",tags:{},props:[{name:"as",description:"Element to render. Defaults to `h3`.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"h3"'}},{name:"size",required:!1,type:{name:"union",elements:[{name:'"sm"'},{name:'"md"'},{name:'"lg"'},{name:'"2xl"'}]},defaultValue:{func:!1,value:'"md"'}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Card/CardTitle.vue"]};const $={},O={class:"mild-card-description"};function P(e,a){return s(),u("p",O,[l(e.$slots,"default")])}const k=z($,[["render",P]]);$.__docgenInfo={displayName:"CardDescription",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Card/CardDescription.vue"]};const h=o({__name:"CardBody",props:{padding:{default:void 0}},setup(e){const a=e,d=C(()=>a.padding),r=t(()=>c("mild-card-content",v("mild-card-content",d.value)));return(n,y)=>(s(),u("div",{class:i(r.value)},[l(n.$slots,"default")],2))}});h.__docgenInfo={exportName:"default",displayName:"CardBody",description:"",tags:{},props:[{name:"padding",description:"Overrides the card's padding for this part.",required:!1,type:{name:"CardPadding"},defaultValue:{func:!1,value:"undefined"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Card/CardBody.vue"]};const H=o({__name:"CardFooter",props:{align:{default:void 0},noBorder:{type:Boolean,default:!1},padding:{default:void 0}},setup(e){const a=e,d=C(()=>a.padding),r=t(()=>c("mild-card-footer",v("mild-card-footer",d.value),a.align&&`mild-card-footer--${a.align}`,a.noBorder&&"mild-card-footer--no-border"));return(n,y)=>(s(),u("div",{class:i(r.value)},[l(n.$slots,"default")],2))}});H.__docgenInfo={exportName:"default",displayName:"CardFooter",description:"",tags:{},props:[{name:"padding",description:"Overrides the card's padding for this part.",required:!1,type:{name:"CardPadding"},defaultValue:{func:!1,value:"undefined"}},{name:"align",description:"Horizontal alignment of the actions.",required:!1,type:{name:"union",elements:[{name:'"start"'},{name:'"center"'},{name:'"end"'},{name:'"between"'}]},defaultValue:{func:!1,value:"undefined"}},{name:"noBorder",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Card/CardFooter.vue"]};const I=["src","alt"],x=o({__name:"CardMedia",props:{src:{default:void 0},alt:{default:""},position:{default:"top"},fit:{default:"cover"}},setup(e){const a=e,d=t(()=>c("mild-card-media",`mild-card-media--rounded-${a.position}`,`mild-card-media--${a.fit}`));return(r,n)=>(s(),u("img",{src:e.src,alt:e.alt,class:i(d.value)},null,10,I))}});x.__docgenInfo={exportName:"default",displayName:"CardMedia",description:"",tags:{},props:[{name:"src",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"alt",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'""'}},{name:"position",description:"Round the corners that touch the card's edge.",required:!1,type:{name:"union",elements:[{name:'"top"'},{name:'"bottom"'}]},defaultValue:{func:!1,value:'"top"'}},{name:"fit",required:!1,type:{name:"union",elements:[{name:'"cover"'},{name:'"contain"'}]},defaultValue:{func:!1,value:'"cover"'}}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Card/CardMedia.vue"]};const R={title:"Data Display/Card",component:f,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Surface grouping related content. Compose with `CardHeader` (+ `CardTitle`, `CardDescription`), `CardBody`, `CardFooter` and `CardMedia`. Renders a `div`, or the element given with `as`."}}},argTypes:{variant:{control:"select",options:["default","outlined","elevated","filled"]},padding:{control:"select",options:["none","sm","md","lg"]},interactive:{control:"boolean"},disabled:{control:"boolean"},as:{control:"text"}}},m={render:e=>({components:{Card:f,CardHeader:g,CardTitle:_,CardDescription:k,CardBody:h,CardFooter:H,Button:q,Badge:V,Text:w},setup:()=>({args:e}),template:`
      <Card v-bind="args" class="w-80">
        <CardHeader>
          <CardTitle>Project Apollo</CardTitle>
          <CardDescription>Design system rollout, Q3.</CardDescription>
        </CardHeader>
        <CardBody>
          <Text as="p">12 components shipped, 7 in review.</Text>
        </CardBody>
        <CardFooter align="between">
          <Badge color-scheme="success" dot>On track</Badge>
          <Button size="sm">Open</Button>
        </CardFooter>
      </Card>
    `})},p={render:()=>({components:{Card:f,CardMedia:x,CardHeader:g,CardTitle:_,CardDescription:k,CardBody:h},template:`
      <Card variant="elevated" interactive as="article" class="w-80">
        <CardMedia src="https://picsum.photos/seed/mild/640/360" alt="" />
        <CardHeader>
          <CardTitle as="h2" size="lg">Elevated card</CardTitle>
          <CardDescription>With a media image on top.</CardDescription>
        </CardHeader>
        <CardBody>Hover to see the interactive affordance.</CardBody>
      </Card>
    `})};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Card,
      CardHeader,
      CardTitle,
      CardDescription,
      CardBody,
      CardFooter,
      Button,
      Badge,
      Text
    },
    setup: () => ({
      args
    }),
    template: \`
      <Card v-bind="args" class="w-80">
        <CardHeader>
          <CardTitle>Project Apollo</CardTitle>
          <CardDescription>Design system rollout, Q3.</CardDescription>
        </CardHeader>
        <CardBody>
          <Text as="p">12 components shipped, 7 in review.</Text>
        </CardBody>
        <CardFooter align="between">
          <Badge color-scheme="success" dot>On track</Badge>
          <Button size="sm">Open</Button>
        </CardFooter>
      </Card>
    \`
  })
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Card,
      CardMedia,
      CardHeader,
      CardTitle,
      CardDescription,
      CardBody
    },
    template: \`
      <Card variant="elevated" interactive as="article" class="w-80">
        <CardMedia src="https://picsum.photos/seed/mild/640/360" alt="" />
        <CardHeader>
          <CardTitle as="h2" size="lg">Elevated card</CardTitle>
          <CardDescription>With a media image on top.</CardDescription>
        </CardHeader>
        <CardBody>Hover to see the interactive affordance.</CardBody>
      </Card>
    \`
  })
}`,...p.parameters?.docs?.source}}};const G=["Default","WithMedia"];export{m as Default,p as WithMedia,G as __namedExportsOrder,R as default};
