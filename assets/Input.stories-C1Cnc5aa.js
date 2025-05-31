var Q=Object.defineProperty,ee=Object.defineProperties;var re=Object.getOwnPropertyDescriptors;var v=Object.getOwnPropertySymbols;var ae=Object.prototype.hasOwnProperty,ne=Object.prototype.propertyIsEnumerable;var S=(s,a,t)=>a in s?Q(s,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[a]=t,r=(s,a)=>{for(var t in a||(a={}))ae.call(a,t)&&S(s,t,a[t]);if(v)for(var t of v(a))ne.call(a,t)&&S(s,t,a[t]);return s},n=(s,a)=>ee(s,re(a));import{j as y,a as e}from"./jsx-runtime-Cr617v10.js";import{c as se,a as te,d,e as oe,o as le}from"./index.esm-CUaDp5zZ.js";import{u as l,Y as ie,z as i,f as F,K as de,I as C}from"./index-BfP1bvMz.js";import{r as ue}from"./index-D2dH9QXU.js";import{u as me}from"./index.esm-0XuDu32R.js";import"./_commonjsHelpers-CDgoFxsB.js";import"./index-8BIPUTFA.js";const ve={title:"Components/Input",tags:["autodocs"],component:l,argTypes:{type:{control:{type:"radio"},options:["text","password","email","number","search","tel","url"]},placeholder:{control:"text"},value:{control:"text"},disabled:{control:"boolean"},readOnly:{control:"boolean"},required:{control:"boolean"},error:{control:"boolean"},autoFocus:{control:"boolean"},size:{control:{type:"radio"},options:["sm","md","lg"]},variant:{control:{type:"radio"},options:["default","filled","outline","ghost"]},fullWidth:{control:"boolean"},className:{control:!1}}},u={args:{placeholder:"Enter text..."}},m={args:{placeholder:"Disabled input",disabled:!0}},c={args:{placeholder:"Input with error",error:!0}},p={args:{placeholder:"Full width input",fullWidth:!0}},h={render:()=>y("div",{className:"flex flex-col gap-4 w-64",children:[e(l,{placeholder:"Small",size:"sm"}),e(l,{placeholder:"Medium",size:"md"}),e(l,{placeholder:"Large",size:"lg"})]})},f={render:()=>y("div",{className:"flex flex-col gap-4 w-64",children:[e(l,{placeholder:"Default",variant:"default"}),e(l,{placeholder:"Filled",variant:"filled"}),e(l,{placeholder:"Outline",variant:"outline"}),e(l,{placeholder:"Ghost",variant:"ghost"})]})},g={render:()=>{const[s,a]=ue.useState("");return e(l,{placeholder:"Type here...",value:s,onChange:t=>a(t.target.value)})}},b={render:()=>e(l,{placeholder:"Uncontrolled input",defaultValue:"Initial value",onChange:s=>console.log("value changed:",s.target.value)})},w={render:()=>{const s=se({name:d().required("Name is required").min(2,"Name must be at least 2 characters").max(50,"Name must be less than 50 characters"),email:d().email("Enter a valid email").required("Email is required"),password:d().required("Password is required").min(8,"Password must be at least 8 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,"Password must contain at least one uppercase letter, one lowercase letter, and one number"),confirmPassword:d().required("Please confirm your password").oneOf([oe("password")],"Passwords must match"),age:d().required("Age is required").matches(/^[0-9]+$/,"Age must be a number").test("is-positive","You must be at least 13 years old",o=>!!(o&&parseInt(o)>=13)),terms:te().required("You must accept the terms and conditions").oneOf([!0],"You must accept the terms and conditions")}),a=me({resolver:le(s),defaultValues:{name:"",email:"",password:"",confirmPassword:"",age:"",terms:!1},mode:"onChange"}),t=()=>y("span",{children:[e("span",{children:"I agree to the "}),e("a",{href:"#",className:"text-blue-600 hover:underline",children:"Terms and Conditions"}),e("span",{children:" and "}),e("a",{href:"#",className:"text-blue-600 hover:underline",children:"Privacy Pol"})]}),X=o=>{console.log("Form Data:",o),alert(`Registration Successful!
Name: ${o.name}
Email: ${o.email}
Password: ${o.password}
Age: ${o.age}
Terms: ${o.terms}`)},J=o=>{console.log("Form Errors:",o)};return e(ie,n(r({},a),{children:y("form",{onSubmit:a.handleSubmit(X,J),className:"space-y-4",children:[e(i,{name:"name",label:"Full Name",description:"Enter your full name as it appears on official documents",required:!0,children:e(l,{placeholder:"Enter your full name",autoComplete:"name",onChange:o=>console.log("Name changed:",o.target.value)})}),e(i,{name:"email",label:"Email Address",description:"We'll never share your email with anyone else",required:!0,children:e(l,{type:"email",placeholder:"Enter your email address",autoComplete:"email"})}),e(i,{name:"age",label:"Age",required:!0,children:e(l,{type:"number",placeholder:"Enter your age",min:"13",max:"120"})}),e(i,{name:"password",label:"Password",description:"Must be at least 8 characters with uppercase, lowercase, and numbers",required:!0,children:e(F,{placeholder:"Create a strong password",autoComplete:"new-password"})}),e(i,{name:"confirmPassword",label:"Confirm Password",required:!0,children:e(F,{placeholder:"Confirm your password",autoComplete:"new-password"})}),e(i,{name:"terms",required:!0,isBoolean:!0,children:e(de,{required:!0,label:e(t,{})})}),e("div",{className:"pt-4",children:e(C,{type:"submit",disabled:a.formState.isSubmitting,className:"w-full",children:a.formState.isSubmitting?"Creating Account...":"Create Account"})}),e(C,{type:"button",variant:"outline",onClick:()=>a.reset(),className:"w-full",children:"Reset Form"})]})}))}};var q,P,N;u.parameters=n(r({},u.parameters),{docs:n(r({},(q=u.parameters)==null?void 0:q.docs),{source:r({originalSource:`{
  args: {
    placeholder: "Enter text..."
  }
} satisfies Story`},(N=(P=u.parameters)==null?void 0:P.docs)==null?void 0:N.source)})});var I,x,E;m.parameters=n(r({},m.parameters),{docs:n(r({},(I=m.parameters)==null?void 0:I.docs),{source:r({originalSource:`{
  args: {
    placeholder: "Disabled input",
    disabled: true
  }
} satisfies Story`},(E=(x=m.parameters)==null?void 0:x.docs)==null?void 0:E.source)})});var A,$,D;c.parameters=n(r({},c.parameters),{docs:n(r({},(A=c.parameters)==null?void 0:A.docs),{source:r({originalSource:`{
  args: {
    placeholder: "Input with error",
    error: true
  }
} satisfies Story`},(D=($=c.parameters)==null?void 0:$.docs)==null?void 0:D.source)})});var z,T,W;p.parameters=n(r({},p.parameters),{docs:n(r({},(z=p.parameters)==null?void 0:z.docs),{source:r({originalSource:`{
  args: {
    placeholder: "Full width input",
    fullWidth: true
  }
} satisfies Story`},(W=(T=p.parameters)==null?void 0:T.docs)==null?void 0:W.source)})});var V,Y,B;h.parameters=n(r({},h.parameters),{docs:n(r({},(V=h.parameters)==null?void 0:V.docs),{source:r({originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      <Input placeholder="Small" size="sm" />
      <Input placeholder="Medium" size="md" />
      <Input placeholder="Large" size="lg" />
    </div>
} satisfies Story`},(B=(Y=h.parameters)==null?void 0:Y.docs)==null?void 0:B.source)})});var O,R,k;f.parameters=n(r({},f.parameters),{docs:n(r({},(O=f.parameters)==null?void 0:O.docs),{source:r({originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      <Input placeholder="Default" variant="default" />
      <Input placeholder="Filled" variant="filled" />
      <Input placeholder="Outline" variant="outline" />
      <Input placeholder="Ghost" variant="ghost" />
    </div>
} satisfies Story`},(k=(R=f.parameters)==null?void 0:R.docs)==null?void 0:k.source)})});var U,j,M;g.parameters=n(r({},g.parameters),{docs:n(r({},(U=g.parameters)==null?void 0:U.docs),{source:r({originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <Input placeholder="Type here..." value={value} onChange={e => setValue(e.target.value)} />;
  }
} satisfies Story`},(M=(j=g.parameters)==null?void 0:j.docs)==null?void 0:M.source)})});var H,G,K;b.parameters=n(r({},b.parameters),{docs:n(r({},(H=b.parameters)==null?void 0:H.docs),{source:r({originalSource:`{
  render: () => <Input placeholder="Uncontrolled input" defaultValue="Initial value" onChange={e => console.log("value changed:", e.target.value)} />
} satisfies Story`},(K=(G=b.parameters)==null?void 0:G.docs)==null?void 0:K.source)})});var L,Z,_;w.parameters=n(r({},w.parameters),{docs:n(r({},(L=w.parameters)==null?void 0:L.docs),{source:r({originalSource:`{
  render: () => {
    const schema = yup.object({
      name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
      email: yup.string().email("Enter a valid email").required("Email is required"),
      password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
      confirmPassword: yup.string().required("Please confirm your password").oneOf([yup.ref("password")], "Passwords must match"),
      age: yup.string().required("Age is required").matches(/^[0-9]+$/, "Age must be a number").test("is-positive", "You must be at least 13 years old", value => !!(value && parseInt(value) >= 13)),
      terms: yup.boolean().required("You must accept the terms and conditions").oneOf([true], "You must accept the terms and conditions")
    });

    // Define the form data type explicitly
    interface FormData {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      age: string;
      terms: boolean;
    }
    const form = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        terms: false
      },
      mode: "onChange" // Validate on change for better UX
    });
    const TermCondition = () => <span>
        <span>I agree to the </span>
        <a href="#" className="text-blue-600 hover:underline">
          Terms and Conditions
        </a>
        <span> and </span>
        <a href="#" className="text-blue-600 hover:underline">
          Privacy Pol
        </a>
      </span>;
    const onSubmit: SubmitHandler<FormData> = data => {
      console.log("Form Data:", data);
      alert(\`Registration Successful!\\nName: \${data.name}\\nEmail: \${data.email}\\nPassword: \${data.password}\\nAge: \${data.age}\\nTerms: \${data.terms}\`);
    };
    const onError = (errors: any) => {
      console.log("Form Errors:", errors);
    };
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
          {/* Name Field */}
          <Field name="name" label="Full Name" description="Enter your full name as it appears on official documents" required>
            <Input placeholder="Enter your full name" autoComplete="name" onChange={e => console.log("Name changed:", e.target.value)} />
          </Field>

          {/* Email Field */}
          <Field name="email" label="Email Address" description="We'll never share your email with anyone else" required>
            <Input type="email" placeholder="Enter your email address" autoComplete="email" />
          </Field>

          {/* Age Field */}
          <Field name="age" label="Age" required>
            <Input type="number" placeholder="Enter your age" min="13" max="120" />
          </Field>

          {/* Password Field */}
          <Field name="password" label="Password" description="Must be at least 8 characters with uppercase, lowercase, and numbers" required>
            <InputPassword placeholder="Create a strong password" autoComplete="new-password" />
          </Field>

          {/* Confirm Password Field */}
          <Field name="confirmPassword" label="Confirm Password" required>
            <InputPassword placeholder="Confirm your password" autoComplete="new-password" />
          </Field>

          {/* Terms and Conditions */}
          <Field name="terms" required isBoolean>
            <Checkbox required label={<TermCondition />} />
          </Field>

          {/* Submit Button */}
          <div className="pt-4">
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
              {form.formState.isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </div>

          {/* Reset Button */}
          <Button type="button" variant="outline" onClick={() => form.reset()} className="w-full">
            Reset Form
          </Button>
        </form>
      </Form>;
  }
} satisfies Story`},(_=(Z=w.parameters)==null?void 0:Z.docs)==null?void 0:_.source)})});const Se=["Default","Disabled","WithError","FullWidth","Sizes","Variants","ControlledInput","UncontrolledInput","ReactHookFormWithYup"];export{g as ControlledInput,u as Default,m as Disabled,p as FullWidth,w as ReactHookFormWithYup,h as Sizes,b as UncontrolledInput,f as Variants,c as WithError,Se as __namedExportsOrder,ve as default};
