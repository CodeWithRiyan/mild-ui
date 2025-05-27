import React, { useState } from "react";
import { ThemeProvider, useTheme } from "../../../packages/react";
import {
  Button,
  Input,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../packages/react";
import { Sun, Moon, Github } from "lucide-react";
import "./App.css";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
}

function ComponentShowcase() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notifications: false,
    theme: "light",
    plan: "free",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted! Check console for details.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">mild-ui React</h1>
            <p className="text-muted-foreground">
              Cross-framework UI components demonstration
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://github.com/your-org/mild-ui"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </header>

        {/* Component Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Examples */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Form Components</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium">Plan Selection</label>
                  <RadioGroup
                    value={formData.plan}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, plan: value }))
                    }
                  >
                    <RadioGroupItem value="free" id="free" label="Free Plan" />
                    <RadioGroupItem value="pro" id="pro" label="Pro Plan" />
                    <RadioGroupItem
                      value="enterprise"
                      id="enterprise"
                      label="Enterprise"
                    />
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferences</label>
                  <Select
                    value={formData.theme}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, theme: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light Theme</SelectItem>
                      <SelectItem value="dark">Dark Theme</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Checkbox
                  id="notifications"
                  checked={formData.notifications}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      notifications: !!checked,
                    }))
                  }
                  label="Enable notifications"
                />

                <Button type="submit" className="w-full">
                  Submit Form
                </Button>
              </form>
            </div>
          </div>

          {/* Button Examples */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
              <div className="space-y-4">
                <div className="flex gap-4 flex-wrap">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>

                <div className="flex gap-4 items-center flex-wrap">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>

                <div className="flex gap-4 flex-wrap">
                  <Button disabled>Disabled</Button>
                  <Button variant="outline" disabled>
                    Disabled Outline
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Interactive Examples
              </h2>
              <div className="space-y-4">
                <Button
                  onClick={() => alert("Hello from mild-ui!")}
                  leadingIcon={<Sun className="h-4 w-4" />}
                >
                  Click me!
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button size="sm">Confirm</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="text-center text-muted-foreground">
            <p>Built with mild-ui • A cross-framework component library</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <ComponentShowcase />
    </ThemeProvider>
  );
}

export default App;
