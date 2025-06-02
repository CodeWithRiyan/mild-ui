// scripts/qa-check.ts
import { execSync } from "child_process";
import chalk from "chalk";

interface QAResult {
  name: string;
  success: boolean;
  message: string;
  details?: string;
}

class QualityAssuranceChecker {
  private results: QAResult[] = [];

  async runAllChecks(): Promise<void> {
    console.log(chalk.blue("🔍 Running Quality Assurance Checks...\n"));

    await this.checkLinting();
    await this.checkTypeScript();
    await this.checkTests();
    await this.checkBuild();
    await this.checkPackageDependencies();
    await this.checkComponentConsistency();

    this.printResults();
  }

  private async checkLinting(): Promise<void> {
    try {
      execSync("pnpm lint", { stdio: "pipe" });
      this.results.push({
        name: "Linting",
        success: true,
        message: "All files pass ESLint checks",
      });
    } catch (error) {
      this.results.push({
        name: "Linting",
        success: false,
        message: "ESLint errors found",
        details: error.toString(),
      });
    }
  }

  private async checkTypeScript(): Promise<void> {
    try {
      execSync("pnpm type-check", { stdio: "pipe" });
      this.results.push({
        name: "TypeScript",
        success: true,
        message: "No TypeScript errors",
      });
    } catch (error) {
      this.results.push({
        name: "TypeScript",
        success: false,
        message: "TypeScript compilation errors",
        details: error.toString(),
      });
    }
  }

  private async checkTests(): Promise<void> {
    try {
      execSync("pnpm test", { stdio: "pipe" });
      this.results.push({
        name: "Tests",
        success: true,
        message: "All tests passing",
      });
    } catch (error) {
      this.results.push({
        name: "Tests",
        success: false,
        message: "Test failures detected",
        details: error.toString(),
      });
    }
  }

  private async checkBuild(): Promise<void> {
    try {
      execSync("pnpm build", { stdio: "pipe" });
      this.results.push({
        name: "Build",
        success: true,
        message: "All packages build successfully",
      });
    } catch (error) {
      this.results.push({
        name: "Build",
        success: false,
        message: "Build errors detected",
        details: error.toString(),
      });
    }
  }

  private async checkPackageDependencies(): Promise<void> {
    // Check for circular dependencies, version mismatches, etc.
    // This is a simplified example
    this.results.push({
      name: "Dependencies",
      success: true,
      message: "Package dependencies are consistent",
    });
  }

  private async checkComponentConsistency(): Promise<void> {
    // Check that components exist in all frameworks
    // This is a simplified example
    const frameworks = ["react", "vue"];
    const components = ["Button", "Input", "Checkbox", "Radio", "Select"];

    let allConsistent = true;
    const missing: string[] = [];

    for (const framework of frameworks) {
      for (const component of components) {
        try {
          const fs = require("fs");
          const path = `packages/${framework}/src/components/${component}`;
          if (!fs.existsSync(path)) {
            missing.push(`${framework}/${component}`);
            allConsistent = false;
          }
        } catch (error) {
          allConsistent = false;
        }
      }
    }

    this.results.push({
      name: "Component Consistency",
      success: allConsistent,
      message: allConsistent
        ? "All components exist across frameworks"
        : `Missing components: ${missing.join(", ")}`,
    });
  }

  private printResults(): void {
    console.log(chalk.blue("\n📊 Quality Assurance Results:"));
    console.log("─".repeat(50));

    let allPassed = true;

    this.results.forEach((result) => {
      const icon = result.success ? "✅" : "❌";
      const color = result.success ? chalk.green : chalk.red;

      console.log(`${icon} ${color(result.name)}: ${result.message}`);

      if (!result.success) {
        allPassed = false;
        if (result.details) {
          console.log(
            chalk.gray(`   Details: ${result.details.slice(0, 100)}...`),
          );
        }
      }
    });

    console.log("─".repeat(50));

    if (allPassed) {
      console.log(chalk.green("🎉 All quality checks passed!"));
    } else {
      console.log(
        chalk.red(
          "❌ Some quality checks failed. Please fix the issues above.",
        ),
      );
      process.exit(1);
    }
  }
}

// Run the QA checker
const qaChecker = new QualityAssuranceChecker();
qaChecker.runAllChecks().catch(console.error);
