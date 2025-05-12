// packages/cli/src/commands/add.ts
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { getProjectInfo } from '../utils/project';
import { generateComponent } from '../generators';

interface AddComponentOptions {
  component: string;
  framework?: string;
  directory?: string;
  theme?: string;
  typescript?: boolean;
  stylesDir?: string;
}

export async function addComponent(options: AddComponentOptions): Promise<void> {
  // Validate component exists in our library
  const availableComponents = ['button']; // Start with just the button for Phase 1
  const componentLower = options.component.toLowerCase();
  
  if (!availableComponents.includes(componentLower)) {
    throw new Error(`Component '${options.component}' is not available. Run 'mild-ui list' to see available components.`);
  }
  
  // Get project info
  const projectInfo = await getProjectInfo();
  
  // Validate framework is supported
  const supportedFrameworks = ['react', 'vue', 'svelte'];
  const framework = options.framework?.toLowerCase() || projectInfo.framework;
  
  if (!supportedFrameworks.includes(framework)) {
    throw new Error(`Framework '${framework}' is not supported. Supported frameworks: ${supportedFrameworks.join(', ')}`);
  }
  
  // Determine output directory
  let outputDir = options.directory;
  if (!outputDir) {
    outputDir = projectInfo.componentsDir;
  }
  
  // Determine styles directory
  const stylesDir = options.stylesDir || projectInfo.stylesDir;
  
  // Create output directory if it doesn't exist
  await fs.ensureDir(outputDir);
  
  // Ensure styles directory exists
  await fs.ensureDir(stylesDir);
  
  // Check if the component's styles exist, if not create them
  const componentStylePath = path.join(stylesDir, `mild-ui-${componentLower}.css`);
  if (!(await fs.pathExists(componentStylePath))) {
    console.log(chalk.yellow(`Component style file not found. Creating ${componentStylePath}...`));
    
    // Import the style template
    const { generateButtonStyles } = await import('../templates/styles');
    
    // Create component styles based on the component type
    if (componentLower === 'button') {
      await fs.writeFile(componentStylePath, generateButtonStyles());
    }
    
    console.log(chalk.green(`✓ Created styles for ${componentLower} component.`));
    console.log(chalk.blue(`📝 Remember to import these styles in your CSS file:`));
    console.log(chalk.cyan(`   @import '${path.relative('src', stylesDir)}/mild-ui-${componentLower}.css';`));
  }
  
  // Generate the component
  await generateComponent({
    component: componentLower,
    framework,
    outputDir,
    theme: options.theme,
    typescript: options.typescript ?? projectInfo.typescript
  });
  
  console.log(chalk.green(`✓ Successfully added ${componentLower} component to ${outputDir}!`));
}