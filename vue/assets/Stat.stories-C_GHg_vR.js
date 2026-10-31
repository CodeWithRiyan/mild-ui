import{e as y,E as w,x as i,C as r,m as t,v as f,A as m,f as v,D as l,y as S,c as h,l as a,F as o}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as g}from"./cn-CTdd_bgG.js";import{A as k,b as V}from"./icons-DSNlrOPV.js";const G={class:"mild-stat__label"},T={class:"mild-stat__value"},$={key:0,class:"mild-stat__help"},z=["data-trend"],D={class:"mild-stat__trend-text"},N={class:"mild-stat__sr-only"},c=y({__name:"Stat",props:{label:{default:void 0},value:{default:void 0},helpText:{default:void 0},trend:{default:void 0},trendValue:{default:void 0},size:{default:"md"}},setup(e){const s=e,p=w(),b=h(()=>g("mild-stat",`mild-stat--${s.size}`)),x=h(()=>s.helpText!==void 0||s.trend!==void 0||!!p.helpText);return(n,C)=>(a(),i("div",{class:f(b.value)},[r("span",G,[t(n.$slots,"label",{},()=>[o(l(e.label),1)])]),r("span",T,[t(n.$slots,"value",{},()=>[o(l(e.value),1)])]),x.value?(a(),i("span",$,[e.trend?(a(),i("span",{key:0,class:f(m(g)("mild-stat__trend",`mild-stat__trend--${e.trend}`)),"data-trend":e.trend},[e.trend==="increase"?(a(),v(m(k),{key:0})):(a(),v(m(V),{key:1})),r("span",D,[r("span",N,l(e.trend==="increase"?"increased by ":"decreased by "),1),t(n.$slots,"trendValue",{},()=>[o(l(e.trendValue),1)])])],10,z)):S("",!0),t(n.$slots,"helpText",{},()=>[o(l(e.helpText),1)])])):S("",!0),t(n.$slots,"default")],2))}});c.__docgenInfo={exportName:"default",displayName:"Stat",description:"",tags:{},props:[{name:"label",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"value",required:!1,type:{name:"union",elements:[{name:"string"},{name:"number"}]},defaultValue:{func:!1,value:"undefined"}},{name:"helpText",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"trend",description:"Direction of the change, shown as an arrow and announced in words.",required:!1,type:{name:"StatTrend"},defaultValue:{func:!1,value:"undefined"}},{name:"trendValue",description:'The change itself, e.g. "12%".',required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"size",required:!1,type:{name:"StatSize"},defaultValue:{func:!1,value:'"md"'}}],slots:[{name:"label"},{name:"value"},{name:"trendValue"},{name:"helpText"},{name:"default",description:"Extra content under the value (a sparkline, an action)."}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Stat/Stat.vue"]};const q={class:"mild-stat-group"},_=y({__name:"StatGroup",setup(e){return(s,p)=>(a(),i("div",q,[t(s.$slots,"default")]))}});_.__docgenInfo={exportName:"default",displayName:"StatGroup",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Stat/StatGroup.vue"]};const E={title:"Data Display/Stat",component:c,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'A key figure with its label and an optional trend. The trend arrow is decorative; its direction is announced in words ("increased by 12%"). `StatGroup` lays stats out in a row.'}}},argTypes:{label:{control:"text"},value:{control:"text"},helpText:{control:"text"},trend:{control:"select",options:[void 0,"increase","decrease"]},trendValue:{control:"text"},size:{control:"radio",options:["sm","md","lg"]}},args:{label:"Revenue",value:"$12,400",helpText:"Last 30 days",trend:"increase",trendValue:"12%"}},d={render:e=>({components:{Stat:c},setup:()=>({args:e}),template:'<Stat v-bind="args" />'})},u={name:"StatGroup",render:()=>({components:{Stat:c,StatGroup:_},template:`
      <StatGroup class="w-[36rem]">
        <Stat label="Users" value="1,204" trend="increase" trend-value="12%" help-text="vs last week" />
        <Stat label="Churn" value="2.1%" trend="decrease" trend-value="0.4%" help-text="vs last week" />
        <Stat label="Uptime" value="99.98%" size="lg" />
      </StatGroup>
    `})};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Stat
    },
    setup: () => ({
      args
    }),
    template: '<Stat v-bind="args" />'
  })
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: "StatGroup",
  render: () => ({
    components: {
      Stat,
      StatGroup
    },
    template: \`
      <StatGroup class="w-[36rem]">
        <Stat label="Users" value="1,204" trend="increase" trend-value="12%" help-text="vs last week" />
        <Stat label="Churn" value="2.1%" trend="decrease" trend-value="0.4%" help-text="vs last week" />
        <Stat label="Uptime" value="99.98%" size="lg" />
      </StatGroup>
    \`
  })
}`,...u.parameters?.docs?.source}}};const I=["Default","Group"];export{d as Default,u as Group,I as __namedExportsOrder,E as default};
