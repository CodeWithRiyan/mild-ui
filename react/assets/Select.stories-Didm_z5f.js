import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as d}from"./index-B2-qRKKC.js";import{u as p,F as S}from"./index.esm-B5r5kaiW.js";import{c as y,d as h,o as f}from"./index.esm-CDmTEbLs.js";import{S as t}from"./Select-C9hfbVqi.js";import{F as x}from"./Form-6r68mTog.js";import{B as b}from"./Button-tFE5omYn.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-Bagf71Y5.js";import"./index-ChlNXIGl.js";import"./index-cxmg2vMN.js";import"./cn-Dtjc6EhN.js";import"./createLucideIcon-DyoHGKTE.js";import"./check-CT2wzrsh.js";import"./Label-Dk0OgnlF.js";const o=[{value:"us",label:"United States"},{value:"ca",label:"Canada"},{value:"mx",label:"Mexico"}],D={title:"Components/Select",tags:["autodocs"],component:t,argTypes:{value:{control:"text"},defaultValue:{control:"text"},placeholder:{control:"text"},disabled:{control:"boolean"},required:{control:"boolean"},name:{control:"text"},options:{control:!1},className:{control:!1},size:{control:{type:"radio"},options:["sm","md","lg"]},fullWidth:{control:"boolean"},error:{control:"boolean"},onChange:{action:"value changed"}}},s={args:{placeholder:"Select a country",options:o}},n={render:()=>{const[a,r]=d.useState("ca");return e.jsxs("div",{className:"w-64",children:[e.jsx(t,{value:a,onChange:i=>r(i),options:o,placeholder:"Select a country"}),e.jsxs("p",{className:"mt-2 text-sm text-gray-600",children:["Selected: ",a]})]})}},l={args:{placeholder:"Select a country",options:[{value:"us",label:"United States"},{value:"ca",label:"Canada",disabled:!0},{value:"mx",label:"Mexico"}]}},c={render:()=>e.jsxs("div",{className:"space-y-4 w-64",children:[e.jsx(t,{placeholder:"Small",size:"sm",options:o,defaultValue:"us"}),e.jsx(t,{placeholder:"Medium",size:"md",options:o,defaultValue:"ca"}),e.jsx(t,{placeholder:"Large",size:"lg",options:o,defaultValue:"mx"})]})},u={render:()=>{const a=y({country:h().required("Please select a country")}),r=p({resolver:f(a),defaultValues:{country:""}}),i=m=>{alert(`Submitted country: ${m.country}`)};return e.jsx(S,{...r,children:e.jsxs("form",{onSubmit:r.handleSubmit(i),className:"space-y-4 w-80",children:[e.jsx(x,{name:"country",label:"Country",description:"Please select your country from the list",required:!0,children:e.jsx(t,{placeholder:"Select a country",options:o})}),e.jsx(b,{type:"submit",children:"Submit"})]})})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Select a country",
    options
  }
} satisfies Story`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("ca");
    return <div className="w-64">
        <Select value={value} onChange={val => setValue(val)} options={options} placeholder="Select a country" />
        <p className="mt-2 text-sm text-gray-600">Selected: {value}</p>
      </div>;
  }
} satisfies Story`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
} satisfies Story`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-64">
      <Select placeholder="Small" size="sm" options={options} defaultValue="us" />
      <Select placeholder="Medium" size="md" options={options} defaultValue="ca" />
      <Select placeholder="Large" size="lg" options={options} defaultValue="mx" />
    </div>
} satisfies Story`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
} satisfies Story`,...u.parameters?.docs?.source}}};const R=["Default","Controlled","WithDisabledOptions","SizesExample","ReactHookFormWithYup"];export{n as Controlled,s as Default,u as ReactHookFormWithYup,c as SizesExample,l as WithDisabledOptions,R as __namedExportsOrder,D as default};
