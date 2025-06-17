import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{u as y,F as b}from"./index.esm-B5r5kaiW.js";import{c as s,d as u,e as h,a as g,f as D}from"./Form-6r68mTog.js";import{I as F}from"./Input-uNLkzt6C.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./cn-Dtjc6EhN.js";import"./Label-Dk0OgnlF.js";const C={title:"Components/Form/FormDescription",component:s,parameters:{layout:"centered",docs:{description:{component:"A form description component for providing helpful text and instructions to users."}}},argTypes:{children:{control:"text",description:"Description text content"},className:{control:"text",description:"Additional CSS classes"}}},o=({children:r,fieldName:x="testField",labelText:j="Field Label"})=>{const f=y({defaultValues:{[x]:""}});return e.jsx(b,{...f,children:e.jsx(u,{control:f.control,name:x,render:()=>e.jsxs(h,{children:[e.jsx(g,{children:j}),e.jsx(D,{children:e.jsx(F,{placeholder:"Sample input"})}),r]})})})},n={render:r=>e.jsx(o,{children:e.jsx(s,{...r,children:"Enter your username. It must be unique and contain only letters and numbers."})}),parameters:{docs:{storyDescription:"A basic form description providing helpful information to users."}}},t={render:r=>e.jsx(o,{children:e.jsx(s,{...r,children:"Required field"})}),parameters:{docs:{storyDescription:"A short, concise form description."}}},i={render:r=>e.jsx(o,{children:e.jsx(s,{...r,children:"This is a longer description that provides detailed instructions about what the user should enter in this field. It can span multiple lines and provide comprehensive guidance to help users understand the requirements and expectations."})}),parameters:{docs:{storyDescription:"A longer form description that spans multiple lines."}}},a={render:r=>e.jsx(o,{children:e.jsxs(s,{...r,children:["Password must contain at least ",e.jsx("strong",{children:"8 characters"}),", including one ",e.jsx("em",{children:"uppercase letter"})," and one ",e.jsx("em",{children:"number"}),"."]})}),parameters:{docs:{storyDescription:"A form description containing HTML markup for emphasis."}}},c={render:r=>e.jsx(o,{children:e.jsx(s,{...r,className:"text-blue-600 font-medium",children:"This description has custom styling applied"})}),parameters:{docs:{storyDescription:"A form description with custom CSS styling."}}},p={render:r=>e.jsx(o,{labelText:"API Key",children:e.jsx(s,{...r,children:"You can find your API key in your account settings. Keep it secure and don't share it publicly."})}),parameters:{docs:{storyDescription:"A form description providing specific instructions for finding information."}}},m={render:r=>e.jsx(o,{labelText:"Delete Account",children:e.jsx(s,{...r,className:"text-orange-600 font-medium",children:"⚠️ This action cannot be undone. All your data will be permanently deleted."})}),parameters:{docs:{storyDescription:"A form description styled as a warning with custom colors and an icon."}}},l={render:()=>{const r=y({defaultValues:{username:"",email:"",password:""}});return e.jsx(b,{...r,children:e.jsxs("div",{className:"space-y-6 w-96",children:[e.jsx(u,{control:r.control,name:"username",render:()=>e.jsxs(h,{children:[e.jsx(g,{children:"Username"}),e.jsx(D,{children:e.jsx(F,{placeholder:"Enter username"})}),e.jsx(s,{children:"Choose a unique username that you'll use to log in."})]})}),e.jsx(u,{control:r.control,name:"email",render:()=>e.jsxs(h,{children:[e.jsx(g,{children:"Email"}),e.jsx(D,{children:e.jsx(F,{type:"email",placeholder:"Enter email"})}),e.jsx(s,{children:"We'll use this email to send you important updates about your account. Make sure it's an email you check regularly."})]})}),e.jsx(u,{control:r.control,name:"password",render:()=>e.jsxs(h,{children:[e.jsx(g,{children:"Password"}),e.jsx(D,{children:e.jsx(F,{type:"password",placeholder:"Enter password"})}),e.jsxs(s,{className:"text-orange-600",children:[e.jsx("strong",{children:"Security tip:"})," Use a combination of uppercase letters, lowercase letters, numbers, and symbols for a strong password."]})]})})]})})},parameters:{docs:{storyDescription:"Multiple form descriptions showing different styles and content lengths."}}},d={render:r=>e.jsx(o,{labelText:"Terms of Service",children:e.jsxs(s,{...r,children:["By creating an account, you agree to our"," ",e.jsx("a",{href:"#",className:"text-blue-600 underline hover:text-blue-800",children:"Terms of Service"})," ","and"," ",e.jsx("a",{href:"#",className:"text-blue-600 underline hover:text-blue-800",children:"Privacy Policy"}),"."]})}),parameters:{docs:{storyDescription:"A form description containing clickable links."}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <FormDescriptionWrapper>
      <FormDescription {...args}>
        Enter your username. It must be unique and contain only letters and
        numbers.
      </FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A basic form description providing helpful information to users."
    }
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <FormDescriptionWrapper>
      <FormDescription {...args}>Required field</FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A short, concise form description."
    }
  }
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => <FormDescriptionWrapper>
      <FormDescription {...args}>
        This is a longer description that provides detailed instructions about
        what the user should enter in this field. It can span multiple lines and
        provide comprehensive guidance to help users understand the requirements
        and expectations.
      </FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A longer form description that spans multiple lines."
    }
  }
}`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => <FormDescriptionWrapper>
      <FormDescription {...args}>
        Password must contain at least <strong>8 characters</strong>, including
        one <em>uppercase letter</em> and one <em>number</em>.
      </FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A form description containing HTML markup for emphasis."
    }
  }
}`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <FormDescriptionWrapper>
      <FormDescription {...args} className="text-blue-600 font-medium">
        This description has custom styling applied
      </FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A form description with custom CSS styling."
    }
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => <FormDescriptionWrapper labelText="API Key">
      <FormDescription {...args}>
        You can find your API key in your account settings. Keep it secure and
        don't share it publicly.
      </FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A form description providing specific instructions for finding information."
    }
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => <FormDescriptionWrapper labelText="Delete Account">
      <FormDescription {...args} className="text-orange-600 font-medium">
        ⚠️ This action cannot be undone. All your data will be permanently
        deleted.
      </FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A form description styled as a warning with custom colors and an icon."
    }
  }
}`,...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const form = useForm({
      defaultValues: {
        username: "",
        email: "",
        password: ""
      }
    });
    return <FormProvider {...form}>
        <div className="space-y-6 w-96">
          <FormField control={form.control} name="username" render={() => <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" />
                </FormControl>
                <FormDescription>
                  Choose a unique username that you'll use to log in.
                </FormDescription>
              </FormItem>} />

          <FormField control={form.control} name="email" render={() => <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email" />
                </FormControl>
                <FormDescription>
                  We'll use this email to send you important updates about your
                  account. Make sure it's an email you check regularly.
                </FormDescription>
              </FormItem>} />

          <FormField control={form.control} name="password" render={() => <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter password" />
                </FormControl>
                <FormDescription className="text-orange-600">
                  <strong>Security tip:</strong> Use a combination of uppercase
                  letters, lowercase letters, numbers, and symbols for a strong
                  password.
                </FormDescription>
              </FormItem>} />
        </div>
      </FormProvider>;
  },
  parameters: {
    docs: {
      storyDescription: "Multiple form descriptions showing different styles and content lengths."
    }
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <FormDescriptionWrapper labelText="Terms of Service">
      <FormDescription {...args}>
        By creating an account, you agree to our{" "}
        <a href="#" className="text-blue-600 underline hover:text-blue-800">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-600 underline hover:text-blue-800">
          Privacy Policy
        </a>
        .
      </FormDescription>
    </FormDescriptionWrapper>,
  parameters: {
    docs: {
      storyDescription: "A form description containing clickable links."
    }
  }
}`,...d.parameters?.docs?.source}}};const P=["BasicDescription","ShortDescription","LongDescription","DescriptionWithMarkup","CustomStyledDescription","DescriptionWithInstructions","WarningDescription","MultipleDescriptions","DescriptionWithLinks"];export{n as BasicDescription,c as CustomStyledDescription,p as DescriptionWithInstructions,d as DescriptionWithLinks,a as DescriptionWithMarkup,i as LongDescription,l as MultipleDescriptions,t as ShortDescription,m as WarningDescription,P as __namedExportsOrder,C as default};
