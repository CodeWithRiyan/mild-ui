import chalk from "chalk";
import { getAvailableComponents } from "../utils/component-reader";

export async function listCommand(): Promise<void> {
  try {
    console.log(chalk.blue("Available components:\n"));

    const frameworks: Array<"react" | "vue" | "svelte"> = [
      "react",
      "vue",
      "svelte",
    ];

    for (const framework of frameworks) {
      console.log(chalk.yellow(`${framework.toUpperCase()}:`));

      try {
        const components = await getAvailableComponents(framework);
        if (components.length > 0) {
          components.forEach((component) => {
            console.log(`  ✓ ${component}`);
          });
        } else {
          console.log(`  No components available`);
        }
      } catch (error: any) {
        console.log(`  Error reading components: ${error.message}`);
      }

      console.log();
    }
  } catch (error: any) {
    console.error(chalk.red(`Error listing components: ${error.message}`));
    process.exit(1);
  }
}
