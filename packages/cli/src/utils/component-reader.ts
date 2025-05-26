import fs from 'fs-extra';
import path from 'path';

export interface ComponentFile {
  filename: string;
  content: string;
  relativePath: string;
}

export interface FrameworkComponent {
  name: string;
  files: ComponentFile[];
  dependencies: string[];
}

/**
 * Reads a component from the actual framework implementation
 */
export async function readComponentFromFramework(
  componentName: string,
  framework: 'react' | 'vue' | 'svelte'
): Promise<FrameworkComponent> {
  // Get the path to the framework package
  const frameworkPackagePath = path.resolve(__dirname, `../../${framework}/src/components/${componentName}`);
  
  if (!fs.existsSync(frameworkPackagePath)) {
    throw new Error(`Component ${componentName} not found in ${framework} package`);
  }
  
  const files: ComponentFile[] = [];
  const componentFiles = await fs.readdir(frameworkPackagePath);
  
  for (const file of componentFiles) {
    const filePath = path.join(frameworkPackagePath, file);
    const stat = await fs.stat(filePath);
    
    if (stat.isFile()) {
      const content = await fs.readFile(filePath, 'utf-8');
      files.push({
        filename: file,
        content,
        relativePath: file
      });
    }
  }
  
  // Extract dependencies from package.json if it exists
  const dependencies = await extractDependencies(framework);
  
  return {
    name: componentName,
    files,
    dependencies
  };
}

/**
 * Extract dependencies for the framework
 */
async function extractDependencies(framework: string): Promise<string[]> {
  const packageJsonPath = path.resolve(__dirname, `../../${framework}/package.json`);
  
  if (!fs.existsSync(packageJsonPath)) {
    return [];
  }
  
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
  return Object.keys(packageJson.dependencies || {});
}

/**
 * Get list of available components for a framework
 */
export async function getAvailableComponents(
  framework: 'react' | 'vue' | 'svelte'
): Promise<string[]> {
  const componentsPath = path.resolve(__dirname, `../../${framework}/src/components`);
  
  if (!fs.existsSync(componentsPath)) {
    return [];
  }
  
  const items = await fs.readdir(componentsPath);
  const components: string[] = [];
  
  for (const item of items) {
    const itemPath = path.join(componentsPath, item);
    const stat = await fs.stat(itemPath);
    
    if (stat.isDirectory()) {
      components.push(item);
    }
  }
  
  return components;
}