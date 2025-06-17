import{j as r}from"./jsx-runtime-DF2Pcvd1.js";import{u as L,F as x}from"./index.esm-B5r5kaiW.js";import{R as g}from"./index-B2-qRKKC.js";import{a as o,d as u,e as b,f as h}from"./Form-6r68mTog.js";import{I as F}from"./Input-uNLkzt6C.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cn-Dtjc6EhN.js";import"./Label-Dk0OgnlF.js";const C={title:"Components/Form/FormLabel",component:o,parameters:{layout:"centered",docs:{description:{component:"A form label component that automatically handles error states and accessibility attributes."}}},argTypes:{children:{control:"text",description:"Label text content"},required:{control:"boolean",description:"Show required indicator"},className:{control:"text",description:"Additional CSS classes"}}},a=({children:e,hasError:f=!1,fieldName:s="testField"})=>{const n=L({defaultValues:{[s]:""}});return g.useEffect(()=>{f&&n.setError(s,{type:"manual",message:"This field has an error"})},[f,s,n]),r.jsx(x,{...n,children:r.jsx(u,{control:n.control,name:s,render:()=>r.jsxs(b,{children:[e,r.jsx(h,{children:r.jsx(F,{placeholder:"Sample input"})})]})})})},t={render:e=>r.jsx(a,{children:r.jsx(o,{...e,children:"Username"})}),parameters:{docs:{storyDescription:"A basic form label without any special states."}}},l={render:e=>r.jsx(a,{children:r.jsx(o,{...e,required:!0,children:"Email Address"})}),parameters:{docs:{storyDescription:"A form label with a required indicator."}}},i={render:e=>r.jsx(a,{hasError:!0,children:r.jsx(o,{...e,children:"Password"})}),parameters:{docs:{storyDescription:"A form label in error state showing error styling."}}},d={render:e=>r.jsx(a,{children:r.jsx(o,{...e,className:"text-lg font-bold text-blue-600",children:"Custom Styled Label"})}),parameters:{docs:{storyDescription:"A form label with custom CSS styling applied."}}},m={render:e=>r.jsx(a,{children:r.jsx(o,{...e,children:"This is a very long label that demonstrates how the component handles longer text content"})}),parameters:{docs:{storyDescription:"A form label with long text content to test text wrapping behavior."}}},c={render:e=>r.jsx(a,{hasError:!0,children:r.jsx(o,{...e,required:!0,children:"Required Field with Error"})}),parameters:{docs:{storyDescription:"A required form label that also has an error state."}}},p={render:()=>{const e=L({defaultValues:{field1:"",field2:"",field3:""}});return g.useEffect(()=>{e.setError("field2",{type:"manual",message:"This field has an error"})},[e]),r.jsx(x,{...e,children:r.jsxs("div",{className:"space-y-4 w-80",children:[r.jsx(u,{control:e.control,name:"field1",render:()=>r.jsxs(b,{children:[r.jsx(o,{children:"Normal Label"}),r.jsx(h,{children:r.jsx(F,{placeholder:"Normal field"})})]})}),r.jsx(u,{control:e.control,name:"field2",render:()=>r.jsxs(b,{children:[r.jsx(o,{children:"Label with Error"}),r.jsx(h,{children:r.jsx(F,{placeholder:"Field with error"})})]})}),r.jsx(u,{control:e.control,name:"field3",render:()=>r.jsxs(b,{children:[r.jsx(o,{required:!0,children:"Required Label"}),r.jsx(h,{children:r.jsx(F,{placeholder:"Required field"})})]})})]})})},parameters:{docs:{storyDescription:"Multiple form labels showing different states side by side."}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <FormLabelWrapper>
      <FormLabel {...args}>Username</FormLabel>
    </FormLabelWrapper>,
  parameters: {
    docs: {
      storyDescription: "A basic form label without any special states."
    }
  }
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <FormLabelWrapper>
      <FormLabel {...args} required>
        Email Address
      </FormLabel>
    </FormLabelWrapper>,
  parameters: {
    docs: {
      storyDescription: "A form label with a required indicator."
    }
  }
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => <FormLabelWrapper hasError>
      <FormLabel {...args}>Password</FormLabel>
    </FormLabelWrapper>,
  parameters: {
    docs: {
      storyDescription: "A form label in error state showing error styling."
    }
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <FormLabelWrapper>
      <FormLabel {...args} className="text-lg font-bold text-blue-600">
        Custom Styled Label
      </FormLabel>
    </FormLabelWrapper>,
  parameters: {
    docs: {
      storyDescription: "A form label with custom CSS styling applied."
    }
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => <FormLabelWrapper>
      <FormLabel {...args}>
        This is a very long label that demonstrates how the component handles
        longer text content
      </FormLabel>
    </FormLabelWrapper>,
  parameters: {
    docs: {
      storyDescription: "A form label with long text content to test text wrapping behavior."
    }
  }
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <FormLabelWrapper hasError>
      <FormLabel {...args} required>
        Required Field with Error
      </FormLabel>
    </FormLabelWrapper>,
  parameters: {
    docs: {
      storyDescription: "A required form label that also has an error state."
    }
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const form = useForm({
      defaultValues: {
        field1: "",
        field2: "",
        field3: ""
      }
    });
    React.useEffect(() => {
      form.setError("field2", {
        type: "manual",
        message: "This field has an error"
      });
    }, [form]);
    return <FormProvider {...form}>
        <div className="space-y-4 w-80">
          <FormField control={form.control} name="field1" render={() => <FormItem>
                <FormLabel>Normal Label</FormLabel>
                <FormControl>
                  <Input placeholder="Normal field" />
                </FormControl>
              </FormItem>} />

          <FormField control={form.control} name="field2" render={() => <FormItem>
                <FormLabel>Label with Error</FormLabel>
                <FormControl>
                  <Input placeholder="Field with error" />
                </FormControl>
              </FormItem>} />

          <FormField control={form.control} name="field3" render={() => <FormItem>
                <FormLabel required>Required Label</FormLabel>
                <FormControl>
                  <Input placeholder="Required field" />
                </FormControl>
              </FormItem>} />
        </div>
      </FormProvider>;
  },
  parameters: {
    docs: {
      storyDescription: "Multiple form labels showing different states side by side."
    }
  }
}`,...p.parameters?.docs?.source}}};const D=["BasicLabel","RequiredLabel","LabelWithError","CustomStyledLabel","LongLabel","RequiredWithError","MultipleLabels"];export{t as BasicLabel,d as CustomStyledLabel,i as LabelWithError,m as LongLabel,p as MultipleLabels,l as RequiredLabel,c as RequiredWithError,D as __namedExportsOrder,C as default};
