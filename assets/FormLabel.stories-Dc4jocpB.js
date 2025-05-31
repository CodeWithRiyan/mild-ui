var G=Object.defineProperty,J=Object.defineProperties;var Q=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var X=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable;var q=(r,n,t)=>n in r?G(r,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[n]=t,e=(r,n)=>{for(var t in n||(n={}))X.call(n,t)&&q(r,t,n[t]);if(w)for(var t of w(n))Y.call(n,t)&&q(r,t,n[t]);return r},a=(r,n)=>J(r,Q(n));import{a as o,j as i}from"./jsx-runtime-Cr617v10.js";import{u as O,F as k}from"./index.esm-0XuDu32R.js";import{H as s,l as F,U as L,b as g,u as y}from"./index-BfP1bvMz.js";import{R as z}from"./index-D2dH9QXU.js";import"./index-8BIPUTFA.js";import"./_commonjsHelpers-CDgoFxsB.js";const tr={title:"Components/Form/FormLabel",component:s,parameters:{layout:"centered",docs:{description:{component:"A form label component that automatically handles error states and accessibility attributes."}}},argTypes:{children:{control:"text",description:"Label text content"},required:{control:"boolean",description:"Show required indicator"},className:{control:"text",description:"Additional CSS classes"}}},l=({children:r,hasError:n=!1,fieldName:t="testField"})=>{const d=O({defaultValues:{[t]:""}});return z.useEffect(()=>{n&&d.setError(t,{type:"manual",message:"This field has an error"})},[n,t,d]),o(k,a(e({},d),{children:o(F,{control:d.control,name:t,render:()=>i(L,{children:[r,o(g,{children:o(y,{placeholder:"Sample input"})})]})})}))},c={render:r=>o(l,{children:o(s,a(e({},r),{children:"Username"}))}),parameters:{docs:{storyDescription:"A basic form label without any special states."}}},m={render:r=>o(l,{children:o(s,a(e({},r),{required:!0,children:"Email Address"}))}),parameters:{docs:{storyDescription:"A form label with a required indicator."}}},p={render:r=>o(l,{hasError:!0,children:o(s,a(e({},r),{children:"Password"}))}),parameters:{docs:{storyDescription:"A form label in error state showing error styling."}}},u={render:r=>o(l,{children:o(s,a(e({},r),{className:"text-lg font-bold text-blue-600",children:"Custom Styled Label"}))}),parameters:{docs:{storyDescription:"A form label with custom CSS styling applied."}}},b={render:r=>o(l,{children:o(s,a(e({},r),{children:"This is a very long label that demonstrates how the component handles longer text content"}))}),parameters:{docs:{storyDescription:"A form label with long text content to test text wrapping behavior."}}},h={render:r=>o(l,{hasError:!0,children:o(s,a(e({},r),{required:!0,children:"Required Field with Error"}))}),parameters:{docs:{storyDescription:"A required form label that also has an error state."}}},f={render:()=>{const r=O({defaultValues:{field1:"",field2:"",field3:""}});return z.useEffect(()=>{r.setError("field2",{type:"manual",message:"This field has an error"})},[r]),o(k,a(e({},r),{children:i("div",{className:"space-y-4 w-80",children:[o(F,{control:r.control,name:"field1",render:()=>i(L,{children:[o(s,{children:"Normal Label"}),o(g,{children:o(y,{placeholder:"Normal field"})})]})}),o(F,{control:r.control,name:"field2",render:()=>i(L,{children:[o(s,{children:"Label with Error"}),o(g,{children:o(y,{placeholder:"Field with error"})})]})}),o(F,{control:r.control,name:"field3",render:()=>i(L,{children:[o(s,{required:!0,children:"Required Label"}),o(g,{children:o(y,{placeholder:"Required field"})})]})})]})}))},parameters:{docs:{storyDescription:"Multiple form labels showing different states side by side."}}};var E,S,x;c.parameters=a(e({},c.parameters),{docs:a(e({},(E=c.parameters)==null?void 0:E.docs),{source:e({originalSource:`{
  render: args => <FormLabelWrapper>
      <FormLabel {...args}>Username</FormLabel>
    </FormLabelWrapper>,
  parameters: {
    docs: {
      storyDescription: "A basic form label without any special states."
    }
  }
}`},(x=(S=c.parameters)==null?void 0:S.docs)==null?void 0:x.source)})});var W,A,C;m.parameters=a(e({},m.parameters),{docs:a(e({},(W=m.parameters)==null?void 0:W.docs),{source:e({originalSource:`{
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
}`},(C=(A=m.parameters)==null?void 0:A.docs)==null?void 0:C.source)})});var D,R,v;p.parameters=a(e({},p.parameters),{docs:a(e({},(D=p.parameters)==null?void 0:D.docs),{source:e({originalSource:`{
  render: args => <FormLabelWrapper hasError>
      <FormLabel {...args}>Password</FormLabel>
    </FormLabelWrapper>,
  parameters: {
    docs: {
      storyDescription: "A form label in error state showing error styling."
    }
  }
}`},(v=(R=p.parameters)==null?void 0:R.docs)==null?void 0:v.source)})});var I,N,T;u.parameters=a(e({},u.parameters),{docs:a(e({},(I=u.parameters)==null?void 0:I.docs),{source:e({originalSource:`{
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
}`},(T=(N=u.parameters)==null?void 0:N.docs)==null?void 0:T.source)})});var P,M,U;b.parameters=a(e({},b.parameters),{docs:a(e({},(P=b.parameters)==null?void 0:P.docs),{source:e({originalSource:`{
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
}`},(U=(M=b.parameters)==null?void 0:M.docs)==null?void 0:U.source)})});var j,V,B;h.parameters=a(e({},h.parameters),{docs:a(e({},(j=h.parameters)==null?void 0:j.docs),{source:e({originalSource:`{
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
}`},(B=(V=h.parameters)==null?void 0:V.docs)==null?void 0:B.source)})});var H,_,K;f.parameters=a(e({},f.parameters),{docs:a(e({},(H=f.parameters)==null?void 0:H.docs),{source:e({originalSource:`{
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
}`},(K=(_=f.parameters)==null?void 0:_.docs)==null?void 0:K.source)})});const sr=["BasicLabel","RequiredLabel","LabelWithError","CustomStyledLabel","LongLabel","RequiredWithError","MultipleLabels"];export{c as BasicLabel,u as CustomStyledLabel,p as LabelWithError,b as LongLabel,f as MultipleLabels,m as RequiredLabel,h as RequiredWithError,sr as __namedExportsOrder,tr as default};
