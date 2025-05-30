var Ce=Object.defineProperty,xe=Object.defineProperties;var Ee=Object.getOwnPropertyDescriptors;var j=Object.getOwnPropertySymbols;var Ie=Object.prototype.hasOwnProperty,ke=Object.prototype.propertyIsEnumerable;var M=(a,n,o)=>n in a?Ce(a,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):a[n]=o,r=(a,n)=>{for(var o in n||(n={}))Ie.call(n,o)&&M(a,o,n[o]);if(j)for(var o of j(n))ke.call(n,o)&&M(a,o,n[o]);return a},s=(a,n)=>xe(a,Ee(n));import{a as e,j as b}from"./jsx-runtime-Cr617v10.js";import{u as c,F as m}from"./index.esm-CovI7bOW.js";import{c as d,d as l,a as R,b as Pe,o as u}from"./index.esm-8fDv6iyI.js";import{R as Te}from"./index-D2dH9QXU.js";import{I as i}from"./Input-BSIDeAe2.js";import{S as ge}from"./Select-CS_Z7Pq3.js";import{R as Ve}from"./Radio-C11chMwQ.js";import{S as Re}from"./Switch-CQ-jLdZS.js";import{F as t,a as Ae,b as Be}from"./Form-6JD4W4bJ.js";import{B as P}from"./Button-DodV_9Wl.js";import{C as A}from"./Checkbox-CEAS5kPU.js";import"./_commonjsHelpers-CDgoFxsB.js";import"./cn-C4RepMSz.js";import"./index-8BIPUTFA.js";import"./index-BrWEkG-Y.js";import"./index-BMJj23KH.js";import"./index-yjVGmfkS.js";import"./index-C09-6gTJ.js";import"./createLucideIcon-ChpYCihM.js";import"./check-icXTfRpT.js";import"./index-BBv4p8m_.js";import"./Label-BIqHYFl8.js";const or={title:"Components/Form/Field",component:t,parameters:{layout:"centered",docs:{description:{component:"A flexible form field component that wraps form controls with labels, descriptions, and error messages."}}},argTypes:{name:{control:"text",description:"The name of the form field"},label:{control:"text",description:"Label text for the field"},description:{control:"text",description:"Helper text displayed below the field"},required:{control:"boolean",description:"Whether the field is required"},hideError:{control:"boolean",description:"Hide error messages"},isBoolean:{control:"boolean",description:"Mark the field as a boolean field. ex: Checkbox (single not group), Switch."},isRadio:{control:"boolean",description:"Mark the field as a Radio field"},className:{control:"text",description:"Additional CSS classes"}},tags:["autodocs"]},F={render:a=>{const n=d({username:l().required("Username is required").matches(/^[a-zA-Z0-9_]{3,20}$/,"Username must be 3-20 characters long and can only contain letters, numbers, and underscores")}),o=c({resolver:u(n),defaultValues:{username:""}}),h=f=>{alert(`Registration Successful!
Username: ${f.username}`)};return e(m,s(r({},o),{children:b("form",{className:"space-y-4 min-w-[300px]",onSubmit:o.handleSubmit(h),children:[e(t,s(r({},a),{children:e(i,{placeholder:"Enter your name"})})),e(P,{type:"submit",children:"Submit"})]})}))},args:{name:"username",label:"Username",description:"Enter your preferred username",required:!0,hideError:!1,isBoolean:!1,className:""}},v={render:()=>{const a=d({email:l().email("Enter a valid email").required("Email is required")}),n=c({resolver:u(a),defaultValues:{email:""}});return e(m,s(r({},n),{children:e("form",{className:"space-y-4 min-w-[300px]",children:e(t,{name:"email",label:"Email Address",description:"We'll never share your email with anyone else",required:!0,children:e(i,{placeholder:"Enter your email"})})})}))}},g={render:()=>{const a=d({country:l().required("Please select a country")}),n=c({resolver:u(a),defaultValues:{country:""}}),o=[{value:"id",label:"Indonesia"},{value:"us",label:"United States"},{value:"ca",label:"Canada"},{value:"mx",label:"Mexico"}];return e(m,s(r({},n),{children:e("form",{className:"space-y-4 min-w-[300px]",children:e(t,{name:"country",label:"Country",description:"Select your country of residence",required:!0,children:e(ge,{options:o})})})}))}},w={render:()=>{const a=d({gender:l().required("Please select a gender")}),n=c({resolver:u(a),defaultValues:{gender:""}}),o=[{value:"male",label:"Male"},{value:"female",label:"Female"},{value:"other",label:"Other"}];return e(m,s(r({},n),{children:e("form",{className:"space-y-4 min-w-[300px]",children:e(t,{name:"gender",label:"Gender",description:"Select your gender",required:!0,isRadio:!0,children:e(Ve,{items:o,onValueChange:h=>console.log(`Gender: ${h}`)})})})}))}},q={render:()=>{const a=d({acceptTerms:R().required("You must accept the terms and conditions")}),n=c({resolver:u(a),defaultValues:{acceptTerms:!1}});return e(m,s(r({},n),{children:e("form",{className:"space-y-4 min-w-[300px]",children:e(t,{name:"acceptTerms",isBoolean:!0,children:e(A,{label:"I accept the terms and conditions",required:!0,onCheckedChange:o=>console.log(`checked changed: ${o}`)})})})}))}},S={render:()=>{const a=d({acceptTerms:R().required("You must accept the terms and conditions")}),n=c({resolver:u(a),defaultValues:{acceptTerms:!1}});return e(m,s(r({},n),{children:e("form",{className:"space-y-4 min-w-[300px]",children:e(t,{name:"acceptTerms",isBoolean:!0,children:e(Re,{label:"I accept the terms and conditions",required:!0,onCheckedChange:o=>console.log(`checked changed: ${o}`)})})})}))}},N={render:()=>{const a=d({name:l()}),n=c({resolver:u(a),defaultValues:{name:""}});return e(m,s(r({},n),{children:e("form",{className:"space-y-4 min-w-[300px]",children:e(t,{name:"search",description:"Type to search for items",children:e(i,{placeholder:"Search..."})})})}))}},C={render:()=>{const a=d({email:l().email("Enter a valid email").required("Email is required")}),n=c({resolver:u(a),defaultValues:{email:""}});return e(m,s(r({},n),{children:e("form",{className:"space-y-4 min-w-[300px]",children:e(t,{name:"email",label:"Email Address",description:"We'll never share your email with anyone else",required:!0,hideError:!0,children:e(i,{placeholder:"Enter your email"})})})}))}},x={render:()=>{const a=d({custom:l()}),n=c({resolver:u(a),defaultValues:{custom:""}});return e(m,s(r({},n),{children:e(t,{name:"custom",label:"Custom Styled Field",description:"This field has custom styling applied",className:"p-4 bg-gray-50 rounded-lg border",children:e(i,{placeholder:"Custom styled input"})})}))}},E={render:()=>{var B;const a=d({firstName:l().required(),lastName:l().required(),email:l().email().required(),newsletter:Pe(l().required()).required().min(1,"Please select at least one option")}),n=c({resolver:u(a),defaultValues:{firstName:"",lastName:"",email:"",newsletter:[]}}),{watch:o,setValue:h,handleSubmit:f,formState:{errors:T}}=n,V=(B=o("newsletter"))!=null?B:[],we=[{value:"tech",label:"Technology"},{value:"health",label:"Health & Wellness"},{value:"finance",label:"Finance & Investing"},{value:"travel",label:"Travel & Adventure"},{value:"food",label:"Food & Recipes"},{value:"sports",label:"Sports & Fitness"},{value:"entertainment",label:"Movies & TV Shows"},{value:"science",label:"Science & Innovation"}],qe=(p,y)=>{y?h("newsletter",[...V,p]):h("newsletter",V.filter(Ne=>Ne!==p))},Se=p=>{console.log("Form submitted:",p),alert("Form submitted successfully! Check console for data.")};return e(m,s(r({},n),{children:b("form",{onSubmit:f(Se),className:"space-y-4 min-w-[400px] p-4 border rounded-md",children:[e(t,{name:"firstName",label:"First Name",required:!0,children:e(i,{placeholder:"John"})}),e(t,{name:"lastName",label:"Last Name",required:!0,children:e(i,{placeholder:"Doe"})}),e(t,{name:"email",label:"Email",description:"We'll use this to contact you",required:!0,children:e(i,{type:"email",placeholder:"john@example.com"})}),b("div",{className:"space-y-2",children:[e(Ae,{id:"newsletter",error:!!T.newsletter,children:"Select newsletter topics you're interested in:"}),e("div",{className:"grid grid-cols-2 gap-4",children:we.map(p=>e(t,{name:"newsletter",hideError:!0,children:e(A,{label:p.label,value:p.value,checked:V.includes(p.value),onCheckedChange:y=>{y&&n.clearErrors("newsletter"),qe(p.value,y===!0)}})},p.value))}),T.newsletter&&e(Be,{children:T.newsletter.message})]}),e(P,{type:"submit",children:"Submit"})]})}))}},I={render:()=>{const a=c({defaultValues:{password:"",confirmPassword:""},mode:"onChange"}),n=a.watch("password"),o=a.watch("confirmPassword");return Te.useEffect(()=>{o&&n!==o?a.setError("confirmPassword",{type:"manual",message:"Passwords do not match"}):a.clearErrors("confirmPassword")},[n,o,a]),e(m,s(r({},a),{children:b("form",{className:"space-y-4 min-w-[300px]",children:[e(t,{name:"password",label:"Password",description:"Must be at least 8 characters",required:!0,children:e(i,{type:"password",placeholder:"Enter password"})}),e(t,{name:"confirmPassword",label:"Confirm Password",required:!0,children:e(i,{type:"password",placeholder:"Confirm password"})}),e(P,{type:"submit",children:"Create Account"})]})}))}},k={render:()=>{const a=d({firstName:l().required("First name is required"),lastName:l().required("Last name is required"),email:l().email("Invalid email format").required("Email is required"),age:l().required("Age is required").matches(/^[0-9]+$/,"Age must be a number").test("is-positive","You must be at least 18 years old",f=>!!(f&&parseInt(f)>=18)),country:l().required("Please select a country"),acceptTerms:R().oneOf([!0],"You must accept the terms and conditions")}),n=c({resolver:u(a),mode:"onChange",defaultValues:{firstName:"",lastName:"",email:"",age:"",country:"",acceptTerms:!1}}),o=[{value:"id",label:"Indonesia"},{value:"us",label:"United States"},{value:"uk",label:"United Kingdom"},{value:"ca",label:"Canada"},{value:"au",label:"Australia"}],h=f=>{console.log("Form submitted:",f),alert("Form submitted successfully! Check console for data.")};return e(m,s(r({},n),{children:b("form",{onSubmit:n.handleSubmit(h),className:"space-y-4 w-96",children:[e(t,{name:"firstName",label:"First Name",required:!0,children:e(i,{placeholder:"John"})}),e(t,{name:"lastName",label:"Last Name",required:!0,children:e(i,{placeholder:"Doe"})}),e(t,{name:"email",label:"Email Address",description:"We'll never share your email",required:!0,children:e(i,{type:"email",placeholder:"john@example.com"})}),e(t,{name:"age",label:"Age",description:"Must be 18 or older",required:!0,children:e(i,{type:"number",placeholder:"25"})}),e(t,{name:"country",label:"Country",description:"Select your country of residence",required:!0,children:e(ge,{placeholder:"Select a country",options:o})}),e(t,{name:"acceptTerms",isBoolean:!0,children:e(A,{label:"I accept the terms and conditions",required:!0})}),e(P,{type:"submit",className:"w-full",children:"Submit Form"})]})}))}};var $,L,U;F.parameters=s(r({},F.parameters),{docs:s(r({},($=F.parameters)==null?void 0:$.docs),{source:r({originalSource:`{
  render: args => {
    const schema = yup.object({
      username: yup.string().required("Username is required").matches(/^[a-zA-Z0-9_]{3,20}$/, "Username must be 3-20 characters long and can only contain letters, numbers, and underscores")
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        username: ""
      }
    });
    const handleSubmit: SubmitHandler<{
      username: string;
    }> = data => {
      alert(\`Registration Successful!\\nUsername: \${data.username}\`);
    };
    return <Form {...form}>
        <form className="space-y-4 min-w-[300px]" onSubmit={form.handleSubmit(handleSubmit)}>
          <Field {...args}>
            <Input placeholder="Enter your name" />
          </Field>
          <Button type="submit">Submit</Button>
        </form>
      </Form>;
  },
  args: {
    name: "username",
    label: "Username",
    description: "Enter your preferred username",
    required: true,
    hideError: false,
    isBoolean: false,
    className: ""
  }
}`},(U=(L=F.parameters)==null?void 0:L.docs)==null?void 0:U.source)})});var W,O,Y;v.parameters=s(r({},v.parameters),{docs:s(r({},(W=v.parameters)==null?void 0:W.docs),{source:r({originalSource:`{
  render: () => {
    const schema = yup.object({
      email: yup.string().email("Enter a valid email").required("Email is required")
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        email: ""
      }
    });
    return <Form {...form}>
        <form className="space-y-4 min-w-[300px]">
          <Field name="email" label="Email Address" description={\`We'll never share your email with anyone else\`} required>
            <Input placeholder="Enter your email" />
          </Field>
        </form>
      </Form>;
  }
}`},(Y=(O=v.parameters)==null?void 0:O.docs)==null?void 0:Y.source)})});var G,H,D;g.parameters=s(r({},g.parameters),{docs:s(r({},(G=g.parameters)==null?void 0:G.docs),{source:r({originalSource:`{
  render: () => {
    const schema = yup.object({
      country: yup.string().required("Please select a country")
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        country: ""
      }
    });
    const optionList = [{
      value: "id",
      label: "Indonesia"
    }, {
      value: "us",
      label: "United States"
    }, {
      value: "ca",
      label: "Canada"
    }, {
      value: "mx",
      label: "Mexico"
    }];
    return <Form {...form}>
        <form className="space-y-4 min-w-[300px]">
          <Field name="country" label="Country" description="Select your country of residence" required>
            <Select options={optionList} />
          </Field>
        </form>
      </Form>;
  }
}`},(D=(H=g.parameters)==null?void 0:H.docs)==null?void 0:D.source)})});var J,_,z;w.parameters=s(r({},w.parameters),{docs:s(r({},(J=w.parameters)==null?void 0:J.docs),{source:r({originalSource:`{
  render: () => {
    const schema = yup.object({
      gender: yup.string().required("Please select a gender")
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        gender: ""
      }
    });
    const options = [{
      value: "male",
      label: "Male"
    }, {
      value: "female",
      label: "Female"
    }, {
      value: "other",
      label: "Other"
    }];
    return <Form {...form}>
        <form className="space-y-4 min-w-[300px]">
          <Field name="gender" label="Gender" description="Select your gender" required isRadio>
            <Radio items={options} onValueChange={value => console.log(\`Gender: \${value}\`)} />
          </Field>
        </form>
      </Form>;
  }
}`},(z=(_=w.parameters)==null?void 0:_.docs)==null?void 0:z.source)})});var K,Z,Q;q.parameters=s(r({},q.parameters),{docs:s(r({},(K=q.parameters)==null?void 0:K.docs),{source:r({originalSource:`{
  render: () => {
    const schema = yup.object({
      acceptTerms: yup.boolean().required("You must accept the terms and conditions")
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        acceptTerms: false
      }
    });
    return <Form {...form}>
        <form className="space-y-4 min-w-[300px]">
          <Field name="acceptTerms" isBoolean>
            <Checkbox label="I accept the terms and conditions" required onCheckedChange={val => console.log(\`checked changed: \${val}\`)} />
          </Field>
        </form>
      </Form>;
  }
}`},(Q=(Z=q.parameters)==null?void 0:Z.docs)==null?void 0:Q.source)})});var X,ee,re;S.parameters=s(r({},S.parameters),{docs:s(r({},(X=S.parameters)==null?void 0:X.docs),{source:r({originalSource:`{
  render: () => {
    const schema = yup.object({
      acceptTerms: yup.boolean().required("You must accept the terms and conditions")
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        acceptTerms: false
      }
    });
    return <Form {...form}>
        <form className="space-y-4 min-w-[300px]">
          <Field name="acceptTerms" isBoolean>
            <Switch label="I accept the terms and conditions" required onCheckedChange={val => console.log(\`checked changed: \${val}\`)} />
          </Field>
        </form>
      </Form>;
  }
}`},(re=(ee=S.parameters)==null?void 0:ee.docs)==null?void 0:re.source)})});var ne,ae,se;N.parameters=s(r({},N.parameters),{docs:s(r({},(ne=N.parameters)==null?void 0:ne.docs),{source:r({originalSource:`{
  render: () => {
    const schema = yup.object({
      name: yup.string()
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        name: ""
      }
    });
    return <Form {...form}>
        <form className="space-y-4 min-w-[300px]">
          <Field name="search" description="Type to search for items">
            <Input placeholder="Search..." />
          </Field>
        </form>
      </Form>;
  }
}`},(se=(ae=N.parameters)==null?void 0:ae.docs)==null?void 0:se.source)})});var oe,te,le;C.parameters=s(r({},C.parameters),{docs:s(r({},(oe=C.parameters)==null?void 0:oe.docs),{source:r({originalSource:`{
  render: () => {
    const schema = yup.object({
      email: yup.string().email("Enter a valid email").required("Email is required")
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        email: ""
      }
    });
    return <Form {...form}>
        <form className="space-y-4 min-w-[300px]">
          <Field name="email" label="Email Address" description={\`We'll never share your email with anyone else\`} required hideError>
            <Input placeholder="Enter your email" />
          </Field>
        </form>
      </Form>;
  }
}`},(le=(te=C.parameters)==null?void 0:te.docs)==null?void 0:le.source)})});var ie,ce,me;x.parameters=s(r({},x.parameters),{docs:s(r({},(ie=x.parameters)==null?void 0:ie.docs),{source:r({originalSource:`{
  render: () => {
    const schema = yup.object({
      custom: yup.string()
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        custom: ""
      }
    });
    return <Form {...form}>
        <Field name="custom" label="Custom Styled Field" description="This field has custom styling applied" className="p-4 bg-gray-50 rounded-lg border">
          <Input placeholder="Custom styled input" />
        </Field>
      </Form>;
  }
}`},(me=(ce=x.parameters)==null?void 0:ce.docs)==null?void 0:me.source)})});var de,ue,pe;E.parameters=s(r({},E.parameters),{docs:s(r({},(de=E.parameters)==null?void 0:de.docs),{source:r({originalSource:`{
  render: () => {
    const schema = yup.object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      newsletter: yup.array(yup.string().required()).required().min(1, "Please select at least one option")
    });
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
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
    const newsletterOptions = [{
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
    const handleCheckboxGroupChange = (value: string, checked: boolean) => {
      if (checked) {
        setValue("newsletter", [...newsletter, value]);
      } else {
        setValue("newsletter", newsletter.filter(item => item !== value));
      }
    };
    const onSubmit = (data: any) => {
      console.log("Form submitted:", data);
      alert("Form submitted successfully! Check console for data.");
    };
    return <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-w-[400px] p-4 border rounded-md">
          <Field name="firstName" label="First Name" required>
            <Input placeholder="John" />
          </Field>

          <Field name="lastName" label="Last Name" required>
            <Input placeholder="Doe" />
          </Field>

          <Field name="email" label="Email" description="We'll use this to contact you" required>
            <Input type="email" placeholder="john@example.com" />
          </Field>

          <div className="space-y-2">
            <FormLabel id="newsletter" error={!!errors.newsletter}>
              Select newsletter topics you're interested in:
            </FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {newsletterOptions.map(option => <Field key={option.value} name="newsletter" hideError>
                  <Checkbox label={option.label} value={option.value} checked={newsletter.includes(option.value)} onCheckedChange={checked => {
                checked && form.clearErrors("newsletter");
                handleCheckboxGroupChange(option.value, checked === true);
              }} />
                </Field>)}
            </div>
            {errors.newsletter && <FormMessage>{errors.newsletter.message}</FormMessage>}
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>;
  }
}`},(pe=(ue=E.parameters)==null?void 0:ue.docs)==null?void 0:pe.source)})});var he,fe,be;I.parameters=s(r({},I.parameters),{docs:s(r({},(he=I.parameters)==null?void 0:he.docs),{source:r({originalSource:`{
  render: () => {
    const form = useForm({
      defaultValues: {
        password: "",
        confirmPassword: ""
      },
      mode: "onChange"
    });
    const password = form.watch("password");
    const confirmPassword = form.watch("confirmPassword");
    React.useEffect(() => {
      if (confirmPassword && password !== confirmPassword) {
        form.setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match"
        });
      } else {
        form.clearErrors("confirmPassword");
      }
    }, [password, confirmPassword, form]);
    return <Form {...form}>
        <form className="space-y-4 min-w-[300px]">
          <Field name="password" label="Password" description="Must be at least 8 characters" required>
            <Input type="password" placeholder="Enter password" />
          </Field>

          <Field name="confirmPassword" label="Confirm Password" required>
            <Input type="password" placeholder="Confirm password" />
          </Field>

          <Button type="submit">Create Account</Button>
        </form>
      </Form>;
  }
}`},(be=(fe=I.parameters)==null?void 0:fe.docs)==null?void 0:be.source)})});var ye,Fe,ve;k.parameters=s(r({},k.parameters),{docs:s(r({},(ye=k.parameters)==null?void 0:ye.docs),{source:r({originalSource:`{
  render: () => {
    const schema = yup.object({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      email: yup.string().email("Invalid email format").required("Email is required"),
      age: yup.string().required("Age is required").matches(/^[0-9]+$/, "Age must be a number").test("is-positive", "You must be at least 18 years old", value => !!(value && parseInt(value) >= 18)),
      country: yup.string().required("Please select a country"),
      acceptTerms: yup.boolean().oneOf([true], "You must accept the terms and conditions")
    });
    const form = useForm({
      resolver: yupResolver(schema),
      mode: "onChange",
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        country: "",
        acceptTerms: false
      }
    });
    const countryOptions = [{
      value: "id",
      label: "Indonesia"
    }, {
      value: "us",
      label: "United States"
    }, {
      value: "uk",
      label: "United Kingdom"
    }, {
      value: "ca",
      label: "Canada"
    }, {
      value: "au",
      label: "Australia"
    }];
    const onSubmit = (data: any) => {
      console.log("Form submitted:", data);
      alert("Form submitted successfully! Check console for data.");
    };
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-96">
          <Field name="firstName" label="First Name" required>
            <Input placeholder="John" />
          </Field>

          <Field name="lastName" label="Last Name" required>
            <Input placeholder="Doe" />
          </Field>

          <Field name="email" label="Email Address" description="We'll never share your email" required>
            <Input type="email" placeholder="john@example.com" />
          </Field>

          <Field name="age" label="Age" description="Must be 18 or older" required>
            <Input type="number" placeholder="25" />
          </Field>

          <Field name="country" label="Country" description="Select your country of residence" required>
            <Select placeholder="Select a country" options={countryOptions} />
          </Field>

          <Field name="acceptTerms" isBoolean>
            <Checkbox label="I accept the terms and conditions" required />
          </Field>

          <Button type="submit" className="w-full">
            Submit Form
          </Button>
        </form>
      </Form>;
  }
}`},(ve=(Fe=k.parameters)==null?void 0:Fe.docs)==null?void 0:ve.source)})});const tr=["TextInput","Required","SelectField","RadioGroupField","CheckboxField","SwitchField","NoLabel","HiddenError","CustomStyled","MultipleFields","PasswordFields","CompleteFormWithYup"];export{q as CheckboxField,k as CompleteFormWithYup,x as CustomStyled,C as HiddenError,E as MultipleFields,N as NoLabel,I as PasswordFields,w as RadioGroupField,v as Required,g as SelectField,S as SwitchField,F as TextInput,tr as __namedExportsOrder,or as default};
