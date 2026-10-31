import{j as e}from"./jsx-runtime-DSvmvvsx.js";import{c as v,d as F,b as o,e as S,o as C}from"./index.esm-BhyIV8Ly.js";import{F as j,a as n}from"./react-hook-form-1I7SNVg-.js";import{r as q}from"./index-B0WjJBI_.js";import{u as P}from"./index.esm-CbvOEqST.js";import{I as a}from"./Input-BHICaYbx.js";import{I as b}from"./InputPassword-Cx_LsS-w.js";import{C as I}from"./Checkbox-CdPcn2MZ.js";import{B as w}from"./Button-CSLSlcO9.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Form-DjjlGdbW.js";import"./cn-BaF2GUMg.js";import"./useMachine-DSGsW_My.js";import"./Label-mrk_WNRp.js";import"./icons-DN7Z3vsR.js";const H={title:"Components/Input",tags:["autodocs"],component:a,argTypes:{type:{control:{type:"radio"},options:["text","password","email","number","search","tel","url"]},placeholder:{control:"text"},value:{control:"text"},disabled:{control:"boolean"},readOnly:{control:"boolean"},required:{control:"boolean"},error:{control:"boolean"},autoFocus:{control:"boolean"},size:{control:{type:"radio"},options:["sm","md","lg"]},variant:{control:{type:"radio"},options:["outline","filled","flushed","unstyled"]},fullWidth:{control:"boolean"},className:{control:!1}}},l={args:{placeholder:"Enter text..."}},i={args:{placeholder:"Disabled input",disabled:!0}},d={args:{placeholder:"Input with error",error:!0}},u={args:{placeholder:"Full width input",fullWidth:!0}},m={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 w-64",children:[e.jsx(a,{placeholder:"Small",size:"sm"}),e.jsx(a,{placeholder:"Medium",size:"md"}),e.jsx(a,{placeholder:"Large",size:"lg"})]})},c={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 w-64",children:[e.jsx(a,{placeholder:"Outline (default)",variant:"outline"}),e.jsx(a,{placeholder:"Filled",variant:"filled"}),e.jsx(a,{placeholder:"Flushed",variant:"flushed"}),e.jsx(a,{placeholder:"Unstyled",variant:"unstyled"})]})},p={render:()=>{const[t,s]=q.useState("");return e.jsx(a,{placeholder:"Type here...",value:t,onChange:g=>s(g.target.value)})}},h={render:()=>e.jsx(a,{placeholder:"Uncontrolled input",defaultValue:"Initial value",onChange:t=>console.log("value changed:",t.target.value)})},f={render:()=>{const t=v({name:o().required("Name is required").min(2,"Name must be at least 2 characters").max(50,"Name must be less than 50 characters"),email:o().email("Enter a valid email").required("Email is required"),password:o().required("Password is required").min(8,"Password must be at least 8 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,"Password must contain at least one uppercase letter, one lowercase letter, and one number"),confirmPassword:o().required("Please confirm your password").oneOf([S("password")],"Passwords must match"),age:o().required("Age is required").matches(/^[0-9]+$/,"Age must be a number").test("is-positive","You must be at least 13 years old",r=>!!(r&&parseInt(r)>=13)),terms:F().required("You must accept the terms and conditions").oneOf([!0],"You must accept the terms and conditions")}),s=P({resolver:C(t),defaultValues:{name:"",email:"",password:"",confirmPassword:"",age:"",terms:!1},mode:"onChange"}),g=()=>e.jsxs("span",{children:[e.jsx("span",{children:"I agree to the "}),e.jsx("a",{href:"#",className:"text-blue-600 hover:underline",children:"Terms and Conditions"}),e.jsx("span",{children:" and "}),e.jsx("a",{href:"#",className:"text-blue-600 hover:underline",children:"Privacy Pol"})]}),x=r=>{console.log("Form Data:",r),alert(`Registration Successful!
Name: ${r.name}
Email: ${r.email}
Password: ${r.password}
Age: ${r.age}
Terms: ${r.terms}`)},y=r=>{console.log("Form Errors:",r)};return e.jsx(j,{...s,children:e.jsxs("form",{onSubmit:s.handleSubmit(x,y),className:"space-y-4",children:[e.jsx(n,{name:"name",label:"Full Name",description:"Enter your full name as it appears on official documents",required:!0,children:e.jsx(a,{placeholder:"Enter your full name",autoComplete:"name",onChange:r=>console.log("Name changed:",r.target.value)})}),e.jsx(n,{name:"email",label:"Email Address",description:"We'll never share your email with anyone else",required:!0,children:e.jsx(a,{type:"email",placeholder:"Enter your email address",autoComplete:"email"})}),e.jsx(n,{name:"age",label:"Age",required:!0,children:e.jsx(a,{type:"number",placeholder:"Enter your age",min:"13",max:"120"})}),e.jsx(n,{name:"password",label:"Password",description:"Must be at least 8 characters with uppercase, lowercase, and numbers",required:!0,children:e.jsx(b,{placeholder:"Create a strong password",autoComplete:"new-password"})}),e.jsx(n,{name:"confirmPassword",label:"Confirm Password",required:!0,children:e.jsx(b,{placeholder:"Confirm your password",autoComplete:"new-password"})}),e.jsx(n,{name:"terms",required:!0,isBoolean:!0,children:e.jsx(I,{required:!0,label:e.jsx(g,{})})}),e.jsx("div",{className:"pt-4",children:e.jsx(w,{type:"submit",disabled:s.formState.isSubmitting,className:"w-full",children:s.formState.isSubmitting?"Creating Account...":"Create Account"})}),e.jsx(w,{type:"button",variant:"outline",onClick:()=>s.reset(),className:"w-full",children:"Reset Form"})]})})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter text..."
  }
} satisfies Story`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Disabled input",
    disabled: true
  }
} satisfies Story`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Input with error",
    error: true
  }
} satisfies Story`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Full width input",
    fullWidth: true
  }
} satisfies Story`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      <Input placeholder="Small" size="sm" />
      <Input placeholder="Medium" size="md" />
      <Input placeholder="Large" size="lg" />
    </div>
} satisfies Story`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      <Input placeholder="Outline (default)" variant="outline" />
      <Input placeholder="Filled" variant="filled" />
      <Input placeholder="Flushed" variant="flushed" />
      <Input placeholder="Unstyled" variant="unstyled" />
    </div>
} satisfies Story`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <Input placeholder="Type here..." value={value} onChange={e => setValue(e.target.value)} />;
  }
} satisfies Story`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Input placeholder="Uncontrolled input" defaultValue="Initial value" onChange={e => console.log("value changed:", e.target.value)} />
} satisfies Story`,...h.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
    const onError: SubmitErrorHandler<FormData> = errors => {
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
} satisfies Story`,...f.parameters?.docs?.source}}};const M=["Default","Disabled","WithError","FullWidth","Sizes","Variants","ControlledInput","UncontrolledInput","ReactHookFormWithYup"];export{p as ControlledInput,l as Default,i as Disabled,u as FullWidth,f as ReactHookFormWithYup,m as Sizes,h as UncontrolledInput,c as Variants,d as WithError,M as __namedExportsOrder,H as default};
