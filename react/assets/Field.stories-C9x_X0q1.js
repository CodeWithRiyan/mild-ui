import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{u as l,F as i}from"./index.esm-B5r5kaiW.js";import{c,d as o,a as I,b as M,o as m}from"./index.esm-CDmTEbLs.js";import{R as $}from"./index-B2-qRKKC.js";import{I as t}from"./Input-uNLkzt6C.js";import{S as T}from"./Select-C9hfbVqi.js";import{R as L}from"./Radio-B1FRd9og.js";import{S as U}from"./Switch-CypNhvbX.js";import{F as a,a as W,b as O}from"./Form-6r68mTog.js";import{B as C}from"./Button-tFE5omYn.js";import{C as k}from"./Checkbox-CjyB4jnv.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cn-Dtjc6EhN.js";import"./index-Bagf71Y5.js";import"./index-ChlNXIGl.js";import"./index-cxmg2vMN.js";import"./createLucideIcon-DyoHGKTE.js";import"./check-CT2wzrsh.js";import"./index-DnB962Pj.js";import"./Label-Dk0OgnlF.js";const ce={title:"Components/Form/Field",component:a,parameters:{layout:"centered",docs:{description:{component:"A flexible form field component that wraps form controls with labels, descriptions, and error messages."}}},argTypes:{name:{control:"text",description:"The name of the form field"},label:{control:"text",description:"Label text for the field"},description:{control:"text",description:"Helper text displayed below the field"},required:{control:"boolean",description:"Whether the field is required"},hideError:{control:"boolean",description:"Hide error messages"},isBoolean:{control:"boolean",description:"Mark the field as a boolean field. ex: Checkbox (single not group), Switch."},isRadio:{control:"boolean",description:"Mark the field as a Radio field"},className:{control:"text",description:"Additional CSS classes"}},tags:["autodocs"]},f={render:r=>{const s=c({username:o().required("Username is required").matches(/^[a-zA-Z0-9_]{3,20}$/,"Username must be 3-20 characters long and can only contain letters, numbers, and underscores")}),n=l({resolver:m(s),defaultValues:{username:""}}),u=p=>{alert(`Registration Successful!
Username: ${p.username}`)};return e.jsx(i,{...n,children:e.jsxs("form",{className:"space-y-4 min-w-[300px]",onSubmit:n.handleSubmit(u),children:[e.jsx(a,{...r,children:e.jsx(t,{placeholder:"Enter your name"})}),e.jsx(C,{type:"submit",children:"Submit"})]})})},args:{name:"username",label:"Username",description:"Enter your preferred username",required:!0,hideError:!1,isBoolean:!1,className:""}},b={render:()=>{const r=c({email:o().email("Enter a valid email").required("Email is required")}),s=l({resolver:m(r),defaultValues:{email:""}});return e.jsx(i,{...s,children:e.jsx("form",{className:"space-y-4 min-w-[300px]",children:e.jsx(a,{name:"email",label:"Email Address",description:"We'll never share your email with anyone else",required:!0,children:e.jsx(t,{placeholder:"Enter your email"})})})})}},y={render:()=>{const r=c({country:o().required("Please select a country")}),s=l({resolver:m(r),defaultValues:{country:""}}),n=[{value:"id",label:"Indonesia"},{value:"us",label:"United States"},{value:"ca",label:"Canada"},{value:"mx",label:"Mexico"}];return e.jsx(i,{...s,children:e.jsx("form",{className:"space-y-4 min-w-[300px]",children:e.jsx(a,{name:"country",label:"Country",description:"Select your country of residence",required:!0,children:e.jsx(T,{options:n})})})})}},F={render:()=>{const r=c({gender:o().required("Please select a gender")}),s=l({resolver:m(r),defaultValues:{gender:""}}),n=[{value:"male",label:"Male"},{value:"female",label:"Female"},{value:"other",label:"Other"}];return e.jsx(i,{...s,children:e.jsx("form",{className:"space-y-4 min-w-[300px]",children:e.jsx(a,{name:"gender",label:"Gender",description:"Select your gender",required:!0,isRadio:!0,children:e.jsx(L,{items:n,onValueChange:u=>console.log(`Gender: ${u}`)})})})})}},v={render:()=>{const r=c({acceptTerms:I().required("You must accept the terms and conditions")}),s=l({resolver:m(r),defaultValues:{acceptTerms:!1}});return e.jsx(i,{...s,children:e.jsx("form",{className:"space-y-4 min-w-[300px]",children:e.jsx(a,{name:"acceptTerms",isBoolean:!0,children:e.jsx(k,{label:"I accept the terms and conditions",required:!0,onCheckedChange:n=>console.log(`checked changed: ${n}`)})})})})}},x={render:()=>{const r=c({acceptTerms:I().required("You must accept the terms and conditions")}),s=l({resolver:m(r),defaultValues:{acceptTerms:!1}});return e.jsx(i,{...s,children:e.jsx("form",{className:"space-y-4 min-w-[300px]",children:e.jsx(a,{name:"acceptTerms",isBoolean:!0,children:e.jsx(U,{label:"I accept the terms and conditions",required:!0,onCheckedChange:n=>console.log(`checked changed: ${n}`)})})})})}},g={render:()=>{const r=c({name:o()}),s=l({resolver:m(r),defaultValues:{name:""}});return e.jsx(i,{...s,children:e.jsx("form",{className:"space-y-4 min-w-[300px]",children:e.jsx(a,{name:"search",description:"Type to search for items",children:e.jsx(t,{placeholder:"Search..."})})})})}},w={render:()=>{const r=c({email:o().email("Enter a valid email").required("Email is required")}),s=l({resolver:m(r),defaultValues:{email:""}});return e.jsx(i,{...s,children:e.jsx("form",{className:"space-y-4 min-w-[300px]",children:e.jsx(a,{name:"email",label:"Email Address",description:"We'll never share your email with anyone else",required:!0,hideError:!0,children:e.jsx(t,{placeholder:"Enter your email"})})})})}},j={render:()=>{const r=c({custom:o()}),s=l({resolver:m(r),defaultValues:{custom:""}});return e.jsx(i,{...s,children:e.jsx(a,{name:"custom",label:"Custom Styled Field",description:"This field has custom styling applied",className:"p-4 bg-gray-50 rounded-lg border",children:e.jsx(t,{placeholder:"Custom styled input"})})})}},q={render:()=>{const r=c({firstName:o().required(),lastName:o().required(),email:o().email().required(),newsletter:M(o().required()).required().min(1,"Please select at least one option")}),s=l({resolver:m(r),defaultValues:{firstName:"",lastName:"",email:"",newsletter:[]}}),{watch:n,setValue:u,handleSubmit:p,formState:{errors:P}}=s,E=n("newsletter")??[],V=[{value:"tech",label:"Technology"},{value:"health",label:"Health & Wellness"},{value:"finance",label:"Finance & Investing"},{value:"travel",label:"Travel & Adventure"},{value:"food",label:"Food & Recipes"},{value:"sports",label:"Sports & Fitness"},{value:"entertainment",label:"Movies & TV Shows"},{value:"science",label:"Science & Innovation"}],R=(d,h)=>{h?u("newsletter",[...E,d]):u("newsletter",E.filter(B=>B!==d))},A=d=>{console.log("Form submitted:",d),alert("Form submitted successfully! Check console for data.")};return e.jsx(i,{...s,children:e.jsxs("form",{onSubmit:p(A),className:"space-y-4 min-w-[400px] p-4 border rounded-md",children:[e.jsx(a,{name:"firstName",label:"First Name",required:!0,children:e.jsx(t,{placeholder:"John"})}),e.jsx(a,{name:"lastName",label:"Last Name",required:!0,children:e.jsx(t,{placeholder:"Doe"})}),e.jsx(a,{name:"email",label:"Email",description:"We'll use this to contact you",required:!0,children:e.jsx(t,{type:"email",placeholder:"john@example.com"})}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(W,{htmlFor:"newsletter",children:"Select newsletter topics you're interested in:"}),e.jsx("div",{className:"grid grid-cols-2 gap-4",children:V.map(d=>e.jsx(a,{name:"newsletter",hideError:!0,children:e.jsx(k,{label:d.label,value:d.value,checked:E.includes(d.value),onCheckedChange:h=>{h&&s.clearErrors("newsletter"),R(d.value,h===!0)}})},d.value))}),P.newsletter&&e.jsx(O,{children:P.newsletter.message})]}),e.jsx(C,{type:"submit",children:"Submit"})]})})}},S={render:()=>{const r=l({defaultValues:{password:"",confirmPassword:""},mode:"onChange"}),s=r.watch("password"),n=r.watch("confirmPassword");return $.useEffect(()=>{n&&s!==n?r.setError("confirmPassword",{type:"manual",message:"Passwords do not match"}):r.clearErrors("confirmPassword")},[s,n,r]),e.jsx(i,{...r,children:e.jsxs("form",{className:"space-y-4 min-w-[300px]",children:[e.jsx(a,{name:"password",label:"Password",description:"Must be at least 8 characters",required:!0,children:e.jsx(t,{type:"password",placeholder:"Enter password"})}),e.jsx(a,{name:"confirmPassword",label:"Confirm Password",required:!0,children:e.jsx(t,{type:"password",placeholder:"Confirm password"})}),e.jsx(C,{type:"submit",children:"Create Account"})]})})}},N={render:()=>{const r=c({firstName:o().required("First name is required"),lastName:o().required("Last name is required"),email:o().email("Invalid email format").required("Email is required"),age:o().required("Age is required").matches(/^[0-9]+$/,"Age must be a number").test("is-positive","You must be at least 18 years old",p=>!!(p&&parseInt(p)>=18)),country:o().required("Please select a country"),acceptTerms:I().oneOf([!0],"You must accept the terms and conditions")}),s=l({resolver:m(r),mode:"onChange",defaultValues:{firstName:"",lastName:"",email:"",age:"",country:"",acceptTerms:!1}}),n=[{value:"id",label:"Indonesia"},{value:"us",label:"United States"},{value:"uk",label:"United Kingdom"},{value:"ca",label:"Canada"},{value:"au",label:"Australia"}],u=p=>{console.log("Form submitted:",p),alert("Form submitted successfully! Check console for data.")};return e.jsx(i,{...s,children:e.jsxs("form",{onSubmit:s.handleSubmit(u),className:"space-y-4 w-96",children:[e.jsx(a,{name:"firstName",label:"First Name",required:!0,children:e.jsx(t,{placeholder:"John"})}),e.jsx(a,{name:"lastName",label:"Last Name",required:!0,children:e.jsx(t,{placeholder:"Doe"})}),e.jsx(a,{name:"email",label:"Email Address",description:"We'll never share your email",required:!0,children:e.jsx(t,{type:"email",placeholder:"john@example.com"})}),e.jsx(a,{name:"age",label:"Age",description:"Must be 18 or older",required:!0,children:e.jsx(t,{type:"number",placeholder:"25"})}),e.jsx(a,{name:"country",label:"Country",description:"Select your country of residence",required:!0,children:e.jsx(T,{placeholder:"Select a country",options:n})}),e.jsx(a,{name:"acceptTerms",isBoolean:!0,children:e.jsx(k,{label:"I accept the terms and conditions",required:!0})}),e.jsx(C,{type:"submit",className:"w-full",children:"Submit Form"})]})})}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
            <FormLabel htmlFor="newsletter">
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
}`,...q.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}};const me=["TextInput","Required","SelectField","RadioGroupField","CheckboxField","SwitchField","NoLabel","HiddenError","CustomStyled","MultipleFields","PasswordFields","CompleteFormWithYup"];export{v as CheckboxField,N as CompleteFormWithYup,j as CustomStyled,w as HiddenError,q as MultipleFields,g as NoLabel,S as PasswordFields,F as RadioGroupField,b as Required,y as SelectField,x as SwitchField,f as TextInput,me as __namedExportsOrder,ce as default};
