var X=Object.defineProperty,ee=Object.defineProperties;var re=Object.getOwnPropertyDescriptors;var S=Object.getOwnPropertySymbols;var ae=Object.prototype.hasOwnProperty,se=Object.prototype.propertyIsEnumerable;var b=(o,s,t)=>s in o?X(o,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[s]=t,e=(o,s)=>{for(var t in s||(s={}))ae.call(s,t)&&b(o,t,s[t]);if(S)for(var t of S(s))se.call(s,t)&&b(o,t,s[t]);return o},r=(o,s)=>ee(o,re(s));import{j as d,a}from"./jsx-runtime-Cr617v10.js";import{c as oe,d as P,o as te}from"./index.esm-CUaDp5zZ.js";import{f as n,u as ne,I as le}from"./index-BfP1bvMz.js";import{r as de}from"./index-D2dH9QXU.js";import{u as ie}from"./index.esm-0XuDu32R.js";import"./_commonjsHelpers-CDgoFxsB.js";import"./index-8BIPUTFA.js";const Ie={title:"Components/InputPassword",tags:["autodocs"],component:n,argTypes:{placeholder:{control:"text"},value:{control:"text"},disabled:{control:"boolean"},readOnly:{control:"boolean"},required:{control:"boolean"},error:{control:"boolean"},autoFocus:{control:"boolean"},size:{control:{type:"radio"},options:["sm","md","lg"]},variant:{control:{type:"radio"},options:["default","filled","outline","ghost"]},fullWidth:{control:"boolean"},className:{control:!1},ui:{control:{type:"object",raw:!1}}}},i={args:{placeholder:"Password"}},c={args:{placeholder:"Disabled InputPassword",disabled:!0}},p={args:{placeholder:"InputPassword error",error:!0}},u={render:()=>d("div",{className:"flex flex-col gap-4 w-64",children:[a(n,{placeholder:"Small",size:"sm"}),a(n,{placeholder:"Medium",size:"md"}),a(n,{placeholder:"Large",size:"lg"})]})},m={render:()=>d("div",{className:"flex flex-col gap-4 w-64",children:[a(n,{placeholder:"Default",variant:"default"}),a(n,{placeholder:"Filled",variant:"filled"}),a(n,{placeholder:"Outline",variant:"outline"}),a(n,{placeholder:"Ghost",variant:"ghost"})]})},h={render:()=>d("div",{className:"flex flex-col gap-4 w-64",children:[a(n,{placeholder:"Icon Right"}),a(n,{placeholder:"Icon Left",ui:{input:"pl-10",buttonIcon:"top-0 left-0"}})]})},w={render:()=>a(n,{placeholder:"Password",visibleIcon:a(()=>a("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#000000",viewBox:"0 0 256 256",children:a("path",{d:"M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"})}),{}),hiddenIcon:a(()=>a("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#000000",viewBox:"0 0 256 256",children:a("path",{d:"M228,175a8,8,0,0,1-10.92-3l-19-33.2A123.23,123.23,0,0,1,162,155.46l5.87,35.22a8,8,0,0,1-6.58,9.21A8.4,8.4,0,0,1,160,200a8,8,0,0,1-7.88-6.69l-5.77-34.58a133.06,133.06,0,0,1-36.68,0l-5.77,34.58A8,8,0,0,1,96,200a8.4,8.4,0,0,1-1.32-.11,8,8,0,0,1-6.58-9.21L94,155.46a123.23,123.23,0,0,1-36.06-16.69L39,172A8,8,0,1,1,25.06,164l20-35a153.47,153.47,0,0,1-19.3-20A8,8,0,1,1,38.22,99c16.6,20.54,45.64,45,89.78,45s73.18-24.49,89.78-45A8,8,0,1,1,230.22,109a153.47,153.47,0,0,1-19.3,20l20,35A8,8,0,0,1,228,175Z"})}),{})})},g={render:()=>{const[o,s]=de.useState("");return a(n,{placeholder:"Type here...",value:o,onChange:t=>s(t.target.value)})}},f={render:()=>a(n,{placeholder:"Uncontrolled InputPassword",defaultValue:"Initial value",onChange:o=>console.log("value changed:",o.target.value)})},v={render:()=>{const o=oe({email:P().email("Enter a valid email").required("Email is required"),password:P().required("Password is required")}),{register:s,handleSubmit:t,formState:{errors:l}}=ie({resolver:te(o)});return d("form",{onSubmit:t(I=>{alert(`Submitted:
Email: ${I.email}
Password: ${I.password}`)}),className:"space-y-4 w-80",children:[d("div",{children:[a(ne,r(e({type:"email",placeholder:"Email address"},s("email")),{error:!!l.email})),l.email&&a("p",{className:"text-sm text-red-600",children:l.email.message})]}),d("div",{children:[a(n,r(e({placeholder:"Password"},s("password")),{error:!!l.password})),l.password&&a("p",{className:"text-sm text-red-600",children:l.password.message})]}),a(le,{type:"submit",children:"Submit"})]})}};var x,y,A;i.parameters=r(e({},i.parameters),{docs:r(e({},(x=i.parameters)==null?void 0:x.docs),{source:e({originalSource:`{
  args: {
    placeholder: "Password"
  }
} satisfies Story`},(A=(y=i.parameters)==null?void 0:y.docs)==null?void 0:A.source)})});var C,N,E;c.parameters=r(e({},c.parameters),{docs:r(e({},(C=c.parameters)==null?void 0:C.docs),{source:e({originalSource:`{
  args: {
    placeholder: "Disabled InputPassword",
    disabled: true
  }
} satisfies Story`},(E=(N=c.parameters)==null?void 0:N.docs)==null?void 0:E.source)})});var L,V,B;p.parameters=r(e({},p.parameters),{docs:r(e({},(L=p.parameters)==null?void 0:L.docs),{source:e({originalSource:`{
  args: {
    placeholder: "InputPassword error",
    error: true
  }
} satisfies Story`},(B=(V=p.parameters)==null?void 0:V.docs)==null?void 0:B.source)})});var Z,q,z;u.parameters=r(e({},u.parameters),{docs:r(e({},(Z=u.parameters)==null?void 0:Z.docs),{source:e({originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      <InputPassword placeholder="Small" size="sm" />
      <InputPassword placeholder="Medium" size="md" />
      <InputPassword placeholder="Large" size="lg" />
    </div>
} satisfies Story`},(z=(q=u.parameters)==null?void 0:q.docs)==null?void 0:z.source)})});var D,M,F;m.parameters=r(e({},m.parameters),{docs:r(e({},(D=m.parameters)==null?void 0:D.docs),{source:e({originalSource:`{
  render: () => {
    return <div className="flex flex-col gap-4 w-64">
        <InputPassword placeholder="Default" variant="default" />
        <InputPassword placeholder="Filled" variant="filled" />
        <InputPassword placeholder="Outline" variant="outline" />
        <InputPassword placeholder="Ghost" variant="ghost" />
      </div>;
  }
} satisfies Story`},(F=(M=m.parameters)==null?void 0:M.docs)==null?void 0:F.source)})});var H,$,j;h.parameters=r(e({},h.parameters),{docs:r(e({},(H=h.parameters)==null?void 0:H.docs),{source:e({originalSource:`{
  render: () => {
    const uiIconLeft: InputPasswordProps["ui"] = {
      input: "pl-10",
      buttonIcon: "top-0 left-0"
    };
    return <div className="flex flex-col gap-4 w-64">
        <InputPassword placeholder="Icon Right" />
        <InputPassword placeholder="Icon Left" ui={uiIconLeft} />
      </div>;
  }
} satisfies Story`},(j=($=h.parameters)==null?void 0:$.docs)==null?void 0:j.source)})});var R,W,O;w.parameters=r(e({},w.parameters),{docs:r(e({},(R=w.parameters)==null?void 0:R.docs),{source:e({originalSource:`{
  render: () => {
    const VisibleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
        <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
      </svg>;
    const HiddenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
        <path d="M228,175a8,8,0,0,1-10.92-3l-19-33.2A123.23,123.23,0,0,1,162,155.46l5.87,35.22a8,8,0,0,1-6.58,9.21A8.4,8.4,0,0,1,160,200a8,8,0,0,1-7.88-6.69l-5.77-34.58a133.06,133.06,0,0,1-36.68,0l-5.77,34.58A8,8,0,0,1,96,200a8.4,8.4,0,0,1-1.32-.11,8,8,0,0,1-6.58-9.21L94,155.46a123.23,123.23,0,0,1-36.06-16.69L39,172A8,8,0,1,1,25.06,164l20-35a153.47,153.47,0,0,1-19.3-20A8,8,0,1,1,38.22,99c16.6,20.54,45.64,45,89.78,45s73.18-24.49,89.78-45A8,8,0,1,1,230.22,109a153.47,153.47,0,0,1-19.3,20l20,35A8,8,0,0,1,228,175Z"></path>
      </svg>;
    return <InputPassword placeholder="Password" visibleIcon={<VisibleIcon />} hiddenIcon={<HiddenIcon />} />;
  }
} satisfies Story`},(O=(W=w.parameters)==null?void 0:W.docs)==null?void 0:O.source)})});var U,T,k;g.parameters=r(e({},g.parameters),{docs:r(e({},(U=g.parameters)==null?void 0:U.docs),{source:e({originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <InputPassword placeholder="Type here..." value={value} onChange={e => setValue(e.target.value)} />;
  }
} satisfies Story`},(k=(T=g.parameters)==null?void 0:T.docs)==null?void 0:k.source)})});var G,Y,_;f.parameters=r(e({},f.parameters),{docs:r(e({},(G=f.parameters)==null?void 0:G.docs),{source:e({originalSource:`{
  render: () => <InputPassword placeholder="Uncontrolled InputPassword" defaultValue="Initial value" onChange={e => console.log("value changed:", e.target.value)} />
} satisfies Story`},(_=(Y=f.parameters)==null?void 0:Y.docs)==null?void 0:_.source)})});var J,K,Q;v.parameters=r(e({},v.parameters),{docs:r(e({},(J=v.parameters)==null?void 0:J.docs),{source:e({originalSource:`{
  render: () => {
    const schema = yup.object({
      email: yup.string().email("Enter a valid email").required("Email is required"),
      password: yup.string().required("Password is required")
    });
    const {
      register,
      handleSubmit,
      formState: {
        errors
      }
    } = useForm({
      resolver: yupResolver(schema)
    });
    const onSubmit = (data: {
      email: string;
      password: string;
    }) => {
      alert(\`Submitted:\\nEmail: \${data.email}\\nPassword: \${data.password}\`);
    };
    return <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
        <div>
          <Input type="email" placeholder="Email address" {...register("email")} error={Boolean(errors.email)} />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <InputPassword placeholder="Password" {...register("password")} error={Boolean(errors.password)} />
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
        </div>
        <Button type="submit">Submit</Button>
      </form>;
  }
} satisfies Story`},(Q=(K=v.parameters)==null?void 0:K.docs)==null?void 0:Q.source)})});const Se=["Default","Disabled","WithError","Sizes","Variants","IconPosition","ChangeIcon","ControlledInputPassword","UncontrolledInputPassword","ReactHookFormWithYup"];export{w as ChangeIcon,g as ControlledInputPassword,i as Default,c as Disabled,h as IconPosition,v as ReactHookFormWithYup,u as Sizes,f as UncontrolledInputPassword,m as Variants,p as WithError,Se as __namedExportsOrder,Ie as default};
