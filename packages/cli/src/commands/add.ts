import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { readComponentFromFramework, getAvailableComponents } from '../utils/component-reader';
import { processComponentFiles } from '../utils/component-processor';

interface AddCommandOptions {
  component?: string;
  framework?: 'react' | 'vue' | 'svelte';
  directory?: string;
  customImportPaths?: Record<string, string>;
  all?: boolean;
  skipExisting?: boolean;
}

export async function addCommand(options: AddCommandOptions): Promise<void> {
  const {
    component,
    framework = 'react',
    directory = 'components',
    customImportPaths = {},
    all = false,
    skipExisting = false
  } = options;
  
  try {
    if (all) {
      await addAllComponents({ framework, directory, customImportPaths, skipExisting });
    } else if (component) {
      await addSingleComponent({ component, framework, directory, customImportPaths, skipExisting });
    } else {
      throw new Error('Either specify a component name or use --all flag');
    }
    
  } catch (error: any) {
    console.error(chalk.red(`Error adding component(s): ${error.message}`));
    process.exit(1);
  }
}

/**
 * Add all available components for a framework
 */
async function addAllComponents(options: {
  framework: 'react' | 'vue' | 'svelte';
  directory: string;
  customImportPaths: Record<string, string>;
  skipExisting: boolean;
}): Promise<void> {
  const { framework, directory, customImportPaths, skipExisting } = options;
  
  console.log(chalk.blue(`Installing all ${framework} components...\n`));
  
  // Get all available components
  const availableComponents = await getAvailableComponents(framework);
  
  if (availableComponents.length === 0) {
    console.log(chalk.yellow(`No components available for ${framework}`));
    return;
  }
  
  console.log(chalk.cyan(`Found ${availableComponents.length} components:`));
  availableComponents.forEach(comp => console.log(`  - ${comp}`));
  console.log();
  
  // Ensure core files exist first
  await ensureCoreFiles(directory);
  
  const results = {
    success: [] as string[],
    skipped: [] as string[],
    failed: [] as Array<{ component: string; error: string }>
  };
  
  // Install each component
  for (const componentName of availableComponents) {
    try {
      console.log(chalk.blue(`Installing ${componentName}...`));
      
      // Check if component already exists
      const targetDir = path.join(process.cwd(), directory, componentName);
      if (fs.existsSync(targetDir)) {
        if (skipExisting) {
          console.log(chalk.yellow(`  ⚠ Skipped (already exists)`));
          results.skipped.push(componentName);
          continue;
        } else {
          console.log(chalk.yellow(`  ⚠ Overwriting existing component`));
        }
      }
      
      await installComponent(componentName, framework, directory, customImportPaths);
      console.log(chalk.green(`  ✓ Installed successfully`));
      results.success.push(componentName);
      
    } catch (error: any) {
      console.log(chalk.red(`  ✗ Failed: ${error.message}`));
      results.failed.push({ component: componentName, error: error.message });
    }
    
    console.log(); // Empty line for readability
  }
  
  // Print summary
  printInstallationSummary(results, framework);
}

/**
 * Add a single component
 */
async function addSingleComponent(options: {
  component: string;
  framework: 'react' | 'vue' | 'svelte';
  directory: string;
  customImportPaths: Record<string, string>;
  skipExisting: boolean;
}): Promise<void> {
  const { component, framework, directory, customImportPaths, skipExisting } = options;
  
  console.log(chalk.blue(`Adding ${component} component for ${framework}...`));
  
  // Check if component exists in the framework
  const availableComponents = await getAvailableComponents(framework);
  if (!availableComponents.includes(component)) {
    console.log(chalk.yellow(`Available components for ${framework}:`));
    availableComponents.forEach(comp => console.log(`  - ${comp}`));
    throw new Error(`Component ${component} not found in ${framework} package`);
  }
  
  // Check if component already exists
  const targetDir = path.join(process.cwd(), directory, component);
  if (fs.existsSync(targetDir)) {
    if (skipExisting) {
      console.log(chalk.yellow(`Component ${component} already exists. Skipped.`));
      return;
    } else {
      console.log(chalk.yellow(`Component ${component} already exists. Overwriting...`));
    }
  }
  
  // Ensure core files exist first
  await ensureCoreFiles(directory);
  
  // Install the component
  await installComponent(component, framework, directory, customImportPaths);
  
  console.log();
  console.log(chalk.green(`✓ Successfully added ${component} component!`));
  console.log();
  console.log(`You can now import the component:`);
  console.log(chalk.cyan(`import { ${component} } from './${directory}/${component}';`));
}

/**
 * Install a single component (shared logic)
 */
async function installComponent(
  componentName: string,
  framework: 'react' | 'vue' | 'svelte',
  directory: string,
  customImportPaths: Record<string, string>
): Promise<void> {
  // Read the component from the actual framework implementation
  const frameworkComponent = await readComponentFromFramework(componentName, framework);
  
  // Process the component files for the user's project
  const processedFiles = processComponentFiles(frameworkComponent, {
    customImportPaths,
    removeDevDependencies: true
  });
  
  // Create the component directory in user's project
  const targetDir = path.join(process.cwd(), directory, componentName);
  await fs.ensureDir(targetDir);
  
  // Write the processed files
  for (const file of processedFiles) {
    const targetPath = path.join(targetDir, file.filename);
    await fs.writeFile(targetPath, file.content);
  }
}

/**
 * Print installation summary
 */
function printInstallationSummary(
  results: {
    success: string[];
    skipped: string[];
    failed: Array<{ component: string; error: string }>;
  },
  framework: string
): void {
  console.log(chalk.blue('Installation Summary:'));
  console.log('─'.repeat(50));
  
  if (results.success.length > 0) {
    console.log(chalk.green(`✓ Successfully installed (${results.success.length}):`));
    results.success.forEach(comp => console.log(`  - ${comp}`));
    console.log();
  }
  
  if (results.skipped.length > 0) {
    console.log(chalk.yellow(`⚠ Skipped (${results.skipped.length}):`));
    results.skipped.forEach(comp => console.log(`  - ${comp} (already exists)`));
    console.log();
  }
  
  if (results.failed.length > 0) {
    console.log(chalk.red(`✗ Failed (${results.failed.length}):`));
    results.failed.forEach(({ component, error }) => {
      console.log(`  - ${component}: ${error}`);
    });
    console.log();
  }
  
  console.log(chalk.cyan(`Total components processed: ${results.success.length + results.skipped.length + results.failed.length}`));
  
  if (results.success.length > 0) {
    console.log();
    console.log(chalk.green('🎉 Components are ready to use!'));
    console.log(`Import them from './${path.basename(process.cwd())}/components/[ComponentName]'`);
    
    // Show common dependencies
    console.log();
    console.log(chalk.yellow('Make sure you have the required dependencies installed:'));
    const commonDeps = getCommonDependencies(framework);
    commonDeps.forEach(dep => console.log(`  ${dep}`));
  }
}

/**
 * Get common dependencies for a framework
 */
function getCommonDependencies(framework: string): string[] {
  switch (framework) {
    case 'react':
      return [
        'react',
        'react-dom',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-radio-group',
        '@radix-ui/react-select',
        '@radix-ui/react-slot',
        'lucide-react',
        'class-variance-authority',
        'clsx',
        'tailwind-merge'
      ];
    case 'vue':
      return [
        'vue',
        'lucide-vue-next',
        '@vueuse/core',
        'class-variance-authority',
        'clsx',
        'tailwind-merge'
      ];
    case 'svelte':
      return [
        'svelte',
        'lucide-svelte',
        'class-variance-authority',
        'clsx',
        'tailwind-merge'
      ];
    default:
      return [];
  }
}

/**
 * Ensure core files exist in the user's project
 */
async function ensureCoreFiles(directory: string): Promise<void> {
  const coreDir = path.join(process.cwd(), directory, 'core');
  
  if (fs.existsSync(coreDir)) {
    return; // Core files already exist
  }
  
  console.log(chalk.blue('Setting up core utilities...'));
  
  // Copy core utilities
  const coreSrcPath = path.resolve(__dirname, '../../core/src');
  const utilsPath = path.join(coreSrcPath, 'utils');
  
  if (fs.existsSync(utilsPath)) {
    await fs.copy(utilsPath, path.join(coreDir, 'utils'));
    console.log(chalk.green('  ✓ Copied core utilities'));
  }
  
  // Create a simple index file that re-exports commonly used utilities
  const indexContent = `// Re-export utilities
export * from './utils/cn';
export * from './utils/keyboard';
export * from './utils/focus-trap';
`;
  
  await fs.writeFile(path.join(coreDir, 'index.ts'), indexContent);
  console.log(chalk.green('  ✓ Created core index'));
}