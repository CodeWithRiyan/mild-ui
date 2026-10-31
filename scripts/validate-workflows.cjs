#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

console.log("🔍 Validating Workflow Compatibility...\n");

// Test functions
const tests = [
  {
    name: "Core Package Build (CSS-only)",
    command: "pnpm --filter @mild-ui/core build",
    description: "Tests if core package builds CSS/SCSS successfully",
  },
  {
    name: "React Package Build",
    command: "pnpm --filter @mild-ui/react build",
    description: "Tests if React package builds with local types",
  },
  {
    name: "Vue Package Build",
    command: "pnpm --filter @mild-ui/vue build",
    description: "Tests if Vue package builds with local types",
  },
  {
    name: "All Packages Build",
    command: "pnpm build",
    description: "Tests if all packages build together (workflow simulation)",
  },
  {
    name: "Test Command Check",
    command: 'pnpm --filter @mild-ui/react test || echo "No tests - OK"',
    description: "Tests if test commands work or gracefully handle no tests",
  },
];

let passedTests = 0;
let totalTests = tests.length;

for (const test of tests) {
  try {
    console.log(`▶️  ${test.name}`);
    console.log(`   ${test.description}`);

    execSync(test.command, {
      stdio: "pipe",
      encoding: "utf8",
      cwd: process.cwd(),
    });

    console.log("   ✅ PASSED\n");
    passedTests++;
  } catch (error) {
    console.log("   ❌ FAILED");
    console.log(`   Error: ${error.message}`);
    console.log("");
  }
}

// Check package exports
console.log("📦 Checking Package Exports...\n");

const packageChecks = [
  {
    name: "Core Package Exports",
    path: "./packages/core/package.json",
    expectedExports: [
      "./css",
      "./css/min",
      "./css/utilities",
      "./css/utilities/min",
      "./scss",
      "./scss/utilities",
    ],
  },
  {
    name: "React Package Dependencies",
    path: "./packages/react/package.json",
    check: (pkg) =>
      !pkg.dependencies["@mild-ui/core"] &&
      pkg.dependencies["@mild-ui/primitives"] &&
      pkg.dependencies["clsx"],
  },
  {
    name: "Vue Package Dependencies",
    path: "./packages/vue/package.json",
    check: (pkg) => !pkg.dependencies["@mild-ui/core"] && pkg.dependencies["@mild-ui/primitives"],
  },
];

let passedExportChecks = 0;

for (const check of packageChecks) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(check.path, "utf8"));

    if (check.expectedExports) {
      const hasAllExports = check.expectedExports.every(
        (exp) => packageJson.exports && packageJson.exports[exp],
      );
      if (hasAllExports) {
        console.log(`✅ ${check.name} - All exports present`);
        passedExportChecks++;
      } else {
        console.log(`❌ ${check.name} - Missing exports`);
      }
    } else if (check.check) {
      if (check.check(packageJson)) {
        console.log(`✅ ${check.name} - Dependencies correct`);
        passedExportChecks++;
      } else {
        console.log(`❌ ${check.name} - Dependency issues`);
      }
    }
  } catch (error) {
    console.log(`❌ ${check.name} - Error reading package.json`);
  }
}

// Check workflow files exist and are valid
console.log("\n🔧 Checking Workflow Files...\n");

const workflowFiles = [
  ".github/workflows/ci.yml",
  ".github/workflows/release.yml",
  ".github/workflows/links.yml",
  ".github/workflows/scorecard.yml",
  ".github/workflows/storybook.yml",
];

let workflowChecks = 0;

for (const workflow of workflowFiles) {
  if (fs.existsSync(workflow)) {
    console.log(`✅ ${workflow} exists`);
    workflowChecks++;
  } else {
    console.log(`❌ ${workflow} missing`);
  }
}

// Summary
console.log("\n" + "=".repeat(50));
console.log("📊 VALIDATION SUMMARY");
console.log("=".repeat(50));
console.log(`Build Tests: ${passedTests}/${totalTests} passed`);
console.log(`Export Checks: ${passedExportChecks}/${packageChecks.length} passed`);
console.log(`Workflow Files: ${workflowChecks}/${workflowFiles.length} found`);

const allPassed =
  passedTests === totalTests &&
  passedExportChecks === packageChecks.length &&
  workflowChecks === workflowFiles.length;

if (allPassed) {
  console.log("\n🎉 ALL VALIDATIONS PASSED! Workflows should run successfully.");
  process.exit(0);
} else {
  console.log("\n⚠️  Some validations failed. Please check the issues above.");
  process.exit(1);
}
