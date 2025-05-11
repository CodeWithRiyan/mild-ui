// packages/cli/src/utils/install.ts
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { logger } from './logger';

/**
 * Detect the package manager used in the project
 */
export function detectPackageManager(): 'npm' | 'yarn' | 'pnpm' {
  if (fs.existsSync(path.join(process.cwd(), 'yarn.lock'))) {
    return 'yarn';
  } else if (fs.existsSync(path.join(process.cwd(), 'pnpm-lock.yaml'))) {
    return 'pnpm';
  } else {
    return 'npm';
  }
}

/**
 * Get the install command for the detected package manager
 */
export function getInstallCommand(
  packageManager: 'npm' | 'yarn' | 'pnpm', 
  dependencies: string[],
  isDev = false
): string {
  const deps = dependencies.join(' ');
  const devFlag = isDev ? (packageManager === 'npm' ? '--save-dev' : '-D') : '';
  
  switch (packageManager) {
    case 'yarn':
      return `yarn add ${devFlag} ${deps}`;
    case 'pnpm':
      return `pnpm add ${devFlag} ${deps}`;
    default:
      return `npm install ${devFlag} ${deps}`;
  }
}

/**
 * Core dependencies required for React components
 */
const coreDependencies = {
  all: [
    'clsx', 
    'tailwind-merge'
  ],
  dev: [
    'tailwindcss',
    'postcss',
    'autoprefixer'
  ]
};

/**
 * React-specific dependencies
 */
const reactDependencies = {
  core: [
    '@radix-ui/react-slot', 
    'class-variance-authority'
  ],
  dev: []
};

/**
 * Component-specific dependencies
 */
const componentDependencies: Record<string, string[]> = {
  Button: [],
  // Add more components and their dependencies as needed
};

/**
 * Install dependencies required for the components
 */
export async function installDependencies(
  components: string[],
  options: { skipInstall?: boolean } = {}
): Promise<void> {
  const packageManager = detectPackageManager();
  
  // Collect all dependencies
  const coreDeps = [...coreDependencies.all, ...reactDependencies.core];
  const devDeps = [...coreDependencies.dev, ...reactDependencies.dev];
  
  // Add component-specific dependencies
  for (const component of components) {
    if (componentDependencies[component]) {
      coreDeps.push(...componentDependencies[component]);
    }
  }
  
  // Remove duplicates
  const uniqueCoreDeps = [...new Set(coreDeps)];
  const uniqueDevDeps = [...new Set(devDeps)];
  
  if (options.skipInstall) {
    logger.info('Skipping dependency installation.');
    logger.info('Required dependencies:');
    logger.info('Runtime:', uniqueCoreDeps.join(', '));
    logger.info('Development:', uniqueDevDeps.join(', '));
    return;
  }
  
  // Install runtime dependencies
  if (uniqueCoreDeps.length > 0) {
    const spinner = logger.spinner(`Installing dependencies with ${packageManager}...`);
    
    try {
      const installCommand = getInstallCommand(packageManager, uniqueCoreDeps);
      execSync(installCommand, { stdio: 'pipe' });
      spinner.succeed('Dependencies installed successfully.');
    } catch (error) {
      spinner.fail('Failed to install dependencies.');
      logger.error('Installation error:', error);
      logger.info('You may need to install these dependencies manually:', uniqueCoreDeps.join(', '));
    }
  }
  
  // Install dev dependencies
  if (uniqueDevDeps.length > 0) {
    const spinner = logger.spinner(`Installing dev dependencies with ${packageManager}...`);
    
    try {
      const installCommand = getInstallCommand(packageManager, uniqueDevDeps, true);
      execSync(installCommand, { stdio: 'pipe' });
      spinner.succeed('Dev dependencies installed successfully.');
    } catch (error) {
      spinner.fail('Failed to install dev dependencies.');
      logger.error('Installation error:', error);
      logger.info('You may need to install these dev dependencies manually:', uniqueDevDeps.join(', '));
    }
  }
}