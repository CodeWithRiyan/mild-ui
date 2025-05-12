import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

interface ProjectInfo {
  framework: string;
  typescript: boolean;
  componentsDir: string;
}

export async function getProjectInfo(): Promise<ProjectInfo> {
  const cwd = process.cwd();
  
  // Try to read mild-ui.json if it exists
  try {
    const configPath = path.join(cwd, 'mild-ui.json');
    if (await fs.pathExists(configPath)) {
      const configContent = await fs.readFile(configPath, 'utf-8');
      return JSON.parse(configContent);
    }
  } catch (error) {
    console.warn(chalk.yellow('Could not read mild-ui.json. Using default settings.'));
  }
  
  // Try to detect project type
  let framework = 'react'; // Default
  let typescript = true;
  let componentsDir = 'src/components';
  
  // Check for package.json
  try {
    const packagePath = path.join(cwd, 'package.json');
    if (await fs.pathExists(packagePath)) {
      const packageJson = JSON.parse(await fs.readFile(packagePath, 'utf-8'));
      
      // Check dependencies for framework
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      
      if (deps.vue) framework = 'vue';
      else if (deps.svelte) framework = 'svelte';
      
      // Check if project uses TypeScript
      typescript = !!deps.typescript;
      
      // Adjust components directory based on framework
      if (framework === 'svelte') {
        componentsDir = 'src/lib/components';
      }
    }
  } catch (error) {
    console.warn(chalk.yellow('Could not detect project type. Using default settings.'));
  }
  
  return { framework, typescript, componentsDir };
}