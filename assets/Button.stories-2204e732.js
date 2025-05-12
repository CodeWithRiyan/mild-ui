import{j as t}from"./jsx-runtime-47c18db8.js";import{f as o}from"./index-1b62368f.js";import{R as G,r as B}from"./index-d806aa85.js";const M="mild-button",V={primary:"mild-button-primary",secondary:"mild-button-secondary",outline:"mild-button-outline",ghost:"mild-button-ghost"},Y={small:"mild-button-small",medium:"mild-button-medium",large:"mild-button-large"},K=(e="primary",i="medium")=>[M,V[e],Y[i]].join(" "),Q=e=>{const i=e.variant||"primary",a=e.size||"medium",d=e.disabled||!1;return{className:K(i,a),disabled:d,variant:i,size:a}};var W={exports:{}},y={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var z;function Z(){if(z)return y;z=1;var e=G,i=Symbol.for("react.element"),a=Symbol.for("react.fragment"),d=Object.prototype.hasOwnProperty,l=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,m={key:!0,ref:!0,__self:!0,__source:!0};function u(s,r,g){var n,p={},C=null,j=null;g!==void 0&&(C=""+g),r.key!==void 0&&(C=""+r.key),r.ref!==void 0&&(j=r.ref);for(n in r)d.call(r,n)&&!m.hasOwnProperty(n)&&(p[n]=r[n]);if(s&&s.defaultProps)for(n in r=s.defaultProps,r)p[n]===void 0&&(p[n]=r[n]);return{$$typeof:i,type:s,key:C,ref:j,props:p,_owner:l.current}}return y.Fragment=a,y.jsx=u,y.jsxs=u,y}W.exports=Z();var h=W.exports;const q=({variant:e="primary",size:i="medium",disabled:a=!1,onClick:d,leadingIcon:l,trailingIcon:m,children:u,className:s=""})=>{const r=Q({variant:e,size:i,disabled:a});return h.jsxs("button",{className:`${r.className} ${s}`,disabled:a,onClick:d,children:[l&&h.jsx("span",{className:"mild-button-icon mild-button-leading-icon",children:l}),h.jsx("span",{className:"mild-button-content",children:u}),m&&h.jsx("span",{className:"mild-button-icon mild-button-trailing-icon",children:m})]})},c=q;var H={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const J=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),F=(e,i)=>{const a=B.forwardRef(({color:d="currentColor",size:l=24,strokeWidth:m=2,absoluteStrokeWidth:u,children:s,...r},g)=>B.createElement("svg",{ref:g,...H,width:l,height:l,stroke:d,strokeWidth:u?Number(m)*24/Number(l):m,className:`lucide lucide-${J(e)}`,...r},[...i.map(([n,p])=>B.createElement(n,p)),...(Array.isArray(s)?s:[s])||[]]));return a.displayName=`${e}`,a},X=F("ArrowRight",[["line",{x1:"5",x2:"19",y1:"12",y2:"12",key:"13b5wn"}],["polyline",{points:"12 5 19 12 12 19",key:"sfr3i6"}]]),ee=F("Plus",[["line",{x1:"12",x2:"12",y1:"5",y2:"19",key:"pwfkuu"}],["line",{x1:"5",x2:"19",y1:"12",y2:"12",key:"13b5wn"}]]),ie={component:c,title:"Components/Button",argTypes:{variant:{control:"select",options:["primary","secondary","outline","ghost"]},size:{control:"select",options:["small","medium","large"]},disabled:{control:"boolean"}},parameters:{layout:"centered"}},x={args:{variant:"primary",size:"medium",children:"Button Text",onClick:o()}},f={args:{variant:"primary",size:"medium",children:"Button with Icons",leadingIcon:t.jsx(ee,{size:16}),trailingIcon:t.jsx(X,{size:16}),onClick:o()}},v={args:{variant:"primary",size:"medium",children:"Disabled Button",disabled:!0,onClick:o()}},b={render:()=>t.jsxs("div",{className:"flex gap-4 items-center",children:[t.jsx(c,{size:"small",onClick:o(),children:"Small"}),t.jsx(c,{size:"medium",onClick:o(),children:"Medium"}),t.jsx(c,{size:"large",onClick:o(),children:"Large"})]})},k={render:()=>t.jsxs("div",{className:"flex gap-4 items-center",children:[t.jsx(c,{variant:"primary",onClick:o(),children:"Primary"}),t.jsx(c,{variant:"secondary",onClick:o(),children:"Secondary"}),t.jsx(c,{variant:"outline",onClick:o(),children:"Outline"}),t.jsx(c,{variant:"ghost",onClick:o(),children:"Ghost"})]})};var w,_,N;x.parameters={...x.parameters,docs:{...(w=x.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Button Text',
    onClick: fn() // Use fn() instead of relying on argTypesRegex
  }
}`,...(N=(_=x.parameters)==null?void 0:_.docs)==null?void 0:N.source}}};var S,I,R;f.parameters={...f.parameters,docs:{...(S=f.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Button with Icons',
    leadingIcon: <Plus size={16} />,
    trailingIcon: <ArrowRight size={16} />,
    onClick: fn() // Use fn() instead of relying on argTypesRegex
  }
}`,...(R=(I=f.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};var E,O,P;v.parameters={...v.parameters,docs:{...(E=v.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Disabled Button',
    disabled: true,
    onClick: fn() // Use fn() instead of relying on argTypesRegex
  }
}`,...(P=(O=v.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var T,A,L;b.parameters={...b.parameters,docs:{...(T=b.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4 items-center">
      <Button size="small" onClick={fn()}>Small</Button>
      <Button size="medium" onClick={fn()}>Medium</Button>
      <Button size="large" onClick={fn()}>Large</Button>
    </div>
}`,...(L=(A=b.parameters)==null?void 0:A.docs)==null?void 0:L.source}}};var $,D,U;k.parameters={...k.parameters,docs:{...($=k.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4 items-center">
      <Button variant="primary" onClick={fn()}>Primary</Button>
      <Button variant="secondary" onClick={fn()}>Secondary</Button>
      <Button variant="outline" onClick={fn()}>Outline</Button>
      <Button variant="ghost" onClick={fn()}>Ghost</Button>
    </div>
}`,...(U=(D=k.parameters)==null?void 0:D.docs)==null?void 0:U.source}}};const ae=["Primary","WithIcons","Disabled","Sizes","Variants"];export{v as Disabled,x as Primary,b as Sizes,k as Variants,f as WithIcons,ae as __namedExportsOrder,ie as default};
