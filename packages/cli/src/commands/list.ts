// packages/cli/src/commands/list.ts
import { Command } from 'commander';
import { getAvailableComponents } from '../utils/detect';
import { logger } from '../utils/logger';
import chalk from 'chalk';

export function listCommand(program: Command): void {
  program
    .command('list')
    .description('List available components')
    .action(async () => {
      try {
        // Get available components
        const components = getAvailableComponents();
        
        if (components.length === 0) {
          logger.warn('No components available.');
          return;
        }
        
        logger.info('Available components:');
        
        // List the components
        console.log();
        components.forEach(component => {
          console.log(`  ${chalk.green('•')} ${chalk.bold(component)}`);
        });
        console.log();
        
        logger.info('To add components, run:');
        logger.info(`  mild-ui add ${components[0]}`);
      } catch (error) {
        logger.error('Failed to list components:', error);
        process.exit(1);
      }
    });
}