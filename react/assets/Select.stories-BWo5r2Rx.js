import{j as e}from"./jsx-runtime-DSvmvvsx.js";import{r as p}from"./index-B0WjJBI_.js";import{u as d}from"./index.esm-CbvOEqST.js";import{c as S,b as y,o as b}from"./index.esm-BhyIV8Ly.js";import{F as x,a as h}from"./react-hook-form-1I7SNVg-.js";import{S as t}from"./Select-Bn_coGlY.js";import{B as f}from"./Button-CSLSlcO9.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Form-DjjlGdbW.js";import"./cn-BaF2GUMg.js";import"./useMachine-DSGsW_My.js";import"./Label-mrk_WNRp.js";import"./icons-DN7Z3vsR.js";const o=[{value:"us",label:"United States"},{value:"ca",label:"Canada"},{value:"mx",label:"Mexico"}],q={title:"Components/Select",tags:["autodocs"],component:t,parameters:{docs:{description:{component:"Select-only combobox with a listbox popup: Arrow/Enter/Space open it, Arrow/Home/End move, typing jumps to an option, Enter/Space select, Escape and Tab close, per the [WAI-ARIA APG select-only combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/). Keyboard tests: `packages/react/src/components/Select/Select.test.tsx`."}}},argTypes:{value:{control:"text"},defaultValue:{control:"text"},placeholder:{control:"text"},disabled:{control:"boolean"},required:{control:"boolean"},name:{control:"text"},options:{control:!1},className:{control:!1},size:{control:{type:"radio"},options:["sm","md","lg"]},fullWidth:{control:"boolean"},error:{control:"boolean"},onChange:{action:"value changed"}}},s={args:{placeholder:"Select a country",options:o}},n={render:()=>{const[a,r]=p.useState("ca");return e.jsxs("div",{className:"w-64",children:[e.jsx(t,{value:a,onChange:i=>r(i),options:o,placeholder:"Select a country"}),e.jsxs("p",{className:"mt-2 text-sm text-gray-600",children:["Selected: ",a]})]})}},l={args:{placeholder:"Select a country",options:[{value:"us",label:"United States"},{value:"ca",label:"Canada",disabled:!0},{value:"mx",label:"Mexico"}]}},c={render:()=>e.jsxs("div",{className:"space-y-4 w-64",children:[e.jsx(t,{placeholder:"Small",size:"sm",options:o,defaultValue:"us"}),e.jsx(t,{placeholder:"Medium",size:"md",options:o,defaultValue:"ca"}),e.jsx(t,{placeholder:"Large",size:"lg",options:o,defaultValue:"mx"})]})},u={render:()=>{const a=S({country:y().required("Please select a country")}),r=d({resolver:b(a),defaultValues:{country:""}}),i=m=>{alert(`Submitted country: ${m.country}`)};return e.jsx(x,{...r,children:e.jsxs("form",{onSubmit:r.handleSubmit(i),className:"space-y-4 w-80",children:[e.jsx(h,{name:"country",label:"Country",description:"Please select your country from the list",required:!0,children:e.jsx(t,{placeholder:"Select a country",options:o})}),e.jsx(f,{type:"submit",children:"Submit"})]})})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
} satisfies Story`,...u.parameters?.docs?.source}}};const M=["Default","Controlled","WithDisabledOptions","SizesExample","ReactHookFormWithYup"];export{n as Controlled,s as Default,u as ReactHookFormWithYup,c as SizesExample,l as WithDisabledOptions,M as __namedExportsOrder,q as default};
