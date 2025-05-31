var A=Object.defineProperty,O=Object.defineProperties;var T=Object.getOwnPropertyDescriptors;var h=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var x=(o,s,a)=>s in o?A(o,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[s]=a,e=(o,s)=>{for(var a in s||(s={}))z.call(s,a)&&x(o,a,s[a]);if(h)for(var a of h(s))B.call(s,a)&&x(o,a,s[a]);return o},r=(o,s)=>O(o,T(s));import{j as M,a as u}from"./jsx-runtime-Cr617v10.js";import{M as p,u as _}from"./index-BfP1bvMz.js";import"./index-D2dH9QXU.js";import"./_commonjsHelpers-CDgoFxsB.js";import"./index-8BIPUTFA.js";const X={title:"Components/Label",component:p,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A styled label component based on Radix Label with support for required and error states."}}},argTypes:{children:{control:"text"},required:{control:"boolean"},error:{control:"boolean"},ui:{control:"object"},className:{control:"text"}}},t={args:{children:"Username"}},l={args:{children:"Email address",required:!0}},n={args:{children:"Password",error:!0}},i={args:{children:"Phone number",className:"text-blue-600 font-semibold"}},d={args:{children:"Email address",ui:{label:"text-blue-600 font-semibold",asterisk:"text-blue-500"},required:!0}},m={render:()=>M("div",{className:"flex flex-col gap-2 w-64",children:[u(p,{htmlFor:"email",required:!0,children:"Email address"}),u(_,{id:"email",type:"email",placeholder:"you@example.com",className:"px-3 py-2 border rounded text-sm"})]})},c={render:()=>M("div",{className:"flex flex-col gap-2 w-64",children:[u(p,{htmlFor:"email",required:!0,error:!0,children:"Email address"}),u(_,{id:"email",type:"email",placeholder:"you@example.com",className:"px-3 py-2 border rounded text-sm"})]})};var b,f,g;t.parameters=r(e({},t.parameters),{docs:r(e({},(b=t.parameters)==null?void 0:b.docs),{source:e({originalSource:`{
  args: {
    children: "Username"
  }
} satisfies Story`},(g=(f=t.parameters)==null?void 0:f.docs)==null?void 0:g.source)})});var y,S,E;l.parameters=r(e({},l.parameters),{docs:r(e({},(y=l.parameters)==null?void 0:y.docs),{source:e({originalSource:`{
  args: {
    children: "Email address",
    required: true
  }
} satisfies Story`},(E=(S=l.parameters)==null?void 0:S.docs)==null?void 0:E.source)})});var N,q,I;n.parameters=r(e({},n.parameters),{docs:r(e({},(N=n.parameters)==null?void 0:N.docs),{source:e({originalSource:`{
  args: {
    children: "Password",
    error: true
  }
} satisfies Story`},(I=(q=n.parameters)==null?void 0:q.docs)==null?void 0:I.source)})});var W,w,C;i.parameters=r(e({},i.parameters),{docs:r(e({},(W=i.parameters)==null?void 0:W.docs),{source:e({originalSource:`{
  args: {
    children: "Phone number",
    className: "text-blue-600 font-semibold"
  }
} satisfies Story`},(C=(w=i.parameters)==null?void 0:w.docs)==null?void 0:C.source)})});var v,L,j;d.parameters=r(e({},d.parameters),{docs:r(e({},(v=d.parameters)==null?void 0:v.docs),{source:e({originalSource:`{
  args: {
    children: "Email address",
    ui: {
      label: "text-blue-600 font-semibold",
      asterisk: "text-blue-500"
    },
    required: true
  }
} satisfies Story`},(j=(L=d.parameters)==null?void 0:L.docs)==null?void 0:j.source)})});var F,P,U;m.parameters=r(e({},m.parameters),{docs:r(e({},(F=m.parameters)==null?void 0:F.docs),{source:e({originalSource:`{
  render: () => <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="email" required>
        Email address
      </Label>
      <Input id="email" type="email" placeholder="you@example.com" className="px-3 py-2 border rounded text-sm" />
    </div>
} satisfies Story`},(U=(P=m.parameters)==null?void 0:P.docs)==null?void 0:U.source)})});var R,k,D;c.parameters=r(e({},c.parameters),{docs:r(e({},(R=c.parameters)==null?void 0:R.docs),{source:e({originalSource:`{
  render: () => <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="email" required error>
        Email address
      </Label>
      <Input id="email" type="email" placeholder="you@example.com" className="px-3 py-2 border rounded text-sm" />
    </div>
} satisfies Story`},(D=(k=c.parameters)==null?void 0:k.docs)==null?void 0:D.source)})});const Y=["Default","Required","WithError","CustomClassName","CustomUI","WithInput","WithInputWithError"];export{i as CustomClassName,d as CustomUI,t as Default,l as Required,n as WithError,m as WithInput,c as WithInputWithError,Y as __namedExportsOrder,X as default};
