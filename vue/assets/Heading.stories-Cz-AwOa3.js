import{e as c,f as u,j as m,v as g,k as p,c as i,l as f,m as v}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as h}from"./cn-CTdd_bgG.js";const a=c({__name:"Heading",props:{as:{default:void 0},level:{default:2},size:{default:void 0},weight:{default:"semibold"},align:{default:void 0},color:{default:void 0},truncate:{type:Boolean,default:!1}},setup(o){const e=o,s=i(()=>e.as??`h${e.level}`),d=i(()=>h("mild-heading",`mild-heading--level-${e.level}`,e.size&&`mild-heading--${e.size}`,`mild-heading--${e.weight}`,e.align&&`mild-heading--${e.align}`,e.color&&`mild-heading--${e.color}`,e.truncate&&"mild-heading--truncate"));return(r,H)=>(f(),u(p(s.value),{class:g(d.value)},{default:m(()=>[v(r.$slots,"default")]),_:3},8,["class"]))}});a.__docgenInfo={exportName:"default",displayName:"Heading",description:"",tags:{},props:[{name:"truncate",description:"Truncate to a single line with an ellipsis.",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"color",description:"Semantic color painted by `.mild-heading--<color>`.",required:!1,type:{name:"TextColor"},defaultValue:{func:!1,value:"undefined"}},{name:"align",description:"Text alignment; inherited when not set.",required:!1,type:{name:"TextAlign"},defaultValue:{func:!1,value:"undefined"}},{name:"weight",description:'Font weight. Default `"semibold"`.',required:!1,type:{name:"FontWeight"},defaultValue:{func:!1,value:'"semibold"'}},{name:"size",description:"Font size; defaults to the size of the `level`.",required:!1,type:{name:"FontSize"},defaultValue:{func:!1,value:"undefined"}},{name:"level",description:"Heading level; also the rendered element unless `as` says otherwise. Default `2`.",required:!1,type:{name:"HeadingLevel"},defaultValue:{func:!1,value:"2"}},{name:"as",description:"Element to render instead of `h<level>` (`div` for a heading-looking label).",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Heading/Heading.vue"]};const z={title:"Typography/Heading",component:a,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Section heading. `level` picks both the element (`h1`..`h6`) and the default size, so the document outline and the visual size can be chosen independently (`:level="1" size="xl"`, or `as="div"` for a heading-looking label).'}}},argTypes:{level:{control:"select",options:[1,2,3,4,5,6]},size:{control:"select",options:[void 0,"xs","sm","md","lg","xl","2xl","3xl","4xl"]},weight:{control:"select",options:["normal","medium","semibold","bold","extrabold"]},align:{control:"select",options:[void 0,"left","center","right"]},color:{control:"select",options:[void 0,"primary","secondary","success","warning","danger","muted"]},truncate:{control:"boolean"},as:{control:"text"}},args:{level:2}},n={render:o=>({components:{Heading:a},setup:()=>({args:o}),template:'<Heading v-bind="args">The quick brown fox</Heading>'})},l={render:()=>({components:{Heading:a},template:`
      <div class="flex flex-col gap-2">
        <Heading v-for="level in [1, 2, 3, 4, 5, 6]" :key="level" :level="level">Heading level {{ level }}</Heading>
      </div>
    `})},t={render:()=>({components:{Heading:a},template:`
      <div class="flex flex-col gap-2">
        <Heading :level="1" size="lg">An h1 that looks small</Heading>
        <Heading :level="4" size="3xl" color="primary">An h4 that looks large</Heading>
        <Heading as="div" :level="3">Not a heading in the outline</Heading>
      </div>
    `})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Heading
    },
    setup: () => ({
      args
    }),
    template: '<Heading v-bind="args">The quick brown fox</Heading>'
  })
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Heading
    },
    template: \`
      <div class="flex flex-col gap-2">
        <Heading v-for="level in [1, 2, 3, 4, 5, 6]" :key="level" :level="level">Heading level {{ level }}</Heading>
      </div>
    \`
  })
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Heading
    },
    template: \`
      <div class="flex flex-col gap-2">
        <Heading :level="1" size="lg">An h1 that looks small</Heading>
        <Heading :level="4" size="3xl" color="primary">An h4 that looks large</Heading>
        <Heading as="div" :level="3">Not a heading in the outline</Heading>
      </div>
    \`
  })
}`,...t.parameters?.docs?.source}}};const b=["Default","Levels","SizeIndependentOfLevel"];export{n as Default,l as Levels,t as SizeIndependentOfLevel,b as __namedExportsOrder,z as default};
