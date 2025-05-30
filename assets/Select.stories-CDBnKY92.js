var j=Object.defineProperty,B=Object.defineProperties;var D=Object.getOwnPropertyDescriptors;var S=Object.getOwnPropertySymbols;var E=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable;var y=(o,e,a)=>e in o?j(o,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[e]=a,t=(o,e)=>{for(var a in e||(e={}))E.call(e,a)&&y(o,a,e[a]);if(S)for(var a of S(e))$.call(e,a)&&y(o,a,e[a]);return o},r=(o,e)=>B(o,D(e));import{j as p,a as s}from"./jsx-runtime-Cr617v10.js";import{r as O}from"./index-D2dH9QXU.js";import{u as R,F as U}from"./index.esm-CovI7bOW.js";import{c as k,d as H,o as L}from"./index.esm-8fDv6iyI.js";import{S as n}from"./Select-CS_Z7Pq3.js";import{F as Y}from"./Form-6JD4W4bJ.js";import{B as _}from"./Button-DodV_9Wl.js";import"./_commonjsHelpers-CDgoFxsB.js";import"./index-8BIPUTFA.js";import"./index-BrWEkG-Y.js";import"./index-BMJj23KH.js";import"./index-yjVGmfkS.js";import"./index-C09-6gTJ.js";import"./createLucideIcon-ChpYCihM.js";import"./cn-C4RepMSz.js";import"./check-icXTfRpT.js";import"./Label-BIqHYFl8.js";const l=[{value:"us",label:"United States"},{value:"ca",label:"Canada"},{value:"mx",label:"Mexico"}],ue={title:"Components/Select",tags:["autodocs"],component:n,argTypes:{value:{control:"text"},defaultValue:{control:"text"},placeholder:{control:"text"},disabled:{control:"boolean"},required:{control:"boolean"},name:{control:"text"},options:{control:!1},className:{control:!1},size:{control:{type:"radio"},options:["sm","md","lg"]},fullWidth:{control:"boolean"},error:{control:"boolean"},onChange:{action:"value changed"}}},c={args:{placeholder:"Select a country",options:l}},u={render:()=>{const[o,e]=O.useState("ca");return p("div",{className:"w-64",children:[s(n,{value:o,onChange:a=>e(a),options:l,placeholder:"Select a country"}),p("p",{className:"mt-2 text-sm text-gray-600",children:["Selected: ",o]})]})}},i={args:{placeholder:"Select a country",options:[{value:"us",label:"United States"},{value:"ca",label:"Canada",disabled:!0},{value:"mx",label:"Mexico"}]}},m={render:()=>p("div",{className:"space-y-4 w-64",children:[s(n,{placeholder:"Small",size:"sm",options:l,defaultValue:"us"}),s(n,{placeholder:"Medium",size:"md",options:l,defaultValue:"ca"}),s(n,{placeholder:"Large",size:"lg",options:l,defaultValue:"mx"})]})},d={render:()=>{const o=k({country:H().required("Please select a country")}),e=R({resolver:L(o),defaultValues:{country:""}}),a=W=>{alert(`Submitted country: ${W.country}`)};return s(U,r(t({},e),{children:p("form",{onSubmit:e.handleSubmit(a),className:"space-y-4 w-80",children:[s(Y,{name:"country",label:"Country",description:"Please select your country from the list",required:!0,children:s(n,{placeholder:"Select a country",options:l})}),s(_,{type:"submit",children:"Submit"})]})}))}};var h,f,b;c.parameters=r(t({},c.parameters),{docs:r(t({},(h=c.parameters)==null?void 0:h.docs),{source:t({originalSource:`{
  args: {
    placeholder: "Select a country",
    options
  }
} satisfies Story`},(b=(f=c.parameters)==null?void 0:f.docs)==null?void 0:b.source)})});var v,g,x;u.parameters=r(t({},u.parameters),{docs:r(t({},(v=u.parameters)==null?void 0:v.docs),{source:t({originalSource:`{
  render: () => {
    const [value, setValue] = useState("ca");
    return <div className="w-64">
        <Select value={value} onChange={val => setValue(val)} options={options} placeholder="Select a country" />
        <p className="mt-2 text-sm text-gray-600">Selected: {value}</p>
      </div>;
  }
} satisfies Story`},(x=(g=u.parameters)==null?void 0:g.docs)==null?void 0:x.source)})});var F,V,C;i.parameters=r(t({},i.parameters),{docs:r(t({},(F=i.parameters)==null?void 0:F.docs),{source:t({originalSource:`{
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
} satisfies Story`},(C=(V=i.parameters)==null?void 0:V.docs)==null?void 0:C.source)})});var z,N,w;m.parameters=r(t({},m.parameters),{docs:r(t({},(z=m.parameters)==null?void 0:z.docs),{source:t({originalSource:`{
  render: () => <div className="space-y-4 w-64">
      <Select placeholder="Small" size="sm" options={options} defaultValue="us" />
      <Select placeholder="Medium" size="md" options={options} defaultValue="ca" />
      <Select placeholder="Large" size="lg" options={options} defaultValue="mx" />
    </div>
} satisfies Story`},(w=(N=m.parameters)==null?void 0:N.docs)==null?void 0:w.source)})});var q,M,P;d.parameters=r(t({},d.parameters),{docs:r(t({},(q=d.parameters)==null?void 0:q.docs),{source:t({originalSource:`{
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
} satisfies Story`},(P=(M=d.parameters)==null?void 0:M.docs)==null?void 0:P.source)})});const ie=["Default","Controlled","WithDisabledOptions","SizesExample","ReactHookFormWithYup"];export{u as Controlled,c as Default,d as ReactHookFormWithYup,m as SizesExample,i as WithDisabledOptions,ie as __namedExportsOrder,ue as default};
