var C=Object.defineProperty,q=Object.defineProperties;var P=Object.getOwnPropertyDescriptors;var u=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var c=(s,r,n)=>r in s?C(s,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):s[r]=n,o=(s,r)=>{for(var n in r||(r={}))v.call(r,n)&&c(s,n,r[n]);if(u)for(var n of u(r))N.call(r,n)&&c(s,n,r[n]);return s},m=(s,r)=>q(s,P(r));import{a as e,F as E,j as p}from"./jsx-runtime-Cr617v10.js";import{c as S,a as A,d as i,e as $,o as x}from"./index.esm-8fDv6iyI.js";import{u as I,F as B}from"./index.esm-CovI7bOW.js";import{I as h}from"./InputPassword-CAQm8skW.js";import{F as t}from"./Form-6JD4W4bJ.js";import{I as d}from"./Input-BSIDeAe2.js";import{C as R}from"./Checkbox-CEAS5kPU.js";import{B as f}from"./Button-DodV_9Wl.js";import"./index-D2dH9QXU.js";import"./_commonjsHelpers-CDgoFxsB.js";import"./cn-C4RepMSz.js";import"./createLucideIcon-ChpYCihM.js";import"./index-yjVGmfkS.js";import"./Label-BIqHYFl8.js";import"./index-BrWEkG-Y.js";import"./index-BBv4p8m_.js";import"./index-C09-6gTJ.js";import"./index-8BIPUTFA.js";import"./check-icXTfRpT.js";const T=()=>e(E,{}),re={component:T,title:"Components/Form",parameters:{layout:"centered",docs:{description:{component:"A form component that uses React Hook Form and Yup for validation."}}},tags:["autodocs"]},l={render:()=>{const s=S({name:i().required("Name is required").min(2,"Name must be at least 2 characters").max(50,"Name must be less than 50 characters"),email:i().email("Enter a valid email").required("Email is required"),password:i().required("Password is required").min(8,"Password must be at least 8 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,"Password must contain at least one uppercase letter, one lowercase letter, and one number"),confirmPassword:i().required("Please confirm your password").oneOf([$("password")],"Passwords must match"),age:i().required("Age is required").matches(/^[0-9]+$/,"Age must be a number").test("is-positive","You must be at least 13 years old",a=>!!(a&&parseInt(a)>=13)),terms:A().required("You must accept the terms and conditions").oneOf([!0],"You must accept the terms and conditions")}),r=I({resolver:x(s),defaultValues:{name:"",email:"",password:"",confirmPassword:"",age:"",terms:!1},mode:"onChange"}),n=()=>p("span",{children:[e("span",{children:"I agree to the "}),e("a",{href:"#",className:"text-blue-600 hover:underline",children:"Terms and Conditions"}),e("span",{children:" and "}),e("a",{href:"#",className:"text-blue-600 hover:underline",children:"Privacy Policy"})]}),y=a=>{console.log("Form Data:",a),alert(`Registration Successful!
Name: ${a.name}
Email: ${a.email}
Password: ${a.password}
Age: ${a.age}
Terms: ${a.terms}`)},F=a=>{console.log("Form Errors:",a)};return e(B,m(o({},r),{children:p("form",{onSubmit:r.handleSubmit(y,F),className:"space-y-4",children:[e(t,{name:"name",label:"Full Name",description:"Enter your full name as it appears on official documents",required:!0,children:e(d,{placeholder:"Enter your full name",autoComplete:"name",onChange:a=>console.log("Name changed:",a.target.value)})}),e(t,{name:"email",label:"Email Address",description:"We'll never share your email with anyone else",required:!0,children:e(d,{type:"email",placeholder:"Enter your email address",autoComplete:"email"})}),e(t,{name:"age",label:"Age",required:!0,children:e(d,{type:"number",placeholder:"Enter your age",min:"13",max:"120"})}),e(t,{name:"password",label:"Password",description:"Must be at least 8 characters with uppercase, lowercase, and numbers",required:!0,children:e(h,{placeholder:"Create a strong password",autoComplete:"new-password"})}),e(t,{name:"confirmPassword",label:"Confirm Password",required:!0,children:e(h,{placeholder:"Confirm your password",autoComplete:"new-password"})}),e(t,{name:"terms",required:!0,isBoolean:!0,children:e(R,{required:!0,label:e(n,{})})}),e("div",{className:"pt-4",children:e(f,{type:"submit",disabled:r.formState.isSubmitting,className:"w-full",children:r.formState.isSubmitting?"Creating Account...":"Create Account"})}),e(f,{type:"button",variant:"outline",onClick:()=>r.reset(),className:"w-full",children:"Reset Form"})]})}))}};var w,g,b;l.parameters=m(o({},l.parameters),{docs:m(o({},(w=l.parameters)==null?void 0:w.docs),{source:o({originalSource:`{
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
}`},(b=(g=l.parameters)==null?void 0:g.docs)==null?void 0:b.source)})});const ae=["RegistrationForm"];export{l as RegistrationForm,ae as __namedExportsOrder,re as default};
