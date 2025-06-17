import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{c as p,a as h,d as s,e as f,o as w}from"./index.esm-CDmTEbLs.js";import{u as b,F as g}from"./index.esm-B5r5kaiW.js";import{I as i}from"./InputPassword-P7P_eQZt.js";import{F as a}from"./Form-6r68mTog.js";import{I as o}from"./Input-uNLkzt6C.js";import{C as y}from"./Checkbox-CjyB4jnv.js";import{B as m}from"./Button-tFE5omYn.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cn-Dtjc6EhN.js";import"./createLucideIcon-DyoHGKTE.js";import"./Label-Dk0OgnlF.js";import"./index-ChlNXIGl.js";import"./index-Bagf71Y5.js";import"./index-DnB962Pj.js";import"./check-CT2wzrsh.js";const F=()=>e.jsx(e.Fragment,{}),k={component:F,title:"Components/Form",parameters:{layout:"centered",docs:{description:{component:"A form component that uses React Hook Form and Yup for validation."}}},tags:["autodocs"]},t={render:()=>{const l=p({name:s().required("Name is required").min(2,"Name must be at least 2 characters").max(50,"Name must be less than 50 characters"),email:s().email("Enter a valid email").required("Email is required"),password:s().required("Password is required").min(8,"Password must be at least 8 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,"Password must contain at least one uppercase letter, one lowercase letter, and one number"),confirmPassword:s().required("Please confirm your password").oneOf([f("password")],"Passwords must match"),age:s().required("Age is required").matches(/^[0-9]+$/,"Age must be a number").test("is-positive","You must be at least 13 years old",r=>!!(r&&parseInt(r)>=13)),terms:h().required("You must accept the terms and conditions").oneOf([!0],"You must accept the terms and conditions")}),n=b({resolver:w(l),defaultValues:{name:"",email:"",password:"",confirmPassword:"",age:"",terms:!1},mode:"onChange"}),d=()=>e.jsxs("span",{children:[e.jsx("span",{children:"I agree to the "}),e.jsx("a",{href:"#",className:"text-blue-600 hover:underline",children:"Terms and Conditions"}),e.jsx("span",{children:" and "}),e.jsx("a",{href:"#",className:"text-blue-600 hover:underline",children:"Privacy Policy"})]}),u=r=>{console.log("Form Data:",r),alert(`Registration Successful!
Name: ${r.name}
Email: ${r.email}
Password: ${r.password}
Age: ${r.age}
Terms: ${r.terms}`)},c=r=>{console.log("Form Errors:",r)};return e.jsx(g,{...n,children:e.jsxs("form",{onSubmit:n.handleSubmit(u,c),className:"space-y-4",children:[e.jsx(a,{name:"name",label:"Full Name",description:"Enter your full name as it appears on official documents",required:!0,children:e.jsx(o,{placeholder:"Enter your full name",autoComplete:"name",onChange:r=>console.log("Name changed:",r)})}),e.jsx(a,{name:"email",label:"Email Address",description:"We'll never share your email with anyone else",required:!0,children:e.jsx(o,{type:"email",placeholder:"Enter your email address",autoComplete:"email"})}),e.jsx(a,{name:"age",label:"Age",required:!0,children:e.jsx(o,{type:"number",placeholder:"Enter your age",min:"13",max:"120"})}),e.jsx(a,{name:"password",label:"Password",description:"Must be at least 8 characters with uppercase, lowercase, and numbers",required:!0,children:e.jsx(i,{placeholder:"Create a strong password",autoComplete:"new-password"})}),e.jsx(a,{name:"confirmPassword",label:"Confirm Password",required:!0,children:e.jsx(i,{placeholder:"Confirm your password",autoComplete:"new-password"})}),e.jsx(a,{name:"terms",required:!0,isBoolean:!0,children:e.jsx(y,{required:!0,label:e.jsx(d,{})})}),e.jsx("div",{className:"pt-4",children:e.jsx(m,{type:"submit",disabled:n.formState.isSubmitting,className:"w-full",children:n.formState.isSubmitting?"Creating Account...":"Create Account"})}),e.jsx(m,{type:"button",variant:"outline",onClick:()=>n.reset(),className:"w-full",children:"Reset Form"})]})})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
          Privacy Policy
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
            <Input placeholder="Enter your full name" autoComplete="name" onChange={v => console.log("Name changed:", v)} />
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
}`,...t.parameters?.docs?.source}}};const O=["RegistrationForm"];export{t as RegistrationForm,O as __namedExportsOrder,k as default};
