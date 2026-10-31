import{G as I,H as R,e as E,r as C,o as h,a as T,f as $,j as D,k as j,m as S,N as k,O as _,b as z,w as A,l as V,c as d}from"./vue.esm-bundler-DkB1Q1v8.js";import{_ as N}from"./Switch-CCKfYEKM.js";import{_ as q}from"./Checkbox-BhuDFWJD.js";import{_ as K}from"./Input-B4Elzf_c.js";import{_ as P}from"./Button-Ds3ZQdvo.js";import{_ as L}from"./Text-HyJ-f5G3.js";import"./cn-CTdd_bgG.js";import"./useMachine-DL-Cf-96.js";import"./useId-jK020Zqe.js";import"./Label-DGQrqgZK.js";import"./icons-DSNlrOPV.js";import"./input-BiOxQ7f2.js";const y={colorMode:"system",colors:{primary:{50:"#f0f9ff",100:"#e0f2fe",200:"#bae6fd",300:"#7dd3fc",400:"#38bdf8",500:"#0ea5e9",600:"#0284c7",700:"#0369a1",800:"#075985",900:"#0c4a6e",950:"#082f49"},gray:{50:"#f9fafb",100:"#f3f4f6",200:"#e5e7eb",300:"#d1d5db",400:"#9ca3af",500:"#6b7280",600:"#4b5563",700:"#374151",800:"#1f2937",900:"#111827",950:"#030712"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a"},green:{50:"#f0fdf4",100:"#dcfce7",200:"#bbf7d0",300:"#86efac",400:"#4ade80",500:"#22c55e",600:"#16a34a",700:"#15803d",800:"#166534",900:"#14532d",950:"#052e16"},yellow:{50:"#fefce8",100:"#fef9c3",200:"#fef08a",300:"#fde047",400:"#facc15",500:"#eab308",600:"#ca8a04",700:"#a16207",800:"#854d0e",900:"#713f12",950:"#422006"}},fonts:{sans:'"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',serif:'Georgia, Cambria, "Times New Roman", Times, serif',mono:'"JetBrains Mono", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Menlo, Consolas, monospace'},fontSizes:{xs:"0.75rem",sm:"0.875rem",base:"1rem",lg:"1.125rem",xl:"1.25rem","2xl":"1.5rem","3xl":"1.875rem","4xl":"2.25rem","5xl":"3rem","6xl":"3.75rem","7xl":"4.5rem","8xl":"6rem","9xl":"8rem"},fontWeights:{thin:100,extralight:200,light:300,normal:400,medium:500,semibold:600,bold:700,extrabold:800,black:900},lineHeights:{none:1,tight:1.25,snug:1.375,normal:1.5,relaxed:1.625,loose:2},letterSpacings:{tighter:"-0.05em",tight:"-0.025em",normal:"0em",wide:"0.025em",wider:"0.05em",widest:"0.1em"},space:{0:"0px",px:"1px","0-5":"0.125rem",1:"0.25rem","1-5":"0.375rem",2:"0.5rem","2-5":"0.625rem",3:"0.75rem","3-5":"0.875rem",4:"1rem",5:"1.25rem",6:"1.5rem",7:"1.75rem",8:"2rem",9:"2.25rem",10:"2.5rem",11:"2.75rem",12:"3rem",14:"3.5rem",16:"4rem",20:"5rem",24:"6rem",28:"7rem",32:"8rem",36:"9rem",40:"10rem",44:"11rem",48:"12rem",52:"13rem",56:"14rem",60:"15rem",64:"16rem",72:"18rem",80:"20rem",96:"24rem"},radii:{none:"0px",sm:"0.125rem",base:"0.25rem",md:"0.375rem",lg:"0.5rem",xl:"0.75rem","2xl":"1rem","3xl":"1.5rem",full:"9999px"},shadows:{xs:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)",base:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",md:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",lg:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",xl:"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)","2xl":"0 25px 50px -12px rgba(0, 0, 0, 0.25)",inner:"inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",none:"none"}};function U(...t){const r={...y};return t.forEach(o=>{o&&Object.entries(o).forEach(([a,s])=>{const l=r[a];typeof s=="object"&&s!==null&&typeof l=="object"&&l!==null?r[a]={...l,...s}:s!==void 0&&(r[a]=s)})}),r}const F={colors:"color",fonts:"font-family",fontSizes:"font-size",fontWeights:"font-weight",lineHeights:"line-height",letterSpacings:"letter-spacing",space:"space",sizes:"dimension",radii:"radius",shadows:"shadow",zIndices:"z-index",breakpoints:"breakpoint"};function G(t,r="mild"){const o={};for(const[a,s]of Object.entries(F)){const l=t[a];if(l)for(const[p,i]of Object.entries(l))if(typeof i=="object"&&i!==null)for(const[u,c]of Object.entries(i))o[`--${r}-${s}-${p}-${u}`]=String(c);else o[`--${r}-${s}-${p}`]=String(i)}return o}function H(t){if(typeof document>"u")return()=>{};const r=document.documentElement;for(const[o,a]of Object.entries(t))r.style.setProperty(o,a);return()=>{for(const o of Object.keys(t))r.style.removeProperty(o)}}const Y="mild-ui-color-mode",W="data-theme",J="data-color-mode",Q=["light","dark","system"];function X(t){return typeof t=="string"&&Q.includes(t)}const O=Symbol("mild-ui:theme");function Z(t){R(O,t)}function ee(){const t=I(O,void 0);if(t===void 0)throw new Error("useColorMode must be used within a <ThemeProvider>");const{theme:r,...o}=t;return o}const oe="(prefers-color-scheme: dark)",M=E({__name:"ThemeProvider",props:{as:{default:void 0},theme:{default:void 0},defaultColorMode:{default:void 0},defaultTheme:{default:void 0},colorMode:{default:void 0},storageKey:{default:Y},cssVarPrefix:{default:"mild"}},emits:["update:colorMode","colorModeChange"],setup(t,{emit:r}){const o=t,a=r;function s(e){if(e===null||typeof window>"u")return null;try{const n=window.localStorage.getItem(e);return X(n)?n:null}catch{return null}}function l(e,n){if(!(e===null||typeof window>"u"))try{window.localStorage.setItem(e,n)}catch{}}const p=d(()=>o.theme?U(y,o.theme):y),i=d(()=>o.colorMode!==void 0),u=C(o.defaultColorMode??o.defaultTheme??"system");h(()=>{const e=s(o.storageKey);e&&(u.value=e)});const c=d(()=>i.value?o.colorMode:u.value),v=C("light");h(()=>{if(typeof window>"u"||typeof window.matchMedia!="function")return;const e=window.matchMedia(oe),n=()=>{v.value=e.matches?"dark":"light"};n(),e.addEventListener("change",n),T(()=>e.removeEventListener("change",n))});const m=d(()=>c.value==="system"?v.value:c.value);function w(e){i.value||(u.value=e),l(o.storageKey,e),a("update:colorMode",e),a("colorModeChange",e)}function B(){w(m.value==="dark"?"light":"dark")}h(()=>{z(()=>{const e=document.documentElement;e.setAttribute(W,m.value),e.setAttribute(J,c.value),e.style.colorScheme=m.value})});let x=null;h(()=>{A(()=>[o.theme,o.cssVarPrefix],([e,n])=>{x?.(),x=e?H(G(e,n)):null},{immediate:!0})}),T(()=>x?.());const b={theme:p,colorMode:c,resolvedColorMode:m,systemColorMode:d(()=>v.value),setColorMode:w,toggleColorMode:B,isDark:d(()=>m.value==="dark"),isLight:d(()=>m.value==="light"),isSystem:d(()=>c.value==="system")};return Z(b),(e,n)=>t.as?(V(),$(j(t.as),{key:0,class:"mild-theme-provider"},{default:D(()=>[S(e.$slots,"default",k(_(b)))]),_:3})):S(e.$slots,"default",k(_(b)),void 0,void 0,1)}});M.__docgenInfo={exportName:"default",displayName:"ThemeProvider",description:"",tags:{},props:[{name:"as",description:'Element to render around the content. By default the provider renders no element of its\nown (like the React one); give it `as="div"` to get a root that takes `class` and `style`.',required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"theme",description:"Overrides merged into the default theme and applied as `--mild-*` custom properties.",required:!1,type:{name:"Partial",elements:[{name:"ThemeConfig"}]},defaultValue:{func:!1,value:"undefined"}},{name:"defaultColorMode",description:'Initial mode when nothing is stored (uncontrolled). Defaults to `"system"`.',required:!1,type:{name:"ColorMode"},defaultValue:{func:!1,value:"undefined"}},{name:"defaultTheme",tags:{deprecated:[{description:"Use `defaultColorMode`.",title:"deprecated"}]},required:!1,type:{name:"ColorMode"},defaultValue:{func:!1,value:"undefined"}},{name:"colorMode",description:"Controlled mode (`v-model:colorMode`).",required:!1,type:{name:"ColorMode"},defaultValue:{func:!1,value:"undefined"}},{name:"storageKey",description:"`localStorage` key the mode is persisted under; `null` disables persistence.",required:!1,type:{name:"union",elements:[{name:"string"},{name:"null"}]},defaultValue:{func:!1,value:"DEFAULT_STORAGE_KEY"}},{name:"cssVarPrefix",description:"Prefix of the generated custom properties (`--<prefix>-color-...`).",required:!1,type:{name:"string"},defaultValue:{func:!1,value:'"mild"'}}],events:[{name:"update:colorMode",type:{names:["ColorMode"]},description:"`v-model:colorMode`"},{name:"colorModeChange",type:{names:["ColorMode"]}}],slots:[{name:"default",scoped:!0,bindings:[]}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/providers/ThemeProvider.vue"]};const te=E({name:"ModeSwitcher",components:{MildButton:P,MildText:L},setup(){return ee()},template:`
    <div class="flex items-center gap-3">
      <MildButton variant="outline" size="sm" @click="toggleColorMode">Toggle</MildButton>
      <MildButton variant="ghost" size="sm" @click="setColorMode('system')">System</MildButton>
      <MildText font-size="sm" color="muted">{{ colorMode }} → {{ resolvedColorMode }}</MildText>
    </div>
  `}),he={title:"Components/ThemeProvider",component:M,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Owns the color mode (light, dark or system), persists it, follows the OS live and writes it to `<html data-theme>`, which the core stylesheet keys on. `useTheme()` and `useColorMode()` read and change it; `theme` overrides become `--mild-*` custom properties."}}},argTypes:{defaultColorMode:{control:"radio",options:["light","dark","system"]},storageKey:{control:"text"},cssVarPrefix:{control:"text"}},args:{defaultColorMode:"system",storageKey:"storybook:mild-ui-color-mode"}},f={render:t=>({components:{ThemeProvider:M,ModeSwitcher:te,Button:P,Input:K,Checkbox:q,Switch:N},setup:()=>({args:t}),template:`
      <ThemeProvider v-bind="args">
        <div class="flex flex-col gap-4 w-80">
          <ModeSwitcher />
          <Input aria-label="Name" placeholder="Themed input" />
          <div class="flex gap-4">
            <Checkbox id="c" label="Checkbox" default-checked />
            <Switch id="s" label="Switch" default-checked />
          </div>
          <Button>Themed button</Button>
        </div>
      </ThemeProvider>
    `})},g={args:{defaultColorMode:"light",theme:{colors:{primary:{500:"#7c3aed",600:"#6d28d9",700:"#5b21b6"}}}},render:f.render};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      ThemeProvider,
      ModeSwitcher,
      Button,
      Input,
      Checkbox,
      Switch
    },
    setup: () => ({
      args
    }),
    template: \`
      <ThemeProvider v-bind="args">
        <div class="flex flex-col gap-4 w-80">
          <ModeSwitcher />
          <Input aria-label="Name" placeholder="Themed input" />
          <div class="flex gap-4">
            <Checkbox id="c" label="Checkbox" default-checked />
            <Switch id="s" label="Switch" default-checked />
          </div>
          <Button>Themed button</Button>
        </div>
      </ThemeProvider>
    \`
  })
}`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    defaultColorMode: "light",
    theme: {
      colors: {
        primary: {
          500: "#7c3aed",
          600: "#6d28d9",
          700: "#5b21b6"
        }
      }
    }
  },
  render: Default.render
}`,...g.parameters?.docs?.source}}};const ge=["Default","ThemeOverrides"];export{f as Default,g as ThemeOverrides,ge as __namedExportsOrder,he as default};
