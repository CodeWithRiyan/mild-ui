// packages/cli/src/commands/init.ts
import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import {
  generateCssVariables,
  generateButtonStyles,
} from "../templates/styles";
import ora from "ora";

export async function initProject(): Promise<void> {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Select your framework:",
      choices: ["react", "vue", "svelte"],
      default: "react",
    },
    {
      type: "confirm",
      name: "typescript",
      message: "Use TypeScript?",
      default: true,
    },
    {
      type: "input",
      name: "componentsDir",
      message: "Where would you like to store your components?",
      default: (answers: { framework: any }) => {
        switch (answers.framework) {
          case "react":
            return "src/components";
          case "vue":
            return "src/components";
          case "svelte":
            return "src/lib/components";
          default:
            return "src/components";
        }
      },
    },
    {
      type: "input",
      name: "stylesDir",
      message: "Where would you like to store your styles?",
      default: "src/styles",
    },
  ]);

  const spinner = ora("Initializing mild-ui...").start();

  try {
    // Create components directory
    await fs.ensureDir(answers.componentsDir);

    // Create styles directory
    const stylesDir = path.join(process.cwd(), answers.stylesDir);
    await fs.ensureDir(stylesDir);

    // Create base CSS file with variables
    const cssVariablesContent = generateCssVariables();
    await fs.writeFile(
      path.join(stylesDir, "mild-ui-variables.css"),
      cssVariablesContent,
    );

    // Create component styles
    const buttonStylesContent = generateButtonStyles();
    await fs.writeFile(
      path.join(stylesDir, "mild-ui-button.css"),
      buttonStylesContent,
    );

    // Create config file
    const configContent = {
      framework: answers.framework,
      typescript: answers.typescript,
      componentsDir: answers.componentsDir,
      stylesDir: answers.stylesDir,
      theme: "default",
    };

    await fs.writeFile(
      path.join(process.cwd(), "mild-ui.json"),
      JSON.stringify(configContent, null, 2),
    );

    spinner.succeed("mild-ui initialized successfully!");

    console.log();
    console.log(chalk.bold("Next steps:"));
    console.log(`1. Import the styles in your main CSS file:`);
    console.log(
      chalk.cyan(
        `   @import '${path.relative("src", answers.stylesDir)}/mild-ui-variables.css';`,
      ),
    );
    console.log(
      chalk.cyan(
        `   @import '${path.relative("src", answers.stylesDir)}/mild-ui-button.css';`,
      ),
    );
    console.log(
      `2. Start adding components with: ${chalk.cyan(`mild-ui add button`)}`,
    );
  } catch (error) {
    spinner.fail("Initialization failed");
    throw error;
  }
}
