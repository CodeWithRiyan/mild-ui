var ge=Object.defineProperty,Se=Object.defineProperties;var ve=Object.getOwnPropertyDescriptors;var z=Object.getOwnPropertySymbols;var we=Object.prototype.hasOwnProperty,ye=Object.prototype.propertyIsEnumerable;var q=(t,n,s)=>n in t?ge(t,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[n]=s,e=(t,n)=>{for(var s in n||(n={}))we.call(n,s)&&q(t,s,n[s]);if(z)for(var s of z(n))ye.call(n,s)&&q(t,s,n[s]);return t},a=(t,n)=>Se(t,ve(n));import{j as b,a as r}from"./jsx-runtime-Cr617v10.js";import{c as ue,a as T,b as xe,d as Fe,o as be}from"./index.esm-CUaDp5zZ.js";import{K as l,Y as pe,z as I,I as ke,H as Ne,a as De}from"./index-BfP1bvMz.js";import{r as P}from"./index-D2dH9QXU.js";import{u as fe}from"./index.esm-0XuDu32R.js";import"./_commonjsHelpers-CDgoFxsB.js";import"./index-8BIPUTFA.js";const Re={title:"Components/Checkbox",tags:["autodocs"],component:l,parameters:{layout:"centered",docs:{description:{component:"A versatile checkbox component with multiple sizes and states."}}},argTypes:{size:{control:{type:"radio"},options:["sm","md","lg"]},checked:{control:"boolean"},defaultChecked:{control:"boolean"},disabled:{control:"boolean"},required:{control:"boolean"},indeterminate:{control:"boolean"},label:{control:"text"},name:{control:"text"},value:{control:"text"},className:{control:!1},id:{control:"text"},onCheckedChange:{control:!1,action:"checked changed"}}},f={args:{label:"Accept terms and conditions"}},C={args:{label:"Receive newsletter",checked:!0}},g={args:{label:"Disabled option",disabled:!0,checked:!1}},S={args:{label:"Partial selection",indeterminate:!0}},v={render:()=>b("div",{className:"flex flex-col gap-4",children:[r(l,{label:"Small checkbox",size:"sm"}),r(l,{label:"Medium checkbox",size:"md"}),r(l,{label:"Large checkbox",size:"lg"})]})},w={render:()=>{const[t,n]=P.useState(!1);return r(l,{label:`Controlled checkbox (${t?"checked":"unchecked"})`,checked:t,onCheckedChange:s=>n(s===!0)})}},y={render:()=>r(l,{label:"Uncontrolled checkbox",defaultChecked:!0,onCheckedChange:t=>console.log("checked changed:",t)})},x={render:()=>{const[t,n]=P.useState("indeterminate"),s=()=>{n(t==="indeterminate"?!0:t===!0?!1:"indeterminate")};return r(l,{label:`State: ${String(t)}`,checked:t==="indeterminate"?!1:t,indeterminate:t==="indeterminate",onCheckedChange:s})}},F={render:()=>{const t=ue({terms:T().required().oneOf([!0],"You must accept the terms and conditions"),newsletter:T().required(),marketing:T().required()}),n=fe({resolver:be(t),defaultValues:{terms:!1,newsletter:!1,marketing:!1}}),{handleSubmit:s}=n,c=m=>{alert(`Submitted:
Terms: ${m.terms}
Newsletter: ${m.newsletter}
Marketing: ${m.marketing}`)};return r(pe,a(e({},n),{children:b("form",{onSubmit:s(c),className:"space-y-4 w-80",children:[r(I,{name:"terms",isBoolean:!0,children:r(l,{label:"I accept the terms and conditions",required:!0})}),r(I,{name:"newsletter",isBoolean:!0,children:r(l,{label:"Subscribe to newsletter"})}),r(I,{name:"marketing",isBoolean:!0,children:r(l,{label:"Receive marketing emails"})}),r(ke,{type:"submit",children:"Submit"})]})}))}},N={render:()=>{var $;const t=ue({newsletter:xe(Fe().required()).required().min(1,"Please select at least one option")}),n=fe({resolver:be(t),defaultValues:{newsletter:[]}}),{watch:s,setValue:c,handleSubmit:m,formState:{errors:u}}=n,i=($=s("newsletter"))!=null?$:[],h=(o,k)=>{k?c("newsletter",[...i,o]):c("newsletter",i.filter(Ce=>Ce!==o))},d=o=>{alert(`Selected: ${o.newsletter.join(", ")}`)},p=[{value:"tech",label:"Technology"},{value:"health",label:"Health & Wellness"},{value:"finance",label:"Finance & Investing"},{value:"travel",label:"Travel & Adventure"},{value:"food",label:"Food & Recipes"},{value:"sports",label:"Sports & Fitness"},{value:"entertainment",label:"Movies & TV Shows"},{value:"science",label:"Science & Innovation"}];return r(pe,a(e({},n),{children:b("form",{onSubmit:m(d),className:"space-y-4 w-80",children:[b("div",{className:"space-y-2",children:[r(Ne,{id:"newsletter",error:!!u.newsletter,children:"Select newsletter topics you're interested in:"}),r("div",{className:"space-y-2",children:p.map(o=>r(I,{name:"newsletter",hideError:!0,children:r(l,{label:o.label,value:o.value,checked:i.includes(o.value),onCheckedChange:k=>{k&&n.clearErrors("newsletter"),h(o.value,k===!0)}})},o.value))}),u.newsletter&&r(De,{children:u.newsletter.message})]}),r(ke,{type:"submit",children:"Submit Selection"})]})}))}},D={render:()=>{const[t,n]=P.useState("indeterminate"),[s,c]=P.useState([!1,!0,!1]),m=()=>{t===!0?(c([!1,!1,!1]),n(!1)):(c([!0,!0,!0]),n(!0))},u=(i,h)=>{const d=[...s];d[i]=h,c(d);const p=d.filter(Boolean).length;p===0?n(!1):p===d.length?n(!0):n("indeterminate")};return b("div",{className:"space-y-3 w-80",children:[r("div",{children:r(l,{label:"Select All Features",checked:t==="indeterminate"?!1:t,indeterminate:t==="indeterminate",onCheckedChange:m,size:"lg"})}),r("div",{className:"ml-6 space-y-2",children:["Dark Mode","Notifications","Auto-save"].map((i,h)=>r(l,{label:i,checked:s[h],onCheckedChange:d=>u(h,d===!0)},i))})]})}};var B,M,R;f.parameters=a(e({},f.parameters),{docs:a(e({},(B=f.parameters)==null?void 0:B.docs),{source:e({originalSource:`{
  args: {
    label: "Accept terms and conditions"
  }
} satisfies Story`},(R=(M=f.parameters)==null?void 0:M.docs)==null?void 0:R.source)})});var V,A,j;C.parameters=a(e({},C.parameters),{docs:a(e({},(V=C.parameters)==null?void 0:V.docs),{source:e({originalSource:`{
  args: {
    label: "Receive newsletter",
    checked: true
  }
} satisfies Story`},(j=(A=C.parameters)==null?void 0:A.docs)==null?void 0:j.source)})});var Y,E,H;g.parameters=a(e({},g.parameters),{docs:a(e({},(Y=g.parameters)==null?void 0:Y.docs),{source:e({originalSource:`{
  args: {
    label: "Disabled option",
    disabled: true,
    checked: false
  }
} satisfies Story`},(H=(E=g.parameters)==null?void 0:E.docs)==null?void 0:H.source)})});var U,W,L;S.parameters=a(e({},S.parameters),{docs:a(e({},(U=S.parameters)==null?void 0:U.docs),{source:e({originalSource:`{
  args: {
    label: "Partial selection",
    indeterminate: true
  }
} satisfies Story`},(L=(W=S.parameters)==null?void 0:W.docs)==null?void 0:L.source)})});var O,G,K;v.parameters=a(e({},v.parameters),{docs:a(e({},(O=v.parameters)==null?void 0:O.docs),{source:e({originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox" size="md" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
} satisfies Story`},(K=(G=v.parameters)==null?void 0:G.docs)==null?void 0:K.source)})});var _,J,Q;w.parameters=a(e({},w.parameters),{docs:a(e({},(_=w.parameters)==null?void 0:_.docs),{source:e({originalSource:`{
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Checkbox label={\`Controlled checkbox (\${checked ? "checked" : "unchecked"})\`} checked={checked} onCheckedChange={(val: any) => setChecked(val === true)} />;
  }
} satisfies Story`},(Q=(J=w.parameters)==null?void 0:J.docs)==null?void 0:Q.source)})});var X,Z,ee;y.parameters=a(e({},y.parameters),{docs:a(e({},(X=y.parameters)==null?void 0:X.docs),{source:e({originalSource:`{
  render: () => <Checkbox label="Uncontrolled checkbox" defaultChecked={true} onCheckedChange={(val: any) => console.log("checked changed:", val)} />
} satisfies Story`},(ee=(Z=y.parameters)==null?void 0:Z.docs)==null?void 0:ee.source)})});var ne,te,ae;x.parameters=a(e({},x.parameters),{docs:a(e({},(ne=x.parameters)==null?void 0:ne.docs),{source:e({originalSource:`{
  render: () => {
    const [state, setState] = useState<boolean | "indeterminate">("indeterminate");
    const handleToggle = () => {
      if (state === "indeterminate") setState(true);else if (state === true) setState(false);else setState("indeterminate");
    };
    return <Checkbox label={\`State: \${String(state)}\`} checked={state === "indeterminate" ? false : state} indeterminate={state === "indeterminate"} onCheckedChange={handleToggle} />;
  }
} satisfies Story`},(ae=(te=x.parameters)==null?void 0:te.docs)==null?void 0:ae.source)})});var re,se,le;F.parameters=a(e({},F.parameters),{docs:a(e({},(re=F.parameters)==null?void 0:re.docs),{source:e({originalSource:`{
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
} satisfies Story`},(le=(se=F.parameters)==null?void 0:se.docs)==null?void 0:le.source)})});var oe,ce,ie;N.parameters=a(e({},N.parameters),{docs:a(e({},(oe=N.parameters)==null?void 0:oe.docs),{source:e({originalSource:`{
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
} satisfies Story`},(ie=(ce=N.parameters)==null?void 0:ce.docs)==null?void 0:ie.source)})});var de,me,he;D.parameters=a(e({},D.parameters),{docs:a(e({},(de=D.parameters)==null?void 0:de.docs),{source:e({originalSource:`{
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
} satisfies Story`},(he=(me=D.parameters)==null?void 0:me.docs)==null?void 0:he.source)})});const Ve=["Default","Checked","Disabled","Indeterminate","WithDifferentSizes","ControlledCheckbox","UncontrolledCheckbox","ToggleableIndeterminate","ReactHookFormWithYup","CheckboxGroup","IndeterminateParentChild"];export{N as CheckboxGroup,C as Checked,w as ControlledCheckbox,f as Default,g as Disabled,S as Indeterminate,D as IndeterminateParentChild,F as ReactHookFormWithYup,x as ToggleableIndeterminate,y as UncontrolledCheckbox,v as WithDifferentSizes,Ve as __namedExportsOrder,Re as default};
