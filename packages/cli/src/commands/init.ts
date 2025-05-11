// packages/cli/src/commands/init.ts
import { Command } from 'commander';
import { setupCSS } from '../utils/setup-css';
import { installDependencies } from '../utils/install';
import { logger } from '../utils/logger';
import path from 'path';
import fs from 'fs-extra';

export function initCommand(program: Command): void {
  program
    .command('init')
    .description('Initialize a project with mild-ui')
    .option('--no-typescript', 'Disable TypeScript')
    .option('--directory <path>', 'Custom component directory', 'components')
    .option('--force', 'Overwrite existing files')
    .option('--skip-install', 'Skip dependency installation')
    .action(async (options) => {
      try {
        // Detect TypeScript if not specified
        const typescript = options.typescript || false;
        
        // Log the operation details
        logger.info('Initializing mild-ui for React');
        logger.info(`Using ${typescript ? 'TypeScript' : 'JavaScript'}`);
        logger.info(`Components will be added to: ${options.directory}`);
        
        // Create component directory
        const componentDir = path.join(process.cwd(), options.directory);
        await fs.ensureDir(componentDir);
        logger.success(`Created component directory: ${componentDir}`);
        
        // Setup CSS and Tailwind
        await setupCSS({ force: options.force });
        
        // Install core dependencies
        await installDependencies([], { 
          skipInstall: options.skipInstall 
        });
        
        // Create lib directory and utils file
        const libDir = path.join(process.cwd(), 'lib');
        await fs.ensureDir(libDir);
        
        // Copy utils file if it doesn't exist
        const targetUtilsFile = path.join(libDir, 'utils.ts');
        if (!fs.existsSync(targetUtilsFile) || options.force) {
          const sourceUtilsFile = path.resolve(__dirname, '../../../core/src/utils.ts');
          await fs.copy(sourceUtilsFile, targetUtilsFile);
          logger.success(`Created utilities file: ${targetUtilsFile}`);
        }
        
        logger.success('mild-ui initialized successfully!');
        logger.info('You can now add components using:');
        logger.info('  mild-ui add Button Card Alert ...');
      } catch (error) {
        logger.error('Failed to initialize project:', error);
        process.exit(1);
      }
    });
}