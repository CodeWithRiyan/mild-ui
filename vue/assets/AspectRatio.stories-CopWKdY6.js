import{_ as a}from"./AspectRatio.vue_vue_type_script_setup_true_lang-Gi4EfbJm.js";import"./vue.esm-bundler-DkB1Q1v8.js";a.__docgenInfo={exportName:"default",displayName:"AspectRatio",description:"",tags:{},props:[{name:"ratio",description:"Width / height. Default `1`.",required:!1,type:{name:"AspectRatioValue"},defaultValue:{func:!1,value:"1"}},{name:"as",description:"Element to render. Defaults to `div`.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"div"'}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/AspectRatio/AspectRatio.vue"]};const s={title:"Layout/AspectRatio",component:a,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Keeps its child at a fixed width/height ratio (`:ratio="16 / 9"` or `ratio="16/9"`); the child fills the box. Renders a `div`, or the element given with `as`.'}}},argTypes:{as:{control:"text"},ratio:{control:"text"}},args:{ratio:"16/9"}},e={render:r=>({components:{AspectRatio:a},setup:()=>({args:r}),template:`
      <div style="width: 20rem">
        <AspectRatio v-bind="args">
          <div style="display: grid; place-items: center; background: var(--mild-color-primary-500); color: white; border-radius: var(--mild-radius-md)">{{ args.ratio }}</div>
        </AspectRatio>
      </div>
    `})},t={render:()=>({components:{AspectRatio:a},template:`
      <div style="display: flex; gap: 1rem; align-items: flex-start">
        <div v-for="ratio in ['1/1', '4/3', '16/9', '21/9']" :key="ratio" style="width: 10rem">
          <AspectRatio :ratio="ratio">
            <div style="display: grid; place-items: center; background: var(--mild-color-gray-200); border-radius: var(--mild-radius-md)">{{ ratio }}</div>
          </AspectRatio>
        </div>
      </div>
    `})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      AspectRatio
    },
    setup: () => ({
      args
    }),
    template: \`
      <div style="width: 20rem">
        <AspectRatio v-bind="args">
          <div style="display: grid; place-items: center; background: var(--mild-color-primary-500); color: white; border-radius: var(--mild-radius-md)">{{ args.ratio }}</div>
        </AspectRatio>
      </div>
    \`
  })
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      AspectRatio
    },
    template: \`
      <div style="display: flex; gap: 1rem; align-items: flex-start">
        <div v-for="ratio in ['1/1', '4/3', '16/9', '21/9']" :key="ratio" style="width: 10rem">
          <AspectRatio :ratio="ratio">
            <div style="display: grid; place-items: center; background: var(--mild-color-gray-200); border-radius: var(--mild-radius-md)">{{ ratio }}</div>
          </AspectRatio>
        </div>
      </div>
    \`
  })
}`,...t.parameters?.docs?.source}}};const d=["Default","Ratios"];export{e as Default,t as Ratios,d as __namedExportsOrder,s as default};
