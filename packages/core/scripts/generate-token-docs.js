// packages/core/scripts/generate-token-docs.js
const fs = require('fs').promises;
const path = require('path');

/**
 * Simple design token documentation generator
 * Extracts tokens from your existing SASS files and compiled CSS
 */
async function generateTokenDocs() {
  console.log('📝 Generating design token documentation...');
  
  try {
    // Ensure docs directory exists
    await fs.mkdir('docs/generated', { recursive: true });
    
    const tokens = await extractTokens();
    
    // Generate markdown
    const markdown = generateMarkdown(tokens);
    
    // Write markdown file
    await fs.writeFile('docs/generated/design-tokens.md', markdown);
    
    // Write JSON file
    await fs.writeFile('docs/generated/design-tokens.json', JSON.stringify(tokens, null, 2));
    
    console.log('✅ Design token documentation generated');
  } catch (error) {
    console.warn('⚠️ Could not generate token docs:', error.message);
    // Create empty files so build doesn't fail
    await fs.mkdir('docs/generated', { recursive: true });
    await fs.writeFile('docs/generated/design-tokens.md', '# Design Tokens\n\nTokens will be generated after first CSS build.');
    await fs.writeFile('docs/generated/design-tokens.json', '{}');
  }
}

async function extractTokens() {
  const tokens = {
    colors: {},
    spacing: {},
    typography: {},
    borderRadius: {},
    shadows: {}
  };

  try {
    // Try to read from compiled CSS first
    const cssPath = 'dist/mild-ui.css';
    const cssExists = await fs.access(cssPath).then(() => true).catch(() => false);
    
    if (cssExists) {
      const cssContent = await fs.readFile(cssPath, 'utf-8');
      extractFromCSS(cssContent, tokens);
    } else {
      // Fallback: extract from SASS files
      await extractFromSASS(tokens);
    }
  } catch (error) {
    console.warn('Could not extract tokens:', error.message);
  }

  return tokens;
}

function extractFromCSS(cssContent, tokens) {
  // Extract CSS custom properties
  const tokenMatches = cssContent.match(/--mild-[^:]+:[^;]+/g) || [];
  
  tokenMatches.forEach(match => {
    const [property, value] = match.split(':');
    const cleanProperty = property.trim().replace('--mild-', '');
    const cleanValue = value.trim();
    
    // Categorize tokens
    if (cleanProperty.startsWith('color-')) {
      tokens.colors[cleanProperty.replace('color-', '')] = cleanValue;
    } else if (cleanProperty.startsWith('space-')) {
      tokens.spacing[cleanProperty.replace('space-', '')] = cleanValue;
    } else if (cleanProperty.startsWith('font-')) {
      tokens.typography[cleanProperty.replace('font-', '')] = cleanValue;
    } else if (cleanProperty.startsWith('radius-')) {
      tokens.borderRadius[cleanProperty.replace('radius-', '')] = cleanValue;
    } else if (cleanProperty.startsWith('shadow-')) {
      tokens.shadows[cleanProperty.replace('shadow-', '')] = cleanValue;
    }
  });
}

async function extractFromSASS(tokens) {
  // Extract from SASS files as fallback
  try {
    // Read colors from SASS
    const colorsPath = 'src/sass/tokens/_colors.scss';
    const colorsExists = await fs.access(colorsPath).then(() => true).catch(() => false);
    
    if (colorsExists) {
      const colorsContent = await fs.readFile(colorsPath, 'utf-8');
      
      // Simple regex to extract color values (basic implementation)
      const colorRegex = /(\d+):\s*([^,\)]+)/g;
      let match;
      
      while ((match = colorRegex.exec(colorsContent)) !== null) {
        const [, shade, value] = match;
        tokens.colors[`color-${shade}`] = value.trim();
      }
    }
    
    // Read spacing from SASS
    const spacingPath = 'src/sass/tokens/_spacing.scss';
    const spacingExists = await fs.access(spacingPath).then(() => true).catch(() => false);
    
    if (spacingExists) {
      const spacingContent = await fs.readFile(spacingPath, 'utf-8');
      
      // Extract spacing values
      const spacingRegex = /'([^']+)':\s*([^,\)]+)/g;
      let match;
      
      while ((match = spacingRegex.exec(spacingContent)) !== null) {
        const [, name, value] = match;
        tokens.spacing[name] = value.trim();
      }
    }
  } catch (error) {
    console.warn('Could not extract from SASS files:', error.message);
  }
}

function generateMarkdown(tokens) {
  let markdown = `# Design Tokens

Auto-generated from mild-ui SASS compilation.

`;

  // Colors section
  if (Object.keys(tokens.colors).length > 0) {
    markdown += `## Colors\n\n`;
    markdown += `| Token | Value | Preview |\n`;
    markdown += `|-------|-------|----------|\n`;
    
    Object.entries(tokens.colors).forEach(([name, value]) => {
      const preview = value.startsWith('#') || value.startsWith('rgb') ? 
        `<div style="display:inline-block;width:20px;height:20px;background:${value};border:1px solid #ccc;border-radius:3px;"></div>` : '';
      markdown += `| \`--mild-color-${name}\` | \`${value}\` | ${preview} |\n`;
    });
    markdown += '\n';
  }

  // Spacing section
  if (Object.keys(tokens.spacing).length > 0) {
    markdown += `## Spacing\n\n`;
    markdown += `| Token | Value |\n`;
    markdown += `|-------|---------|\n`;
    
    Object.entries(tokens.spacing).forEach(([name, value]) => {
      markdown += `| \`--mild-space-${name}\` | \`${value}\` |\n`;
    });
    markdown += '\n';
  }

  // Typography section
  if (Object.keys(tokens.typography).length > 0) {
    markdown += `## Typography\n\n`;
    markdown += `| Token | Value |\n`;
    markdown += `|-------|---------|\n`;
    
    Object.entries(tokens.typography).forEach(([name, value]) => {
      markdown += `| \`--mild-font-${name}\` | \`${value}\` |\n`;
    });
    markdown += '\n';
  }

  // Border Radius section
  if (Object.keys(tokens.borderRadius).length > 0) {
    markdown += `## Border Radius\n\n`;
    markdown += `| Token | Value |\n`;
    markdown += `|-------|---------|\n`;
    
    Object.entries(tokens.borderRadius).forEach(([name, value]) => {
      markdown += `| \`--mild-radius-${name}\` | \`${value}\` |\n`;
    });
    markdown += '\n';
  }

  // Shadows section
  if (Object.keys(tokens.shadows).length > 0) {
    markdown += `## Shadows\n\n`;
    markdown += `| Token | Value |\n`;
    markdown += `|-------|---------|\n`;
    
    Object.entries(tokens.shadows).forEach(([name, value]) => {
      markdown += `| \`--mild-shadow-${name}\` | \`${value}\` |\n`;
    });
    markdown += '\n';
  }

  markdown += `---

*Last updated: ${new Date().toISOString()}*  
*Generated automatically from SASS compilation*
`;

  return markdown;
}

if (require.main === module) {
  generateTokenDocs().catch(console.error);
}

module.exports = { generateTokenDocs };