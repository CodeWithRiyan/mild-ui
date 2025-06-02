// packages/cli/src/utils/project.ts
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

interface ProjectInfo {
  framework: string;
  typescript: boolean;
  componentsDir: string;
  stylesDir: string;
}

export async function getProjectInfo(): Promise<ProjectInfo> {
  const cwd = process.cwd();

  // Try to read mild-ui.json if it exists
  try {
    const configPath = path.join(cwd, "mild-ui.json");
    if (await fs.pathExists(configPath)) {
      const configContent = await fs.readFile(configPath, "utf-8");
      const config = JSON.parse(configContent);

      // Make sure we have a stylesDir property, defaulting to src/styles if not present
      if (!config.stylesDir) {
        config.stylesDir = "src/styles";
        // Update the config file with the stylesDir property
        await fs.writeFile(configPath, JSON.stringify(config, null, 2));
        console.warn(
          chalk.yellow("Added missing stylesDir property to mild-ui.json."),
        );
      }

      return config;
    }
  } catch (error) {
    console.warn(
      chalk.yellow("Could not read mild-ui.json. Using default settings."),
    );
  }

  // Try to detect project type
  let framework = "react"; // Default
  let typescript = true;
  let componentsDir = "src/components";
  let stylesDir = "src/styles";

  // Check for package.json
  try {
    const packagePath = path.join(cwd, "package.json");
    if (await fs.pathExists(packagePath)) {
      const packageJson = JSON.parse(await fs.readFile(packagePath, "utf-8"));

      // Check dependencies for framework
      const deps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      if (deps.vue) framework = "vue";

      // Check if project uses TypeScript
      typescript = !!deps.typescript;
    }
  } catch (error) {
    console.warn(
      chalk.yellow("Could not detect project type. Using default settings."),
    );
  }

  return { framework, typescript, componentsDir, stylesDir };
}
