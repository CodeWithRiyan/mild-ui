import { ComponentFile, FrameworkComponent } from "./component-reader";

export interface ProcessorOptions {
  projectName?: string;
  customImportPaths?: Record<string, string>;
  removeDevDependencies?: boolean;
}

/**
 * Processes component files to adapt them for user's project
 */
export function processComponentFiles(
  component: FrameworkComponent,
  options: ProcessorOptions = {},
): ComponentFile[] {
  return component.files.map((file) => ({
    ...file,
    content: processFileContent(file.content, component.name, options),
  }));
}

/**
 * Process individual file content
 */
function processFileContent(
  content: string,
  componentName: string,
  options: ProcessorOptions,
): string {
  let processedContent = content;

  // Replace imports from the core package to use relative paths
  processedContent = processedContent.replace(
    /from ['"]@mild-ui\/core['"];?/g,
    "from '../core';",
  );

  // Replace imports between components to use relative paths
  processedContent = processedContent.replace(
    /from ['"]@mild-ui\/(react|vue)['"];?/g,
    "from '../$1';",
  );

  // Replace lucide imports based on framework
  if (content.includes("lucide-react")) {
    processedContent = processedContent.replace(
      /from ['"]lucide-react['"];?/g,
      "from 'lucide-react';",
    );
  } else if (content.includes("lucide-vue-next")) {
    processedContent = processedContent.replace(
      /from ['"]lucide-vue-next['"];?/g,
      "from 'lucide-vue-next';",
    );
  }

  // Apply custom import path replacements
  if (options.customImportPaths) {
    Object.entries(options.customImportPaths).forEach(([from, to]) => {
      const regex = new RegExp(`from ['"]${from}['"];?`, "g");
      processedContent = processedContent.replace(regex, `from '${to}';`);
    });
  }

  // Remove development-only code if specified
  if (options.removeDevDependencies) {
    // Remove storybook-related imports and exports
    processedContent = processedContent.replace(
      /\/\* storybook[\s\S]*?\*\//g,
      "",
    );
  }

  return processedContent;
}

/**
 * Transform a component from one framework to another
 */
export async function transformComponent(
  sourceComponent: FrameworkComponent,
  targetFramework: "react" | "vue",
): Promise<FrameworkComponent> {
  // This is a complex transformation that would require:
  // 1. Parse the source component
  // 2. Extract the component logic
  // 3. Apply framework-specific transformations
  // 4. Generate the target framework component

  // For now, we'll implement a simple approach that reads the target component
  // and applies the same processing as the add command
  const { readComponentFromFramework } = await import("./component-reader");
  return readComponentFromFramework(sourceComponent.name, targetFramework);
}
