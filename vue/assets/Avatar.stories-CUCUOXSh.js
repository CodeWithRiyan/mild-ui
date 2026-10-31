import{G as E,H as N,e as w,w as T,x as o,m as b,v as y,A as k,y as B,r as $,c,l as r,J as g,F as x,D as z,f as F,h as G,i as j,M as C,T as H}from"./vue.esm-bundler-DkB1Q1v8.js";import{c as A}from"./cn-CTdd_bgG.js";import{U as I}from"./icons-DSNlrOPV.js";import{g as R}from"./styling-DD7d-941.js";function U(e){if(!e)return"";const t=e.trim().split(/\s+/).filter(Boolean);if(t.length===0)return"";const a=t[0][0],n=t.length>1?t[t.length-1][0]:"";return(a+n).toUpperCase()}const V=Symbol("mild-ui:avatar-group");function O(e){N(V,e)}function P(){return E(V,null)}const J=["role","aria-label","data-state"],K=["alt","src"],M={key:1,class:"mild-avatar__fallback","aria-hidden":"true"},Q=["aria-label"],l=w({__name:"Avatar",props:{src:{default:void 0},name:{default:void 0},size:{default:void 0},shape:{default:"circle"},status:{default:void 0},bordered:{type:Boolean,default:!1},fallback:{default:void 0}},emits:["load","error"],setup(e,{emit:t}){const a=e,n=t,d=P(),i=c(()=>a.size??d?.size.value??"md"),u=$("idle");T(()=>a.src,()=>{u.value="idle"});const m=c(()=>!!a.src&&u.value!=="error"),h=c(()=>U(a.name)),L=c(()=>A("mild-avatar",`mild-avatar--${i.value}`,`mild-avatar--${a.shape}`,a.bordered&&"mild-avatar--bordered"));function q(s){u.value="loaded",n("load",s)}function D(s){u.value="error",n("error",s)}return(s,W)=>(r(),o("span",{role:m.value?void 0:"img","aria-label":m.value?void 0:e.name,class:y(L.value),"data-state":m.value?u.value:"fallback"},[m.value?(r(),o("img",{key:0,alt:e.name??"",src:e.src,class:"mild-avatar__image",onLoad:q,onError:D},null,40,K)):(r(),o("span",M,[b(s.$slots,"fallback",{},()=>[e.fallback!==void 0?(r(),o(g,{key:0},[x(z(e.fallback),1)],64)):h.value?(r(),o(g,{key:1},[x(z(h.value),1)],64)):(r(),F(k(I),{key:2}))])])),b(s.$slots,"default"),e.status?(r(),o("span",{key:2,class:y(k(A)("mild-avatar__badge",`mild-avatar__badge--${e.status}`)),role:"img","aria-label":e.status},null,10,Q)):B("",!0)],10,J))}});l.__docgenInfo={exportName:"default",displayName:"Avatar",description:"",tags:{},props:[{name:"src",description:"Picture URL. Falls back to the initials (or an icon) while loading or on error.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"name",description:"Full name: the accessible name of the picture and the source of the initials.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"size",required:!1,type:{name:"AvatarSize"},defaultValue:{func:!1,value:"undefined"}},{name:"shape",required:!1,type:{name:"AvatarShape"},defaultValue:{func:!1,value:'"circle"'}},{name:"status",description:"Presence dot in the corner.",required:!1,type:{name:"AvatarStatus"},defaultValue:{func:!1,value:"undefined"}},{name:"bordered",description:"Ring around the avatar (set by `AvatarGroup`).",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"fallback",description:"Replaces the initials when there is no picture; defaults to the initials, else a person icon.",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"undefined"}}],events:[{name:"load",type:{names:["Event"]}},{name:"error",type:{names:["Event"]}}],slots:[{name:"fallback",description:"Replaces the initials when there is no picture."},{name:"default",description:"Extra content (a badge of your own)."}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Avatar/Avatar.vue"]};function S(e){const t=[];for(const a of e)j(a)&&(a.type===g&&Array.isArray(a.children)?t.push(...S(a.children)):a.type!==C&&!(a.type===H&&!String(a.children).trim())&&t.push(a));return t}const _=w({name:"AvatarGroup",props:{max:{type:Number,default:void 0},size:{type:String,default:void 0},overlap:{type:String,default:"3"},overflowLabel:{type:Function,default:e=>`${e} more`}},setup(e,{slots:t}){return O({size:c(()=>e.size)}),()=>{const a=S(t.default?.()??[]),n=e.max!==void 0&&e.max>=0?e.max:a.length,d=a.slice(0,n),i=a.length-d.length;return G("div",{role:"group",class:"mild-avatar-group",style:{"--mild-avatar-group-overlap":R(e.overlap)}},[...d,i>0?G(l,{class:A("mild-avatar-group__overflow"),name:e.overflowLabel(i),fallback:`+${i}`,size:e.size,"data-overflow":""}):null])}}});_.__docgenInfo={displayName:"AvatarGroup",description:'Overlapping avatars. Beyond `max`, the remaining ones are replaced by a "+N" avatar. The\ngroup hands its `size` to the avatars inside.\n\nA render function rather than a template: the avatars beyond `max` are counted and dropped\nfrom the slot\'s vnodes.',tags:{},exportName:"default",props:[{name:"max",type:{name:"number"},defaultValue:{func:!1,value:"undefined"}},{name:"size",type:{name:"AvatarSize"},defaultValue:{func:!1,value:"undefined"}},{name:"overlap",type:{name:"SpaceToken"},defaultValue:{func:!1,value:'"3"'}},{name:"overflowLabel",type:{name:"(count: number) => string"},defaultValue:{func:!0,value:"(count: number) => `${count} more`"}}],sourceFiles:["/home/runner/work/mild-ui/mild-ui/packages/vue/src/components/Avatar/AvatarGroup.vue"]};const ae={title:"Data Display/Avatar",component:l,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'A person\'s picture, or their initials while it loads / when it fails. `AvatarGroup` overlaps avatars and replaces those beyond `max` with a "+N" avatar.'}}},argTypes:{src:{control:"text"},name:{control:"text"},size:{control:"select",options:["xs","sm","md","lg","xl","2xl"]},shape:{control:"radio",options:["circle","square"]},status:{control:"select",options:[void 0,"online","offline","busy","away"]},bordered:{control:"boolean"}},args:{name:"Ada Lovelace"}},p={render:e=>({components:{Avatar:l},setup:()=>({args:e}),template:'<Avatar v-bind="args" />'})},v={render:()=>({components:{Avatar:l},template:`
      <div class="flex items-center gap-4">
        <Avatar name="Ada Lovelace" size="sm" />
        <Avatar name="Grace Hopper" status="online" />
        <Avatar src="https://i.pravatar.cc/96?img=5" name="Alan Turing" size="lg" status="busy" />
        <Avatar src="broken.png" name="Edsger Dijkstra" size="xl" shape="square" bordered />
        <Avatar size="2xl" />
      </div>
    `})},f={name:"AvatarGroup",render:()=>({components:{Avatar:l,AvatarGroup:_},template:`
      <AvatarGroup :max="3" size="md" aria-label="Assignees">
        <Avatar name="Ada Lovelace" />
        <Avatar name="Grace Hopper" />
        <Avatar name="Alan Turing" />
        <Avatar name="Edsger Dijkstra" />
        <Avatar name="Barbara Liskov" />
      </AvatarGroup>
    `})};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Avatar
    },
    setup: () => ({
      args
    }),
    template: '<Avatar v-bind="args" />'
  })
}`,...p.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Avatar
    },
    template: \`
      <div class="flex items-center gap-4">
        <Avatar name="Ada Lovelace" size="sm" />
        <Avatar name="Grace Hopper" status="online" />
        <Avatar src="https://i.pravatar.cc/96?img=5" name="Alan Turing" size="lg" status="busy" />
        <Avatar src="broken.png" name="Edsger Dijkstra" size="xl" shape="square" bordered />
        <Avatar size="2xl" />
      </div>
    \`
  })
}`,...v.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: "AvatarGroup",
  render: () => ({
    components: {
      Avatar,
      AvatarGroup
    },
    template: \`
      <AvatarGroup :max="3" size="md" aria-label="Assignees">
        <Avatar name="Ada Lovelace" />
        <Avatar name="Grace Hopper" />
        <Avatar name="Alan Turing" />
        <Avatar name="Edsger Dijkstra" />
        <Avatar name="Barbara Liskov" />
      </AvatarGroup>
    \`
  })
}`,...f.parameters?.docs?.source}}};const te=["Default","Variants","Group"];export{p as Default,f as Group,v as Variants,te as __namedExportsOrder,ae as default};
