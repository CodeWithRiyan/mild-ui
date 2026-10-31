import{_ as E}from"./Button-Ds3ZQdvo.js";import{e as S,h as D,L,z as I,r as y,c as A,i as k,J as _,M as O,T as V}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as N}from"./cn-CTdd_bgG.js";import{u as x}from"./useMachine-DL-Cf-96.js";import{u as R}from"./useId-jK020Zqe.js";import{S as $}from"./search-DZdW-qH5.js";import{_ as C}from"./IconButton-4mzys15T.js";import"./createLucideIcon-BrUh2xVA.js";let P=0;function M(o){const{trigger:e,tooltip:l,openDelay:u=300,closeDelay:n=100,onOpenChange:c}=o;let i=!1,s=null;l.id||(l.id=`mild-tooltip-${++P}`),l.setAttribute("role","tooltip");const p=(e.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);p.includes(l.id)||e.setAttribute("aria-describedby",[...p,l.id].join(" "));function t(){s!==null&&clearTimeout(s),s=null}function r(a){t(),a!==i&&(i=a,c?.(i))}function g(a,w){if(t(),a!==i){if(w<=0){r(a);return}s=setTimeout(()=>{s=null,r(a)},w)}}const d=()=>g(!0,u),m=()=>g(!1,n),T=()=>r(!0),v=()=>r(!1);function B(a){a.key!=="Escape"||!i||(a.preventDefault(),v())}return e.addEventListener("mouseenter",d),e.addEventListener("mouseleave",m),e.addEventListener("focus",T),e.addEventListener("blur",v),l.addEventListener("mouseenter",d),l.addEventListener("mouseleave",m),document.addEventListener("keydown",B),{trigger:e,tooltip:l,isOpen:()=>i,setOpen:a=>{t(),i=a},destroy:()=>{t(),e.removeEventListener("mouseenter",d),e.removeEventListener("mouseleave",m),e.removeEventListener("focus",T),e.removeEventListener("blur",v),l.removeEventListener("mouseenter",d),l.removeEventListener("mouseleave",m),document.removeEventListener("keydown",B)}}}function z(o){const e=[],l=u=>{for(const n of u)k(n)&&(n.type===_&&Array.isArray(n.children)?l(n.children):n.type!==O&&!(n.type===V&&!String(n.children).trim())&&e.push(n))};if(l(o),e.length!==1)throw new Error("<Tooltip> expects exactly one child element");return e[0]}const h=S({name:"Tooltip",inheritAttrs:!1,props:{label:{type:String,default:void 0},placement:{type:String,default:"top"},openDelay:{type:Number,default:300},closeDelay:{type:Number,default:100},disabled:{type:Boolean,default:!1},multiline:{type:Boolean,default:!1},id:{type:String,default:void 0}},setup(o,{slots:e,attrs:l}){const u=o.id??`${R()}-tooltip`,n=y(!1),c=y(null),i=y(null);x(i,(t,r)=>M({trigger:c.value??t,tooltip:t,...r}),()=>({openDelay:o.openDelay,closeDelay:o.closeDelay,onOpenChange:t=>{n.value=t}}),t=>{t.isOpen()!==n.value&&t.setOpen(n.value)},()=>[o.openDelay,o.closeDelay]);function s(t){const r=t instanceof Element?t:t?.$el??null;c.value=r instanceof HTMLElement?r:null}const p=A(()=>N("mild-tooltip",`mild-tooltip--${o.placement}`,o.multiline&&"mild-tooltip--multiline"));return()=>{const t=z(e.default?.()??[]);return o.disabled?t:D("span",{class:"mild-tooltip-anchor"},[L(t,{ref:s},!0),D("span",I({ref:i,id:u,role:"tooltip",hidden:!n.value,"data-state":n.value?"open":"closed","data-placement":o.placement,class:p.value},l),e.label?e.label():o.label)])}}});h.__docgenInfo={displayName:"Tooltip",description:`Describes its child with a small bubble (\`role="tooltip"\`, linked through
\`aria-describedby\`). Shows on hover after a delay and on keyboard focus at once; hides on
leave, blur or Escape. The bubble stays in the DOM so the description is always available.

A render function rather than a template: the trigger is the slot's single child, cloned
with a ref so the primitive can be bound to it.`,tags:{},exportName:"default",props:[{name:"label",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"placement",type:{name:"TooltipPlacement"},defaultValue:{func:!1,value:'"top"'}},{name:"openDelay",type:{name:"number"},defaultValue:{func:!1,value:"300"}},{name:"closeDelay",type:{name:"number"},defaultValue:{func:!1,value:"100"}},{name:"disabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"multiline",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"id",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Tooltip/Tooltip.vue"]};const Q={title:"Overlay/Tooltip",component:h,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'Describes its child with a small bubble (`role="tooltip"`, linked through `aria-describedby`). Shows on hover after a delay and on keyboard focus at once; hides on leave, blur or Escape. Behaviour from `@mild-ui/primitives/tooltip`, per the [WAI-ARIA APG tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/); keyboard tests: `packages/vue/src/components/Tooltip/Tooltip.test.ts`.'}}},argTypes:{label:{control:"text"},placement:{control:"select",options:["top","bottom","left","right"]},openDelay:{control:"number"},closeDelay:{control:"number"},multiline:{control:"boolean"},disabled:{control:"boolean"}},args:{label:"Save your changes"}},f={render:o=>({components:{Tooltip:h,Button:E},setup:()=>({args:o}),template:'<Tooltip v-bind="args"><Button>Save</Button></Tooltip>'})},b={render:()=>({components:{Tooltip:h,Button:E,IconButton:C,SearchIcon:$},template:`
      <div class="flex items-center gap-6 p-12">
        <Tooltip label="Top" placement="top"><Button variant="outline">Top</Button></Tooltip>
        <Tooltip label="Bottom" placement="bottom"><Button variant="outline">Bottom</Button></Tooltip>
        <Tooltip label="Left" placement="left"><Button variant="outline">Left</Button></Tooltip>
        <Tooltip label="Right" placement="right"><Button variant="outline">Right</Button></Tooltip>
        <Tooltip label="Search the docs" multiline>
          <IconButton label="Search" variant="ghost"><SearchIcon :size="16" /></IconButton>
        </Tooltip>
      </div>
    `})};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Tooltip,
      Button
    },
    setup: () => ({
      args
    }),
    template: '<Tooltip v-bind="args"><Button>Save</Button></Tooltip>'
  })
}`,...f.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Tooltip,
      Button,
      IconButton,
      SearchIcon
    },
    template: \`
      <div class="flex items-center gap-6 p-12">
        <Tooltip label="Top" placement="top"><Button variant="outline">Top</Button></Tooltip>
        <Tooltip label="Bottom" placement="bottom"><Button variant="outline">Bottom</Button></Tooltip>
        <Tooltip label="Left" placement="left"><Button variant="outline">Left</Button></Tooltip>
        <Tooltip label="Right" placement="right"><Button variant="outline">Right</Button></Tooltip>
        <Tooltip label="Search the docs" multiline>
          <IconButton label="Search" variant="ghost"><SearchIcon :size="16" /></IconButton>
        </Tooltip>
      </div>
    \`
  })
}`,...b.parameters?.docs?.source}}};const U=["Default","Placements"];export{f as Default,b as Placements,U as __namedExportsOrder,Q as default};
