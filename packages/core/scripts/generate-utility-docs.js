const fs = require("fs").promises;
const path = require("path");
const sass = require("sass");

/**
 * Generates comprehensive documentation for all mild-ui utility classes
 */
async function generateUtilityDocs() {
  try {
    console.log("📚 Generating comprehensive utility class documentation...");

    // Read design tokens to understand what utilities are generated
    const tokensPath = path.join(__dirname, "../dist/tokens.json");
    const tokensData = await fs.readFile(tokensPath, "utf-8");
    const tokens = JSON.parse(tokensData);

    // Compile the utilities CSS to extract actual classes
    console.log("🔍 Analyzing generated CSS utilities...");
    const utilitiesResult = sass.compile(path.join(__dirname, "../src/sass/mild-utilities.scss"), {
      style: "expanded",
      loadPaths: [path.join(__dirname, "../src/sass")],
    });

    // Parse the generated CSS to extract class names and their properties
    const utilityClasses = parseCSSForUtilities(utilitiesResult.css);
    
    // Organize utilities by category based on our SASS structure
    const organizedUtilities = organizeUtilitiesByCategory(utilityClasses, tokens);
    
    // Generate HTML documentation
    const docsHtml = generateUtilityDocsHTML(organizedUtilities, tokens);
    
    // Ensure docs directory exists
    await fs.mkdir(path.join(__dirname, "../docs"), { recursive: true });
    
    // Write the utility documentation as the main index
    await fs.writeFile(path.join(__dirname, "../docs/index.html"), docsHtml);
    console.log("✅ Generated index.html (utilities as main page)");
    
    // Also create utilities.html for backward compatibility
    await fs.writeFile(path.join(__dirname, "../docs/utilities.html"), docsHtml);
    console.log("✅ Generated utilities.html (backup)");

    // Generate JSON API for programmatic access
    const utilityAPI = generateUtilityAPI(organizedUtilities, tokens);
    await fs.writeFile(path.join(__dirname, "../docs/utilities.json"), JSON.stringify(utilityAPI, null, 2));
    console.log("✅ Generated utilities.json API");

    // Generate markdown documentation
    const markdownDocs = generateMarkdownDocs(organizedUtilities, tokens);
    await fs.writeFile(path.join(__dirname, "../docs/UTILITIES.md"), markdownDocs);
    console.log("✅ Generated UTILITIES.md");

    console.log("🎉 Utility documentation generation completed!");
    
    const totalDocumented = Object.values(organizedUtilities).reduce((sum, category) => sum + category.utilities.length, 0);
    console.log(`📊 Documented ${totalDocumented} utility classes`);
    
  } catch (error) {
    console.error("❌ Utility documentation generation failed:", error);
    process.exit(1);
  }
}

/**
 * Parse CSS content to extract utility classes and their properties
 */
function parseCSSForUtilities(css) {
  const utilities = {};
  
  // Remove comments and normalize CSS
  const cleanCSS = css.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // Match CSS rules: .class-name { properties }
  // Use a more robust regex that handles multi-line CSS
  const ruleRegex = /\.(mild-[a-zA-Z0-9_-]+)\s*\{([^}]+)\}/g;
  let match;
  
  while ((match = ruleRegex.exec(cleanCSS)) !== null) {
    const className = match[1];
    const properties = match[2].trim();
    
    // Parse individual properties
    const props = {};
    const propRegex = /([a-zA-Z-]+)\s*:\s*([^;]+);?/g;
    let propMatch;
    
    while ((propMatch = propRegex.exec(properties)) !== null) {
      const property = propMatch[1].trim();
      const value = propMatch[2].trim();
      props[property] = value;
    }
    
    // Only include utilities with actual CSS properties
    if (Object.keys(props).length > 0) {
      utilities[className] = {
        className,
        properties: props,
        cssRule: properties
      };
    }
  }
  
  console.log(`🔍 Found ${Object.keys(utilities).length} utility classes`);
  return utilities;
}

/**
 * Organize utilities by category based on their names and properties
 */
function organizeUtilitiesByCategory(utilities, tokens) {
  const categories = {
    layout: {
      name: "Layout",
      description: "Display, position, and layout utilities",
      utilities: []
    },
    spacing: {
      name: "Spacing", 
      description: "Margin, padding, and gap utilities",
      utilities: []
    },
    typography: {
      name: "Typography",
      description: "Font size, weight, and text utilities", 
      utilities: []
    },
    colors: {
      name: "Colors",
      description: "Text, background, and border color utilities",
      utilities: []
    },
    borders: {
      name: "Borders & Radius",
      description: "Border and border radius utilities",
      utilities: []
    },
    effects: {
      name: "Effects",
      description: "Shadow, opacity, and visual effect utilities",
      utilities: []
    },
    interactivity: {
      name: "Interactivity", 
      description: "Cursor, pointer events, and interaction utilities",
      utilities: []
    },
    transforms: {
      name: "Transforms & Transitions",
      description: "Transform, scale, rotate, and transition utilities",
      utilities: []
    }
  };

  // Categorize each utility class
  Object.values(utilities).forEach(utility => {
    const className = utility.className;
    
    if (className.match(/mild-(block|inline|flex|grid|hidden|relative|absolute|fixed|static|sticky|visible|invisible)/)) {
      categories.layout.utilities.push(utility);
    } else if (className.match(/mild-(m|p|gap|space)-/)) {
      categories.spacing.utilities.push(utility);
    } else if (className.match(/mild-(text|font|leading|tracking|uppercase|lowercase|capitalize|underline|line-through)/)) {
      categories.typography.utilities.push(utility);
    } else if (className.match(/mild-(text|bg|border)-[a-z]/)) {
      categories.colors.utilities.push(utility);
    } else if (className.match(/mild-(border|radius)/)) {
      categories.borders.utilities.push(utility);
    } else if (className.match(/mild-(shadow|opacity|ring)/)) {
      categories.effects.utilities.push(utility);
    } else if (className.match(/mild-(cursor|pointer|select)/)) {
      categories.interactivity.utilities.push(utility);
    } else if (className.match(/mild-(transform|scale|rotate|transition)/)) {
      categories.transforms.utilities.push(utility);
    } else {
      // Add to layout as default
      categories.layout.utilities.push(utility);
    }
  });

  return categories;
}

/**
 * Generate HTML documentation for utilities
 */
function generateUtilityDocsHTML(organizedUtilities, tokens) {
  const totalUtilities = Object.values(organizedUtilities).reduce((sum, cat) => sum + cat.utilities.length, 0);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mild UI Utilities Documentation</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8fafc;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        .header {
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .header h1 {
            color: #1e293b;
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        .stats {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-top: 1.5rem;
            flex-wrap: wrap;
        }
        .stat {
            text-align: center;
        }
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #3b82f6;
        }
        .stat-label {
            color: #64748b;
            font-size: 0.875rem;
        }
        .nav {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            position: sticky;
            top: 1rem;
            z-index: 10;
        }
        .nav h3 {
            margin-bottom: 1rem;
            color: #1e293b;
        }
        .nav-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 0.5rem;
        }
        .nav-link {
            color: #3b82f6;
            text-decoration: none;
            padding: 0.5rem;
            border-radius: 6px;
            transition: background-color 0.2s;
        }
        .nav-link:hover {
            background-color: #f1f5f9;
        }
        .category {
            background: white;
            border-radius: 12px;
            margin-bottom: 2rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .category-header {
            background: #f8fafc;
            padding: 1.5rem;
            border-bottom: 1px solid #e2e8f0;
        }
        .category-title {
            color: #1e293b;
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        .category-description {
            color: #64748b;
        }
        .utility-grid {
            display: grid;
            gap: 1px;
            background: #e2e8f0;
        }
        .utility-item {
            background: white;
            padding: 1rem;
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 1rem;
            align-items: start;
        }
        .utility-name {
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.875rem;
            background: #f1f5f9;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            color: #1e293b;
            font-weight: 500;
        }
        .utility-props {
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.75rem;
            color: #64748b;
            background: #f8fafc;
            padding: 0.5rem;
            border-radius: 4px;
            border-left: 3px solid #3b82f6;
        }
        .search-box {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 1rem;
            margin-bottom: 1rem;
        }
        .search-box:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .filter-buttons {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }
        .filter-btn {
            padding: 0.5rem 1rem;
            border: 1px solid #d1d5db;
            background: white;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .filter-btn.active {
            background: #3b82f6;
            color: white;
            border-color: #3b82f6;
        }
        .hidden { display: none !important; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Mild UI Utilities</h1>
            <p>Comprehensive utility class reference for the mild-ui design system</p>
            <div style="margin-top: 1rem;">
                <a href="overview.html" style="color: #3b82f6; text-decoration: none; margin-right: 1rem;">📖 Package Overview</a>
                <a href="#" style="color: #64748b; margin-right: 1rem;">🎨 Utilities (Current)</a>
                <a href="UTILITIES.md" style="color: #3b82f6; text-decoration: none;">📝 Markdown Docs</a>
            </div>
            <div class="stats">
                <div class="stat">
                    <div class="stat-number">${totalUtilities}</div>
                    <div class="stat-label">Total Utilities</div>
                </div>
                <div class="stat">
                    <div class="stat-number">${Object.keys(organizedUtilities).length}</div>
                    <div class="stat-label">Categories</div>
                </div>
                <div class="stat">
                    <div class="stat-number">${Object.keys(tokens.colors).length}</div>
                    <div class="stat-label">Color Palettes</div>
                </div>
                <div class="stat">
                    <div class="stat-number">${Object.keys(tokens.spacing).length}</div>
                    <div class="stat-label">Spacing Values</div>
                </div>
            </div>
        </div>

        <div class="nav">
            <h3>Quick Navigation</h3>
            <div class="nav-grid">
                ${Object.entries(organizedUtilities).map(([key, category]) => 
                    `<a href="#${key}" class="nav-link">${category.name} (${category.utilities.length})</a>`
                ).join('')}
            </div>
        </div>

        <div style="background: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <input type="text" id="searchBox" class="search-box" placeholder="Search utilities (e.g., 'padding', 'text-blue', 'flex')...">
            <div class="filter-buttons">
                <button class="filter-btn active" data-category="all">All Utilities</button>
                ${Object.entries(organizedUtilities).map(([key, category]) => 
                    `<button class="filter-btn" data-category="${key}">${category.name}</button>`
                ).join('')}
            </div>
        </div>

        <div id="utilitiesContainer">
            ${Object.entries(organizedUtilities).map(([categoryKey, category]) => `
                <div class="category" id="${categoryKey}" data-category="${categoryKey}">
                    <div class="category-header">
                        <h2 class="category-title">${category.name}</h2>
                        <p class="category-description">${category.description} (${category.utilities.length} utilities)</p>
                    </div>
                    <div class="utility-grid">
                        ${category.utilities.map(utility => `
                            <div class="utility-item" data-class="${utility.className}">
                                <div class="utility-name">.${utility.className}</div>
                                <div class="utility-props">${formatCSSProperties(utility.properties)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    </div>

    <script>
        // Search functionality
        const searchBox = document.getElementById('searchBox');
        const utilityItems = document.querySelectorAll('.utility-item');
        const categories = document.querySelectorAll('.category');
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        let currentFilter = 'all';
        
        function filterUtilities() {
            const searchTerm = searchBox.value.toLowerCase();
            
            utilityItems.forEach(item => {
                const className = item.dataset.class.toLowerCase();
                const category = item.closest('.category').dataset.category;
                
                const matchesSearch = className.includes(searchTerm);
                const matchesFilter = currentFilter === 'all' || category === currentFilter;
                
                item.style.display = (matchesSearch && matchesFilter) ? 'grid' : 'none';
            });
            
            // Hide empty categories
            categories.forEach(category => {
                const visibleItems = category.querySelectorAll('.utility-item[style*="grid"]');
                const hasVisibleItems = visibleItems.length > 0;
                const matchesFilter = currentFilter === 'all' || category.dataset.category === currentFilter;
                
                category.style.display = (hasVisibleItems && matchesFilter) ? 'block' : 'none';
            });
        }
        
        searchBox.addEventListener('input', filterUtilities);
        
        // Filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.category;
                filterUtilities();
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    </script>
</body>
</html>`;
}

/**
 * Format CSS properties for display
 */
function formatCSSProperties(properties) {
  return Object.entries(properties)
    .map(([prop, value]) => `${prop}: ${value}`)
    .join('\n');
}

/**
 * Generate JSON API for programmatic access
 */
function generateUtilityAPI(organizedUtilities, tokens) {
  return {
    version: require('../package.json').version,
    generatedAt: new Date().toISOString(),
    totalUtilities: Object.values(organizedUtilities).reduce((sum, cat) => sum + cat.utilities.length, 0),
    categories: organizedUtilities,
    tokens: tokens
  };
}

/**
 * Generate Markdown documentation
 */
function generateMarkdownDocs(organizedUtilities, tokens) {
  const totalUtilities = Object.values(organizedUtilities).reduce((sum, cat) => sum + cat.utilities.length, 0);
  
  let markdown = `# Mild UI Utilities Reference

Complete reference for all ${totalUtilities} utility classes in the mild-ui design system.

## Overview

Mild UI provides a comprehensive set of utility classes with the \`mild-\` prefix to avoid conflicts with other CSS frameworks like Tailwind CSS. All utilities are generated from design tokens to ensure consistency.

## Quick Stats

- **${totalUtilities}** total utility classes
- **${Object.keys(organizedUtilities).length}** utility categories  
- **${Object.keys(tokens.colors).length}** color palettes
- **${Object.keys(tokens.spacing).length}** spacing values
- **Dark mode support** with automatic theme switching
- **Zero conflicts** with Tailwind CSS or other frameworks

## Categories

${Object.entries(organizedUtilities).map(([key, category]) => 
  `- [${category.name}](#${key.toLowerCase()}) (${category.utilities.length} utilities)`
).join('\n')}

---

`;

  // Add each category
  Object.entries(organizedUtilities).forEach(([categoryKey, category]) => {
    markdown += `## ${category.name}

${category.description}

| Class | CSS Properties |
|-------|----------------|
`;
    
    category.utilities.forEach(utility => {
      const props = Object.entries(utility.properties)
        .map(([prop, value]) => `${prop}: ${value}`)
        .join('; ');
      markdown += `| \`.${utility.className}\` | \`${props}\` |\n`;
    });
    
    markdown += '\n';
  });

  // Add design tokens section
  markdown += `## Design Tokens

### Color Palettes
${Object.entries(tokens.colors).map(([name, palette]) => {
  if (typeof palette === 'object') {
    return `- **${name}**: ${Object.keys(palette).join(', ')}`;
  }
  return `- **${name}**: ${palette}`;
}).join('\n')}

### Spacing Scale
${Object.entries(tokens.spacing).map(([key, value]) => `- **${key}**: ${value}`).join('\n')}

### Typography Scale  
${Object.entries(tokens.fontSize).map(([key, value]) => `- **${key}**: ${value}`).join('\n')}

---

*Generated automatically from source code • ${new Date().toLocaleDateString()}*
`;

  return markdown;
}

module.exports = { generateUtilityDocs };

if (require.main === module) {
  generateUtilityDocs();
}