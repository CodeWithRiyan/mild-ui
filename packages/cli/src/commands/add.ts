import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { getProjectInfo } from '../utils/project';
import { generateComponent } from '../generators';

interface AddComponentOptions {
  component: string;
  framework: string;
  directory?: string;
  theme?: string;
  typescript: boolean;
}

export async function addComponent(options: AddComponentOptions): Promise<void> {
  // Validate component exists in our library
  const availableComponents = ['button']; // Start with just the button for Phase 1
  const componentLower = options.component.toLowerCase();
  
  if (!availableComponents.includes(componentLower)) {
    throw new Error(`Component '${options.component}' is not available. Run 'mild-ui list' to see available components.`);
  }
  
  // Validate framework is supported
  const supportedFrameworks = ['react', 'vue', 'svelte'];
  if (!supportedFrameworks.includes(options.framework.toLowerCase())) {
    throw new Error(`Framework '${options.framework}' is not supported. Supported frameworks: ${supportedFrameworks.join(', ')}`);
  }
  
  // Detect project structure if no directory specified
  let outputDir = options.directory;
  if (!outputDir) {
    const projectInfo = await getProjectInfo();
    outputDir = projectInfo.componentsDir;
  }
  
  // Create output directory if it doesn't exist
  if (outputDir) {
    await fs.ensureDir(outputDir);
  } else {
    throw new Error('Output directory is required but was not specified');
  }
  
  // Generate the component
  await generateComponent({
    component: componentLower,
    framework: options.framework.toLowerCase(),
    outputDir,
    theme: options.theme,
    typescript: options.typescript
  });
}