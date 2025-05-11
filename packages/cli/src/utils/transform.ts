// packages/cli/src/utils/transform.ts
import { logger } from './logger';

/**
 * Transform imports/exports in component files
 */
export function transformImports(
  content: string, 
  componentName: string
): string {
  logger.debug(`Transforming imports for ${componentName}`);
  
  // Replace import from @mild-ui/core for double quotes
  let result = content.replace(
    /import\s+?(\{[^}]+\})\s+?from\s+?"@mild-ui\/core"/g,
    `import $1 from "../../lib/utils"`
  );
  
  // Replace import from @mild-ui/core for single quotes
  result = result.replace(
    /import\s+?(\{[^}]+\})\s+?from\s+?'@mild-ui\/core'/g,
    `import $1 from '../../lib/utils'`
  );
  
  // React-specific transformations
  result = result.replace(
    /import\s+\{\s*buttonVariants\s*\}\s+from\s+['"]\.\/Button['"]/g,
    `import { buttonVariants } from './Button'`
  );
  
  return result;
}

/**
 * Fix paths in TypeScript config
 */
export function fixTsConfigPaths(content: string): string {
  return content.replace(
    /"baseUrl":\s*".*?"/g,
    '"baseUrl": "."'
  );
}