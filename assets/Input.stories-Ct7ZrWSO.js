var le=Object.defineProperty,ne=Object.defineProperties;var oe=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,w=Object.prototype.propertyIsEnumerable;var I=(r,a,l)=>a in r?le(r,a,{enumerable:!0,configurable:!0,writable:!0,value:l}):r[a]=l,e=(r,a)=>{for(var l in a||(a={}))N.call(a,l)&&I(r,l,a[l]);if(d)for(var l of d(a))w.call(a,l)&&I(r,l,a[l]);return r},t=(r,a)=>ne(r,oe(a));var q=(r,a)=>{var l={};for(var n in r)N.call(r,n)&&a.indexOf(n)<0&&(l[n]=r[n]);if(r!=null&&d)for(var n of d(r))a.indexOf(n)<0&&w.call(r,n)&&(l[n]=r[n]);return l};import{a as o,j as i}from"./jsx-runtime-Cr617v10.js";import{c as se,a as E,u as ie,o as ue}from"./index.esm-1VFK1fsS.js";import{r as ee}from"./index-D2dH9QXU.js";import{c as de,a as ce}from"./cn-ur_4nXRV.js";import"./_commonjsHelpers-CDgoFxsB.js";const me=de("flex w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",{variants:{variant:{default:"border-input",filled:"border-transparent bg-muted/50",outline:"border-input",ghost:"border-transparent bg-transparent"},size:{sm:"h-8 px-3 py-1",md:"h-10 px-4 py-2",lg:"h-12 px-5 py-3"},fullWidth:{true:"w-full",false:"w-auto"},error:{true:"border-destructive focus-visible:ring-destructive/50",false:""}},defaultVariants:{variant:"default",size:"md",fullWidth:!0,error:!1}}),s=ee.forwardRef((pe,te)=>{var S=pe,{className:r,type:a="text",size:l,variant:n,fullWidth:x,error:u,value:re}=S,ae=q(S,["className","type","size","variant","fullWidth","error","value"]);return o("input",e({type:a,className:ce(me({size:l,variant:n,fullWidth:x,error:u}),r),ref:te,value:re},ae))});s.displayName="Input";try{s.displayName="Input",s.__docgenInfo={description:"",displayName:"Input",props:{type:{defaultValue:{value:"text"},description:"",name:"type",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"number"'},{value:'"search"'},{value:'"text"'},{value:'"tel"'},{value:'"url"'},{value:'"email"'},{value:'"password"'}]}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"string | undefined"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"boolean | undefined"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"outline"'},{value:'"ghost"'},{value:'"default"'},{value:'"filled"'}]}},fullWidth:{defaultValue:null,description:"",name:"fullWidth",required:!1,type:{name:"boolean | undefined"}}}}}catch(r){}const xe={title:"Components/Input",tags:["autodocs"],component:s,argTypes:{type:{control:{type:"radio"},options:["text","password","email","number","search","tel","url"]},placeholder:{control:"text"},value:{control:"text"},disabled:{control:"boolean"},readOnly:{control:"boolean"},required:{control:"boolean"},error:{control:"boolean"},autoFocus:{control:"boolean"},size:{control:{type:"radio"},options:["sm","md","lg"]},variant:{control:{type:"radio"},options:["default","filled","outline","ghost"]},fullWidth:{control:"boolean"},className:{control:!1}}},c={args:{placeholder:"Enter text..."}},m={args:{placeholder:"Disabled input",disabled:!0}},p={args:{placeholder:"Input with error",error:!0}},f={args:{placeholder:"Full width input",fullWidth:!0}},h={render:()=>i("div",{className:"flex flex-col gap-4 w-64",children:[o(s,{placeholder:"Small",size:"sm"}),o(s,{placeholder:"Medium",size:"md"}),o(s,{placeholder:"Large",size:"lg"})]})},g={render:()=>i("div",{className:"flex flex-col gap-4 w-64",children:[o(s,{placeholder:"Default",variant:"default"}),o(s,{placeholder:"Filled",variant:"filled"}),o(s,{placeholder:"Outline",variant:"outline"}),o(s,{placeholder:"Ghost",variant:"ghost"})]})},v={render:()=>{const[r,a]=ee.useState("");return o(s,{placeholder:"Type here...",value:r,onChange:l=>a(l.target.value)})}},b={render:()=>o(s,{placeholder:"Uncontrolled input",defaultValue:"Initial value",onChange:r=>console.log("value changed:",r.target.value)})},y={render:()=>{const r=se({name:E().required("Name is required"),email:E().email("Enter a valid email").required("Email is required")}),{register:a,handleSubmit:l,formState:{errors:n}}=ie({resolver:ue(r)});return i("form",{onSubmit:l(u=>{alert(`Submitted:
Name: ${u.name}
Email: ${u.email}`)}),className:"space-y-4 w-80",children:[i("div",{children:[o(s,t(e({placeholder:"Full name"},a("name")),{error:!!n.name})),n.name&&o("p",{className:"text-sm text-red-600",children:n.name.message})]}),i("div",{children:[o(s,t(e({type:"email",placeholder:"Email address"},a("email")),{error:!!n.email})),n.email&&o("p",{className:"text-sm text-red-600",children:n.email.message})]}),o("button",{type:"submit",className:"px-3 py-1 rounded bg-green-600 text-white text-sm",children:"Submit"})]})}};var V,z,F;c.parameters=t(e({},c.parameters),{docs:t(e({},(V=c.parameters)==null?void 0:V.docs),{source:e({originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
} satisfies Story`},(F=(z=c.parameters)==null?void 0:z.docs)==null?void 0:F.source)})});var W,_,D;m.parameters=t(e({},m.parameters),{docs:t(e({},(W=m.parameters)==null?void 0:W.docs),{source:e({originalSource:`{
  args: {
    placeholder: 'Disabled input',
    disabled: true
  }
} satisfies Story`},(D=(_=m.parameters)==null?void 0:_.docs)==null?void 0:D.source)})});var C,$,j;p.parameters=t(e({},p.parameters),{docs:t(e({},(C=p.parameters)==null?void 0:C.docs),{source:e({originalSource:`{
  args: {
    placeholder: 'Input with error',
    error: true
  }
} satisfies Story`},(j=($=p.parameters)==null?void 0:$.docs)==null?void 0:j.source)})});var k,B,O;f.parameters=t(e({},f.parameters),{docs:t(e({},(k=f.parameters)==null?void 0:k.docs),{source:e({originalSource:`{
  args: {
    placeholder: 'Full width input',
    fullWidth: true
  }
} satisfies Story`},(O=(B=f.parameters)==null?void 0:B.docs)==null?void 0:O.source)})});var R,U,T;h.parameters=t(e({},h.parameters),{docs:t(e({},(R=h.parameters)==null?void 0:R.docs),{source:e({originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      <Input placeholder="Small" size="sm" />
      <Input placeholder="Medium" size="md" />
      <Input placeholder="Large" size="lg" />
    </div>
} satisfies Story`},(T=(U=h.parameters)==null?void 0:U.docs)==null?void 0:T.source)})});var G,H,L;g.parameters=t(e({},g.parameters),{docs:t(e({},(G=g.parameters)==null?void 0:G.docs),{source:e({originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      <Input placeholder="Default" variant="default" />
      <Input placeholder="Filled" variant="filled" />
      <Input placeholder="Outline" variant="outline" />
      <Input placeholder="Ghost" variant="ghost" />
    </div>
} satisfies Story`},(L=(H=g.parameters)==null?void 0:H.docs)==null?void 0:L.source)})});var M,Y,A;v.parameters=t(e({},v.parameters),{docs:t(e({},(M=v.parameters)==null?void 0:M.docs),{source:e({originalSource:`{
  render: () => {
    const [value, setValue] = useState('');
    return <Input placeholder="Type here..." value={value} onChange={e => setValue(e.target.value)} />;
  }
} satisfies Story`},(A=(Y=v.parameters)==null?void 0:Y.docs)==null?void 0:A.source)})});var J,K,P;b.parameters=t(e({},b.parameters),{docs:t(e({},(J=b.parameters)==null?void 0:J.docs),{source:e({originalSource:`{
  render: () => <Input placeholder="Uncontrolled input" defaultValue="Initial value" onChange={e => console.log('value changed:', e.target.value)} />
} satisfies Story`},(P=(K=b.parameters)==null?void 0:K.docs)==null?void 0:P.source)})});var Q,X,Z;y.parameters=t(e({},y.parameters),{docs:t(e({},(Q=y.parameters)==null?void 0:Q.docs),{source:e({originalSource:`{
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
} satisfies Story`},(Z=(X=y.parameters)==null?void 0:X.docs)==null?void 0:Z.source)})});const Se=["Default","Disabled","WithError","FullWidth","Sizes","Variants","ControlledInput","UncontrolledInput","ReactHookFormWithYup"];export{v as ControlledInput,c as Default,m as Disabled,f as FullWidth,y as ReactHookFormWithYup,h as Sizes,b as UncontrolledInput,g as Variants,p as WithError,Se as __namedExportsOrder,xe as default};
