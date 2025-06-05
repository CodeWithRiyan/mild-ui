// packages/core/scripts/generate-docs.js
const fs = require('fs').promises;
const path = require('path');

async function generateDocs() {
  console.log('🔧 Generating documentation...');
  
  // Ensure docs directory exists
  const docsDir = path.join(__dirname, '../docs');
  await fs.mkdir(docsDir, { recursive: true });
  
  // Read package.json for version and info
  const packageJson = JSON.parse(
    await fs.readFile(path.join(__dirname, '../package.json'), 'utf8')
  );
  
  // Scan components
  const componentsDir = path.join(__dirname, '../src/components');
  let components = [];
  
  try {
    const componentDirs = await fs.readdir(componentsDir);
    console.log(`🔍 Found ${componentDirs.length} items in components directory:`, componentDirs);
    
    for (const dir of componentDirs) {
      const componentPath = path.join(componentsDir, dir);
      try {
        const stat = await fs.stat(componentPath);
        
        if (stat.isDirectory()) {
          console.log(`📁 Analyzing component: ${dir}`);
          const component = await analyzeComponent(componentPath, dir);
          components.push(component);
          console.log(`   ✓ Component ${dir} analyzed:`, {
            hasTypes: !!component.types,
            hasStyles: !!component.styles,
            hasCore: !!component.core,
            hasIndex: component.hasIndex
          });
        }
      } catch (error) {
        console.log(`   ⚠️ Could not analyze ${dir}:`, error.message);
      }
    }
  } catch (error) {
    console.log('📝 No components directory found, creating basic docs...');
    console.log('💡 Expected components at:', componentsDir);
  }
  
  // Scan SASS files
  const sassInfo = await analyzeSassStructure();
  
  // Generate main documentation
  const html = generateHTML(packageJson, components, sassInfo);
  
  await fs.writeFile(path.join(docsDir, 'index.html'), html);
  
  // Generate component API docs
  if (components.length > 0) {
    console.log('📖 Generating individual component pages...');
    for (const component of components) {
      const componentHtml = generateComponentPage(component, packageJson);
      const fileName = `${component.name.toLowerCase()}.html`;
      await fs.writeFile(path.join(docsDir, fileName), componentHtml);
      console.log(`   ✓ Generated ${fileName}`);
    }
  } else {
    console.log('ℹ️  No components found to generate individual pages');
  }
  
  console.log('✅ Documentation generated successfully!');
  console.log(`📄 Generated docs for ${components.length} components`);
  if (components.length > 0) {
    console.log('📋 Component pages generated:');
    components.forEach(comp => {
      console.log(`   • ${comp.name.toLowerCase()}.html`);
    });
  }
  
  // List all generated files
  try {
    const files = await fs.readdir(docsDir);
    console.log('📂 All files in docs directory:', files);
  } catch (error) {
    console.log('⚠️ Could not list docs directory');
  }
  
  console.log('🌐 Run `pnpm docs:serve` to view documentation');
  console.log('🔗 Main page: http://localhost:3001/');
  if (components.length > 0) {
    console.log('🔗 Component pages:');
    components.forEach(comp => {
      console.log(`   • http://localhost:3001/${comp.name.toLowerCase()}.html`);
    });
  }
}

async function analyzeComponent(componentPath, name) {
  const component = {
    name,
    types: null,
    styles: null,
    core: null,
    hasIndex: false
  };
  
  try {
    const files = await fs.readdir(componentPath);
    
    for (const file of files) {
      const filePath = path.join(componentPath, file);
      
      if (file.endsWith('.types.ts')) {
        const content = await fs.readFile(filePath, 'utf8');
        component.types = extractTypeInfo(content);
      } else if (file.endsWith('.styles.ts')) {
        const content = await fs.readFile(filePath, 'utf8');
        component.styles = extractStyleInfo(content);
      } else if (file.endsWith('.core.ts')) {
        const content = await fs.readFile(filePath, 'utf8');
        component.core = extractCoreInfo(content);
      } else if (file === 'index.ts') {
        component.hasIndex = true;
      }
    }
  } catch (error) {
    console.log(`⚠️  Could not analyze component ${name}:`, error.message);
  }
  
  return component;
}

function extractTypeInfo(content) {
  const interfaces = [];
  const types = [];
  
  // Extract interfaces
  const interfaceRegex = /export interface (\w+)[^{]*{([^}]*)}/g;
  let match;
  while ((match = interfaceRegex.exec(content)) !== null) {
    interfaces.push({
      name: match[1],
      properties: extractProperties(match[2])
    });
  }
  
  // Extract type aliases
  const typeRegex = /export type (\w+) = ([^;]+);/g;
  while ((match = typeRegex.exec(content)) !== null) {
    types.push({
      name: match[1],
      definition: match[2].trim()
    });
  }
  
  return { interfaces, types };
}

function extractProperties(propertiesStr) {
  const properties = [];
  const lines = propertiesStr.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('*')) {
      const propMatch = trimmed.match(/(\w+)\??\s*:\s*([^;]+);?/);
      if (propMatch) {
        properties.push({
          name: propMatch[1],
          type: propMatch[2].trim(),
          optional: trimmed.includes('?')
        });
      }
    }
  }
  
  return properties;
}

function extractStyleInfo(content) {
  const variants = [];
  
  // Extract cva calls and variants
  const cvaRegex = /export const (\w+) = cva\([^,]+,\s*{([^}]+)}/g;
  let match;
  while ((match = cvaRegex.exec(content)) !== null) {
    variants.push({
      name: match[1],
      config: match[2]
    });
  }
  
  return { variants };
}

function extractCoreInfo(content) {
  const functions = [];
  
  // Extract exported functions
  const functionRegex = /export function (\w+)\([^)]*\)/g;
  let match;
  while ((match = functionRegex.exec(content)) !== null) {
    functions.push(match[1]);
  }
  
  return { functions };
}

async function analyzeSassStructure() {
  const sassDir = path.join(__dirname, '../src/sass');
  const structure = {};
  
  try {
    const tokensDir = path.join(sassDir, 'tokens');
    if (await fs.stat(tokensDir).catch(() => false)) {
      const tokenFiles = await fs.readdir(tokensDir);
      structure.tokens = tokenFiles.filter(f => f.endsWith('.scss'));
    }
    
    const componentsDir = path.join(sassDir, 'components');
    if (await fs.stat(componentsDir).catch(() => false)) {
      const componentFiles = await fs.readdir(componentsDir);
      structure.components = componentFiles.filter(f => f.endsWith('.scss'));
    }
  } catch (error) {
    // SASS structure not found, that's okay
  }
  
  return structure;
}

function generateHTML(packageJson, components, sassInfo) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${packageJson.name} Documentation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 2px solid #e0e0e0;
        }
        .header h1 {
            color: #2d3748;
            margin-bottom: 0.5rem;
            font-size: 2.5rem;
        }
        .badge {
            display: inline-block;
            background: #3182ce;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
            margin-left: 0.5rem;
        }
        .section {
            margin: 2rem 0;
            padding: 1.5rem;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            background: #f7fafc;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-top: 1.5rem;
        }
        .card {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .card h3 {
            margin-top: 0;
            margin-bottom: 0.5rem;
            color: #2d3748;
        }
        .card a {
            color: #3182ce;
            text-decoration: none;
            font-weight: 500;
        }
        .card a:hover {
            text-decoration: underline;
        }
        .stats {
            display: flex;
            gap: 2rem;
            margin: 1rem 0;
            flex-wrap: wrap;
        }
        .stat {
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            text-align: center;
        }
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #3182ce;
        }
        .stat-label {
            color: #718096;
            font-size: 0.875rem;
        }
        .code {
            background: #2d3748;
            color: #e2e8f0;
            padding: 1rem;
            border-radius: 6px;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.875rem;
            margin: 1rem 0;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${packageJson.name}<span class="badge">v${packageJson.version}</span></h1>
        <p>${packageJson.description}</p>
        <div class="stats">
            <div class="stat">
                <div class="stat-number">${components.length}</div>
                <div class="stat-label">Components</div>
            </div>
            <div class="stat">
                <div class="stat-number">${Object.keys(sassInfo).length}</div>
                <div class="stat-label">SASS Modules</div>
            </div>
            <div class="stat">
                <div class="stat-number">0</div>
                <div class="stat-label">Dependencies</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>📦 Installation</h2>
        <div class="code">npm install ${packageJson.name}</div>
    </div>

    ${components.length > 0 ? `
    <div class="section">
        <h2>🧩 Components</h2>
        <div class="grid">
            ${components.map(component => `
                <div class="card">
                    <h3><a href="${component.name.toLowerCase()}.html">${component.name}</a></h3>
                    <p>
                        ${component.types ? `${component.types.interfaces.length} interfaces, ` : ''}
                        ${component.styles ? `${component.styles.variants.length} style variants` : 'Basic styling'}
                    </p>
                </div>
            `).join('')}
        </div>
    </div>
    ` : ''}

    ${Object.keys(sassInfo).length > 0 ? `
    <div class="section">
        <h2>🎨 SASS Architecture</h2>
        <div class="grid">
            ${sassInfo.tokens ? `
                <div class="card">
                    <h3>Design Tokens</h3>
                    <p>${sassInfo.tokens.length} token files: ${sassInfo.tokens.join(', ')}</p>
                </div>
            ` : ''}
            ${sassInfo.components ? `
                <div class="card">
                    <h3>Component Styles</h3>
                    <p>${sassInfo.components.length} component stylesheets</p>
                </div>
            ` : ''}
        </div>
    </div>
    ` : ''}

    <div class="section">
        <h2>🚀 Quick Start</h2>
        <div class="code">import { ${components.length > 0 ? components[0].name : 'Component'} } from '${packageJson.name}';

// Use the component
const MyApp = () => {
  return &lt;${components.length > 0 ? components[0].name : 'Component'} /&gt;;
};</div>
    </div>

    <div style="text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e2e8f0; color: #718096;">
        <p>Generated automatically from source code • ${new Date().toLocaleDateString()}</p>
    </div>
</body>
</html>`;
}

function generateComponentPage(component, packageJson) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${component.name} - ${packageJson.name}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
            color: #333;
        }
        .header {
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e2e8f0;
        }
        .nav {
            margin-bottom: 1rem;
        }
        .nav a {
            color: #3182ce;
            text-decoration: none;
        }
        .section {
            margin: 2rem 0;
            padding: 1.5rem;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            background: #f7fafc;
        }
        .prop-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
        }
        .prop-table th,
        .prop-table td {
            border: 1px solid #e2e8f0;
            padding: 0.75rem;
            text-align: left;
        }
        .prop-table th {
            background: #edf2f7;
            font-weight: 600;
        }
        .code {
            background: #2d3748;
            color: #e2e8f0;
            padding: 1rem;
            border-radius: 6px;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.875rem;
            margin: 1rem 0;
        }
        .type {
            background: #e6fffa;
            color: #234e52;
            padding: 0.125rem 0.5rem;
            border-radius: 4px;
            font-family: monospace;
            font-size: 0.875rem;
        }
        .optional {
            color: #718096;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="nav">
        <a href="index.html">← Back to Documentation</a>
    </div>

    <div class="header">
        <h1>${component.name}</h1>
    </div>

    ${component.types && component.types.interfaces.length > 0 ? `
    <div class="section">
        <h2>📝 Props</h2>
        ${component.types.interfaces.map(interface => `
            <h3>${interface.name}</h3>
            ${interface.properties.length > 0 ? `
                <table class="prop-table">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Required</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${interface.properties.map(prop => `
                            <tr>
                                <td><code>${prop.name}</code></td>
                                <td><span class="type">${prop.type}</span></td>
                                <td>${prop.optional ? '<span class="optional">Optional</span>' : '<strong>Required</strong>'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            ` : '<p>No properties defined.</p>'}
        `).join('')}
    </div>
    ` : ''}

    ${component.styles && component.styles.variants.length > 0 ? `
    <div class="section">
        <h2>🎨 Style Variants</h2>
        <p>This component has ${component.styles.variants.length} style variant(s):</p>
        <ul>
            ${component.styles.variants.map(variant => `<li><code>${variant.name}</code></li>`).join('')}
        </ul>
    </div>
    ` : ''}

    ${component.core && component.core.functions.length > 0 ? `
    <div class="section">
        <h2>⚙️ Core Functions</h2>
        <p>Available utility functions:</p>
        <ul>
            ${component.core.functions.map(func => `<li><code>${func}()</code></li>`).join('')}
        </ul>
    </div>
    ` : ''}

    <div class="section">
        <h2>💻 Usage</h2>
        <div class="code">import { ${component.name} } from '${packageJson.name}';

const MyComponent = () => {
  return (
    &lt;${component.name}
      // Add your props here
    &gt;
      Content
    &lt;/${component.name}&gt;
  );
};</div>
    </div>
</body>
</html>`;
}

if (require.main === module) {
  generateDocs().catch(console.error);
}

module.exports = { generateDocs };