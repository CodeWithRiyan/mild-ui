// packages/cli/src/utils/setup-css.ts
import fs from 'fs-extra';
import path from 'path';
import { logger } from './logger';

/**
 * Setup global CSS and Tailwind configuration
 */
export async function setupCSS(options: { force?: boolean } = {}): Promise<void> {
  await setupGlobalCSS(options);
  await setupTailwindConfig(options);
}

/**
 * Setup global CSS
 */
async function setupGlobalCSS(options: { force?: boolean } = {}): Promise<void> {
  // Source CSS file
  const sourceCSSFile = path.resolve(__dirname, '../../templates/config/globals.css');
  
  // If template doesn't exist in CLI package, use the one from monorepo
  const monorepoSourceCSSFile = path.resolve(__dirname, '../../../../styles/globals.css');
  const cssSourcePath = fs.existsSync(sourceCSSFile) ? sourceCSSFile : monorepoSourceCSSFile;
  
  if (!fs.existsSync(cssSourcePath)) {
    logger.error('Global CSS template not found.');
    return;
  }
  
  // Target CSS file - check common CSS folders
  const possibleCssDirs = [
    'styles',
    'src/styles',
    'src/assets/styles',
    'src/assets/css',
    'src/css',
    'css'
  ];
  
  let targetCSSDir = '';
  let targetCSSFile = '';
  
  // Find existing CSS folder or create a new one
  for (const dir of possibleCssDirs) {
    const cssDir = path.join(process.cwd(), dir);
    if (fs.existsSync(cssDir)) {
      targetCSSDir = cssDir;
      break;
    }
  }
  
  if (!targetCSSDir) {
    targetCSSDir = path.join(process.cwd(), 'styles');
    await fs.ensureDir(targetCSSDir);
  }
  
  // Look for existing global CSS files
  const possibleFilenames = [
    'globals.css',
    'global.css',
    'index.css',
    'main.css',
    'styles.css',
    'style.css'
  ];
  
  for (const filename of possibleFilenames) {
    const cssFile = path.join(targetCSSDir, filename);
    if (fs.existsSync(cssFile)) {
      targetCSSFile = cssFile;
      break;
    }
  }
  
  if (!targetCSSFile) {
    targetCSSFile = path.join(targetCSSDir, 'globals.css');
  }
  
  // Check if file exists and if we should overwrite
  if (fs.existsSync(targetCSSFile) && !options.force) {
    logger.warn(`CSS file already exists at ${targetCSSFile}`);
    logger.info('You may need to manually add the required CSS variables.');
    logger.info('Use --force to overwrite the existing file.');
    return;
  }
  
  // Copy the CSS file
  await fs.copy(cssSourcePath, targetCSSFile);
  logger.success(`Global CSS set up at ${targetCSSFile}`);
}

/**
 * Setup Tailwind config
 */
async function setupTailwindConfig(options: { force?: boolean } = {}): Promise<void> {
  // Source Tailwind config
  const sourceTailwindConfig = path.resolve(__dirname, '../../templates/config/tailwind.config.js');
  
  // If template doesn't exist in CLI package, use the one from monorepo
  const monorepoSourceConfig = path.resolve(__dirname, '../../../../tailwind.config.js');
  const tailwindSourcePath = fs.existsSync(sourceTailwindConfig) 
    ? sourceTailwindConfig 
    : monorepoSourceConfig;
  
  if (!fs.existsSync(tailwindSourcePath)) {
    logger.error('Tailwind config template not found.');
    return;
  }
  
  // Target Tailwind config
  const targetTailwindConfig = path.join(process.cwd(), 'tailwind.config.js');
  
  // Check if file exists and if we should overwrite
  if (fs.existsSync(targetTailwindConfig) && !options.force) {
    logger.warn('Tailwind config already exists.');
    logger.info('You may need to manually update the configuration.');
    logger.info('Use --force to overwrite the existing file.');
    return;
  }
  
  // Copy the Tailwind config
  await fs.copy(tailwindSourcePath, targetTailwindConfig);
  logger.success('Tailwind config set up.');
  
  // Check if PostCSS config exists, create if it doesn't
  const postCssConfigPath = path.join(process.cwd(), 'postcss.config.js');
  
  if (!fs.existsSync(postCssConfigPath)) {
    const postCssConfig = `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;
    await fs.writeFile(postCssConfigPath, postCssConfig);
    logger.success('PostCSS config set up.');
  }
}