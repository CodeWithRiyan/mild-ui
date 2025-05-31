var oe=Object.defineProperty,te=Object.defineProperties;var me=Object.getOwnPropertyDescriptors;var q=Object.getOwnPropertySymbols;var ie=Object.prototype.hasOwnProperty,le=Object.prototype.propertyIsEnumerable;var V=(r,a,o)=>a in r?oe(r,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[a]=o,s=(r,a)=>{for(var o in a||(a={}))ie.call(a,o)&&V(r,o,a[o]);if(q)for(var o of q(a))le.call(a,o)&&V(r,o,a[o]);return r},n=(r,a)=>te(r,me(a));import{a as e,j as m}from"./jsx-runtime-Cr617v10.js";import{u as I,F as S}from"./index.esm-0XuDu32R.js";import{a as t,l,U as d,H as c,b as p,u,G as F,I as de}from"./index-BfP1bvMz.js";import{R as f}from"./index-D2dH9QXU.js";import"./index-8BIPUTFA.js";import"./_commonjsHelpers-CDgoFxsB.js";const we={title:"Components/Form/FormMessage",component:t,parameters:{layout:"centered",docs:{description:{component:"A form message component for displaying validation errors and other messages."}}},argTypes:{children:{control:"text",description:"Message text content"},className:{control:"text",description:"Additional CSS classes"}}},h=({children:r,errorMessage:a,fieldName:o="testField",labelText:i="Field Label",showDescription:g=!0})=>{const w=I({defaultValues:{[o]:""}});return f.useEffect(()=>{a&&w.setError(o,{type:"manual",message:a})},[a,o,w]),e(S,n(s({},w),{children:e(l,{control:w.control,name:o,render:()=>m(d,{children:[e(c,{children:i}),e(p,{children:e(u,{placeholder:"Sample input"})}),g&&e(F,{children:"This is a sample field for testing messages"}),r||e(t,{})]})})}))},y={render:r=>e(h,{errorMessage:"This field is required",children:e(t,s({},r))}),parameters:{docs:{storyDescription:"An error message displayed when field validation fails."}}},E={render:r=>e(h,{errorMessage:"Password must be at least 8 characters long",children:e(t,s({},r))}),parameters:{docs:{storyDescription:"A specific validation error message for password requirements."}}},M={render:r=>e(h,{errorMessage:"This is a very long error message that demonstrates how the component handles longer validation error text that might span multiple lines and provide detailed feedback to users",children:e(t,s({},r))}),parameters:{docs:{storyDescription:"A long error message to test text wrapping and display behavior."}}},b={render:r=>e(h,{children:e(t,n(s({},r),{children:"This is a custom message not from validation"}))}),parameters:{docs:{storyDescription:"A custom message that is not from form validation."}}},v={render:r=>e(h,{children:e(t,s({},r))}),parameters:{docs:{storyDescription:"FormMessage with no error - component returns null and renders nothing."}}},P={render:r=>e(h,{children:e(t,n(s({},r),{className:"text-orange-600 font-semibold",children:"Custom styled warning message"}))}),parameters:{docs:{storyDescription:"A form message with custom styling applied."}}},L={render:()=>{const r=I({defaultValues:{email:"",password:"",confirmPassword:""},mode:"onChange"}),a=r.watch("email"),o=r.watch("password"),i=r.watch("confirmPassword");return f.useEffect(()=>{a&&!a.includes("@")?r.setError("email",{type:"manual",message:"Please enter a valid email address"}):r.clearErrors("email")},[a,r]),f.useEffect(()=>{o&&o.length<8?r.setError("password",{type:"manual",message:"Password must be at least 8 characters long"}):r.clearErrors("password")},[o,r]),f.useEffect(()=>{i&&o!==i?r.setError("confirmPassword",{type:"manual",message:"Passwords do not match"}):r.clearErrors("confirmPassword")},[o,i,r]),e(S,n(s({},r),{children:m("div",{className:"w-96 space-y-4",children:[e(l,{control:r.control,name:"email",render:({field:g})=>m(d,{children:[e(c,{children:"Email Address"}),e(p,{children:e(u,n(s({},g),{type:"email",placeholder:"john@example.com"}))}),e(F,{children:"Enter a valid email address"}),e(t,{})]})}),e(l,{control:r.control,name:"password",render:({field:g})=>m(d,{children:[e(c,{children:"Password"}),e(p,{children:e(u,n(s({},g),{type:"password",placeholder:"Enter password"}))}),e(F,{children:"Must be at least 8 characters"}),e(t,{})]})}),e(l,{control:r.control,name:"confirmPassword",render:({field:g})=>m(d,{children:[e(c,{children:"Confirm Password"}),e(p,{children:e(u,n(s({},g),{type:"password",placeholder:"Confirm password"}))}),e(F,{children:"Re-enter your password"}),e(t,{})]})})]})}))},parameters:{docs:{storyDescription:"Multiple fields with real-time validation messages."}}},C={render:()=>{const r=I({defaultValues:{required:"",email:"invalid-email",minLength:"abc",pattern:"123abc"}});return f.useEffect(()=>{r.setError("required",{type:"required",message:"This field is required"}),r.setError("email",{type:"pattern",message:"Please enter a valid email address"}),r.setError("minLength",{type:"minLength",message:"Must be at least 8 characters long"}),r.setError("pattern",{type:"pattern",message:"Only letters are allowed"})},[r]),e(S,n(s({},r),{children:m("div",{className:"w-96 space-y-4",children:[e(l,{control:r.control,name:"required",render:()=>m(d,{children:[e(c,{children:"Required Field"}),e(p,{children:e(u,{placeholder:"Required field"})}),e(t,{})]})}),e(l,{control:r.control,name:"email",render:()=>m(d,{children:[e(c,{children:"Email Validation"}),e(p,{children:e(u,{placeholder:"Email field"})}),e(t,{})]})}),e(l,{control:r.control,name:"minLength",render:()=>m(d,{children:[e(c,{children:"Minimum Length"}),e(p,{children:e(u,{placeholder:"Min length field"})}),e(t,{})]})}),e(l,{control:r.control,name:"pattern",render:()=>m(d,{children:[e(c,{children:"Pattern Validation"}),e(p,{children:e(u,{placeholder:"Pattern field"})}),e(t,{})]})})]})}))},parameters:{docs:{storyDescription:"Different types of validation errors displayed with FormMessage."}}},D={render:()=>{const r=I({defaultValues:{username:""},mode:"onChange"}),a=r.watch("username");f.useEffect(()=>{a?a.length<3?r.setError("username",{type:"minLength",message:"Username must be at least 3 characters"}):a.length>20?r.setError("username",{type:"maxLength",message:"Username must be less than 20 characters"}):/^[a-zA-Z0-9_]+$/.test(a)?r.clearErrors("username"):r.setError("username",{type:"pattern",message:"Username can only contain letters, numbers, and underscores"}):r.setError("username",{type:"required",message:"Username is required"})},[a,r]);const o=i=>{alert(`Username: ${i.username}`)};return e(S,n(s({},r),{children:m("form",{onSubmit:r.handleSubmit(o),className:"w-80 space-y-4",children:[e(l,{control:r.control,name:"username",render:({field:i})=>m(d,{children:[e(c,{children:"Username"}),e(p,{children:e(u,n(s({},i),{placeholder:"Enter username"}))}),e(F,{children:"3-20 characters, letters, numbers, and underscores only"}),e(t,{})]})}),e(de,{type:"submit",className:"w-full",children:"Submit"})]})}))},parameters:{docs:{storyDescription:"Interactive validation that updates messages as the user types."}}};var x,A,U;y.parameters=n(s({},y.parameters),{docs:n(s({},(x=y.parameters)==null?void 0:x.docs),{source:s({originalSource:`{
  render: args => <FormMessageWrapper errorMessage="This field is required">
      <FormMessage {...args} />
    </FormMessageWrapper>,
  parameters: {
    docs: {
      storyDescription: "An error message displayed when field validation fails."
    }
  }
}`},(U=(A=y.parameters)==null?void 0:A.docs)==null?void 0:U.source)})});var R,W,T;E.parameters=n(s({},E.parameters),{docs:n(s({},(R=E.parameters)==null?void 0:R.docs),{source:s({originalSource:`{
  render: args => <FormMessageWrapper errorMessage="Password must be at least 8 characters long">
      <FormMessage {...args} />
    </FormMessageWrapper>,
  parameters: {
    docs: {
      storyDescription: "A specific validation error message for password requirements."
    }
  }
}`},(T=(W=E.parameters)==null?void 0:W.docs)==null?void 0:T.source)})});var N,j,_;M.parameters=n(s({},M.parameters),{docs:n(s({},(N=M.parameters)==null?void 0:N.docs),{source:s({originalSource:`{
  render: args => <FormMessageWrapper errorMessage="This is a very long error message that demonstrates how the component handles longer validation error text that might span multiple lines and provide detailed feedback to users">
      <FormMessage {...args} />
    </FormMessageWrapper>,
  parameters: {
    docs: {
      storyDescription: "A long error message to test text wrapping and display behavior."
    }
  }
}`},(_=(j=M.parameters)==null?void 0:j.docs)==null?void 0:_.source)})});var $,O,k;b.parameters=n(s({},b.parameters),{docs:n(s({},($=b.parameters)==null?void 0:$.docs),{source:s({originalSource:`{
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
}`},(k=(O=b.parameters)==null?void 0:O.docs)==null?void 0:k.source)})});var z,B,G;v.parameters=n(s({},v.parameters),{docs:n(s({},(z=v.parameters)==null?void 0:z.docs),{source:s({originalSource:`{
  render: args => <FormMessageWrapper>
      <FormMessage {...args} />
    </FormMessageWrapper>,
  parameters: {
    docs: {
      storyDescription: "FormMessage with no error - component returns null and renders nothing."
    }
  }
}`},(G=(B=v.parameters)==null?void 0:B.docs)==null?void 0:G.source)})});var H,Z,K;P.parameters=n(s({},P.parameters),{docs:n(s({},(H=P.parameters)==null?void 0:H.docs),{source:s({originalSource:`{
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
}`},(K=(Z=P.parameters)==null?void 0:Z.docs)==null?void 0:K.source)})});var Y,J,Q;L.parameters=n(s({},L.parameters),{docs:n(s({},(Y=L.parameters)==null?void 0:Y.docs),{source:s({originalSource:`{
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
}`},(Q=(J=L.parameters)==null?void 0:J.docs)==null?void 0:Q.source)})});var X,ee,re;C.parameters=n(s({},C.parameters),{docs:n(s({},(X=C.parameters)==null?void 0:X.docs),{source:s({originalSource:`{
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
}`},(re=(ee=C.parameters)==null?void 0:ee.docs)==null?void 0:re.source)})});var se,ne,ae;D.parameters=n(s({},D.parameters),{docs:n(s({},(se=D.parameters)==null?void 0:se.docs),{source:s({originalSource:`{
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
}`},(ae=(ne=D.parameters)==null?void 0:ne.docs)==null?void 0:ae.source)})});const ye=["ErrorMessage","CustomErrorMessage","LongErrorMessage","CustomMessage","NoMessage","StyledMessage","ValidationMessages","DifferentErrorTypes","InteractiveValidation"];export{E as CustomErrorMessage,b as CustomMessage,C as DifferentErrorTypes,y as ErrorMessage,D as InteractiveValidation,M as LongErrorMessage,v as NoMessage,P as StyledMessage,L as ValidationMessages,ye as __namedExportsOrder,we as default};
