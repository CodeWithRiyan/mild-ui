import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{u as v,F as P}from"./index.esm-B5r5kaiW.js";import{R as p}from"./index-B2-qRKKC.js";import{b as s,d as t,e as m,a as i,f as l,c as g}from"./Form-6r68mTog.js";import{I as d}from"./Input-uNLkzt6C.js";import{B as L}from"./Button-tFE5omYn.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cn-Dtjc6EhN.js";import"./Label-Dk0OgnlF.js";const T={title:"Components/Form/FormMessage",component:s,parameters:{layout:"centered",docs:{description:{component:"A form message component for displaying validation errors and other messages."}}},argTypes:{children:{control:"text",description:"Message text content"},className:{control:"text",description:"Additional CSS classes"}}},u=({children:r,errorMessage:n,fieldName:a="testField",labelText:o="Field Label",showDescription:c=!0})=>{const f=v({defaultValues:{[a]:""}});return p.useEffect(()=>{n&&f.setError(a,{type:"manual",message:n})},[n,a,f]),e.jsx(P,{...f,children:e.jsx(t,{control:f.control,name:a,render:()=>e.jsxs(m,{children:[e.jsx(i,{children:o}),e.jsx(l,{children:e.jsx(d,{placeholder:"Sample input"})}),c&&e.jsx(g,{children:"This is a sample field for testing messages"}),r||e.jsx(s,{})]})})})},h={render:r=>e.jsx(u,{errorMessage:"This field is required",children:e.jsx(s,{...r})}),parameters:{docs:{storyDescription:"An error message displayed when field validation fails."}}},F={render:r=>e.jsx(u,{errorMessage:"Password must be at least 8 characters long",children:e.jsx(s,{...r})}),parameters:{docs:{storyDescription:"A specific validation error message for password requirements."}}},x={render:r=>e.jsx(u,{errorMessage:"This is a very long error message that demonstrates how the component handles longer validation error text that might span multiple lines and provide detailed feedback to users",children:e.jsx(s,{...r})}),parameters:{docs:{storyDescription:"A long error message to test text wrapping and display behavior."}}},w={render:r=>e.jsx(u,{children:e.jsx(s,{...r,children:"This is a custom message not from validation"})}),parameters:{docs:{storyDescription:"A custom message that is not from form validation."}}},y={render:r=>e.jsx(u,{children:e.jsx(s,{...r})}),parameters:{docs:{storyDescription:"FormMessage with no error - component returns null and renders nothing."}}},j={render:r=>e.jsx(u,{children:e.jsx(s,{...r,className:"text-orange-600 font-semibold",children:"Custom styled warning message"})}),parameters:{docs:{storyDescription:"A form message with custom styling applied."}}},E={render:()=>{const r=v({defaultValues:{email:"",password:"",confirmPassword:""},mode:"onChange"}),n=r.watch("email"),a=r.watch("password"),o=r.watch("confirmPassword");return p.useEffect(()=>{n&&!n.includes("@")?r.setError("email",{type:"manual",message:"Please enter a valid email address"}):r.clearErrors("email")},[n,r]),p.useEffect(()=>{a&&a.length<8?r.setError("password",{type:"manual",message:"Password must be at least 8 characters long"}):r.clearErrors("password")},[a,r]),p.useEffect(()=>{o&&a!==o?r.setError("confirmPassword",{type:"manual",message:"Passwords do not match"}):r.clearErrors("confirmPassword")},[a,o,r]),e.jsx(P,{...r,children:e.jsxs("div",{className:"w-96 space-y-4",children:[e.jsx(t,{control:r.control,name:"email",render:({field:c})=>e.jsxs(m,{children:[e.jsx(i,{children:"Email Address"}),e.jsx(l,{children:e.jsx(d,{...c,type:"email",placeholder:"john@example.com"})}),e.jsx(g,{children:"Enter a valid email address"}),e.jsx(s,{})]})}),e.jsx(t,{control:r.control,name:"password",render:({field:c})=>e.jsxs(m,{children:[e.jsx(i,{children:"Password"}),e.jsx(l,{children:e.jsx(d,{...c,type:"password",placeholder:"Enter password"})}),e.jsx(g,{children:"Must be at least 8 characters"}),e.jsx(s,{})]})}),e.jsx(t,{control:r.control,name:"confirmPassword",render:({field:c})=>e.jsxs(m,{children:[e.jsx(i,{children:"Confirm Password"}),e.jsx(l,{children:e.jsx(d,{...c,type:"password",placeholder:"Confirm password"})}),e.jsx(g,{children:"Re-enter your password"}),e.jsx(s,{})]})})]})})},parameters:{docs:{storyDescription:"Multiple fields with real-time validation messages."}}},M={render:()=>{const r=v({defaultValues:{required:"",email:"invalid-email",minLength:"abc",pattern:"123abc"}});return p.useEffect(()=>{r.setError("required",{type:"required",message:"This field is required"}),r.setError("email",{type:"pattern",message:"Please enter a valid email address"}),r.setError("minLength",{type:"minLength",message:"Must be at least 8 characters long"}),r.setError("pattern",{type:"pattern",message:"Only letters are allowed"})},[r]),e.jsx(P,{...r,children:e.jsxs("div",{className:"w-96 space-y-4",children:[e.jsx(t,{control:r.control,name:"required",render:()=>e.jsxs(m,{children:[e.jsx(i,{children:"Required Field"}),e.jsx(l,{children:e.jsx(d,{placeholder:"Required field"})}),e.jsx(s,{})]})}),e.jsx(t,{control:r.control,name:"email",render:()=>e.jsxs(m,{children:[e.jsx(i,{children:"Email Validation"}),e.jsx(l,{children:e.jsx(d,{placeholder:"Email field"})}),e.jsx(s,{})]})}),e.jsx(t,{control:r.control,name:"minLength",render:()=>e.jsxs(m,{children:[e.jsx(i,{children:"Minimum Length"}),e.jsx(l,{children:e.jsx(d,{placeholder:"Min length field"})}),e.jsx(s,{})]})}),e.jsx(t,{control:r.control,name:"pattern",render:()=>e.jsxs(m,{children:[e.jsx(i,{children:"Pattern Validation"}),e.jsx(l,{children:e.jsx(d,{placeholder:"Pattern field"})}),e.jsx(s,{})]})})]})})},parameters:{docs:{storyDescription:"Different types of validation errors displayed with FormMessage."}}},b={render:()=>{const r=v({defaultValues:{username:""},mode:"onChange"}),n=r.watch("username");p.useEffect(()=>{n?n.length<3?r.setError("username",{type:"minLength",message:"Username must be at least 3 characters"}):n.length>20?r.setError("username",{type:"maxLength",message:"Username must be less than 20 characters"}):/^[a-zA-Z0-9_]+$/.test(n)?r.clearErrors("username"):r.setError("username",{type:"pattern",message:"Username can only contain letters, numbers, and underscores"}):r.setError("username",{type:"required",message:"Username is required"})},[n,r]);const a=o=>{alert(`Username: ${o.username}`)};return e.jsx(P,{...r,children:e.jsxs("form",{onSubmit:r.handleSubmit(a),className:"w-80 space-y-4",children:[e.jsx(t,{control:r.control,name:"username",render:({field:o})=>e.jsxs(m,{children:[e.jsx(i,{children:"Username"}),e.jsx(l,{children:e.jsx(d,{...o,placeholder:"Enter username"})}),e.jsx(g,{children:"3-20 characters, letters, numbers, and underscores only"}),e.jsx(s,{})]})}),e.jsx(L,{type:"submit",className:"w-full",children:"Submit"})]})})},parameters:{docs:{storyDescription:"Interactive validation that updates messages as the user types."}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => <FormMessageWrapper errorMessage="This field is required">
      <FormMessage {...args} />
    </FormMessageWrapper>,
  parameters: {
    docs: {
      storyDescription: "An error message displayed when field validation fails."
    }
  }
}`,...h.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => <FormMessageWrapper errorMessage="Password must be at least 8 characters long">
      <FormMessage {...args} />
    </FormMessageWrapper>,
  parameters: {
    docs: {
      storyDescription: "A specific validation error message for password requirements."
    }
  }
}`,...F.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => <FormMessageWrapper errorMessage="This is a very long error message that demonstrates how the component handles longer validation error text that might span multiple lines and provide detailed feedback to users">
      <FormMessage {...args} />
    </FormMessageWrapper>,
  parameters: {
    docs: {
      storyDescription: "A long error message to test text wrapping and display behavior."
    }
  }
}`,...x.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => <FormMessageWrapper>
      <FormMessage {...args}>
        This is a custom message not from validation
      </FormMessage>
    </FormMessageWrapper>,
  parameters: {
    docs: {
      storyDescription: "A custom message that is not from form validation."
    }
  }
}`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => <FormMessageWrapper>
      <FormMessage {...args} />
    </FormMessageWrapper>,
  parameters: {
    docs: {
      storyDescription: "FormMessage with no error - component returns null and renders nothing."
    }
  }
}`,...y.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: args => <FormMessageWrapper>
      <FormMessage {...args} className="text-orange-600 font-semibold">
        Custom styled warning message
      </FormMessage>
    </FormMessageWrapper>,
  parameters: {
    docs: {
      storyDescription: "A form message with custom styling applied."
    }
  }
}`,...j.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => {
    const form = useForm({
      defaultValues: {
        email: "",
        password: "",
        confirmPassword: ""
      },
      mode: "onChange"
    });
    const emailValue = form.watch("email");
    const password = form.watch("password");
    const confirmPassword = form.watch("confirmPassword");
    React.useEffect(() => {
      if (emailValue && !emailValue.includes("@")) {
        form.setError("email", {
          type: "manual",
          message: "Please enter a valid email address"
        });
      } else {
        form.clearErrors("email");
      }
    }, [emailValue, form]);
    React.useEffect(() => {
      if (password && password.length < 8) {
        form.setError("password", {
          type: "manual",
          message: "Password must be at least 8 characters long"
        });
      } else {
        form.clearErrors("password");
      }
    }, [password, form]);
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
    return <FormProvider {...form}>
        <div className="w-96 space-y-4">
          <FormField control={form.control} name="email" render={({
          field
        }) => <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="john@example.com" />
                </FormControl>
                <FormDescription>Enter a valid email address</FormDescription>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="password" render={({
          field
        }) => <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="Enter password" />
                </FormControl>
                <FormDescription>Must be at least 8 characters</FormDescription>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="confirmPassword" render={({
          field
        }) => <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="Confirm password" />
                </FormControl>
                <FormDescription>Re-enter your password</FormDescription>
                <FormMessage />
              </FormItem>} />
        </div>
      </FormProvider>;
  },
  parameters: {
    docs: {
      storyDescription: "Multiple fields with real-time validation messages."
    }
  }
}`,...E.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const form = useForm({
      defaultValues: {
        required: "",
        email: "invalid-email",
        minLength: "abc",
        pattern: "123abc"
      }
    });
    React.useEffect(() => {
      form.setError("required", {
        type: "required",
        message: "This field is required"
      });
      form.setError("email", {
        type: "pattern",
        message: "Please enter a valid email address"
      });
      form.setError("minLength", {
        type: "minLength",
        message: "Must be at least 8 characters long"
      });
      form.setError("pattern", {
        type: "pattern",
        message: "Only letters are allowed"
      });
    }, [form]);
    return <FormProvider {...form}>
        <div className="w-96 space-y-4">
          <FormField control={form.control} name="required" render={() => <FormItem>
                <FormLabel>Required Field</FormLabel>
                <FormControl>
                  <Input placeholder="Required field" />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="email" render={() => <FormItem>
                <FormLabel>Email Validation</FormLabel>
                <FormControl>
                  <Input placeholder="Email field" />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="minLength" render={() => <FormItem>
                <FormLabel>Minimum Length</FormLabel>
                <FormControl>
                  <Input placeholder="Min length field" />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="pattern" render={() => <FormItem>
                <FormLabel>Pattern Validation</FormLabel>
                <FormControl>
                  <Input placeholder="Pattern field" />
                </FormControl>
                <FormMessage />
              </FormItem>} />
        </div>
      </FormProvider>;
  },
  parameters: {
    docs: {
      storyDescription: "Different types of validation errors displayed with FormMessage."
    }
  }
}`,...M.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const form = useForm({
      defaultValues: {
        username: ""
      },
      mode: "onChange"
    });
    const username = form.watch("username");
    React.useEffect(() => {
      if (username) {
        if (username.length < 3) {
          form.setError("username", {
            type: "minLength",
            message: "Username must be at least 3 characters"
          });
        } else if (username.length > 20) {
          form.setError("username", {
            type: "maxLength",
            message: "Username must be less than 20 characters"
          });
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
          form.setError("username", {
            type: "pattern",
            message: "Username can only contain letters, numbers, and underscores"
          });
        } else {
          form.clearErrors("username");
        }
      } else {
        form.setError("username", {
          type: "required",
          message: "Username is required"
        });
      }
    }, [username, form]);
    const onSubmit = (data: any) => {
      alert(\`Username: \${data.username}\`);
    };
    return <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-4">
          <FormField control={form.control} name="username" render={({
          field
        }) => <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter username" />
                </FormControl>
                <FormDescription>
                  3-20 characters, letters, numbers, and underscores only
                </FormDescription>
                <FormMessage />
              </FormItem>} />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </FormProvider>;
  },
  parameters: {
    docs: {
      storyDescription: "Interactive validation that updates messages as the user types."
    }
  }
}`,...b.parameters?.docs?.source}}};const U=["ErrorMessage","CustomErrorMessage","LongErrorMessage","CustomMessage","NoMessage","StyledMessage","ValidationMessages","DifferentErrorTypes","InteractiveValidation"];export{F as CustomErrorMessage,w as CustomMessage,M as DifferentErrorTypes,h as ErrorMessage,b as InteractiveValidation,x as LongErrorMessage,y as NoMessage,j as StyledMessage,E as ValidationMessages,U as __namedExportsOrder,T as default};
