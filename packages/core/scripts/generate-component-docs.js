// packages/core/scripts/generate-component-docs.js
const fs = require("fs").promises;
const path = require("path");

/**
 * Simple component documentation generator
 * Reads your component types and generates basic prop tables
 */
async function generateComponentDocs() {
  console.log("📝 Generating component documentation...");

  try {
    // Ensure docs directory exists
    await fs.mkdir("docs/generated", { recursive: true });

    const componentsDir = "src/components";

    // Check if components directory exists
    const componentsExists = await fs
      .access(componentsDir)
      .then(() => true)
      .catch(() => false);

    if (!componentsExists) {
      console.warn("Components directory not found, creating placeholder docs");
      await createPlaceholderDocs();
      return;
    }

    const components = await fs.readdir(componentsDir);

    let markdown = `# Component API Reference

Auto-generated from TypeScript component definitions.

`;

    for (const component of components) {
      const componentPath = path.join(componentsDir, component);
      const stat = await fs.stat(componentPath);

      if (stat.isDirectory()) {
        const componentInfo = await extractBasicComponentInfo(
          componentPath,
          component,
        );
        if (componentInfo) {
          markdown += generateComponentSection(component, componentInfo);
        }
      }
    }

    markdown += `---

*Last updated: ${new Date().toISOString()}*  
*Generated automatically from TypeScript source files*
`;

    // Write markdown file
    await fs.writeFile("docs/generated/component-api.md", markdown);

    console.log("✅ Component documentation generated");
  } catch (error) {
    console.warn("⚠️ Could not generate component docs:", error.message);
    await createPlaceholderDocs();
  }
}

async function createPlaceholderDocs() {
  await fs.mkdir("docs/generated", { recursive: true });
  await fs.writeFile(
    "docs/generated/component-api.md",
    `# Component API

Component documentation will be generated after components are built.

## Available Components

Components will appear here automatically once they are created.
`,
  );
}

async function extractBasicComponentInfo(componentPath, componentName) {
  const typesFile = path.join(componentPath, `${componentName}.types.ts`);

  try {
    const content = await fs.readFile(typesFile, "utf-8");

    // Simple regex-based extraction for your code structure
    const props = [];
    const typeAliases = [];

    // Extract interface props
    const interfaceRegex = new RegExp(
      `export interface ${componentName}CoreProps[^{]*{([^}]*)}`,
      "gs",
    );
    const interfaceMatch = content.match(interfaceRegex);

    if (interfaceMatch) {
      const propsSection = interfaceMatch[0].match(/{([^}]*)}/s);

      if (propsSection) {
        const propsText = propsSection[1];
        const propLines = propsText.split("\n").filter((line) => {
          const trimmed = line.trim();
          return (
            trimmed &&
            !trimmed.startsWith("//") &&
            !trimmed.startsWith("/*") &&
            !trimmed.startsWith("*") &&
            trimmed !== "{" &&
            trimmed !== "}"
          );
        });

        propLines.forEach((line) => {
          const propMatch = line.match(/^\s*(\w+)(\?)?\s*:\s*([^;]+);?\s*$/);
          if (propMatch) {
            const [, name, optional, type] = propMatch;

            props.push({
              name: name.trim(),
              type: type.trim(),
              optional: !!optional,
            });
          }
        });
      }
    }

    // Extract type aliases
    const typeRegex = new RegExp(
      `export type ${componentName}\\w* = ([^;]+);`,
      "g",
    );
    let typeMatch;

    while ((typeMatch = typeRegex.exec(content)) !== null) {
      const typeName = typeMatch[0].match(/export type (\w+)/)[1];
      typeAliases.push({
        name: typeName,
        definition: typeMatch[1].trim(),
      });
    }

    return { props, typeAliases };
  } catch (error) {
    console.warn(`Could not parse ${typesFile}:`, error.message);
    return null;
  }
}

function generateComponentSection(componentName, info) {
  let section = `## ${componentName}\n\n`;

  if (info.props && info.props.length > 0) {
    section += `### Props\n\n`;
    section += `| Name | Type | Required | Description |\n`;
    section += `|------|------|----------|-------------|\n`;

    info.props.forEach((prop) => {
      const required = prop.optional ? "No" : "Yes";
      section += `| ${prop.name} | \`${prop.type}\` | ${required} | - |\n`;
    });

    section += "\n";
  }

  if (info.typeAliases && info.typeAliases.length > 0) {
    section += `### Types\n\n`;
    info.typeAliases.forEach((type) => {
      section += `#### ${type.name}\n\n`;
      section += `\`\`\`typescript\n${type.definition}\n\`\`\`\n\n`;
    });
  }

  return section;
}

if (require.main === module) {
  generateComponentDocs().catch(console.error);
}

module.exports = { generateComponentDocs };
