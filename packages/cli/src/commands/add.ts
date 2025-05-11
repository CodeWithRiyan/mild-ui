// packages/cli/src/commands/add.ts
import { Command } from 'commander';
import { getAvailableComponents } from '../utils/detect';
import { installDependencies } from '../utils/install';
import { copyComponent } from '../utils/copy';
import { setupCSS } from '../utils/setup-css';
import { logger } from '../utils/logger';

export function addCommand(program: Command): void {
  program
    .command('add')
    .description('Add components to your project')
    .argument('<components...>', 'Component names to add (e.g., Button, Card, Alert)')
    .option('--no-typescript', 'Disable TypeScript')
    .option('--directory <path>', 'Custom component directory', 'components')
    .option('--force', 'Overwrite existing components')
    .option('--skip-install', 'Skip dependency installation')
    .option('--skip-css', 'Skip CSS and Tailwind setup')
    .action(async (components, options) => {
      try {
        // Convert component names to PascalCase
        const formattedComponents = components.map(
          (          component: string) => component.charAt(0).toUpperCase() + component.slice(1)
        );
        
        // Detect TypeScript if not specified
        const typescript = options.typescript || false;
        
        // Log the operation details
        logger.info(`Adding components:`, formattedComponents.join(', '));
        logger.info(`Using ${typescript ? 'TypeScript' : 'JavaScript'}`);
        logger.info(`Components will be added to: ${options.directory}`);
        
        // Check if components exist
        const availableComponents = getAvailableComponents();
        const invalidComponents = formattedComponents.filter(
          (          component: string) => !availableComponents.includes(component)
        );
        
        if (invalidComponents.length > 0) {
          logger.error(`The following components are not available:`, invalidComponents.join(', '));
          logger.info('Available components:', availableComponents.join(', '));
          return;
        }
        
        // Setup CSS and Tailwind if not skipped
        if (!options.skipCss) {
          await setupCSS({ force: options.force });
        }
        
        // Install dependencies if not skipped
        await installDependencies(formattedComponents, { 
          skipInstall: options.skipInstall 
        });
        
        // Copy components
        for (const component of formattedComponents) {
          await copyComponent(component, {
            typescript,
            directory: options.directory,
            force: options.force
          });
        }
        
        logger.success('All components added successfully!');
        logger.info('Import the components in your code:');
        logger.info(`import { ${formattedComponents.join(', ')} } from './${options.directory}';`);
        
      } catch (error) {
        logger.error('Failed to add components:', error);
        process.exit(1);
      }
    });
}