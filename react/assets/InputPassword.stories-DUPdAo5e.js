import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{c as v,d as x,o as I}from"./index.esm-CDmTEbLs.js";import{r as S}from"./index-B2-qRKKC.js";import{u as P}from"./index.esm-B5r5kaiW.js";import{I as r}from"./InputPassword-P7P_eQZt.js";import{I as b}from"./Input-uNLkzt6C.js";import{B as j}from"./Button-tFE5omYn.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cn-Dtjc6EhN.js";import"./createLucideIcon-DyoHGKTE.js";const z={title:"Components/InputPassword",tags:["autodocs"],component:r,argTypes:{placeholder:{control:"text"},value:{control:"text"},disabled:{control:"boolean"},readOnly:{control:"boolean"},required:{control:"boolean"},error:{control:"boolean"},autoFocus:{control:"boolean"},size:{control:{type:"radio"},options:["sm","md","lg"]},variant:{control:{type:"radio"},options:["default","filled","outline","ghost"]},fullWidth:{control:"boolean"},className:{control:!1},ui:{control:{type:"object",raw:!1}}}},t={args:{placeholder:"Password"}},n={args:{placeholder:"Disabled InputPassword",disabled:!0}},l={args:{placeholder:"InputPassword error",error:!0}},d={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 w-64",children:[e.jsx(r,{placeholder:"Small",size:"sm"}),e.jsx(r,{placeholder:"Medium",size:"md"}),e.jsx(r,{placeholder:"Large",size:"lg"})]})},i={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 w-64",children:[e.jsx(r,{placeholder:"Default",variant:"default"}),e.jsx(r,{placeholder:"Filled",variant:"filled"}),e.jsx(r,{placeholder:"Outline",variant:"outline"}),e.jsx(r,{placeholder:"Ghost",variant:"ghost"})]})},c={render:()=>{const s={input:"pl-10",buttonIcon:"top-0 left-0"};return e.jsxs("div",{className:"flex flex-col gap-4 w-64",children:[e.jsx(r,{placeholder:"Icon Right"}),e.jsx(r,{placeholder:"Icon Left",ui:s})]})}},p={render:()=>{const s=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#000000",viewBox:"0 0 256 256",children:e.jsx("path",{d:"M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"})}),a=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#000000",viewBox:"0 0 256 256",children:e.jsx("path",{d:"M228,175a8,8,0,0,1-10.92-3l-19-33.2A123.23,123.23,0,0,1,162,155.46l5.87,35.22a8,8,0,0,1-6.58,9.21A8.4,8.4,0,0,1,160,200a8,8,0,0,1-7.88-6.69l-5.77-34.58a133.06,133.06,0,0,1-36.68,0l-5.77,34.58A8,8,0,0,1,96,200a8.4,8.4,0,0,1-1.32-.11,8,8,0,0,1-6.58-9.21L94,155.46a123.23,123.23,0,0,1-36.06-16.69L39,172A8,8,0,1,1,25.06,164l20-35a153.47,153.47,0,0,1-19.3-20A8,8,0,1,1,38.22,99c16.6,20.54,45.64,45,89.78,45s73.18-24.49,89.78-45A8,8,0,1,1,230.22,109a153.47,153.47,0,0,1-19.3,20l20,35A8,8,0,0,1,228,175Z"})});return e.jsx(r,{placeholder:"Password",visibleIcon:e.jsx(s,{}),hiddenIcon:e.jsx(a,{})})}},u={render:()=>{const[s,a]=S.useState("");return e.jsx(r,{placeholder:"Type here...",value:s,onChange:w=>a(w.target.value)})}},m={render:()=>e.jsx(r,{placeholder:"Uncontrolled InputPassword",defaultValue:"Initial value",onChange:s=>console.log("value changed:",s.target.value)})},h={render:()=>{const s=v({email:x().email("Enter a valid email").required("Email is required"),password:x().required("Password is required")}),{register:a,handleSubmit:w,formState:{errors:o}}=P({resolver:I(s)}),f=g=>{alert(`Submitted:
Email: ${g.email}
Password: ${g.password}`)};return e.jsxs("form",{onSubmit:w(f),className:"space-y-4 w-80",children:[e.jsxs("div",{children:[e.jsx(b,{type:"email",placeholder:"Email address",...a("email"),error:!!o.email}),o.email&&e.jsx("p",{className:"text-sm text-red-600",children:o.email.message})]}),e.jsxs("div",{children:[e.jsx(r,{placeholder:"Password",...a("password"),error:!!o.password}),o.password&&e.jsx("p",{className:"text-sm text-red-600",children:o.password.message})]}),e.jsx(j,{type:"submit",children:"Submit"})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Password"
  }
} satisfies Story`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Disabled InputPassword",
    disabled: true
  }
} satisfies Story`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "InputPassword error",
    error: true
  }
} satisfies Story`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      <InputPassword placeholder="Small" size="sm" />
      <InputPassword placeholder="Medium" size="md" />
      <InputPassword placeholder="Large" size="lg" />
    </div>
} satisfies Story`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    return <div className="flex flex-col gap-4 w-64">
        <InputPassword placeholder="Default" variant="default" />
        <InputPassword placeholder="Filled" variant="filled" />
        <InputPassword placeholder="Outline" variant="outline" />
        <InputPassword placeholder="Ghost" variant="ghost" />
      </div>;
  }
} satisfies Story`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
} satisfies Story`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const VisibleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
        <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
      </svg>;
    const HiddenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
        <path d="M228,175a8,8,0,0,1-10.92-3l-19-33.2A123.23,123.23,0,0,1,162,155.46l5.87,35.22a8,8,0,0,1-6.58,9.21A8.4,8.4,0,0,1,160,200a8,8,0,0,1-7.88-6.69l-5.77-34.58a133.06,133.06,0,0,1-36.68,0l-5.77,34.58A8,8,0,0,1,96,200a8.4,8.4,0,0,1-1.32-.11,8,8,0,0,1-6.58-9.21L94,155.46a123.23,123.23,0,0,1-36.06-16.69L39,172A8,8,0,1,1,25.06,164l20-35a153.47,153.47,0,0,1-19.3-20A8,8,0,1,1,38.22,99c16.6,20.54,45.64,45,89.78,45s73.18-24.49,89.78-45A8,8,0,1,1,230.22,109a153.47,153.47,0,0,1-19.3,20l20,35A8,8,0,0,1,228,175Z"></path>
      </svg>;
    return <InputPassword placeholder="Password" visibleIcon={<VisibleIcon />} hiddenIcon={<HiddenIcon />} />;
  }
} satisfies Story`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <InputPassword placeholder="Type here..." value={value} onChange={e => setValue(e.target.value)} />;
  }
} satisfies Story`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <InputPassword placeholder="Uncontrolled InputPassword" defaultValue="Initial value" onChange={e => console.log("value changed:", e.target.value)} />
} satisfies Story`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
} satisfies Story`,...h.parameters?.docs?.source}}};const D=["Default","Disabled","WithError","Sizes","Variants","IconPosition","ChangeIcon","ControlledInputPassword","UncontrolledInputPassword","ReactHookFormWithYup"];export{p as ChangeIcon,u as ControlledInputPassword,t as Default,n as Disabled,c as IconPosition,h as ReactHookFormWithYup,d as Sizes,m as UncontrolledInputPassword,i as Variants,l as WithError,D as __namedExportsOrder,z as default};
