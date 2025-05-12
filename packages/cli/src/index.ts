import { Command } from 'commander';
import chalk from 'chalk';
import { addComponent } from './commands/add';
import { listComponents } from './commands/list';
import { initProject } from './commands/init';

const program = new Command();

program
  .name('mild-ui')
  .description('CLI tool for mild-ui component library')
  .version('1.0.0'); // Updated to 1.0.0

program
  .command('add <component>')
  .description('Add a component to your project')
  .option('-f, --framework <framework>', 'Target framework', 'react')
  .option('-d, --directory <directory>', 'Output directory')
  .option('-t, --theme <theme>', 'Theme to use')
  .option('--typescript', 'Generate TypeScript files', true)
  .action(async (component, options) => {
    try {
      console.log(chalk.blue(`Adding ${component} component for ${options.framework}...`));
      
      await addComponent({
        component,
        framework: options.framework,
        directory: options.directory,
        theme: options.theme,
        typescript: options.typescript
      });
      
      console.log(chalk.green(`✓ Successfully added ${component} component!`));
    } catch (error) {
      console.error(chalk.red(`Error adding component: ${error}`));
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List available components')
  .action(() => {
    try {
      listComponents();
    } catch (error) {
      console.error(chalk.red(`Error listing components: ${error}`));
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize mild-ui in your project')
  .action(async () => {
    try {
      await initProject();
    } catch (error) {
      console.error(chalk.red(`Error initializing mild-ui: ${error}`));
      process.exit(1);
    }
  });

program.parse(process.argv);