import{c as P,a as e,b as Q,j as o}from"./cn-C5LAPttS.js";import{c as X,a as b,u as Z,o as ee}from"./index.esm-D7wp2FZR.js";import{r as Y}from"./index-BwDkhjyp.js";import"./_commonjsHelpers-BosuxZz1.js";const re=P("flex w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",{variants:{variant:{default:"border-input",filled:"border-transparent bg-muted/50",outline:"border-input",ghost:"border-transparent bg-transparent"},size:{sm:"h-8 px-3 py-1",md:"h-10 px-4 py-2",lg:"h-12 px-5 py-3"},fullWidth:{true:"w-full",false:"w-auto"},error:{true:"border-destructive focus-visible:ring-destructive/50",false:""}},defaultVariants:{variant:"default",size:"md",fullWidth:!0,error:!1}}),r=Y.forwardRef(({className:a,type:l="text",size:n,variant:t,fullWidth:v,error:s,value:A,...J},K)=>e("input",{type:l,className:Q(re({size:n,variant:t,fullWidth:v,error:s}),a),ref:K,value:A,...J}));r.displayName="Input";try{r.displayName="Input",r.__docgenInfo={description:"",displayName:"Input",props:{type:{defaultValue:{value:"text"},description:"",name:"type",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"number"'},{value:'"search"'},{value:'"text"'},{value:'"tel"'},{value:'"url"'},{value:'"email"'},{value:'"password"'}]}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"string | undefined"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"boolean | undefined"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"outline"'},{value:'"ghost"'},{value:'"default"'},{value:'"filled"'}]}},fullWidth:{defaultValue:null,description:"",name:"fullWidth",required:!1,type:{name:"boolean | undefined"}}}}}catch{}const oe={title:"Components/Input",tags:["autodocs"],component:r,argTypes:{type:{control:{type:"radio"},options:["text","password","email","number","search","tel","url"]},placeholder:{control:"text"},value:{control:"text"},disabled:{control:"boolean"},readOnly:{control:"boolean"},required:{control:"boolean"},error:{control:"boolean"},autoFocus:{control:"boolean"},size:{control:{type:"radio"},options:["sm","md","lg"]},variant:{control:{type:"radio"},options:["default","filled","outline","ghost"]},fullWidth:{control:"boolean"},className:{control:!1}}},i={args:{placeholder:"Enter text..."}},u={args:{placeholder:"Disabled input",disabled:!0}},d={args:{placeholder:"Input with error",error:!0}},c={args:{placeholder:"Full width input",fullWidth:!0}},m={render:()=>o("div",{className:"flex flex-col gap-4 w-64",children:[e(r,{placeholder:"Small",size:"sm"}),e(r,{placeholder:"Medium",size:"md"}),e(r,{placeholder:"Large",size:"lg"})]})},p={render:()=>o("div",{className:"flex flex-col gap-4 w-64",children:[e(r,{placeholder:"Default",variant:"default"}),e(r,{placeholder:"Filled",variant:"filled"}),e(r,{placeholder:"Outline",variant:"outline"}),e(r,{placeholder:"Ghost",variant:"ghost"})]})},f={render:()=>{const[a,l]=Y.useState("");return e(r,{placeholder:"Type here...",value:a,onChange:n=>l(n.target.value)})}},h={render:()=>e(r,{placeholder:"Uncontrolled input",defaultValue:"Initial value",onChange:a=>console.log("value changed:",a.target.value)})},g={render:()=>{const a=X({name:b().required("Name is required"),email:b().email("Enter a valid email").required("Email is required")}),{register:l,handleSubmit:n,formState:{errors:t}}=Z({resolver:ee(a)});return o("form",{onSubmit:n(s=>{alert(`Submitted:
Name: ${s.name}
Email: ${s.email}`)}),className:"space-y-4 w-80",children:[o("div",{children:[e(r,{placeholder:"Full name",...l("name"),error:!!t.name}),t.name&&e("p",{className:"text-sm text-red-600",children:t.name.message})]}),o("div",{children:[e(r,{type:"email",placeholder:"Email address",...l("email"),error:!!t.email}),t.email&&e("p",{className:"text-sm text-red-600",children:t.email.message})]}),e("button",{type:"submit",className:"px-3 py-1 rounded bg-green-600 text-white text-sm",children:"Submit"})]})}};var y,x,S;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
} satisfies Story`,...(S=(x=i.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var I,N,w;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    placeholder: 'Disabled input',
    disabled: true
  }
} satisfies Story`,...(w=(N=u.parameters)==null?void 0:N.docs)==null?void 0:w.source}}};var q,E,V;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    placeholder: 'Input with error',
    error: true
  }
} satisfies Story`,...(V=(E=d.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};var z,F,W;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    placeholder: 'Full width input',
    fullWidth: true
  }
} satisfies Story`,...(W=(F=c.parameters)==null?void 0:F.docs)==null?void 0:W.source}}};var _,D,C;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      <Input placeholder="Small" size="sm" />
      <Input placeholder="Medium" size="md" />
      <Input placeholder="Large" size="lg" />
    </div>
} satisfies Story`,...(C=(D=m.parameters)==null?void 0:D.docs)==null?void 0:C.source}}};var $,j,k;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      <Input placeholder="Default" variant="default" />
      <Input placeholder="Filled" variant="filled" />
      <Input placeholder="Outline" variant="outline" />
      <Input placeholder="Ghost" variant="ghost" />
    </div>
} satisfies Story`,...(k=(j=p.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var B,O,R;f.parameters={...f.parameters,docs:{...(B=f.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('');
    return <Input placeholder="Type here..." value={value} onChange={e => setValue(e.target.value)} />;
  }
} satisfies Story`,...(R=(O=f.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var U,T,G;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <Input placeholder="Uncontrolled input" defaultValue="Initial value" onChange={e => console.log('value changed:', e.target.value)} />
} satisfies Story`,...(G=(T=h.parameters)==null?void 0:T.docs)==null?void 0:G.source}}};var H,L,M;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => {
    const schema = yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Enter a valid email').required('Email is required')
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
      name: string;
      email: string;
    }) => {
      alert(\`Submitted:\\nName: \${data.name}\\nEmail: \${data.email}\`);
    };
    return <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
        <div>
          <Input placeholder="Full name" {...register('name')} error={Boolean(errors.name)} />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <Input type="email" placeholder="Email address" {...register('email')} error={Boolean(errors.email)} />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <button type="submit" className="px-3 py-1 rounded bg-green-600 text-white text-sm">
          Submit
        </button>
      </form>;
  }
} satisfies Story`,...(M=(L=g.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};const se=["Default","Disabled","WithError","FullWidth","Sizes","Variants","ControlledInput","UncontrolledInput","ReactHookFormWithYup"];export{f as ControlledInput,i as Default,u as Disabled,c as FullWidth,g as ReactHookFormWithYup,m as Sizes,h as UncontrolledInput,p as Variants,d as WithError,se as __namedExportsOrder,oe as default};
