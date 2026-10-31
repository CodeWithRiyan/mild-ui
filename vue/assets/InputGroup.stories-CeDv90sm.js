import{p as G,_ as g}from"./Input-B4Elzf_c.js";import{e as o,x as b,m as u,v as y,l as r,f as m,j as c,h as L,i as k,J as F,c as s}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as R}from"./cn-CTdd_bgG.js";import{S as w}from"./search-DZdW-qH5.js";import{e as S}from"./FormField-CXjXHiLM.js";import"./input-BiOxQ7f2.js";import"./createLucideIcon-BrUh2xVA.js";import"./useId-jK020Zqe.js";import"./Label-DGQrqgZK.js";import"./useMachine-DL-Cf-96.js";const $=["data-placement"],f=o({__name:"InputAddon",props:{placement:{default:"left"}},setup(e){return(t,n)=>(r(),b("div",{class:y(["mild-input-addon",`mild-input-addon--${e.placement}`]),"data-placement":e.placement},[u(t.$slots,"default")],10,$))}});f.__docgenInfo={exportName:"default",displayName:"InputAddon",description:"",tags:{},props:[{name:"placement",required:!1,type:{name:"InputGroupPlacement"},defaultValue:{func:!1,value:'"left"'}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/InputGroup/InputAddon.vue"]};const x=["data-placement"],h=o({__name:"InputElement",props:{placement:{default:"left"},interactive:{type:Boolean,default:!1}},setup(e){return(t,n)=>(r(),b("div",{class:y(["mild-input-element",`mild-input-element--${e.placement}`,e.interactive&&"mild-input-element--interactive"]),"data-placement":e.placement},[u(t.$slots,"default")],10,x))}});h.__docgenInfo={exportName:"default",displayName:"InputElement",description:"",tags:{},props:[{name:"placement",required:!1,type:{name:"InputGroupPlacement"},defaultValue:{func:!1,value:'"left"'}},{name:"interactive",description:`The element receives pointer events (a button, a clear icon). By default it is decorative
and clicks fall through to the field.`,required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/InputGroup/InputElement.vue"]};const I=o({__name:"InputLeftAddon",setup(e){return(t,n)=>(r(),m(f,{placement:"left"},{default:c(()=>[u(t.$slots,"default")]),_:3}))}});I.__docgenInfo={exportName:"default",displayName:"InputLeftAddon",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/InputGroup/InputLeftAddon.vue"]};const v=o({__name:"InputRightAddon",setup(e){return(t,n)=>(r(),m(f,{placement:"right"},{default:c(()=>[u(t.$slots,"default")]),_:3}))}});v.__docgenInfo={exportName:"default",displayName:"InputRightAddon",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/InputGroup/InputRightAddon.vue"]};const _=o({__name:"InputLeftElement",props:{interactive:{type:Boolean,default:!1}},setup(e){return(t,n)=>(r(),m(h,{placement:"left",interactive:e.interactive},{default:c(()=>[u(t.$slots,"default")]),_:3},8,["interactive"]))}});_.__docgenInfo={exportName:"default",displayName:"InputLeftElement",description:"",tags:{},props:[{name:"interactive",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/InputGroup/InputLeftElement.vue"]};const A=o({__name:"InputRightElement",props:{interactive:{type:Boolean,default:!1}},setup(e){return(t,n)=>(r(),m(h,{placement:"right",interactive:e.interactive},{default:c(()=>[u(t.$slots,"default")]),_:3},8,["interactive"]))}});A.__docgenInfo={exportName:"default",displayName:"InputRightElement",description:"",tags:{},props:[{name:"interactive",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/InputGroup/InputRightElement.vue"]};function E(e){const t=[];for(const n of e)k(n)&&(n.type===F&&Array.isArray(n.children)?t.push(...E(n.children)):t.push(n));return t}function N(e){const t={leftAddon:!1,rightAddon:!1,leftElement:!1,rightElement:!1};for(const n of e){const a=n.props?.placement??"left";switch(n.type){case I:t.leftAddon=!0;break;case v:t.rightAddon=!0;break;case f:t[a==="left"?"leftAddon":"rightAddon"]=!0;break;case _:t.leftElement=!0;break;case A:t.rightElement=!0;break;case h:t[a==="left"?"leftElement":"rightElement"]=!0;break}}return t}const l=o({name:"InputGroup",props:{size:{type:String,default:"md"},inline:{type:Boolean,default:!1},id:{type:String,default:void 0},name:{type:String,default:void 0},required:{type:Boolean,default:void 0}},setup(e,{slots:t}){return G({size:s(()=>e.size),id:s(()=>e.id),name:s(()=>e.name),required:s(()=>e.required)}),()=>{const n=E(t.default?.()??[]),a=N(n);return L("div",{class:R("mild-input-group",`mild-input-group--${e.size}`,e.inline&&"mild-input-group--inline",a.leftAddon&&"mild-input-group--has-left-addon",a.rightAddon&&"mild-input-group--has-right-addon",a.leftElement&&"mild-input-group--has-left-element",a.rightElement&&"mild-input-group--has-right-element")},n)}}});l.__docgenInfo={displayName:"InputGroup",description:'Wraps an `Input` with addons (`InputLeftAddon` / `InputRightAddon`: flush blocks outside the\nfield, e.g. "https://") and elements (`InputLeftElement` / `InputRightElement`: icons or\nbuttons inside it). The group shares its `size` with the input and makes room for the parts.\nInside a `FormField` the field wiring (`id`, `name`, `required`) passes through to the input.\n\nA render function rather than a template: which sides carry a part is read from the slot\'s\nvnodes on every render.',tags:{},exportName:"default",props:[{name:"size",type:{name:"InputGroupSize"},defaultValue:{func:!1,value:'"md"'}},{name:"inline",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"id",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"name",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"required",type:{name:"boolean"},defaultValue:{func:!1,value:"undefined"}}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/InputGroup/InputGroup.vue"]};const J={title:"Components/InputGroup",component:l,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Wraps an `Input` with addons (`InputLeftAddon` / `InputRightAddon`: flush blocks outside the field, e.g. "https://") and elements (`InputLeftElement` / `InputRightElement`: icons or buttons inside it). The group shares its `size` with the input and makes room for the parts. Inside a `FormField` the field wiring passes through to the input.'}}},argTypes:{size:{control:"radio",options:["sm","md","lg"]},inline:{control:"boolean"}},args:{size:"md"}},i={render:e=>({components:{InputGroup:l,InputLeftAddon:I,InputRightAddon:v,Input:g},setup:()=>({args:e}),template:`
      <div class="w-80">
        <InputGroup v-bind="args">
          <InputLeftAddon>https://</InputLeftAddon>
          <Input aria-label="Site" placeholder="example" />
          <InputRightAddon>.com</InputRightAddon>
        </InputGroup>
      </div>
    `})},p={render:e=>({components:{InputGroup:l,InputLeftElement:_,InputRightElement:A,Input:g,SearchIcon:w},setup:()=>({args:e}),template:`
      <div class="w-80">
        <InputGroup v-bind="args">
          <InputLeftElement><SearchIcon :size="16" /></InputLeftElement>
          <Input aria-label="Search" placeholder="Search" />
          <InputRightElement interactive>
            <button type="button" class="mild-button mild-button--ghost mild-button--primary mild-button--xs">Clear</button>
          </InputRightElement>
        </InputGroup>
      </div>
    `})},d={render:()=>({components:{FormField:S,InputGroup:l,InputLeftAddon:I,Input:g},template:`
      <div class="w-80">
        <FormField name="site" label="Website" description="Public URL" required>
          <InputGroup>
            <InputLeftAddon>https://</InputLeftAddon>
            <Input placeholder="example.com" />
          </InputGroup>
        </FormField>
      </div>
    `})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      InputGroup,
      InputLeftAddon,
      InputRightAddon,
      Input
    },
    setup: () => ({
      args
    }),
    template: \`
      <div class="w-80">
        <InputGroup v-bind="args">
          <InputLeftAddon>https://</InputLeftAddon>
          <Input aria-label="Site" placeholder="example" />
          <InputRightAddon>.com</InputRightAddon>
        </InputGroup>
      </div>
    \`
  })
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      InputGroup,
      InputLeftElement,
      InputRightElement,
      Input,
      SearchIcon
    },
    setup: () => ({
      args
    }),
    template: \`
      <div class="w-80">
        <InputGroup v-bind="args">
          <InputLeftElement><SearchIcon :size="16" /></InputLeftElement>
          <Input aria-label="Search" placeholder="Search" />
          <InputRightElement interactive>
            <button type="button" class="mild-button mild-button--ghost mild-button--primary mild-button--xs">Clear</button>
          </InputRightElement>
        </InputGroup>
      </div>
    \`
  })
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      FormField,
      InputGroup,
      InputLeftAddon,
      Input
    },
    template: \`
      <div class="w-80">
        <FormField name="site" label="Website" description="Public URL" required>
          <InputGroup>
            <InputLeftAddon>https://</InputLeftAddon>
            <Input placeholder="example.com" />
          </InputGroup>
        </FormField>
      </div>
    \`
  })
}`,...d.parameters?.docs?.source}}};const O=["Addons","Elements","InAField"];export{i as Addons,p as Elements,d as InAField,O as __namedExportsOrder,J as default};
