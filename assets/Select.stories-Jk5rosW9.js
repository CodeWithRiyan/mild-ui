var D=Object.defineProperty,E=Object.defineProperties;var P=Object.getOwnPropertyDescriptors;var S=Object.getOwnPropertySymbols;var Y=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable;var y=(t,e,o)=>e in t?D(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,a=(t,e)=>{for(var o in e||(e={}))Y.call(e,o)&&y(t,o,e[o]);if(S)for(var o of S(e))$.call(e,o)&&y(t,o,e[o]);return t},r=(t,e)=>E(t,P(e));import{j as p,a as s}from"./jsx-runtime-Cr617v10.js";import{r as O}from"./index-D2dH9QXU.js";import{u as R}from"./index.esm-0XuDu32R.js";import{c as U,d as k,o as B}from"./index.esm-CUaDp5zZ.js";import{Z as n,Y as H,z as I,I as L}from"./index-BfP1bvMz.js";import"./_commonjsHelpers-CDgoFxsB.js";import"./index-8BIPUTFA.js";const l=[{value:"us",label:"United States"},{value:"ca",label:"Canada"},{value:"mx",label:"Mexico"}],X={title:"Components/Select",tags:["autodocs"],component:n,argTypes:{value:{control:"text"},defaultValue:{control:"text"},placeholder:{control:"text"},disabled:{control:"boolean"},required:{control:"boolean"},name:{control:"text"},options:{control:!1},className:{control:!1},size:{control:{type:"radio"},options:["sm","md","lg"]},fullWidth:{control:"boolean"},error:{control:"boolean"},onChange:{action:"value changed"}}},c={args:{placeholder:"Select a country",options:l}},u={render:()=>{const[t,e]=O.useState("ca");return p("div",{className:"w-64",children:[s(n,{value:t,onChange:o=>e(o),options:l,placeholder:"Select a country"}),p("p",{className:"mt-2 text-sm text-gray-600",children:["Selected: ",t]})]})}},i={args:{placeholder:"Select a country",options:[{value:"us",label:"United States"},{value:"ca",label:"Canada",disabled:!0},{value:"mx",label:"Mexico"}]}},d={render:()=>p("div",{className:"space-y-4 w-64",children:[s(n,{placeholder:"Small",size:"sm",options:l,defaultValue:"us"}),s(n,{placeholder:"Medium",size:"md",options:l,defaultValue:"ca"}),s(n,{placeholder:"Large",size:"lg",options:l,defaultValue:"mx"})]})},m={render:()=>{const t=U({country:k().required("Please select a country")}),e=R({resolver:B(t),defaultValues:{country:""}}),o=j=>{alert(`Submitted country: ${j.country}`)};return s(H,r(a({},e),{children:p("form",{onSubmit:e.handleSubmit(o),className:"space-y-4 w-80",children:[s(I,{name:"country",label:"Country",description:"Please select your country from the list",required:!0,children:s(n,{placeholder:"Select a country",options:l})}),s(L,{type:"submit",children:"Submit"})]})}))}};var h,b,f;c.parameters=r(a({},c.parameters),{docs:r(a({},(h=c.parameters)==null?void 0:h.docs),{source:a({originalSource:`{
  args: {
    placeholder: "Select a country",
    options
  }
} satisfies Story`},(f=(b=c.parameters)==null?void 0:b.docs)==null?void 0:f.source)})});var v,g,x;u.parameters=r(a({},u.parameters),{docs:r(a({},(v=u.parameters)==null?void 0:v.docs),{source:a({originalSource:`{
  render: () => {
    const [value, setValue] = useState("ca");
    return <div className="w-64">
        <Select value={value} onChange={val => setValue(val)} options={options} placeholder="Select a country" />
        <p className="mt-2 text-sm text-gray-600">Selected: {value}</p>
      </div>;
  }
} satisfies Story`},(x=(g=u.parameters)==null?void 0:g.docs)==null?void 0:x.source)})});var V,z,C;i.parameters=r(a({},i.parameters),{docs:r(a({},(V=i.parameters)==null?void 0:V.docs),{source:a({originalSource:`{
  args: {
    placeholder: "Select a country",
    options: [{
      value: "us",
      label: "United States"
    }, {
      value: "ca",
      label: "Canada",
      disabled: true
    }, {
      value: "mx",
      label: "Mexico"
    }]
  }
} satisfies Story`},(C=(z=i.parameters)==null?void 0:z.docs)==null?void 0:C.source)})});var N,F,w;d.parameters=r(a({},d.parameters),{docs:r(a({},(N=d.parameters)==null?void 0:N.docs),{source:a({originalSource:`{
  render: () => <div className="space-y-4 w-64">
      <Select placeholder="Small" size="sm" options={options} defaultValue="us" />
      <Select placeholder="Medium" size="md" options={options} defaultValue="ca" />
      <Select placeholder="Large" size="lg" options={options} defaultValue="mx" />
    </div>
} satisfies Story`},(w=(F=d.parameters)==null?void 0:F.docs)==null?void 0:w.source)})});var q,M,W;m.parameters=r(a({},m.parameters),{docs:r(a({},(q=m.parameters)==null?void 0:q.docs),{source:a({originalSource:`{
  render: () => {
    const schema = yup.object({
      country: yup.string().required("Please select a country")
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        country: ""
      }
    });
    const onSubmit = (data: {
      country: string;
    }) => {
      alert(\`Submitted country: \${data.country}\`);
    };
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-80">
          <Field name="country" label="Country" description="Please select your country from the list" required>
            <Select placeholder="Select a country" options={options} />
          </Field>

          <Button type="submit">Submit</Button>
        </form>
      </Form>;
  }
} satisfies Story`},(W=(M=m.parameters)==null?void 0:M.docs)==null?void 0:W.source)})});const ee=["Default","Controlled","WithDisabledOptions","SizesExample","ReactHookFormWithYup"];export{u as Controlled,c as Default,m as ReactHookFormWithYup,d as SizesExample,i as WithDisabledOptions,ee as __namedExportsOrder,X as default};
