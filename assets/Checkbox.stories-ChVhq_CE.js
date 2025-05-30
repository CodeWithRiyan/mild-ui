var ge=Object.defineProperty,Se=Object.defineProperties;var ve=Object.getOwnPropertyDescriptors;var I=Object.getOwnPropertySymbols;var we=Object.prototype.hasOwnProperty,ye=Object.prototype.propertyIsEnumerable;var q=(t,n,s)=>n in t?ge(t,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[n]=s,e=(t,n)=>{for(var s in n||(n={}))we.call(n,s)&&q(t,s,n[s]);if(I)for(var s of I(n))ye.call(n,s)&&q(t,s,n[s]);return t},r=(t,n)=>Se(t,ve(n));import{j as p,a}from"./jsx-runtime-Cr617v10.js";import{c as ue,a as $,b as xe,d as Fe,o as pe}from"./index.esm-8fDv6iyI.js";import{r as T}from"./index-D2dH9QXU.js";import{u as be,F as ke}from"./index.esm-CovI7bOW.js";import{C as o}from"./Checkbox-CEAS5kPU.js";import{F as D,a as Ne,b as Pe}from"./Form-6JD4W4bJ.js";import{B as fe}from"./Button-DodV_9Wl.js";import"./_commonjsHelpers-CDgoFxsB.js";import"./index-yjVGmfkS.js";import"./index-BrWEkG-Y.js";import"./index-BBv4p8m_.js";import"./index-C09-6gTJ.js";import"./index-8BIPUTFA.js";import"./check-icXTfRpT.js";import"./createLucideIcon-ChpYCihM.js";import"./cn-C4RepMSz.js";import"./Label-BIqHYFl8.js";const Oe={title:"Components/Checkbox",tags:["autodocs"],component:o,parameters:{layout:"centered",docs:{description:{component:"A versatile checkbox component with multiple sizes and states."}}},argTypes:{size:{control:{type:"radio"},options:["sm","md","lg"]},checked:{control:"boolean"},defaultChecked:{control:"boolean"},disabled:{control:"boolean"},required:{control:"boolean"},indeterminate:{control:"boolean"},label:{control:"text"},name:{control:"text"},value:{control:"text"},className:{control:!1},id:{control:"text"},onCheckedChange:{control:!1,action:"checked changed"}}},f={args:{label:"Accept terms and conditions"}},C={args:{label:"Receive newsletter",checked:!0}},g={args:{label:"Disabled option",disabled:!0,checked:!1}},S={args:{label:"Partial selection",indeterminate:!0}},v={render:()=>p("div",{className:"flex flex-col gap-4",children:[a(o,{label:"Small checkbox",size:"sm"}),a(o,{label:"Medium checkbox",size:"md"}),a(o,{label:"Large checkbox",size:"lg"})]})},w={render:()=>{const[t,n]=T.useState(!1);return a(o,{label:`Controlled checkbox (${t?"checked":"unchecked"})`,checked:t,onCheckedChange:s=>n(s===!0)})}},y={render:()=>a(o,{label:"Uncontrolled checkbox",defaultChecked:!0,onCheckedChange:t=>console.log("checked changed:",t)})},x={render:()=>{const[t,n]=T.useState("indeterminate"),s=()=>{n(t==="indeterminate"?!0:t===!0?!1:"indeterminate")};return a(o,{label:`State: ${String(t)}`,checked:t==="indeterminate"?!1:t,indeterminate:t==="indeterminate",onCheckedChange:s})}},F={render:()=>{const t=ue({terms:$().required().oneOf([!0],"You must accept the terms and conditions"),newsletter:$().required(),marketing:$().required()}),n=be({resolver:pe(t),defaultValues:{terms:!1,newsletter:!1,marketing:!1}}),{handleSubmit:s}=n,c=m=>{alert(`Submitted:
Terms: ${m.terms}
Newsletter: ${m.newsletter}
Marketing: ${m.marketing}`)};return a(ke,r(e({},n),{children:p("form",{onSubmit:s(c),className:"space-y-4 w-80",children:[a(D,{name:"terms",isBoolean:!0,children:a(o,{label:"I accept the terms and conditions",required:!0})}),a(D,{name:"newsletter",isBoolean:!0,children:a(o,{label:"Subscribe to newsletter"})}),a(D,{name:"marketing",isBoolean:!0,children:a(o,{label:"Receive marketing emails"})}),a(fe,{type:"submit",children:"Submit"})]})}))}},N={render:()=>{var B;const t=ue({newsletter:xe(Fe().required()).required().min(1,"Please select at least one option")}),n=be({resolver:pe(t),defaultValues:{newsletter:[]}}),{watch:s,setValue:c,handleSubmit:m,formState:{errors:u}}=n,i=(B=s("newsletter"))!=null?B:[],h=(l,k)=>{k?c("newsletter",[...i,l]):c("newsletter",i.filter(Ce=>Ce!==l))},d=l=>{alert(`Selected: ${l.newsletter.join(", ")}`)},b=[{value:"tech",label:"Technology"},{value:"health",label:"Health & Wellness"},{value:"finance",label:"Finance & Investing"},{value:"travel",label:"Travel & Adventure"},{value:"food",label:"Food & Recipes"},{value:"sports",label:"Sports & Fitness"},{value:"entertainment",label:"Movies & TV Shows"},{value:"science",label:"Science & Innovation"}];return a(ke,r(e({},n),{children:p("form",{onSubmit:m(d),className:"space-y-4 w-80",children:[p("div",{className:"space-y-2",children:[a(Ne,{id:"newsletter",error:!!u.newsletter,children:"Select newsletter topics you're interested in:"}),a("div",{className:"space-y-2",children:b.map(l=>a(D,{name:"newsletter",hideError:!0,children:a(o,{label:l.label,value:l.value,checked:i.includes(l.value),onCheckedChange:k=>{k&&n.clearErrors("newsletter"),h(l.value,k===!0)}})},l.value))}),u.newsletter&&a(Pe,{children:u.newsletter.message})]}),a(fe,{type:"submit",children:"Submit Selection"})]})}))}},P={render:()=>{const[t,n]=T.useState("indeterminate"),[s,c]=T.useState([!1,!0,!1]),m=()=>{t===!0?(c([!1,!1,!1]),n(!1)):(c([!0,!0,!0]),n(!0))},u=(i,h)=>{const d=[...s];d[i]=h,c(d);const b=d.filter(Boolean).length;b===0?n(!1):b===d.length?n(!0):n("indeterminate")};return p("div",{className:"space-y-3 w-80",children:[a("div",{children:a(o,{label:"Select All Features",checked:t==="indeterminate"?!1:t,indeterminate:t==="indeterminate",onCheckedChange:m,size:"lg"})}),a("div",{className:"ml-6 space-y-2",children:["Dark Mode","Notifications","Auto-save"].map((i,h)=>a(o,{label:i,checked:s[h],onCheckedChange:d=>u(h,d===!0)},i))})]})}};var z,M,R;f.parameters=r(e({},f.parameters),{docs:r(e({},(z=f.parameters)==null?void 0:z.docs),{source:e({originalSource:`{
  args: {
    label: "Accept terms and conditions"
  }
} satisfies Story`},(R=(M=f.parameters)==null?void 0:M.docs)==null?void 0:R.source)})});var V,A,j;C.parameters=r(e({},C.parameters),{docs:r(e({},(V=C.parameters)==null?void 0:V.docs),{source:e({originalSource:`{
  args: {
    label: "Receive newsletter",
    checked: true
  }
} satisfies Story`},(j=(A=C.parameters)==null?void 0:A.docs)==null?void 0:j.source)})});var E,U,W;g.parameters=r(e({},g.parameters),{docs:r(e({},(E=g.parameters)==null?void 0:E.docs),{source:e({originalSource:`{
  args: {
    label: "Disabled option",
    disabled: true,
    checked: false
  }
} satisfies Story`},(W=(U=g.parameters)==null?void 0:U.docs)==null?void 0:W.source)})});var L,H,Y;S.parameters=r(e({},S.parameters),{docs:r(e({},(L=S.parameters)==null?void 0:L.docs),{source:e({originalSource:`{
  args: {
    label: "Partial selection",
    indeterminate: true
  }
} satisfies Story`},(Y=(H=S.parameters)==null?void 0:H.docs)==null?void 0:Y.source)})});var O,G,_;v.parameters=r(e({},v.parameters),{docs:r(e({},(O=v.parameters)==null?void 0:O.docs),{source:e({originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox" size="md" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
} satisfies Story`},(_=(G=v.parameters)==null?void 0:G.docs)==null?void 0:_.source)})});var J,K,Q;w.parameters=r(e({},w.parameters),{docs:r(e({},(J=w.parameters)==null?void 0:J.docs),{source:e({originalSource:`{
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Checkbox label={\`Controlled checkbox (\${checked ? "checked" : "unchecked"})\`} checked={checked} onCheckedChange={(val: any) => setChecked(val === true)} />;
  }
} satisfies Story`},(Q=(K=w.parameters)==null?void 0:K.docs)==null?void 0:Q.source)})});var X,Z,ee;y.parameters=r(e({},y.parameters),{docs:r(e({},(X=y.parameters)==null?void 0:X.docs),{source:e({originalSource:`{
  render: () => <Checkbox label="Uncontrolled checkbox" defaultChecked={true} onCheckedChange={(val: any) => console.log("checked changed:", val)} />
} satisfies Story`},(ee=(Z=y.parameters)==null?void 0:Z.docs)==null?void 0:ee.source)})});var ne,te,re;x.parameters=r(e({},x.parameters),{docs:r(e({},(ne=x.parameters)==null?void 0:ne.docs),{source:e({originalSource:`{
  render: () => {
    const [state, setState] = useState<boolean | "indeterminate">("indeterminate");
    const handleToggle = () => {
      if (state === "indeterminate") setState(true);else if (state === true) setState(false);else setState("indeterminate");
    };
    return <Checkbox label={\`State: \${String(state)}\`} checked={state === "indeterminate" ? false : state} indeterminate={state === "indeterminate"} onCheckedChange={handleToggle} />;
  }
} satisfies Story`},(re=(te=x.parameters)==null?void 0:te.docs)==null?void 0:re.source)})});var ae,se,oe;F.parameters=r(e({},F.parameters),{docs:r(e({},(ae=F.parameters)==null?void 0:ae.docs),{source:e({originalSource:`{
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
} satisfies Story`},(oe=(se=F.parameters)==null?void 0:se.docs)==null?void 0:oe.source)})});var le,ce,ie;N.parameters=r(e({},N.parameters),{docs:r(e({},(le=N.parameters)==null?void 0:le.docs),{source:e({originalSource:`{
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
} satisfies Story`},(ie=(ce=N.parameters)==null?void 0:ce.docs)==null?void 0:ie.source)})});var de,me,he;P.parameters=r(e({},P.parameters),{docs:r(e({},(de=P.parameters)==null?void 0:de.docs),{source:e({originalSource:`{
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
} satisfies Story`},(he=(me=P.parameters)==null?void 0:me.docs)==null?void 0:he.source)})});const Ge=["Default","Checked","Disabled","Indeterminate","WithDifferentSizes","ControlledCheckbox","UncontrolledCheckbox","ToggleableIndeterminate","ReactHookFormWithYup","CheckboxGroup","IndeterminateParentChild"];export{N as CheckboxGroup,C as Checked,w as ControlledCheckbox,f as Default,g as Disabled,S as Indeterminate,P as IndeterminateParentChild,F as ReactHookFormWithYup,x as ToggleableIndeterminate,y as UncontrolledCheckbox,v as WithDifferentSizes,Ge as __namedExportsOrder,Oe as default};
