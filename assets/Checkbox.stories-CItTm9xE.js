var We=Object.defineProperty,Ye=Object.defineProperties;var Ke=Object.getOwnPropertyDescriptors;var _=Object.getOwnPropertySymbols;var Y=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var W=(e,t,a)=>t in e?We(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,n=(e,t)=>{for(var a in t||(t={}))Y.call(t,a)&&W(e,a,t[a]);if(_)for(var a of _(t))K.call(t,a)&&W(e,a,t[a]);return e},c=(e,t)=>Ye(e,Ke(t));var N=(e,t)=>{var a={};for(var o in e)Y.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(e!=null&&_)for(var o of _(e))t.indexOf(o)<0&&K.call(e,o)&&(a[o]=e[o]);return a};import{a as r,j as w,F as Xe}from"./jsx-runtime-Cr617v10.js";import{c as Ve,b as j,u as ze,C as U,d as Je,a as Qe,o as De}from"./index.esm-1VFK1fsS.js";import{r as p}from"./index-D2dH9QXU.js";import{u as Ee}from"./index-CJsXfnVD.js";import{a as Ze,P as L,b as et,d as X,e as tt,f as nt}from"./createLucideIcon-DUuldbrR.js";import{P as at}from"./index-Dvq2op7V.js";import{c as Fe,a as J}from"./cn-ur_4nXRV.js";import{C as rt}from"./check-D2uV4e1T.js";import"./_commonjsHelpers-CDgoFxsB.js";import"./index-8BIPUTFA.js";const st=Fe("peer h-4 w-4 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",{variants:{size:{sm:"h-3 w-3",md:"h-4 w-4",lg:"h-5 w-5"}},defaultVariants:{size:"md"}}),ot=Fe("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",{variants:{size:{sm:"text-xs",md:"text-sm",lg:"text-base"}},defaultVariants:{size:"md"}});var B="Checkbox",[ct,St]=Ze(B),[lt,H]=ct(B);function dt(e){const{__scopeCheckbox:t,checked:a,children:o,defaultChecked:d,disabled:s,form:i,name:l,onCheckedChange:m,required:h,value:u="on",internal_do_not_use_render:f}=e,[k,x]=et({prop:a,defaultProp:d!=null?d:!1,onChange:m,caller:B}),[v,y]=p.useState(null),[P,I]=p.useState(null),q=p.useRef(!1),C=v?!!i||!!v.closest("form"):!0,g={checked:k,disabled:s,setChecked:x,control:v,setControl:y,name:l,form:i,value:u,hasConsumerStoppedPropagationRef:q,required:h,defaultChecked:S(d)?!1:d,isFormControl:C,bubbleInput:P,setBubbleInput:I};return r(lt,c(n({scope:t},g),{children:it(f)?f(g):o}))}var $e="CheckboxTrigger",Te=p.forwardRef((s,d)=>{var i=s,{__scopeCheckbox:e,onKeyDown:t,onClick:a}=i,o=N(i,["__scopeCheckbox","onKeyDown","onClick"]);const{control:l,value:m,disabled:h,checked:u,required:f,setControl:k,setChecked:x,hasConsumerStoppedPropagationRef:v,isFormControl:y,bubbleInput:P}=H($e,e),I=Ee(d,k),q=p.useRef(u);return p.useEffect(()=>{const C=l==null?void 0:l.form;if(C){const g=()=>x(q.current);return C.addEventListener("reset",g),()=>C.removeEventListener("reset",g)}},[l,x]),r(L.button,c(n({type:"button",role:"checkbox","aria-checked":S(u)?"mixed":u,"aria-required":f,"data-state":Ue(u),"data-disabled":h?"":void 0,disabled:h,value:m},o),{ref:I,onKeyDown:X(t,C=>{C.key==="Enter"&&C.preventDefault()}),onClick:X(a,C=>{x(g=>S(g)?!0:!g),P&&y&&(v.current=C.isPropagationStopped(),v.current||C.stopPropagation())})}))});Te.displayName=$e;var Oe=p.forwardRef((e,t)=>{const k=e,{__scopeCheckbox:a,name:o,checked:d,defaultChecked:s,required:i,disabled:l,value:m,onCheckedChange:h,form:u}=k,f=N(k,["__scopeCheckbox","name","checked","defaultChecked","required","disabled","value","onCheckedChange","form"]);return r(dt,{__scopeCheckbox:a,checked:d,defaultChecked:s,disabled:l,required:i,onCheckedChange:h,name:o,form:u,value:m,internal_do_not_use_render:({isFormControl:x})=>w(Xe,{children:[r(Te,c(n({},f),{ref:t,__scopeCheckbox:a})),x&&r(je,{__scopeCheckbox:a})]})})});Oe.displayName=B;var Ae="CheckboxIndicator",Me=p.forwardRef((e,t)=>{const i=e,{__scopeCheckbox:a,forceMount:o}=i,d=N(i,["__scopeCheckbox","forceMount"]),s=H(Ae,a);return r(at,{present:o||S(s.checked)||s.checked===!0,children:r(L.span,c(n({"data-state":Ue(s.checked),"data-disabled":s.disabled?"":void 0},d),{ref:t,style:n({pointerEvents:"none"},e.style)}))})});Me.displayName=Ae;var Be="CheckboxBubbleInput",je=p.forwardRef((o,a)=>{var d=o,{__scopeCheckbox:e}=d,t=N(d,["__scopeCheckbox"]);const{control:s,hasConsumerStoppedPropagationRef:i,checked:l,defaultChecked:m,required:h,disabled:u,name:f,value:k,form:x,bubbleInput:v,setBubbleInput:y}=H(Be,e),P=Ee(a,y),I=tt(l),q=nt(s);p.useEffect(()=>{const g=v;if(!g)return;const Le=window.HTMLInputElement.prototype,G=Object.getOwnPropertyDescriptor(Le,"checked").set,He=!i.current;if(I!==l&&G){const Ge=new Event("click",{bubbles:He});g.indeterminate=S(l),G.call(g,S(l)?!1:l),g.dispatchEvent(Ge)}},[v,I,l,i]);const C=p.useRef(S(l)?!1:l);return r(L.input,c(n({type:"checkbox","aria-hidden":!0,defaultChecked:m!=null?m:C.current,required:h,disabled:u,name:f,value:k,form:x},t),{tabIndex:-1,ref:P,style:c(n(n({},t.style),q),{position:"absolute",pointerEvents:"none",opacity:0,margin:0,transform:"translateX(-100%)"})}))});je.displayName=Be;function it(e){return typeof e=="function"}function S(e){return e==="indeterminate"}function Ue(e){return S(e)?"indeterminate":e?"checked":"unchecked"}const b=p.forwardRef((e,t)=>{const y=e,{className:a,size:o="md",label:d,checked:s,defaultChecked:i,disabled:l,required:m,name:h,value:u,indeterminate:f,id:k,onCheckedChange:x}=y,v=N(y,["className","size","label","checked","defaultChecked","disabled","required","name","value","indeterminate","id","onCheckedChange"]);return w("div",{className:"flex items-center space-x-2",children:[r(Oe,c(n({ref:t,id:k,checked:s,defaultChecked:i,disabled:l,required:m,name:h,value:u,onCheckedChange:x,className:J(st({size:o}),a)},v),{children:r(Me,{className:"flex items-center justify-center",children:r(rt,{className:"h-4 w-4"})})})),d&&r("label",{htmlFor:k,className:J(ot({size:o})),children:d})]})});b.displayName="Checkbox";try{b.displayName="Checkbox",b.__docgenInfo={description:"",displayName:"Checkbox",props:{id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}},onCheckedChange:{defaultValue:null,description:"",name:"onCheckedChange",required:!1,type:{name:'((checked: boolean | "indeterminate") => void) | undefined'}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string | undefined"}},checked:{defaultValue:null,description:"",name:"checked",required:!1,type:{name:"boolean | undefined"}},defaultChecked:{defaultValue:null,description:"",name:"defaultChecked",required:!1,type:{name:"boolean | undefined"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean | undefined"}},required:{defaultValue:null,description:"",name:"required",required:!1,type:{name:"boolean | undefined"}},name:{defaultValue:null,description:"",name:"name",required:!1,type:{name:"string | undefined"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"string | undefined"}},indeterminate:{defaultValue:null,description:"",name:"indeterminate",required:!1,type:{name:"boolean | undefined"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}}}catch(e){}const wt={title:"Components/Checkbox",tags:["autodocs"],component:b,parameters:{layout:"centered",docs:{description:{component:"A versatile checkbox component with multiple sizes and states."}}},argTypes:{size:{control:{type:"radio"},options:["sm","md","lg"]},checked:{control:"boolean"},defaultChecked:{control:"boolean"},disabled:{control:"boolean"},required:{control:"boolean"},indeterminate:{control:"boolean"},label:{control:"text"},name:{control:"text"},value:{control:"text"},className:{control:!1},id:{control:"text"},onCheckedChange:{control:!1,action:"checked changed"}}},R={args:{label:"Accept terms and conditions"}},V={args:{label:"Receive newsletter",checked:!0}},z={args:{label:"Disabled option",disabled:!0,checked:!1}},D={args:{label:"Partial selection",indeterminate:!0}},E={render:()=>w("div",{className:"flex flex-col gap-4",children:[r(b,{label:"Small checkbox",size:"sm"}),r(b,{label:"Medium checkbox",size:"md"}),r(b,{label:"Large checkbox",size:"lg"})]})},F={render:()=>{const[e,t]=p.useState(!1);return r(b,{label:`Controlled checkbox (${e?"checked":"unchecked"})`,checked:e,onCheckedChange:a=>t(a===!0)})}},$={render:()=>r(b,{label:"Uncontrolled checkbox",defaultChecked:!0,onCheckedChange:e=>console.log("checked changed:",e)})},T={render:()=>{const[e,t]=p.useState("indeterminate"),a=()=>{t(e==="indeterminate"?!0:e===!0?!1:"indeterminate")};return r(b,{label:`State: ${String(e)}`,checked:e==="indeterminate"?!1:e,indeterminate:e==="indeterminate",onCheckedChange:a})}},O={render:()=>{const e=Ve({terms:j().required().oneOf([!0],"You must accept the terms and conditions"),newsletter:j().required(),marketing:j().required()}),{control:t,handleSubmit:a,formState:{errors:o}}=ze({resolver:De(e),defaultValues:{terms:!1,newsletter:!1,marketing:!1}});return w("form",{onSubmit:a(s=>{alert(`Submitted:
Terms: ${s.terms}
Newsletter: ${s.newsletter}
Marketing: ${s.marketing}`)}),className:"space-y-4 w-80",children:[w("div",{children:[r(U,{name:"terms",control:t,render:({field:s})=>r(b,{label:"I accept the terms and conditions *",checked:s.value,onCheckedChange:s.onChange})}),o.terms&&r("p",{className:"text-sm text-red-600 mt-1",children:o.terms.message})]}),r("div",{children:r(U,{name:"newsletter",control:t,render:({field:s})=>r(b,{label:"Subscribe to newsletter",checked:s.value,onCheckedChange:s.onChange})})}),r("div",{children:r(U,{name:"marketing",control:t,render:({field:s})=>r(b,{label:"Receive marketing emails",checked:s.value,onCheckedChange:s.onChange})})}),r("button",{type:"submit",className:"px-3 py-1 rounded bg-green-600 text-white text-sm",children:"Submit"})]})}},A={render:()=>{var h;const e=Ve({selectedItems:Je(Qe().required()).required().min(1,"Please select at least one option")}),{watch:t,setValue:a,handleSubmit:o,formState:{errors:d}}=ze({resolver:De(e),defaultValues:{selectedItems:[]}}),s=(h=t("selectedItems"))!=null?h:[],i=(u,f)=>{f?a("selectedItems",[...s,u]):a("selectedItems",s.filter(k=>k!==u))},l=u=>{alert(`Selected: ${u.selectedItems.join(", ")}`)},m=[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"},{value:"option4",label:"Option 4"}];return w("form",{onSubmit:o(l),className:"space-y-4 w-80",children:[w("div",{children:[r("p",{className:"text-sm font-medium mb-2",children:"Choose your preferences:"}),r("div",{className:"space-y-2",children:m.map(u=>r(b,{label:u.label,checked:s.includes(u.value),onCheckedChange:f=>i(u.value,f===!0)},u.value))}),d.selectedItems&&r("p",{className:"text-sm text-red-600 mt-1",children:d.selectedItems.message})]}),r("button",{type:"submit",className:"px-3 py-1 rounded bg-green-600 text-white text-sm",children:"Submit Selection"})]})}},M={render:()=>{const[e,t]=p.useState("indeterminate"),[a,o]=p.useState([!1,!0,!1]),d=()=>{e===!0?(o([!1,!1,!1]),t(!1)):(o([!0,!0,!0]),t(!0))},s=(i,l)=>{const m=[...a];m[i]=l,o(m);const h=m.filter(Boolean).length;h===0?t(!1):h===m.length?t(!0):t("indeterminate")};return w("div",{className:"space-y-3 w-80",children:[r("div",{children:r(b,{label:"Select All Features",checked:e==="indeterminate"?!1:e,indeterminate:e==="indeterminate",onCheckedChange:d,size:"lg"})}),r("div",{className:"ml-6 space-y-2",children:["Dark Mode","Notifications","Auto-save"].map((i,l)=>r(b,{label:i,checked:a[l],onCheckedChange:m=>s(l,m===!0)},i))})]})}};var Q,Z,ee;R.parameters=c(n({},R.parameters),{docs:c(n({},(Q=R.parameters)==null?void 0:Q.docs),{source:n({originalSource:`{
  args: {
    label: 'Accept terms and conditions'
  }
} satisfies Story`},(ee=(Z=R.parameters)==null?void 0:Z.docs)==null?void 0:ee.source)})});var te,ne,ae;V.parameters=c(n({},V.parameters),{docs:c(n({},(te=V.parameters)==null?void 0:te.docs),{source:n({originalSource:`{
  args: {
    label: 'Receive newsletter',
    checked: true
  }
} satisfies Story`},(ae=(ne=V.parameters)==null?void 0:ne.docs)==null?void 0:ae.source)})});var re,se,oe;z.parameters=c(n({},z.parameters),{docs:c(n({},(re=z.parameters)==null?void 0:re.docs),{source:n({originalSource:`{
  args: {
    label: 'Disabled option',
    disabled: true,
    checked: false
  }
} satisfies Story`},(oe=(se=z.parameters)==null?void 0:se.docs)==null?void 0:oe.source)})});var ce,le,de;D.parameters=c(n({},D.parameters),{docs:c(n({},(ce=D.parameters)==null?void 0:ce.docs),{source:n({originalSource:`{
  args: {
    label: 'Partial selection',
    indeterminate: true
  }
} satisfies Story`},(de=(le=D.parameters)==null?void 0:le.docs)==null?void 0:de.source)})});var ie,ue,me;E.parameters=c(n({},E.parameters),{docs:c(n({},(ie=E.parameters)==null?void 0:ie.docs),{source:n({originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox" size="md" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
} satisfies Story`},(me=(ue=E.parameters)==null?void 0:ue.docs)==null?void 0:me.source)})});var he,pe,be;F.parameters=c(n({},F.parameters),{docs:c(n({},(he=F.parameters)==null?void 0:he.docs),{source:n({originalSource:`{
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Checkbox label={\`Controlled checkbox (\${checked ? 'checked' : 'unchecked'})\`} checked={checked} onCheckedChange={(val: any) => setChecked(val === true)} />;
  }
} satisfies Story`},(be=(pe=F.parameters)==null?void 0:pe.docs)==null?void 0:be.source)})});var fe,ke,Ce;$.parameters=c(n({},$.parameters),{docs:c(n({},(fe=$.parameters)==null?void 0:fe.docs),{source:n({originalSource:`{
  render: () => <Checkbox label="Uncontrolled checkbox" defaultChecked={true} onCheckedChange={(val: any) => console.log('checked changed:', val)} />
} satisfies Story`},(Ce=(ke=$.parameters)==null?void 0:ke.docs)==null?void 0:Ce.source)})});var ge,xe,ve;T.parameters=c(n({},T.parameters),{docs:c(n({},(ge=T.parameters)==null?void 0:ge.docs),{source:n({originalSource:`{
  render: () => {
    const [state, setState] = useState<boolean | 'indeterminate'>('indeterminate');
    const handleToggle = () => {
      if (state === 'indeterminate') setState(true);else if (state === true) setState(false);else setState('indeterminate');
    };
    return <Checkbox label={\`State: \${String(state)}\`} checked={state === 'indeterminate' ? false : state} indeterminate={state === 'indeterminate'} onCheckedChange={handleToggle} />;
  }
} satisfies Story`},(ve=(xe=T.parameters)==null?void 0:xe.docs)==null?void 0:ve.source)})});var ye,Se,we;O.parameters=c(n({},O.parameters),{docs:c(n({},(ye=O.parameters)==null?void 0:ye.docs),{source:n({originalSource:`{
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
} satisfies Story`},(we=(Se=O.parameters)==null?void 0:Se.docs)==null?void 0:we.source)})});var Ie,Ne,Pe;A.parameters=c(n({},A.parameters),{docs:c(n({},(Ie=A.parameters)==null?void 0:Ie.docs),{source:n({originalSource:`{
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
} satisfies Story`},(Pe=(Ne=A.parameters)==null?void 0:Ne.docs)==null?void 0:Pe.source)})});var qe,_e,Re;M.parameters=c(n({},M.parameters),{docs:c(n({},(qe=M.parameters)==null?void 0:qe.docs),{source:n({originalSource:`{
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
} satisfies Story`},(Re=(_e=M.parameters)==null?void 0:_e.docs)==null?void 0:Re.source)})});const It=["Default","Checked","Disabled","Indeterminate","WithDifferentSizes","ControlledCheckbox","UncontrolledCheckbox","ToggleableIndeterminate","ReactHookFormWithYup","CheckboxGroup","IndeterminateParentChild"];export{A as CheckboxGroup,V as Checked,F as ControlledCheckbox,R as Default,z as Disabled,D as Indeterminate,M as IndeterminateParentChild,O as ReactHookFormWithYup,T as ToggleableIndeterminate,$ as UncontrolledCheckbox,E as WithDifferentSizes,It as __namedExportsOrder,wt as default};
