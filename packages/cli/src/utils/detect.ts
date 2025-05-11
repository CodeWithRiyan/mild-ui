// packages/cli/src/utils/detect.ts
import fs from 'fs-extra';
import path from 'path';
import { logger } from './logger';

/**
 * Supported frameworks - now only React
 */
export type Framework = 'react';

/**
 * Detect the framework used in the current project
 * Since we only support React now, this is simplified
 */
export async function detectFramework(): Promise<Framework> {
  // Check for package.json
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    logger.warn('No package.json found in the current directory.');
    // Since we only support React, just return 'react'
    logger.info('Defaulting to React framework.');
    return 'react';
  }

  try {
    const packageJson = await fs.readJson(packageJsonPath);
    const dependencies = { 
      ...packageJson.dependencies, 
      ...packageJson.devDependencies 
    };
    
    logger.debug('Detected dependencies:', Object.keys(dependencies).join(', '));
    
    // Check if the project is using React
    if (dependencies.react) {
      logger.info('Detected React project.');
    } else {
      logger.warn('React not found in dependencies, but continuing with React components.');
      logger.info('You may need to install React dependencies manually.');
    }

    // Always return react as we only support React now
    return 'react';
  } catch (error) {
    logger.error('Error reading package.json:', error);
    logger.info('Defaulting to React framework.');
    return 'react';
  }
}

/**
 * Get the available components for a framework
 */
export function getAvailableComponents(): string[] {
  try {
    const componentsDir = path.resolve(__dirname, `../../../react/src`);
    
    if (!fs.existsSync(componentsDir)) {
      logger.error(`Components directory not found.`);
      return [];
    }
    
    const contents = fs.readdirSync(componentsDir);
    const components = contents.filter(item => {
      const itemPath = path.join(componentsDir, item);
      return fs.statSync(itemPath).isDirectory() && 
             !item.startsWith('.') && 
             item !== 'theme'; // Exclude theme directory
    });
    
    return components;
  } catch (error) {
    logger.error('Error reading available components:', error);
    return [];
  }
}