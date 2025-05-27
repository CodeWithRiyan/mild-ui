import fs from "fs-extra";
import path from "path";
import { getTemplateForComponent } from "../templates";

interface GenerateOptions {
  component: string;
  framework: string;
  outputDir: string;
  theme?: string;
  typescript: boolean;
}

export async function generateComponent(
  options: GenerateOptions,
): Promise<void> {
  const { component, framework, outputDir, typescript } = options;

  // Get templates for the component
  const templates = getTemplateForComponent(component, framework, typescript);

  // Create component directory
  const componentDir = path.join(
    outputDir,
    component.charAt(0).toUpperCase() + component.slice(1),
  );
  await fs.ensureDir(componentDir);

  // Write files
  for (const [filename, content] of Object.entries(templates)) {
    await fs.writeFile(
      path.join(componentDir, filename),
      content as "string | ArrayBufferView<ArrayBufferLike>",
    );
  }

  // Create/update index.ts to export the component
  const indexPath = path.join(outputDir, "index.ts");
  let indexContent = "";

  if (await fs.pathExists(indexPath)) {
    indexContent = await fs.readFile(indexPath, "utf-8");
  }

  const componentName = component.charAt(0).toUpperCase() + component.slice(1);
  const exportLine = `export * from './${componentName}';\n`;

  if (!indexContent.includes(exportLine)) {
    await fs.writeFile(indexPath, indexContent + exportLine);
  }
}
