import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{c as P,a as N,b as q,d as z,o as D}from"./index.esm-CDmTEbLs.js";import{r as j}from"./index-B2-qRKKC.js";import{u as T,F as $}from"./index.esm-B5r5kaiW.js";import{C as r}from"./Checkbox-CjyB4jnv.js";import{F,a as M,b as R}from"./Form-6r68mTog.js";import{B}from"./Button-tFE5omYn.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-ChlNXIGl.js";import"./index-Bagf71Y5.js";import"./index-DnB962Pj.js";import"./cn-Dtjc6EhN.js";import"./check-CT2wzrsh.js";import"./createLucideIcon-DyoHGKTE.js";import"./Label-Dk0OgnlF.js";const Z={title:"Components/Checkbox",tags:["autodocs"],component:r,parameters:{layout:"centered",docs:{description:{component:"A versatile checkbox component with multiple sizes and states."}}},argTypes:{size:{control:{type:"radio"},options:["sm","md","lg"]},checked:{control:"boolean"},defaultChecked:{control:"boolean"},disabled:{control:"boolean"},required:{control:"boolean"},indeterminate:{control:"boolean"},label:{control:"text"},name:{control:"text"},value:{control:"text"},className:{control:!1},id:{control:"text"},onCheckedChange:{control:!1,action:"checked changed"}}},p={args:{label:"Accept terms and conditions"}},b={args:{label:"Receive newsletter",checked:!0}},k={args:{label:"Disabled option",disabled:!0,checked:!1}},f={args:{label:"Partial selection",indeterminate:!0}},C={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{label:"Small checkbox",size:"sm"}),e.jsx(r,{label:"Medium checkbox",size:"md"}),e.jsx(r,{label:"Large checkbox",size:"lg"})]})},g={render:()=>{const[n,t]=j.useState(!1);return e.jsx(r,{label:`Controlled checkbox (${n?"checked":"unchecked"})`,checked:n,onCheckedChange:a=>t(a===!0)})}},S={render:()=>e.jsx(r,{label:"Uncontrolled checkbox",defaultChecked:!0,onCheckedChange:n=>console.log("checked changed:",n)})},x={render:()=>{const[n,t]=j.useState("indeterminate"),a=()=>{t(n==="indeterminate"?!0:n===!0?!1:"indeterminate")};return e.jsx(r,{label:`State: ${String(n)}`,checked:n==="indeterminate"?!1:n,indeterminate:n==="indeterminate",onCheckedChange:a})}},v={render:()=>{const n=P({terms:N().required().oneOf([!0],"You must accept the terms and conditions"),newsletter:N().required(),marketing:N().required()}),t=T({resolver:D(n),defaultValues:{terms:!1,newsletter:!1,marketing:!1}}),{handleSubmit:a}=t,o=i=>{alert(`Submitted:
Terms: ${i.terms}
Newsletter: ${i.newsletter}
Marketing: ${i.marketing}`)};return e.jsx($,{...t,children:e.jsxs("form",{onSubmit:a(o),className:"space-y-4 w-80",children:[e.jsx(F,{name:"terms",isBoolean:!0,children:e.jsx(r,{label:"I accept the terms and conditions",required:!0})}),e.jsx(F,{name:"newsletter",isBoolean:!0,children:e.jsx(r,{label:"Subscribe to newsletter"})}),e.jsx(F,{name:"marketing",isBoolean:!0,children:e.jsx(r,{label:"Receive marketing emails"})}),e.jsx(B,{type:"submit",children:"Submit"})]})})}},w={render:()=>{const n=P({newsletter:q(z().required()).required().min(1,"Please select at least one option")}),t=T({resolver:D(n),defaultValues:{newsletter:[]}}),{watch:a,setValue:o,handleSubmit:i,formState:{errors:m}}=t,l=a("newsletter")??[],d=(s,u)=>{u?o("newsletter",[...l,s]):o("newsletter",l.filter(I=>I!==s))},c=s=>{alert(`Selected: ${s.newsletter.join(", ")}`)},h=[{value:"tech",label:"Technology"},{value:"health",label:"Health & Wellness"},{value:"finance",label:"Finance & Investing"},{value:"travel",label:"Travel & Adventure"},{value:"food",label:"Food & Recipes"},{value:"sports",label:"Sports & Fitness"},{value:"entertainment",label:"Movies & TV Shows"},{value:"science",label:"Science & Innovation"}];return e.jsx($,{...t,children:e.jsxs("form",{onSubmit:i(c),className:"space-y-4 w-80",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(M,{id:"newsletter",error:!!m.newsletter,children:"Select newsletter topics you're interested in:"}),e.jsx("div",{className:"space-y-2",children:h.map(s=>e.jsx(F,{name:"newsletter",hideError:!0,children:e.jsx(r,{label:s.label,value:s.value,checked:l.includes(s.value),onCheckedChange:u=>{u&&t.clearErrors("newsletter"),d(s.value,u===!0)}})},s.value))}),m.newsletter&&e.jsx(R,{children:m.newsletter.message})]}),e.jsx(B,{type:"submit",children:"Submit Selection"})]})})}},y={render:()=>{const[n,t]=j.useState("indeterminate"),[a,o]=j.useState([!1,!0,!1]),i=()=>{n===!0?(o([!1,!1,!1]),t(!1)):(o([!0,!0,!0]),t(!0))},m=(l,d)=>{const c=[...a];c[l]=d,o(c);const h=c.filter(Boolean).length;h===0?t(!1):h===c.length?t(!0):t("indeterminate")};return e.jsxs("div",{className:"space-y-3 w-80",children:[e.jsx("div",{children:e.jsx(r,{label:"Select All Features",checked:n==="indeterminate"?!1:n,indeterminate:n==="indeterminate",onCheckedChange:i,size:"lg"})}),e.jsx("div",{className:"ml-6 space-y-2",children:["Dark Mode","Notifications","Auto-save"].map((l,d)=>e.jsx(r,{label:l,checked:a[d],onCheckedChange:c=>m(d,c===!0)},l))})]})}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Accept terms and conditions"
  }
} satisfies Story`,...p.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Receive newsletter",
    checked: true
  }
} satisfies Story`,...b.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Disabled option",
    disabled: true,
    checked: false
  }
} satisfies Story`,...k.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Partial selection",
    indeterminate: true
  }
} satisfies Story`,...f.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox" size="md" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
} satisfies Story`,...C.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Checkbox label={\`Controlled checkbox (\${checked ? "checked" : "unchecked"})\`} checked={checked} onCheckedChange={(val: any) => setChecked(val === true)} />;
  }
} satisfies Story`,...g.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Checkbox label="Uncontrolled checkbox" defaultChecked={true} onCheckedChange={(val: any) => console.log("checked changed:", val)} />
} satisfies Story`,...S.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [state, setState] = useState<boolean | "indeterminate">("indeterminate");
    const handleToggle = () => {
      if (state === "indeterminate") setState(true);else if (state === true) setState(false);else setState("indeterminate");
    };
    return <Checkbox label={\`State: \${String(state)}\`} checked={state === "indeterminate" ? false : state} indeterminate={state === "indeterminate"} onCheckedChange={handleToggle} />;
  }
} satisfies Story`,...x.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const schema = yup.object({
      terms: yup.boolean().required().oneOf([true], "You must accept the terms and conditions"),
      newsletter: yup.boolean().required(),
      marketing: yup.boolean().required()
    });
    type FormData = yup.InferType<typeof schema>;
    const form = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        terms: false,
        newsletter: false,
        marketing: false
      }
    });
    const {
      handleSubmit
    } = form;
    const onSubmit = (data: FormData) => {
      alert(\`Submitted:\\nTerms: \${data.terms}\\nNewsletter: \${data.newsletter}\\nMarketing: \${data.marketing}\`);
    };
    return <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
          <Field name="terms" isBoolean>
            <Checkbox label="I accept the terms and conditions" required />
          </Field>

          <Field name="newsletter" isBoolean>
            <Checkbox label="Subscribe to newsletter" />
          </Field>

          <Field name="marketing" isBoolean>
            <Checkbox label="Receive marketing emails" />
          </Field>

          <Button type="submit">Submit</Button>
        </form>
      </Form>;
  }
} satisfies Story`,...v.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const schema = yup.object({
      newsletter: yup.array(yup.string().required()).required().min(1, "Please select at least one option")
    });
    type FormData = yup.InferType<typeof schema>;
    const form = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        newsletter: []
      }
    });
    const {
      watch,
      setValue,
      handleSubmit,
      formState: {
        errors
      }
    } = form;
    const newsletter = watch("newsletter") ?? [];
    const handleCheckboxChange = (value: string, checked: boolean) => {
      if (checked) {
        setValue("newsletter", [...newsletter, value]);
      } else {
        setValue("newsletter", newsletter.filter(item => item !== value));
      }
    };
    const onSubmit = (data: FormData) => {
      alert(\`Selected: \${data.newsletter.join(", ")}\`);
    };
    const options = [{
      value: "tech",
      label: "Technology"
    }, {
      value: "health",
      label: "Health & Wellness"
    }, {
      value: "finance",
      label: "Finance & Investing"
    }, {
      value: "travel",
      label: "Travel & Adventure"
    }, {
      value: "food",
      label: "Food & Recipes"
    }, {
      value: "sports",
      label: "Sports & Fitness"
    }, {
      value: "entertainment",
      label: "Movies & TV Shows"
    }, {
      value: "science",
      label: "Science & Innovation"
    }];
    return <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
          <div className="space-y-2">
            <FormLabel id="newsletter" error={!!errors.newsletter}>
              Select newsletter topics you're interested in:
            </FormLabel>
            <div className="space-y-2">
              {options.map(option => <Field key={option.value} name="newsletter" hideError>
                  <Checkbox label={option.label} value={option.value} checked={newsletter.includes(option.value)} onCheckedChange={checked => {
                checked && form.clearErrors("newsletter");
                handleCheckboxChange(option.value, checked === true);
              }} />
                </Field>)}
            </div>
            {errors.newsletter && <FormMessage>{errors.newsletter.message}</FormMessage>}
          </div>

          <Button type="submit">Submit Selection</Button>
        </form>
      </Form>;
  }
} satisfies Story`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [parentChecked, setParentChecked] = useState<boolean | "indeterminate">("indeterminate");
    const [childrenChecked, setChildrenChecked] = useState([false, true, false]);
    const handleParentChange = () => {
      if (parentChecked === true) {
        // Uncheck all
        setChildrenChecked([false, false, false]);
        setParentChecked(false);
      } else {
        // Check all
        setChildrenChecked([true, true, true]);
        setParentChecked(true);
      }
    };
    const handleChildChange = (index: number, checked: boolean) => {
      const newChildren = [...childrenChecked];
      newChildren[index] = checked;
      setChildrenChecked(newChildren);

      // Update parent state
      const checkedCount = newChildren.filter(Boolean).length;
      if (checkedCount === 0) {
        setParentChecked(false);
      } else if (checkedCount === newChildren.length) {
        setParentChecked(true);
      } else {
        setParentChecked("indeterminate");
      }
    };
    return <div className="space-y-3 w-80">
        <div>
          <Checkbox label="Select All Features" checked={parentChecked === "indeterminate" ? false : parentChecked} indeterminate={parentChecked === "indeterminate"} onCheckedChange={handleParentChange} size="lg" />
        </div>

        <div className="ml-6 space-y-2">
          {["Dark Mode", "Notifications", "Auto-save"].map((feature, index) => <Checkbox key={feature} label={feature} checked={childrenChecked[index]} onCheckedChange={checked => handleChildChange(index, checked === true)} />)}
        </div>
      </div>;
  }
} satisfies Story`,...y.parameters?.docs?.source}}};const ee=["Default","Checked","Disabled","Indeterminate","WithDifferentSizes","ControlledCheckbox","UncontrolledCheckbox","ToggleableIndeterminate","ReactHookFormWithYup","CheckboxGroup","IndeterminateParentChild"];export{w as CheckboxGroup,b as Checked,g as ControlledCheckbox,p as Default,k as Disabled,f as Indeterminate,y as IndeterminateParentChild,v as ReactHookFormWithYup,x as ToggleableIndeterminate,S as UncontrolledCheckbox,C as WithDifferentSizes,ee as __namedExportsOrder,Z as default};
