import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import { addCommand } from './commands/add';
import { transformCommand } from './commands/transform';
import { listCommand } from './commands/list';

// Display the CLI banner
console.log(
  chalk.blue(
    figlet.textSync('mild-ui CLI', { horizontalLayout: 'full' })
  )
);

const program = new Command();

program
  .name('mild-ui')
  .description('CLI tool for mild-ui component library')
  .version('0.1.0');

program
  .command('add [component]')
  .description('Add component(s) to your project')
  .option('-f, --framework <framework>', 'Target framework (react, vue, svelte)', 'react')
  .option('-d, --directory <directory>', 'Output directory', 'components')
  .option('-t, --theme <theme>', 'Theme to use', 'default')
  .option('--typescript', 'Generate TypeScript files', true)
  .option('--all', 'Install all available components')
  .option('--skip-existing', 'Skip components that already exist', false)
  .action((component, options) => {
    if (!component && !options.all) {
      console.error(chalk.red('Error: Either specify a component name or use --all flag'));
      console.log();
      console.log('Examples:');
      console.log('  mild-ui add Button');
      console.log('  mild-ui add --all');
      console.log('  mild-ui add --all --framework=vue');
      process.exit(1);
    }
    
    addCommand({
      component,
      framework: options.framework as 'react' | 'vue' | 'svelte',
      directory: options.directory,
      all: options.all,
      skipExisting: options.skipExisting,
    });
  });

program
  .command('transform <component>')
  .description('Transform a component from one framework to another')
  .requiredOption('--from <framework>', 'Source framework (react, vue, svelte)')
  .requiredOption('--to <framework>', 'Target framework (react, vue, svelte)')
  .option('-d, --directory <directory>', 'Component directory', 'components')
  .action((component, options) => {
    transformCommand({
      component,
      fromFramework: options.from as 'react' | 'vue' | 'svelte',
      toFramework: options.to as 'react' | 'vue' | 'svelte',
      directory: options.directory,
    });
  });

program
  .command('list')
  .description('List available components')
  .action(() => {
    listCommand();
  });

program
  .command('init')
  .description('Initialize mild-ui in your project')
  .option('-f, --framework <framework>', 'Target framework (react, vue, svelte)', 'react')
  .option('--typescript', 'Use TypeScript', true)
  .option('--all', 'Install all components during initialization')
  .action((options) => {
    console.log(chalk.blue(`Initializing mild-ui for ${options.framework}...`));
    
    if (options.all) {
      addCommand({
        framework: options.framework as 'react' | 'vue' | 'svelte',
        directory: 'components',
        all: true,
        skipExisting: true,
      });
    } else {
      console.log(chalk.yellow('Initialization complete! Use "mild-ui add [component]" or "mild-ui add --all" to add components.'));
    }
  });

// Parse arguments
program.parse(process.argv);

// Display help if no arguments provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
  console.log();
  console.log('Examples:');
  console.log('  mild-ui add Button                    # Add Button component (React by default)');
  console.log('  mild-ui add Input --framework=vue     # Add Input component for Vue');
  console.log('  mild-ui add --all                     # Add all React components');
  console.log('  mild-ui add --all --framework=svelte  # Add all Svelte components');
  console.log('  mild-ui list                          # List all available components');
  console.log('  mild-ui transform Button --from=react --to=vue  # Transform component');
}