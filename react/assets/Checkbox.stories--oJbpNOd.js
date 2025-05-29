import{c as we,a as n,j as x,F as Ae,b as U}from"./cn-C5LAPttS.js";import{c as Ie,b as O,u as Ne,C as A,d as Me,a as Be,o as Pe}from"./index.esm-D7wp2FZR.js";import{r as u}from"./index-BwDkhjyp.js";import{u as qe}from"./index-CMNekbXq.js";import{a as je,P as M,b as Ue,d as L,e as Le,f as He}from"./createLucideIcon-DPkXPiIk.js";import{P as Ge}from"./index-Dzmo9EYg.js";import{C as We}from"./check-Dfxb36DX.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-aS4jWOJ1.js";const Ye=we("peer h-4 w-4 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",{variants:{size:{sm:"h-3 w-3",md:"h-4 w-4",lg:"h-5 w-5"}},defaultVariants:{size:"md"}}),Ke=we("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",{variants:{size:{sm:"text-xs",md:"text-sm",lg:"text-base"}},defaultVariants:{size:"md"}});var F="Checkbox",[Xe,dt]=je(F),[Je,B]=Xe(F);function Qe(t){const{__scopeCheckbox:a,checked:r,children:o,defaultChecked:c,disabled:e,form:d,name:i,onCheckedChange:l,required:s,value:h="on",internal_do_not_use_render:p}=t,[b,v]=Ue({prop:r,defaultProp:c??!1,onChange:l,caller:F}),[C,y]=u.useState(null),[S,f]=u.useState(null),k=u.useRef(!1),$=C?!!d||!!C.closest("form"):!0,T={checked:b,disabled:e,setChecked:v,control:C,setControl:y,name:i,form:d,value:h,hasConsumerStoppedPropagationRef:k,required:s,defaultChecked:g(c)?!1:c,isFormControl:$,bubbleInput:S,setBubbleInput:f};return n(Je,{scope:a,...T,children:Ze(p)?p(T):o})}var _e="CheckboxTrigger",Re=u.forwardRef(({__scopeCheckbox:t,onKeyDown:a,onClick:r,...o},c)=>{const{control:e,value:d,disabled:i,checked:l,required:s,setControl:h,setChecked:p,hasConsumerStoppedPropagationRef:b,isFormControl:v,bubbleInput:C}=B(_e,t),y=qe(c,h),S=u.useRef(l);return u.useEffect(()=>{const f=e==null?void 0:e.form;if(f){const k=()=>p(S.current);return f.addEventListener("reset",k),()=>f.removeEventListener("reset",k)}},[e,p]),n(M.button,{type:"button",role:"checkbox","aria-checked":g(l)?"mixed":l,"aria-required":s,"data-state":$e(l),"data-disabled":i?"":void 0,disabled:i,value:d,...o,ref:y,onKeyDown:L(a,f=>{f.key==="Enter"&&f.preventDefault()}),onClick:L(r,f=>{p(k=>g(k)?!0:!k),C&&v&&(b.current=f.isPropagationStopped(),b.current||f.stopPropagation())})})});Re.displayName=_e;var Ve=u.forwardRef((t,a)=>{const{__scopeCheckbox:r,name:o,checked:c,defaultChecked:e,required:d,disabled:i,value:l,onCheckedChange:s,form:h,...p}=t;return n(Qe,{__scopeCheckbox:r,checked:c,defaultChecked:e,disabled:i,required:d,onCheckedChange:s,name:o,form:h,value:l,internal_do_not_use_render:({isFormControl:b})=>x(Ae,{children:[n(Re,{...p,ref:a,__scopeCheckbox:r}),b&&n(Fe,{__scopeCheckbox:r})]})})});Ve.displayName=F;var ze="CheckboxIndicator",De=u.forwardRef((t,a)=>{const{__scopeCheckbox:r,forceMount:o,...c}=t,e=B(ze,r);return n(Ge,{present:o||g(e.checked)||e.checked===!0,children:n(M.span,{"data-state":$e(e.checked),"data-disabled":e.disabled?"":void 0,...c,ref:a,style:{pointerEvents:"none",...t.style}})})});De.displayName=ze;var Ee="CheckboxBubbleInput",Fe=u.forwardRef(({__scopeCheckbox:t,...a},r)=>{const{control:o,hasConsumerStoppedPropagationRef:c,checked:e,defaultChecked:d,required:i,disabled:l,name:s,value:h,form:p,bubbleInput:b,setBubbleInput:v}=B(Ee,t),C=qe(r,v),y=Le(e),S=He(o);u.useEffect(()=>{const k=b;if(!k)return;const $=window.HTMLInputElement.prototype,j=Object.getOwnPropertyDescriptor($,"checked").set,Te=!c.current;if(y!==e&&j){const Oe=new Event("click",{bubbles:Te});k.indeterminate=g(e),j.call(k,g(e)?!1:e),k.dispatchEvent(Oe)}},[b,y,e,c]);const f=u.useRef(g(e)?!1:e);return n(M.input,{type:"checkbox","aria-hidden":!0,defaultChecked:d??f.current,required:i,disabled:l,name:s,value:h,form:p,...a,tabIndex:-1,ref:C,style:{...a.style,...S,position:"absolute",pointerEvents:"none",opacity:0,margin:0,transform:"translateX(-100%)"}})});Fe.displayName=Ee;function Ze(t){return typeof t=="function"}function g(t){return t==="indeterminate"}function $e(t){return g(t)?"indeterminate":t?"checked":"unchecked"}const m=u.forwardRef((t,a)=>{const{className:r,size:o="md",label:c,checked:e,defaultChecked:d,disabled:i,required:l,name:s,value:h,indeterminate:p,id:b,onCheckedChange:v,...C}=t;return x("div",{className:"flex items-center space-x-2",children:[n(Ve,{ref:a,id:b,checked:e,defaultChecked:d,disabled:i,required:l,name:s,value:h,onCheckedChange:v,className:U(Ye({size:o}),r),...C,children:n(De,{className:"flex items-center justify-center",children:n(We,{className:"h-4 w-4"})})}),c&&n("label",{htmlFor:b,className:U(Ke({size:o})),children:c})]})});m.displayName="Checkbox";try{m.displayName="Checkbox",m.__docgenInfo={description:"",displayName:"Checkbox",props:{id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}},onCheckedChange:{defaultValue:null,description:"",name:"onCheckedChange",required:!1,type:{name:'((checked: boolean | "indeterminate") => void) | undefined'}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string | undefined"}},checked:{defaultValue:null,description:"",name:"checked",required:!1,type:{name:"boolean | undefined"}},defaultChecked:{defaultValue:null,description:"",name:"defaultChecked",required:!1,type:{name:"boolean | undefined"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean | undefined"}},required:{defaultValue:null,description:"",name:"required",required:!1,type:{name:"boolean | undefined"}},name:{defaultValue:null,description:"",name:"name",required:!1,type:{name:"string | undefined"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"string | undefined"}},indeterminate:{defaultValue:null,description:"",name:"indeterminate",required:!1,type:{name:"boolean | undefined"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}}}catch{}const it={title:"Components/Checkbox",tags:["autodocs"],component:m,parameters:{layout:"centered",docs:{description:{component:"A versatile checkbox component with multiple sizes and states."}}},argTypes:{size:{control:{type:"radio"},options:["sm","md","lg"]},checked:{control:"boolean"},defaultChecked:{control:"boolean"},disabled:{control:"boolean"},required:{control:"boolean"},indeterminate:{control:"boolean"},label:{control:"text"},name:{control:"text"},value:{control:"text"},className:{control:!1},id:{control:"text"},onCheckedChange:{control:!1,action:"checked changed"}}},w={args:{label:"Accept terms and conditions"}},I={args:{label:"Receive newsletter",checked:!0}},N={args:{label:"Disabled option",disabled:!0,checked:!1}},P={args:{label:"Partial selection",indeterminate:!0}},q={render:()=>x("div",{className:"flex flex-col gap-4",children:[n(m,{label:"Small checkbox",size:"sm"}),n(m,{label:"Medium checkbox",size:"md"}),n(m,{label:"Large checkbox",size:"lg"})]})},_={render:()=>{const[t,a]=u.useState(!1);return n(m,{label:`Controlled checkbox (${t?"checked":"unchecked"})`,checked:t,onCheckedChange:r=>a(r===!0)})}},R={render:()=>n(m,{label:"Uncontrolled checkbox",defaultChecked:!0,onCheckedChange:t=>console.log("checked changed:",t)})},V={render:()=>{const[t,a]=u.useState("indeterminate"),r=()=>{a(t==="indeterminate"?!0:t===!0?!1:"indeterminate")};return n(m,{label:`State: ${String(t)}`,checked:t==="indeterminate"?!1:t,indeterminate:t==="indeterminate",onCheckedChange:r})}},z={render:()=>{const t=Ie({terms:O().required().oneOf([!0],"You must accept the terms and conditions"),newsletter:O().required(),marketing:O().required()}),{control:a,handleSubmit:r,formState:{errors:o}}=Ne({resolver:Pe(t),defaultValues:{terms:!1,newsletter:!1,marketing:!1}});return x("form",{onSubmit:r(e=>{alert(`Submitted:
Terms: ${e.terms}
Newsletter: ${e.newsletter}
Marketing: ${e.marketing}`)}),className:"space-y-4 w-80",children:[x("div",{children:[n(A,{name:"terms",control:a,render:({field:e})=>n(m,{label:"I accept the terms and conditions *",checked:e.value,onCheckedChange:e.onChange})}),o.terms&&n("p",{className:"text-sm text-red-600 mt-1",children:o.terms.message})]}),n("div",{children:n(A,{name:"newsletter",control:a,render:({field:e})=>n(m,{label:"Subscribe to newsletter",checked:e.value,onCheckedChange:e.onChange})})}),n("div",{children:n(A,{name:"marketing",control:a,render:({field:e})=>n(m,{label:"Receive marketing emails",checked:e.value,onCheckedChange:e.onChange})})}),n("button",{type:"submit",className:"px-3 py-1 rounded bg-green-600 text-white text-sm",children:"Submit"})]})}},D={render:()=>{const t=Ie({selectedItems:Me(Be().required()).required().min(1,"Please select at least one option")}),{watch:a,setValue:r,handleSubmit:o,formState:{errors:c}}=Ne({resolver:Pe(t),defaultValues:{selectedItems:[]}}),e=a("selectedItems")??[],d=(s,h)=>{h?r("selectedItems",[...e,s]):r("selectedItems",e.filter(p=>p!==s))},i=s=>{alert(`Selected: ${s.selectedItems.join(", ")}`)},l=[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"},{value:"option4",label:"Option 4"}];return x("form",{onSubmit:o(i),className:"space-y-4 w-80",children:[x("div",{children:[n("p",{className:"text-sm font-medium mb-2",children:"Choose your preferences:"}),n("div",{className:"space-y-2",children:l.map(s=>n(m,{label:s.label,checked:e.includes(s.value),onCheckedChange:h=>d(s.value,h===!0)},s.value))}),c.selectedItems&&n("p",{className:"text-sm text-red-600 mt-1",children:c.selectedItems.message})]}),n("button",{type:"submit",className:"px-3 py-1 rounded bg-green-600 text-white text-sm",children:"Submit Selection"})]})}},E={render:()=>{const[t,a]=u.useState("indeterminate"),[r,o]=u.useState([!1,!0,!1]),c=()=>{t===!0?(o([!1,!1,!1]),a(!1)):(o([!0,!0,!0]),a(!0))},e=(d,i)=>{const l=[...r];l[d]=i,o(l);const s=l.filter(Boolean).length;s===0?a(!1):s===l.length?a(!0):a("indeterminate")};return x("div",{className:"space-y-3 w-80",children:[n("div",{children:n(m,{label:"Select All Features",checked:t==="indeterminate"?!1:t,indeterminate:t==="indeterminate",onCheckedChange:c,size:"lg"})}),n("div",{className:"ml-6 space-y-2",children:["Dark Mode","Notifications","Auto-save"].map((d,i)=>n(m,{label:d,checked:r[i],onCheckedChange:l=>e(i,l===!0)},d))})]})}};var H,G,W;w.parameters={...w.parameters,docs:{...(H=w.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    label: 'Accept terms and conditions'
  }
} satisfies Story`,...(W=(G=w.parameters)==null?void 0:G.docs)==null?void 0:W.source}}};var Y,K,X;I.parameters={...I.parameters,docs:{...(Y=I.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    label: 'Receive newsletter',
    checked: true
  }
} satisfies Story`,...(X=(K=I.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};var J,Q,Z;N.parameters={...N.parameters,docs:{...(J=N.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    label: 'Disabled option',
    disabled: true,
    checked: false
  }
} satisfies Story`,...(Z=(Q=N.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};var ee,te,ne;P.parameters={...P.parameters,docs:{...(ee=P.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    label: 'Partial selection',
    indeterminate: true
  }
} satisfies Story`,...(ne=(te=P.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var ae,re,se;q.parameters={...q.parameters,docs:{...(ae=q.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox" size="md" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
} satisfies Story`,...(se=(re=q.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var oe,ce,le;_.parameters={..._.parameters,docs:{...(oe=_.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Checkbox label={\`Controlled checkbox (\${checked ? 'checked' : 'unchecked'})\`} checked={checked} onCheckedChange={(val: any) => setChecked(val === true)} />;
  }
} satisfies Story`,...(le=(ce=_.parameters)==null?void 0:ce.docs)==null?void 0:le.source}}};var de,ie,ue;R.parameters={...R.parameters,docs:{...(de=R.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: () => <Checkbox label="Uncontrolled checkbox" defaultChecked={true} onCheckedChange={(val: any) => console.log('checked changed:', val)} />
} satisfies Story`,...(ue=(ie=R.parameters)==null?void 0:ie.docs)==null?void 0:ue.source}}};var me,he,pe;V.parameters={...V.parameters,docs:{...(me=V.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: () => {
    const [state, setState] = useState<boolean | 'indeterminate'>('indeterminate');
    const handleToggle = () => {
      if (state === 'indeterminate') setState(true);else if (state === true) setState(false);else setState('indeterminate');
    };
    return <Checkbox label={\`State: \${String(state)}\`} checked={state === 'indeterminate' ? false : state} indeterminate={state === 'indeterminate'} onCheckedChange={handleToggle} />;
  }
} satisfies Story`,...(pe=(he=V.parameters)==null?void 0:he.docs)==null?void 0:pe.source}}};var fe,be,ke;z.parameters={...z.parameters,docs:{...(fe=z.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  render: () => {
    const schema = yup.object({
      terms: yup.boolean().required().oneOf([true], 'You must accept the terms and conditions'),
      newsletter: yup.boolean().required(),
      marketing: yup.boolean().required()
    });
    type FormData = yup.InferType<typeof schema>;
    const {
      control,
      handleSubmit,
      formState: {
        errors
      }
    } = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        terms: false,
        newsletter: false,
        marketing: false
      }
    });
    const onSubmit = (data: FormData) => {
      alert(\`Submitted:\\nTerms: \${data.terms}\\nNewsletter: \${data.newsletter}\\nMarketing: \${data.marketing}\`);
    };
    return <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
        <div>
          <Controller name="terms" control={control} render={({
          field
        }) => <Checkbox label="I accept the terms and conditions *" checked={field.value} onCheckedChange={field.onChange} />} />
          {errors.terms && <p className="text-sm text-red-600 mt-1">{errors.terms.message}</p>}
        </div>
        
        <div>
          <Controller name="newsletter" control={control} render={({
          field
        }) => <Checkbox label="Subscribe to newsletter" checked={field.value} onCheckedChange={field.onChange} />} />
        </div>
        
        <div>
          <Controller name="marketing" control={control} render={({
          field
        }) => <Checkbox label="Receive marketing emails" checked={field.value} onCheckedChange={field.onChange} />} />
        </div>
        
        <button type="submit" className="px-3 py-1 rounded bg-green-600 text-white text-sm">
          Submit
        </button>
      </form>;
  }
} satisfies Story`,...(ke=(be=z.parameters)==null?void 0:be.docs)==null?void 0:ke.source}}};var Ce,ge,xe;D.parameters={...D.parameters,docs:{...(Ce=D.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  render: () => {
    const schema = yup.object({
      selectedItems: yup.array(yup.string().required()).required().min(1, 'Please select at least one option')
    });
    type FormData = yup.InferType<typeof schema>;
    const {
      watch,
      setValue,
      handleSubmit,
      formState: {
        errors
      }
    } = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        selectedItems: []
      }
    });
    const selectedItems = watch('selectedItems') ?? [];
    const handleCheckboxChange = (value: string, checked: boolean) => {
      if (checked) {
        setValue('selectedItems', [...selectedItems, value]);
      } else {
        setValue('selectedItems', selectedItems.filter(item => item !== value));
      }
    };
    const onSubmit = (data: FormData) => {
      alert(\`Selected: \${data.selectedItems.join(', ')}\`);
    };
    const options = [{
      value: 'option1',
      label: 'Option 1'
    }, {
      value: 'option2',
      label: 'Option 2'
    }, {
      value: 'option3',
      label: 'Option 3'
    }, {
      value: 'option4',
      label: 'Option 4'
    }];
    return <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
        <div>
          <p className="text-sm font-medium mb-2">Choose your preferences:</p>
          <div className="space-y-2">
            {options.map(option => <Checkbox key={option.value} label={option.label} checked={selectedItems.includes(option.value)} onCheckedChange={checked => handleCheckboxChange(option.value, checked === true)} />)}
          </div>
          {errors.selectedItems && <p className="text-sm text-red-600 mt-1">{errors.selectedItems.message}</p>}
        </div>
        
        <button type="submit" className="px-3 py-1 rounded bg-green-600 text-white text-sm">
          Submit Selection
        </button>
      </form>;
  }
} satisfies Story`,...(xe=(ge=D.parameters)==null?void 0:ge.docs)==null?void 0:xe.source}}};var ve,ye,Se;E.parameters={...E.parameters,docs:{...(ve=E.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  render: () => {
    const [parentChecked, setParentChecked] = useState<boolean | 'indeterminate'>('indeterminate');
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
        setParentChecked('indeterminate');
      }
    };
    return <div className="space-y-3 w-80">
        <div>
          <Checkbox label="Select All Features" checked={parentChecked === 'indeterminate' ? false : parentChecked} indeterminate={parentChecked === 'indeterminate'} onCheckedChange={handleParentChange} size="lg" />
        </div>
        
        <div className="ml-6 space-y-2">
          {['Dark Mode', 'Notifications', 'Auto-save'].map((feature, index) => <Checkbox key={feature} label={feature} checked={childrenChecked[index]} onCheckedChange={checked => handleChildChange(index, checked === true)} />)}
        </div>
      </div>;
  }
} satisfies Story`,...(Se=(ye=E.parameters)==null?void 0:ye.docs)==null?void 0:Se.source}}};const ut=["Default","Checked","Disabled","Indeterminate","WithDifferentSizes","ControlledCheckbox","UncontrolledCheckbox","ToggleableIndeterminate","ReactHookFormWithYup","CheckboxGroup","IndeterminateParentChild"];export{D as CheckboxGroup,I as Checked,_ as ControlledCheckbox,w as Default,N as Disabled,P as Indeterminate,E as IndeterminateParentChild,z as ReactHookFormWithYup,V as ToggleableIndeterminate,R as UncontrolledCheckbox,q as WithDifferentSizes,ut as __namedExportsOrder,it as default};
