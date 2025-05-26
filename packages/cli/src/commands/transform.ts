import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { readComponentFromFramework } from '../utils/component-reader';
import { processComponentFiles, transformComponent } from '../utils/component-processor';

interface TransformCommandOptions {
  component: string;
  fromFramework: 'react' | 'vue' | 'svelte';
  toFramework: 'react' | 'vue' | 'svelte';
  directory?: string;
}

export async function transformCommand(options: TransformCommandOptions): Promise<void> {
  const {
    component,
    fromFramework,
    toFramework,
    directory = 'components'
  } = options;
  
  try {
    if (fromFramework === toFramework) {
      throw new Error('Source and target frameworks must be different');
    }
    
    console.log(chalk.blue(`Transforming ${component} from ${fromFramework} to ${toFramework}...`));
    
    // Check if source component exists in user's project
    const sourceDir = path.join(process.cwd(), directory, component);
    if (!fs.existsSync(sourceDir)) {
      throw new Error(`Source component not found at: ${sourceDir}`);
    }
    
    // Read the target component from the framework implementation
    const targetComponent = await readComponentFromFramework(component, toFramework);
    
    // Process the component files
    const processedFiles = processComponentFiles(targetComponent, {
      removeDevDependencies: true
    });
    
    // Create the target directory
    const targetDir = path.join(process.cwd(), directory, `${component}-${toFramework}`);
    await fs.ensureDir(targetDir);
    
    // Write the processed files
    for (const file of processedFiles) {
      const targetPath = path.join(targetDir, file.filename);
      await fs.writeFile(targetPath, file.content);
      console.log(chalk.green(`  ✓ Created ${path.relative(process.cwd(), targetPath)}`));
    }
    
    console.log();
    console.log(chalk.green(`✓ Successfully transformed ${component} to ${toFramework}!`));
    console.log();
    console.log(`The transformed component is available at:`);
    console.log(chalk.cyan(`${directory}/${component}-${toFramework}/`));
    
  } catch (error: any) {
    console.error(chalk.red(`Error transforming component: ${error.message}`));
    process.exit(1);
  }
}