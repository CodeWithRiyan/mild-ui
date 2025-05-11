// packages/cli/src/utils/copy.ts
import fs from 'fs-extra';
import path from 'path';
import { logger } from './logger';
import { transformImports } from './transform';

/**
 * Copy a component from the React package to the user's project
 */
export async function copyComponent(
  componentName: string, 
  options: { 
    typescript: boolean, 
    directory: string,
    force?: boolean
  }
): Promise<void> {
  // Convert componentName to PascalCase if it's not already
  const pascalCaseComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  
  // Source is from the React package
  const sourceDir = path.resolve(__dirname, `../../../react/src/${pascalCaseComponentName}`);
  const targetDir = path.join(process.cwd(), options.directory, pascalCaseComponentName);
  
  // Check if component exists in the package
  if (!fs.existsSync(sourceDir)) {
    logger.error(`Component "${pascalCaseComponentName}" not found.`);
    return;
  }
  
  // Check if component already exists in the project
  if (fs.existsSync(targetDir) && !options.force) {
    logger.warn(`Component ${pascalCaseComponentName} already exists in ${targetDir}.`);
    logger.info('Use --force to overwrite the existing component.');
    return;
  }
  
  // Create target directory
  await fs.ensureDir(targetDir);
  
  // Copy component
  const spinner = logger.spinner(`Copying ${pascalCaseComponentName} component...`);
  
  try {
    const files = await fs.readdir(sourceDir);
    let copiedFiles = 0;
    
    for (const file of files) {
      // Skip Storybook stories when copying to user projects
      if (file.includes('.stories.')) {
        continue;
      }
      
      const srcFile = path.join(sourceDir, file);
      const destFile = path.join(targetDir, file);
      
      // Skip if not typescript and file is TypeScript (but allow type files)
      if (!options.typescript && file.endsWith('.ts') && !file.endsWith('.d.ts') && file !== 'types.ts') {
        continue;
      }
      
      // Read file content
      const content = fs.readFileSync(srcFile, 'utf8');
      
      // Transform imports
      const transformedContent = transformImports(content, pascalCaseComponentName);
      
      // Write transformed content to destination
      fs.writeFileSync(destFile, transformedContent);
      copiedFiles++;
    }
    
    if (copiedFiles === 0) {
      spinner.warn(`No files copied for ${pascalCaseComponentName}. Check if the component exists and is compatible.`);
    } else {
      spinner.succeed(`Copied ${pascalCaseComponentName} component with ${copiedFiles} files.`);
    }
  } catch (error) {
    spinner.fail(`Failed to copy ${pascalCaseComponentName} component.`);
    logger.error('Copy error:', error);
    return;
  }
  
  // Copy utility files
  await copyUtilities(options);
}

/**
 * Copy utility files needed by components
 */
export async function copyUtilities(
  options: {
    typescript: boolean,
    directory: string,
    force?: boolean
  }
): Promise<void> {
  // Source utility files from core package
  const sourceUtilsFile = path.resolve(__dirname, '../../../core/src/utils.ts');
  const libDir = path.join(process.cwd(), 'lib');
  const targetUtilsFile = path.join(libDir, 'utils.ts');
  
  // Create lib directory if it doesn't exist
  if (!fs.existsSync(libDir)) {
    await fs.ensureDir(libDir);
  }
  
  // Copy and transform utils file
  if (!fs.existsSync(targetUtilsFile) || options.force) {
    // Read utils file
    const utilsContent = fs.readFileSync(sourceUtilsFile, 'utf8');
    
    // Write utils file
    fs.writeFileSync(targetUtilsFile, utilsContent);
    logger.success(`Copied utilities to ${targetUtilsFile}`);
  }
  
  // Copy React theme provider
  await copyReactThemeProvider(options);
}

/**
 * Copy React theme provider
 */
async function copyReactThemeProvider(options: {
  typescript: boolean,
  directory: string,
  force?: boolean
}): Promise<void> {
  const themeDir = path.join(process.cwd(), 'lib', 'theme');
  const targetThemeFile = path.join(themeDir, 'theme-provider.tsx');
  
  if (!fs.existsSync(targetThemeFile) || options.force) {
    const sourceThemeFile = path.resolve(__dirname, '../../../react/src/theme/theme-provider.tsx');
    if (fs.existsSync(sourceThemeFile)) {
      // Read theme file
      const themeContent = fs.readFileSync(sourceThemeFile, 'utf8');
      
      // Transform theme file imports
      const transformedTheme = themeContent
        .replace(/from\s+?["']@mild-ui\/core["']/g, 
                `from '../../utils'`);
      
      await fs.ensureDir(themeDir);
      fs.writeFileSync(targetThemeFile, transformedTheme);
      logger.success(`Copied theme provider to ${targetThemeFile}`);
    }
  }
}